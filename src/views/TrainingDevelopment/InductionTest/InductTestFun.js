
export const ProcessQuestionsData = (state) => {

    const quest = state?.gettrainingData?.QuestionDetails?.QuestionDetailsList

    const newList = quest?.map((val, index) => {
        const obj = {
            oder: index + 1,
            q_slno: val.q_slno,
            topic_slno: val.topic_slno,
            training_topic_name: val.training_topic_name,
            answer_a: val.answer_a,
            answer_b: val.answer_b,
            answer_c: val.answer_c,
            answer_d: val.answer_d,
            handwrite_answer: val.handwrite_answer,
            marks: val.marks,
            questions: val.questions,
            right_answer: val.right_answer,
            upload_status: val.upload_status,
            writtenStatus: val.writtenStatus,
            online_status: val.online_status,
            offline_status: val.offline_status,
            both_status: val.both_status
        }
        return obj;
    })
    return newList
    // const len = newList.length;
    // setDatalen(len);


    // const displayData = Questions?.map((val, index) => {
    //     const object = {
    //         oder: index + 1,
    //         q_slno: val.q_slno,
    //         topic_slno: val.topic_slno,
    //         training_topic_name: val.training_topic_name,
    //         answer_a: val.answer_a,
    //         answer_b: val.answer_b,
    //         answer_c: val.answer_c,
    //         answer_d: val.answer_d,
    //         handwrite_answer: val.handwrite_answer,
    //         marks: val.marks,
    //         questions: val.questions,
    //         right_answer: val.right_answer,
    //         upload_status: val.upload_status,
    //         writtenStatus: val.writtenStatus,
    //         online_status: val.online_status,
    //         offline_status: val.offline_status,
    //         both_status: val.both_status
    //     }
    //     return object;
    // })
    // const len = displayData.length;
    // setDatalen(len);
    // setData(displayData);
}


export const EmpDetailsData = (Emp_Details) => {
    if (Object.keys(Emp_Details).length !== 0) {
        const { em_id, em_name, induction_slno, topic_slno, training_topic_name, question_count, dept_id, sect_id } = Emp_Details[0];
        const obj = {
            em_id: em_id,
            em_name: em_name,
            slno: induction_slno,
            topic_slno: topic_slno,
            training_topic_name: training_topic_name,
            question_count: question_count,
            dept_id: dept_id,
            sect_id: sect_id
        }
        return obj

    }

}
