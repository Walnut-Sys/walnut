import IParserOutput from './parser-output';

export default interface IOutputComposer {
  compose(parserOutput: IParserOutput, ...args: any[]): Promise<Buffer>;
  // addSolution: (...) => unknown;
}
