/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 */

import { LOG_LEVEL, LevelDeterminer, LogFunction, SudooLogConfig, buildLogConfig } from "./declare";
import { prettifyLogContents } from './prettify';

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
