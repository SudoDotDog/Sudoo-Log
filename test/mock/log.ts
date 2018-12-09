/**
 * @author WMXPY
 * @namespace Mock
 * @description Log
 * @package Unit Test
 */

export const createSimpleMockLogFunction = (): {

    func: (...content: string[]) => void;
    logs: string[];
} => {

    const logs: string[] = [];
    return {
        func: (...content: string[]): void => {

            logs.push(...content);
        },
        logs,
    };
};
