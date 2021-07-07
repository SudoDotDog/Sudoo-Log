/**
 * @author WMXPY
 * @namespace Mock
 * @description Log
 * @package Unit Test
 */

import { LogFunction } from "../../src";

export type SimpleMockLogFunction = {

    func: LogFunction;
    logs: string[];
};

export const createSimpleMockLogFunction = (): SimpleMockLogFunction => {

    const logs: string[] = [];
    return {

        func: (...content: string[]): void => {

            logs.push(...content);
        },
        logs,
    };
};
