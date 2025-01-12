/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 */

import { LOG_LEVEL, LevelDeterminer, LogFunction, PrettifyConfig, SudooLogConfig, buildLogConfig } from "./declare";
import { sudooDefaultLogFunction } from "./log-function";
import { prettifyLogContents } from './prettify';

export class SudooLog {

    private static _instance: SudooLog | undefined;

    public static create(
        level: LevelDeterminer,
        config: Partial<SudooLogConfig> = {},
    ): SudooLog {

        const fixedConfig: SudooLogConfig = buildLogConfig(config);

        if (typeof level === 'function') {
            return new SudooLog(level(), fixedConfig);
        }

        return new SudooLog(level, fixedConfig);
    }

    private readonly _level: LOG_LEVEL;
    private readonly _config: SudooLogConfig;

    private readonly _scope: string[];
    private readonly _prefixes: string[];

    private readonly _logFunction: LogFunction;

    private _count: number;

    private constructor(
        level: LOG_LEVEL,
        config: SudooLogConfig,
    ) {

        this._level = level;
        this._config = config;

        this._scope = [];
        this._prefixes = [];

        this._count = 0;

        this._logFunction = this._buildLogFunction(
            sudooDefaultLogFunction,
        );
    }

    public get length(): number {
        return this._count;
    }
    public get level(): LOG_LEVEL {
        return this._level;
    }

    public extend(scope: string): SudooLog {

        const instance: SudooLog = this.clone();
        instance._scope = [
            ...this._scope,
            scope,
        ];

        return instance;
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

    protected _buildLogFunction(logFunction: LogFunction): LogFunction {

        return (...contents: string[]): void => {

            this._count++;
            logFunction(...contents);
        };
    }

    private _expect(modes: LOG_LEVEL[]): boolean {

        return this._level === LOG_LEVEL.ALL || modes.includes(this._level);
    }
}
