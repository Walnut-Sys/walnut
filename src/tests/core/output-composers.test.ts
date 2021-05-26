import crypto from 'crypto';
import * as composers from '../../core/output-composers';
import parserOutputMock from './default-parser-output';

const checkSum = (data: any, algorithm?: string): string => {
  return crypto
    .createHash(algorithm || 'md5')
    .update(data, 'utf-8')
    .digest('hex');
};

describe('Output composers', () => {
  describe('HTML composer', () => {
    test('HTML composer with valid input', async () => {
      const htmlComposer = new composers.HTMLComposer();
      const expectedCheckSum = 'c4b8aa5d80657d9c07d6abcf0e7b3676';
      const htmlBuffer = await htmlComposer.compose(parserOutputMock);
      const receivedCheckSum = checkSum(htmlBuffer.toString());
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('PNG composer', () => {
    test('PNG composer with valid input', async () => {
      const pngComposer = new composers.PNGComposer();
      const expectedCheckSum = 'ce3d4255fcf19e21ec3af78cba76df0c';
      const pngBuffer = await pngComposer.compose(parserOutputMock);
      const receivedCheckSum = checkSum(pngBuffer.toString());
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('JPEG composer', () => {
    test('JPEG composer with valid input', async () => {
      const jpegComposer = new composers.JPEGComposer();
      const expectedCheckSum = '8bbec4bfdee9aa2a9749cc1eb60a2803';
      const jpegBuffer = await jpegComposer.compose(parserOutputMock);
      const receivedCheckSum = checkSum(jpegBuffer.toString());
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('WEBP composer', () => {
    test('WEBP composer with valid input', async () => {
      const webpComposer = new composers.WEBPComposer();
      const expectedCheckSum = 'eb51044567e7cb9a17cd446cc22959a0';
      const webpBuffer = await webpComposer.compose(parserOutputMock);
      const receivedCheckSum = checkSum(webpBuffer.toString());
      expect(expectedCheckSum).toEqual(receivedCheckSum);
    });
  });
  describe('TIFF composer', () => {
    test('TIFF composer with valid input', async () => {
      const tiffComposer = new composers.TIFFComposer();
      const expectedCheckSum = '7f95ef59c470ec7804ac658496d84af0';
      const tiffBuffer = await tiffComposer.compose(parserOutputMock);
      const receivedCheckSum = checkSum(tiffBuffer.toString());
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('JSON composer', () => {
    test('JSON composer with valid input', async () => {
      const jsonComposer = new composers.JSONComposer();
      const expectedCheckSum = 'ac8f95a61c3db79280b3c1179f430993';
      const jsonBuffer = await jsonComposer.compose(parserOutputMock);
      const receivedCheckSum = checkSum(jsonBuffer.toString());
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
  describe('XML composer', () => {
    test('XML composer with valid input', async () => {
      const xmlComposer = new composers.XMLComposer();
      const expectedCheckSum = 'e6a45a7fac5725b2a493bfe0c4e51207';
      const xmlBuffer = await xmlComposer.compose(parserOutputMock);
      const receivedCheckSum = checkSum(xmlBuffer.toString());
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
});
