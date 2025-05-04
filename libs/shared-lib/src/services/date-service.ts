import dayjs, { Dayjs, OpUnitType, isDayjs } from "dayjs";
import az from "dayjs/locale/az";
import advancedFormat from "dayjs/plugin/advancedFormat";
import calendar from "dayjs/plugin/calendar";
import customParseFormat from "dayjs/plugin/customParseFormat";
import devHelper from "dayjs/plugin/devHelper";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(advancedFormat);
dayjs.extend(calendar);
dayjs.extend(customParseFormat);
dayjs.extend(devHelper);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(az);
// @ts-ignore
dayjs.extend((option, dayjsClass, dayjsFactory) => {});

export class DateService extends Date {
  private readonly dayjs: Dayjs;

  private constructor(date?: number | string | Date) {
    super(date || new Date());
    this.dayjs = dayjs(date);
  }

  get add() {
    return {
      seconds: (seconds: number) => {
        const newDateService = new DateService(this);
        newDateService.setSeconds(newDateService.getSeconds() + seconds);
        return newDateService;
      },
      minutes: (minutes: number) => {
        const newDateService = new DateService(this);
        newDateService.setMinutes(newDateService.getMinutes() + minutes);
        return newDateService;
      },
      hours: (hours: number) => {
        const newDateService = new DateService(this);
        newDateService.setHours(newDateService.getHours() + hours);
        return newDateService;
      },
      days: (days: number) => {
        const newDateService = new DateService(this);
        newDateService.setDate(newDateService.getDate() + days);
        return newDateService;
      },
      months: (months: number) => {
        const newDateService = new DateService(this);
        newDateService.setMonth(newDateService.getMonth() + months);
        return newDateService;
      },
      years: (years: number) => {
        const newDateService = new DateService(this);
        newDateService.setFullYear(newDateService.getFullYear() + years);
        return newDateService;
      }
    };
  }

  static from(date?: number | string | Date | Dayjs, tz = "Asia/Baku") {
    if (isDayjs(date)) {
      return new DateService(date.toDate()).tz(tz);
    }
    return new DateService(date).tz(tz);
  }

  format(format: string) {
    return this.dayjs.format(format);
  }

  diff(date: Date) {
    return {
      seconds: this.dayjs.diff(date, "second"),
      minutes: this.dayjs.diff(date, "minute"),
      hours: this.dayjs.diff(date, "hour"),
      days: this.dayjs.diff(date, "day"),
      months: this.dayjs.diff(date, "month"),
      years: this.dayjs.diff(date, "year")
    };
  }

  tz(tz: string) {
    tz && this.dayjs.tz(tz);
    return this;
  }

  isSame(date: Date, unit: OpUnitType) {
    return this.dayjs.isSame(date, unit);
  }
}
