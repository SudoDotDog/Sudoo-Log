/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 */

import { LogFunction, LOG_LEVEL, PrettifyConfig } from "./declare";
import { prettifyLogContents } from './prettify';

export class SudooLog {

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
    private _capitalizeScope: boolean;

    private _tty?: boolean;

    private _scope: string;

    private _logFunction: LogFunction;

    private constructor(level: LOG_LEVEL) {

        this._level = level;
        this._count = 0;

        this._showTime = false;
        this._separator = ', ';
        this._capitalizeScope = true;

        this._scope = '';

        this._logFunction = this._buildLogFunction(console.log);
    }

    public get length(): number {
        return this._count;
    }
    public get level(): LOG_LEVEL {
        return this._level;
    }
    public get scope(): string {
        return this._scope;
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

    public setCapitalizeScope(capitalizeScope: boolean): this {

        this._capitalizeScope = capitalizeScope;
        return this;
    }

    public setTTY(tty: boolean): this {

        this._tty = tty;
        return this;
    }

    public setScope(scope: string): this {

        this._scope = scope;
        return this;
    }

    public setLevel(level: LOG_LEVEL): this {

        this._level = level;
        return this;
    }

    public setLogFunction(logFunction: LogFunction): this {

        this._logFunction = this._buildLogFunction(logFunction);
        return this;
    }

    public critical(...contents: any[]): this {

        return this.scopedCritical(this._scope, ...contents);
    }

    public error(...contents: any[]): this {

        return this.scopedError(this._scope, ...contents);
    }

    public warning(...contents: any[]): this {

        return this.scopedWarning(this._scope, ...contents);
    }

    public info(...contents: any[]): this {

        return this.scopedInfo(this._scope, ...contents);
    }

    public debug(...contents: any[]): this {

        return this.scopedDebug(this._scope, ...contents);
    }

    public verbose(...contents: any[]): this {

        return this.scopedVerbose(this._scope, ...contents);
    }

    public scopedCritical(scope: string, ...contents: any[]): this {

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
            this._getConfig(scope),
        );

        this._logFunction(prettified);
        return this;
    }

    public scopedError(scope: string, ...contents: any[]): this {

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
            this._getConfig(scope),
        );

        this._logFunction(prettified);
        return this;
    }

    public scopedWarning(scope: string, ...contents: any[]): this {

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
            this._getConfig(scope),
        );

        this._logFunction(prettified);
        return this;
    }

    public scopedInfo(scope: string, ...contents: any[]): this {

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
            this._getConfig(scope),
        );

        this._logFunction(prettified);
        return this;
    }

    public scopedDebug(scope: string, ...contents: any[]): this {

        if (!this._expect([
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) {
            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.DEBUG,
            contents,
            this._getConfig(scope),
        );

        this._logFunction(prettified);
        return this;
    }

    public scopedVerbose(scope: string, ...contents: any[]): this {

        if (!this._expect([
            LOG_LEVEL.VERBOSE,
        ])) {
            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.VERBOSE,
            contents,
            this._getConfig(scope),
        );

        this._logFunction(prettified);
        return this;
    }

    public reset(): this {

        this._count = 0;
        return this;
    }

    public clone(): SudooLog {

        const instance: SudooLog = new SudooLog(this._level);

        instance._showTime = this._showTime;
        instance._separator = this._separator;
        instance._capitalizeScope = this._capitalizeScope;

        instance._scope = this._scope;

        return instance;
    }

    public fork(scope: string): SudooLog {

        const instance: SudooLog = this.clone();
        instance._scope = scope;

        return instance;
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

    private _getConfig(scope: string): PrettifyConfig {

        return {

            showTime: this._showTime,
            separator: this._separator,
            capitalizeScope: this._capitalizeScope,
            tty: this._tty,
            scope,
        };
    }
}
