import { axioslogin } from "src/views/Axios/Axios";

export const getMenuNameList = async () => {
    return await axioslogin.get('/modulegroup/select/menulist').then((res) => {
        const { success, data } = res.data
        if (success === 1) {

            const arr = data?.map((val) => {
                const obj = {
                    showStatus: val.menu_status === "1" ? 'Yes' : 'No'
                }
                return { ...val, ...obj }
            })
            return arr
        } else {
            return []
        }
    })
}