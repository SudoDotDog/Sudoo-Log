/**
 * @author WMXPY
 * @namespace Log
 * @description Log Function
 */

import { LOG_LEVEL, LogFunction } from "./declare";

export const sudooDefaultLogFunction: LogFunction = (
    level: LOG_LEVEL,
    ...args: any[]
): void => {

    switch (level) {

        case LOG_LEVEL.CRITICAL:
            console.error(...args);
            return;
        case LOG_LEVEL.ERROR:
            console.error(...args);
            return;
        case LOG_LEVEL.WARNING:
            console.warn(...args);
            return;
        case LOG_LEVEL.INFO:
            console.info(...args);
            return;
        case LOG_LEVEL.DEBUG:
            console.debug(...args);
            return;
        case LOG_LEVEL.VERBOSE:
            console.debug(...args);
            return;
    }

    console.warn("[SUDOO-LOG] This log level should be handled", level);
    console.log(...args);
};
