import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { memo } from 'react';
import { useContext } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const EmployeType = () => {
    const [employeType, setEmployeType] = useState([]);

    const { selectEmployeeType,
        updateEmployeetype,
        setearntypeName } = useContext(PayrolMasterContext);
    useEffect(() => {
        const getEmployeeType = async () => {
            const result = await axioslogin.get('/emptype');
            const { success, data } = result.data;
            if (success === 1) {
                setEmployeType(data);
            }
        }
        getEmployeeType()
        return (
            updateEmployeetype(0)
        )
    }, [updateEmployeetype]);
    //  get element
    const getLabel = (e) => {
        const selectedText = e.nativeEvent.target.textContent
        setearntypeName(selectedText)
    }

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
                    name="employeType"
                    value={selectEmployeeType}
                    onChange={(e) => {
                        updateEmployeetype(e.target.value)
                        getLabel(e)
                    }
                    }
                    fullWidth

                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Employee Type
                    </MenuItem>
                    {
                        employeType && employeType.map((val, index) => {
                            return <MenuItem key={index} value={val.emptype_slno}>{val.emptype_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(EmployeType)
