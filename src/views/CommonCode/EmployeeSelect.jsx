import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'

const EmployeeSelect = () => {
    const [empName, setEmpname] = useState([])
    const { selectedEmployee, updateSelectedEmployee } = useContext(PayrolMasterContext)
    // Get Employee Details
    useEffect(() => {
        const fetchEmployeeName = async () => {
            const result = await axioslogin.get('/empmast/select')
            const { data } = result.data;
            setEmpname(data)
        }
        fetchEmployeeName()
        return (
            updateSelectedEmployee(0)
        )
    }, [updateSelectedEmployee])

    // console.log(empName)
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
                    name="selectedDept"
                    value={selectedEmployee}
                    onChange={(e) => updateSelectedEmployee(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-2"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Select Employee Name
                    </MenuItem>
                    {
                        empName && empName.map((val, index) => {
                            return <MenuItem key={index} value={val.em_no}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(EmployeeSelect)
