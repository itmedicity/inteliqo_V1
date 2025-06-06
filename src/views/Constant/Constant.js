import { axioslogin } from "../Axios/Axios";

export const employeeNumber = () => {

    const userinfo = sessionStorage.getItem('userDetl');
    const employeNumber = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empno : 0;
    return employeNumber;
};

export const getSerialnumberempid = async () => {
    const result = await axioslogin.get('/common/getSerialno')
    const { success } = result.data;
    if (success === 1) {
        const [serial_current] = result.data.data
        return serial_current.serial_current
    }
}

export const getSerialnumberempnumber = async () => {
    const result = await axioslogin.get('/common/getSerialnoempno')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {
        return serial_current.serial_current
    }
}

export const getProcessserialnum = async () => {
    const result = await axioslogin.get('/common/getprocess')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {
        return serial_current.serial_current
    }
}
//generating jobid
export const getJobid = async () => {
    const result = await axioslogin.get('/jobsummary')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {
        return serial_current.serial_current
    }
}
export const SELECT_CMP_STYLE = {
    minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4
}

export const CARD_HEADER_COLOR = {
    backgroundColor: '#757575', color: "white"
}

export const CARD_SUB_HEADER_COLOR = {
    backgroundColor: '#a4a4a4'
}

export const TEXT_MUTED = "#c7c7c7"
export const TEXT_DARK = "#000000"

export const getFineSlno = async () => {
    const result = await axioslogin.get('/common/getFineSlno')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {
        return serial_current.serial_current
    }
}

export const getleaverequest = async () => {
    const result = await axioslogin.get('/common/getleaverequwestslno')
    const { success } = result.data;
    const [serial_current] = result.data.data
    if (success === 1) {

        return serial_current.serial_current
    }
}

// export const PUBLIC_NAS_FOLDER = "http://192.168.10.170/NAS/"


//GET ASSINED MENU LIST

export const getMenuSlno = async () => {
    const result = await axioslogin.get(`/common/getempid/${employeeNumber()}`)
    const { success, data } = result.data
    if (success === 1) {
        const { emp_id } = data[0]
        const results = await axioslogin.get(`/grprights/${emp_id}`)
        const { resdata } = results.data;
        return resdata;
    }
}

//URL EXSIT CHECK FUNCTION

export const urlExist = (url, callBack) => {
    const img = new Image();
    img.src = JSON.parse(url);

    if (img.complete) {
        callBack(true);
    } else {
        img.onload = () => {
            callBack(true);
        };

        img.onerror = () => {
            callBack(false);
        };
    }
}

