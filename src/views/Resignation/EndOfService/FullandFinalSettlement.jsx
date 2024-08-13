import { Box, Paper, Tooltip, } from '@mui/material'
import React, { Fragment, lazy, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { setPersonalData } from 'src/redux/actions/Profile.action'
import { useDispatch, useSelector } from 'react-redux'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CssVarsProvider, Typography, IconButton, } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { pdfdownlod } from './FullFinalPdf'
import { PUBLIC_NAS_FOLDER, } from 'src/views/Constant/Static';
import { screenInnerHeight, urlExist } from 'src/views/Constant/Constant'
import ProfilePicDefault from 'src/assets/images/nosigature.jpg'
import _ from 'underscore'
import moment from 'moment';
import { startOfMonth } from 'date-fns';
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop';
import { IconButton as OpenIcon } from '@mui/material';
import NextPlanOutlinedIcon from '@mui/icons-material/NextPlanOutlined';

const EndofProcess = lazy(() => import('./EndofProcess'))

const FullandFinalSettlement = () => {

    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [details, setDetails] = useState([])
    const [empid, setEmpid] = useState(0)
    const [src, setSrc] = useState(ProfilePicDefault)
    const [hrId, sethrId] = useState(0)
    const [hrsig, setHrSig] = useState(ProfilePicDefault)
    const [prepard, setPrepad] = useState(ProfilePicDefault)
    const [lop, setLop] = useState(0)
    const [calcLop, setCalcLop] = useState(0)
    const [holiday, setHoliday] = useState(0)
    const [openBkDrop, setOpenBkDrop] = useState(false)

    const loginId = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id, _.isEqual)

    const toRedirectToHome = () => {
        setFlag(0)
    }

    useEffect(() => {
        const getEmployee = async () => {
            const result = await axioslogin.get("/Resignation/fullsetteleEmplo/all")
            const { success } = result?.data
            if (success === 1) {
                setTableData(result?.data?.data)
                const { relieving_date, em_id, } = result?.data?.data[0];
                const postdata = {
                    emp_id: em_id,
                    from: moment(startOfMonth(new Date(relieving_date))).format('YYYY-MM-DD'),
                    to: relieving_date
                }
                const punchdata = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                const { success, data } = punchdata.data
                if (success === 1) {
                    const lossofpay = (data.filter(val => val.leave_status === 0 && val.duty_status === 0)).length
                    const calculatedlop = (data.filter(val => val.duty_desc === 'A' && val.leave_status === 0)).length
                    const holiday = (data.filter(val => val.holiday_status === 1)).length
                    setHoliday(holiday)
                    setLop(lossofpay)
                    setCalcLop(calculatedlop)
                } else {
                    setLop(0)
                    setCalcLop(0)
                    setHoliday(0)
                }
            } else {
                setTableData([])
            }
        }
        getEmployee()

    }, [])

    const [column] = useState([
        { headerName: 'Slno ', field: 'slno', filter: true },
        { headerName: 'Emp ID', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', },
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        { headerName: 'Request Date', field: 'request_date', wrapText: true, minWidth: 250, },
        { headerName: 'Type', field: 'Resign', wrapText: true, minWidth: 250, },
        { headerName: 'Status', field: 'appstatus', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                    <Tooltip title="View Details" followCursor placement='top' arrow >
                        <OpenIcon onClick={() => handleClickIcon(params)} sx={{ cursor: 'pointer', p: 0 }}>
                            <NextPlanOutlinedIcon color='primary' />
                        </OpenIcon>
                    </Tooltip>
                </Box>
        }
    ])

    const handleClickIcon = async (params) => {
        setOpenBkDrop(true)
        if (params.data.length !== 0) {
            setDetails(params.data);
            const { em_id, hr_id } = params.data
            dispatch(setPersonalData(em_id))
            setEmpid(em_id)
            setFlag(1)
            sethrId(hr_id)
            setOpenBkDrop(false)
        } else {
            setOpenBkDrop(false)
        }

    }

    useEffect(() => {
        const getEmployeeSig = async () => {
            if (empid > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + empid}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setSrc(picUrl)
                    } else {
                        setSrc(ProfilePicDefault)
                    }
                })
            }
        }
        getEmployeeSig()
        const getHrdSig = async () => {
            if (hrId > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + hrId}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setHrSig(picUrl)
                    } else {
                        setHrSig(ProfilePicDefault)
                    }
                })
            }
        }
        getHrdSig()
        const getLoginSig = async () => {
            if (loginId > 0) {
                const profilePic = JSON.stringify(`${PUBLIC_NAS_FOLDER + loginId}/signature/signature.jpg`);
                urlExist(profilePic, (status) => {
                    if (status === true) {
                        const picUrl = JSON.parse(profilePic)
                        setPrepad(picUrl)
                    } else {
                        setPrepad(ProfilePicDefault)
                    }
                })
            }
        }
        getLoginSig()
    }, [empid, hrId, loginId])

    const download = useCallback(() => {
        pdfdownlod(details, src, hrsig, prepard, lop, calcLop, holiday)
    }, [details, src, hrsig, prepard, lop, calcLop, holiday])

    return (
        <Fragment>
            <Paper variant='outlined' sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: screenInnerHeight - 100 }} >
                <CustomBackDrop open={openBkDrop} text="Please wait !. Employee Details In Process" />
                <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30 }} >
                        <Paper elevation={5} square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', }} >
                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <DragIndicatorOutlinedIcon />
                                <CssVarsProvider>
                                    <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Full and Final Settlement
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            {
                                details.length === 0 ? null : <Tooltip title="Download as PDF" followCursor placement='top' arrow >
                                    <Box sx={{ display: "flex", pr: 1 }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                variant="outlined"
                                                size='xs'
                                                color='primary'
                                                onClick={download}
                                                sx={{ color: '#347aeb' }}
                                            >
                                                <ArrowDownwardIcon />
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                </Tooltip >
                            }
                            <Box sx={{ display: "flex", pr: 1 }}>
                                <CssVarsProvider>
                                    <IconButton
                                        variant="outlined"
                                        size='xs'
                                        color="danger"
                                        onClick={toRedirectToHome}
                                        sx={{ color: '#ef5350' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Paper>
                {
                    flag === 1
                        ? <EndofProcess details={details} />
                        : <Paper variant='outlined' elevation={2} sx={{ width: '100%', height: screenInnerHeight - 120, p: 1 }}>
                            {/* <Paper variant='outlined' elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flex: 1, flexDirection: "column", }} > */}
                            <CommonAgGrid
                                columnDefs={column}
                                tableData={tableData}
                                sx={{
                                    height: screenInnerHeight - 150,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            // rowStyle={rowStyle}
                            // getRowStyle={getRowStyle}
                            />
                            {/* </Paper> */}
                        </Paper>
                }
            </Paper>
        </Fragment>
    )
}

export default memo(FullandFinalSettlement) 
