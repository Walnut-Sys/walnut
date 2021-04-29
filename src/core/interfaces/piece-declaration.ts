import Pieces from '../enums/pieces';
import IPosition from './piece-position';

export default interface IPieceDeclaration {
  piece: Pieces;
  position: IPosition;
}
