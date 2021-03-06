/**
 * @author WMXPY
 * @namespace Log
 * @description Prettify
 */

import { COLORS, LOG_LEVEL, PrettifyConfig } from './declare';
import { appropriateDateStringWithTime } from './util';

const isTTY = (config: PrettifyConfig): boolean => {

    if (typeof config.tty === 'boolean') {
        return config.tty;
    }

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

        case LOG_LEVEL.CRITICAL: return 'CRITICAL';
        case LOG_LEVEL.ERROR: return 'ERROR';
        case LOG_LEVEL.WARNING: return 'WARNING';
        case LOG_LEVEL.INFO: return 'INFO';
        case LOG_LEVEL.DEBUG: return 'DEBUG';
        case LOG_LEVEL.VERBOSE: return 'VERBOSE';
    }

    return 'UNKNOWN';
};

const scopeQuote = (quote: string, config: PrettifyConfig): string => {

    if (config.scope === '') {
        return `[${quote}]`;
    }

    if (config.capitalizeScope) {
        return `[${config.scope.toUpperCase()}/${quote}]`;
    }

    return `[${config.scope}/${quote}]`;
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

const stringifyContents = (content: any): string => {

    if (typeof content === 'undefined') {
        return '(undefined)';
    }

    if (content === null) {
        return '(null)';
    }

    if (typeof content === 'string') {
        return content;
    }

    if (typeof content === 'number') {
        return content.toString();
    }

    if (typeof content === 'bigint') {
        return `${content.toString()}n`;
    }

    if (Array.isArray(content)) {

        const joinedList: string = content
            .map((element: any) => stringifyContents(element))
            .join(', ');

        return `[${joinedList}]`;
    }

    const dateAttempt: Date = new Date(content);
    if (!isNaN(dateAttempt.getTime())) {
        return dateAttempt.toISOString();
    }

    if (typeof content === 'object') {

        const joinedObject: string = Object.entries(content)
            .map((entry: [any, any]) => `${entry[0]}: ${stringifyContents(entry[1])}`)
            .join(', ');

        return `{${joinedObject}}`;
    }

    if (typeof content.toString === 'function') {
        return content.toString();
    }

    return String(content);
};

const concatContents = (
    contents: any[],
    config: PrettifyConfig,
): string => {

    return contents
        .map((content: any) => stringifyContents(content))
        .join(config.separator);
};

export const prettifyLogContents = (
    mode: LOG_LEVEL,
    contents: any[],
    config: PrettifyConfig,
): string => {

    const contentString: string = concatContents(contents, config);
    const quote: string = getQuote(mode);
    const quoteText: string = scopeQuote(quote, config);

    if (isTTY(config)) {

        const [back, front]: [COLORS[], COLORS | null] = getPrettyColor(mode);
        const wrappedBack: string = wrapContent(back, quoteText);

        if (front) {
            return mergeContent(wrappedBack, wrapContent([front], contentString), config);
        }

        return mergeContent(wrappedBack, contentString, config);
    }

    return mergeContent(quoteText, contentString, config);
};
