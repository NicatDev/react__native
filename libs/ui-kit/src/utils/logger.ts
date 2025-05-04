declare global {
  export var __LOGGER_INSTANCE__: Logger;
}

export type LogLevel = "debug" | "info" | "log" | "warn" | "error";

class Logger {
  private logLevel: LogLevel | null = "debug";

  enable() {
    this.setLogLevel("debug");
  }

  disable() {
    this.setLogLevel(null);
  }

  setLogLevel(level: LogLevel | null) {
    this.logLevel = level;
  }

  debug(...message: any[]) {
    this._debug("debug", message);
  }

  info(...message: any[]) {
    this._debug("info", message);
  }

  log(...message: any[]) {
    this._debug("log", message);
  }

  warn(...message: any[]) {
    this._debug("warn", message);
  }

  error(...message: any[]) {
    this._debug("error", message);
  }

  private _debug(type: LogLevel, message: any[]) {
    if (this.logLevel === null) return;

    const logLevelOrder = ["debug", "info", "log", "warn", "error"];
    const isLogLevelEnabled = logLevelOrder.indexOf(this.logLevel) <= logLevelOrder.indexOf(type);
    if (isLogLevelEnabled) {
      console[type](...message);
    }
  }
}

export const logger = globalThis.__LOGGER_INSTANCE__ || (globalThis.__LOGGER_INSTANCE__ = new Logger());
