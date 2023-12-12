import { Button, CssVarsProvider, } from '@mui/joy'
import { Box, IconButton, Tooltip } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { axioslogin } from 'src/views/Axios/Axios';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EarnDeductionModel from './EarnDeductionModel';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { setDepartment } from 'src/redux/actions/Department.action';
import { useDispatch } from 'react-redux';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const EarningsDeduction = () => {

    const dispatch = useDispatch()
    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [Empno, setEmpNo] = useState('')
    const [nameList, setnameList] = useState([])
    const [model, setModel] = useState(0)
    const [open, setOpen] = useState(false)
    const [empId, setEmpId] = useState(0)
    const [newEmp, setNewEmp] = useState(true)
    const [recomendeSalary, setRecomendSalary] = useState(0)

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

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

    const dataDisplay = useCallback(async () => {
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
    }, [Empno, dept, deptSection])

    const toOpenModel = useCallback(async (params) => {
        const data = params.api.getSelectedRows()
        const { em_id, em_no, recomend_salary } = data[0]
        setEmpId(em_id)
        setEmpNo(em_no)
        setRecomendSalary(recomend_salary)
        setModel(1)
        setOpen(true)
    }, [])

    const [columnDef] = useState([
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton onClick={() => toOpenModel(params)}
                    sx={{ paddingY: 0.5 }} >
                    <Tooltip title="View">
                        <CheckCircleOutlineIcon color='primary' />
                    </Tooltip>
                </IconButton>
        },
        { headerName: 'Emp No', field: 'em_no', minWidth: 90 },
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
                            <DepartmentDropRedx getDept={setDept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }} >
                            <DepartmentSectionRedx getSection={setDeptSection} />
                        </Box>
                        <Tooltip title="Employee Number" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Employee Number"
                                    name="Empno"
                                    value={Empno}
                                    onchange={(e) => setEmpNo(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ flex: 1, mt: 1.5, px: 0.3, ml: 2 }}>
                            <JoyCheckbox
                                label='New Employees'
                                name="newEmp"
                                checked={newEmp}
                                onchange={(e) => { updateNewEmp(e) }}
                            />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.3 }}>
                            <CssVarsProvider>
                                <Button aria-label="Like" variant="outlined" color="neutral"
                                    onClick={dataDisplay}
                                    sx={{
                                        color: '#81c784'
                                    }}>
                                    <PublishedWithChangesIcon />
                                </Button>
                            </CssVarsProvider>
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

                    </Box>
                </Box>
            </CustomLayout>
        </Fragment>
    )
}

export default memo(EarningsDeduction)