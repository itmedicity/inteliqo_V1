import { Actiontypes } from '../constants/action.type'

const {
    FETCH_EMP_PROFILE_DATA,
    FETCH_EMP_PERSONAL_INFOM,
    FETCH_ACADEMIC_DATA,
    FETCH_EXPERIENCE_DATA,
    FETCH_LEAVE_AVAIL_LIST,
    FETCH_NOTIFYDETL
} = Actiontypes;

const Profile_inititalData = {
    ProfileData: {},
    lodingStatus: false,
    error: {}
}

export const getProfileData = (state = Profile_inititalData, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_PROFILE_DATA:
            return { ...state, ProfileData: payload, lodingStatus: true }
        default:
            return state
    }
}

const profileData = {
    empPersonalData: {
        personalData: {
            addressPermnt1: "NOT UPDATED",
            addressPermnt2: "NOT UPDATED",
            addressPresent1: "NOT UPDATED",
            addressPresent2: "NOT UPDATED",
            blood_slno: "NOT UPDATED",
            branch_name: "NOT UPDATED",
            contract_status: "NOT UPDATED",
            dept_name: "NOT UPDATED",
            desg_name: "NOT UPDATED",
            ecat_name: "NOT UPDATED",
            em_account_no: "NOT UPDATED",
            em_adhar_no: "NOT UPDATED",
            em_branch: "NOT UPDATED",
            em_category: "NOT UPDATED",
            em_conf_end_date: "NOT UPDATED",
            em_contract_end_date: "NOT UPDATED",
            em_department: "NOT UPDATED",
            em_dept_section: "NOT UPDATED",
            em_designation: "NOT UPDATED",
            em_dob: "NOT UPDATED",
            em_doj: "NOT UPDATED",
            em_email: "NOT UPDATED",
            em_gender: "NOT UPDATED",
            em_ifsc: "NOT UPDATED",
            em_mobile: "NOT UPDATED",
            em_name: "NOT UPDATED",
            em_no: "NOT UPDATED",
            em_pan_no: "NOT UPDATED",
            em_phone: "NOT UPDATED",
            em_region: "NOT UPDATED",
            em_retirement_date: "NOT UPDATED",
            em_salutation: "NOT UPDATED",
            emp__ot: 0,
            hod: 0,
            hrm_pin1: "NOT UPDATED",
            hrm_pin2: "NOT UPDATED",
            hrm_profile: 0,
            hrm_region2: "NOT UPDATED",
            hrm_religion: "NOT UPDATED",
            incharge: 0,
            ot_amount: 0,
            per_region: "NOT UPDATED",
            pres_region: "NOT UPDATED",
            sect_name: "NOT UPDATED",
        },
        personalDataStatus: false
    },
    empAcademicData: {
        academicData: [],
        academicDataStatus: false
    },
    empExperData: {
        experienData: {},
        experienDataStatus: false
    },
    empWageData: {
        wageData: {},
        apiStatus: false
    },
    empLeaveData: {
        leaveData: [],
        apiStatus: false
    },
    empnotify: {
        empnotifydata: {},
        empnotifyStatus: false
    },
}

export const getPrifileDateEachEmp = (state = profileData, { type, payload }) => {
    switch (type) {
        case FETCH_EMP_PERSONAL_INFOM:
            return {
                ...state,
                empPersonalData: {
                    ...state.empPersonalData,
                    personalData: payload[0],
                    personalDataStatus: true
                }
            }
        case FETCH_ACADEMIC_DATA:
            return {
                ...state,
                empAcademicData: {
                    ...state.empAcademicData,
                    academicData: payload,
                    academicDataStatus: true
                }
            }
        case FETCH_EXPERIENCE_DATA:
            return {
                ...state,
                empExperData: {
                    ...state.empExperData,
                    experienData: payload,
                    experienDataStatus: true
                }
            }

        case FETCH_LEAVE_AVAIL_LIST:
            return {
                ...state,
                empLeaveData: {
                    ...state.empLeaveData,
                    leaveData: payload,
                    apiStatus: true

                }
            }
        case FETCH_NOTIFYDETL:
            return {
                ...state,
                empnotify: {
                    ...state.empnotify,
                    empnotifydata: payload,
                    empnotifyStatus: true

                }
            }
        default:
            return state
    }
}