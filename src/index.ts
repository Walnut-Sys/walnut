import Parser from './core/parser';
import HTMLComposer from './core/output-composers/html';

const parser = new Parser();
const composer = new HTMLComposer();
const parserOutput = parser.parse(`
LOCALIZATION: EN
COLORS:
  white squares: #f9c48d
  black squares: #671810
  white pieces: #c38748
  black pieces: #150503
  border: #a73a2f

WHITE POS: Qa5, Kc2, Bh5
BLACK POS: Qc5, Ke2

SOLVE:
    1. e2-e4 e7-e5
    2. Сf1-c4 Кb8-c6
    3. Фd1-h5 Кg8-f6
    4. Фh5xf7#
`);
const run = async () => {
  const stream = await composer.compose(parserOutput);
  stream.on('data', (chunk) => {
    console.log(chunk);
  });
};
run();
