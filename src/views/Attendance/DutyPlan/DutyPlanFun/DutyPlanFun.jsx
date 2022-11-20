import moment from "moment";

export const planInitialState = {
    FROM_DATE: "FROM_DATE",
    TO_DATE: "TO_DATE",
    DEPT_NAME: "DEPT_NAME",
    DEPT_SEC_NAME: "DEPT_SEC_NAME"
}

const { FROM_DATE, TO_DATE, DEPT_NAME, DEPT_SEC_NAME } = planInitialState;

export const dutyPlanInitialState = {
    fromDate: moment().format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    deptName: 0,
    deptSecName: 0
}

export const dutyPlanReducer = (state = dutyPlanInitialState, action) => {
    switch (action.type) {
        case FROM_DATE:
            return { ...state, fromDate: action.from };
        case TO_DATE:
            return { ...state, toDate: action.to };
        case DEPT_NAME:
            return { ...state, deptName: action.deptSlno };
        case DEPT_SEC_NAME:
            return { ...state, deptSecName: action.deptSecSlno };
        default:
            return state;
    }
}

console.log(dutyPlanInitialState)