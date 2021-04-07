import IParserOutput from '../parser-output';

export default interface IParser {
	parse: (sourceCode: string) => IParserOutput;
}
