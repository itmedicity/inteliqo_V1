import { TextField } from '@material-ui/core';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import React, { useState } from 'react';
import SessionCheck from 'src/views/Axios/SessionCheck';
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn';
import TextInput from 'src/views/Component/TextInput';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { useStyles } from 'src/views/CommonCode/MaterialStyle';
import { Input } from '@mui/material';

function ManpowerRequest() {

    const [textval, setTextVal] = useState("true")

    const submitFormData = () => {

    }

    const [workstartdate, setWorkdate] = useState(new Date())
    const [workenddate, setWorkEnddate] = useState(new Date())
    //setting work start Date
    const setWorkstartdate = (val) => {
        setWorkdate(val)
    }
    //setting work End Date
    const setWorkenddate = (val) => {
        setWorkEnddate(val)
    }

    const classes = useStyles()
    return (
        <div>
            <SessionCheck />
            <form onSubmit={submitFormData} id="subform" >
                {/* <div className="row">
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
                </div> */}
                <div className="col-md-3 pt-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            // label="Work Start Date"
                            name="workstartdate"
                            type="date"
                            clearable
                            value={workstartdate}
                            onChange={(e) => {
                                setWorkstartdate(e)
                            }}
                            InputProps={{
                                className: classes.inputColor
                            }}
                            style={{ height: '1.5rem' }}
                            renderInput={(params) => <TextField {...params}
                                fullWidth
                                size="small"
                                autoComplete="off"
                                variant="outlined"
                            />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="col-md-3 pt-2">
                    <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        variant="outlined"
                        InputProps={{
                            className: classes.inputColor
                        }}
                    />
                </div>


            </form>
        </div>
    )
}

export default ManpowerRequest
