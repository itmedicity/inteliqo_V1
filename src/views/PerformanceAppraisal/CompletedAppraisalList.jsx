import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper, Tooltip } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommonAgGrid from '../Component/CommonAgGrid';
import { getComApprvdApprsl, getCompAssesment, getPerformanceAssesment } from 'src/redux/actions/Appraisal.Action';
import CompanyChange from './CompanyChange';
import AppraisalView from './AppraisalComponents/AppraisalView';
import { setAccademicData } from 'src/redux/actions/Profile.action';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';

const CompletedAppraisalList = () => {

    const dispatch = useDispatch();
    const history = useHistory()
    const [empno, setempno] = useState(0)
    const [empid, setEmpid] = useState(0)
    const [name, setname] = useState('')
    const [flag, setFlag] = useState(0)
    const [display, setdisplay] = useState(0)
    const [appraisalview, setAppraisalview] = useState(0)

    const RedirectToHome = async () => {
        history.push(`/Home`)
    }

    const loginData = useSelector((state) => {
        return state.getProfileData.ProfileData[0]
        //const status = state.getProfileData.lodingStatus
    })

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


    //redux dispatch for each checkbox click
    useEffect(() => {
        dispatch(getComApprvdApprsl())
        dispatch(setAccademicData(empno))
        dispatch(getPerformanceAssesment(empid))
        dispatch(getCompAssesment(empid))
    }, [empno, empid, dispatch])



    const [complteCol] = useState([
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
        { headerName: 'Slno', field: 'slno', filter: true },
        { headerName: 'Emp Id', field: 'em_id', filter: true },
        { headerName: 'Emp No ', field: 'em_no', filter: true },
        { headerName: 'Name ', field: 'em_name', filter: true },
        { headerName: 'Dept Name ', field: 'dept_name', filter: true },
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
      
        const data = params.api.getSelectedRows()
        const { em_no, em_id} = data[0]
        setempno(em_no)
        setEmpid(em_id)
        setAppraisalview(1)
    }

    //appraisal list data---> like all,pending,contract,permanent,probatio
    const newState = useSelector((state) => {
        return {

            approvedAppraisal: state.getAppraisalData.approvedAppraisal.approvedAppraisalList,
        }
    })
    const {
        approvedAppraisal } = newState

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                {
                    flag === 1 ? <CompanyChange empid={empid} setFlag={setFlag} empno={empno}
                        display={display}
                        name={name} /> : appraisalview === 1 ? <AppraisalView empno={empno} empid={empid} setAppraisalview={setAppraisalview} loginData={loginData} /> : <Box sx={{ width: "100%" }} >

                            <Paper square elevation={2} sx={{ p: 0.5, }}>

                                <Paper square elevation={2} sx={{
                                    display: "flex",
                                    p: 1,
                                    alignItems: "center",
                                }}>
                                    <Box sx={{ flex: 1 }} >
                                        <CssVarsProvider>
                                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                                Completed Appraisal List
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 1 }}>
                                        <CssVarsProvider>
                                            <IconButton variant="outlined" size='sm' sx={{ color: 'red' }}
                                                onClick={RedirectToHome}
                                            >
                                                <CloseIcon color="danger" />
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                </Paper>
                                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                                    <CommonAgGrid
                                        columnDefs={complteCol}
                                        tableData={approvedAppraisal}
                                        sx={{
                                            height: 600,
                                            width: "100%"
                                        }}
                                        rowHeight={40}
                                        headerHeight={30}
                                    />
                                </Paper>
                            </Paper>
                        </Box>
                }
            </Box>
        </Fragment>
    )
}

export default CompletedAppraisalList