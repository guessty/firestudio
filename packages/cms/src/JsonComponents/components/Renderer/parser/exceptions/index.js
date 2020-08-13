export class ParsingError extends Error {
  constructor(value, parsingOption, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParsingError);
    }

    this.name = 'ParsingError';
    // Custom debugging information
    this.originalValue = value;
    this.parsingOption = parsingOption;
    this.date = new Date();
  }
}
