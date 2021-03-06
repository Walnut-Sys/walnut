import IOutputComposer from '../interfaces/output-composer';
import IParserOutput from '../interfaces/parser-output';
import ComposingError from '../errors/composing-error';

export default class JSONComposer implements IOutputComposer {
  /**
   * Returns Promise with composed JSON, duplicating parserOutput, as Buffer
   * @param  {IParserOutput} parserOutput
   * @returns Promise
   */
  public async compose(parserOutput: IParserOutput): Promise<Buffer> {
    try {
      return Buffer.from(JSON.stringify(parserOutput, null, '\t'));
    } catch (err) {
      throw new ComposingError(`Error while composing JSON output: ${err.message}`);
    }
  }
}
