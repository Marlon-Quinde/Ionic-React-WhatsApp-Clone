import moment from "moment"

export const Utility = {
    get getToday() {
        return moment().format('YYYY-MM-DD')
    }
}


