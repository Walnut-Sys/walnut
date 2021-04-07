import Notation from './enums/notations';
import Localization from './enums/localizations';
import IPieceDeclaration from './interfaces/piece-declaration';

export default interface IParserOutput {
	notation: Notation;
	localization: Localization;
	colors: {
		whitePieces: string;
		blackPieces: string;
		whiteSquares: string;
		blackSquares: string;
		border: string;
	};
	whitePositions: Array<IPieceDeclaration>;
	blackPositions: Array<IPieceDeclaration>;
	solution: Array<{ start: IPieceDeclaration; end: IPieceDeclaration }>;
}
