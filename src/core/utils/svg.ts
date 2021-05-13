import { promises as fs } from 'fs';
import path from 'path';
import IParserOutput from '../interfaces/parser-output';

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
  const composedSvg = svgTemplate
    .replace('<!--BORDER_COLOR-->', parserOutput.colors.border)
    .replace('<!--BLACK_SQUARE_COLOR-->', parserOutput.colors.blackSquares)
    .replace('<!--WHITE_SQUARE_COLOR-->', parserOutput.colors.whiteSquares)
    .replace('<!--BLACK_PIECE_COLOR-->', parserOutput.colors.blackPieces)
    .replace('<!--WHITE_PIECE_COLOR-->', parserOutput.colors.whitePieces)
    .replace('<!--SYMBOLS_COLOR-->', parserOutput.colors.symbols);
  //.replace('', '');
  // TODO add letters, add pieces
  return Buffer.from(composedSvg);
};
