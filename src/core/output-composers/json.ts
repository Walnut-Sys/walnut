import IOutputComposer from '../interfaces/output-composer';
import IParserOutput from '../interfaces/parser-output';
import ComposingError from '../errors/composing-error';

export default class JSONComposer implements IOutputComposer {
  public async compose(parserOutput: IParserOutput): Promise<Buffer> {
    try {
      return Buffer.from(
        JSON.stringify(parserOutput, null, '\t')
      );
    }
    catch (err) {
      throw new ComposingError(`Error while composing JSON output: ${err.message}`);
    }
  }
}
