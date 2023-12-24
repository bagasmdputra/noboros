import dayjs, { ConfigType } from "dayjs";
// import "dayjs/locale/id";
import utc from "dayjs/plugin/utc";

const DEFAULT_FORMAT = "dddd, D MMMM YYYY";

export const defaultDate = (date?: ConfigType) => {
  dayjs.extend(utc);
  // dayjs.locale("id");
  return dayjs(date).format(DEFAULT_FORMAT);
};
