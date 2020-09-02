/**
 * @author WMXPY
 * @namespace Log
 * @description Util
 */

import { TIME_CHANGE } from "@sudoo/magic";

const padZero = (value: number, digits: number): string => {

    const parsed: string = value.toString();
    const difference: number = digits - parsed.length;
    if (difference > 0) {

        return '0'.repeat(difference) + parsed;
    }

    return parsed;
};

export const appropriateDateStringWithTime = (date: Date): string => {

    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();

    const hour: number = date.getHours();
    const minute: number = date.getMinutes();
    const second: number = date.getSeconds();

    const area: number = Math.floor(date.getTimezoneOffset() / TIME_CHANGE.MINUTE_TO_HOUR);
    const isPositive: boolean = area >= 0;

    const parsedYear: string = padZero(year, 4);
    const parsedMonth: string = padZero(month, 2);
    const parsedDay: string = padZero(day, 2);

    const parsedHour: string = padZero(hour, 2);
    const parsedMinute: string = padZero(minute, 2);
    const parsedSecond: string = padZero(second, 2);

    const parsedArea: string = Math.abs(area).toString();

    const areaStr: string = isPositive
        ? '+' + parsedArea
        : '-' + parsedArea;

    return `${parsedYear}-${parsedMonth}-${parsedDay} ${parsedHour}:${parsedMinute}:${parsedSecond} (UTC${areaStr})`;
};
