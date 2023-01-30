import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';
import CommonAgGrid from '../Component/CommonAgGrid';
import CancelIcon from '@mui/icons-material/Cancel';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import CompanyChange from './CompanyChange';
import { useDispatch, useSelector } from 'react-redux';
import MappingCheckbox from '../MuiComponents/MappingCheckbox';
import {
    getComApprvdApprsl, getCompAssesment, getContractPending, getPendingAppraisal,
    getPerformanceAssesment,
    getPermanentPending, getProbationPending, getTrainingPending
} from 'src/redux/actions/Appraisal.Action';
import AppraisalView from './AppraisalComponents/AppraisalView';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { setAccademicData } from 'src/redux/actions/Profile.action';


const HRList = () => {

    const history = useHistory()
    const dispatch = useDispatch();
    const [empno, setempno] = useState(0)
    const [empid, setEmpid] = useState(0)
    const [name, setname] = useState('')
    const [flag, setFlag] = useState(0)
    const [display, setdisplay] = useState(0)
    const [value, setValue] = useState(0)
    const [appraisalview, setAppraisalview] = useState(0)

    const List = [
        { slno: 1, name: 'Completed ' },
        { slno: 2, name: 'Training ' },
        { slno: 3, name: 'Probation   ' },
        { slno: 4, name: 'Annual  ' },
        { slno: 5, name: 'Contract ' },
        { slno: 6, name: 'All (Pending) ' }
    ]
    //redux dispatch for each checkbox click
    useEffect(() => {
        dispatch(getPendingAppraisal())
        dispatch(getComApprvdApprsl())
        dispatch(getTrainingPending())
        dispatch(getProbationPending())
        dispatch(getPermanentPending())
        dispatch(getContractPending())
    }, [dispatch])


    //redux data for showing accedemic details
    useEffect(() => {
        dispatch(setAccademicData(empno))
        dispatch(getPerformanceAssesment(empid))
        dispatch(getCompAssesment(empid))
    }, [empno, empid, dispatch])

    const loginData = useSelector((state) => {
        return state.getProfileData.ProfileData[0]
        //const status = state.getProfileData.lodingStatus
    })

    const RedirectToHome = () => {
        history.push(`/Home`)
    }
    const [complteCol] = useState([
        { headerName: 'Slno', field: 'slno', filter: true },
        { headerName: 'ID', field: 'em_id', filter: true },
        { headerName: 'Emp No ', field: 'em_no', filter: true },
        { headerName: 'Name ', field: 'em_name', filter: true },
        { headerName: 'Dept Name ', field: 'dept_name', filter: true },
        { headerName: 'Designation ', field: 'desg_name', },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 250, },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Direct Contract Close" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }}
                            onClick={() => DirectContractClose(params)}
                        >
                            <CancelIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Category Change" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }}
                            onClick={() => toCategory(params)}
                        >
                            <NextPlanIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Appraisal View" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }}
                            onClick={() => toAppraisalView(params)}
                        >
                            <InsertDriveFileIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])


    //for displaying column heading with status
    const [pendingCol] = useState([
        { headerName: 'ID', field: 'em_id', filter: true },
        { headerName: 'Emp No ', field: 'em_no', filter: true },
        { headerName: 'Name ', field: 'em_name', filter: true },
        { headerName: 'Dept Name ', field: 'dept_name', filter: true },
        { headerName: 'Designation ', field: 'desg_name', },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 250, },
        { headerName: 'Status ', field: 'status', wrapText: true, minWidth: 250, },
    ])
    //for displaying column with all appraisal list
    const [column] = useState([
        { headerName: 'ID', field: 'em_id', filter: true },
        { headerName: 'Emp No ', field: 'em_no', filter: true },
        { headerName: 'Name ', field: 'em_name', filter: true },
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Department Section', field: 'dept_name', filter: true },
        { headerName: 'Designation ', field: 'desg_name', },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 250, },
    ])

    //Direct Contract close
    const DirectContractClose = (params) => {
        const { em_no, em_id } = params.data
        history.push(`/Home/Direct_Contract_Close/${em_no}/${em_id}`)
    }

    //employee that directly aubmitted to category change
    const toCategory = async (params) => {
        const data = params.api.getSelectedRows()
        const { em_no, em_id, em_name } = data[0]
        setEmpid(em_id)
        setempno(em_no)
        setname(em_name)
        setFlag(1)
    }

    const toAppraisalView = (params) => {
        const { em_no, em_id } = params.data
        setempno(em_no)
        setEmpid(em_id)
        setAppraisalview(1)
    }

    /** to get employee category details from redux */
    const empCate = useSelector((state) => {
        return state.getEmployeeCategory.empCategory || 0
    })

    useEffect(() => {
        if (empCate.some(key => key.des_type === 2)) {
            setdisplay(1)
        } else if (empCate.some(key => key.des_type === 1)) {
            setdisplay(2)
        }
    }, [empCate])

    //appraisal list data---> like all,pending,contract,permanent,probatio
    const newState = useSelector((state) => {
        return {
            allAppraisal: state.getAppraisalData.allAppraisal.allAppraisalList,
            pendingAppraisal: state.getAppraisalData.pendingAppraisal.pendingAppraisalList,
            approvedAppraisal: state.getAppraisalData.approvedAppraisal.approvedAppraisalList,
            trainingPending: state.getAppraisalData.trainingPending.trainingPendingList,
            probationPending: state.getAppraisalData.probationPending.probationPendingList,
            permanentPending: state.getAppraisalData.permanentPending.permanentPendingList,
            contractPending: state.getAppraisalData.contractPending.contractPendingList
        }
    })
    const { allAppraisal, pendingAppraisal,
        approvedAppraisal, trainingPending,
        probationPending, permanentPending,
        contractPending } = newState

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                {
                    flag === 1 ? <CompanyChange empid={empid} setFlag={setFlag} empno={empno}
                        display={display}
                        name={name} /> : appraisalview === 1 ? <AppraisalView empno={empno} empid={empid} setAppraisalview={setAppraisalview} loginData={loginData} /> :
                        <Paper square elevation={0} sx={{ p: 0.5, }}><Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Employee Appraisl List (Completed/Pending)
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography sx={{ display: 'flex', }} >
                                        Count: All ({allAppraisal.length})     Pending({pendingAppraisal.length})      Completed:({approvedAppraisal.length})
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='sm' sx={{ color: 'red' }} onClick={RedirectToHome}>
                                        <CloseIcon color="danger" />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Paper>

                            <Paper square sx={{
                                p: 0.5, mt: 0.5, display: 'flex', alignItems: "center",
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                            }} >
                                {
                                    List && List.map((val, index) => {
                                        return <Box sx={{
                                            display: 'flex',
                                            pt: 1, pb: 1, pl: 1,
                                            //justifyContent: 'column',
                                            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                        }}
                                            key={val.slno}
                                        >
                                            <MappingCheckbox
                                                label={val.name}
                                                name={val.name}
                                                value={val.slno}
                                                onChange={setValue}
                                                checkedValue={value}
                                            />
                                        </Box>
                                    })
                                }
                            </Paper>
                            <Paper square sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                                <CommonAgGrid
                                    columnDefs={value === 1 ? complteCol :
                                        value === 2 ? pendingCol :
                                            value === 3 ? pendingCol :
                                                value === 4 ? pendingCol :
                                                    value === 5 ? pendingCol :
                                                        value === 6 ? pendingCol : column}
                                    tableData={value === 1 ? approvedAppraisal :
                                        value === 2 ? trainingPending :
                                            value === 3 ? probationPending :
                                                value === 4 ? permanentPending :
                                                    value === 5 ? contractPending :
                                                        value === 6 ? pendingAppraisal : allAppraisal}
                                    sx={{
                                        height: 600,
                                        width: "100%"
                                    }}
                                    rowHeight={30}
                                    headerHeight={30}
                                />
                            </Paper>
                        </Paper>
                }
            </Box>
        </Fragment>
    )
}

export default memo(HRList)