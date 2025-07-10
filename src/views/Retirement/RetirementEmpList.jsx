import { Box, Tooltip } from '@mui/joy';
import { IconButton, Paper } from '@mui/material';
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import CommonAgGrid from '../Component/CommonAgGrid';
import CustomLayout from '../Component/MuiCustomComponent/CustomLayout'
import CancelIcon from '@mui/icons-material/Cancel';
import { screenInnerHeight } from '../Constant/Constant';
import { getEmployeeInformation } from 'src/redux/actions/LeaveReqst.action';
import { useDispatch } from 'react-redux';
import { setShiftDetails } from 'src/redux/actions/Shift.Action';

const Retire = lazy(() => import('./RetirementProcess'))

const RetirementEmpList = () => {

    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(0)
    const [details, setDetails] = useState({})

    useEffect(() => {
        const getContractEnd = async () => {
            const result = await axioslogin.get('/Count/retirement/list')
            const { success, data } = result?.data
            if (success === 1) {
                setTableData(data)
            } else {
                setTableData([])
            }
        }
        getContractEnd()
    }, [count])

    const [columnDef] = useState([
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params =>
                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-evenly', alignItems: 'center', }} >
                    <Box sx={{ display: 'flex', }}>
                        <Tooltip title="Retirement Process" followCursor placement='bottom' arrow variant='outlined' color='primary' >
                            <IconButton size='sm' onClick={() => retirementProcess(params)}
                                sx={{
                                    "--IconButton-size": "28px"
                                }}
                            >
                                <CancelIcon
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
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
        },
        { headerName: 'Emp No ', field: 'em_no', minWidth: 150, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Department', field: 'dept_name', wrapText: true, minWidth: 250 },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true, minWidth: 250 },
        { headerName: 'Designation', field: 'desg_name', minWidth: 250 },
        { headerName: 'Category', field: 'ecat_name', minWidth: 200, filter: true },
        { headerName: 'DOJ', field: 'em_doj', minWidth: 150 },
        { headerName: 'Date of Birth', field: 'em_dob', minWidth: 150 },
        { headerName: 'Retirement Date', field: 'em_retirement_date', minWidth: 150 },
    ])

    const retirementProcess = useCallback(async (params) => {
        const { em_id } = params.data
        setFlag(1)
        setDetails(params.data)
        dispatch(getEmployeeInformation(em_id))
        dispatch(setShiftDetails())
    }, [dispatch])

    return (
        <CustomLayout title="Retirement Process" displayClose={true} >
            <Box sx={{ width: "100%" }} >
                {
                    flag === 1 ? <Retire detail={details ? details : []} setFlag={setFlag} setCount={setCount} /> : <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: screenInnerHeight * 73 / 100,
                                width: "100%"
                            }}
                            rowHeight={32}
                            headerHeight={32}
                        />
                    </Paper>
                }

            </Box>
        </CustomLayout>
    )
}

export default memo(RetirementEmpList) 