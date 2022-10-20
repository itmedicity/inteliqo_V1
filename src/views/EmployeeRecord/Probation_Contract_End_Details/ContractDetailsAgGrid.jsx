import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import CancelIcon from '@mui/icons-material/Cancel';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import moment from 'moment';

const ContractDetailsAgGrid = () => {
    const history = useHistory()
    const toSettings = () => {
        history.push(`/Home`)
    }
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0)

    //Direct Contract close
    const DirectContractClose = (data) => {
        const { em_no, em_id } = data
        history.push(`/Home/Direct_Contract_Close/${em_no}/${em_id}`)
    }

    //contreact Renew Process
    const ContractRenew = async (data) => {
        const { em_no } = data.data
        const conractrenew = {
            contract_renew_appr: 1,
            em_no: em_no
        }
        const result = await axioslogin.patch('/empcontract/contractrenewapprove', conractrenew)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
        }
        else {
            errorNofity("Error Occured!!Please Contact EDP")
        }
    }

    //Contract Renewal Process
    const DirectContractRenewProcess = (params) => {
        const { em_no, em_id } = params.data
        history.push(`/Home/ContractRenewalProcess/${em_no}/${em_id}`)
    }

    //column fot ag grid table
    const [columnDef] = useState([
        {
            headerName: 'Action', minWidth: 200,
            cellRenderer: params => <Fragment>
                <Tooltip title="Direct contract Close" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 1 }} onClick={() => DirectContractClose(params)}>
                        <CancelIcon color='primary' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Contract Renew" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 1 }} onClick={() => ContractRenew(params)}>
                        <LibraryAddCheckIcon color='primary' />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Direct Contract Renew" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 1 }} onClick={() => DirectContractRenewProcess(params)}>
                        <TaskAltIcon color='primary' />
                    </IconButton>
                </Tooltip>
            </Fragment>
        },
        { headerName: 'Emp Id ', field: 'em_id', minWidth: 10, filter: true },
        { headerName: 'Name', field: 'em_name', autoHeight: true, wrapText: true, minWidth: 200, filter: true },
        { headerName: 'Department Section', field: 'sect_name', wrapText: true },
        { headerName: 'Designation', field: 'desg_name' },
        { headerName: 'DOJ', field: 'em_doj' },
        { headerName: 'Contract Start', field: 'em_cont_start' },
        { headerName: 'Contract End', field: 'em_cont_end' },
    ])

    //get contract end employee details
    useEffect(() => {
        const getContractEnd = async () => {
            const result = await axioslogin.get('/empcat/contract/detl')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        getContractEnd()
    }, [count])

    //row highlight color based on condition
    const rowStyle = { background: '#BBDEFB' };
    const getRowStyle = params => {
        if (params.data.em_cont_end <= moment(new Date()).format('YYYY-MM-DD')) {
            return { background: '#BBDEFB' };
        }
        else {
            return null
        }
    };

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
                                    Contract End List
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{}}>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' color="danger" onClick={toSettings}>
                                    <CloseIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{
                        pt: 1,
                        mt: 0.5,
                        display: 'flex',
                        flexDirection: "column"
                    }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: 600,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                            rowStyle={rowStyle} getRowStyle={getRowStyle}
                        />
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default ContractDetailsAgGrid