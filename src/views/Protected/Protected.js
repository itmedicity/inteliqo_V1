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

            dispatch({ type: FETCH_LOGIN_CRED, payload: login })

        }
        const { empid } = login
        const timer = setTimeout(() => {
            dispatch(setProfileData(empid))
        }, 5000);
        return () => clearTimeout(timer);

    }, [history]);

    return (
        <div>
            <Component />
        </div>
    )
}

export default Protected
