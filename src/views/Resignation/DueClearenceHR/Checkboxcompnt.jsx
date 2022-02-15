import React, { Fragment } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
const Checkboxcompnt = ({ approval, updateHRApproval, name, label }) => {
    return (
        <Fragment>
            <FormControlLabel
                control={
                    <Checkbox
                        name={name}
                        color="primary"
                        value={approval}
                        checked={approval}
                        onChange={(e) => updateHRApproval(e)}
                    />
                }
                label={label}
            />
        </Fragment>
    )
};
export default Checkboxcompnt;
