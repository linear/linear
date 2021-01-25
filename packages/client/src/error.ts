import { LinearErrorType } from "./types";

/**
 * An error from the Linear API
 */
export class LinearError extends Error {
  public type?: LinearErrorType;

  public constructor(type: LinearErrorType, message: string) {
    super(message);
    this.type = type;
  }
}
