import { combineReducers } from 'redux';

import { changeState } from '../reducers/Layoutreducer'
import { getProfileData, getPrifileDateEachEmp } from '../reducers/ProfileDataReducer'
import { LoginCredential } from '../reducers/LoginReducer'
import { getEmployeeRecordList } from '../reducers/EmployeeRecod.reducer'


const reducer = combineReducers({
    changeState,
    getProfileData,
    LoginCredential,
    getEmployeeRecordList,
    getPrifileDateEachEmp
})

export default reducer;