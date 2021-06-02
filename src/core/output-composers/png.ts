import sharp from 'sharp';
import ImageOutputComposer from './image';
import IOutputComposer from '../interfaces/output-composer';
import IParserOutput from '../interfaces/parser-output';
import ComposingError from '../errors/composing-error';
import { IMAGE_SIZE } from '../constants';

export default class PNGComposer extends ImageOutputComposer implements IOutputComposer {
  public async compose(parserOutput: IParserOutput, size: number = IMAGE_SIZE): Promise<Buffer> {
    try {
      const svgBuffer = await this.fillSVGTemplate(parserOutput);
      const resBuffer = await sharp(svgBuffer).png().resize(size, size).toBuffer();
      return resBuffer;
    } catch (err) {
      throw new ComposingError(`Error while composing PNG output: ${err.message}`);
    }
  }
}
