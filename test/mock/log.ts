/**
 * @author WMXPY
 * @namespace Mock
 * @description Log
 * @package Unit Test
 */

import { LOG_LEVEL, LogFunction } from "../../src";

export type SimpleMockLogFunction = {

    func: LogFunction;
    logs: string[];
};

export const createSimpleMockLogFunction = (): SimpleMockLogFunction => {

    const logs: string[] = [];
    return {

        func: (_level: LOG_LEVEL, ...content: string[]): void => {

            logs.push(...content);
        },
        logs,
    };
};
