import { DateTime } from "luxon";

export function formatDate(date, format = 'dd-LL-yyyy') {
  return DateTime.fromISO(date).toFormat(format)
}