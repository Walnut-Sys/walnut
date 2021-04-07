import IParserOutput from './parser-output';
import IParser from './interfaces/parser';

export default class Parser implements IParser {
  public parse(sourceCode: string): IParserOutput {
    return {} as IParserOutput;
  }
}
