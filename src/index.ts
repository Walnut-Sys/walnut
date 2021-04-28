import fs from 'fs';
import path from 'path';
import Parser from './core/parser';
import HTMLComposer from './core/output-composers/html';

const parser = new Parser();
const composer = new HTMLComposer();

const run = async () => {
  const sourceCodeFilepath = path.join(__dirname, '..', '..', 'examples', 'html', 'example.walnut');
  const sourceCode = (await fs.promises.readFile(sourceCodeFilepath)).toString();

  const parserOutput = parser.parse(sourceCode);
  const outputStream = await composer.compose(parserOutput);

  const outputFilename = path.join(__dirname, '..', '..', 'examples', 'html', 'index.html');
  const file = fs.createWriteStream(outputFilename);
  outputStream.pipe(file);
};
run();
