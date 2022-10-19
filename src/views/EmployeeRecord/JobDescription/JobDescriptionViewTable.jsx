import React, { Fragment, useEffect, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { Box, Paper } from '@mui/material';
import { CssVarsProvider, Typography } from '@mui/joy';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { axioslogin } from 'src/views/Axios/Axios';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';
import JobDescriptionList from '../EmployeeFile/EmployeeProfile/EmpMenus/JobDescription/JobDescriptionList';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
const JobDescriptionViewTable = () => {
    const [tableData, setTableData] = useState([])
    const history = useHistory()
    const [designation, setdesignation] = useState(0)
    const [dept_id, setdept_id] = useState(0)
    const [sect_id, setsect_id] = useState(0)
    const [flag, setflag] = useState(0)
    const [desgname, setdesgname] = useState('')
    const [deptname, setdeptname] = useState('')

    const getProfile = (params) => {
        setflag(1)
        const data = params.api.getSelectedRows()
        const { designation, dept_id, sect_id, dpname, dsname } = data[0]
        setdesignation(designation)
        setdept_id(dept_id)
        setsect_id(sect_id)
        setdeptname(dpname)
        setdesgname(dsname)
    }

    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'summary_slno', minWidth: 10, },
        { headerName: 'Department ', field: 'dpname' },
        { headerName: 'Department Section', field: 'dpsname' },
        { headerName: 'Designation', field: 'dsname', },
        {
            headerName: 'Preview', minWidth: 100, wrapText: true,
            cellRenderer: params =>
                <PreviewIcon color='info' onClick={() =>
                    getProfile(params)} />
        },
        {
            headerName: 'Edit', minWidth: 100, wrapText: true,
            cellRenderer: params =>
                <EditIcon />
        },
    ])

    useEffect(() => {
        const JobView = async () => {
            const result = await axioslogin.get('/jobsummary/jobview')
            const { success, data, message } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                setTableData([])
            }
        }
        JobView()
    }, [])

    const toSettings = () => {
        history.push('/Home')
    }

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    {
                        flag === 1 ? <JobDescriptionList designation={designation} dept_id={dept_id} flag={flag} sect_id={sect_id} deptname={deptname} desgname={desgname} /> :

                            <Paper square elevation={0} sx={{
                                pt: 2,
                                p: 1,
                                display: 'flex',
                                flexDirection: "column"
                            }} >

                                <Paper square elevation={3} sx={{
                                    display: "flex",
                                    p: 1,
                                    alignItems: "center",
                                }}  >
                                    <Box sx={{ flex: 1 }} >
                                        <CssVarsProvider>
                                            <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                                Job Description View
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box>
                                        <CssVarsProvider>
                                            <IconButton variant="outlined" size='sm' color="danger" onClick={toSettings}>
                                                <CloseIcon color='info' />
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                </Paper>

                                <CommonAgGrid
                                    columnDefs={columnDef}
                                    tableData={tableData}
                                    sx={{
                                        height: 600,
                                        width: "100%"
                                    }}
                                    rowHeight={30}
                                    headerHeight={30} />
                            </Paper>
                    }
                </Paper>
            </Box>
        </Fragment>
    )
}

export default JobDescriptionViewTable