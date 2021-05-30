import os from 'os';
import * as composers from '../../../core/output-composers';
import parserOutputMock from '../../fixtures/default-parser-output';
import { generateCheckSum } from '../../../utils/helpers';

type ExpectedCheckSums = { [key: string]: string };

describe('Output composers', () => {
  describe('HTML composer', () => {
    test('HTML composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: 'b6c90529188fbcb69d7465434efe5474',
        darwin: '184bd5ef030e1de14acd021c23e52350',
        linux: '184bd5ef030e1de14acd021c23e52350'
      };

      const htmlComposer = new composers.HTMLComposer();
      const htmlBuffer = await htmlComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(htmlBuffer.toString());
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('PNG composer', () => {
    test('PNG composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: 'ce3d4255fcf19e21ec3af78cba76df0c',
        darwin: '4318bd56b45260a349797b16dbb49aa8',
        linux: '3ab0a9c8357caa01c2d81101957291c1'
      };

      const pngComposer = new composers.PNGComposer();
      const pngBuffer = await pngComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(pngBuffer.toString());
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('JPEG composer', () => {
    test('JPEG composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: '8bbec4bfdee9aa2a9749cc1eb60a2803',
        darwin: '0978e66c3543423e9f722aa7d6925b30',
        linux: '92337e7074b55c5075e5330e2e260fe7'
      };

      const jpegComposer = new composers.JPEGComposer();
      const jpegBuffer = await jpegComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(jpegBuffer.toString());
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('WEBP composer', () => {
    test('WEBP composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: 'eb51044567e7cb9a17cd446cc22959a0',
        darwin: '1f92324554b7fd224816ab9094636c5e',
        linux: '15751710471d7a13df07e6c85ac1f2e1'
      };

      const webpComposer = new composers.WEBPComposer();
      const webpBuffer = await webpComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(webpBuffer.toString());
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('TIFF composer', () => {
    test('TIFF composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: '7f95ef59c470ec7804ac658496d84af0',
        darwin: 'dcef00e844cc24d6b8d793f098d55bc7',
        linux: '5302104bd19f3323798c762dd4aa5a21'
      };

      const tiffComposer = new composers.TIFFComposer();
      const tiffBuffer = await tiffComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(tiffBuffer.toString());
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('JSON composer', () => {
    test('JSON composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: 'ac8f95a61c3db79280b3c1179f430993',
        darwin: 'ac8f95a61c3db79280b3c1179f430993',
        linux: 'ac8f95a61c3db79280b3c1179f430993'
      };

      const jsonComposer = new composers.JSONComposer();
      const jsonBuffer = await jsonComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(jsonBuffer.toString());
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('XML composer', () => {
    test('XML composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: '569c6199e79eacdba61fd2fc83424e1e',
        darwin: '2b41dcab4bc0b5cf155a4d8ff1e41f8e',
        linux: '2b41dcab4bc0b5cf155a4d8ff1e41f8e'
      };

      const xmlComposer = new composers.XMLComposer();
      const xmlBuffer = await xmlComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(xmlBuffer.toString());
      console.log(receivedCheckSum);
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
});
