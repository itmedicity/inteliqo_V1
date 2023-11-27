import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton } from '@mui/material'
import EducationSelect from '../MasterComponents/EducationSelect'

const BoardMaster = () => {

    const [count, setCount] = useState(0);
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)
    const [education, setEducation] = useState(0)

    //Initializing
    const [type, setType] = useState({
        board_name: '',
        education_slno: '',
        board_status: false,
        create_user: ''
    })

    //Destructuring
    const { board_name, board_status } = type;

    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }, [type])

    //Insert
    const postBoardData = useMemo(() => {
        return {
            board_name,
            education_slno: education,
            board_status: board_status === true ? 1 : 0,
            create_user: employeeNumber()
        }
    }, [board_name, board_status, education])

    const updateData = useMemo(() => {
        return {
            board_name,
            education_slno: education,
            board_status: board_status === true ? 1 : 0,
            edit_user: employeeNumber(),
            board_slno: slno
        }
    }, [board_name, board_status, slno, education])

    //Form resting
    const resetForm = useMemo(() => {
        return {
            board_name: '',
            education_slno: '',
            board_status: false
        }
    }, [])

    //Form Submitting
    const submitBoard = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/boardEdu', updateData)
            const { message, success } = result.data;
            if (success === 2) {
                setType(resetForm);
                setCount(count + 1);
                succesNofity(message);
                setEducation(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/boardEdu', postBoardData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setType(resetForm);
                setEducation(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }, [flag, resetForm, count, postBoardData, updateData])

    //Get Data
    useEffect(() => {
        const getBoard = async () => {
            const result = await axioslogin.get('/boardEdu')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getBoard();
    }, [count]);


    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'board_slno' },
        { headerName: 'Board Name', field: 'board_name', filter: true, width: 150 },
        { headerName: 'Education Name', field: 'edu_desc', filter: true, width: 150 },
        { headerName: 'Status ', field: 'status', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { board_slno, board_name, board_status, education_slno } = params.data
        const frmdata = {
            board_name: board_name,
            board_status: board_status === 1 ? true : false
        }
        setType(frmdata)
        setSlno(board_slno)
        setEducation(education_slno)
    }, [])

    return (
        <MasterLayout title="Board Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Board Name'}
                                type="text"
                                size="sm"
                                name="board_name"
                                value={board_name}
                                onchange={(e) => updateBoard(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <EducationSelect value={education} setValue={setEducation} />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={board_status}
                                name="board_status"
                                onchange={(e) => updateBoard(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitBoard}
                                >
                                    <SaveIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={9} lg={9} xl={9} md={9}>
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: 400,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Grid>
                </Grid>
            </Box>
        </MasterLayout>
    )
}

export default memo(BoardMaster) 
