export default class ComposingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OutputComposingError';
  }
}
