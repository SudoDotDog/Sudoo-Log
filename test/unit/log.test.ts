/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 * @package Unit Test
 */

import { LOG_LEVEL, LOG_LEVEL_TYPE, SudooLog } from "../../src";
import { SimpleMockLogFunction, createSimpleMockLogFunction } from "../mock/log";

describe("Given {SudooLog} Class", (): void => {

    it("should be able to create log should give a empty log agent", (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL);
        expect(agent).toHaveLength(0);
    });

    it("change log function should use new function instead", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
        });

        agent.error("test");
        expect(agent).toHaveLength(1);
        expect(temps.logs).toHaveLength(1);
    });

    it("in all mode, all logs should be printed", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
        });

        agent.error("test")
            .info("test")
            .warning("test");
        expect(agent).toHaveLength(3);
        expect(temps.logs).toHaveLength(3);
    });

    it("in debug mode, debug should be printed", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.DEBUG, {
            logFunction: temps.func,
        });

        agent.error("test")
            .info("test")
            .warning("test")
            .debug("test");

        expect(agent).toHaveLength(4);
        expect(temps.logs).toHaveLength(4);
    });

    it("in info mode, without debug should be printed", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.INFO, {
            logFunction: temps.func,
        });

        agent.error("test")
            .info("test")
            .warning("test")
            .debug("test");

        expect(agent).toHaveLength(3);
        expect(temps.logs).toHaveLength(3);
    });

    it("in warning mode, only warning and error should be printed out", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.WARNING, {
            logFunction: temps.func,
        });

        agent.error("test")
            .info("test")
            .warning("test")
            .debug("test");

        expect(agent).toHaveLength(2);
        expect(temps.logs).toHaveLength(2);
    });

    it("in error mode, only error should be printed out", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ERROR, {
            logFunction: temps.func,
        });

        agent.error("test")
            .info("test")
            .warning("test");

        expect(agent).toHaveLength(1);
        expect(temps.logs).toHaveLength(1);
    });

    it("should be able to log information - tty", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
            tty: true,
        });

        agent.info("test");

        expect(agent).toHaveLength(1);
        expect(temps.logs[0]).toContain("[INFO]");
        expect(temps.logs[0]).not.toEqual("[INFO] test");
    });

    it("should be able to log scoped information - tty", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
            tty: true,
            scopes: ["scope"],
        });

        agent.info("test");

        expect(agent).toHaveLength(1);
        expect(temps.logs[0]).toContain("[INFO/SCOPE]");
        expect(temps.logs[0]).not.toEqual("[INFO/SCOPE] test");
    });

    it("should be able to log information - not tty", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
            tty: false,
        });

        agent.info("test");

        expect(agent).toHaveLength(1);
        expect(temps.logs[0]).toEqual("[INFO] test");
    });

    it("should be able to log scoped information - not tty", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
            tty: false,
            scopes: ["scope"],
        });

        agent.info("test");

        expect(agent).toHaveLength(1);
        expect(temps.logs[0]).toEqual("[INFO/SCOPE] test");
    });

    it("should be able to log emoji prefix - not tty", (): void => {

        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();
        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL, {
            logFunction: temps.func,
            tty: false,
            levelType: LOG_LEVEL_TYPE.EMOJI_PREFIX,
            scopes: ["scope"],
        });

        agent.info("test");

        expect(agent).toHaveLength(1);
        expect(temps.logs[0]).toEqual("🔷 [SCOPE] test");
    });
});
