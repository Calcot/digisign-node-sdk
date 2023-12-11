export class DigiError extends Error {
  public readonly name: string;
  public readonly code: string;

  public constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
  }

  public override toString() {
    return JSON.stringify(
      {
        message: this.message,
        name: this.name,
      },
      null,
      2,
    );
  }
}
