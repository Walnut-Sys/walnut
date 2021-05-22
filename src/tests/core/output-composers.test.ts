import crypto from 'crypto';
import * as composers from '../../core/output-composers';
import ComposingError from '../../core/errors/composing-error';
import Localizations from '../../core/enums/localizations';
import Pieces from '../../core/enums/pieces';
import fs from 'fs';
import path from 'path';

const checkSum = (data: any, algorithm?: string): string => {
  return crypto
    .createHash(algorithm || 'md5')
    .update(data, 'utf-8')
    .digest('hex');
};

describe('Output composers', () => {
  describe('HTML composer', () => {
    test('with valid input', async () => {
      const htmlComposer = new composers.HTMLComposer();
      const parserOutput = {
        localization: Localizations.EN,
        colors: {
          whitePieces: '#c38748',
          blackPieces: '#150503',
          whiteSquares: '#f9c48d',
          blackSquares: '#84271d',
          border: '#a73a2f',
          symbols: '#efefef'
        },
        whitePositions: [
          { piece: Pieces.Rook, position: { x: 1, y: 1 } },
          { piece: Pieces.Knight, position: { x: 2, y: 1 } },
          { piece: Pieces.Bishop, position: { x: 3, y: 1 } },
          { piece: Pieces.Queen, position: { x: 4, y: 1 } },
          { piece: Pieces.King, position: { x: 5, y: 1 } },
          { piece: Pieces.Bishop, position: { x: 6, y: 1 } },
          { piece: Pieces.Knight, position: { x: 7, y: 1 } },
          { piece: Pieces.Rook, position: { x: 8, y: 1 } },
          { piece: Pieces.Pawn, position: { x: 1, y: 2 } },
          { piece: Pieces.Pawn, position: { x: 2, y: 2 } },
          { piece: Pieces.Pawn, position: { x: 3, y: 4 } },
          { piece: Pieces.Pawn, position: { x: 4, y: 2 } },
          { piece: Pieces.Pawn, position: { x: 5, y: 2 } },
          { piece: Pieces.Pawn, position: { x: 6, y: 2 } },
          { piece: Pieces.Pawn, position: { x: 7, y: 2 } },
          { piece: Pieces.Pawn, position: { x: 8, y: 2 } }
        ],
        blackPositions: [
          { piece: Pieces.Rook, position: { x: 1, y: 8 } },
          { piece: Pieces.Knight, position: { x: 2, y: 8 } },
          { piece: Pieces.Bishop, position: { x: 3, y: 8 } },
          { piece: Pieces.Queen, position: { x: 4, y: 8 } },
          { piece: Pieces.King, position: { x: 5, y: 8 } },
          { piece: Pieces.Bishop, position: { x: 6, y: 8 } },
          { piece: Pieces.Knight, position: { x: 7, y: 8 } },
          { piece: Pieces.Rook, position: { x: 8, y: 8 } },
          { piece: Pieces.Pawn, position: { x: 1, y: 7 } },
          { piece: Pieces.Pawn, position: { x: 2, y: 7 } },
          { piece: Pieces.Pawn, position: { x: 3, y: 7 } },
          { piece: Pieces.Pawn, position: { x: 4, y: 7 } },
          { piece: Pieces.Pawn, position: { x: 5, y: 7 } },
          { piece: Pieces.Pawn, position: { x: 6, y: 7 } },
          { piece: Pieces.Pawn, position: { x: 7, y: 7 } },
          { piece: Pieces.Pawn, position: { x: 8, y: 7 } }
        ],
        solution: []
      };
      const expectedCheckSum = 'c4b8aa5d80657d9c07d6abcf0e7b3676';
      const htmlBuffer = await htmlComposer.compose(parserOutput);
      const receivedChecSum = checkSum(htmlBuffer.toString());
      expect(receivedChecSum).toEqual(expectedCheckSum);
    });
  });
});
