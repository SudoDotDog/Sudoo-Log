/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 */

import { LOG_LEVEL, LevelDeterminer, LogFunction, SudooLogConfig } from "./declare";
import { prettifyLogContents } from './prettify';
import { buildLogConfig } from "./util";

export class SudooLog {

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

    private readonly _logFunction: LogFunction;

    private _count: number;

    private constructor(
        level: LOG_LEVEL,
        config: SudooLogConfig,
    ) {

        this._level = level;
        this._config = config;

        this._count = 0;

        this._logFunction = this._buildLogFunction(
            config.logFunction,
        );
    }

    public get length(): number {
        return this._count;
    }
    public get level(): LOG_LEVEL {
        return this._level;
    }

    public forkScope(scope: string): SudooLog {

        return SudooLog.create(this._level, {
            ...this._config,
            scopes: [
                ...this._config.scopes,
                scope,
            ],
        });
    }

    public forkLevel(level: LOG_LEVEL): SudooLog {

        return SudooLog.create(level, this._config);
    }

    public forkLogFunction(logFunction: LogFunction): SudooLog {

        return SudooLog.create(this._level, {
            ...this._config,
            logFunction,
        });
    }

    public critical(scope: string, ...contents: any[]): this {

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
            this._config,
        );

        this._logFunction(prettified);
        return this;
    }

    public error(...contents: any[]): this {

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
            this._config,
        );

        this._logFunction(prettified);
        return this;
    }

    public warning(...contents: any[]): this {

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
            this._config,
        );

        this._logFunction(prettified);
        return this;
    }

    public info(...contents: any[]): this {

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
            this._config,
        );

        this._logFunction(prettified);
        return this;
    }

    public debug(...contents: any[]): this {

        if (!this._expect([
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) {
            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.DEBUG,
            contents,
            this._config,
        );

        this._logFunction(prettified);
        return this;
    }

    public verbose(...contents: any[]): this {

        if (!this._expect([
            LOG_LEVEL.VERBOSE,
        ])) {
            return this;
        }

        const prettified: string = prettifyLogContents(
            LOG_LEVEL.VERBOSE,
            contents,
            this._config,
        );

        this._logFunction(prettified);
        return this;
    }

    public resetCount(): this {

        this._count = 0;
        return this;
    }

    private _buildLogFunction(logFunction: LogFunction): LogFunction {

        return (...contents: string[]): void => {

            this._count++;
            logFunction(...contents);
        };
    }

    private _expect(modes: LOG_LEVEL[]): boolean {

        return this._level === LOG_LEVEL.ALL || modes.includes(this._level);
    }
}
