
import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setRegionList } from 'src/redux/actions/Region.Actions';

const EmployeeRegionSelect = ({ name, style, onChange }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRegionList());
    }, [])

    //selector for region list
    const emRegion = useSelector((state) => {
        return state.getRegionList.RegionList
    })

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-2"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value='0'>
                        Region
                    </MenuItem>
                    {
                        emRegion && emRegion.map((val, index) => {
                            return <MenuItem key={index} value={val.reg_slno}>{val.reg_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        </Fragment>
    )
}

export default EmployeeRegionSelect
