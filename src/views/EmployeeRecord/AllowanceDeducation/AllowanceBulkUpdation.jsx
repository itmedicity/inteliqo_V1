import { IconButton, Stack, Switch, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import TextInput from 'src/views/Component/TextInput'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';


const AllowanceBulkUpdation = () => {
    return (
        <Fragment>
            <li className="list-group-item py-0">
                <div className="d-flex justify-content-between" >
                    <div className="col-md-3 text-start">Test</div>
                    <div className="col-md-1 text-start">Test</div>
                    <div className="col-md-2 text-start">
                        <div className="col-md-10">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm custom-datefeild-height"
                                Placeholder="Date"
                                name="start_date"
                            // value={start_date}
                            // changeTextValue={(e) => updateSalaryIncrement(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-1 text-start">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>-</Typography>
                            <Switch size="small"
                                color="success"
                                // checked={increment_type}
                                name="increment_type"
                            // value={increment_type}
                            // onChange={(e) => updateSalaryIncrement(e)}
                            />
                            <Typography>+</Typography>
                        </Stack>
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="number"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="0.00"
                            name="increment_amount"
                        // value={increment_amount}
                        // changeTextValue={(e) => updateSalaryIncrement(e)}
                        />
                    </div>
                    <div className="col-md-1 text-center">
                        <IconButton aria-label="add" style={{ padding: "0rem" }}  >
                            <AddTaskRoundedIcon color={"success"} />
                        </IconButton>
                    </div>
                </div>
            </li>
        </Fragment>
    )
}

export default AllowanceBulkUpdation
