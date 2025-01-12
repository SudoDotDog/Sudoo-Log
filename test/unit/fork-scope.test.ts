/**
 * @author WMXPY
 * @namespace Log
 * @description Fork Scope
 * @package Unit Test
 */

import { LOG_LEVEL, SudooLog } from "../../src";
import { SimpleMockLogFunction, createSimpleMockLogFunction } from "../mock/log";

describe("Given {SudooLog} Class - Fork Scope", (): void => {

    it("should be able to fork scope", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
            tty: false,
        });
        const forked: SudooLog = agent.forkScope("scope");

        expect(forked).toHaveLength(0);

        forked.info("test");

        expect(temps.logs[0]).toEqual("[INFO/SCOPE] test");
    });
});
