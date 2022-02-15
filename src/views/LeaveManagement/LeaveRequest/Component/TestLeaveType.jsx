import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';

const TestLeaveType = ({ name, select, style, onChange }) => {
    const { employeedetails, updateemployeedetails } = useContext(PayrolMasterContext)
    const { dept_name, desg_name, em_department, em_dept_section, em_designation, em_id, em_name, em_no, sect_name } = employeedetails
    const [leaveType, setLeaveType] = useState([]);
    //  data based on employeee category
    const [leavestate, setleavestate] = useState({
        ecat_cl: 0,
        ecat_confere: 0,
        ecat_cont: 0,
        ecat_doff_allow: 0,
        ecat_el: 0,
        ecat_esi_allow: 0,
        ecat_fh: 0,
        ecat_lop: 0,
        ecat_mate: 0,
        ecat_nh: 0,
        ecat_prob: 0,
        ecat_woff_allow: 0,
        ecat_sl: 0,
        em_category: 0
    })

    const { ecat_cl, ecat_el, ecat_esi_allow,
        ecat_lop, ecat_mate, ecat_nh, ecat_sl, em_category
    } = leavestate

    // get id and number of logged user
    const { id, no } = useParams()
    useEffect(() => {
        const getleaveTypeData = async () => {
            const result = await axioslogin.get('/leaveType/select')
            const { success, data } = result.data
            if (success === 1) {
                setLeaveType(data)
            }
        }
        getleaveTypeData();
        // get current data allowed  leave based on category
        const getcategorydata = async () => {
            const result = await axioslogin.get(`/common/getannprocess/${em_id}`)
            const { data } = result.data
            setleavestate(data[0])
        }
        getcategorydata();
    }, [no])

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={name}
                    onChange={onChange}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                >
                    <MenuItem value='0' disabled>
                        Select Leave Type
                    </MenuItem>
                    {
                        leaveType && leaveType.map((val, index) => {
                            return <MenuItem key={index}
                                value={val.lvetype_slno} disabled={(val.lvetype_slno === 1 && ecat_cl === 0)
                                    || (val.lvetype_slno === 8 && ecat_el === 0)
                                    || (val.lvetype_slno === 6 && ecat_esi_allow === 0)
                                    || (val.lvetype_slno === 5 && ecat_lop === 0)
                                    || (val.lvetype_slno === 2 && ecat_mate === 0)
                                    || (val.lvetype_slno === 3 && ecat_nh === 0)
                                    || (val.lvetype_slno === 7 && ecat_sl === 0)
                                    ? true : null}
                            >{val.lvetype_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default TestLeaveType
