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
import { getEmployeeSpeclization } from '../reducers/SpeciliozationReducers';
import { getEmpRegistrationType } from '../reducers/RegistrationTypeReducer';
import { getBranchList } from '../reducers/BranchReducer';
import { getDashboardNotification } from './Dashboard.Reducer';
import { getEmployeeSubSect } from '../reducers/SubSectionReducers';
import { getEmployeeTrainingProbation } from '../reducers/TrainingProbReducers';
import { getActiveCountemp } from '../reducers/ActiveCountReducers';
import { getPunchCount } from '../reducers/PunchdataCountreducers';
import { getMenuRenderCompRights } from './CardMenuSlnoRender';
import { getContractClosedata } from '../reducers/ContractRenewalReducers'
import { getUserRights } from '../reducers/EmpUserRights.Reducer'
import { getHighLevelData } from '../reducers/HighLevel.Reducer'
// import { getUserRights } from '../reducers/EmpUserRights.Reducer'
import { getBirthdayList } from '../reducers/Birthday.Reducer'
import { getGradeList } from '../reducers/Grade.Reducer'
import { getHODInchargeNameList } from '../reducers/HodIncharge.Reducer'
import { getdept } from '../reducers/Dept.Reducer'
import { getDeptSecList } from '../reducers/DeptSectionByDept.Reducer'
import { getShiftList } from '../reducers/Shift.Reducer'
import { getCommonSettings } from './CommonSett.Reducer';
import { getCasualLeaveData } from './LeaveData.Reducer';
import { getJobSummary } from './JobDescription.Reducer'
import { getJobDuties } from './JobDuties.Reducer'
import { getJobPerformance } from './JobPerformance.Reducer'
import { getJobCompetency } from './JobCompetency.Reducer'
import { getJobQualification } from './JobQualifi.Reducer'
import { getJobGenric } from './JobGeneric.Reducer'
import {
    getHolidayList,
    getCommonLeave,
    getCreditedCasualLeaves,
    getCreditedCarryForwardLeaves,
    getCreditedCommonLeaves,
    getCreditedCreditedLeaves,
    getCreditedHolidayLeaves,
    getCreditedPrivilegeLeaves,
    updateCasualLeaveStatus
} from './LeaveProcess.Reducer'


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
    getEmployeeSpeclization,
    getDashboardNotification,
    getEmpRegistrationType,
    getBranchList,
    getEmployeeSubSect,
    getEmployeeTrainingProbation,
    getActiveCountemp,
    getPunchCount,
    getMenuRenderCompRights,
    getHODInchargeNameList,
    getGradeList,
    getContractClosedata,
    getBirthdayList,
    getUserRights,
    getHighLevelData,
    getdept,
    getDeptSecList,
    getShiftList,
    getCommonSettings,
    getCasualLeaveData,
    getJobSummary,
    getJobDuties,
    getJobPerformance,
    getJobCompetency,
    getJobQualification,
    getJobGenric,
    getHolidayList,
    getCommonLeave,
    getCreditedCasualLeaves,
    getCreditedCarryForwardLeaves,
    getCreditedCommonLeaves,
    getCreditedCreditedLeaves,
    getCreditedHolidayLeaves,
    getCreditedPrivilegeLeaves,
    updateCasualLeaveStatus
})

export default reducer;