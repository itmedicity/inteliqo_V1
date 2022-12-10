import { Checkbox, FormControlLabel } from '@material-ui/core'
import React, { Fragment, memo, useCallback, useContext, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import { useHistory } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
// import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { setEmployeeList } from '../../../redux/actions/Profile.action'
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Actiontypes } from 'src/redux/constants/action.type'
import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper, Tooltip } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const EmployeeFileAgGrid = () => {

    //const classes = useStyles()
    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch()

    const employeeRecordList = useSelector((state) => {
        return state.getEmployeeRecordList.empRecordData;
    })

    useEffect(() => {
        // set the table data from reducx store to material table data
        if (Object.keys(employeeRecordList).length > 0) {
            setTableData(employeeRecordList)
        }
    }, [employeeRecordList])

    const {
        selectedDept,
        selectDeptSection,
        selectBranchMast,
    } = useContext(PayrolMasterContext)

    const postData = {
        dept_id: selectedDept,
        sect_id: selectDeptSection,
        //branch_slno: selectBranchMast
    }
    // const postDataBranch = {
    //     branch_slno: selectBranchMast
    // }
    const postDataDept = {
        //branch_slno: selectBranchMast,
        dept_id: selectedDept,
    }
    const [active, updateactive] = useState({
        activestatus: true
    })
    const { activestatus } = active
    const updateFormData = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        updateactive({ ...active, [e.target.name]: value })
    }

    // Employee Record List
    const getEmployeeList = useCallback((e) => {
        e.preventDefault()
        const submitfunc = async () => {
            if (selectedDept !== 0 && selectDeptSection !== 0 && activestatus === true) {
                const result = await axioslogin.post('/empmast/getEmpDet', postData)
                const { success, data, message } = result.data
                if (success === 1) {
                    setTableData(data)
                    dispatch(setEmployeeList(data))
                }
                else {
                    warningNofity(message)
                }
            }
            else if (selectedDept !== 0 && selectDeptSection === 0 && activestatus === true) {
                const result = await axioslogin.post('/empmast/empmaster/getdeptByDept', postDataDept)
                const { success, data, message } = result.data
                if (success === 1) {
                    setTableData(data)
                    dispatch(setEmployeeList(data))
                }
                else {
                    warningNofity(message)
                }
            }
            else if (selectedDept !== 0 && selectDeptSection !== 0 && activestatus === false) {
                const result = await axioslogin.post('/empmast/getEmpDetInactive', postData)
                const { success, data, message } = result.data
                if (success === 1) {
                    setTableData(data)
                    dispatch(setEmployeeList(data))
                }
                else {
                    warningNofity(message)
                }
            }
            else {
                warningNofity("Choose All Option")
            }
        }
        submitfunc()
    }, [postDataDept, postData])

    // if (selectedDept !== 0 && selectDeptSection !== 0 && selectBranchMast !== 0 && activestatus === true) {
    //     const result = await axioslogin.post('/empmast/getEmpDet', postData)
    //     const { success, data } = result.data
    //     if (success === 1) {
    //         setTableData(data)
    //         dispatch(setEmployeeList(data))
    //     }
    // } else if (selectedDept !== 0 && selectDeptSection !== 0 && selectBranchMast !== 0 && activestatus === false) {
    //     const result = await axioslogin.post('/empmast/getEmpDetInactive', postData)
    //     const { success, data } = result.data
    //     if (success === 1) {
    //         setTableData(data)
    //         dispatch(setEmployeeList(data))
    //     }
    // }
    // else if (selectedDept === 0 && selectDeptSection === 0 && selectBranchMast !== 0 && activestatus === true) {
    //     const result = await axioslogin.post('/empmast/empmaster/getdeptByBranch', postDataBranch)
    //     const { success, data } = result.data
    //     if (success === 1) {
    //         setTableData(data)
    //         dispatch(setEmployeeList(data))
    //     }
    // }
    // else if (selectedDept !== 0 && selectDeptSection === 0 && selectBranchMast !== 0 && activestatus === true) {
    //     const result = await axioslogin.post('/empmast/empmaster/getdeptByDept', postDataDept)
    //     const { success, data } = result.data
    //     if (success === 1) {
    //         setTableData(data)
    //         dispatch(setEmployeeList(data))
    //     }
    // }
    // else {
    //     warningNofity("Choose All Option")
    // }


    const toSettings = () => {
        dispatch({ type: Actiontypes.FETCH_EMP_RECORD_LIST, payload: [] })
        history.push('/Home')
    }

    // Route to Empl Record
    const getEmployeeEmpNumber = (params) => {
        const data = params.api.getSelectedRows()
        const { em_no, em_id } = data[0]
        //history.push(`/Home/Profile/${em_no}/${em_id}`)
        history.push(`/Home/Prfle/${em_no}/${em_id}/${0}`)
    }

    const [columnDef] = useState([
        {
            headerName: 'Action', minWidth: 100, wrapText: true,
            cellRenderer: params =>
                <Tooltip title="Profile View" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 1 }} onClick={() => getEmployeeEmpNumber(params)}>
                        <AccountCircleOutlinedIcon color='primary' />
                    </IconButton>
                </Tooltip>
        },
        { headerName: 'Emp No', field: 'em_no', minWidth: 90, },
        { headerName: 'Emp Id ', field: 'em_id', minWidth: 90 },
        { headerName: 'Name', field: 'emp_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Gender', field: 'gender', minWidth: 90 },
        { headerName: 'Age', field: 'em_age_year', minWidth: 90 },
        { headerName: 'DOJ', field: 'em_doj', minWidth: 90 },
        { headerName: 'Mobile', field: 'em_mobile', minWidth: 90 },
        { headerName: 'Branch', field: 'branch_name', minWidth: 90 },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 90 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 90 },
        { headerName: 'Designation', field: 'desg_name', minWidth: 90 },
        { headerName: 'Status', field: 'emp_status', minWidth: 90 },

    ])

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Employee Record File
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}>
                            {/* First Row start */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                {/* <Box sx={{ display: "flex", flex: 2, p: 2 }}>
                                    <BrnachMastSelection style={SELECT_CMP_STYLE} />
                                </Box> */}
                                <Box sx={{ display: "flex", flex: 2, p: 2 }} >
                                    <DepartmentSelect style={SELECT_CMP_STYLE} />
                                </Box>
                                <Box sx={{ display: "flex", flex: 2, p: 2 }}>
                                    <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, }} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                color="secondary"
                                                name="activestatus"
                                                value={activestatus}
                                                checked={activestatus}
                                                className="ml-2"
                                                onChange={(e) => { updateFormData(e) }}
                                            />
                                        }
                                        label="Active"
                                    />
                                </Box>
                                <Box sx={{ display: "flex", justifyItems: "center", py: 2 }}>
                                    <CssVarsProvider>
                                        <IconButton variant="outlined" size='sm' color="danger" onClick={getEmployeeList}>
                                            <SearchIcon />
                                        </IconButton>
                                    </CssVarsProvider>

                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        type="Submit"
                                        className="ml-1"
                                        onClick={getEmployeeList}
                                    >
                                        Search
                                    </Button> */}
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, py: 2, pl: 2 }}>

                                    <CssVarsProvider>
                                        <IconButton variant="outlined" size='sm' color="danger" onClick={toSettings}>
                                            <CloseIcon />
                                        </IconButton>
                                    </CssVarsProvider>


                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        className="ml-2"
                                        onClick={toSettings}
                                    >
                                        Close
                                    </Button> */}
                                </Box>
                            </Box>
                            {/* First Row end */}
                        </Box>


                    </Paper>
                    <Paper square elevation={0} sx={{
                        pt: 1,
                        mt: 0.5,
                        display: 'flex',
                        //alignItems: "center",
                        //flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        //backgroundColor: "lightcyan",
                        flexDirection: "column"
                    }} >
                        <CommonAgGrid columnDefs={columnDef} tableData={tableData} sx={{
                            height: 600,
                            width: "100%"
                        }} rowHeight={30} headerHeight={30} />
                    </Paper>
                </Paper>
            </Box>
        </Fragment >
    )
}

export default memo(EmployeeFileAgGrid)