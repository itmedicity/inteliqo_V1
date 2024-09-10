import { axioslogin } from "src/views/Axios/Axios";




export const getPicAndPdf = async (postdatapic, empdata, activeStep,) => {

    let dataObj = { status: 0, data: [] }
    const response = await axioslogin.post('/upload/files', postdatapic)
    const { success, } = response.data
    if (success === 1) {
        const data = response.data;
        const fileNames = data.data
        // Construct URLs for each file using the file names
        const fileUrls = fileNames.map((fileName) => {
            return `http://192.168.22.5/NAS/PersonalRecords/${empdata?.em_id}/checklist/${activeStep}/${fileName}`;
        });
        return { ...dataObj, status: 1, data: fileUrls }
        // fileUrls.forEach((fileUrl) => {
        //     // setFiles(fileUrls)

        // });
    } else {
        return { ...dataObj, status: 0, data: [] }
    }
}

export const getempdetails = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/PersonalChecklist/empdetails', postdata)
    const { success, data } = result.data
    if (success === 1) {
        return { ...dataObj, status: 1, data: data }

    }
    else {
        return { ...dataObj, status: 0, data: [] }
    }

}
export const biodetails = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/PersonalChecklist/biodetails', postdata)
    const { success, data } = result.data
    if (success === 1) {
        return { ...dataObj, status: 1, data: data }

    }
    else {
        return { ...dataObj, status: 0, data: [] }
    }

}
export const interviewmark = async (postdata) => {
    let dataObj = { status: 0, data: [] }
    const result = await axioslogin.post('/PersonalChecklist/interviewmark', postdata)
    const { success, data } = result.data
    if (success === 1) {
        return { ...dataObj, status: 1, data: data }

    }
    else {
        return { ...dataObj, status: 0, data: [] }
    }

}