/**
 * @author WMXPY
 * @namespace Log
 * @description Prettify
 */

import { COLORS, LOG_LEVEL, PrettifyConfig } from './declare';
import { appropriateDateStringWithTime } from './util';

const isTTY = (): boolean => {

    if (Boolean(process) && Boolean(process.stdout)) {

        return Boolean(process.stdout.isTTY);
    }

    return false;
};

const wrapContent = (colors: COLORS[], content: string) => {

    return `${colors.join('')}${content}${COLORS.RESET}`;
};

const getQuote = (mode: LOG_LEVEL): string => {

    switch (mode) {

        case LOG_LEVEL.CRITICAL: return '[CRIT]';
        case LOG_LEVEL.DEBUG: return '[DBUG]';
        case LOG_LEVEL.ERROR: return '[ERRR]';
        case LOG_LEVEL.INFO: return '[INFO]';
        case LOG_LEVEL.WARNING: return '[WARN]';
        case LOG_LEVEL.VERBOSE:
        default: return '[VERB]';
    }
};

const getPrettyColor = (mode: LOG_LEVEL): [COLORS[], COLORS | null] => {

    switch (mode) {

        case LOG_LEVEL.CRITICAL: return [
            [
                COLORS.BACK_RED,
                COLORS.FRONT_WHITE,
            ],
            COLORS.FRONT_RED,
        ];
        case LOG_LEVEL.ERROR: return [
            [
                COLORS.BACK_MAGENTA,
                COLORS.FRONT_WHITE,
            ],
            COLORS.FRONT_MAGENTA,
        ];
        case LOG_LEVEL.WARNING: return [
            [
                COLORS.BACK_YELLOW,
                COLORS.FRONT_WHITE,
            ],
            COLORS.FRONT_YELLOW,
        ];
        case LOG_LEVEL.VERBOSE: return [
            [
                COLORS.BACK_BLACK,
                COLORS.FRONT_WHITE,
            ],
            COLORS.FRONT_GRAY,
        ];
    }

    return [
        [
            COLORS.BACK_BLACK,
            COLORS.FRONT_WHITE,
        ],
        null,
    ];
};

const mergeContent = (quote: string, str: string, config: PrettifyConfig): string => {

    if (config.showTime) {

        const date: Date = new Date();
        const prettifiedDate: string = appropriateDateStringWithTime(date);

        return `${quote} ${prettifiedDate} ${str}`;
    }

    return `${quote} ${str}`;
};

export const prettifyString = (mode: LOG_LEVEL, str: string, config: PrettifyConfig): string => {

    if (isTTY()) {

        const [back, front]: [COLORS[], COLORS | null] = getPrettyColor(mode);

        const wrappedBack = wrapContent(back, getQuote(mode));

        if (front) {
            return mergeContent(wrappedBack, wrapContent([front], str), config);
        }

        return mergeContent(wrappedBack, str, config);
    }

    return mergeContent(getQuote(mode), str, config);
};
