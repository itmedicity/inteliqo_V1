import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const ShiftSelect = (props) => {
    //initializing
    const [ShiftData, setShiftData] = useState([]);
    //useContext
    const { getshifts, updateShifts, updateshiftnameselect } = useContext(PayrolMasterContext)
    //useEffect
    useEffect(() => {
        const getshiftdata = async () => {
            const result = await axioslogin.get('/shift')
            const { success, data } = result.data
            if (success === 1) {
                setShiftData(data)
            }
        }
        getshiftdata()
        return (
            updateShifts(0)
        )
    }, [updateShifts])

    const getLabel = (e) => {
        const selectedText = e.nativeEvent.target.textContent
        updateshiftnameselect(selectedText)
    }

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-labels"
                    id="demo-simple-selects"
                    name="getshifts"
                    value={getshifts}
                    onChange={(e) => {
                        updateShifts(e.target.value)
                        getLabel(e)
                    }}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value={0} disabled>
                        Shift
                    </MenuItem>
                    {
                        ShiftData && ShiftData.map((val, index) => {
                            return <MenuItem key={index} value={val.shft_code}>{val.shft_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default ShiftSelect
