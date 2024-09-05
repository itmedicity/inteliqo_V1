import { Box, Paper } from '@mui/material'
import { Tab, tabClasses, TabList, TabPanel, Tabs, Tooltip } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { useDispatch, useSelector } from 'react-redux'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CssVarsProvider, Typography, IconButton, } from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close';
import { screenInnerHeight, } from 'src/views/Constant/Constant'
import _ from 'underscore'
import { format, } from 'date-fns';
import { IconButton as OpenIcon } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { setShiftDetails } from 'src/redux/actions/Shift.Action'
import PersonOffIcon from '@mui/icons-material/PersonOff';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import { useHistory } from 'react-router-dom'
import { getEmployeeInformation } from 'src/redux/actions/LeaveReqst.action'

const EndofProcess = lazy(() => import('./EndofProcess'))

const FullandFinalSettlement = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = useState(0)

    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [details, setDetails] = useState([])

    // const loginId = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id, _.isEqual)

    useEffect(() => {
        dispatch(setCommonSetting())
        dispatch(setShiftDetails())
    }, [dispatch])


    useEffect(() => {
        const getEmployee = async () => {
            const result = await axioslogin.get("/Resignation/fullsetteleEmplo/all")
            const { success } = result?.data
            if (success === 1) {
                setTableData(result?.data?.data)
                // const { relieving_date, em_id, } = result?.data?.data[0];
                // const postdata = {
                //     emp_id: em_id,
                //     from: moment(startOfMonth(new Date(relieving_date))).format('YYYY-MM-DD'),
                //     to: relieving_date
                // }
                // const punchdata = await axioslogin.post("/payrollprocess/punchbiId", postdata);
                // const { success, data } = punchdata.data
                // if (success === 1) {
                //     const lossofpay = (data.filter(val => val.leave_status === 0 && val.duty_status === 0)).length
                //     const calculatedlop = (data.filter(val => val.duty_desc === 'A' && val.leave_status === 0)).length
                //     const holiday = (data.filter(val => val.holiday_status === 1)).length

                // } else {
                //     setLop(0)
                //     setCalcLop(0)
                //     setHoliday(0)
                // }
            } else {
                setTableData([])
            }
        }

        const getUnauthorizedAbsentee = async () => {
            const result = await axioslogin.get('/Resignation/getUnauthorized/absentee')
            const { success, data } = result.data
            if (success === 1) {
                console.log(data);
                const arr = data?.map(val => {
                    return {
                        ...val,
                        absentDate: format(new Date(val.unauthorised_absent_date), 'dd-MM-yyyy')
                    }
                })
                setTableData(arr)
            }
            else {
                setTableData([])
            }
        }

        if (value === 1) {
            getUnauthorizedAbsentee()
        } else {
            getEmployee()
        }

    }, [value])

    const [column] = useState([
        { headerName: 'Emp ID', field: 'em_no', filter: true, minWidth: 100 },
        { headerName: 'Emp Name ', field: 'em_name', minWidth: 250, },
        { headerName: 'Department', field: 'dept_name', filter: true, minWidth: 250 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, minWidth: 300 },
        { headerName: 'Request Date', field: 'request_date', wrapText: true, minWidth: 200, },
        { headerName: 'Type', field: 'Resign', wrapText: true, minWidth: 250, },
        { headerName: 'Status', field: 'appstatus', filter: true, minWidth: 200, },
        {
            headerName: 'Action', minWidth: 200,
            cellRenderer: params =>
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                    <Tooltip title="Click here to End of Service Process" followCursor placement='top' arrow variant='soft' color='danger' >
                        <OpenIcon
                            onClick={() => handleClickIcon(params)}
                            sx={{
                                cursor: 'pointer',
                                p: 0,
                            }}
                        >
                            <LoopIcon
                                color='primary'
                                sx={{
                                    '@keyframes rotate': {
                                        '0%': {
                                            transform: 'rotate(360deg)',
                                        },
                                        '100%': {
                                            transform: 'rotate(0deg)',
                                        },
                                    },
                                    '&:hover': {
                                        animation: 'rotate 2.0s linear infinite',
                                        color: 'success.main',
                                    }
                                }}

                            />
                        </OpenIcon>
                    </Tooltip>
                </Box>
        }
    ])

    const [columnDef] = useState([
        { headerName: 'Emp ID', field: 'em_no', filter: true, minWidth: 100 },
        { headerName: 'Emp Name ', field: 'em_name', minWidth: 300 },
        { headerName: 'Department', field: 'dept_name', filter: true, minWidth: 250 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, minWidth: 300 },
        { headerName: 'Absent Date', field: 'absentDate', filter: true, minWidth: 300 },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                    <Tooltip title="Click here to End of Service Process" followCursor placement='top' arrow variant='soft' color='danger' >
                        <OpenIcon
                            //onClick={() => inactiveEmployee(params)}
                            sx={{
                                cursor: 'pointer',
                                p: 0,
                            }}
                        >
                            <PersonOffIcon color='primary'

                            />
                        </OpenIcon>
                    </Tooltip>
                </Box>
        }
    ])

    const handleClickIcon = useCallback(async (params) => {
        const { em_id } = params.data
        dispatch(getEmployeeInformation(em_id))
        setDetails(params.data);
        setFlag(1)
    }, [dispatch])

    const toRedirectToHome = useCallback(() => {
        if (flag === 1) {
            setFlag(0)
        } else {
            history.push(`/Home`)
        }
    }, [flag, history])

    const handleChange = useCallback((newValue) => {
        setValue(newValue);
    }, [])

    return (
        <Box sx={{ flex: 1 }} >
            <Paper sx={{ flex: 1, height: screenInnerHeight - 90 }} >
                <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                        <Paper square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', justifyContent: "space-between" }} >
                            <Box sx={{ display: "flex" }}>
                                <DragIndicatorOutlinedIcon />
                                <CssVarsProvider>
                                    <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Full and Final Settlement
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
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
                <Box sx={{ display: 'flex', flex: 1, py: 0.5, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >

                    {
                        flag === 1 ? <EndofProcess details={details} /> : <Box sx={{
                            width: '100%',
                            backgroundColor: '#FFFFFF',
                            padding: 0.3,
                            borderRadius: 'md',
                            boxShadow: 'lg',
                            '@media screen and (max-width: 768px)': {
                                padding: 1,
                            },

                        }}>
                            <Tabs
                                aria-label="Basic tabs"
                                defaultValue={0}
                                sx={{ bgcolor: 'transparent', px: 1 }}
                                size="sm"
                                onChange={(event, newValue) => handleChange(newValue)}
                            >
                                <TabList
                                    tabFlex={1}
                                    variant="outlined"
                                    disableUnderline
                                    sx={{
                                        p: 0.5,
                                        gap: 0.5,
                                        borderRadius: 'xl',
                                        bgcolor: 'background.level1',
                                        [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                            boxShadow: 'sm',
                                            bgcolor: 'background.surface',
                                        },
                                    }}
                                >
                                    <Tab
                                        disableIndicator
                                        sx={{ backgroundColor: '#DBEAF8' }}
                                    >
                                        <WorkOffIcon />
                                        <Typography level="title-md" sx={{ fontSize: 14.5 }} >Resignation Process</Typography>
                                    </Tab>
                                    <Tab
                                        disableIndicator
                                        sx={{ backgroundColor: '#DBEAF8' }}
                                    >
                                        <NoAccountsIcon />
                                        <Typography level="title-md" sx={{ fontSize: 14.5 }} >Unauthorized Absentees</Typography>
                                    </Tab>

                                </TabList>
                                <TabPanel
                                    value={0}
                                    sx={{ mt: 0.5 }}
                                >
                                    <Paper variant='outlined' elevation={0} sx={{ width: '100%', height: screenInnerHeight - 120, p: 1 }}>
                                        <CommonAgGrid
                                            columnDefs={column}
                                            tableData={tableData}
                                            sx={{
                                                height: screenInnerHeight - 150,
                                                width: "100%"
                                            }}
                                            rowHeight={30}
                                            headerHeight={30}
                                        />
                                    </Paper>
                                </TabPanel>
                                <TabPanel
                                    value={1}
                                    sx={{ p: 0 }}
                                >
                                    <CommonAgGrid
                                        columnDefs={columnDef}
                                        tableData={tableData}
                                        sx={{
                                            height: screenInnerHeight - 150,
                                            width: "100%"
                                        }}
                                        rowHeight={30}
                                        headerHeight={30}
                                    />
                                </TabPanel>
                            </Tabs>
                        </Box>
                    }
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(FullandFinalSettlement) 
