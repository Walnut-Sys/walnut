import IOutputComposer from '../interfaces/output-composer';

export default class JPEGComposer implements IOutputComposer {
  public async compose(): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      resolve(Buffer.alloc(8));
    });
  }
}
