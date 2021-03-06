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
import { getProTaxList } from '../reducers/ProffessionalTaxReducer';
import { getEmployeeBloodgrp } from '../reducers/BloodgrpReducer';
import { getEmployeeReligion } from '../reducers/ReligionReducer';
import { getDistRegion } from '../reducers/DistRegionReducer';
import { getDistrictList } from '../reducers/DistrictReducer';
import { getDeptSectList } from '../reducers/DepartSectionReducer'
import { getEmpNameList } from '../reducers/EmpnameReducer';
import { changeStateAggrid } from '../reducers/StatechangeAgGrid';
import { getInstitutionType } from '../reducers/InstitutionTypeReducer';
import { getEmployeeCategory } from '../reducers/CategoryReducers'
import { getEmployeeDesignation } from '../reducers/DesignationReducers';
import { getEmployeeEducation } from '../reducers/EducationReducers';
import { getEmployeeCourse } from '../reducers/CourseReducers'
import { getEmployeeSpeclization } from '../reducers/SpeciliozationReducers'

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
    getEmployeeBloodgrp,
    getEmployeeReligion,
    getDistRegion,
    getDistrictList,
    getDeptSectList,
    getEmpNameList,
    changeStateAggrid,
    getInstitutionType,
    getEmployeeCategory,
    getEmployeeDesignation,
    getEmployeeEducation,
    getEmployeeCourse,
    getEmployeeSpeclization

})

export default reducer;