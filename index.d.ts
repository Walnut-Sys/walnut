import IParser from './src/core/interfaces/parser';
import IParserOutput from './src/core/interfaces/parser-output';
import IOutputComposer from './src/core/interfaces/output-composer';

declare module 'walnut-chess' {
  export class Parser implements IParser {
    parse(sourceCode: string): IParserOutput;
  }

  export class HTMLComposer implements IOutputComposer {
    compose(parserOutput: IParserOutput): Promise<Buffer>;
  }

  export class PNGComposer implements IOutputComposer {
    compose(parserOutput: IParserOutput): Promise<Buffer>;
  }

  export class JPEGComposer implements IOutputComposer {
    compose(parserOutput: IParserOutput): Promise<Buffer>;
  }

  export class TIFFComposer implements IOutputComposer {
    compose(parserOutput: IParserOutput): Promise<Buffer>;
  }

  export class WEBPComposer implements IOutputComposer {
    compose(parserOutput: IParserOutput): Promise<Buffer>;
  }

  export class JSONComposer implements IOutputComposer {
    compose(parserOutput: IParserOutput): Promise<Buffer>;
  }

  export class XMLComposer implements IOutputComposer {
    compose(parserOutput: IParserOutput): Promise<Buffer>;
  }
}
