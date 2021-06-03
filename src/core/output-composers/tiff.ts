import sharp from 'sharp';
import ImageOutputComposer from './image';
import IOutputComposer from '../interfaces/output-composer';
import IParserOutput from '../interfaces/parser-output';
import ComposingError from '../errors/composing-error';
import { IMAGE_SIZE } from '../constants';

export default class TIFFComposer extends ImageOutputComposer implements IOutputComposer {
  /**
   * Returns Promise with composed tiff image as Buffer
   * @param  {IParserOutput} parserOutput
   * @param  {number=IMAGE_SIZE} size
   * @returns Promise
   */
  public async compose(parserOutput: IParserOutput, size: number = IMAGE_SIZE): Promise<Buffer> {
    try {
      const svgBuffer = await this.fillSVGTemplate(parserOutput);
      const resBuffer = await sharp(svgBuffer).tiff().resize(size, size).toBuffer();
      return resBuffer;
    } catch (err) {
      throw new ComposingError(`Error while composing TIFF output: ${err.message}`);
    }
  }
}
