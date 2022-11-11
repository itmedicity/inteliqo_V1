// import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { Fragment, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShiftDetails } from 'src/redux/actions/Shift.Action'
import { FormControl, MenuItem, Select } from '@material-ui/core';

const ShiftSelectByRedux = ({ value, setValue, style, disabled }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setShiftDetails());
    }, [dispatch])

    const shift = useSelector((state) => {
        return state.getShiftList.shiftDetails || 0
    })

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-3"
                    defaultValue={0}
                    style={style}
                    disabled={disabled}
                >
                    <MenuItem value='0' disabled>
                        Select Shift
                    </MenuItem>
                    {
                        shift && shift.map((val, index) => {
                            return <MenuItem key={index} value={val.shft_slno}>{val.shft_desc}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment >



        // <Box >
        //     <FormControl fullWidth size="medium"  >
        //         <Select
        //             labelId="demo-simple-select-label"
        //             id="demo-simple-select"
        //             value={value}
        //             onChange={(e) => setValue(e.target.value)}
        //             size="medium"
        //             fullWidth
        //             variant='outlined'
        //             sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
        //         >
        //             <MenuItem value={0} disabled >Select shift</MenuItem>
        //             {
        //                 shift && shift.map((val, index) => {
        //                     return <MenuItem key={index} value={val.shft_slno}>{val.shft_desc}</MenuItem>
        //                 })
        //             }
        //         </Select>
        //     </FormControl>
        // </Box >
    )
}

export default memo(ShiftSelectByRedux)