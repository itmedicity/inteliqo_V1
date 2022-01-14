import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const EmployeCategoryContract = (props) => {
    // intializing use sate
    const [EmployeeCategorydata, getemployeeCategory] = useState([]);
    // useContext
    const { categorycontract, updatecategorycontract } = useContext(PayrolMasterContext)
    // useeffect 
    useEffect(() => {
        const getempcategorydata = async () => {
            const result = await axioslogin.get('/empcat/getSelectContract')
            const { success, data } = result.data;
            if (success === 1) {
                getemployeeCategory(data)
            }
        }
        getempcategorydata()



    }, [updatecategorycontract]);
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
                    name="selectedEarntype"
                    value={categorycontract}
                    onChange={(e) => updatecategorycontract(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Employee Category
                    </MenuItem>
                    {
                        EmployeeCategorydata && EmployeeCategorydata.map((val, index) => {
                            return <MenuItem key={index} value={val.category_slno}>{val.ecat_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(EmployeCategoryContract)
