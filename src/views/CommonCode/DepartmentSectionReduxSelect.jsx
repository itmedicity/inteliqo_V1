import React, { Fragment, memo } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'


const DepartmentSectionReduxSelect = ({ value, setValue, style, label, data }) => {

    /** get selected grade from select list */
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Fragment>
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={handleChange}
                    // size="small"
                    multiple
                    fullWidth
                    displayEmpty
                    variant='outlined'
                    //sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                    style={style}
                // sx={{
                //     height: 26,
                //     lineHeight: 1,
                //     ...style,
                //     "&.MuiOutlinedInput-root": {
                //         // height: '1px',
                //     },
                // }}
                >
                    <MenuItem value='0' disabled>
                        Select Here
                    </MenuItem>
                    {
                        data && data.map((val, index) => {
                            return <MenuItem key={index} value={val.sect_id}>{val.sect_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl >
        </Fragment>
    )
}

export default memo(DepartmentSectionReduxSelect)



