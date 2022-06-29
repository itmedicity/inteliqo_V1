import { combineReducers } from 'redux';
import { changeState } from '../reducers/Layoutreducer'
import { getProfileData, getPrifileDateEachEmp } from '../reducers/ProfileDataReducer'
import { LoginCredential } from '../reducers/LoginReducer'
import { getEmployeeRecordList } from '../reducers/EmployeeRecod.reducer'
import { getDepartmentShiftData } from '../reducers/Departmentshift'
import { leavedata } from '../reducers/Leavereqdata'
import { getDepartmentList } from '../reducers/DepartmentReducer'
import { getDeprtSection } from '../reducers/DepartSecReducer'
import { getEmployeedetailsDutyplan } from '../reducers/EmployeeDetails'
import { getAlertList } from '../reducers/AlertReducres'
import { getMsgList } from '../reducers/MessageReducres'
import { getAnnouncementList } from '../reducers/AnnouncementReducers'
import { getModuleRightList } from '../reducers/GetModulerights'
import { getEmployeeProcessRecord } from './LeaveProcessDetl.reducer';
import { getRegionList } from '../reducers/RegionReducers'
<<<<<<< HEAD
import { getProTaxList } from '../reducers/ProffessionalTaxReducer';
import { getEmployeeBloodgrp } from '../reducers/BloodgrpReducer';
import { getEmployeeReligion } from '../reducers/ReligionReducer';
import { getDistRegion } from '../reducers/DistRegionReducer';
import { getDistrictList } from '../reducers/DistrictReducer';
import { getDeptSectList } from '../reducers/DepartSectionReducer'
import { getEmpNameList } from '../reducers/EmpnameReducer';

=======
import { getProTaxList } from '../reducers/ProffessionalTaxReducer'
import { changeStateAggrid } from '../reducers/StatechangeAgGrid'
>>>>>>> d37c2e944de75d1fa3c4d723e1695e7e06831de1

const reducer = combineReducers({
    changeState,
    getProfileData,
    LoginCredential,
    getEmployeeRecordList,
    getPrifileDateEachEmp,
    getDepartmentShiftData,
    leavedata,
    getDepartmentList,
    getDeprtSection,
    getEmployeedetailsDutyplan,
    getAlertList,
    getMsgList,
    getAnnouncementList,
    getModuleRightList,
    getEmployeeProcessRecord,
    getRegionList,
    getProTaxList,
<<<<<<< HEAD
    getEmployeeBloodgrp,
    getEmployeeReligion,
    getDistRegion,
    getDistrictList,
    getDeptSectList,
    getEmpNameList
=======
    changeStateAggrid
>>>>>>> d37c2e944de75d1fa3c4d723e1695e7e06831de1
})

export default reducer;