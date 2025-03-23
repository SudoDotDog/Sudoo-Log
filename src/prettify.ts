/**
 * @author WMXPY
 * @namespace Log
 * @description Prettify
 */

import { COLORS, LOG_LEVEL, LOG_LEVEL_TYPE, SudooLogConfig } from "./declare";

const wrapContent = (colors: COLORS[], content: string) => {

    return `${colors.join("")}${content}${COLORS.RESET}`;
};

const getQuote = (mode: LOG_LEVEL): string => {

    switch (mode) {

        case LOG_LEVEL.CRITICAL: return "CRITICAL";
        case LOG_LEVEL.ERROR: return "ERROR";
        case LOG_LEVEL.WARNING: return "WARNING";
        case LOG_LEVEL.INFO: return "INFO";
        case LOG_LEVEL.DEBUG: return "DEBUG";
        case LOG_LEVEL.VERBOSE: return "VERBOSE";
    }

    return "UNKNOWN";
};

const getEmojiQuote = (mode: LOG_LEVEL): string => {

    switch (mode) {

        case LOG_LEVEL.CRITICAL: return "❗";
        case LOG_LEVEL.ERROR: return "🔴";
        case LOG_LEVEL.WARNING: return "🟡";
        case LOG_LEVEL.INFO: return "ℹ️";
        case LOG_LEVEL.DEBUG: return "🔷";
        case LOG_LEVEL.VERBOSE: return "➕";
    }

    return "❓";
};

const scopeQuote = (
    quote: string,
    config: SudooLogConfig,
): string => {

    if (config.levelType === LOG_LEVEL_TYPE.SCOPE) {

        const innerBracket: string = [
            quote,
            ...config.scopes,
        ].join("/");

        if (config.capitalizeScope) {
            return `[${innerBracket.toUpperCase()}]`;
        }

        return `[${innerBracket}]`;
    }

    if (config.levelType === LOG_LEVEL_TYPE.EMOJI_PREFIX
        || config.levelType === LOG_LEVEL_TYPE.PREFIX
    ) {

        const innerBracket: string = config.scopes.join("/");

        if (config.capitalizeScope) {
            return `${quote.toUpperCase()} [${innerBracket.toUpperCase()}]`;
        }

        return `${quote} [${innerBracket}]`;
    }

    const innerBracket: string = config.scopes.join("/");

    if (config.capitalizeScope) {
        return `[${innerBracket.toUpperCase()}]`;
    }

    return `[${innerBracket}]`;
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

const mergeContent = (
    quote: string,
    str: string,
    config: SudooLogConfig,
): string => {

    const contentComponents: string[] = [];

    if (config.showTime) {

        const date: Date = new Date();
        const prettifiedDate: string = config.dateFormatter(date);

        contentComponents.push(prettifiedDate);
    }

    contentComponents.push(quote);
    contentComponents.push(...config.prefixes);
    contentComponents.push(str);

    return contentComponents.join(" ");
};

const stringifyContents = (content: any): string => {

    if (typeof content === "undefined") {
        return "(undefined)";
    }

    if (content === null) {
        return "(null)";
    }

    if (typeof content === "string") {
        return content;
    }

    if (typeof content === "number") {
        return content.toString();
    }

    if (typeof content === "bigint") {
        return `${content.toString()}n`;
    }

    if (Array.isArray(content)) {

        const joinedList: string = content
            .map((element: any) => stringifyContents(element))
            .join(", ");

        return `[${joinedList}]`;
    }

    if (content instanceof Date) {
        return content.toISOString();
    }

    if (typeof content === "object") {

        const joinedObject: string = Object.entries(content)
            .map((entry: [any, any]) => `${entry[0]}: ${stringifyContents(entry[1])}`)
            .join(", ");

        return `{${joinedObject}}`;
    }

    if (typeof content.toString === "function") {
        return content.toString();
    }

    return String(content);
};

const concatContents = (
    contents: any[],
    config: SudooLogConfig,
): string => {

    return contents
        .map((content: any) => stringifyContents(content))
        .join(config.separator);
};

export const prettifyLogContents = (
    mode: LOG_LEVEL,
    contents: any[],
    config: SudooLogConfig,
): string => {

    const contentString: string = concatContents(contents, config);
    const quote: string = config.levelType === LOG_LEVEL_TYPE.EMOJI_PREFIX
        ? getEmojiQuote(mode)
        : getQuote(mode);
    const quoteText: string = scopeQuote(quote, config);

    if (config.tty) {

        const [back, front]: [COLORS[], COLORS | null] = getPrettyColor(mode);
        const wrappedBack: string = wrapContent(back, quoteText);

        if (front) {
            return mergeContent(wrappedBack, wrapContent([front], contentString), config);
        }

        return mergeContent(wrappedBack, contentString, config);
    }

    return mergeContent(quoteText, contentString, config);
};
