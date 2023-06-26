import { Box, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
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

const ContractEnd = () => {

    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const [count, setCount] = useState(0)

    const RedirectToHome = () => {
        history.push(`/Home`)
    }
    /** column data for contract closed employees */
    const [columnDef] = useState([
        { headerName: 'ID', field: 'em_id' },
        { headerName: 'Emp No ', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Direct Contract Close" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }} onClick={() => addtoProcess(params)}>
                            <PublishedWithChangesIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
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

    const addtoProcess = async (params) => {
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
                warningNofity("Error Occured While Sub,itting!!")
            }
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Employee Contract Closed List
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' sx={{ color: 'red' }} onClick={RedirectToHome}>
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
                                height: 600,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(ContractEnd)