import { axioslogin } from "src/views/Axios/Axios"

export const getEmployeeData = async (postData) => {

    const result = await axioslogin.post("/payrollprocess/getPayslip/data", postData)
    console.log(result);
    if (result.data.success === 1) {
        return { status: 1, empData: result.data.data }
    } else {
        return { status: 0, empData: [] }
    }

}

export const FixedSalary = async (checkdatas) => {
    const result = await axioslogin.post("/payrollprocess/empFixedDetl", checkdatas)
    if (result.data.success === 1) {
        return { status: 1, fixedData: result.data.data }
    } else {
        return { status: 0, fixedData: [] }
    }
}

export const EarningSalary = async (checkdatas) => {
    const result = await axioslogin.post("/payrollprocess/empEarning", checkdatas)
    if (result.data.success === 1) {
        return { status: 1, earningData: result.data.data }
    } else {
        return { status: 0, earningData: [] }
    }
}

export const deductionSalary = async (checkdatas) => {
    const result = await axioslogin.post("/payrollprocess/empDeduction", checkdatas)
    if (result.data.success === 1) {
        return { status: 1, deductionData: result.data.data }
    } else {
        return { status: 0, deductionData: [] }
    }
}


//export 
