import React, { Fragment, useState } from 'react'
import TextInput from 'src/views/Component/TextInput';
import { Switch, Typography, Stack, IconButton } from '@mui/material'
import '../EmpStyle.css'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const FixedWagesSalaryIncre = ({ value }) => {
    const { desc, amount, lastChange, increment } = value;
    const [color, setColor] = useState(false);

    const handleClick = () => {
        console.log(desc);
        setColor(!color)
    }

    return (
        <Fragment>
            <li className="list-group-item py-0">
                <div className="d-flex justify-content-between " >
                    <div className="col-md-3 text-start">{desc}</div>
                    <div className="col-md-1 text-start">{amount}</div>
                    <div className="col-md-2 text-start">{lastChange}</div>
                    <div className="col-md-2 text-start">
                        <div className="col-md-10">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm custom-datefeild-height"
                                Placeholder="Date "
                            />
                        </div>
                    </div>
                    <div className="col-md-1 text-start">
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography>-</Typography>
                            <Switch size="small" color="success" checked={increment} />
                            <Typography>+</Typography>
                        </Stack>
                    </div>
                    <div className="col-md-2 text-start">
                        <TextInput
                            type="number"
                            classname="form-control form-control-sm custom-datefeild-height"
                            Placeholder="0.00"
                        />
                    </div>
                    <div className="col-md-1 text-center">
                        <IconButton aria-label="add" style={{ padding: "0rem" }} onClick={handleClick}  >
                            <AddTaskRoundedIcon color={color === false ? "success" : "error"} />
                        </IconButton>
                    </div>
                </div>
            </li>
        </Fragment>
    )
}

export default FixedWagesSalaryIncre
