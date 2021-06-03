import IParserOutput from './parser-output';

export default interface IOutputComposer {
  /**
   * Returns buffer result of output
   * @param  {IParserOutput} parserOutput
   * @param  {any[]} ...args
   * @returns Promise<Buffer>
   */
  compose(parserOutput: IParserOutput, ...args: any[]): Promise<Buffer>;
  // addSolution: (...) => unknown;
}
