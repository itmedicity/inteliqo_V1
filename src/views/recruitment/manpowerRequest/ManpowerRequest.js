import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import SessionCheck from 'src/views/Axios/SessionCheck';
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn';
import TextInput from 'src/views/Component/TextInput';

function ManpowerRequest() {

    const [textval, setTextVal] = useState("true")

    const submitFormData = () => {

    }

    return (
        <div>
            <SessionCheck />
            <form onSubmit={submitFormData} id="subform" >
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
            </form>
        </div>
    )
}

export default ManpowerRequest
