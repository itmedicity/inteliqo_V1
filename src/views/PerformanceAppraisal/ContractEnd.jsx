import { Box, Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from '../Axios/Axios';
import { CssVarsProvider, Typography } from '@mui/joy';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CommonAgGrid from '../Component/CommonAgGrid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { succesNofity, warningNofity } from '../CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { IconButton as OpenIcon } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { setPersonalData } from 'src/redux/actions/Profile.action';
import { screenInnerHeight } from '../Constant/Constant';
import Tooltip from '@mui/joy/Tooltip';


const ContractEnd = () => {

    const history = useHistory()
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([])
    const [count, setCount] = useState(0)

    const RedirectToHome = useCallback(() => {
        history.push(`/Home`)
    }, [history])

    /** column data for contract closed employees */
    const [columnDef] = useState([
        {
            headerName: 'Action',
            minWidth: 120,
            cellRenderer: params =>
                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'space-evenly', alignItems: 'center', }} >
                    <Box sx={{ display: 'flex', }} >
                        <Tooltip title="Resignation" followCursor placement='top' arrow variant='outlined' color='danger'   >
                            <IconButton size='sm' color='danger' onClick={() => resignProcess(params)}
                                sx={{
                                    "--IconButton-size": "28px"
                                }}
                            >
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box sx={{ display: 'flex', }}>
                        <Tooltip title="Contract Renew Process" followCursor placement='top' arrow variant='outlined' color='primary' >
                            <IconButton size='sm' onClick={() => contractRenewal(params)}
                                sx={{
                                    "--IconButton-size": "28px"
                                }}
                            >
                                <PublishedWithChangesIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
        },
        { headerName: 'Emp No ', field: 'em_no', minWidth: 120, filter: true },
        { headerName: 'Name ', field: 'em_name', minWidth: 150, filter: true },
        { headerName: 'Dept Name ', field: 'dept_name', minWidth: 150, filter: true },
        { headerName: 'Designation ', field: 'desg_name', minWidth: 150, filter: true },
        { headerName: 'Date of joining ', field: 'em_doj', minWidth: 150, filter: true },
        { headerName: 'Contract Start', field: 'em_cont_start', minWidth: 150 },
        { headerName: 'Contract End', field: 'em_cont_end', minWidth: 150 },
    ])

    /** getting contract closed data from database */
    useEffect(() => {
        const contractEndList = async () => {
            const result = await axioslogin.get('/Performance/contractclosed')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        contractEndList()
    }, [count])

    const resignProcess = useCallback(async (params) => {
        const data = params.api.getSelectedRows()
        const { em_id, sect_id, dept_id } = data[0]
        const postDeptData = {
            dept_id: dept_id,
            sect_id: sect_id,
        }
        //selecting due clearence department from hrm_due_clearence_mast
        const results = await axioslogin.post('/Duedepartment/duedept', postDeptData)
        const { success1, data1 } = results.data
        if (success1 === 1) {
            const { due_dept_code } = data1[0]
            const duedepartment = JSON.parse(due_dept_code)

            //saving each department to hrm_due_clearence
            const duedeptdetl = duedepartment.map((val) => {
                return { deptcode: val.deptcode, deptname: val.deptdesc, emp_id: em_id }
            })
            const result = await axioslogin.post('/dueclearence', duedeptdetl)
            const { success } = result.data
            if (success === 1) {
                succesNofity("Employee Submitted for Due Clearence")
                setCount(count + 1)
            } else {
                warningNofity("Error Occured While Submitting!!")
            }
        }
    }, [count])


    const contractRenewal = useCallback(async (params) => {
        const { em_no, em_id } = params.data
        dispatch(setPersonalData(em_id))
        history.push(`/Home/ContractRenewalProcess/${em_no}/${em_id}`)
    }, [history, dispatch])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, height: screenInnerHeight * 89 / 100 }}>
                    <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Contract Closed List
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        {/* <Box sx={{ pl: 0.5, mt: 0.5 }}>
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='xs' sx={{ color: 'green' }} onClick={toDownload}>
                                <DownloadIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box> */}
                        <Box sx={{ pl: 0.5, mt: 0.5 }}>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='xs' color="danger" onClick={RedirectToHome}>
                                    <CloseIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: screenInnerHeight * 80 / 100,
                                width: "100%"
                            }}
                            rowHeight={32}
                            headerHeight={32}
                        />
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(ContractEnd)