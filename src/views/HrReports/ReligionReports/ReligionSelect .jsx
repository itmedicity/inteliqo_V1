import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setReligion } from 'src/redux/actions/Religion.Action';


const ReligionSelect = ({ name, style, onChange }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setReligion());
    }, [])

    //selector for religion list
    const empReligions = useSelector((state) => {
        return state.getEmployeeReligion.empRel
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
                        Religion
                    </MenuItem>
                    {
                        empReligions && empReligions.map((val, index) => {
                            return <MenuItem key={index} value={val.relg_slno}>{val.relg_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}
export default ReligionSelect