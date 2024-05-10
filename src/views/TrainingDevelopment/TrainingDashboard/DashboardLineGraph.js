import { format } from "date-fns";

export const arrLineGraphFunc = async (data, NAdata) => {
    const monthArr = [
        { id: 1, name: "Jan" }, { id: 2, name: "Feb" }, { id: 3, name: "Mar" }, { id: 4, name: "Apr" },
        { id: 5, name: "May" }, { id: 6, name: "Jun" }, { id: 7, name: "Jul" }, { id: 8, name: "Aug" },
        { id: 9, name: "Sep" }, { id: 10, name: "Oct" }, { id: 11, name: "Nov" }, { id: 12, name: "Dec" }
    ];

    if (Object.keys(data).length !== 0 || NAdata.length !== 0) {
        const scheduleArr = monthArr?.map(val => {
            const newarray = data?.filter(item => format(new Date(item.induct_detail_date), 'MMM') === val.name);
            return { month: val.name, schedule: newarray ? newarray.length : 0 };
        });
        const schedule = scheduleArr?.map((val) => val.schedule)

        const retestArr = monthArr?.map(val => {
            const newarray = data?.filter(item => format(new Date(item.induct_detail_date), 'MMM') === val.name && item.retest === 1 && item.training_status === 1)
            return { month: val.name, retest: newarray ? newarray.length : 0 };
        });
        const retest = retestArr?.map((val) => val.retest)
        const notattndArr = monthArr?.map(val => {
            const newarray = NAdata?.filter(item => format(new Date(item.joining_date), 'MMM') === val.name);
            return { month: val.name, notattnd: newarray ? newarray.length : 0 };
        });
        const notattnd = notattndArr?.map((val) => val.notattnd)


        return { status: 1, schedule: schedule, retest: retest, notattnd: notattnd }
    }
    else {
        return { status: 0, schedule: [], retest: [], notattnd: [] }
    }
}


