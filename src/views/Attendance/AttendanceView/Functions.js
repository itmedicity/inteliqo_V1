import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";
import moment from "moment";

export const AttendanceViewFun = async (value, punchData, holidayList) => {
    let message = { status: 0, message: '', data: [], dateFormat: [] };
    const { status, data } = holidayList;
    let holidayFilterList = []; // filter holidays based on from to dates
    if (status === 1) {
        holidayFilterList = data && data.map((values) => {
            return values.hld_date >= moment(startOfMonth(value)).format('YYYY-MM-DD') && values.hld_date <= moment(endOfMonth(value)).format('YYYY-MM-DD') ? values : null;
        }).filter((val) => val !== null);
    } else {
        return { ...message, status: 0, message: 'Holiday List Not Updated', data: [] }
    }

    //finding the dates between start date and end date
    const dateRange = eachDayOfInterval({ start: new Date(startOfMonth(value)), end: new Date(endOfMonth(value)) });

    //date format for top Head
    const dateAndDayFormat = dateRange.map((val) => {
        return { date: moment(val).format('MMM-D'), sunday: moment(val).format('d'), days: moment(val).format('ddd'), date_format: moment(val).format('YYYY-MM-DD') }
    });

    const addHolidayToDateRange = (values) => {
        const holidayDate = holidayFilterList.find((val) => moment(val.hld_date).format('MMM-D') === values.date)
        if (holidayDate !== undefined) {
            return {
                date: values.date,
                sunday: values.sunday,
                days: values.days,
                holiday: 1,
                holidayDays: holidayDate.hld_desc,
                dateFormat: values.date_format
            }
        } else {
            return {
                date: values.date,
                sunday: values.sunday,
                days: values.days,
                holiday: 0,
                holidayDays: null,
                dateFormat: values.date_format
            }
        }
    }

    const newDateRange = dateAndDayFormat.map(addHolidayToDateRange)

    let op = newDateRange.map((e) => {
        let temp = punchData.find(element => element.duty_day === e.dateFormat)
        if (temp.duty_desc) {
            e.duty_desc = temp.duty_desc;
        }
        return e;
    })

    return op;

}