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
        win32: '1a34353ccf36732b82e6a59e2f82364c',
        darwin: 'db9d1113dc5bf044c307bb89766dd36c',
        linux: 'cb3613ef858302896874d3e89f747260'
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
        win32: 'abcaf919c6d56e403d2abd88f211f6c4',
        darwin: 'e74d51e2ce1a101a31a0b9faebce8c20',
        linux: 'b54db1eefa628723b8770bc0269bfbaa'
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
        win32: 'bb532e634927906f21f13ae95af2d9ef',
        darwin: 'bb79d771895f936a1827762c19365155',
        linux: '4cbb47575aa94a64a8484aa53e521174'
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
        win32: 'c17f4a3fec6b301edbd5011aef261dc1',
        darwin: '1ae659c94efbbc5726beb545133a3927',
        linux: 'a9d1c054eda6d8464305ba70994d1a9b'
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
      const expectedCheckSum = expectedCheckSums[os.platform()] || expectedCheckSums.linux;
      expect(receivedCheckSum).toEqual(expectedCheckSum);
    });
  });
});
