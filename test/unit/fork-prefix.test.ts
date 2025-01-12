/**
 * @author WMXPY
 * @namespace Log
 * @description Fork Prefix
 * @package Unit Test
 */

import { LOG_LEVEL, SudooLog } from "../../src";
import { SimpleMockLogFunction, createSimpleMockLogFunction } from "../mock/log";

describe("Given {SudooLog} Class - Fork Prefix", (): void => {

    it("should be able to fork prefix", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
            tty: false,
        });

        const forked: SudooLog = agent.fork({
            prefixes: ["prefix"],
        });

        forked.info("test");

        expect(temps.logs[0]).toEqual("[INFO] prefix test");
    });

    it("should be able to fork prefix with showtime", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
            tty: false,
            showTime: true,
        });

        const forked: SudooLog = agent.fork({
            prefixes: ["prefix"],
        });

        forked.info("test");

        expect(temps.logs[0].endsWith("prefix test")).toBeTruthy();
    });
});
