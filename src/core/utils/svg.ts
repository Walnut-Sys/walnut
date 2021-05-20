import { promises as fs } from 'fs';
import path from 'path';
import IParserOutput from '../interfaces/parser-output';
import { generatePiecesMap } from '../mappers/piece-declaration';
import Localizations from '../enums/localizations';
import { LOCALIZATIONS_DICTIONARY } from '../constants';
import IPieceDeclaration from '../interfaces/piece-declaration';

export const fillSVGTemplate = async (parserOutput: IParserOutput): Promise<Buffer> => {
  const pathToTemplate = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'assets',
    'svg-template.svg'
  );
  const svgTemplate = (await fs.readFile(pathToTemplate)).toString();
  let composedSvg = svgTemplate
    .replace('<!--BORDER_COLOR-->', parserOutput.colors.border)
    .replace('<!--BLACK_SQUARE_COLOR-->', parserOutput.colors.blackSquares)
    .replace('<!--WHITE_SQUARE_COLOR-->', parserOutput.colors.whiteSquares)
    .replace('<!--BLACK_PIECE_COLOR-->', parserOutput.colors.blackPieces)
    .replace('<!--WHITE_PIECE_COLOR-->', parserOutput.colors.whitePieces)
    .replace('<!--SYMBOLS_COLOR-->', parserOutput.colors.symbols);
  composedSvg = fillSvgLetters(composedSvg, parserOutput.localization);
  composedSvg = fillSvgPieces(
    composedSvg,
    parserOutput.whitePositions,
    parserOutput.blackPositions
  );
  return Buffer.from(composedSvg);
};

const fillSvgLetters = (svgTemplte: string, loc: Localizations): string => {
  LOCALIZATIONS_DICTIONARY['en'].x.forEach((letter, index) => {
    svgTemplte = svgTemplte.replace(`<!--${letter}-->`, LOCALIZATIONS_DICTIONARY[loc].x[index]);
  });
  return svgTemplte;
};

const fillSvgPieces = (
  svgTemplate: string,
  whitePos: Array<IPieceDeclaration>,
  blackPos: Array<IPieceDeclaration>
): string => {
  const whitePiecesMap = generatePiecesMap(whitePos);
  const blackPiecesMap = generatePiecesMap(blackPos);
  whitePiecesMap.forEach((piece, coords) => {
    const squareLetter = LOCALIZATIONS_DICTIONARY['en'].x[parseInt(coords.split(',')[0]) - 1];
    const squareNumber = coords.split(',')[1];
    svgTemplate = svgTemplate
      .replace(`<!--${squareLetter}${squareNumber}-->`, piece)
      .replace(`<!--${squareLetter}${squareNumber}_CLASS-->`, 'wp');
  });
  blackPiecesMap.forEach((piece, coords) => {
    const squareLetter = LOCALIZATIONS_DICTIONARY['en'].x[parseInt(coords.split(',')[0]) - 1];
    const squareNumber = coords.split(',')[1];
    svgTemplate = svgTemplate
      .replace(`<!--${squareLetter}${squareNumber}-->`, piece)
      .replace(`<!--${squareLetter}${squareNumber}_CLASS-->`, 'bp');
  });
  svgTemplate = svgTemplate.replace(/<!--\D\d_CLASS-->/g, '');
  return svgTemplate;
};
