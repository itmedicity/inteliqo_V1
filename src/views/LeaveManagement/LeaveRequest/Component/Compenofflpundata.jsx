import React, { Fragment, useState } from 'react';
import { Checkbox, FormControlLabel, MenuItem, Select } from '@material-ui/core'
// import { MenuItem, Select } from '@mui/material';

const Compenofflpundata = ({ style, punchtime, setpunchindatamain, setpunchoutdatamain }) => {
    const [punchindata, setpunin] = useState(0)
    const [punchoutdata, setpunout] = useState(0)

    return (
        <Fragment>
            <div className="row g-1">
                <div className="col-md-6">
                    <div className="d-flex justify-content-start">
                        <div className="col-md-2">
                            <FormControlLabel
                                className="pl-0"
                                control={
                                    <Checkbox
                                        name="start_month"
                                        color="secondary"
                                    // value={checkout}
                                    // disabled={checkoutdisable}
                                    // checked={checkout}
                                    // className="ml-2"
                                    // onChange={(e) => {
                                    //     setcheckout(e.target.checked)
                                    //     checkoutset(e)
                                    // }}
                                    />
                                }
                                label="IN"
                            />
                        </div>
                        <div className="col-md-10 pt-2 pr-2">
                            <Select
                                name={`hol`}
                                // name={holname}
                                onChange={(e) => {
                                    setpunin(e.target.value)
                                    setpunchindatamain(e.target.value)
                                }}
                                fullWidth
                                value={punchindata}
                                variant="outlined"
                                className="ml-0"
                                defaultValue={0}
                                style={style}
                            >
                                {punchtime && punchtime.map((val, index) => {

                                    return <MenuItem key={index} value={val.value} selected>{val.desc}</MenuItem>

                                })}
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="d-flex justify-content-start">
                        <div className="col-md-3">
                            <FormControlLabel
                                className="pl-3"
                                control={
                                    <Checkbox
                                        name="start_month"
                                        color="secondary"
                                    // value={checkout}
                                    // disabled={checkoutdisable}
                                    // checked={checkout}
                                    // className="pl-4"
                                    // onChange={(e) => {
                                    //     setcheckout(e.target.checked)
                                    //     checkoutset(e)
                                    // }}
                                    />
                                }
                                label="OUT"
                            />
                        </div>
                        <div className="col-md-10 pt-2">
                            <Select
                                // name={`hol`}
                                // name={holname}
                                onChange={(e) => {
                                    setpunout(e.target.value)
                                    setpunchoutdatamain(e.target.value)
                                }}
                                fullWidth
                                value={punchoutdata}
                                variant="outlined"
                                className="ml-0"
                                defaultValue={0}
                                style={style}
                            >
                                {punchtime && punchtime.map((val, index) => {

                                    return <MenuItem key={index} value={val.value} selected>{val.desc}</MenuItem>

                                })}
                            </Select>
                        </div>
                    </div>
                </div>


            </div>
        </Fragment>
    )
};

export default Compenofflpundata;
