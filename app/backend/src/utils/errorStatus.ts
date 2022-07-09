export default class errorStatus extends Error {
  private _status: number;

  constructor(status: number, message: string) {
    super(message);
    this._status = status;
  }

  public get status(): number {
    return this._status;
  }
}
