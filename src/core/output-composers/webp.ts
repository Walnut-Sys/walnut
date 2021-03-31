import { Readable } from 'stream';
import IOutputComposer from '../interfaces/output-composer';

export default class WEBPComposer implements IOutputComposer {
	public async compose(): Promise<Readable> {
		return new Promise<Readable>((resolve, reject) => {
			resolve(new Readable());
		});
	}
}
