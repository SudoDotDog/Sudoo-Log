/**
 * @author WMXPY
 * @namespace Log
 * @description Index
 */

import { LOG_LEVEL } from "./declare";
import { prettifyString } from './prettify';

export class SudooLog {

    public static create(level: LOG_LEVEL): SudooLog {

        return new SudooLog(level);
    }

    public static get global(): SudooLog {

        if (!this._instance) {
            this._instance = new SudooLog(LOG_LEVEL.ALL);
        }

        return this._instance;
    }

    private static _instance: SudooLog | undefined;

    private _level: LOG_LEVEL;
    private _count: number;

    private _func: (...contents: string[]) => void;

    private constructor(level: LOG_LEVEL) {

        this._level = level;
        this._count = 0;

        this._func = this._buildFunc(console.log);
    }

    public get length(): number {

        return this._count;
    }

    public level(level: LOG_LEVEL): SudooLog {

        this._level = level;
        return this;
    }

    public func(func: (content: string) => void): SudooLog {

        this._func = this._buildFunc(func);
        return this;
    }

    public critical(str: string): SudooLog {
        if (!this._expect([
            LOG_LEVEL.CRITICAL,
            LOG_LEVEL.ERROR,
            LOG_LEVEL.WARNING,
            LOG_LEVEL.INFO,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) return this;

        const prettified: string = prettifyString(LOG_LEVEL.CRITICAL, str);

        this._func(prettified);
        return this;
    }

    public error(str: string): SudooLog {
        if (!this._expect([
            LOG_LEVEL.ERROR,
            LOG_LEVEL.WARNING,
            LOG_LEVEL.INFO,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) return this;

        const prettified: string = prettifyString(LOG_LEVEL.ERROR, str);

        this._func(prettified);
        return this;
    }

    public warning(str: string): SudooLog {
        if (!this._expect([
            LOG_LEVEL.WARNING,
            LOG_LEVEL.INFO,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) return this;

        const prettified: string = prettifyString(LOG_LEVEL.WARNING, str);

        this._func(prettified);
        return this;
    }

    public info(str: string): SudooLog {
        if (!this._expect([
            LOG_LEVEL.INFO,
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) return this;

        const prettified: string = prettifyString(LOG_LEVEL.INFO, str);

        this._func(prettified);
        return this;
    }

    public debug(str: string): SudooLog {
        if (!this._expect([
            LOG_LEVEL.DEBUG,
            LOG_LEVEL.VERBOSE,
        ])) return this;

        const prettified: string = prettifyString(LOG_LEVEL.DEBUG, str);

        this._func(prettified);
        return this;
    }

    public verbose(str: string): SudooLog {

        if (!this._expect([
            LOG_LEVEL.VERBOSE,
        ])) return this;

        const prettified: string = prettifyString(LOG_LEVEL.VERBOSE, str);

        this._func(prettified);
        return this;
    }

    public reset(): SudooLog {

        this._count = 0;
        return this;
    }

    protected _buildFunc(func: (...content: string[]) => void): (...content: string[]) => void {

        return (...contents: string[]): void => {
            this._count++;
            func(...contents);
        };
    }

    private _expect(modes: LOG_LEVEL[]): boolean {

        return this._level === LOG_LEVEL.ALL || modes.includes(this._level);
    }
}

export { LOG_LEVEL };
