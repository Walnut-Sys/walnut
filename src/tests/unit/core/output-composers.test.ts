import os from 'os';
import * as composers from '../../../core/output-composers';
import parserOutputMock from '../../fixtures/default-parser-output';
import { generateCheckSum } from '../../../utils/helpers';

type ExpectedCheckSums = { [key: string]: string };

describe('Output composers', () => {
  describe('HTML composer', () => {
    test('HTML composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: 'c4b8aa5d80657d9c07d6abcf0e7b3676',
        linux: 'eb7fd023cfdc891ca5e117b37c696015'
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
        linux: '10d5c5b3ae92308873a5da3b7df6541e'
      };

      const pngComposer = new composers.PNGComposer();
      const pngBuffer = await pngComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(pngBuffer.toString(), {
        inputEncoding: 'binary'
      });
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('JPEG composer', () => {
    test('JPEG composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: '8bbec4bfdee9aa2a9749cc1eb60a2803',
        linux: '6e625727177a48e2788a45dfb8691255'
      };

      const jpegComposer = new composers.JPEGComposer();
      const jpegBuffer = await jpegComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(jpegBuffer.toString(), {
        inputEncoding: 'binary'
      });
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('WEBP composer', () => {
    test('WEBP composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: 'eb51044567e7cb9a17cd446cc22959a0',
        linux: '76b27fc080154e510856042553675914'
      };

      const webpComposer = new composers.WEBPComposer();
      const webpBuffer = await webpComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(webpBuffer.toString(), {
        inputEncoding: 'binary'
      });
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('TIFF composer', () => {
    test('TIFF composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: '7f95ef59c470ec7804ac658496d84af0',
        linux: 'edf52fd8ce672b4b51ebfe542f6c24a7'
      };

      const tiffComposer = new composers.TIFFComposer();
      const tiffBuffer = await tiffComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(tiffBuffer.toString(), {
        inputEncoding: 'binary'
      });
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('JSON composer', () => {
    test('JSON composer with valid input', async () => {
      const expectedCheckSums: ExpectedCheckSums = {
        win32: 'ac8f95a61c3db79280b3c1179f430993',
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
        win32: 'e6a45a7fac5725b2a493bfe0c4e51207',
        linux: '5a18a14220323e8b5e2af5b7370a3e18'
      };

      const xmlComposer = new composers.XMLComposer();
      const xmlBuffer = await xmlComposer.compose(parserOutputMock);

      const receivedCheckSum = generateCheckSum(xmlBuffer.toString());
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
});
