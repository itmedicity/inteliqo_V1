import React, { Fragment } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const AttendanceMarkingCheckbox = ({ approval, updateApproval, testChecked, name, label }) => {
    return (
        <Fragment>
            <FormControlLabel
                control={
                    <Checkbox
                        name={name}
                        color="secondary"
                        value={approval}
                        checked={approval}
                        onChange={(e) => {
                            updateApproval(e)
                            testChecked(e.target.checked)
                        }}
                    />
                }
                label={label}
            />
        </Fragment>
    )
}

export default AttendanceMarkingCheckbox