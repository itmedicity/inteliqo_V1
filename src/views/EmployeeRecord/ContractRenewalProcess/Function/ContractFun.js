import { axioslogin } from "src/views/Axios/Axios"
import { warningNofity } from "src/views/CommonCode/Commonfunc"

export const employeeRecordUpdationMandatory = async (oldPersonalData) => {

    //contract log updation
    const updateContractLogTable = await axioslogin.post('/empcontract/createcontractlog', oldPersonalData.personalData)
    if (updateContractLogTable.data.success === 1) {
        return { contrLogStatus: 1, message: "Update Data Successfully" }
    }
    else {
        return { contrLogStatus: 0, message: "Error while updating" }
    }

    // return  { ...message, persoStatus: 0, qualifStatus: 0 , expeStatus: 1, message: "Update Personal Information Successfully" }
}


export const employeeRecordUpdationUserChoice = async (newcontractdetl, oldPersonalData) => {
    //let message = { salaryUpdtStatus: 0, message: "" }
    //update salary table updation

    const updateSalaryTableUpdation = await axioslogin.patch('/empcontract/updateEarn', newcontractdetl)
    if (updateSalaryTableUpdation.data.success === 2) {
        return { salaryUpdtStatus: 1, message: "Update Personal Information Successfully" }
    } else {
        return { salaryUpdtStatus: 0, message: "Error While Updating salary information" }
    }

}

export const updateoldAttndanceDetail = async (attendancedetls, punchmast) => {
    /**attendance details updation**/

    if (punchmast.length === 0) {
        const result = await axioslogin.post('/attedancemarkSave/insert', attendancedetls.attendancedata)
        const { success } = result.data
        if (success === 1) {
            return { status: 1, message: "updated successfully" }
        } else {
            return { status: 0, message: "Error Updating Attendance" }
        }
    } else {
        const result = await axioslogin.post('/attedancemarkSave/insert', attendancedetls.attendancedata)
        const { success } = result.data
        if (success === 1) {
            const result = await axioslogin.patch('/empcontract/update/punchmast', punchmast)
            const { success } = result.data
            if (success === 1) {
                return { status: 1, message: "updated successfully" }
            } else {
                return { status: 0, message: "Error Updating Attendance" }
            }
        } else {
            return { status: 0, message: "Error Updating Attendance" }
        }
    }

}

export const updateArrearSalary = async (arreardetails) => {
    /** arrear details and salary updation **/
    const result = await axioslogin.post('/empcontract/arrearSalary', arreardetails.arreardata)
    const { success } = result.data
    if (success === 1) {
        return { status: 1, message: "updated successfully" }
    } else {
        return { status: 0, message: "Error Updating Arrear Salary" }
    }
}

export const updateEmployeeMasterTable = async (updateempMast, no, oldCategory, newCatgeory, newempId, empno, id, updateSlno) => {
    let messsage = { modelStatus: 0 }
    const delteId = {
        emp_slno: updateSlno
    }
    const result = await axioslogin.delete('/employee', delteId)
    const { success } = result.data
    if (success === 2) {
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
                        return { ...messsage, modelStatus: 1, message: "Data Inserted successfully" }
                    }
                    else {
                        return { ...messsage, modelStatus: 0, message: "Error Occured" }
                    }

                }
                else {
                    return { ...messsage, modelStatus: 0, openStatus: 0, disableStatus: 1, message: "Error Occured" }
                }
            }
        }
    } else {
        return { ...messsage, modelStatus: 0, openStatus: 0, disableStatus: 1, message: "Error Occured" }
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

export const employeeUpdatePersonaltable = async (newcontractdetl) => {
    //update Personal information
    const updatePersonalInfom = await axioslogin.patch('/empcontract/updatePersonal', newcontractdetl)
    if (updatePersonalInfom.data.success === 2) {
        return { persoStatus: 1, message: "Update Personal Information Successfully" }
    } else {
        warningNofity("Error While Updating Personal Table")
        return { persoStatus: 0, message: "Error While Updating Personal Table" }
    }
}

export const employeeUpdateQualificationTable = async (newcontractdetl) => {

    //update qualification
    const updateQualification = await axioslogin.patch('/empcontract/updateQual', newcontractdetl)
    if (updateQualification.data.success === 2) {
        return { qualifStatus: 1, message: "Update Qualification Successfully" }
    }
    else {
        warningNofity("Error while updating Qualification Table")
        return { qualifStatus: 0, message: "Error while updating Qualification Table" }
    }
}

export const employeeUpdateExpTable = async (newcontractdetl) => {

    //update Experience
    const updateExperience = await axioslogin.patch('/empcontract/updateExp', newcontractdetl)
    if (updateExperience.data.success === 2) {
        return { expeStatus: 1, message: "Update Personal Information Successfully" }
    } else {
        warningNofity("Error While Updating Experience Table")
        return { expeStatus: 0, message: "Error While Updating Experience Table" }
    }
}
