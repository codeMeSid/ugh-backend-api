import pino, { Logger } from "pino";
import { config } from "../config";

class Log {
  private log: Logger;
  constructor() {
    this.log = pino({
      level: config.LOG_LEVEL,
      transport: { target: "pino-pretty", options: { colorize: true } },
    });
  }
  info(message: string) {
    if (!this.log) throw new Error("CONSOLE_LOG NOT WORKING");
    this.log.info(message);
  }
  error(message: string) {
    if (!this.log) throw new Error("CONSOLE_LOG NOT WORKING");
    this.log.error(message);
  }
}

export const log = new Log();
