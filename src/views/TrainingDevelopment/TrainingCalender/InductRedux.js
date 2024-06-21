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
