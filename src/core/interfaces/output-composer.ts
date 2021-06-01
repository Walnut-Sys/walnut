import IParserOutput from './parser-output';

export default interface IOutputComposer {
  compose(parserOutput: IParserOutput): Promise<Buffer>;
  // addSolution: (...) => unknown;
}
