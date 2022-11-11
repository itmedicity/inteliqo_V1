import { axioslogin } from 'src/views/Axios/Axios'
import { Actiontypes } from '../constants/action.type'
const { FETCH_ALERT_MESSAGE } = Actiontypes

export const setAlertList = () => async (dispatch) => {
  const result = await axioslogin.get('/hrmAlert')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_ALERT_MESSAGE, payload: data })
  }
}
