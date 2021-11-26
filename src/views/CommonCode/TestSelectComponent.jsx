import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment } from 'react'

const TestSelectComponent = ({ name, select }) => {
    // console.log(props);
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    name={name}
                    value={0}
                    // onChange={(e) => updateSalutSelected(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                >
                    <MenuItem value='0' disabled>{select}</MenuItem>
                    {/* <MenuItem value='1'>INDIA</MenuItem>
                    <MenuItem value='2'>UAE</MenuItem>
                    <MenuItem value='3'>DUBAI</MenuItem> */}
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default TestSelectComponent
