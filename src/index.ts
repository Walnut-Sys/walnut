#!/usr/bin/env node
import fs from 'fs';
import yargs from 'yargs';
import Parser from './core/parser';
import {
  HTMLComposer,
  JPEGComposer,
  PNGComposer,
  JSONComposer,
  TIFFComposer,
  WEBPComposer,
  XMLComposer
} from './core/output-composers';
import path from 'path';

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
    const { source } = argv as { [key: string]: any };

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

    return true;
  });

(async () => {
  const { source, out } = argv as { [key: string]: any };
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

  let result;

  try {
    const outputComposer = new outputComposers[selectedOutputType]();
    result = await outputComposer.compose(parserOutput);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  try {
    await fs.promises.writeFile(out, result);
  } catch (err) {
    console.error('Error while writing result to specified file');
    console.error(err);
    process.exit(1);
  }

  console.log(`Successfully written into ${path.resolve(out)}`);
})();
