import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'

const EmployeeNameSelect = (props) => {
    console.log('fgfg')
    const [employeeName, setEmployeeName] = useState([])
    const { selectEmpName, updateSelectEmpName, selectDeptSection, selectedDept } = useContext(PayrolMasterContext)
    console.log(selectDeptSection)
    // Get Employee Details
    useEffect(() => {
        console.log(selectDeptSection)
        if (selectDeptSection !== 0 && selectedDept !== 0) {
            const postData = {
                em_dept_section: selectDeptSection,
                em_department: selectedDept
            }
            const fetchEmploye = async () => {
                const result = await axioslogin.post('/empmast/getempName', postData)
                console.log(result)
                const { data } = result.data;
                setEmployeeName(data)
            }
            fetchEmploye()
            return (
                updateSelectEmpName(0)
            )
        }
    }, [updateSelectEmpName, selectDeptSection, selectedDept])
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
                    name="selectEmpName"
                    value={selectEmpName}
                    onChange={(e) => updateSelectEmpName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-2"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Select Employee Name
                    </MenuItem>
                    {
                        employeeName && employeeName.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default EmployeeNameSelect
