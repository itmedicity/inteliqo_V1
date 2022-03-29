import { combineReducers } from 'redux';

import { changeState } from '../reducers/Layoutreducer'
import { getProfileData } from '../reducers/ProfileDataReducer'
import { LoginCredential } from '../reducers/LoginReducer'
import { getEmployeeRecordList } from '../reducers/EmployeeRecod.reducer'
import { leavedata } from '../reducers/Leavereqdata'
const reducer = combineReducers({
    changeState,
    getProfileData,
    LoginCredential,
    getEmployeeRecordList,
    leavedata
})

export default reducer;