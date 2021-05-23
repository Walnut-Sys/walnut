/* eslint-disable sonarjs/prefer-immediate-return */
import sharp from 'sharp';
import IOutputComposer from '../interfaces/output-composer';
import IParserOutput from '../interfaces/parser-output';
import ComposingError from '../errors/composing-error';
import { fillSVGTemplate } from '../utils/svg';
import { IMAGE_WIDTH, IMAGE_HEIGHT } from '../constants';

export default class TIFFComposer implements IOutputComposer {
  public async compose(parserOutput: IParserOutput): Promise<Buffer> {
    try {
      const svgBuffer = await fillSVGTemplate(parserOutput);
      const resBuffer = await sharp(svgBuffer).tiff().resize(IMAGE_WIDTH, IMAGE_HEIGHT).toBuffer();
      return resBuffer;
    } catch (err) {
      throw new ComposingError(`Error while composing TIFF output: ${err.message}`);
    }
  }
}
