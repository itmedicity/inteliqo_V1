import React, { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, } from 'src/views/CommonCode/Commonfunc'
import { Checkbox, FormControlLabel, Grid, IconButton, Paper, } from '@mui/material'
import { Button, Box, CssVarsProvider, Textarea } from '@mui/joy'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action';
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment'
import JoyDesignationSelect from 'src/views/MuiComponents/JoyComponent/JoyDesignationSelect'


const Interviewmaster = () => {
    const [count, setCount] = useState(0);
    const [dept, changeDept] = useState(0);
    const [slno, setslno] = useState(0);
    const [Question, setQuestion] = useState('');
    const [designation, setdesignation] = useState(0);
    const [data, setTableData] = useState([]);
    const [optionA, setoptionA] = useState('');
    const [optionB, setoptionB] = useState('');
    const [optionC, setoptionC] = useState('');
    const [optionD, setoptionD] = useState('');
    const [Answer, setAnswer] = useState('');
    const [Mark, setMark] = useState(0);
    const [status, setstatus] = useState(false)
    const [flag, setFlag] = useState(0)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const submitInterview = useCallback((e) => {
        e.preventDefault();

        const submitFun = async () => {
            const postData = {
                dept: dept,
                Question: Question,
                status: status === true ? 1 : 0,
                optionA: optionA,
                optionB: optionB,
                optionC: optionC,
                optionD: optionD,
                Answer: Answer,
                Mark: Mark,
                designation: designation
                // create_user: employeeNumber(),

            }
            const result = await axioslogin.post('/Interview/insert', postData)
            const { message, success } = result.data;
            if (success === 1) {
                setFlag(0)
                succesNofity(message);
                changeDept(0)
                setQuestion('')
                setdesignation(0)
                setoptionA('')
                setoptionB('')
                setoptionC('')
                setoptionD('')
                setAnswer('')
                setMark(0)
                setstatus(false)
                setCount(count + 1);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }

        const updateFunc = async () => {
            const postData = {
                dept: dept,
                Question: Question,
                status: status === true ? 1 : 0,
                optionA: optionA,
                optionB: optionB,
                optionC: optionC,
                optionD: optionD,
                Answer: Answer,
                Mark: Mark,
                designation: designation,
                slno: slno
                // create_user: employeeNumber(),

            }
            const result = await axioslogin.post('/Interview/update', postData)
            const { message, success } = result.data;
            if (success === 2) {
                setCount(count + 1);
                succesNofity(message);
                setFlag(0)
                changeDept(0)
                setQuestion('')
                setdesignation(0)
                setoptionA('')
                setoptionB('')
                setoptionC('')
                setoptionD('')
                setAnswer('')
                setMark(0)
                setstatus(false)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
        if (flag === 1) {
            updateFunc()
        } else {
            submitFun()
        }

    }, [dept, Question, optionA, optionB, optionC, optionD, Answer, Mark, designation, status, count, flag, slno])

    useEffect(() => {
        const getDesigList = async () => {
            const result = await axioslogin.get('/Interview/get')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                setTableData([]);
            }
        }
        getDesigList();

    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'slno' },
        { headerName: 'Department ', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Designation ', field: 'desg_name', filter: true, width: 250 },
        { headerName: 'Question ', field: 'question', filter: true, width: 250 },
        { headerName: 'Answer ', field: 'correct_answer', filter: true, width: 150 },
        { headerName: 'Mark ', field: 'mark', filter: true, width: 150 },
        { headerName: 'Status', field: 'status', filter: true, width: 150 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])
    const getDataTable = useCallback((params) => {
        setFlag(1)
        const data = params.api.getSelectedRows()
        const { department_id, designation_no, question, choice1, choice2, choice3, choice4, correct_answer, mark, status, question_slno } = data[0]
        setdesignation(designation_no)
        changeDept(department_id)
        setQuestion(question)
        setoptionA(choice1)
        setoptionB(choice2)
        setoptionC(choice3)
        setoptionD(choice4)
        setAnswer(correct_answer)
        setMark(mark)
        setstatus(status === 1 ? true : false)
        setslno(question_slno)
    }, [])

    return (
        <>
            <CustomLayout title="Interview Question Master" displayClose={true} >
                <ToastContainer />
                <Box sx={{ width: "100%" }} >
                    <Grid container spacing={1}>
                        <Grid item xl={3} lg={2}>
                            <Paper square elevation={0} sx={{ p: 1 }}  >
                                <Box sx={{ width: "100%", pt: 1 }}>
                                    <JoyDepartment getDept={changeDept} deptValue={dept} />
                                </Box>
                                <Box sx={{ width: "100%", pt: 1, }}>
                                    <JoyDesignationSelect desgValue={designation}
                                        getDesg={setdesignation} />
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <Textarea
                                        name="Outlined"
                                        placeholder="Interview Question here..."
                                        minRows={3}
                                        variant="outlined"
                                        value={Question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <Textarea
                                        name="Outlined"
                                        placeholder="option A"
                                        variant="outlined"
                                        value={optionA}
                                        onChange={(e) => setoptionA(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <Textarea
                                        name="Outlined"
                                        placeholder="option B"
                                        variant="outlined"
                                        value={optionB}
                                        onChange={(e) => setoptionB(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <Textarea
                                        name="Outlined"
                                        placeholder="option C"
                                        variant="outlined"
                                        value={optionC}
                                        onChange={(e) => setoptionC(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <Textarea
                                        name="Outlined"
                                        placeholder="option D"
                                        variant="outlined"
                                        value={optionD}
                                        onChange={(e) => setoptionD(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <Textarea
                                        name="Outlined"
                                        placeholder="Correct Answer"
                                        variant="outlined"
                                        value={Answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ mt: .5 }}>
                                    <Textarea
                                        name="Outlined"
                                        placeholder="Mark"
                                        variant="outlined"
                                        value={Mark}
                                        onChange={(e) => setMark(e.target.value)}
                                    />
                                </Box>

                                <Box sx={{ width: "100%", pt: 1 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="desg_status"
                                                color="primary"
                                                value={status}
                                                checked={status}
                                                className="ml-2"
                                                onChange={(e) => setstatus(e.target.checked)}
                                            />
                                        }
                                        label=" Status"
                                    />
                                </Box>
                                <Box sx={{ px: 0.5, mt: 0.9 }}>
                                    <CssVarsProvider>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            size="md"
                                            color="primary"
                                            onClick={submitInterview}
                                        >
                                            <SaveIcon />
                                        </Button>
                                    </CssVarsProvider>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={9} lg={9} xl={9} md={9}>
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={data}
                                sx={{
                                    height: 500,
                                    width: "100%",
                                    mt: 2,

                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        </Grid>
                    </Grid>
                </Box>

            </CustomLayout>
        </>
    )
}

export default memo(Interviewmaster)