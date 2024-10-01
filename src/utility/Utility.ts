import moment from "moment"
import { VITE_CHARS_RANDOM } from "../env/environments";

const getToday = () => {
    return moment().format('YYYY-MM-DD')
}

const getRandom = (length = 7) => {
    const chars = VITE_CHARS_RANDOM;
    let result = "";
    for (let i = length; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }


export const Utility = {
    getToday,
    getRandom
}
