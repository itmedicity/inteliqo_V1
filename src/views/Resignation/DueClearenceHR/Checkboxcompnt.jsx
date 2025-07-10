import { Checkbox } from '@mui/joy';
import React, { Fragment } from 'react';
const Checkboxcompnt = ({ approval, updateApproval, name, label }) => {
    return (
        <Fragment>
            <Checkbox
                label={label}
                name={name}
                color="secondary"
                value={approval}
                checked={approval}
                onChange={(e) => updateApproval(e)}
            />
        </Fragment>
    )
};
export default Checkboxcompnt;
