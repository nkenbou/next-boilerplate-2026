import util from "util";

type ClassLike = {
  new (...params: never): unknown;
  name: string;
};

type MessageLike = {
  toString: () => string;
};

const LogColors = {
  TRACE: [37, 39],
  DEBUG: [32, 39],
  INFO: [34, 39],
  WARN: [33, 39],
  ERROR: [31, 39],
  FATAL: [91, 39],
};
type LogLevel = keyof typeof LogColors;

function logLabel(logLevel: LogLevel): string {
  const code = LogColors[logLevel];
  return `\u001b[${code[0]}m${logLevel}\u001b[${code[1]}m`;
}

export interface Logger {
  classLogger(klass: ClassLike): Logger;
  trace(message: unknown): void;
  debug(message: unknown): void;
  info(message: unknown): void;
  warn(message: unknown): void;
  error(message: unknown): void;
  fatal(message: unknown): void;
}

export abstract class AbstractLogger {
  trace(message: unknown): void {
    console.log(this.createMessage("TRACE", this.createMessageText(message)));
  }

  debug(message: unknown): void {
    console.debug(this.createMessage("DEBUG", this.createMessageText(message)));
  }

  info(message: unknown): void {
    console.info(this.createMessage("INFO", this.createMessageText(message)));
  }

  warn(message: unknown): void {
    console.warn(this.createMessage("WARN", this.createMessageText(message)));
  }

  error(message: unknown): void {
    console.error(this.createMessage("ERROR", this.createMessageText(message)));
  }

  fatal(message: unknown): void {
    console.error(this.createMessage("FATAL", this.createMessageText(message)));
  }

  protected createMessageText(message: unknown): string {
    if (typeof message === "string") {
      return message;
    }

    if (message instanceof Error) {
      return message.stack ?? message.message;
    }

    if (
      message != null &&
      typeof message === "object" &&
      "toString" in message
    ) {
      return (message as MessageLike).toString();
    }

    return String(message);
  }

  protected contextPrefix(): string {
    return "";
  }

  protected createMessage(logLevel: LogLevel, message: MessageLike): string {
    const callSite = util.getCallSites(3).at(2)!;
    const functionName = callSite.functionName;
    return `${logLabel(logLevel)}\t${this.contextPrefix()}${functionName && `${functionName}()\t`}${message.toString()}`;
  }
}

export class LoggerMock extends AbstractLogger implements Logger {
  private constructor() {
    super();
  }

  static create(): Logger {
    return new LoggerMock();
  }

  classLogger(_klass: ClassLike): Logger {
    return this;
  }

  trace(_message: unknown): void {}

  debug(_message: unknown): void {}

  info(_message: unknown): void {}

  warn(_message: unknown): void {}

  error(_message: unknown): void {}

  fatal(_message: unknown): void {}
}

export class GenericLogger extends AbstractLogger implements Logger {
  protected constructor(private readonly className?: string) {
    super();
  }

  static create(): Logger {
    return new GenericLogger();
  }

  classLogger(klass: ClassLike): Logger {
    return new GenericLogger(klass.name);
  }

  protected contextPrefix(): string {
    return this.className ? `${this.className}.` : "";
  }
}

export class SessionLogger extends AbstractLogger implements Logger {
  protected constructor(
    private readonly sessionId: string,
    private readonly className?: string,
  ) {
    super();
  }

  static create(sessionId: string): Logger {
    return new SessionLogger(sessionId);
  }

  classLogger(klass: ClassLike): Logger {
    return new SessionLogger(this.sessionId, klass.name);
  }

  protected contextPrefix(): string {
    const classPrefix = this.className ? `${this.className}.` : "";
    return `${this.sessionId} \t${classPrefix}`;
  }
}
