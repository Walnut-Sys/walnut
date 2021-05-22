import Parser from '../../core/parser';
import Localizations from '../../core/enums/localizations';
import PieceColor from '../../core/enums/piece-color';
import Pieces from '../../core/enums/pieces';
import ParsingError from '../../core/errors/parsing-error';
import { DEFAULT_LOCALIZATION, DEFAULT_COLORS } from '../../core/constants';

describe('Parser', () => {
  describe('Localization parsing', () => {
    test('Parses when localization is set', () => {
      const sourceCode = `
LOCALIZATION: RU
WHITE POS: Ra1
BLACK POS: Ra8
      `;

      const expectedResult = Localizations.RU;

      const parser = new Parser();
      const result = parser.parseLocalization(sourceCode);

      expect(result).toBe(expectedResult);
    });

    test('Returns default value when localization is not set', () => {
      const sourceCode = `
WHITE POS: Ra1
BLACK POS: Ra8
      `;

      const expectedResult = DEFAULT_LOCALIZATION;

      const parser = new Parser();
      const result = parser.parseLocalization(sourceCode);

      expect(result).toBe(expectedResult);
    });

    test('Returns default value when localization is not supported', () => {
      const sourceCode = `
LOCALIZATION: DE 
WHITE POS: Ra1
BLACK POS: Ra8
      `;

      const expectedResult = DEFAULT_LOCALIZATION;

      const parser = new Parser();
      const result = parser.parseLocalization(sourceCode);

      expect(result).toBe(expectedResult);
    });

    test('Parsing is case-insensitive', () => {
      const sourceCode = `
localization: RU
white pos: Ra1
black pos: Ra8
      `;

      const expectedResult = Localizations.RU;

      const parser = new Parser();
      const result = parser.parseLocalization(sourceCode);

      expect(result).toBe(expectedResult);
    });
  });

  describe('Colors parsing', () => {
    test('Parses when colors are set', () => {
      const sourceCode = `
COLORS:
  white squares: #ffffff
  black squares: #000000
  white pieces: #ef04af
  black pieces: #ff0000
  border: #e3e3e3
  symbols: #fff333

WHITE POS: Ra1
BLACK POS: Ra8
      `;

      const expectedResult = {
        whiteSquares: '#ffffff',
        blackSquares: '#000000',
        whitePieces: '#ef04af',
        blackPieces: '#ff0000',
        border: '#e3e3e3',
        symbols: '#fff333'
      };

      const parser = new Parser();
      const result = parser.parseColors(sourceCode);

      expect(result).toEqual(expectedResult);
    });

    test('Returns default values when colors are not set', () => {
      const sourceCode = `
WHITE POS: Ra1
BLACK POS: Ra8
      `;

      const expectedResult = DEFAULT_COLORS;

      const parser = new Parser();
      const result = parser.parseColors(sourceCode);

      expect(result).toEqual(expectedResult);
    });

    test('Throws ParsingError if unsupported color was specified', () => {
      const sourceCode = `
COLORS:
  white squares: #asip[ppi
  black squares: #000000
  white pieces: #ef04afsdasf
  black pieces: #ff0000
  border: #e3e3e3
  symbols: #fff333

WHITE POS: Ra1
BLACK POS: Ra8
      `;

      const parser = new Parser();
      expect(() => {
        parser.parseColors(sourceCode);
      }).toThrow(ParsingError);
    });

    test('Throws ParsingError if unsupported key was specified', () => {
      const sourceCode = `
COLORS:
  white squares: #ffffff
  black squares: #000000
  white pieces: #ef04af
  black pieces: #ff0000
  border: #e3e3e3
  symbols: #fff333
  test: #ffffff

WHITE POS: Ra1
BLACK POS: Ra8
      `;

      const parser = new Parser();
      expect(() => {
        parser.parseColors(sourceCode);
      }).toThrow(ParsingError);
    });

    test('Parsing is case-insensitive', () => {
      const sourceCode = `
colors:
  WHITE SQUARES: #ffffff
  black squares: #000000
  WHITE pieces: #ef04af
  black PIECES: #ff0000
  border: #e3e3e3
  SyMbOlS: #fff333

white pos: Ra1
black pos: Ra8
      `;

      const expectedResult = {
        whiteSquares: '#ffffff',
        blackSquares: '#000000',
        whitePieces: '#ef04af',
        blackPieces: '#ff0000',
        border: '#e3e3e3',
        symbols: '#fff333'
      };

      const parser = new Parser();
      const result = parser.parseColors(sourceCode);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('Pieces declaration parsing', () => {
    test('Parses when both white and black positions are set', () => {
      const sourceCode = `
WHITE POS: Ra1,Nb3,Bc6,Qd1,e2
BLACK POS: Ra8,Nb8,Bc8,Qd8,e6
      `;

      const expectedResult = {
        whitePositions: [
          {
            piece: Pieces.Rook,
            position: { x: 1, y: 1 }
          },
          {
            piece: Pieces.Knight,
            position: { x: 2, y: 3 }
          },
          {
            piece: Pieces.Bishop,
            position: { x: 3, y: 6 }
          },
          {
            piece: Pieces.Queen,
            position: { x: 4, y: 1 }
          },
          {
            piece: Pieces.Pawn,
            position: { x: 5, y: 2 }
          }
        ],
        blackPositions: [
          {
            piece: Pieces.Rook,
            position: { x: 1, y: 8 }
          },
          {
            piece: Pieces.Knight,
            position: { x: 2, y: 8 }
          },
          {
            piece: Pieces.Bishop,
            position: { x: 3, y: 8 }
          },
          {
            piece: Pieces.Queen,
            position: { x: 4, y: 8 }
          },
          {
            piece: Pieces.Pawn,
            position: { x: 5, y: 6 }
          }
        ]
      };

      const localization = Localizations.EN;

      const parser = new Parser();
      const result = {
        whitePositions: parser.parsePiecesDeclarations(sourceCode, PieceColor.WHITE, {
          localization
        }),
        blackPositions: parser.parsePiecesDeclarations(sourceCode, PieceColor.BLACK, {
          localization
        })
      };

      expect(result).toEqual(expectedResult);
    });

    test('Parses when either white or black positions are set', () => {
      const sourceCode = `WHITE POS: Ra1,Nb3,Bc6,Qd1,e2`;

      const expectedResult = {
        whitePositions: [
          {
            piece: Pieces.Rook,
            position: { x: 1, y: 1 }
          },
          {
            piece: Pieces.Knight,
            position: { x: 2, y: 3 }
          },
          {
            piece: Pieces.Bishop,
            position: { x: 3, y: 6 }
          },
          {
            piece: Pieces.Queen,
            position: { x: 4, y: 1 }
          },
          {
            piece: Pieces.Pawn,
            position: { x: 5, y: 2 }
          }
        ],
        blackPositions: []
      };

      const localization = Localizations.EN;

      const parser = new Parser();
      const result = {
        whitePositions: parser.parsePiecesDeclarations(sourceCode, PieceColor.WHITE, {
          localization
        }),
        blackPositions: parser.parsePiecesDeclarations(sourceCode, PieceColor.BLACK, {
          localization
        })
      };

      expect(result).toEqual(expectedResult);
    });

    test('Parses when localization is set to RU', () => {
      const sourceCode = `WHITE POS: Ла1, Кб3, Св6, Фг1, д2`;

      const expectedResult = {
        whitePositions: [
          {
            piece: Pieces.Rook,
            position: { x: 1, y: 1 }
          },
          {
            piece: Pieces.Knight,
            position: { x: 2, y: 3 }
          },
          {
            piece: Pieces.Bishop,
            position: { x: 3, y: 6 }
          },
          {
            piece: Pieces.Queen,
            position: { x: 4, y: 1 }
          },
          {
            piece: Pieces.Pawn,
            position: { x: 5, y: 2 }
          }
        ],
        blackPositions: []
      };

      const localization = Localizations.RU;

      const parser = new Parser();
      const result = {
        whitePositions: parser.parsePiecesDeclarations(sourceCode, PieceColor.WHITE, {
          localization
        }),
        blackPositions: parser.parsePiecesDeclarations(sourceCode, PieceColor.BLACK, {
          localization
        })
      };

      expect(result).toEqual(expectedResult);
    });

    test('Throws ParsingError when piece name is not supported', () => {
      const sourceCode = `WHITE POS: Ua1,Nb3,Bc6,Qd1,e2`;
      const localization = Localizations.EN;

      const parser = new Parser();

      expect(() => {
        parser.parsePiecesDeclarations(sourceCode, PieceColor.WHITE, { localization });
      }).toThrow(ParsingError);
    });

    test('Throws ParsingError when X coordinate is not supported', () => {
      const sourceCode = `WHITE POS: Rk1,Nb3,Bc6,Qd1,e2`;
      const localization = Localizations.EN;

      const parser = new Parser();

      expect(() => {
        parser.parsePiecesDeclarations(sourceCode, PieceColor.WHITE, { localization });
      }).toThrow(ParsingError);
    });

    test('Throws ParsingError when Y coordinate is out of range', () => {
      const sourceCode = `WHITE POS: Ra0,Nb3,Bc6,Qd1,e2`;
      const localization = Localizations.EN;

      const parser = new Parser();

      expect(() => {
        parser.parsePiecesDeclarations(sourceCode, PieceColor.WHITE, { localization });
      }).toThrow(ParsingError);
    });
  });

  describe('Whole parsing', () => {
    test('Parses when everything is correct', () => {
      const sourceCode = `
LOCALIZATION: EN
COLORS:
  white squares: #ffffff
  black squares: #000000
  white pieces: #ef04af
  black pieces: #ff0000
  border: #e3e3e3
  symbols: #fff333

WHITE POS: Ra1,Nb3,Bc6,Qd1,e2
BLACK POS: Ra8,Nb8,Bc8,Qd8,e6
      `;

      const expectedResult = {
        localization: Localizations.EN,
        colors: {
          whiteSquares: '#ffffff',
          blackSquares: '#000000',
          whitePieces: '#ef04af',
          blackPieces: '#ff0000',
          border: '#e3e3e3',
          symbols: '#fff333'
        },
        whitePositions: [
          {
            piece: Pieces.Rook,
            position: { x: 1, y: 1 }
          },
          {
            piece: Pieces.Knight,
            position: { x: 2, y: 3 }
          },
          {
            piece: Pieces.Bishop,
            position: { x: 3, y: 6 }
          },
          {
            piece: Pieces.Queen,
            position: { x: 4, y: 1 }
          },
          {
            piece: Pieces.Pawn,
            position: { x: 5, y: 2 }
          }
        ],
        blackPositions: [
          {
            piece: Pieces.Rook,
            position: { x: 1, y: 8 }
          },
          {
            piece: Pieces.Knight,
            position: { x: 2, y: 8 }
          },
          {
            piece: Pieces.Bishop,
            position: { x: 3, y: 8 }
          },
          {
            piece: Pieces.Queen,
            position: { x: 4, y: 8 }
          },
          {
            piece: Pieces.Pawn,
            position: { x: 5, y: 6 }
          }
        ],
        solution: []
      };

      const parser = new Parser();
      const result = parser.parse(sourceCode);

      expect(result).toEqual(expectedResult);
    });

    test('Throws ParsingError when neither black nor white positions specified', () => {
      const sourceCode = `
LOCALIZATION: EN
COLORS:
  white squares: #ffffff
  black squares: #000000
  white pieces: #ef04af
  black pieces: #ff0000
  border: #e3e3e3
  symbols: #fff333
      `;

      const parser = new Parser();
      expect(() => {
        parser.parse(sourceCode);
      }).toThrow(ParsingError);
    });
  });
});
