import IPieceDeclaration from '../interfaces/piece-declaration';
import { PIECES_SYMBOLS } from '../constants/index';

/**
 * This function returns map of pieces with keys of format 'x,y' and values as misc symbols
 * @param  {IPieceDeclaration[]} pieces
 * @returns Map<string, string>
 */
export const generatePiecesMap = (pieces: IPieceDeclaration[]): Map<string, string> => {
  return pieces.reduce((acc, pieceDeclaration: IPieceDeclaration) => {
    const { x, y } = pieceDeclaration.position;
    acc.set(`${x},${y}`, PIECES_SYMBOLS[pieceDeclaration.piece]);
    return acc;
  }, new Map());
};
