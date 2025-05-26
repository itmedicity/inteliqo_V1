import { Box, Paper, Tooltip } from '@mui/material'
import React, { Fragment, lazy, memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography } from '@mui/joy';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import NextPlanIcon from '@mui/icons-material/NextPlan';
// import { ProbationExcel } from '../Payroll/AttendanceUpdation/ExportToExcel';
import { IconButton as OpenIcon } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommonAgGrid from '../../Component/CommonAgGrid';
import { screenInnerHeight } from '../../Constant/Constant';
import { axioslogin } from '../../Axios/Axios';
import { ProbationExcel } from '../../Payroll/AttendanceUpdation/ExportToExcel';

const CategoryChangeComponent = lazy(() => import('./CategoryChangeComponent'))

const ProbationEndDetails = () => {
    const history = useHistory()
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(0)
    const [empno, setempno] = useState(0)

    /** back to home page */
    const RedirectToHome = useCallback(() => {
        if (flag === 1) {
            setFlag(0)
        } else {
            history.push(`/Home`)
        }

    }, [history, flag])


    /** list of probation end employees */
    useEffect(() => {
        const aprobationEndList = async () => {
            const result = await axioslogin.get('/Performance/list')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setCount(0)
            } else if (success === 0) {
                setTableData([])
            }
        }
        aprobationEndList()
    }, [count])

    const [columnDef] = useState([
        {
            headerName: 'Action', minWidth: 150,
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Direct Permanent Confirmation" followCursor placement='top' arrow >
                        <OpenIcon onClick={() => addtoProcess(params)}>
                            <NextPlanIcon color='primary' />
                        </OpenIcon>
                    </Tooltip>
                    {/* <Tooltip title="Appraisal Process" followCursor placement='top' arrow >
                        <OpenIcon onClick={() => toAppraisal(params)}>
                            <CheckCircleIcon color='primary' />
                        </OpenIcon>
                    </Tooltip> */}
                </Fragment>
        },
        // { headerName: 'ID', field: 'em_id', wrapText: true, minWidth: 50, filter: true },
        { headerName: 'Emp ID# ', field: 'em_no', filter: true, minWidth: 150 },
        { headerName: 'Name ', field: 'em_name', filter: true, minWidth: 200 },
        { headerName: 'Department ', field: 'dept_name', filter: true, minWidth: 200 },
        { headerName: 'Department Section ', field: 'sect_name', filter: true, minWidth: 200 },
        { headerName: 'Designation ', field: 'desg_name', minWidth: 200 },
        { headerName: 'Date of joining ', field: 'em_doj', minWidth: 150 },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 250, },
        { headerName: 'Probation End ', field: 'em_prob_end_date', minWidth: 150 },

    ])

    const toDownload = async () => {
        const fileName = "ProbationEnd"
        const array = tableData.map((val) => {
            return {
                "EmpID": val.em_no,
                "Name": val.em_name,
                "Department": val.dept_name,
                "DepartmentSection": val.sect_name,
                "Designation": val.desg_name,
                "DateOfJoining": val.em_doj,
                "Category": val.ecat_name,
                "ProbationendDate": val.em_prob_end_date
            }
        })
        ProbationExcel(array, fileName)
    }

    const addtoProcess = useCallback((params) => {
        const { em_no } = params.data
        setempno(em_no)
        setFlag(1)//to open company information page
    }, [])

    return (
        <>
            <Box sx={{ flex: 1 }} >
                <Paper sx={{ flex: 1, height: screenInnerHeight - 90 }}>
                    <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}  >
                        <Paper square sx={{
                            display: "flex", flex: 1, height: 30,
                            alignItems: 'center'
                        }} >
                            <Box sx={{ display: "flex", flex: 1 }}>
                                <DragIndicatorOutlinedIcon />
                                <Typography sx={{ display: 'flex', fontWeight: 500 }} >
                                    Employee Probation End List
                                </Typography>
                            </Box>
                            <Tooltip title="Download" followCursor placement='top' arrow >
                                <Box sx={{ display: "flex", pr: 1 }}>
                                    <IconButton
                                        variant="outlined"
                                        size='xs'
                                        color='primary'
                                        onClick={toDownload}
                                        sx={{ color: '#347aeb' }}
                                    >
                                        <ArrowDownwardIcon />
                                    </IconButton>
                                </Box>
                            </Tooltip>
                            <Box sx={{ display: "flex", pr: 1 }}>
                                <IconButton
                                    variant="outlined"
                                    size='xs'
                                    color="danger"
                                    onClick={RedirectToHome}
                                    sx={{ color: '#ef5350' }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    </Paper>
                    <Paper square elevation={0} sx={{ display: 'flex', flexDirection: "column", p: 1 }} >
                        {
                            flag === 1 ? <CategoryChangeComponent
                                empno={empno}
                            /> :
                                <CommonAgGrid
                                    columnDefs={columnDef}
                                    tableData={tableData}
                                    sx={{
                                        height: 600,
                                        width: "100%"
                                    }}
                                    rowHeight={40}
                                    headerHeight={30}
                                />
                        }

                    </Paper>
                </Paper>
            </Box>
        </>

    )
}

export default memo(ProbationEndDetails) 