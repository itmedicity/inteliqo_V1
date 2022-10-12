import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const EmployeeCategory = (props) => {
    // intializing use sate
    const [EmployeeCategorydata, getemployeeCategory] = useState([]);
    //useContext
    const { getemployeecategory, udateemployeecategory } = useContext(PayrolMasterContext)
    //useeffect
    useEffect(() => {
        const getempcategorydata = async () => {
            const result = await axioslogin.get('/empcat/select')
            const { success, data } = result.data;
            if (success === 1) {
                getemployeeCategory(data)
            }
        }
        getempcategorydata()
        return (
            udateemployeecategory(0)
        )
    }, [udateemployeecategory]);

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
                    value={getemployeecategory}
                    onChange={(e) => udateemployeecategory(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
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

export default memo(EmployeeCategory)
