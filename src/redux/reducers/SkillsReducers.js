import { Actiontypes } from "../constants/action.type"
const { FETCH_SKILLS } = Actiontypes;

const skills = {
    SkillList: [],
    loadingStatus: false
}

export const getSkillData = (state = skills, { type, payload }) => {
    switch (type) {
        case FETCH_SKILLS:
            return { ...state, SkillList: payload, loadingStatus: true }
        default:
            return state
    }
}