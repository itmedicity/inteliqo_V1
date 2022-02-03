import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useContext, useEffect } from 'react'
import { PayrolMasterContext } from "src/Context/MasterContext";
import { axioslogin } from "src/views/Axios/Axios";

const HodSections = ({ name, select, style, onChange, DeptSect, updateDeptSect }) => {
    const { employeedetails, authorization } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const { is_hod } = authorization
    //use effect for hod departmemt sect
    useEffect(() => {
        if (is_hod === 1) {
            const getHODdeptSect = async () => {
                const result = await axioslogin.get(`/common/hoddeptSect/${em_id}`)
                const { success, data } = result.data
                if (success === 1) {
                    updateDeptSect(data)
                }
            }
            getHODdeptSect()
        }
    }, [is_hod, em_id])
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
                        All Department Section
                    </MenuItem>
                    {
                        DeptSect && DeptSect.map((val, index) => {
                            return <MenuItem key={index} value={val.dept_section}>{val.sect_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
};

export default HodSections;
