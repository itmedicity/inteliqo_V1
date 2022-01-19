import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'

const EmpNameSelectDeptSec = (props) => {
    const [empname, setempname] = useState([])
    const { selectempName, updateEmpName, selectDeptSec } = useContext(PayrolMasterContext)
    // Get Employee Details
    useEffect(() => {
        const getEmployeeName = async () => {
            const result = await axioslogin.get(`/common/getEmpName/${selectDeptSec}`)
            const { data } = result.data;
            setempname(data)
        }
        getEmployeeName()
        return (
            updateEmpName(0)
        )
    }, [updateEmpName, selectDeptSec])
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
                    name="selectempName"
                    value={selectempName}
                    onChange={(e) => updateEmpName(e.target.value)}
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
                        empname && empname.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(EmpNameSelectDeptSec)
