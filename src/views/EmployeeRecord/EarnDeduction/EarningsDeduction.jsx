import { Button, } from '@mui/joy'
import { Box, IconButton, TextField, FormControlLabel, Checkbox, Tooltip } from '@mui/material'
import React, { Fragment, memo, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux';
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux';
import { axioslogin } from 'src/views/Axios/Axios';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EarnDeductionModel from './EarnDeductionModel';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

const EarningsDeduction = () => {

    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [Empno, setEmpNo] = useState('')
    const [nameList, setnameList] = useState([])
    const [model, setModel] = useState(0)
    const [open, setOpen] = useState(false)
    const [empId, setEmpId] = useState(0)
    const [newEmp, setNewEmp] = useState(true)
    const [recomendeSalary, setRecomendSalary] = useState(0)
    const getEmpNO = async (e) => {
        setEmpNo(e.target.value)
    }

    const updateNewEmp = (e) => {
        if (e.target.checked === true) {
            setNewEmp(true)
        } else {
            setNewEmp(false)
        }
    }

    useEffect(() => {
        const getdata = async () => {
            const result = await axioslogin.get('/empearndeduction/newRecommended/allEmp')
            const { success, data } = result.data
            if (success === 1) {
                setnameList(data);
            } else {
                setnameList([]);
            }
        }
        if (dept === 0 && deptSection === 0 && Empno === '' && newEmp === true) {
            getdata()
        }
        else if (dept !== 0 && deptSection !== 0) {
            setNewEmp(false)
            setnameList([]);
        }
        else if (dept !== 0 && deptSection !== 0 && Empno !== '') {
            setNewEmp(false)
            setnameList([]);
        }
        else if (Empno !== '') {
            setNewEmp(false)
            setnameList([]);
        }


    }, [dept, deptSection, Empno, newEmp])
    const dataDisplay = async () => {


        if (dept !== 0 && deptSection !== 0 && Empno === '') {
            const postData = {
                em_department: dept,
                em_dept_section: deptSection
            }
            const result = await axioslogin.post("/plan/create", postData);
            const { success, data } = result.data
            if (success === 1) {
                setnameList(data);
            } else {
                setnameList([]);
            }

        } else if (dept !== 0 && deptSection !== 0 && Empno !== '') {
            const checkid = {
                em_no: Empno,
                em_department: dept,
                em_dept_section: deptSection
            }
            const result = await axioslogin.post('/empearndeduction/all/data', checkid)
            const { success, data } = result.data;
            if (success === 1) {
                setnameList(data);
            } else {
                infoNofity("No employee exist with this employee number!!")
                setnameList([]);
            }
        } else {
            const result = await axioslogin.get(`/empearndeduction/getAll/${Empno}`)
            const { data, success } = result.data;
            if (success === 1) {
                setnameList(data);
            } else {
                infoNofity("No employee exist with this employee number!!")
                setnameList([]);
            }

        }
    }

    const toOpenModel = async (params) => {
        const data = params.api.getSelectedRows()
        const { em_id, em_no, recomend_salary } = data[0]
        setEmpId(em_id)
        setEmpNo(em_no)
        setRecomendSalary(recomend_salary)
        setModel(1)
        setOpen(true)
    }

    const [columnDef] = useState([
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton onClick={() => toOpenModel(params)}
                    sx={{ paddingY: 0.5 }} >
                    <Tooltip title="View">
                        <CheckCircleOutlineIcon color='primary' />
                    </Tooltip>
                </IconButton>
            // <Fragment>
            //     <CheckCircleOutlineIcon onClick={() => toOpenModel(params)} color='primary' />
            // </Fragment>
        },
        { headerName: 'Emp No', field: 'em_no', minWidth: 90 },
        // { headerName: 'Emp Id', field: 'em_id', minWidth: 90 },
        { headerName: 'Employee Name', field: 'em_name' },
        { headerName: 'Department', field: 'dept_name' },
        { headerName: 'Department Section', field: 'sect_name' },

    ])

    return (
        <Fragment>
            <ToastContainer />
            {
                model === 1 ? <EarnDeductionModel
                    open={open}
                    setOpen={setOpen}
                    heading='Employee earn Deduction'
                    Empno={Empno}
                    empId={empId}
                    recomendeSalary={recomendeSalary}
                    setEmpNo={setEmpNo}
                    setModel={setModel}
                /> : null
            }
            <CustomLayout title="Earnings/Deduction" displayClose={true} >
                <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }} >
                            <DeptSelectByRedux setValue={setDept} value={dept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }} >
                            <DeptSecSelectByRedux dept={dept} setValue={setDeptSection} value={deptSection} />
                        </Box>
                        <Tooltip title="Employee Number" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                                <TextField fullWidth
                                    id="fullWidth" size="small"
                                    onChange={getEmpNO}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, ml: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        color="secondary"
                                        name="newEmp"
                                        value={newEmp}
                                        checked={newEmp}
                                        className="ml-2"
                                        onChange={(e) => { updateNewEmp(e) }}
                                    />
                                }
                                label="New Employees"
                            />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.3 }}>
                            <Button aria-label="Like" variant="outlined" color="neutral"
                                onClick={dataDisplay}
                                sx={{
                                    color: '#81c784'
                                }}>
                                <PublishedWithChangesIcon />
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", pt: 1, width: "100%" }}>

                        {
                            newEmp === true ?
                                <CommonAgGrid
                                    columnDefs={columnDef}
                                    tableData={nameList}
                                    sx={{
                                        height: 600,
                                        width: "100%"
                                    }}
                                    rowHeight={30}
                                    headerHeight={30} />
                                :
                                <CommonAgGrid
                                    columnDefs={columnDef}
                                    tableData={nameList}
                                    sx={{
                                        height: 600,
                                        width: "100%"
                                    }}
                                    rowHeight={30}
                                    headerHeight={30} />

                        }


                        {/* <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={nameList}
                            sx={{
                                height: 600,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30} /> */}

                    </Box>
                </Box>
            </CustomLayout>
        </Fragment>
    )
}

export default memo(EarningsDeduction)