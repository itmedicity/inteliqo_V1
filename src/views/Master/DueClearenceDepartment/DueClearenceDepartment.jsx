import { Box, Button,  Tooltip } from '@mui/joy';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { memo, Suspense, useCallback, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DeptSecSelectAuth from 'src/views/CommonCode/DeptSecSelectAuth';
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment';
import JoyDepartmentSection from 'src/views/MuiComponents/JoyComponent/JoyDepartmentSection';
import MasterLayout from '../MasterComponents/MasterLayout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { setDepartment } from 'src/redux/actions/Department.action';
import { useDispatch } from 'react-redux';
import { employeeIdNumber } from 'src/views/Constant/Constant';

const DueClearenceDepartment = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [count, setCount] = useState(0)
    const [arraydata, arraydataset] = useState([])
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)
    const [dept, setDept] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [duedept, setDueDept] = useState(0)
    const [deptname, setDeptname] = useState('')

    const getDepartmentdata = useCallback(() => {
        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            deptcode: duedept,
            deptdesc: deptname
        }
        if (arraydata.some(key => key.deptcode === duedept)) {
            warningNofity("Department Already Added!!")
        }
        else {
            const newdatas = [...arraydata, newdata]
            arraydataset(newdatas)
        }
    }, [arraydata, duedept, deptname])

    //removing table data
    const onClickdelete = useCallback((checkid) => {
        const newdata = [...arraydata]
        const index = arraydata.findIndex((arraid) => arraid.id === checkid)
        newdata.splice(index, 1);
        arraydataset(newdata)
    }, [arraydata])

    const postData = useMemo(() => {
        return {
            dept_id: dept,
            sect_id: deptSect,
            due_dept_code: arraydata,
            updated_user: employeeIdNumber()
        }
    }, [dept, deptSect, arraydata])

    const patchData = useMemo(() => {
        return {
            dept_id: dept,
            sect_id: deptSect,
            due_dept_code: arraydata,
            updated_user: employeeIdNumber(),
            due_dept_slno: slno
        }
    }, [dept, deptSect, arraydata, slno])

    const submitFormData = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/Duedepartment', patchData)
            const { success, message } = result.data
            if (success === 2) {
                setFlag(0)
                succesNofity(message)
                setCount(count + 1)
                setDept(0)
                setDeptSect(0)
                setDueDept(0)
                setDeptname('')
                arraydataset([])
                setSlno(0)
            }
            else {
                errorNofity(message)
            }
        } else {
            const result = await axioslogin.post('/Duedepartment', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setCount(count + 1)
                setDept(0)
                setDeptSect(0)
                setDueDept(0)
                setDeptname('')
                arraydataset([])
            }
            else if (success === 7) {
                errorNofity(message)
            } else {
                errorNofity(message)
            }
        }
    }, [postData, flag, patchData, count])

    useEffect(() => {
        //get table Data
        const getTableData = async () => {
            const results = await axioslogin.get("/Duedepartment/select")
            const { success, data } = results.data
            if (success === 1) {
                setTableData(data)
            } else {
                setTableData([])
            }
        }
        getTableData()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'due_dept_slno' },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 150 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 150 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { due_dept_slno, dept_id, sect_id, due_dept_code } = params.data
        const depts = JSON.parse(due_dept_code)
        setDept(dept_id)
        setDeptSect(sect_id)
        arraydataset(depts)
        setSlno(due_dept_slno)
    }, [])

    return (
        <MasterLayout title={"Due Clearence Department"} displayClose={true}>
            <Box sx={{ width: "100%" }} >
                <Paper variant='outlined' square sx={{ width: '100%', display: 'flex', py: 2, px: 0.5 }} >
                    <Box sx={{
                        width: "100%", px: 1, mt: 0.5, display: 'flex', flexDirection: 'column',
                    }}>
                        <Box sx={{ flex: 1 }}>
                            <JoyDepartment deptValue={dept} getDept={setDept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5 }}>
                            <JoyDepartmentSection sectValues={deptSect} getSection={setDeptSect} />
                        </Box>
                        <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row', mt: 0.5 }}>
                            <Box sx={{ flex: 1, pr: 0.3 }}>
                                <DeptSecSelectAuth sectValue={duedept} getDeptSection={setDueDept} setDeptname={setDeptname} />
                            </Box>
                                <Tooltip title="Add" followCursor placement='top' arrow >
                                    <Button aria-label="Like" variant="outlined" color="primary"
                                        onClick={getDepartmentdata} sx={{
                                            color: '#90caf9'
                                        }} >
                                        <AddCircleOutlineIcon />
                                    </Button>
                                </Tooltip>
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <Tooltip title="Save" followCursor placement='top' arrow >
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="md"
                                        color="primary"
                                        onClick={submitFormData}
                                    >
                                        <SaveIcon />
                                    </Button>
                            </Tooltip>
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5 }}></Box>
                        <Box sx={{ flex: 1, mt: 0.5 }}></Box>
                        <Box sx={{ flex: 1, mt: 0.5 }}></Box>
                    </Box>
                    <Box sx={{ width: "100%", px: 1, mt: 0.5, display: 'flex', flexDirection: 'row', }}>
                        <TableContainer sx={{}}>
                            <Table size="small" stickyHeader aria-label="sticky table" sx={{ border: '1px solid #e0e0e0' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }} >  Dept Code </TableCell>
                                        <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }} > Clearence Department</TableCell>
                                        <TableCell size='medium' padding='none' align="right" rowSpan={2} sx={{ fontWeight: 550 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <Suspense>
                                        {

                                            arraydata?.map((val, index) => {
                                                return <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{val.deptcode}</TableCell>
                                                    <TableCell align="center">{val.deptdesc}</TableCell>
                                                    <TableCell align="center">
                                                        {/* <BiPlusCircle size={24} color="success" /> */}
                                                        <IconButton aria-label="add" style={{ padding: "0rem" }}
                                                            onClick={(e) => onClickdelete(val.id)}
                                                        >
                                                            <DeleteIcon color="success" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            })
                                        }
                                    </Suspense>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                </Paper>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 400,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </Box>
        </MasterLayout>
    )
};

export default memo(DueClearenceDepartment) 
