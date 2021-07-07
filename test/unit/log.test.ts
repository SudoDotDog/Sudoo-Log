/**
 * @author WMXPY
 * @namespace Log
 * @description Log
 * @package Unit Test
 */

import { expect } from 'chai';
import { LOG_LEVEL, SudooLog } from '../../src';
import { createSimpleMockLogFunction, SimpleMockLogFunction } from '../mock/log';

describe('Given {SudooLog} Class', (): void => {

    it('should be able to create log should give a empty log agent', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL);
        expect(agent).to.be.lengthOf(0);
    });

    it('change log function should use new function instead', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setLogFunction(temps.func);
        agent.error('test');
        expect(agent).to.be.lengthOf(1);
        expect(temps.logs).to.be.lengthOf(1);
    });

    it('in all mode, all logs should be printed', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setLogFunction(temps.func);
        agent.error('test')
            .info('test')
            .warning('test');
        expect(agent).to.be.lengthOf(3);
        expect(temps.logs).to.be.lengthOf(3);
    });

    it('in debug mode, debug should be printed', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.DEBUG);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setLogFunction(temps.func);
        agent.error('test')
            .info('test')
            .warning('test')
            .debug('test');

        expect(agent).to.be.lengthOf(4);
        expect(temps.logs).to.be.lengthOf(4);
    });

    it('in info mode, without debug should be printed', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.INFO);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setLogFunction(temps.func);
        agent.error('test')
            .info('test')
            .warning('test')
            .debug('test');

        expect(agent).to.be.lengthOf(3);
        expect(temps.logs).to.be.lengthOf(3);
    });

    it('in warning mode, only warning and error should be printed out', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.WARNING);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setLogFunction(temps.func);
        agent.error('test')
            .info('test')
            .warning('test')
            .debug('test');

        expect(agent).to.be.lengthOf(2);
        expect(temps.logs).to.be.lengthOf(2);
    });

    it('in error mode, only error should be printed out', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ERROR);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setLogFunction(temps.func);
        agent.error('test')
            .info('test')
            .warning('test');
        expect(agent).to.be.lengthOf(1);
        expect(temps.logs).to.be.lengthOf(1);
    });

    it('should be able to log information - tty', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setTTY(true);
        agent.setLogFunction(temps.func);
        agent.info('test');

        expect(agent).to.be.lengthOf(1);
        expect(temps.logs[0]).to.be.include('[INFO]');
        expect(temps.logs[0]).to.be.not.equal('[INFO] test');
    });

    it('should be able to log scoped information - tty', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setTTY(true);
        agent.setLogFunction(temps.func);
        agent.setScope('scope');
        agent.info('test');

        expect(agent).to.be.lengthOf(1);
        expect(temps.logs[0]).to.be.include('[SCOPE/INFO]');
        expect(temps.logs[0]).to.be.not.equal('[SCOPE/INFO] test');
    });

    it('should be able to log information - not tty', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setTTY(false);
        agent.setLogFunction(temps.func);
        agent.info('test');

        expect(agent).to.be.lengthOf(1);
        expect(temps.logs[0]).to.be.equal('[INFO] test');
    });

    it('should be able to log scoped information - not tty', (): void => {

        const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL);
        const temps: SimpleMockLogFunction = createSimpleMockLogFunction();

        agent.setTTY(false);
        agent.setLogFunction(temps.func);
        agent.setScope('scope');
        agent.info('test');

        expect(agent).to.be.lengthOf(1);
        expect(temps.logs[0]).to.be.equal('[SCOPE/INFO] test');
    });
});
