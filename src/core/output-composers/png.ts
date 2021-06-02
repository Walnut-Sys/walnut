/* eslint-disable sonarjs/prefer-immediate-return */
import sharp from 'sharp';
import IOutputComposer from '../interfaces/output-composer';
import IParserOutput from '../interfaces/parser-output';
import ComposingError from '../errors/composing-error';
import { fillSVGTemplate } from '../utils/svg';
import { IMAGE_SIZE } from '../constants';

export default class PNGComposer implements IOutputComposer {
  public async compose(parserOutput: IParserOutput, size: number = IMAGE_SIZE): Promise<Buffer> {
    try {
      const svgBuffer = await fillSVGTemplate(parserOutput);
      const resBuffer = await sharp(svgBuffer).png().resize(size, size).toBuffer();
      return resBuffer;
    } catch (err) {
      throw new ComposingError(`Error while composing PNG output: ${err.message}`);
    }
  }
}
