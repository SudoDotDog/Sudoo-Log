# Sudoo-Log

[![Continuous Integration](https://github.com/SudoDotDog/Sudoo-Log/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Sudoo-Log/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Log/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Log)
[![npm version](https://badge.fury.io/js/%40sudoo%2Flog.svg)](https://www.npmjs.com/package/@sudoo/log)
[![downloads](https://img.shields.io/npm/dm/@sudoo/log.svg)](https://www.npmjs.com/package/@sudoo/log)

Logs

## Install

```sh
yarn add @sudoo/log
# Or
npm install @sudoo/log --save
```

## Usage

```ts
import { LOG_LEVEL, SudooLog } from "@sudoo/log";

const agent: SudooLog = SudooLog.create(LOG_LEVEL.ALL); // Change log level by environment
agent.critical("critical");
agent.error("error");
agent.warning("warning");
agent.info("info");
agent.debug("debug");
agent.verbose("verbose");
```
