import { Box, Paper } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PageLayoutCloseOnly from '../CommonCode/PageLayoutCloseOnly'
import { axioslogin } from '../Axios/Axios';
import { Checkbox } from '@mui/material'
import TrainingEndTable from './TrainingEndTable';
import CusIconButton from 'src/views/Component/CusIconButton'
import AddTaskIcon from '@mui/icons-material/AddTask';
import moment from 'moment';
import { errorNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc';
import { useDispatch } from 'react-redux'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CommonAgGrid from '../Component/CommonAgGrid';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CommonCheckBox from '../Component/CommonCheckBox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';

const TrainingEnd = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [tableData, setTableData] = useState([])
    const [appraisal, setappraisal] = useState(false)
    const [value, setValue] = useState([]);


    const [id, setid] = useState([])
    const [check, setcheck] = useState(0)

    const RedirectToHome = () => {
        history.push(`/Home`)
    }

    const [columnDef] = useState([
        { headerName: 'ID', field: 'em_id', wrapText: true, minWidth: 5, },
        { headerName: 'Emp No ', field: 'em_no', },
        { headerName: 'Name ', field: 'em_name', },
        { headerName: 'Dept Name ', field: 'dept_name', },
        { headerName: 'Designation ', field: 'desg_name', },
        { headerName: 'Date of joining ', field: 'em_doj', },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 250, },
        { headerName: 'Training End Date', field: 'training_end', },
        {
            headerName: 'Action',
            cellRenderer: params => <TaskAltRoundedIcon color='info' />
        },
    ])

    const getValue2 = useCallback((e) => {
        if (e.target.checked === true) {
            setappraisal(true)
        }
        else {
            setappraisal(false)
        }
    })
    /** list training end employees, 3 month & 6 month */
    useEffect(() => {
        const trainingEndList = async () => {
            const result = await axioslogin.get('/Performance/trainingdata')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setValue(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        trainingEndList()
    }, [])

    /** mapping em_id of employees into an array */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.em_id
        })
        setid(arr)
    }, [value])

    const [click, setClick] = useState(0)
    const [submit, setSubmit] = useState([])

    useEffect(() => {
        if (click !== 0) {
            value.forEach(element => {
                const { em_id, em_no, sect_id, incharge, hod } = element
                const getallemployeeRights = async (sect_id, em_id, em_no) => {

                    /** fetching level3 hierarchy dept section for checking 
                                * selected employee dept section is present or not */

                    const result = await axioslogin.get(`/Performance/idonly`)
                    const { data } = result.data;
                    var arr = data.map(data => (data.level2_sect_id));


                    /** fetching level2 hierarchy dept section for checking 
                                 * selected employee dept section is present or not */
                    const level2ID = await axioslogin.get(`/HierarchyLevel/data`)
                    const { datas } = level2ID.data;
                    var l2ID = datas.map(datas => (datas.sect_id))
                    if (arr.indexOf(sect_id) !== -1) {
                        console.log("level3");
                        const result = await axioslogin.get(`/Performance/level2hier/${sect_id}`)
                        const { data } = result.data;
                        const { authorization_hod, authorization_incharge, highlevel_slno } = data[0]
                        const today = new Date();
                        const tdyformat = moment(today).format('YYYY-MM-DD')
                        if (highlevel_slno === 1) {
                            console.log("1");
                            const savedata1 = {
                                appraisal_start_date: tdyformat,
                                em_id: em_id,
                                em_no: em_no,
                                appraisal_type: "T",
                                incharge_required: authorization_incharge,
                                hod_required: authorization_hod,
                                ed_required: 1,
                                md_required: 0,
                                trustiee_required: 0,
                                ceo_required: 0
                            }
                            const result = await axioslogin.post('/Performance/create', savedata1)
                            setSubmit(savedata1)
                            console.log(savedata1);
                        }
                        else if (highlevel_slno === 2) {
                            console.log("2");
                            const savedata2 = {
                                appraisal_start_date: tdyformat,
                                em_id: em_id,
                                em_no: em_no,
                                appraisal_type: "T",
                                incharge_required: authorization_incharge,
                                hod_required: authorization_hod,
                                ed_required: 0,
                                md_required: 1,
                                trustiee_required: 0,
                                ceo_required: 0
                            }
                            const result = await axioslogin.post('/Performance/create', savedata2)
                            console.log(savedata2);
                        }
                        else {
                            console.log("3");
                            const savedata3 = {

                                appraisal_start_date: tdyformat,
                                em_id: em_id,
                                em_no: em_no,
                                appraisal_type: "T",
                                incharge_required: authorization_incharge,
                                hod_required: authorization_hod,
                                ed_required: 0,
                                md_required: 0,
                                trustiee_required: 1,
                                ceo_required: 0
                            }
                            console.log(savedata3);
                            const result = await axioslogin.post('/Performance/create', savedata3)
                        }
                    }
                    else {
                        if (l2ID.indexOf(sect_id) !== -1) {
                            console.log("level2");
                            const result = await axioslogin.get(`/Performance/level1/${sect_id}`)
                            const { data } = result.data;
                            const { authorization_hod, authorization_incharge, highlevel_slno, } = data[0]
                            const today = new Date();
                            const tdyformat = moment(today).format('YYYY-MM-DD')
                            if (highlevel_slno === 1) {
                                console.log("4");
                                const savedata4 = {
                                    appraisal_start_date: tdyformat,
                                    em_id: em_id,
                                    em_no: em_no,
                                    appraisal_type: "T",
                                    incharge_required: authorization_incharge,
                                    hod_required: authorization_hod,
                                    ed_required: 1,
                                    md_required: 0,
                                    trustiee_required: 0,
                                    ceo_required: 0
                                }
                                console.log(savedata4);
                                const result = await axioslogin.post('/Performance/create', savedata4)
                            }
                            else if (highlevel_slno === 2) {
                                console.log("5");
                                const savedata5 = {
                                    appraisal_start_date: tdyformat,
                                    em_id: em_id,
                                    em_no: em_no,
                                    appraisal_type: "T",
                                    incharge_required: authorization_incharge,
                                    hod_required: authorization_hod,
                                    ed_required: 0,
                                    md_required: 1,
                                    trustiee_required: 0,
                                    ceo_required: 0
                                }
                                console.log(savedata5);
                                const result = await axioslogin.post('/Performance/create', savedata5)
                            }
                            else {
                                console.log("6");
                                const savedata6 = {
                                    appraisal_start_date: tdyformat,
                                    em_id: em_id,
                                    em_no: em_no,
                                    appraisal_type: "T",
                                    incharge_required: authorization_incharge,
                                    hod_required: authorization_hod,
                                    ed_required: 0,
                                    md_required: 0,
                                    trustiee_required: 1,
                                    ceo_required: 0
                                }
                                console.log(savedata6);
                                const result = await axioslogin.post('/Performance/create', savedata6)
                            }
                        }
                        else {
                            var msg = "No Rights to the Departments!!"
                            return msg
                        }
                    }
                }
                const submitHODAppraisal = async () => {
                    /** fetching employee department section hirarchy details */
                    const result = await axioslogin.get(`/Performance/level1/${sect_id}`)
                    const { data } = result.data;
                    const { highlevel_slno } = data[0]
                    const today = new Date();
                    const tdyformat = moment(today).format('YYYY-MM-DD')
                    if (highlevel_slno === 1) {
                        console.log("7");
                        const savedata7 = {
                            appraisal_start_date: tdyformat,
                            em_id: em_id,
                            em_no: em_no,
                            appraisal_type: "T",
                            incharge_required: 0,
                            hod_required: 0,
                            ed_required: 1,
                            md_required: 0,
                            trustiee_required: 0,
                            ceo_required: 0
                        }
                        console.log(savedata7);
                        const result = await axioslogin.post('/Performance/create', savedata7)
                    }
                    else if (highlevel_slno === 2) {
                        console.log("8");
                        const savedata8 = {
                            appraisal_start_date: tdyformat,
                            em_id: em_id,
                            em_no: em_no,
                            appraisal_type: "T",
                            incharge_required: 0,
                            hod_required: 0,
                            ed_required: 0,
                            md_required: 1,
                            trustiee_required: 0,
                            ceo_required: 0
                        }
                        console.log(savedata8);
                        const result = await axioslogin.post('/Performance/create', savedata8)
                    }
                    else {
                        console.log("9");
                        const savedata9 = {
                            appraisal_start_date: tdyformat,
                            em_id: em_id,
                            em_no: em_no,
                            appraisal_type: "T",
                            incharge_required: 0,
                            hod_required: 0,
                            ed_required: 0,
                            md_required: 0,
                            trustiee_required: 1,
                            ceo_required: 0
                        }
                        console.log(savedata9);
                        const result = await axioslogin.post('/Performance/create', savedata9)
                    }
                }
                if (sect_id !== 0 && incharge !== 1 & hod !== 1) {
                    getallemployeeRights(sect_id, em_id, em_no)
                }
                else if (sect_id !== 0 && incharge === 1 & hod === 1) {
                    submitHODAppraisal()
                }
                else {
                    warningNofity("No Rights to the Departments!!")
                }
            })
            succesNofity("Appraisal Submitted!!")
        }

    }, [click])

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
                                    Employee Training End List
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
                    <Paper square elevation={3} sx={{
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

export default TrainingEnd