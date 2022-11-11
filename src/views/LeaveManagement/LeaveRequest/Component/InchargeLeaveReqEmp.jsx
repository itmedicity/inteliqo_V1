import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const InchargeLeaveReqEmp = ({ inchargedeptSec, hoddeptSec, name, style, onChange }) => {
    const [emp, setemp] = useState([])
    useEffect(() => {
        const getEmployee = async () => {

            if (inchargedeptSec.length !== 0) {
                const deptsec = inchargedeptSec && inchargedeptSec.map((val) => {
                    return val.dept_section
                })
                const result = await axioslogin.post('/common/getsecEmp', deptsec)
                const { success, data } = result.data
                if (success === 1) {
                    setemp(data)
                }
            }
            else if (hoddeptSec.length !== 0) {
                const deptsec1 = hoddeptSec && hoddeptSec.map((val) => {
                    return val.dept_section
                })
                const result = await axioslogin.post('/common/getsecEmp', deptsec1)
                const { success, data } = result.data
                if (success === 1) {
                    setemp(data)
                }
            }

        }
        getEmployee()
    }, [inchargedeptSec, hoddeptSec])

    console.log(emp)

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value={0} >
                        Select Employee
                    </MenuItem>
                    {
                        emp && emp.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default InchargeLeaveReqEmp