import path from 'path';
import { promises as fs } from 'fs';
import ComposingError from '../errors/composing-error';
import IOutputComposer from '../interfaces/output-composer';
import IParserOutput from '../interfaces/parser-output';
import IPieceDeclaration from '../interfaces/piece-declaration';

export default class XMLComposer implements IOutputComposer {
  private pathToTemplate = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'assets',
    'xml-template.xml'
  );

  constructor(pathToTemplate?: string) {
    if (pathToTemplate) {
      this.pathToTemplate = pathToTemplate;
    }
  }
  /**
   * Returns Promise with composed xml document, with parserOutput info as Buffer
   * @param  {IParserOutput} parserOutput
   * @returns Promise
   */
  public async compose(parserOutput: IParserOutput): Promise<Buffer> {
    let xmlTemplate;
    try {
      xmlTemplate = (await fs.readFile(this.pathToTemplate)).toString();
    } catch (err) {
      throw new ComposingError(`Error while fetching template: ${err}`);
    }
    const composedXml = xmlTemplate
      .replace('#LOCALIZATION#', parserOutput.localization)
      .replace('#BORDER_COLOR#', parserOutput.colors.border)
      .replace('#BLACK_SQUARE_COLOR#', parserOutput.colors.blackSquares)
      .replace('#WHITE_SQUARE_COLOR#', parserOutput.colors.whiteSquares)
      .replace('#BLACK_PIECE_COLOR#', parserOutput.colors.blackPieces)
      .replace('#WHITE_PIECE_COLOR#', parserOutput.colors.whitePieces)
      .replace('#SYMBOLS_COLOR#', parserOutput.colors.symbols)
      .replace('#WHITE_POSITIONS#', this.generatePositionsList(parserOutput.whitePositions))
      .replace('#BLACK_POSITIONS#', this.generatePositionsList(parserOutput.blackPositions));

    return Buffer.from(composedXml);
  }

  /**
   * Creates xml markup of a list of pieces positions
   * @param  {Array<IPieceDeclaration>} pieceDeclarations
   * @returns string
   */
  private generatePositionsList(pieceDeclarations: Array<IPieceDeclaration>): string {
    return pieceDeclarations.reduce(
      (acc, declaration) =>
        acc +
        `
    <item>
      <piece>${declaration.piece}</piece>
      <position>
        <x number="true">${declaration.position.x}</x>
        <y number="true">${declaration.position.y}</y>
      </position>
    </item>`,
      ''
    );
  }
}
