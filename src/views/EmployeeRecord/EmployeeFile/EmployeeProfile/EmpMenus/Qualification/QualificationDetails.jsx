import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, { Fragment, useState, useContext, useEffect, memo } from 'react'
import { useHistory, useParams } from 'react-router'
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
import { TextField } from '@material-ui/core'
import BoardMastSelection from 'src/views/CommonCode/BoardMastSelection'
import { format } from 'date-fns'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import { Box, Paper } from '@mui/material'
import QualificationAgGridTable from './QualificationAgGridTable'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CustomeToolTip from 'src/views/Component/CustomeToolTip'
import { CssVarsProvider, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import IconButton from '@mui/joy/IconButton'

const QualificationDetails = () => {

    const classes = useStyles();
    const history = useHistory();
    const { id, no } = useParams();
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id, em_no } = employeedetails
    const [unidisable, setunidisable] = useState(false)
    const [boarddisable, setBoarddisable] = useState(false)
    const [coursedisable, setcoursedisable] = useState(false)
    const [specdisable, setspecdisable] = useState(false)
    const [regTypedisable, setregTypedisable] = useState(false)
    const [regNodisable, setregNodisable] = useState(false)
    const [count, setcount] = useState(0);
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
    const postData = {
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

    const postData5 = {
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
    const postData4 = {
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

    //Form Submitting
    const submitQualification = async (e) => {
        e.preventDefault();
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

    //Back to home page
    const toSettings = () => {
        console.log("bgghj");
        console.log(em_no);
        console.log(em_id);
        //history.push(`/Home/Profile/${id}/${no}`);
        // history.push(`/Home/Prfle/${id}/${no}`)
        history.push(`/Home/Prfle/${id}/${no}`)
        //history.push(`/Home/Prfle`)
        // history.push('/home')
    }

    return (

        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>

                    {/* Heading Section Start */}
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
                                    Qualification Description
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    {/* Heading Section End */}

                    {/* Main Section Start */}
                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}>
                            {/* First Row start */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20
                            }}>
                                <Box sx={{ flex: 1, }} >
                                    <EducationSelection style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <CourseSelection
                                        disable={coursedisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                            </Box>
                            {/* First Row end */}

                            {/* Second Row Start */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20
                            }}>
                                <Box sx={{ flex: 1, pt: 0.5 }} >
                                    <SpecializationSelection
                                        disable={specdisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5, pt: 0 }} >
                                    <UniversitySelection
                                        disable={unidisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                            </Box>
                            {/* Second Row End */}

                            {/* Third Row Start */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20
                            }}>
                                <Box sx={{ flex: 1, }} >
                                    <BoardMastSelection
                                        disable={boarddisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                                <Box sx={{ flex: 1, pt: 1, pl: 0.5 }} >
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
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20
                            }}>
                                <CustomeToolTip title="Pass/fail" placement="bottom">
                                    <Box sx={{ flex: 0, pt: 1 }} >

                                        <CommonCheckBox
                                            name="pass_fail"
                                            value={pass_fail}
                                            checked={pass_fail}
                                            onChange={(e) => updateQualification(e)}
                                        />

                                    </Box>
                                </CustomeToolTip>
                                <Box sx={{ flex: 1, pt: 0.5, pl: 0.5 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Mark/Grade"
                                        value={em_mark_grade}
                                        name="em_mark_grade"
                                        changeTextValue={(e) => updateQualification(e)}
                                        style={{
                                            width: 490
                                        }}
                                    />
                                </Box>
                                <Box sx={{ flex: 2, pl: 0.5 }} >
                                    <RegistrationTypeSelection
                                        disable={regTypedisable}
                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                </Box>
                            </Box>
                            {/* Fourth Row End */}

                            {/* 5th Row start */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                px: 20,
                                pt: 0.5
                            }}>
                                <Box sx={{ flex: 1, }} >
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
                                <Box sx={{ flex: 1, pl: 0.5, pb: 0.5 }} >
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

                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 1,
                                px: 20
                            }}>
                                <Box sx={{ flex: 1, }} >
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
                                <Box sx={{ flex: 1, pl: 0.5 }} >
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
                    <Paper square elevation={0} sx={{
                        pt: 1,
                        mt: 0.5,
                        display: 'flex',
                        //alignItems: "center",
                        //flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        //backgroundColor: "lightcyan",
                        flexDirection: "column"

                    }} >
                        <QualificationAgGridTable update={count} setcount={setcount} />
                    </Paper>
                </Paper>
                {/* Main Section End */}

                {/* Footer save And close start */}
                <Paper square sx={{
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{ flex: 0 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={submitQualification} >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                    {/* <Box sx={{ pl: 1 }}>
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm' sx={theme => ({
                                color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                            })} onClick={toSettings}>
                                <CloseIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box> */}
                </Paper>
                {/* Footer save And close end */}
            </Box>
        </Fragment >
    )
}
export default memo(QualificationDetails)