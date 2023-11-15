import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'

const EmpNameDepartmentSec = (props) => {
    const [employeeName, setEmployeeName] = useState([])
    const { selectDeptSec, selectEmpDeptSec,
        updateselectEmpDeptSec } = useContext(PayrolMasterContext)

    // Get Employee Details
    useEffect(() => {
        if (selectDeptSec !== 0) {
            const fetchEmploye = async () => {
                const result = await axioslogin.get(`/section/deptsec/emp/${selectDeptSec}`)
                const { data } = result.data;
                setEmployeeName(data)
            }
            fetchEmploye()

        }
    }, [updateselectEmpDeptSec, selectDeptSec])
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
                    name="selectEmpDeptSec"
                    value={selectEmpDeptSec}
                    onChange={(e) => updateselectEmpDeptSec(e.target.value)}
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
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}({val.em_no})</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default EmpNameDepartmentSec