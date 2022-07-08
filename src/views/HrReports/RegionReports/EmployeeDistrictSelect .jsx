
import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setDistrict } from 'src/redux/actions/District.Action';

const EmployeeDistrictSelect = ({ name, style, onChange }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDistrict());
    }, [])

    //selector feo district list
    const empDistrict = useSelector((state) => {
        return state.getDistrictList.DidtrictList
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
                        District
                    </MenuItem>
                    {
                        empDistrict && empDistrict.map((val, index) => {
                            return <MenuItem key={index} value={val.dist_slno}>{val.dist_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

        </Fragment>
    )
}

export default EmployeeDistrictSelect
