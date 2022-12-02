import { axioslogin } from "src/views/Axios/Axios"

export const employeeRecordUpdationMandatory = async (newcontractdetl, oldPersonalData) => {
    let message = { persoStatus: 0, qualifStatus: 0, expeStatus: 0, contrLogStatus: 0, message: "" }

    console.log(oldPersonalData.personalData);
    //contract log updation
    const updateContractLogTable = await axioslogin.post('/empcontract/createcontractlog', oldPersonalData.personalData)
    console.log("working");
    if (updateContractLogTable.data.success === 1) {
        return { ...message, persoStatus: 0, qualifStatus: 0, expeStatus: 0, contrLogStatus: 1, message: "Update Personal Information Successfully" }
    }

    //update Personal information
    const updatePersonalInfom = await axioslogin.patch('/empcontract/updatePersonal', newcontractdetl)
    if (updatePersonalInfom.data.success === 2) {
        return { ...message, persoStatus: 1, qualifStatus: 0, expeStatus: 0, contrLogStatus: 0, message: "Update Personal Information Successfully" }
    }

    //update qualification
    const updateQualification = await axioslogin.patch('/empcontract/updateQual', newcontractdetl)
    if (updateQualification.data.success === 2) {
        return { ...message, persoStatus: 0, qualifStatus: 1, expeStatus: 0, contrLogStatus: 0, message: "Update Qualification Successfully" }
    }
    //update Experience
    const updateExperience = await axioslogin.patch('/empcontract/updateExp', newcontractdetl)
    if (updateExperience.data.success === 2) {
        return { ...message, persoStatus: 0, qualifStatus: 0, expeStatus: 1, contrLogStatus: 0, message: "Update Personal Information Successfully" }
    }

    // return  { ...message, persoStatus: 0, qualifStatus: 0 , expeStatus: 1, message: "Update Personal Information Successfully" }
}


export const employeeRecordUpdationUserChoice = async (newcontractdetl, oldPersonalData) => {
    let message = { salaryUpdtStatus: 0, contrLogStatus: 0, message: "" }
    //update salary table updation

    const updateSalaryTableUpdation = await axioslogin.patch('/empcontract/updateEarn', newcontractdetl)
    if (updateSalaryTableUpdation.data.success === 2) {
        return { ...message, salaryUpdtStatus: 1, contrLogStatus: 0, message: "Update Personal Information Successfully" }
    }

}

export const updateoldAttndanceDetail = async (attendancedetls) => {
    /**attendance details updation**/
    const result = await axioslogin.post('/attedancemarkSave/insert', attendancedetls.attendancedata)
    const { success } = result.data
    if (success === 1) {
        return { status: 1, message: "updated successfully" }
    } else {
        return { status: 0, message: "Error Updating" }
    }
}

export const updateArrearSalary = async (arreardetails) => {
    /** arrear details and salary updation **/
    const result = await axioslogin.post('/empcontract/arrearSalary', arreardetails.arreardata)
    const { success } = result.data
    if (success === 1) {
        return { status: 1, message: "updated successfully" }
    } else {
        return { status: 0, message: "Error Updating " }
    }
}

export const updateEmployeeMasterTable = async (updateempMast, no, oldCategory, newCatgeory, newempId, empno) => {
    let messsage = { modelStatus: 0, openStatus: 0, disableStatus: 0 }
    const result = await axioslogin.patch('/empcontract/updateEmpMaster', updateempMast)
    const { success } = result.data
    if (success === 6) {
        // setOpen(true)
        const results = await axioslogin.get(`/empmast/databyempid/${no}`)
        // const { data, success } = result.data
        if (results.data.success === 1) {
            const { em_id, em_no, em_category, em_email } = results.data.data[0]
            const submitemployee = {
                emp_no: em_no,
                emp_id: em_id,
                emp_status: 1,
                emp_username: newempId,
                emp_password: newempId,
                emp_email: em_email,
                create_user: empno
            }
            // update hrm_employee table
            const resultemployee = await axioslogin.post('/employee', submitemployee);
            const { success } = resultemployee.data;
            if (success === 1) {
                if (oldCategory !== em_category) {
                    return { ...messsage, modelStatus: 1, openStatus: 1, disableStatus: 0 }
                }
                else {
                    return { ...messsage, modelStatus: 0, openStatus: 0, disableStatus: 1 }
                }

            }
        }
    }
}

export const employeeNewContractEntry = async (newcontractdetl) => {
    /** after contract renewal process if category is contract,  **/
    const result = await axioslogin.post('/empcontract', newcontractdetl)
    const { success } = result.data
    if (success === 1) {
        return { status: 1, message: "Data Inserted successfully" }
    } else {
        return { status: 0, message: "Error Updating " }
    }
}