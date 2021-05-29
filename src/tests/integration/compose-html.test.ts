import os from 'os';
import Parser from '../../core/parser';
import { HTMLComposer } from '../../core/output-composers';
import { generateCheckSum } from '../../utils/helpers';

type ExpectedCheckSums = { [key: string]: string };

test('Composes correct html from source code', async () => {
  const expectedCheckSums: ExpectedCheckSums = {
    win32: 'c4b8aa5d80657d9c07d6abcf0e7b3676',
    darwin: '184bd5ef030e1de14acd021c23e52350',
    linux: '184bd5ef030e1de14acd021c23e52350'
  };

  const sourceCode = `
LOCALIZATION: EN
COLORS:
  white squares: #f9c48d
  black squares: #84271d
  white pieces: #c38748
  black pieces: #150503
  border: #a73a2f
  symbols: #efefef

WHITE POS: Ra1,Nb1,Bc1,Qd1,Ke1,Bf1,Ng1,Rh1,a2,b2,c4,d2,e2,f2,g2,h2
BLACK POS: Ra8,Nb8,Bc8,Qd8,Ke8,Bf8,Ng8,Rh8,a7,b7,c7,d7,e7,f7,g7,h7
  `;

  const parser = new Parser();
  const parserOutput = parser.parse(sourceCode);

  const composer = new HTMLComposer();
  const htmlBuffer = await composer.compose(parserOutput);

  const receivedCheckSum = generateCheckSum(htmlBuffer.toString());
  const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;

  expect(receivedCheckSum).toEqual(expectedCheckSum);
});
