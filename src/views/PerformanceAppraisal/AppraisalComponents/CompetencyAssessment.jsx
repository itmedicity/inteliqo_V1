import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { CssVarsProvider, Typography } from '@mui/joy';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

const CompetencyAssessment = ({ empid }) => {

    const [compData, setCompdata] = useState([])//setting competency list
    const [tableData, setTableData] = useState([])
    const [count, setCount] = useState(0)//to render training need table
    const emp_id = useMemo(() => empid, [empid])

    //getting data from hrm_performance_comp_assessment table, 
    //employee with job description details
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/Performance/getAll/compt/${emp_id}`)
            const { data, success } = result.data
            if (success === 0) {
                setCompdata([])
            } else {
                setCompdata(data)
            }
        }
        getData()
    }, [emp_id])

    //colomun for table
    const [competeColumn] = useState([
        { headerName: 'Slno', field: 'slno', width: 50 },
        { headerName: 'Areas ', field: 'kra_desc', autoHeight: true, wrapText: true },
        { headerName: 'Expected Competency', field: 'competency_desc', autoHeight: true, wrapText: true },
        {
            headerName: 'Actual Competency', editable: true,
            valueGetter: params => {
                return params.data.actual_comp;
            },
            valueSetter: params => {
                params.data.actual_comp = params.newValue;
                return true;
            }
        },
        {
            headerName: 'Score', width: 100, editable: true,
            valueGetter: params => {
                return params.data.competency_score;
            },
            valueSetter: params => {
                if (params.newValue > 5) {
                    infoNofity('Score must be less than 5')
                } else if (params.newValue <= 5 && params.newValue > 0) {
                    params.data.competency_score = params.newValue;
                    return true;
                }
                else {
                    infoNofity("Please enter a number!")
                }
            }
        },
        {
            headerName: 'Action', width: 50, cellRenderer: params =>
                <Tooltip title="Submit" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 1 }} onClick={() => getData(params)}>
                        <AddTaskIcon color='primary' />
                    </IconButton>
                </Tooltip>
        },
    ])


    //colomun for table
    const [columnDef] = useState([
        { headerName: 'Slno', field: 'no', width: 50 },
        { headerName: 'Areas ', field: 'kra_desc', autoHeight: true, wrapText: true },
        { headerName: 'Expected Competency', field: 'competency_desc', autoHeight: true, wrapText: true },
    ])

    //tabledata for training need competency 
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/Performance/trainingneed/${emp_id}`)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setCount(0)//resetting count
            } else {
                setTableData([])
            }
        }
        getData()
    }, [count, emp_id])

    const getData = async (params) => {
        const data = params.api.getSelectedRows()
        const { assessment_slno, actual_comp, competency_score } = data[0]
        const postData = {
            actual_comp: actual_comp,
            competency_score: competency_score,
            assessment_slno: assessment_slno
        }
        //submitting score to table
        const result = await axioslogin.patch('/Performance/update/compt', postData)
        const { message, success } = result.data
        if (success === 2) {
            setCount(count + 1)//for render a function for getting training need data
            succesNofity(message)

        } else {
            warningNofity(message)
        }
    }


    return (
        <Fragment>
            <ToastContainer />
            <Paper square variant='outlined' sx={{ display: "flex", alignItems: "center", }}  >
                <Box sx={{ flex: 1, height: 35, pt: 0.5 }} >
                    <CssVarsProvider>
                        <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                            Competency Assessment
                        </Typography>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >
                <CommonAgGrid
                    columnDefs={competeColumn}
                    tableData={compData}
                    sx={{
                        height: 300,
                        width: "100%"
                    }} rowHeight={40} headerHeight={40} />
            </Paper>
            <Paper square variant='outlined' sx={{ display: "flex", alignItems: "center", }}  >
                <Box sx={{ flex: 1, height: 35, pt: 0.5, width: '100%' }} >
                    <CssVarsProvider>
                        <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                            Training Needs
                        </Typography>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={tableData}
                    sx={{
                        height: 300,
                        width: "100%"
                    }} rowHeight={30} headerHeight={30} />
            </Paper>
        </Fragment>
    )
}

export default memo(CompetencyAssessment) 