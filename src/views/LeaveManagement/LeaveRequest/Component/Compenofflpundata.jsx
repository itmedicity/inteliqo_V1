import React, { Fragment, memo, useState } from 'react';
import { Checkbox, FormControlLabel, MenuItem, Select } from '@material-ui/core'

const Compenofflpundata = ({ style, punchtime, setpunchindatamain, setpunchoutdatamain }) => {
    const [punchindata, setpunin] = useState(0)
    const [punchoutdata, setpunout] = useState(0)
    const [toggle, settoggle] = useState(true)
    const [toggle_end, settoggle_end] = useState(true)
    const [check, setcheck] = useState({
        check_in: false,
        check_out: false
    });
    const { check_in, check_out } = check;
    const updateCheck = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setcheck({ ...check, [e.target.name]: value })
    }

    //reset disable in date selection
    const punchstart = async (e) => {
        e.target.value === 'false' ? settoggle(false) : settoggle(true)
    }
    const punchend = async (e) => {
        e.target.value === 'false' ? settoggle_end(false) : settoggle_end(true)
    }

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
                                        name="check_in"
                                        color="secondary"
                                        value={check_in}
                                        checked={check_in}
                                        className="ml-2"
                                        onChange={(e) => {
                                            updateCheck(e)
                                            punchstart(e)
                                        }}
                                    />
                                }
                                label="IN"
                            />
                        </div>
                        <div className="col-md-10 pt-2 pr-2">
                            <Select
                                name={`hol`}
                                onChange={(e) => {
                                    setpunin(e.target.value)
                                    setpunchindatamain(e.target.value)
                                }}
                                fullWidth
                                value={punchindata}
                                disabled={toggle}
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
                                        name="check_out"
                                        color="secondary"
                                        value={check_out}
                                        checked={check_out}
                                        className="ml-2"
                                        onChange={(e) => {
                                            updateCheck(e)
                                            punchend(e)
                                        }}
                                    />
                                }
                                label="OUT"
                            />
                        </div>
                        <div className="col-md-10 pt-2">
                            <Select
                                onChange={(e) => {
                                    setpunout(e.target.value)
                                    setpunchoutdatamain(e.target.value)
                                }}
                                fullWidth
                                disabled={toggle_end}
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

export default memo(Compenofflpundata)
