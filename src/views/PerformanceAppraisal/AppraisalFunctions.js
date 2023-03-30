import { axioslogin } from "src/views/Axios/Axios"


export const InsertAppraisal = async (submitData) => {
    const result = await axioslogin.post('/Performance/create/data', submitData)
    if (result.data.success === 1) {
        return { status: 1, message: "Employee Submitted for Appraisal" }
    }
    else {
        return { status: 0, message: result.data.message }
    }
}

export const CheckIdExists = async (checkid) => {
    const result = await axioslogin.post('/Performance/getdetls', checkid)
    if (result.data.data.length === 0) {
        return { status: 1, data: [] }
    }
    else {
        return { status: 0, data: result.data.data }
    }

}

export const getexistDetails = async (id) => {
    const result = await axioslogin.get(`/Performance/existdetl/${id}`)
    const { data, success } = result.data
    if (success === 1) {
        return { status: 1, data: data }
    }
    else {
        return { status: 0, data: [] }
    }
}

export const updateEmpstatus = async (postData) => {
    const result = await axioslogin.patch('/Performance/update/empstatus', postData)
    const { success } = result.data
    if (success === 2) {
        return { Status: 1, message: "Submitted Successfully" }
    }
    else {
        return { Status: 0, message: "Error while Submitting" }
    }
}

export const onClickSubmit = async (checkid, em_id) => {
    const result = await axioslogin.post('/jobsummary/getjobspecific', checkid)
    const { data, success } = result.data;
    if (success === 1) {
        const array1 = data && data.map((val, index) => {
            const obj = {
                ...val, emid: em_id
            }
            return obj
        })

        const result = await axioslogin.get(`/Performance/Perfdata/${em_id}`)
        if (result.data.data.length === 0) {
            const result = await axioslogin.post('/Performance/createPerf', array1)
            const { success } = result.data
            if (success === 1) {
                return { Status: 1 }
            } else {
                return { Status: 0 }
            }
        } else {
            return { Status: 0 }
        }
    } else {
        return { Status: 0 }
    }
}

export const SubmitComptency = async (checkid, em_id) => {
    const result = await axioslogin.post('/jobsummary/get/jobcompetency', checkid)
    const { data, success } = result.data;
    if (success === 1) {
        const array1 = data && data.map((val, index) => {
            const obj = {
                ...val, emid: em_id
            }
            return obj;
        })
        const result = await axioslogin.get(`/Performance/getAll/compt/${em_id}`)
        if (result.data.data.length === 0) {

            const result = await axioslogin.post('/Performance/createComp', array1)
            const { success } = result.data
            if (success === 1) {
                return { Status: 1 }
            } else {
                return { Status: 0 }
            }
        } else {
            return { Status: 0 }
        }
    } else {
        return { Status: 0 }
    }
}

export const CreateEmployeeRemak = async (submitData) => {
    const result = await axioslogin.post('/Performance/empremark', submitData)
    const { success } = result.data
    if (success === 1) {
        return { status: 1, message: 'Appraisal Approved Successfully' }
    }
    else {
        return { status: 0, message: 'Error while submitting' }
    }
}


export const UpdateEmployeeDetl = async (postData) => {
    const result = await axioslogin.patch('/Performance/update/career/empstatus', postData)
    const { success, message } = result.data
    if (success === 2) {
        return { status: 1, message: message }
    }
    else {
        return { status: 0, message: message }
    }

}

