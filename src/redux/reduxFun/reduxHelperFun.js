import { useMemo } from "react";

//SELECT ALL DEPARTMENT NAMES
export const getDepartmentAll = (state) => state?.getdept?.departmentlist; //dispatch(setDept())
//SELECT ALL DEPARTMENT SECTION NAME LIST
export const getDepartmentSectionAll = (state) => state?.getDeprtSection?.empDeptSectionList; //dispatch(setdeptSection())
//SELECT DEPARTMENT SECTION BASED ON DEPARTMENT ID // dispatch(setdeptSection())
export const getDepartmentSectBasedDeptID = (state, deptID) => {
    const departmentSectionAll = state?.getDeprtSection?.empDeptSectionList;
    return departmentSectionAll?.filter((e) => e.dept_id === deptID)
};
//get employee information ( em_no,em_id,group_id,hod,incharge) //setProfileData(empid)
export const getEmployeeInformationLimited = (state) => {
    const { hod, incharge, groupmenu, em_no, em_id, em_department, em_dept_section, dept_name, sect_name, em_name } = state?.getProfileData?.ProfileData[0];
    const empInform = { hod, incharge, groupmenu, em_no, em_id, em_department, em_dept_section, dept_name, sect_name, em_name }
    return empInform;
}

export const getCommonSettings = (state, menuno) => {
    const commonState = state?.getCommonSettings?.group_slno;
    const Obj = commonState !== undefined && JSON.parse(commonState);
    const result = Obj && Obj?.find((e) => e === menuno) === undefined ? false : true
    return result
}