import React, { createContext, useState } from 'react'

export const PayrolMasterContext = createContext();

const MasterContext = ({ children }) => {

    // For Department Selection
    const [selectedDept, updateSelected] = useState(0);
    // District Selection State
    const [selectDistrict, updateDisSelected] = useState(0);
    // Salutation Selection
    const [selectSalutation, updateSalutSelected] = useState(0);
    // Branch Master Selecttion
    const [selectBranchMast, updateBranchSelected] = useState(0);
    // Department Setion Selection
    const [selectDeptSection, updateDepartmentSection] = useState(0);
    // Institution type Selection
    const [selectInstiType, updateInstituteSeleted] = useState(0);
    // Designation
    const [selectDesignation, updateDesignation] = useState(0);
    // Employee Type Master
    const [selectEmployeeType, updateEmployeetype] = useState(0);
    // Designation Type Master / Employee  Status
    const [selectDesignationType, updateDesignationType] = useState(0);
    // Employee List 
    const [selectedEmployee, updateSelectedEmployee] = useState(0);
    // Module List Selection
    const [selectModuleGroup, updateSelectedModuleGroup] = useState(0)
    // Module Name List
    const [selectModuleNameList, updateSelectedModuleList] = useState(0)
    // Group Master Selection
    const [selectGroupName, updateGroupNameList] = useState(0)
    //Bank Master Selection
    const [selectBank, updateBankName] = useState(0)
    //Nation Selection
    const [selectNation, updateNation] = useState(0)
    // State Selection
    const [selectState, updateState] = useState(0)
    //earntype master select 
    const [earntypeDatacontext, setEarnTypecontext] = useState(0)
    // earntype name select
    const [earntypename, setearntypeName] = useState('')
    // designation nameselect
    const [designattypename, setdesigntypename] = useState('')
    //Leave Type Selection
    const [selectLeaveType, updateLeaveType] = useState(0)
    //Leave Type Selection
    const [getgrade, udateGrade] = useState(0)
    //Region select
    const [getregion, udateregion] = useState(0)
    //Religion select
    const [getreligion, udatereligion] = useState(0)
    //for employeecategory Selection 
    const [getemployeecategory, udateemployeecategory] = useState(0)
    // for blood group selection
    const [getbloodgroup, updatebloodgroup] = useState(0)
    // for Doctor Type
    const [getDoctype, updatedoctortype] = useState(0)
    // for get contract period
    const [getcontract, updatecontract] = useState(0)
    //context for employee number
    const [getemployeenumber, updateemployeenumber] = useState(0)
    //context for grade
    const [selectGrade, UpdateGrade] = useState(0)
    //Education Selection
    const [selectEducation, updateEducation] = useState(0)
    //Course Selection
    const [selectCourse, updateCourse] = useState(0)
    //Specialization Selection
    const [selectSpec, updateSpec] = useState(0)
    //UniversitySelection
    const [selectUniversity, updateUniversity] = useState(0)
    //Registration Selection
    const [selectreg, updatereg] = useState(0)

    const value = {
        selectedDept,
        updateSelected,
        selectDistrict,
        updateDisSelected,
        selectSalutation,
        updateSalutSelected,
        selectBranchMast,
        updateBranchSelected,
        selectDeptSection,
        updateDepartmentSection,
        selectInstiType,
        updateInstituteSeleted,
        selectDesignation,
        updateDesignation,
        selectEmployeeType,
        updateEmployeetype,
        selectDesignationType,
        updateDesignationType,
        selectedEmployee,
        updateSelectedEmployee,
        selectModuleGroup,
        updateSelectedModuleGroup,
        selectModuleNameList,
        updateSelectedModuleList,
        selectGroupName,
        updateGroupNameList,
        selectBank,
        updateBankName,
        selectNation,
        updateNation,
        selectState,
        updateState,
        earntypeDatacontext,
        setEarnTypecontext,
        earntypename,
        setearntypeName,
        designattypename,
        setdesigntypename,
        selectLeaveType,
        updateLeaveType,
        getgrade,
        udateGrade,
        getregion,
        udateregion,
        getreligion,
        udatereligion,
        getemployeecategory,
        udateemployeecategory,
        getbloodgroup,
        updatebloodgroup,
        getDoctype,
        updatedoctortype,
        getcontract,
        updatecontract,
        getemployeenumber,
        updateemployeenumber,
        selectGrade,
        UpdateGrade,
        selectEducation,
        updateEducation,
        selectCourse,
        updateCourse,
        selectSpec,
        updateSpec,
        selectUniversity,
        updateUniversity,
        selectreg,
        updatereg,
    }
    return <PayrolMasterContext.Provider value={value} >
        {children}
    </PayrolMasterContext.Provider>
}

export default MasterContext
