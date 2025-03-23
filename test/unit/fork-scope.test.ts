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

    it("should be able to fork second level scope", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            scopes: ["scope1", "scope2"],
            logFunction: temps.func,
            tty: false,
        });
        const forked: SudooLog = agent.forkScope("scope3");

        expect(forked).toHaveLength(0);

        forked.info("test");

        expect(temps.logs[0]).toEqual("[INFO/SCOPE1/SCOPE2/SCOPE3] test");
    });
});
