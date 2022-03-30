import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Actiontypes } from '../../redux/constants/action.type'
import { setProfileData } from '../../redux/actions/Profile.action'

const Protected = (props) => {

    const { FETCH_LOGIN_CRED } = Actiontypes;

    let Component = props.cmp;
    let history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        const loginDetl = sessionStorage.getItem('userDetl');
        const login = JSON.parse(loginDetl)
        if (!loginDetl) {
            history.push('/');
        } else {
            const { empid } = login
            dispatch({ type: FETCH_LOGIN_CRED, payload: login })
            // Dispatch function for the Profile Data Updation
            dispatch(setProfileData(empid))
        }
    }, [history]);

    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected
