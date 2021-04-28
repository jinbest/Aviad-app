import { DateParam } from "../model/date-param"
import axios from "axios"

export function getFormattedDate(startDate:DateParam, endDate:DateParam) {

  const formattedStart = startDate.day +
      " ב" +
      getMonthName(startDate.month) +
      " בשעה " +
      startDate.time;
  const formattedEnd = endDate.day +
      " ב" +
      getMonthName(endDate.month) +
      " בשעה " +
      endDate.time;
  return `${formattedStart} - ${formattedEnd}`;
}

export function getMonthName(index:number) {
  switch (index) {
    case 1:
      return 'ינואר';
    case 2:
      return 'פברואר';
    case 3:
      return 'מרץ';
    case 4:
      return 'אפריל';
    case 5:
      return 'מאי';
    case 6:
      return 'יוני';
    case 7:
      return 'יולי';
    case 8:
      return 'אוגוסט';
    case 9:
      return 'ספטמבר';
    case 10:
      return 'אוקטובר';
    case 11:
      return 'נובמבר';
    case 12:
      return 'דצמבר';
  }
}

export const formAxios = axios.create({
  transformRequest: [function (data, headers) {
      if (headers['Content-Type'] && headers['Content-Type'].startsWith('multipart/form-data')) {
          const form = new FormData();
          for (const key in data) {
              const value = data[key];
              if (Array.isArray(value)) {
                  const arrayKey = `${key}[]`;
                  value.forEach(v => {
                      form.append(arrayKey, v);
                  });
              } else{
                  form.append(key, value);
              }
          }
          return form;
      }

      return data;
  }],
});