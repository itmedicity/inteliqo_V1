import { format } from "date-fns";

export const EmpLineGraphFunc = async (data, em_id) => {
    const monthArr = [
        { id: 1, name: "Jan" }, { id: 2, name: "Feb" }, { id: 3, name: "Mar" }, { id: 4, name: "Apr" },
        { id: 5, name: "May" }, { id: 6, name: "Jun" }, { id: 7, name: "Jul" }, { id: 8, name: "Aug" },
        { id: 9, name: "Sep" }, { id: 10, name: "Oct" }, { id: 11, name: "Nov" }, { id: 12, name: "Dec" }
    ];
    if (Object.keys(data).length !== 0 || data.length === 0) {
        const scheduleArr = monthArr?.map(val => {
            const newarray = data?.filter(item => item.indct_emp_no === em_id && format(new Date(item.induct_detail_date), 'MMM') === val.name);
            const schedule = newarray ? newarray.length : 0;
            return { month: val.name, schedule: schedule };
        });
        const schedule = scheduleArr?.map((val) => val.schedule)
        const retestArr = monthArr?.map(val => {
            const newarray = data?.filter(item => format(new Date(item.induct_detail_date), 'MMM') === val.name && item.indct_emp_no === em_id);
            const testcount = newarray?.filter((val) => val.retest === 1)
            const retest = testcount ? testcount.length : 0;
            return { month: val.name, retest: retest };
        });
        const retest = retestArr?.map((val) => val.retest)
        const notattndArr = monthArr?.map(val => {
            const newarray = data?.filter(item => format(new Date(item.induct_detail_date), 'MMM') === val.name && item.indct_emp_no === em_id);
            const notattndcount = newarray?.filter((val) => val.training_status === 0)
            const notattnd = notattndcount ? notattndcount.length : 0;
            return { month: val.name, notattnd: notattnd };
        });
        const notattnd = notattndArr?.map((val) => val.notattnd)
        return { status: 1, schedule: schedule, retest: retest, notattnd: notattnd }
    }
    else {
        return { status: 0, schedule: [], retest: [], notattnd: [] }
    }
}
