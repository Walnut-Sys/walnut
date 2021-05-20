import IOutputComposer from '../interfaces/output-composer';

export default class XMLComposer implements IOutputComposer {
  public async compose(): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      resolve(Buffer.alloc(8));
    });
  }
}
