import Localizations from '../../core/enums/localizations';
import Pieces from '../../core/enums/pieces';
export default {
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
