/**
 * @author WMXPY
 * @namespace Log
 * @description Declare
 */

export type LevelDeterminer = LOG_LEVEL | (() => LOG_LEVEL);
export type LogFunction = (...content: any[]) => void;

export type PrettifyConfig = {

    readonly showTime: boolean;
    readonly separator: string;
    readonly capitalizeScope: boolean;

    readonly scope: string;

    readonly tty?: boolean;
};

export enum LOG_LEVEL {

    CRITICAL = "CRITICAL",
    ERROR = "ERROR",
    WARNING = "WARNING",
    INFO = "INFO",
    DEBUG = "DEBUG",
    VERBOSE = "VERBOSE",
    ALL = "ALL",
}

export enum COLORS {

    RESET = "\x1b[0m",
    BRIGHT = "\x1b[1m",
    DIM = "\x1b[2m",
    UNDERSCORE = "\x1b[4m",
    BLINK = "\x1b[5m",
    REVERSE = "\x1b[7m",
    HIDDEN = "\x1b[8m",

    FRONT_BLACK = "\x1b[30m",
    FRONT_RED = "\x1b[31m",
    FRONT_GREEN = "\x1b[32m",
    FRONT_YELLOW = "\x1b[33m",
    FRONT_BLUE = "\x1b[34m",
    FRONT_MAGENTA = "\x1b[35m",
    FRONT_CYAN = "\x1b[36m",
    FRONT_WHITE = "\x1b[37m",
    FRONT_GRAY = "\x1b[90m",

    BACK_BLACK = "\x1b[40m",
    BACK_RED = "\x1b[41m",
    BACK_GREEN = "\x1b[42m",
    BACK_YELLOW = "\x1b[43m",
    BACK_BLUE = "\x1b[44m",
    BACK_MAGENTA = "\x1b[45m",
    BACK_CYAN = "\x1b[46m",
    BACK_WHITE = "\x1b[47m",
}
