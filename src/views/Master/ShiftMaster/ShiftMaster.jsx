import React, { Fragment } from 'react'
import TextInput from 'src/views/Component/TextInput';
//import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave';
import { useHistory } from 'react-router';
import Timepicker from 'src/views/Component/Timepicker';
import { FormControl, MenuItem, Select } from '@mui/material';

import MinutePicker from 'src/views/Component/MinutePicker';


const ShiftMaster = () => {
    // const classes = useStyles()
    const history = useHistory()
    const toSettings = () => {
        history.push('/Home/Settings')
    }

    return (
        <Fragment>
            <PageLayoutSave
                heading="Shift Master"
                redirect={toSettings}
                submit={null}
            >
                <div className="col-md-7" >
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-3">

                                <div className="row g-1">
                                    <div className="col-md-9">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm mb-2"
                                            Placeholder="Shift Name"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm mb-2"
                                            Placeholder="Shift Code"
                                        />
                                    </div>
                                </div>

                                <div className="row g-1">
                                    <div className="col-md-3" >
                                        <label className="form-label">
                                            Check In
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <Timepicker />
                                    </div>
                                    <div className="col-md-3" >
                                        <label className="form-label">
                                            Check Out
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <Timepicker />
                                    </div>
                                </div>


                                <div className="row g-1">
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Check In Start
                                        </label>
                                    </div>
                                    <div className="col-md-3" >
                                        <Timepicker />
                                    </div>
                                    <div className="col-md-3" >
                                        <label className="form-label">
                                            Check In End
                                        </label>
                                    </div>
                                    <div className="col-md-3" >
                                        <Timepicker />
                                    </div>
                                </div>

                                <div className="row g-1">
                                    <div className="col-md-3" >
                                        <label className="form-label">
                                            Check Out Start
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <FormControl
                                            fullWidth
                                            margin="dense"
                                            className="mt-0"
                                        >
                                            <Select
                                                name="Selectgender"
                                                // value={Selectgender}
                                                // onChange={(e) => updateFormData(e)}
                                                fullWidth
                                                variant="outlined"
                                                className="ml-1"
                                                defaultValue={0}
                                                style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}

                                            >
                                                <MenuItem value='0' disabled>1</MenuItem>
                                                <MenuItem value='1'>1</MenuItem>
                                                <MenuItem value='2'>2</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Check Out End
                                        </label>
                                    </div>
                                    <div className="col-md-3" >
                                        <FormControl
                                            fullWidth
                                            margin="dense"
                                            className="mt-0"
                                        >
                                            <Select
                                                name="Selectgender"
                                                // value={Selectgender}
                                                // onChange={(e) => updateFormData(e)}
                                                fullWidth
                                                variant="outlined"
                                                className="ml-1"
                                                defaultValue={0}
                                                style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}

                                            >
                                                <MenuItem value='0' disabled>1</MenuItem>
                                                <MenuItem value='1'>1</MenuItem>
                                                <MenuItem value='2'>2</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                <div className="row g-1">
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Break Start
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <Timepicker />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="test" className="form-label">
                                            Break End
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <Timepicker />
                                    </div>
                                </div>

                                <div className="row g-1">
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Early In Calculation
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl
                                            fullWidth
                                            margin="dense"
                                            className="mt-0"
                                        >
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="cross_day"
                                                fullWidth
                                                variant="outlined"
                                                style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                            >

                                                <MenuItem value='1' >
                                                    Calculate As Normal Work Day
                                                </MenuItem>
                                                <MenuItem value='2' >
                                                    Calculate As Over Time
                                                </MenuItem>
                                                <MenuItem value='3' >
                                                    Calculate As Weekend Over Time
                                                </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-3">
                                        <MinutePicker />
                                    </div>
                                </div>

                                <div className="row g-1">
                                    <div className="col-md-3">
                                        <label htmlFor="test" className="form-label">
                                            Early Out Calculation
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl
                                            fullWidth
                                            margin="dense"
                                            className="mt-0"
                                        >
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="cross_day"
                                                fullWidth
                                                variant="outlined"
                                                style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                            >

                                                <MenuItem value='1' >
                                                    Calculate As Normal Work Day
                                                </MenuItem>
                                                <MenuItem value='2' >
                                                    Calculate As Over Time
                                                </MenuItem>
                                                <MenuItem value='3' >
                                                    Calculate As Weekend Over Time
                                                </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-3">
                                        <MinutePicker />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Allowed Late In
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <MinutePicker />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Allowed Late Out
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <MinutePicker />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            First Half Check In Time
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <Timepicker />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            First Half Check Out Time
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <Timepicker />
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Second Half Check In Time
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <Timepicker />
                                    </div>
                                    <div className="col-md-3">
                                        <label className="form-label">
                                            Second Half Check Out Time
                                        </label>
                                    </div>
                                    <div className="col-md-3">
                                        <Timepicker />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutSave >
        </Fragment >
    )
}

export default ShiftMaster
