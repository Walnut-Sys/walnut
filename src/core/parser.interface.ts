import IParserOutput from './interfaces/parser-output';

export default interface IParser {
	parse: (sourceCode: string) => IParserOutput;
}
