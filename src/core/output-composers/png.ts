import { Readable } from 'stream';
import sharp from 'sharp';
import IOutputComposer from '../interfaces/output-composer';
import IParserOutput from '../interfaces/parser-output';
import { fillSVGTemplate } from '../utils/svg';
import ComposingError from '../errors/composing-error';

export default class PNGComposer implements IOutputComposer {
  public async compose(parserOutput: IParserOutput): Promise<Readable> {
    const svgBuffer = await fillSVGTemplate(parserOutput);
    try {
      const data = await sharp(svgBuffer).toBuffer();
      return Readable.from([data]);
    } catch (error) {
      throw new ComposingError('Error while composing png output');
    }
  }
}
