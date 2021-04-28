import Localization from '../enums/localizations';
import IPieceDeclaration from './piece-declaration';

export default interface IParserOutput {
  localization: Localization;
  colors: IParserOutputColors;
  whitePositions: Array<IPieceDeclaration>;
  blackPositions: Array<IPieceDeclaration>;
  solution: Array<{ start: IPieceDeclaration; end: IPieceDeclaration }>;
}

export interface IParserOutputColors {
  whitePieces: string;
  blackPieces: string;
  whiteSquares: string;
  blackSquares: string;
  border: string;
}
