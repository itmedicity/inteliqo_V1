import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import SessionCheck from 'src/views/Axios/SessionCheck';
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn';
import TextInput from 'src/views/Component/TextInput';

function ManpowerRequest() {

    const [textval, setTextVal] = useState("true")

    // const changeTextVal = (e) => {
    //     // console.log(e.target.value);
    //     setTextVal(e.target.value)
    // }

    return (
        <div>
            <SessionCheck />

            <div className="row">
                <div className="col-md-4">
                    <TextInput
                        type="text"
                        classname="form-control form-control-sm"
                        Placeholder="Test text Feild"
                        changeTextValue={(e) => setTextVal(e.target.value)}
                        value={textval}
                    />
                </div>
                <FooterClosebtn />
            </div>
        </div>
    )
}

export default ManpowerRequest
