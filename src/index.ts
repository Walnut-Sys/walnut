#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import {
  Parser,
  HTMLComposer,
  JPEGComposer,
  PNGComposer,
  JSONComposer,
  TIFFComposer,
  WEBPComposer,
  XMLComposer
} from './core/';

const outputComposers: { [key: string]: any } = {
  html: HTMLComposer,
  jpeg: JPEGComposer,
  png: PNGComposer,
  json: JSONComposer,
  tiff: TIFFComposer,
  webp: WEBPComposer,
  xml: XMLComposer
};

const supportedOutputOptions = Object.keys(outputComposers);

const { argv } = yargs
  .usage('Usage: -s <path-to-source-code> -o <path-to-output-file> (--html | --png | etc...)')
  .option('s', {
    alias: 'source',
    describe: 'Path to source code file',
    type: 'string',
    demandOption: true
  })
  .option('o', {
    alias: 'out',
    describe: 'Path to output file',
    type: 'string',
    demandOption: true
  })
  .option('size', {
    describe: 'Size of board in pixels for graphical output types',
    type: 'number'
  })
  .option('html', {
    describe: 'Transpile into HTML file',
    type: 'boolean'
  })
  .option('jpeg', {
    describe: 'Transpile into JPEG image',
    type: 'boolean'
  })
  .option('png', {
    describe: 'Transpile into PNG image',
    type: 'boolean'
  })
  .option('json', {
    describe: 'Transpile into JSON file',
    type: 'boolean'
  })
  .option('tiff', {
    describe: 'Transpile into TIFF image',
    type: 'boolean'
  })
  .option('webp', {
    describe: 'Transpile into WEBP image',
    type: 'boolean'
  })
  .option('xml', {
    describe: 'Transpile into XML file',
    type: 'boolean'
  })
  .check((argv) => {
    const { source, size } = argv as { [key: string]: any };

    if (!fs.existsSync(source)) {
      throw new Error(`Invalid source code file specified`);
    }

    const selectedOutputTypes = supportedOutputOptions.reduce((acc: string[], key: string) => {
      if (argv[key]) acc.push(key);
      return acc;
    }, []);

    if (selectedOutputTypes.length > 1) {
      throw new Error(`You can't specify more than one output option`);
    }
    if (!selectedOutputTypes.length) {
      throw new Error(`You must specify one of output options`);
    }

    if (Number.isNaN(size) || size <= 0 || size > 8000) {
      throw new Error(`Invalid size specified. Size must be a positive integer number under 8000`);
    }

    return true;
  });

(async () => {
  const { source, out, size } = argv as { [key: string]: any };
  const selectedOutputType = supportedOutputOptions.find((option) => !!argv[option]);

  if (!selectedOutputType) process.exit(1);

  let sourceCode;

  try {
    const inputFile = await fs.promises.readFile(source as string);
    sourceCode = inputFile.toString();
  } catch (err) {
    console.error('Error while reading source code file');
    process.exit(1);
  }

  let parserOutput;

  try {
    const parser = new Parser();
    parserOutput = parser.parse(sourceCode);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const composerArgs = [parserOutput];

  if (['png', 'tiff', 'webp', 'jpeg'].includes(selectedOutputType)) {
    composerArgs.push(size);
  }

  let result;

  try {
    const outputComposer = new outputComposers[selectedOutputType]();
    result = await outputComposer.compose(...composerArgs);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  try {
    await fs.promises.writeFile(out, result);
  } catch (err) {
    console.error('Error while writing result to specified file');
    console.error(err.message);
    process.exit(1);
  }

  console.log(`Successfully written into ${path.resolve(out)}`);
})();
