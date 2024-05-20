import { format } from "date-fns";

export const arrayFunc = async (Bardata) => {
    const monthArr = [
        { id: 1, name: "Jan" }, { id: 2, name: "Feb" }, { id: 3, name: "Mar" }, { id: 4, name: "Apr" },
        { id: 5, name: "May" }, { id: 6, name: "Jun" }, { id: 7, name: "Jul" }, { id: 8, name: "Aug" },
        { id: 9, name: "Sep" }, { id: 10, name: "Oct" }, { id: 11, name: "Nov" }, { id: 12, name: "Dec" }
    ];
    if (Bardata?.length !== 0) {
        const MonthbarChartData = monthArr?.map((mnth) => {
            const totalschedule = Bardata.filter(item => format(new Date(item.schedule_date), 'MMM') === mnth.name)
            const schedule = totalschedule ? totalschedule.length : 0;
            const attented = totalschedule?.filter((val) => val.training_status === 1)
            const attentedCount = attented ? attented.length : 0;
            const notAttend = totalschedule?.filter((val) => val.training_status === 0)
            const notAttendCount = notAttend ? notAttend.length : 0;
            const Completed = totalschedule?.filter((val) => val.pretest_status === 1 && val.posttest_status === 1 && val.mark !== null && val.mark > 2)
            const CompletedCount = Completed ? Completed.length : 0;
            const notCompleted = totalschedule?.filter((val) => val.training_status === 1 && val.pretest_status === 0 || val.posttest_status === 0)
            const notCompletedCount = notCompleted ? notCompleted.length : 0;
            const retest = totalschedule?.filter((val) => val.training_status === 1 && val.pretest_status === 1 && val.posttest_status === 1 && val.retest === 1)
            const retestCount = retest ? retest.length : 0;
            return {
                month: mnth.name,
                Scheule: schedule,
                Attented: attentedCount,
                NotAttend: notAttendCount,
                Completed: CompletedCount,
                Retest: retestCount,
                NotCompleted: notCompletedCount
            }
        })
        return { status: 1, data: MonthbarChartData }
    }
    else {
        return { status: 0, data: [] }
    }
}