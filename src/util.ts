/**
 * @author WMXPY
 * @namespace Log
 * @description Util
 */

export const appropriateDateStringWithTime = (date: Date) => {

    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDate();

    const hour: number = date.getHours();
    const minute: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    const area: number = date.getTimezoneOffset();
    let areaStr: string;

    if (area >= 0) {
        areaStr = '+' + area.toString();
    } else {
        areaStr = area.toString();
    }

    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}(UTC${areaStr})`;
};