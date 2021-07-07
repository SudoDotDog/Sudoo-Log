/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 */

import { ILog, LogFunction, LOG_LEVEL, PrettifyConfig } from "./declare";
import { prettifyLogContents } from './prettify';

export class SudooLog implements ILog {

    private static _instance: SudooLog | undefined;

    public static create(level: LOG_LEVEL): SudooLog {

        return new SudooLog(level);
    }

    public static get global(): SudooLog {

        if (!this._instance) {
            this._instance = new SudooLog(LOG_LEVEL.ALL);
        }

        return this._instance;
    }

    private _level: LOG_LEVEL;
    private _count: number;

    private _showTime: boolean;
    private _separator: string;
    private _scope: string;
    private _capitalizeScope: boolean;

    private _logFunction: LogFunction;

    private constructor(level: LOG_LEVEL) {

        this._level = level;
        this._count = 0;

        this._showTime = false;
        this._separator = ', ';
        this._scope = '';
        this._capitalizeScope = true;

        this._logFunction = this._buildLogFunction(console.log);
    }

    public get length(): number {
        return this._count;
    }

    public showTime(): this {

        this._showTime = true;
        return this;
    }

    public hideTime(): this {

        this._showTime = false;
        return this;
    }

    public setSeparator(separator: string): this {

        this._separator = separator;
        return this;
    }

    public level(level: LOG_LEVEL): SudooLog {

        this._level = level;
        return this;
    }

    public setLogFunction(logFunction: LogFunction): SudooLog {

        this._logFunction = this._buildLogFunction(logFunction);
        return this;
    }

    public critical(...contents: any[]): SudooLog {

        if (!this._expect([
            LOG_LEVEL.CRITICAL,
            LOG_LEVEL.ERROR,
            LOG_LEVEL.WARNING,
            LOG_LEVEL.INFO,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) {
            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.CRITICAL,
            contents,
            this._getConfig(),
        );

        this._logFunction(prettified);
        return this;
    }

    public error(...contents: any[]): SudooLog {

        if (!this._expect([
            LOG_LEVEL.ERROR,
            LOG_LEVEL.WARNING,
            LOG_LEVEL.INFO,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) {
            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.ERROR,
            contents,
            this._getConfig(),
        );

        this._logFunction(prettified);
        return this;
    }

    public warning(...contents: any[]): SudooLog {

        if (!this._expect([
            LOG_LEVEL.WARNING,
            LOG_LEVEL.INFO,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) {
            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.WARNING,
            contents,
            this._getConfig(),
        );

        this._logFunction(prettified);
        return this;
    }

    public info(...contents: any[]): SudooLog {

        if (!this._expect([
            LOG_LEVEL.INFO,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) {

            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.INFO,
            contents,
            this._getConfig(),
        );

        this._logFunction(prettified);
        return this;
    }

    public debug(...contents: any[]): SudooLog {

        if (!this._expect([
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) {
            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.DEBUG,
            contents,
            this._getConfig(),
        );

        this._logFunction(prettified);
        return this;
    }

    public verbose(...contents: any[]): SudooLog {

        if (!this._expect([
            LOG_LEVEL.VERBOSE,
        ])) {
            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.VERBOSE,
            contents,
            this._getConfig(),
        );

        this._logFunction(prettified);
        return this;
    }

    public reset(): SudooLog {

        this._count = 0;
        return this;
    }

    protected _buildLogFunction(logFunction: LogFunction): LogFunction {

        return (...contents: string[]): void => {
            this._count++;
            logFunction(...contents);
        };
    }

    private _expect(modes: LOG_LEVEL[]): boolean {

        return this._level === LOG_LEVEL.ALL || modes.includes(this._level);
    }

    private _getConfig(): PrettifyConfig {

        return {

            showTime: this._showTime,
            separator: this._separator,
            scope: this._scope,
            capitalizeScope: this._capitalizeScope,
        };
    }
}
