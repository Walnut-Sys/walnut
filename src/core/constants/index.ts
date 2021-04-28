import Localizations from '../enums/localizations';
import { IParserOutputColors } from '../interfaces/parser-output';
import Pieces from '../enums/pieces';

interface ILocalizationsDictionary {
  [key: string]: {
    x: string[];
    pieces: {
      [key: string]: string;
    };
  };
}

export const LOCALIZATIONS_DICTIONARY: ILocalizationsDictionary = {
  [Localizations.EN]: {
    x: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    pieces: {
      K: Pieces.King,
      Q: Pieces.Queen,
      R: Pieces.Rook,
      N: Pieces.Knight,
      B: Pieces.Bishop,
      P: Pieces.Pawn,
      '': Pieces.Pawn
    }
  },
  [Localizations.RU]: {
    x: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З'],
    pieces: {
      Кр: Pieces.King,
      Ф: Pieces.Queen,
      Л: Pieces.Rook,
      К: Pieces.Knight,
      С: Pieces.Bishop,
      П: Pieces.Pawn,
      '': Pieces.Pawn
    }
  }
};

export const PIECES_SYMBOLS = {
  [Pieces.King]: '&#x265A;',
  [Pieces.Queen]: '&#x265B;',
  [Pieces.Rook]: '&#x265C;',
  [Pieces.Knight]: '&#x265E;',
  [Pieces.Bishop]: '&#x265D;',
  [Pieces.Pawn]: '&#x265F;'
};

export const SUPPORTED_LOCALIZATIONS = Object.values(Localizations);

export const DEFAULT_LOCALIZATION = Localizations.EN;
export const DEFAULT_COLORS: IParserOutputColors = {
  whitePieces: '#c38748',
  blackPieces: '#150503',
  whiteSquares: '#f9c48d',
  blackSquares: '#84271d',
  border: '#a73a2f',
  symbols: '#efefef'
};
