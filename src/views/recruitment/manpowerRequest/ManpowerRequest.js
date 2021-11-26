import { TextField } from '@material-ui/core';
import React from 'react';
import FullPageloader from 'src/components/FullPageloader';
import SessionCheck from 'src/views/Axios/SessionCheck';

function ManpowerRequest() {

    return (
        <div>
            <SessionCheck />
            <FullPageloader />
        </div>
    )
}

export default ManpowerRequest
