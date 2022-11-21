import React, { Fragment, memo, useEffect, useState } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import { axioslogin } from 'src/views/Axios/Axios'


const ExceptMultiSelection = ({ value, setValue, style, label, data }) => {

    //const [exceptDept, setexceptDept] = useState([])
    // useEffect(() => {
    //     const getExceptDeptSection = async () => {
    //         const result = await axioslogin.get(`/HierarchyLevel/except`)
    //         const { success, data } = result.data
    //         if (success === 1) {
    //             setexceptDept(data)
    //         }
    //         else if (success === 0) {
    //             setexceptDept([])
    //         }
    //     }
    //     getExceptDeptSection()
    // }, [])

    /** get selected grade from select list */
    const handleChange = (event) => {
        //console.log(event.target.value);
        setValue(event.target.value);
    };

    return (
        <Fragment>
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    //onChange={(e) => handleChange(e)}
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
                    <MenuItem value={[]} disabled>
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

export default memo(ExceptMultiSelection)


