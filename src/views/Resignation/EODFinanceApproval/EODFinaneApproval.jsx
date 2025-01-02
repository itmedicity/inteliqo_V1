import { Box, Paper, Tooltip } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ApprovalModal from './ApprovalModal'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { screenInnerHeight } from 'src/views/Constant/Constant'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CssVarsProvider, Typography, IconButton, } from '@mui/joy'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton as OpenIcon } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { pdfdownlod } from '../EndOfService/FullFinalPdf';

const EODFinaneApproval = () => {

    const [tableData, setTableData] = useState([])
    const [open, setOpen] = useState(false)
    const [details, setDetails] = useState({})
    const [count, setCount] = useState(0)
    const history = useHistory();

    useEffect(() => {
        const getEmployee = async () => {
            const result = await axioslogin.get("/Resignation/finalList/all")
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getEmployee()

    }, [count])

    const [column] = useState([
        { headerName: 'Slno ', field: 'slno', filter: true },
        { headerName: 'Emp ID', field: 'em_no', filter: true },
        { headerName: 'Emp Name ', field: 'em_name', },
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        { headerName: 'Request Date', field: 'request_date', wrapText: true, minWidth: 250, },
        { headerName: 'Status', field: 'appstatus', filter: true },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.status === 1) {
                    return <OpenIcon
                        sx={{ cursor: 'pointer' }}  >
                        <Tooltip title="Approved Request">
                            <BeenhereIcon />
                        </Tooltip>
                    </OpenIcon>
                } else {
                    return <Tooltip title="View" followCursor placement='top' arrow >
                        <OpenIcon onClick={() => handleClickIcon(params)}>
                            <CheckCircleOutlineIcon color='primary' />
                        </OpenIcon>
                    </Tooltip>
                }
            }
        },
        {
            headerName: 'PDF',
            cellRenderer: params => {
                return <Tooltip title="View" followCursor placement='top' arrow >
                    <OpenIcon onClick={() => toDownload(params)}>
                        <ArrowCircleDownIcon color='primary' />
                    </OpenIcon>
                </Tooltip>
            }

        },
    ])

    const toDownload = useCallback((params) => {

        const details = params.data
        console.log("Fhfghmkn");
        pdfdownlod(details)
    }, [])

    const handleClickIcon = async (params) => {
        setOpen(true)
        const data = params.data
        setDetails(data);
    }

    const toRedirectToHome = useCallback(() => {
        if (open === 1) {
            setOpen(false)
        } else {
            history.push(`/Home`)
        }
    }, [history])

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
                                        EOD Finance Approval
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
                        open === true ? <ApprovalModal empData={details} setCount={setCount} setOpen={setOpen} /> : <Paper variant="outlined" sx={{ width: '100%', p: 0.5 }}  >
                            <CommonAgGrid
                                columnDefs={column}
                                tableData={tableData}
                                sx={{
                                    height: 600,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            // rowStyle={rowStyle}
                            // getRowStyle={getRowStyle}
                            />
                        </Paper>
                    }

                </Box>
            </Paper>
        </Box>
    )
}

export default memo(EODFinaneApproval) 