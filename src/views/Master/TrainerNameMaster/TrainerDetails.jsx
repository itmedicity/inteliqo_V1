import { Button, CssVarsProvider, IconButton, Tooltip } from '@mui/joy';
import { Box, Paper } from '@mui/material'
import React, { memo, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SaveIcon from '@mui/icons-material/Save';
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { Fragment } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import CustomSettingsLayout from 'src/views/Component/MuiCustomComponent/CustomSettingsLayout';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const TrainerDetails = () => {
    const [desSelect, setdesSelect] = useState('');
    const [depttype, setdepttype] = useState('');
    const [empSelect, setempSelect] = useState('');
    const [deptSec, setDeptSec] = useState('');
    const [count, setCount] = useState(0);
    const [tableData, setTabledata] = useState([]);
    const [Emno, setEmno] = useState('');
    const [view, setView] = useState(0);
    const [Emp_no, setEmp_no] = useState('');
    const [displyData, setDisplaydata] = useState([]);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    //Delete
    const DeleteRow = useCallback((params) => {
        const data = params.api.getSelectedRows()
        const { trainer_slno } = data[0]
        const id = trainer_slno;
        const PatchData = {
            trainer_slno: trainer_slno
        }
        if (id !== 0) {
            const dataDelete = async () => {
                const result = await axioslogin.patch(`/TrainerName/delete`, PatchData)
                const { message, success } = result.data
                if (success === 2) {
                    succesNofity(message)
                    setCount(count + 1);
                }
                else {
                    warningNofity(message)
                }
            }
            dataDelete()
        }
    }, [count])

    const ShowDetails = useCallback(async () => {
        if (Emno !== '') {
            const result = await axioslogin.get(`/TrainerName/gettrainerDetails/${Emno}`)
            const { data, message, success } = result.data
            if (success === 2) {
                const { em_no, em_name, dept_name, sect_name, desg_name } = data[0];
                setdesSelect(desg_name)
                setdepttype(dept_name)
                setempSelect(em_name)
                setDeptSec(sect_name)
                setEmp_no(em_no)
                setDisplaydata(data);
                setView(1)
                setEmno('')
            }
            else {
                setDisplaydata([])
                setView(0)
                setEmno('')
                warningNofity(message)
            }
        }
        else {
            warningNofity("Please Enter Employee ID")
        }
    }, [Emno])

    //views
    useEffect(() => {
        const DataTable = async () => {
            const result = await axioslogin.get('/TrainerName/select')
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data.map((val) => {
                    const obj = {
                        trainer_slno: val.trainer_slno,
                        slno: val.slno,
                        desg_slno: val.desg_slno,
                        desg_name: val.desg_name,
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        em_id: val.em_id,
                        em_name: val.em_name,
                        em_no: val.em_no,
                        sec_id: val.sec_id,
                        sect_name: val.sect_name,
                        trainer_status: val.trainer_status,
                        statusdesc: val.trainer_status === 0 ? "NO" : "YES",
                        auth_post: val.auth_post,
                        emp_post: val.auth_post === 1 ? "HOD" : val.auth_post === 2 ? "INCHARGE" : val.auth_post === null ? "STAFF" : null,
                    }
                    return obj;
                })
                setTabledata(viewData);
                setCount(0)
            } else {
                setTabledata([]);
            }
        }
        DataTable()
    }, [count])

    const submitTrainerName = useCallback(() => {
        const InsertData = async (postData) => {

            if (Emno !== 0) {
                const result = await axioslogin.post('/TrainerName/inserttrainers', postData)
                const { message, success } = result.data
                if (success === 1) {
                    setCount(count + 1)
                    succesNofity(message)
                    setView(0)
                }
                else {
                    warningNofity(message)
                    setView(0)
                }
            }
            else {
                warningNofity("Please Enter the Employee ID")
            }
        }
        const { employee_id, dept_id, desg_slno } = displyData[0]
        const postData = {
            trainer_name: employee_id,
            trainer_dept: dept_id,
            trainer_desig: desg_slno,
            trainer_status: 1,
            create_user: em_id,
        }
        InsertData(postData)
    }, [count, Emno, displyData, em_id, setView])

    //column def
    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'slno', filter: true, width: 200 },
        { headerName: 'Emp ID', field: 'em_no', filter: true, width: 200 },
        { headerName: 'Trainer Name', field: 'em_name', filter: true, width: 250 },
        { headerName: 'Trainer Department ', field: 'dept_name', filter: true, minWidth: 250 },
        { headerName: 'Trainer Designation', field: 'desg_name', filter: true, minWidth: 250 },
        { headerName: 'Emp_post ', field: 'emp_post', filter: true, width: 200 },
        { headerName: 'Status ', field: 'statusdesc', filter: true, width: 200 },
        {
            headerName: 'Delete', cellRenderer: params =>
                <Fragment>
                    <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => DeleteRow(params)}
                    >
                        <DeleteIcon color='primary' />
                    </IconButton>
                </Fragment>
        },
    ])

    return (
        <CustomSettingsLayout title="Trainer Name Master" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }}>
                <Paper>
                    <Paper sx={{ p: 1 }}>
                        <Box sx={{ flex: 1, display: "flex", flexDirection: "row", gap: 1 }}>
                            <Box sx={{ width: "30%" }}>
                                <JoyInput
                                    size="sm"
                                    value={Emno}
                                    onchange={setEmno}
                                    name="Employee_ID"
                                    placeholder="ENTER TRAINER ID"
                                />
                            </Box>
                            <Box sx={{ mt: 0.4 }}>
                                <CssVarsProvider>
                                    <IconButton sx={{ p: 0.5 }} variant="outlined" size='s' color="primary" onClick={ShowDetails}>
                                        <PublishedWithChangesIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        {
                            view === 1 ?

                                <Box sx={{ display: "flex", flexDirection: "row", mt: 1, gap: 1 }}>
                                    <Tooltip title="Emp ID ">
                                        <Box>
                                            <JoyInput
                                                size="sm"
                                                value={Emp_no}
                                                name="Employee_No"
                                                disabled={true}
                                            />
                                        </Box>
                                    </Tooltip>
                                    <Tooltip title="Trainer Name ">
                                        <Box sx={{ flex: 1 }}>
                                            <JoyInput
                                                size="sm"
                                                value={empSelect}
                                                name="Employee_Name"
                                                disabled={true}
                                            />
                                        </Box>
                                    </Tooltip>
                                    <Tooltip title="Designation ">
                                        <Box sx={{ flex: 1 }}>
                                            <JoyInput
                                                size="sm"
                                                value={desSelect}
                                                name="designation"
                                                disabled={true}
                                            />
                                        </Box>
                                    </Tooltip>
                                    <Tooltip title="Department ">
                                        <Box sx={{ flex: 1 }}>
                                            <JoyInput
                                                size="sm"
                                                value={depttype}
                                                name="dept_name"
                                                disabled={true}
                                            />
                                        </Box>
                                    </Tooltip>

                                    <Tooltip title="Department Section">
                                        <Box sx={{ flex: 1 }}>
                                            <JoyInput
                                                size="sm"
                                                value={deptSec}
                                                name="sec_name"
                                                disabled={true}
                                            />
                                        </Box>
                                    </Tooltip>

                                    <Tooltip title="Save">
                                        <Box sx={{ px: 0.5, }}>
                                            <CssVarsProvider>
                                                <Button
                                                    variant="outlined"
                                                    component="label"
                                                    size="md"
                                                    color="primary"
                                                    onClick={submitTrainerName}
                                                >
                                                    <SaveIcon />
                                                </Button>
                                            </CssVarsProvider>
                                        </Box>
                                    </Tooltip>

                                </Box>
                                : null}
                        <Paper sx={{ mt: 2 }}>
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tableData}
                                sx={{
                                    height: 500,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Paper>
                    </Paper>
                </Paper>
            </Box>
        </CustomSettingsLayout >
    )
}

export default memo(TrainerDetails)


