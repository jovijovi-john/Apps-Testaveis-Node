import { setYear, parseISO } from "date-fns";

/*
  * Receives "2020-08-10" and returns "2023-08-10" 
*/
export function getFutureDate(date: string) : Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1)
}