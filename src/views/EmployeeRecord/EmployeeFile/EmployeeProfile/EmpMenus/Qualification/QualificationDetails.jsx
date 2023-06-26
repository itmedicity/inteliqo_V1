// import { DatePicker } from '@mui/lab'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, { Fragment, useState, useContext, useEffect, memo, useCallback } from 'react'
import { useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import CourseSelection from 'src/views/CommonCode/CourseSelection'
import EducationSelection from 'src/views/CommonCode/EducationSelection'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import RegistrationTypeSelection from 'src/views/CommonCode/RegistrationTypeSelection'
import SpecializationSelection from 'src/views/CommonCode/SpecializationSelection'
import { UniversitySelection } from 'src/views/CommonCode/UniversitySelection'
import moment from 'moment';
import TextInput from 'src/views/Component/TextInput'
// import { TextField } from '@material-ui/core'
import BoardMastSelection from 'src/views/CommonCode/BoardMastSelection'
import { format } from 'date-fns'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import { Box, Paper, TextField } from '@mui/material'
import QualificationAgGridTable from './QualificationAgGridTable'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import IconButton from '@mui/joy/IconButton'
import { useMemo } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const QualificationDetails = () => {

    const classes = useStyles();
    //const history = useHistory();
    const { id, no } = useParams();
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id, } = employeedetails
    const [unidisable, setunidisable] = useState(false)
    const [boarddisable, setBoarddisable] = useState(false)
    const [coursedisable, setcoursedisable] = useState(false)
    const [specdisable, setspecdisable] = useState(false)
    const [regTypedisable, setregTypedisable] = useState(false)
    const [regNodisable, setregNodisable] = useState(false)
    const [count, setcount] = useState(0);
    const [flag, setflag] = useState(0)
    const [slno, setslno] = useState(0)

    const { selectEducation, selectCourse, selectSpec, selectUniversity, updateUniversity, updatereg,
        selectBoard, selectreg, updateBoard, updateSpec, updateEducation, updateCourse } = useContext(PayrolMasterContext)
    const [year, setYear] = useState(format(new Date(), "yyyy-MM-dd"));
    const [expyear, setExpyear] = useState(format(new Date(), "yyyy-MM-dd"));
    const [chellan, setChellan] = useState(format(new Date(), "yyyy-MM-dd"));
    //Initializing
    const [qualification, setQualification] = useState({
        em_education: '',
        em_course: '',
        em_specialization: '',
        em_univ_institute: '',
        em_board: '',
        em_year: '',
        em_mark_grade: '',
        em_reg_type: '',
        em_reg_no: '',
        em_chellan: '',
        pass_fail: true
    })

    //destructuring
    const { em_mark_grade, em_reg_no, em_chellan, pass_fail } = qualification

    const updateQualification = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setQualification({ ...qualification, [e.target.name]: value })
    }

    //Year update function
    const updateYear = (val) => {
        setYear(val)
    }
    const updateexpdate = (e) => {
        var val = format(new Date(e.target.value), "yyyy-MM-dd")
        setExpyear(val)
    }

    const updatechellandate = (e) => {
        var val = format(new Date(e.target.value), "yyyy-MM-dd")
        setChellan(val)
    }

    const qual_year = moment(year).format('YYYY')

    useEffect(() => {
        if (selectEducation === 4) {
            setunidisable(true)
            setBoarddisable(false)
            setcoursedisable(false)
            setspecdisable(false)
            setregTypedisable(true)
            setregNodisable(true)
        }
        else if (selectEducation === 5) {
            setBoarddisable(false)
            setunidisable(true)
            setcoursedisable(true)
            setspecdisable(true)
            setregTypedisable(true)
            setregNodisable(true)
        } else {
            setcoursedisable(false)
            setspecdisable(false)
            setunidisable(false)
            setBoarddisable(true)
            setregTypedisable(false)
            setregNodisable(false)
        }
    }, [selectEducation])

    //Post data
    const postData = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: selectEducation !== 0 ? selectEducation : null,
            em_course: selectCourse !== 0 ? selectCourse : null,
            em_specialization: selectSpec !== 0 ? selectSpec : null,
            em_univ_institute: selectUniversity !== 0 ? selectUniversity : null,
            em_board: selectBoard !== 0 ? selectBoard : null,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            em_reg_type: selectreg,
            em_reg_no: em_reg_no,
            create_user: em_id,
            em_exp_date: em_reg_no === "" ? null : expyear,
            em_chellan: em_chellan,
            em_chellan_exp_date: em_chellan === "" ? null : chellan,
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [id, no, selectEducation, selectCourse, selectSpec, selectUniversity, selectBoard, qual_year, em_mark_grade, em_reg_no, em_id, em_chellan, expyear, chellan, pass_fail])

    const postData5 = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: selectEducation,
            em_course: selectCourse !== 0 ? selectCourse : null,
            em_specialization: selectSpec !== 0 ? selectSpec : null,
            em_univ_institute: selectUniversity !== 0 ? selectUniversity : null,
            em_board: selectBoard,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            create_user: em_id,
            pass_fail: pass_fail === true ? 0 : 1

        }
    }, [id, no, selectEducation, selectCourse, selectSpec, selectUniversity, selectBoard, qual_year, em_mark_grade, em_id, pass_fail])

    const postData4 = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: selectEducation,
            em_course: selectCourse !== 0 ? selectCourse : null,
            em_specialization: selectSpec !== 0 ? selectSpec : null,
            em_univ_institute: selectUniversity !== 0 ? selectUniversity : null,
            em_board: selectBoard,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            create_user: em_id,
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [id, no, selectEducation, selectCourse, selectSpec, selectUniversity, selectBoard, qual_year, em_mark_grade, em_id, pass_fail])

    //Form reset
    const resetForm = {
        em_education: '',
        em_course: '',
        em_specialization: '',
        em_univ_institute: '',
        em_board: '',
        em_year: '',
        em_mark_grade: '',
        em_reg_type: '',
        em_reg_no: '',
        em_chellan: '',
        pass_fail: true
    }

    const reset = () => {
        updateBoard(0)
        updateSpec(0)
        updateEducation(0)
        updateCourse(0)
        updateUniversity(0)
        updatereg(0)
        setExpyear(new Date())
        setYear(new Date())
        setChellan(new Date())
    }

    const getDataTable = useCallback((params) => {
        setflag(1)
        const data = params.api.getSelectedRows()
        const { em_education, em_course, em_specialization, em_univ_institute,
            em_board, em_year, em_mark_grade, em_reg_type, em_reg_no, em_exp_date,
            em_chellan, em_chellan_exp_date, pass_fail, emqual_slno } = data[0]

        const frmdata = {
            em_year: em_year,
            em_mark_grade: em_mark_grade === null ? 0 : em_mark_grade,
            em_reg_no: em_reg_no === null ? 0 : em_reg_no,
            em_chellan: em_chellan === null ? 0 : em_chellan,
            pass_fail: pass_fail === 0 ? true : false
        }
        setQualification(frmdata)
        updateEducation(em_education)
        updateCourse(em_course === null ? 0 : em_course)
        updateSpec(em_specialization === null ? 0 : em_specialization)
        updateUniversity(em_univ_institute === null ? 0 : em_univ_institute)
        updateBoard(em_board === null ? 0 : em_board)
        updatereg(em_reg_type === null ? 0 : em_reg_type)
        const year = new Date(em_year, 6, 2)
        setYear(year)
        setslno(emqual_slno)
        em_exp_date === null ? setExpyear(new Date()) : setExpyear(format(new Date(em_exp_date), "yyyy-MM-dd"))
        em_chellan_exp_date === null ? setChellan(new Date()) : setChellan(format(new Date(em_chellan_exp_date), "yyyy-MM-dd"))
        if (em_education === 4) {
            setunidisable(true)
            setBoarddisable(false)
            setcoursedisable(false)
            setspecdisable(false)
            setregTypedisable(true)
            setregNodisable(true)
        }
        else if (em_education === 5) {
            setBoarddisable(false)
            setunidisable(true)
            setcoursedisable(true)
            setspecdisable(true)
            setregTypedisable(true)
            setregNodisable(true)
        } else {
            setcoursedisable(false)
            setspecdisable(false)
            setunidisable(false)
            setBoarddisable(true)
            setregTypedisable(false)
            setregNodisable(false)
        }
    })
    const updatepostData = useMemo(() => {
        return {
            em_education: selectEducation,
            em_course: selectCourse,
            em_specialization: selectSpec,
            em_univ_institute: selectUniversity,
            em_board: selectBoard !== 0 ? selectBoard : null,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            em_reg_type: selectreg !== 0 ? selectreg : null,
            em_reg_no: em_reg_no,
            edit_user: em_id,
            em_exp_date: em_reg_no === "" ? null : expyear,
            em_chellan: em_chellan,
            em_chellan_exp_date: em_chellan === "" ? null : chellan,
            emqual_slno: slno,
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [selectEducation, selectCourse, selectSpec, selectUniversity, selectBoard, qual_year, em_mark_grade, selectreg, em_reg_no, em_id, pass_fail])

    const updatepostdata5 = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: selectEducation,
            em_course: selectCourse !== 0 ? selectCourse : null,
            em_specialization: selectSpec !== 0 ? selectSpec : null,
            em_univ_institute: selectUniversity !== 0 ? selectUniversity : null,
            em_board: selectBoard,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            em_reg_type: selectreg !== 0 ? selectreg : null,
            em_reg_no,
            edit_user: em_id,
            emqual_slno: slno,
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [id, no, selectEducation, selectCourse, selectSpec, selectUniversity, selectBoard, qual_year, em_mark_grade, selectreg, slno, pass_fail])

    const updatepostdata4 = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: selectEducation,
            em_course: selectCourse !== 0 ? selectCourse : null,
            em_specialization: selectSpec !== 0 ? selectSpec : null,
            em_univ_institute: selectUniversity !== 0 ? selectUniversity : null,
            em_board: selectBoard,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            em_reg_type: selectreg !== 0 ? selectreg : null,
            em_reg_no,
            edit_user: em_id,
            emqual_slno: slno,
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [id, no, selectEducation, selectCourse, selectSpec, selectUniversity, selectBoard, qual_year, em_mark_grade, selectreg, em_id, slno, pass_fail])

    //Form Submitting
    const submitQualification = useCallback((e) => {
        e.preventDefault();
        const submitdata = async () => {
            if (selectEducation === 5) {
                const result = await axioslogin.post('/qualify', postData5)
                const { message, success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    setcount(count + 1)
                    setQualification(resetForm);
                    reset()
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            } else if (selectEducation === 4) {
                const result = await axioslogin.post('/qualify', postData4)
                const { message, success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    setcount(count + 1)
                    setQualification(resetForm);
                    reset()
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            } else {
                const result = await axioslogin.post('/qualify', postData)
                const { message, success } = result.data;
                if (success === 1) {
                    succesNofity(message);
                    setcount(count + 1)
                    setQualification(resetForm);
                    reset()
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            }
        }
        const submitupdatedata = async () => {
            if (selectEducation === 5) {
                const result = await axioslogin.patch('/qualify', updatepostdata5)
                const { message, success } = result.data;
                if (success === 2) {
                    setQualification(resetForm);
                    setcount(count + 1)
                    reset();
                    //history.push(`/Home/EmployeeQualification/${id}/${no}`);
                    succesNofity(message);
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            } else if (selectEducation === 4) {
                const result = await axioslogin.patch('/qualify', updatepostdata4)
                const { message, success } = result.data;
                if (success === 2) {
                    setQualification(resetForm);
                    setcount(count + 1)
                    reset();
                    //history.push(`/Home/EmployeeQualification/${id}/${no}`);
                    succesNofity(message);
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            }
            else {
                const result = await axioslogin.patch('/qualify', updatepostData)
                const { message, success } = result.data;
                if (success === 2) {
                    setQualification(resetForm);
                    reset();
                    setcount(count + 1)
                    //history.push(`/Home/EmployeeQualification/${id}/${no}`);
                    succesNofity(message);
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            }
        }
        if (flag === 0) {
            submitdata(postData5, postData, postData4)
        }
        else {
            submitupdatedata(updatepostData, updatepostdata4, updatepostdata5)
        }

    }, [postData, postData4, postData5, updatepostData, updatepostdata4, updatepostdata5])

    //Back to home page
    // const toSettings = () => {
    //     //history.push(`/Home/Profile/${id}/${no}`);
    //     history.push(`/Home/Prfle/${id}/${no}`)
    // }


    return (

        <Fragment>
            <Box sx={{
                width: "100%",
                height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 },
                //height: { xxl: 800, xl: 750, lg: 500, md: 500, sm: 500, xs: 350 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    {/* Heading Section Start */}
                    <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Qualification Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    {/* Heading Section End */}

                    {/* Main Section Start */}
                    <Paper square elevation={3} sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" } }} >
                        <Box sx={{ display: "flex", flexDirection: "column", flex: 1, p: 1 }}>
                            {/* First Row start */}
                            <Box sx={{ display: "flex", flexDirection: "row", width: '100%', }}>
                                <Box sx={{ width: '20%' }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Education
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <EducationSelection style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                                <Box sx={{ width: '20%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary">
                                            Course
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <CourseSelection
                                        disable={coursedisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                            </Box>
                            {/* First Row end */}

                            {/* Second Row Start */}
                            <Box sx={{ display: "flex", flexDirection: "row", width: '100%', }}>
                                <Box sx={{ width: '20%' }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Specialization
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%', pt: 0.5 }} >
                                    <SpecializationSelection
                                        disable={specdisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                                <Box sx={{ width: '20%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            University
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <UniversitySelection
                                        disable={unidisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                            </Box>
                            {/* Second Row End */}

                            {/* Third Row Start */}
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Box sx={{ width: '20%' }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Board
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <BoardMastSelection
                                        disable={boarddisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                                <Box sx={{ width: '20%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Year
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%', pt: 1 }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['year']}
                                            name="year"
                                            value={year}
                                            minDate={new Date('1990')}
                                            maxDate={new Date('2022')}
                                            onChange={(e) => { updateYear(e) }}
                                            InputProps={{
                                                className: classes.customInputFeild
                                            }}
                                            renderInput={(params) => <TextField {...params}
                                                fullWidth
                                                size="small"
                                                name="datepick"
                                                autoComplete="off"
                                                variant="outlined"
                                                helperText={null} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            {/* Third Row End */}
                            {/* Fourth Row Start */}
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Box sx={{ width: '20%', pt: 0.5 }} >
                                    <CommonCheckBox
                                        name="pass_fail"
                                        //value={pass_fail}
                                        checked={pass_fail}
                                        onChange={(e) => updateQualification(e)}
                                        label="Pass or Fail"
                                    />
                                </Box>
                                <Box sx={{ width: '30%', pt: 0.5 }}>
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Mark/Grade"
                                        value={em_mark_grade}
                                        name="em_mark_grade"
                                        changeTextValue={(e) => updateQualification(e)}

                                    />
                                </Box>
                                <Box sx={{ width: '20%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Registration Type
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%', }} >
                                    <RegistrationTypeSelection
                                        disable={regTypedisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                            </Box>
                            {/* Fourth Row End */}

                            {/* 5th Row start */}
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Box sx={{ width: '20%', pt: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Registration Number
                                        </Typography>

                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Registration No"
                                        disabled={regNodisable}
                                        value={em_reg_no}
                                        name="em_reg_no"
                                        changeTextValue={(e) => updateQualification(e)}
                                    />
                                </Box>
                                <Box sx={{ width: '20%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Registration End Date
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <TextInput
                                        type="date"
                                        classname="form-control form-control-sm"
                                        Placeholder="End Date"
                                        min={new Date()}
                                        disabled={regNodisable}
                                        value={expyear}
                                        name="expyear"
                                        changeTextValue={(e) => {
                                            updateexpdate(e)
                                        }}
                                    />
                                </Box>
                            </Box>
                            {/* 5th row end */}

                            <Box sx={{ display: "flex", flexDirection: "row", pt: 0.5 }}>
                                <Box sx={{ width: '20%', pt: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Challan Number
                                        </Typography>

                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Chellan No"
                                        disabled={regNodisable}
                                        value={em_chellan}
                                        name="em_chellan"
                                        changeTextValue={(e) => updateQualification(e)}
                                    />
                                </Box>
                                <Box sx={{ width: '20%', pl: 0.5 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" >
                                            Challan End Date
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%' }} >
                                    <TextInput
                                        type="date"
                                        classname="form-control form-control-sm"
                                        Placeholder="chellan end Date"
                                        min={new Date()}
                                        value={chellan}
                                        disabled={regNodisable}
                                        name="chellan"
                                        changeTextValue={(e) => {
                                            updatechellandate(e)
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                        <QualificationAgGridTable update={count} getDataTable={getDataTable} />
                    </Paper>
                </Paper>
                {/* Main Section End */}

                {/* Footer save And close start */}
                <Paper square sx={{
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{ flex: 0, p: 0.3 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={submitQualification} >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                {/* Footer save And close end */}
            </Box>
        </Fragment >
    )
}
export default memo(QualificationDetails)