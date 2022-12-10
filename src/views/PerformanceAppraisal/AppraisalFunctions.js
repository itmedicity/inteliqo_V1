import { axioslogin } from "src/views/Axios/Axios"


export const InsertAppraisal = async (submitData) => {

    const result = await axioslogin.post('/Performance/create/data', submitData)
    if (result.data.success === 1) {
        return { status: 1, message: "Employee Submitted for Appraisal" }
        // const result = await axioslogin.get('/Performance/all')
        // console.log(result.data.data);
        // if (result.data.success === 1) {
        //     return { status: 1, message: "Employee Submitted for Appraisal", data: result.data.data }
        // }
    }
    else {
        return { status: 0, message: result.data.message }
    }
}

export const CheckIdExists = async (checkid) => {
    const result = await axioslogin.post('/Performance/getdetls', checkid)
    console.log(result.data.data);
    if (result.data.data.length === 0) {
        return { status: 1, }
    }
    else {
        return { status: 0 }
    }

}


