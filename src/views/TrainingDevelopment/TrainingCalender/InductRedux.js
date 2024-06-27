import moment from "moment/moment";

export const InductRedux = (state) => {
    const trainingData = state?.gettrainingData?.InductionCalenderDatas?.InductionCalenderDatasList;
    if (trainingData?.length) {
        const ResultArr = trainingData.map((item) => ({
            topic: item.training_topic_name,
            induction_date: item.induction_date,
            training_date: parseInt(moment(item.induction_date).format('DD')),
            trainer_name: item.trainer_name,
            type_name: item.type_name,
            topic_slno: item.topic_slno,
            trainingtype_slno: item.trainingtype_slno,
            trainers: item.trainers,
        }));
        return { status: 1, TrainingData: ResultArr };
    } else {
        return { status: 0, TrainingData: [] };
    }
};

export const DeptRedux = (state) => {
    const trainingData = state?.gettrainingData?.MothWiseDeptSchedules?.MothWiseDeptSchedulesList;
    if (trainingData?.length) {
        const ResultArr = trainingData.map((item) => ({
            dept_id: item.dept_id,
            dept_name: item.dept_name,
            training_date: moment(item.schedule_date).format('YYYY-MM-DD HH:mm:ss'),
            schedule_slno: item.schedule_slno,
            schedule_trainers: item.schedule_trainers,
            schedule_year: item.schedule_year,
            topic_slno: item.topic_slno,
            traineer_name: item.traineer_name,
            training_topic_name: item.training_topic_name,
            sect_id: item.sect_id
        }));
        return { status: 1, TrainingData: ResultArr };
    } else {
        return { status: 0, TrainingData: [] };
    }
};



