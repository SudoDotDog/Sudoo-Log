/**
 * @author WMXPY
 * @namespace Log
 * @description Util
 */

const padZero = (value: number, digits: number): string => {

    const parsed: string = value.toString();
    const difference: number = digits - parsed.length;
    if (difference > 0) {

        return '0'.repeat(difference) + parsed;
    }

    return parsed;
};

export const appropriateDateStringWithTime = (date: Date) => {

    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();

    const hour: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    const area: number = Math.floor(date.getTimezoneOffset() / 60);

    const parsedYear: string = padZero(year, 4);
    const parsedMonth: string = padZero(month, 2);
    const parsedDay: string = padZero(day, 2);

    const parsedHour: string = padZero(hour, 2);
    const parsedMinutes: string = padZero(minutes, 2);
    const parsedSeconds: string = padZero(seconds, 2);

    const areaStr: string = area >= 0
        ? '+' + area.toString()
        : '-' + area.toString();

    return `${parsedYear}-${parsedMonth}-${parsedDay} ${parsedHour}:${parsedMinutes}:${parsedSeconds} (UTC${areaStr})`;
};
