import { Box, Paper } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PageLayoutCloseOnly from '../CommonCode/PageLayoutCloseOnly'
import { axioslogin } from '../Axios/Axios';
import { Checkbox } from '@mui/material'
import AnnualAppraisalTable from './AnnualAppraisalTable';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CusIconButton from 'src/views/Component/CusIconButton'
import moment from 'moment';
import { errorNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc';
import { CssVarsProvider, Typography } from '@mui/joy';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CommonAgGrid from '../Component/CommonAgGrid';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CommonCheckBox from '../Component/CommonCheckBox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';

const AnnualAppraisalList = () => {
    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const [pb, setpb] = useState(false)
    const [ap, setap] = useState(false)
    const [value, setValue] = useState([]);
    const [id, setid] = useState([])
    const [appraisal, setappraisal] = useState(false)

    const RedirectToHome = () => {
        history.push(`/Home`)
    }

    /** appraisal pending checkbox*/
    const getValue2 = useCallback((e) => {
        if (e.target.checked === true) {
            setappraisal(true)
        }
        else {
            setappraisal(false)
        }
    })

    /** columns for table */
    const [columnDef] = useState([
        { headerName: 'ID', field: 'em_id', wrapText: true, minWidth: 5, },
        { headerName: 'Emp No ', field: 'em_no', wrapText: true, minWidth: 5, },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 350, },
        {
            headerName: 'Action',
            cellRenderer: params => <TaskAltRoundedIcon color='info' />
        },
    ])

    /** list permanent employees */
    useEffect(() => {
        const aprobationEndList = async () => {
            const result = await axioslogin.get('/Performance/annualdata')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setValue(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        aprobationEndList()
    }, [])

    /** mapping em_id of employees into an array */
    // useEffect(() => {
    //     const arr = value && value.map((val, index) => {
    //         return val.em_id
    //     })
    //     setid(arr)
    // }, [value])
    const [click, setClick] = useState(0)
    const [submit, setSubmit] = useState([])

    const addtoProcess = useCallback((e) => {
        e.preventDefault();
        setClick(1)
    }, [])

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
                                    Employee Annual End List
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' color="danger" onClick={RedirectToHome}>
                                    <CloseIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                    }} >
                        <Box sx={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "row"
                        }}>
                            <Box sx={{
                                display: "flex", p: 2
                            }}>
                                <CommonCheckBox
                                    name="appraisal"
                                    value={appraisal}
                                    checked={appraisal}
                                    onChange={(e) => getValue2(e)}
                                />
                            </Box>
                            <Box sx={{
                                display: "flex", p: 1, pt: 1.5
                            }}>
                                <CssVarsProvider>
                                    <Typography>
                                        Appraisal Pending
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: "flex",
                        }}>
                            <Box sx={{
                                display: "flex", p: 1,
                            }}>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='sm' color="primary" onClick={RedirectToHome}>
                                        <AddTaskIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{
                                display: "flex", p: 1.5
                            }}>
                                <CssVarsProvider>
                                    <Typography>
                                        Submit All
                                    </Typography>
                                </CssVarsProvider>
                            </Box>

                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{
                        pt: 1,
                        mt: 0.5,
                        display: 'flex',
                        flexDirection: "column"
                    }} >
                        {
                            appraisal === true ? null : <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tableData}
                                sx={{
                                    height: 600,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        }
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default AnnualAppraisalList
