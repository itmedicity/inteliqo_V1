import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
// import { token } from 'src/views/Constant/Constant';
import { infoNofity } from '../CommonCode/Commonfunc';
const SessionCheck = () => {

    // var accessToken = token()
    const history = useHistory();

    useEffect(() => {
        axioslogin.get('/users').then((response) => {
            if (response.data.status !== 200) {
                sessionStorage.clear();
                infoNofity('session timed out...Please Login');
                history.push('/')
            }
        })

    }, [history]);

    return (
        <div>

        </div>
    )
}

export default SessionCheck
