import * as composers from '../../../core/output-composers';
import ComposingError from '../../../core/errors/composing-error';
import parserOutputMock from '../../fixtures/default-parser-output';

jest.mock('../../../core/utils/svg');

describe('Composing errors in output composers', () => {
  describe('PNG composer', () => {
    test('PNG composer should throw ComposingError, cause - corrupted svg template', async () => {
      const pngComposer = new composers.PNGComposer();
      await expect(pngComposer.compose(parserOutputMock)).rejects.toThrow(ComposingError);
    });
  });
  describe('JPEG composer', () => {
    test('JPEG composer should throw ComposingError, cause - corrupted svg template', async () => {
      const jpegComposer = new composers.JPEGComposer();
      await expect(jpegComposer.compose(parserOutputMock)).rejects.toThrow(ComposingError);
    });
  });
  describe('WEBP composer', () => {
    test('WEBP composer should throw ComposingError, cause - corrupted svg template', async () => {
      const webpComposer = new composers.WEBPComposer();
      await expect(webpComposer.compose(parserOutputMock)).rejects.toThrow(ComposingError);
    });
  });
  describe('TIFF composer', () => {
    test('TIFF composer should throw ComposingError, cause - corrupted svg template', async () => {
      const tiffComposer = new composers.TIFFComposer();
      await expect(tiffComposer.compose(parserOutputMock)).rejects.toThrow(ComposingError);
    });
  });
});
