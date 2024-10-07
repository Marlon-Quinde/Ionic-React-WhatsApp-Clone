import moment from "moment";
import { VITE_CHARS_RANDOM } from "../env/environments";

export namespace Utility {
  export const getToday = () => {
    return moment().format("YYYY-MM-DD");
  };
  
  export const getRandom = (length = 7) => {
    const chars = VITE_CHARS_RANDOM;
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  };
  
  export const getTime = (unix_timestamp: any) => {
    let date = new Date(unix_timestamp * 1000);
  
    let hours = date.getHours();
  
    let minutes = "0" + date.getMinutes();
  
    let formattedTime = hours + ":" + minutes.substr(-2);
  
    return formattedTime;
  };
}