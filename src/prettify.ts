/**
 * @author WMXPY
 * @namespace Log
 * @description Prettify
 */

import { COLORS, LOG_MODE } from './declare';

const isTTY = (): boolean => {

    if (Boolean(process) && Boolean(process.stdout)) {
        return process.stdout.isTTY;
    }

    return false;
};

const wrapContent = (colors: COLORS[], content: string) =>
    `${colors.join('')}${content}${COLORS.RESET}`;

const getQuote = (mode: LOG_MODE): string => {

    switch (mode) {

        case LOG_MODE.CRITICAL: return '[CRIT]';
        case LOG_MODE.DEBUG: return '[DBUG]';
        case LOG_MODE.ERROR: return '[ERRR]';
        case LOG_MODE.INFO: return '[INFO]';
        case LOG_MODE.WARNING: return '[WARN]';
        case LOG_MODE.VERBOSE:
        default: return '[VERB]';
    }
};

const getPrettyColor = (mode: LOG_MODE): [COLORS[], COLORS | null] => {

    switch (mode) {

        case LOG_MODE.CRITICAL: return [
            [
                COLORS.BACK_RED,
                COLORS.FRONT_WHITE,
            ],
            COLORS.FRONT_RED,
        ];
        case LOG_MODE.ERROR: return [
            [
                COLORS.BACK_MAGENTA,
                COLORS.FRONT_WHITE,
            ],
            COLORS.FRONT_MAGENTA,
        ];
        case LOG_MODE.WARNING: return [
            [
                COLORS.BACK_YELLOW,
                COLORS.FRONT_WHITE,
            ],
            COLORS.FRONT_YELLOW,
        ];
        case LOG_MODE.VERBOSE: return [
            [
                COLORS.BACK_BLACK,
                COLORS.FRONT_WHITE,
            ],
            COLORS.FRONT_GRAY,
        ];
        default: return [
            [
                COLORS.BACK_BLACK,
                COLORS.FRONT_WHITE,
            ],
            null,
        ];
    }
};

export const prettifyString = (mode: LOG_MODE, str: string): string => {

    if (isTTY()) {

        const [back, front]: [COLORS[], COLORS | null] = getPrettyColor(mode);

        const wrappedBack = wrapContent(back, getQuote(mode));

        if (front) {

            return wrappedBack + wrapContent([front], str);
        }

        return wrappedBack + str;
    }
};

