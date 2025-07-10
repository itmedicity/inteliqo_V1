import { Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import DutyHandover from './DutyHandover'

const DeptClearence = ({ em_department, em_dept_section, setEmp }) => {
    const HandleChange = (e) => {
        setEmp(e)
    }
    return (
        <Fragment>
            <div className="row g-1">
                <div className="col-md-5">
                    <Typography>Charge Handed Over To:</Typography>
                </div>
                <div className="col-md-7">
                    <DutyHandover style={SELECT_CMP_STYLE} em_department={em_department} em_dept_section={em_dept_section} onChange={HandleChange} />
                </div>
            </div>
        </Fragment>
    )
};

export default DeptClearence;
