import IParserOutput from './interfaces/parser-output';
import IParser from './parser.interface';

export default class Parser implements IParser {
	public parse(sourceCode: string): IParserOutput {
		return {} as IParserOutput;
	}
}
