import { combineReducers } from 'redux';

import { changeState } from '../reducers/Layoutreducer'
import { getProfileData } from '../reducers/ProfileDataReducer'
import { LoginCredential } from '../reducers/LoginReducer'
import { getEmployeeRecordList } from '../reducers/EmployeeRecod.reducer'
import { getDepartmentShiftData } from '../reducers/Departmentshift'
import { leavedata } from '../reducers/Leavereqdata'
import { getDepartmentList } from '../reducers/DepartmentReducer'
import { getDeprtSection } from '../reducers/DepartSecReducer'

const reducer = combineReducers({
    changeState,
    getProfileData,
    LoginCredential,
    getEmployeeRecordList,
    getDepartmentShiftData,
    leavedata,
    getDepartmentList,
    getDeprtSection,
})

export default reducer;