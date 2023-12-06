export class DigiError extends Error {
  public readonly name: string;

  public constructor() {
    super();
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
