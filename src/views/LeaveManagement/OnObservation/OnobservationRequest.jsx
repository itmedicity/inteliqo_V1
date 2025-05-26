import { Box, Button, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { Paper } from '@mui/material';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton as OpenIcon } from '@mui/material';
import ObservationModal from './ObservationModal';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import ViewListIcon from '@mui/icons-material/ViewList';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteModal = React.lazy(() => import('./DeleteModal'))

const OnobservationRequest = () => {
    const [department, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [tableData, setTableData] = useState([])
    const [open, setOpen] = useState(false)
    const [empdata, setEmpdata] = useState([])
    const [viewData, setViewData] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [employeeData, setEmployeeData] = useState({})
    const [show, setShow] = useState(0)

    const dispatch = useDispatch();

    // dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
        dispatch(setCommonSetting());
    }, [dispatch])



    const getEmployeeList = useCallback(async () => {
        if (department !== 0 && deptSection !== 0) {
            setShow(2)
        } else {
            setShow(1)
        }

    }, [department, deptSection])



    useEffect(() => {
        const showdateWiseList = async () => {
            const postData = {
                fromDate: format(new Date(fromDate), 'yyyy-MM-dd'),
                toDate: format(new Date(toDate), 'yyyy-MM-dd'),
            }
            const empData = await axioslogin.post("/OnObservationRequest/employee/list/", postData);
            const { success, data } = empData.data;
            if (success === 1) {
                setTableData(data)
                setShow(0)
            } else {
                warningNofity("No new joinees between the dates!!.")
                setTableData([])
            }
        }
        const showDeptWise = async () => {
            const getData = {
                fromDate: format(new Date(fromDate), 'yyyy-MM-dd'),
                toDate: format(new Date(toDate), 'yyyy-MM-dd'),
                em_department: department,
                em_dept_section: deptSection
            }
            const empData = await axioslogin.post("/OnObservationRequest/deptlist", getData);
            const { success, data } = empData.data;
            if (success === 1) {
                setTableData(data)
                setShow(0)
            } else {
                warningNofity("There is no new joinees under this department!")
                setTableData([])
            }
        }
        if (show === 1) {
            showdateWiseList()
        } else if (show === 2) {
            showDeptWise()
        }
    }, [fromDate, toDate, show, department, deptSection])


    const [columnDef] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 150, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Date of joining', field: 'em_doj', minWidth: 90 },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 250 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 250 },
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params =>
                <Tooltip title="Profile View" followCursor placement='top' arrow >
                    <OpenIcon size='sm' color='primary' onClick={() => getEmployeeData(params)}>
                        <CheckCircleIcon />
                    </OpenIcon>
                </Tooltip>
        }
    ])

    const getEmployeeData = useCallback(async (params) => {
        setEmpdata(params.data);
        setOpen(true)

    }, [])

    const tableView = useCallback(async () => {
        const empData = await axioslogin.get("/OnObservationRequest/getall");
        const { success, data } = empData.data;
        if (success === 1) {
            setTableData(data)
            setViewData(true)
        } else {
            setViewData(false)
            setTableData([])
        }
    }, [])

    const [columnView] = useState([
        { headerName: 'Emp ID', field: 'em_no', minWidth: 150, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Date of joining', field: 'em_doj', minWidth: 90 },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 250 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 250 },
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params =>
                <Tooltip title="Profile View" followCursor placement='top' arrow >
                    <OpenIcon size='sm' color='primary' onClick={() => DeleteData(params)}>
                        <DeleteIcon />
                    </OpenIcon>
                </Tooltip>
        }
    ])

    const DeleteData = useCallback((params) => {
        setDeleteOpen(true)
        setEmployeeData(params.data)
    }, [])

    return (
        <CustomLayout title="On Observation Request" displayClose={true} >
            <DeleteModal open={deleteOpen} setOpen={setDeleteOpen} empdata={employeeData} />
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', px: 0.5 }} >
                        <DepartmentDropRedx getDept={setDept} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, px: 0.5 }, flexDirection: 'row' }} >
                        <DepartmentSectionRedx getSection={setDeptSection} />
                    </Box>
                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >From Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                inputFormat="dd-MM-yyyy"
                                value={fromDate}
                                size="small"
                                onChange={(newValue) => setFromDate(newValue)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} size='sm' disabled={true} color='primary' variant='outlined' />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                        <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >To Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                inputFormat="dd-MM-yyyy"
                                // maxDate={endOfMonth(new Date(fromDate))}
                                value={toDate}
                                size="small"
                                onChange={(newValue) => setToDate(newValue)}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} size='sm' disabled={true} color='primary' />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.3, }} >
                        <Tooltip title="Search" followCursor placement='top' arrow variant='outlined' color='success'>
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="success"
                                onClick={getEmployeeList}
                                size='sm'
                                endDecorator={<Box>Search</Box>}
                            >
                                <SearchIcon />
                            </Button>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: "flex", px: 0.3, }} >
                        <Tooltip title="Click Here to View Table" followCursor placement='top' arrow variant='outlined' color='primary' >
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={tableView}
                                size='sm'
                                endDecorator={<Box>View</Box>}
                            >
                                <ViewListIcon fontSize='medium' />
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={viewData === true ? columnView : columnDef}
                        tableData={tableData}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={40}
                        headerHeight={40}
                    />
                </Paper>
            </Box>
            <ObservationModal open={open} setOpen={setOpen} empdata={empdata} setShow={setShow} />
        </CustomLayout>
    )
}

export default memo(OnobservationRequest) 