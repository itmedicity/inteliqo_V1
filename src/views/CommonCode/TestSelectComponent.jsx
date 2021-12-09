import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment } from 'react'

const TestSelectComponent = ({ name, select, style }) => {
    // console.log(props);
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={name}
                    // onChange={(e) => updateSalutSelected(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value='0' disabled selected >{select}</MenuItem>
                    {/* <MenuItem value='1'>INDIA</MenuItem>
                    <MenuItem value='2'>UAE</MenuItem>
                    <MenuItem value='3'>DUBAI</MenuItem> */}
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default TestSelectComponent
