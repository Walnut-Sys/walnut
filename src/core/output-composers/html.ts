import path from 'path';
import { promises as fs } from 'fs';
import { Readable } from 'stream';
import IOutputComposer from '../interfaces/output-composer';
import IParserOutput from '../interfaces/parser-output';
import IPieceDeclaration from '../interfaces/piece-declaration';
import { generatePiecesMap } from '../mappers/piece-declaration';
import Localizations from '../enums/localizations';
import { LOCALIZATIONS_DICTIONARY } from '../constants';

const pathToTemplate = path.join(__dirname, '..', '..', '..', '..', 'assets', 'html-template.txt');

export default class HTMLComposer implements IOutputComposer {
  public async compose(parserOutput: IParserOutput): Promise<Readable> {
    const htmlTemplate = (await fs.readFile(pathToTemplate)).toString();
    const composedHtml = htmlTemplate
      .replace('#BORDER_COLOR#', parserOutput.colors.border)
      .replace('#BLACK_SQUARE_COLOR#', parserOutput.colors.blackSquares)
      .replace('#WHITE_SQUARE_COLOR#', parserOutput.colors.whiteSquares)
      .replace('#BLACK_PIECE_COLOR#', parserOutput.colors.blackPieces)
      .replace('#WHITE_PIECE_COLOR#', parserOutput.colors.whitePieces)
      .replace('#SYMBOLS_COLOR#', parserOutput.colors.symbols)
      .replace(
        '#BOARD#',
        this.generateBoard(parserOutput.whitePositions, parserOutput.blackPositions)
      )
      .replace('#BOARD_LETTERS#', this.generateBoardLetters(parserOutput.localization));
    return Readable.from([composedHtml]);
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  private generateBoard(
    whitePieces: IPieceDeclaration[],
    blackPieces: IPieceDeclaration[]
  ): string {
    const whitePiecesMap = generatePiecesMap(whitePieces);
    const blackPiecesMap = generatePiecesMap(blackPieces);
    let board = '';
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let squareClass: string;
        if (i % 2 == 0) squareClass = j % 2 == 0 ? 'black-square' : 'white-square';
        else squareClass = j % 2 == 0 ? 'white-square' : 'black-square';

        const whitePieceIfExists = whitePiecesMap.get(`${j + 1},${8 - i}`);
        const blackPieceIfExists = blackPiecesMap.get(`${j + 1},${8 - i}`);
        if (whitePieceIfExists && blackPieceIfExists) {
          throw new Error(`Two pieces on same square found.`);
        }

        board += `\n\t<li class="square ${squareClass}">`;
        board += whitePieceIfExists
          ? `\n\t\t<span class="white-piece">${whitePieceIfExists}</span>`
          : '';
        board += blackPieceIfExists
          ? `\n\t\t<span class="black-piece">${blackPieceIfExists}</span>`
          : '';
        board += '\n\t</li>';
      }
    }
    return board;
  }

  private generateBoardLetters(localization: Localizations): string {
    return LOCALIZATIONS_DICTIONARY[localization].x.reduce(
      (acc, letter) => acc + `<li>${letter}</li>`,
      ''
    );
  }
}
