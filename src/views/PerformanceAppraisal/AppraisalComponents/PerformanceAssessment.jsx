import { Box, CircularProgress, IconButton, Paper, Tooltip } from '@mui/material'
import React, { Fragment, memo, Suspense, useMemo, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import AddTaskIcon from '@mui/icons-material/AddTask';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useEffect } from 'react';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CssVarsProvider, Typography } from '@mui/joy';
const Progress = () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center" }} >
            <CircularProgress color="secondary" size={30} />
        </Box>)
};

const GradeTable = React.lazy(() => import('src/views/PerformanceAppraisal/AppraisalComponents/PerformanceGradeScale'))

const PerformanceAssessment = ({ empid }) => {

    const emp_id = useMemo(() => empid, [empid])
    const [tabledata, setTableData] = useState([])

    const [given_score, setGiven_score] = useState(0)
    const [grade, setGrade] = useState('')
    const [description, setDescription] = useState('')
    const [flag, setFlag] = useState(0)

    const [dataArray, setDataArray] = useState({})
    const [scoreArray, setScoreArray] = useState([])
    const [perfscore, setPerfScore] = useState(0)

    //getting data from hrm_perfromance_assessment table, 
    //employee with job description details
    useEffect(() => {
        const getData = async () => {
            const result = await axioslogin.get(`/Performance/Perfdata/${emp_id}`)
            const { data, success } = result.data
            if (success === 0) {
                setTableData([])
            } else {
                setTableData(data)
            }
        }
        getData(emp_id)

        const ScoreDetl = async () => {
            const result = await axioslogin.get(`/Performance/Score/details/${emp_id}`)
            const { data, success } = result.data
            if (success === 1) {
                console.log(data);
                const { given_score, performance_score, performance_grade, performance_category } = data[0]
                setGiven_score(given_score === null ? 0 : given_score)
                setPerfScore(performance_score === null ? 0 : performance_score)
                setGrade(performance_grade === null ? 'NIL' : performance_grade)
                setDescription(performance_category === null ? 'NIL' : performance_category)
            } else {
                setGiven_score(0)
                setPerfScore(0)
                setGrade('NIL')
                setDescription('NIL')
            }
        }
        ScoreDetl(emp_id)
    }, [emp_id])

    //table column
    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', width: 50, },
        { headerName: ' Key Result Areas ', field: 'kra_desc', autoHeight: true, wrapText: true },
        { headerName: ' Key Performance Indicators', field: 'kpi', autoHeight: true, wrapText: true },
        {
            headerName: 'SCORE', editable: true,
            width: 100,
            valueGetter: params => {
                return params.data.kpi_score;
            },
            valueSetter: params => {
                if (params.newValue > 5) {
                    infoNofity('Score must be less than 5')
                } else if (params.newValue <= 5 && params.newValue > 0) {
                    params.data.kpi_score = params.newValue;
                    return true;
                }
                else {
                    infoNofity("Please enter a number!")
                }
            },
        },
        {
            headerName: 'JUSTIFICATION OF SCORE', editable: true,
            valueGetter: params => {
                return params.data.justitfication_score;
            },
            valueSetter: params => {
                params.data.justitfication_score = params.newValue;
                return true;
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


    const getData = async (params) => {
        //to get row selected data as object
        const data = params.data
        setDataArray(data)
    }

    useEffect(() => {
        if (Object.keys(dataArray).length > 0) {
            //destructuring object
            const { p_assessment_slno, kpi_score } = dataArray
            const obje = {
                p_assessment_slno: p_assessment_slno,
                kpi_score: kpi_score
            }
            //adding new entered score to existing array(tabledata) 
            const result = tabledata.map((item) => item.p_assessment_slno === obje.p_assessment_slno ? { ...item, ...obje } : item);
            setScoreArray(result)
        } else {
            return null
        }
    }, [dataArray, tabledata])

    //total score--> no. of kpi's * 5
    const max_score = 5 * tabledata.length

    useEffect(() => {
        if (Object.keys(scoreArray).length > 0) {
            //to find sum value each entered score
            const v = scoreArray.map(item => item.kpi_score).reduce((prev, next) => Number(prev) + Number(next));
            //performance score of total kpi score
            const performance_score = v / max_score * 100
            const perf_score = (Math.round(performance_score * 100) / 100).toFixed(2);
            setFlag(1)
            //finding grade and description
            if (perf_score === 100) {
                setGrade('O')
                setDescription('Key Performer')
            } else if (perf_score < 100 && perf_score > 91) {
                setGrade('A')
                setDescription('Star Performer')
            } else if (perf_score < 91 && perf_score > 81) {
                setGrade('B')
                setDescription('Good Performer')
            } else if (perf_score < 81 && perf_score > 71) {
                setGrade('C')
                setDescription('Potential Performer')
            } else {
                setGrade('D')
                setDescription('General Performer')
            }
            setGiven_score(v)
            setPerfScore(perf_score)
        }
    }, [scoreArray, max_score])



    const SaveData = async () => {
        const postData = {
            max_score: max_score,
            given_score: given_score,
            performance_score: perfscore,
            performance_grade: grade,
            performance_category: description,
            em_id: emp_id
        }
        //updating score and justification to the table
        const result = await axioslogin.patch('/Performance/update/performance', scoreArray)
        const { message, success } = result.data
        if (success === 1) {
            //checking score detils is already submitted or not
            const result = await axioslogin.get(`/Performance/Score/details/${emp_id}`)
            const { success } = result.data
            if (success === 1) {
                //if present, updating that filed with empid
                const result = await axioslogin.patch('/Performance/update/score', postData)
                const { message, success } = result.data
                if (success === 2) {
                    succesNofity(message)
                } else {
                    warningNofity(message)
                }
            } else {
                //if not, adding data as new entry to the table
                const result = await axioslogin.post('/Performance/createScore', postData)
                const { message, success } = result.data
                if (success === 1) {
                    succesNofity(message)
                } else {
                    warningNofity(message)
                }
            }
        } else {
            errorNofity(message)
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <Paper square variant='outlined' sx={{ display: "flex", alignItems: "center", }}  >
                <Box sx={{ flex: 1, height: 35, pt: 0.5 }} >
                    <CssVarsProvider>
                        <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                            Perfomance Assessment
                        </Typography>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={tabledata}
                    sx={{
                        height: 300,
                        width: "100%"
                    }} rowHeight={40} headerHeight={40}
                //rowStyle={rowStyle} 
                //getRowStyle={getRowStyle}
                />
            </Paper>

            <Suspense fallback={<Progress />} >
                <GradeTable />
            </Suspense>

            <Paper square variant='outlined' sx={{ display: "flex", alignItems: "center", }}  >
                <Box sx={{ flex: 1 }} >
                    <CssVarsProvider>
                        <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                            Score Details
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box sx={{ pl: 1 }}>
                    <IconButton variant="outlined" size='sm' onClick={SaveData}>
                        <AddTaskIcon color='primary' />
                    </IconButton>
                </Box>
            </Paper>

            <Paper square variant='outlined' sx={{ p: 1, display: "flex", flexDirection: "column" }} >
                <Box sx={{ display: "flex", width: "50%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5 }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">Maximum Score</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, }} variant="outlined" >
                        <CssVarsProvider>
                            <Typography level="body1">{max_score}</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%", }} >
                    <Box sx={{ display: "flex", width: "50%" }} >
                        <Box sx={{ display: "flex", px: 0.5, pt: 0.5, width: "50%" }} variant="outlined" >
                            <CssVarsProvider>
                                <Typography level="body1">Given Score</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ px: 0.5, width: "20%" }} >

                            <Box border={1} sx={{ display: "flex", flex: 1, px: 0.5 }}  >
                                <CssVarsProvider>
                                    <Typography level="body1">{given_score}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "50%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5 }}  >
                        <CssVarsProvider>
                            <Typography level="body1">Performance Score</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5 }}  >
                        <CssVarsProvider>
                            <Typography level="body1">{perfscore}%</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "50%" }} >
                    <Box sx={{ display: "flex", flex: 1, px: 0.5 }}  >
                        <CssVarsProvider>
                            <Typography level="body1">Performance Grade</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5 }}  >
                        <CssVarsProvider>
                            <Typography level="body1">{flag === 1 ? grade : grade}</Typography>
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", width: "50%", }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, }}  >
                            <CssVarsProvider>
                                <Typography level="body1">Performance Category</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, }}  >
                            <CssVarsProvider>
                                <Typography level="body1">{flag === 1 ? description : description}</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>
            </Paper>

        </Fragment>
    )
}

export default memo(PerformanceAssessment) 