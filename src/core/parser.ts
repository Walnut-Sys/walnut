import Localizations from './enums/localizations';
import PieceColor from './enums/piece-color';
import Pieces from './enums/pieces';
import IParserOutput, { IParserOutputColors } from './interfaces/parser-output';
import IParser from './interfaces/parser';
import IPieceDeclaration from './interfaces/piece-declaration';
import ParsingError from './errors/parsing-error';

import { standardizeValue } from '../utils/helpers';
import {
  SUPPORTED_LOCALIZATIONS,
  DEFAULT_COLORS,
  LOCALIZATIONS_DICTIONARY,
  DEFAULT_LOCALIZATION
} from './constants';

export default class Parser implements IParser {
  /**
   * Returns parsed output from source code
   * @param {string} sourceCode
   * @return {IParserOutput}
   */
  public parse(sourceCode: string): IParserOutput {
    const localization = this.parseLocalization(sourceCode);
    const colors = this.parseColors(sourceCode);
    const whitePositions = this.parsePiecesDeclarations(sourceCode, PieceColor.WHITE, {
      localization
    });
    const blackPositions = this.parsePiecesDeclarations(sourceCode, PieceColor.BLACK, {
      localization
    });

    this.validatePiecesDeclarations([...whitePositions, ...blackPositions]);

    return {
      localization,
      colors,
      whitePositions,
      blackPositions,
      solution: []
    };
  }

  /**
   * Returns parsed localization if this localization is supported.
   * Otherwise returns default localization (EN)
   * @param {string} sourceCode
   * @return {string}
   * @private
   */
  public parseLocalization(sourceCode: string): Localizations {
    const match = sourceCode.match(/LOCALIZATION\s*:\s*(\S+)/i);
    const value = match ? match[1] : null;
    return standardizeValue(value, SUPPORTED_LOCALIZATIONS, DEFAULT_LOCALIZATION);
  }

  /**
   * Returns parsed colors if these colors are supported.
   * Otherwise returns default colors
   * @param {string} sourceCode
   * @return {string}
   * @private
   */
  public parseColors(sourceCode: string): IParserOutputColors {
    const match = sourceCode.match(/COLORS\s*:\s*\r?\n(([\t\s+]+.*(\r?\n?)*)+)/i);
    if (!match) {
      return DEFAULT_COLORS;
    }

    const keysDictionary: Record<string, string> = {
      'white squares': 'whiteSquares',
      'black squares': 'blackSquares',
      'white pieces': 'whitePieces',
      'black pieces': 'blackPieces',
      border: 'border',
      symbols: 'symbols'
    };

    const lines = match[1].split(/\r?\n/).filter((line) => line.trim() !== '');

    return lines.reduce((acc, line) => {
      const match = line.match(
        /^[\t\s+]+([a-zA-Z0-9\s]+)\s*:\s*(#[a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/i
      );
      if (!match) {
        throw new ParsingError(`Invalid colors declaration on line "${line.trim()}"`);
      }

      const passedKey = match[1]?.toLowerCase();
      const passedValue = match[2]?.toLowerCase();

      const standardizedKey = keysDictionary[passedKey] as keyof IParserOutputColors;
      if (!standardizedKey) {
        throw new ParsingError(`Invalid colors declaration on line "${line.trim()}"`);
      }

      acc[standardizedKey] = passedValue ?? DEFAULT_COLORS[standardizedKey];

      return acc;
    }, DEFAULT_COLORS);
  }

  /**
   * Returns parsed pieces and their locations.
   * @param {string} sourceCode
   * @param pieceColor
   * @param localization
   * @return {string}
   * @private
   */
  public parsePiecesDeclarations(
    sourceCode: string,
    pieceColor: PieceColor,
    { localization }: { localization: Localizations }
  ): IPieceDeclaration[] {
    const match = sourceCode.match(
      new RegExp(`${pieceColor} POS\\s*:\\s*([a-zA-Zа-яА-Я\\s\\d,]+)\r?\n?`, 'i')
    );

    if (!match) {
      return [];
    }

    const piecesSeparator = ',';
    const rawPieces = match[1]
      .split(/\r?\n/)[0]
      .split(piecesSeparator)
      .map((str) => str.trim())
      .filter((str) => str);

    return rawPieces.reduce((acc: IPieceDeclaration[], rawPiece) => {
      const y = +rawPiece[rawPiece.length - 1];

      if (isNaN(y) || y < 1 || y > 8) {
        throw new ParsingError(
          `Invalid piece declaration "${rawPiece}". Second coordinate must be a number between 1 and 8`
        );
      }

      const x =
        LOCALIZATIONS_DICTIONARY[localization].x.findIndex((el) => {
          return el.toLowerCase() === rawPiece[rawPiece.length - 2].toLowerCase();
        }) + 1;

      if (!x) {
        throw new ParsingError(
          `Invalid piece declaration "${rawPiece}". First coordinate must be a letter supported by localization`
        );
      }

      const piece = LOCALIZATIONS_DICTIONARY[localization].pieces[rawPiece.slice(0, -2)];

      if (!piece) {
        throw new ParsingError(
          `Invalid piece declaration "${rawPiece}". Piece name must be supported by localization`
        );
      }

      acc.push({
        piece: piece as Pieces,
        position: { x, y }
      });
      return acc;
    }, []);
  }

  /**
   * Validates array of pieces declarations
   * @param {IPieceDeclaration[]} declarations
   * @private
   */
  private validatePiecesDeclarations(declarations: IPieceDeclaration[]): void {
    if (!declarations.length) {
      throw new ParsingError('You need to declare pieces positions');
    }

    if (declarations.length > 32) {
      throw new ParsingError("You can't place more than 32 pieces on the board");
    }

    const coords = new Set();

    for (const { position } of declarations) {
      const positionString = [position.x, position.y].join(';');
      if (coords.has(positionString)) {
        throw new ParsingError("You can't place two pieces on the same position");
      }
      coords.add(positionString);
    }
  }
}