export const colorList = ["#63B598", "#CE7D78", "#EA9E70", "#A48A9E", "#C6E1E8", "#648177", "#FC458E",
    "#9ACBD0", "#F4F8D3", "#A6D6D6", "#8E7DBE", "#FF8282", "#D298E2", "#80CBC4",
    "#D2737D", "#A6F1E0", "#B4EBE6", "#3D8D7A", "#79806E", "#61DA5E", "#CD2F00",
    "#F7CFD8", "#F8B55F", "#67AE6E", "#90C67C", "#8F87F1", "#E9A5F1", "#FED2E2",
    "#DDEB9D", "#A0C878", "#EAD196", "#FFEDFA", "#FFB8E0", "#D76C82", "#FBF8EF",
    "#FFAD60", "#E0EEB8", "#11DEC1", "#C4DAD2", "#566CA0", "#FFDBE1", "#96CEB4",
    "#80B9AD", "#916988", "#EEF7FF", "#AEAD3A", "#F05A7E", "#4B5BDC", "#F7EEDD",
    "#7AA2E3", "#CB5BEA", "#D7C3F1", "#AC3E1B", "#DF514A", "#539397", "#FF8C9E",
    "#F697C1", "#BA96CE", "#679C9D", "#C6C42C", "#B3E2A7", "#6B8A7A", "#E1CF3B",
    "#9AD0C2", "#57C4D8", "#A4D17A", "#225B8", "#BE608B", "#96B00C", "#8ADAB2",
    "#DC8686", "#E145BA", "#EE91E3", "#B06161", "#35A29F", "#D2DE32", "#CD6688",
    "#6749E8", "#FFD0D0", "#8FB413", "#B2B4F0", "#C3C89D", "#C9A941", "#41D158",
    "#FB21A3", "#51AED9", "#5BB32D", "#807FB", "#21538E", "#89D534", "#D36647",
    "#7FB411", "#0023B8", "#3B8C2A", "#986B53", "#F50422", "#983F7A", "#EA24A3",
    "#79352C", "#521250", "#C79ED2", "#D6DD92", "#E33E52", "#B2BE57", "#FA06EC",
    "#1BB699", "#6B2E5F", "#64820F", "#1C271", "#21538E", "#89D534", "#D36647",
    "#7FB411", "#0023B8", "#3B8C2A", "#986B53", "#F50422", "#983F7A", "#EA24A3",
    "#79352C", "#521250", "#C79ED2", "#D6DD92", "#E33E52", "#B2BE57", "#FA06EC",
    "#1BB699", "#6B2E5F", "#64820F", "#1C271", "#9CB64A", "#996C48", "#9AB9B7",
    "#06E052", "#E3A481", "#0EB621", "#0D5AC1", "#B2DB15", "#AA226D", "#792ED8",
    "#73872A", "#520D3A", "#CEFCB8", "#A5B3D9", "#7D1D85", "#C4FD57", "#F1AE16",
    "#8FE22A", "#EF6E3C", "#243EEB", "#1DC18", "#DD93FD", "#3F8473", "#E7DBCE",
    "#421F79", "#7A3D93", "#635F6D", "#93F2D7", "#9B5C2A", "#15B9EE", "#0F5997",
    "#409188", "#911E20", "#1350CE", "#10E5B1", "#FFF4D7", "#CB2582", "#CE00BE",
    "#32D5D6", "#17232", "#608572", "#C79BC2", "#00F87C", "#77772A", "#6995BA",
    "#FC6B57", "#F07815", "#8FD883", "#060E27", "#96E591", "#21D52E", "#D00043",
    "#B47162", "#1EC227", "#4F0F6F", "#1D1D58", "#947002", "#BDE052", "#E08C56",
    "#28FCFD", "#BB09B", "#36486A", "#D02E29", "#1AE6DB", "#3E464C", "#A84A8F",
    "#911E7E", "#3F16D9", "#0F525F", "#AC7C0A", "#B4C086", "#C9D730", "#30CC49",
    "#3D6751", "#FB4C03", "#640FC1", "#62C03E", "#D3493A", "#88AA0B", "#406DF9",
    "#615AF0", "#4BE47", "#2A3434", "#4A543F", "#79BCA0", "#A8B8D4", "#00EFD4",
    "#7AD236", "#7260D8", "#1DEAA7", "#06F43A", "#823C59", "#E3D94C", "#DC1C06",
    "#F53B2A", "#B46238", "#2DFFF6", "#A82B89", "#1A8011", "#436A9F", "#1A806A",
    "#4CF09D", "#C188A2", "#67EB4B", "#B308D3", "#FC7E41", "#AF3101", "#FF065",
    "#71B1F4", "#A2F8A5", "#E23DD0", "#D3486D", "#00F7F9", "#474893", "#3CEC35",
    "#1C65CB", "#5D1D0C", "#2D7D2A", "#FF3420", "#5CDD87", "#A259A4", "#E4AC44",
    "#1BEDE6", "#8798A4", "#D7790F", "#B2C24F", "#DE73C2", "#D70A9C", "#25B67",
    "#88E9B8", "#C2B0E2", "#86E98F", "#AE90E2", "#1A806B", "#436A9E", "#0EC0FF",
    "#F812B3", "#B17FC9", "#8D6C2F", "#D3277A", "#2CA1AE", "#9685EB", "#8A96C6"
]

export const screenInnerHeight = window.innerHeight

export const employeeIdNumber = () => {

    const userinfo = sessionStorage.getItem('userDetl');
    const employeNumber = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empid : 0;
    return employeNumber;
};
