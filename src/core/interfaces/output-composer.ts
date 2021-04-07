import { Readable } from 'stream';
import IParserOutput from '../parser-output';

export default interface IOutputComposer {
	compose: (parserOutput: IParserOutput) => Promise<Readable>;
	// addSolution: (...) => unknown;
}
