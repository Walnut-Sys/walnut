import sharp from 'sharp';
import IOutputComposer from '../interfaces/output-composer';
import ImageOutputComposer from './image';
import IParserOutput from '../interfaces/parser-output';
import ComposingError from '../errors/composing-error';
import { IMAGE_SIZE } from '../constants';

export default class WEBPComposer extends ImageOutputComposer implements IOutputComposer {
  /**
   * Returns Promise with composed webp image as Buffer
   * @param  {IParserOutput} parserOutput
   * @param  {number=IMAGE_SIZE} size
   * @returns Promise
   */
  public async compose(parserOutput: IParserOutput, size: number = IMAGE_SIZE): Promise<Buffer> {
    try {
      const svgBuffer = await this.fillSVGTemplate(parserOutput);
      const resBuffer = await sharp(svgBuffer).webp().resize(size, size).toBuffer();
      return resBuffer;
    } catch (err) {
      throw new ComposingError(`Error while composing WEBP output: ${err.message}`);
    }
  }
}
