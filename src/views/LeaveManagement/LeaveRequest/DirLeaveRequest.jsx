import { Checkbox, FormControlLabel } from '@mui/material';
import React, { Fragment, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import LeaveSingleSelection from './Component/LeaveSingleSelection';
import LeaveDateSelection from './LeaveDateSelection';

const DirLeaveRequest = () => {
    const [date, setDate] = useState(0);
    const [lveData, setLveData] = useState([]);
    const [checkState, setCheckState] = useState(false)
    var data = [];
    if (date !== 0) {
        var data = [1, 2, 3]
    }
    console.log(lveData)
    return (
        <Fragment>
            <div className="card">
                <div className="card-body">
                    <div className="col-md-12 mb-2">
                        <div className="row g-1">
                            <div className="col-md-3">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="Rejoin Date"
                                    // disabled="disabled"
                                    changeTextValue={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="col-md-3">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="Rejoin Date"
                                // disabled="disabled"
                                />
                            </div>
                            <div className="col-md-1 p-0 mt-0 text-center">
                                <FormControlLabel
                                    className="p-0 m-0"
                                    control={
                                        <Checkbox
                                            name="all"
                                            color="secondary"
                                            // value={Leave_Carry_Forwad}
                                            // checked={Leave_Carry_Forwad}
                                            className="ml-2"
                                            onChange={(e) => setCheckState(e.target.checked)}
                                            checked={checkState}
                                        />
                                    }
                                    label="SL"
                                />
                            </div>
                            {
                                checkState === true ? <LeaveSingleSelection setLveState={setLveData} /> : null
                            }
                        </div>
                    </div>
                    {
                        checkState === false ?
                            data && data.map((val, index) => {
                                return <LeaveDateSelection key={val} index={index} date={date} setLeveData={setLveData} leveData={lveData} />
                            }) : null
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default DirLeaveRequest
