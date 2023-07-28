import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, IconButton, Paper, TextField } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import EducationSelectRedux from 'src/views/MuiComponents/EducationSelectRedux';
import CourseSelectRedux from 'src/views/MuiComponents/CourseSelectRedux';
import SpecializtionSelectRedux from 'src/views/MuiComponents/SpecializtionSelectRedux';
import UniversitySelect from 'src/views/MuiComponents/UniversitySelect';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { format } from 'date-fns'
import BoardSelectRedux from 'src/views/MuiComponents/BoardSelectRedux';
import CommonCheckBox from 'src/views/Component/CommonCheckBox';
import RegistrationtypeSelect from 'src/views/MuiComponents/RegistrationtypeSelect';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
import _ from 'underscore';
import { useSelector } from 'react-redux';
import moment from 'moment';

const QualificationPage = () => {

    const { id, no } = useParams()
    const [education, setEducation] = useState(0)
    const [course, setCourse] = useState(0)
    const [Specialization, setSpecialization] = useState(0)
    const [university, setUniversity] = useState(0)
    const [year, setYear] = useState(format(new Date(), "yyyy-MM-dd"));
    const [board, setBoard] = useState(0)
    const [registrtype, setRegistertype] = useState(0)
    const [expyear, setExpyear] = useState(format(new Date(), "yyyy-MM-dd"));
    const [chellan, setChellan] = useState(format(new Date(), "yyyy-MM-dd"));
    const [tabledata, setTableData] = useState([])
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
    const { em_mark_grade, em_reg_no, em_chellan, pass_fail } = qualification
    const [flag, setflag] = useState(0)
    const [slno, setslno] = useState(0)
    const [coursedisable, setcoursedisable] = useState(false)
    const [specdisable, setspecdisable] = useState(false)
    const [boarddisable, setBoarddisable] = useState(false)
    const [unidisable, setunidisable] = useState(false)
    const [regTypedisable, setregTypedisable] = useState(false)
    const [regNodisable, setregNodisable] = useState(false)
    const [count, setcount] = useState(0);

    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0, _.isEqual)

    useEffect(() => {
        if (education === 4) {
            setunidisable(true)
            setBoarddisable(false)
            setcoursedisable(false)
            setspecdisable(false)
            setregTypedisable(true)
            setregNodisable(true)
        }
        else if (education === 5) {
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
    }, [education])

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
        setCourse(0)
        setSpecialization(0)
        setEducation(0)
        setUniversity(0)
        setBoard(0)
        setRegistertype(0)
        setExpyear(new Date())
        setYear(new Date())
        setChellan(new Date())
    }

    useEffect(() => {
        const getQualification = async () => {
            const result = await axioslogin.get(`/qualify/${id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else if (success === 0) {
                setTableData([])
                infoNofity("No Qualification is added to this employee")
            } else {
                setTableData([])
                warningNofity(" Error occured contact EDP")
            }
        }
        getQualification();
    }, [id, count]);

    const updateQualification = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setQualification({ ...qualification, [e.target.name]: value })
    }

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

    const [columnDef] = useState([
        {
            headerName: 'Sl No',
            field: 'slno', wrapText: true, minWidth: 100
        },
        { headerName: 'Education ', field: 'edu_desc', wrapText: true, minWidth: 200 },
        { headerName: 'Course ', field: 'cour_desc', wrapText: true, minWidth: 450 },
        { headerName: 'Specialization ', field: 'spec_desc', wrapText: true, minWidth: 450 },
        { headerName: 'Pass/Fail', field: 'pass', wrapText: true, minWidth: 200 },
        {
            headerName: 'Edit', minWidth: 200, cellRenderer: params =>
                <IconButton sx={{ pb: 1, boxShadow: 0 }} size='sm' color='primary' onClick={() => getDataTable(params)}>
                    <EditIcon />
                </IconButton>
        },
    ])
    const postData = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: education !== 0 ? education : null,
            em_course: course !== 0 ? course : null,
            em_specialization: Specialization !== 0 ? Specialization : null,
            em_univ_institute: university !== 0 ? university : null,
            em_board: board !== 0 ? board : null,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            em_reg_type: registrtype,
            em_reg_no: em_reg_no,
            create_user: em_id,
            em_exp_date: em_reg_no === "" ? null : moment(expyear).format('YYYY-MM-DD'),
            em_chellan: em_chellan,
            em_chellan_exp_date: em_chellan === "" ? null : moment(chellan).format('YYYY-MM-DD'),
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [id, no, education, course, Specialization, university, board, qual_year, em_mark_grade,
        em_reg_no, em_id, em_chellan, expyear, chellan, pass_fail, registrtype])

    const postData5 = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: education !== 0 ? education : null,
            em_course: course !== 0 ? course : null,
            em_specialization: Specialization !== 0 ? Specialization : null,
            em_univ_institute: university !== 0 ? university : null,
            em_board: board !== 0 ? board : null,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            create_user: em_id,
            pass_fail: pass_fail === true ? 0 : 1

        }
    }, [id, no, education, course, Specialization, university, board, qual_year, em_mark_grade, em_id, pass_fail])

    const postData4 = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: education !== 0 ? education : null,
            em_course: course !== 0 ? course : null,
            em_specialization: Specialization !== 0 ? Specialization : null,
            em_univ_institute: university !== 0 ? university : null,
            em_board: board !== 0 ? board : null,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            create_user: em_id,
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [id, no, education, course, Specialization, university, board, qual_year, em_mark_grade, em_id, pass_fail])

    const updatepostData = useMemo(() => {
        return {
            em_education: education,
            em_course: course,
            em_specialization: Specialization,
            em_univ_institute: university,
            em_board: board !== 0 ? board : null,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            em_reg_type: registrtype !== 0 ? registrtype : null,
            em_reg_no: em_reg_no,
            edit_user: em_id,
            em_exp_date: em_reg_no === "" ? null : moment(expyear).format('YYYY-MM-DD'),
            em_chellan: em_chellan,
            em_chellan_exp_date: em_chellan === "" ? null : moment(chellan).format('YYYY-MM-DD'),
            emqual_slno: slno,
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [education, course, Specialization, university, board, qual_year, em_mark_grade,
        registrtype, em_reg_no, em_id, pass_fail, expyear, chellan, slno, em_chellan])

    const updatepostdata5 = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: education,
            em_course: course !== 0 ? course : null,
            em_specialization: Specialization !== 0 ? Specialization : null,
            em_univ_institute: university !== 0 ? university : null,
            em_board: board,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            em_reg_type: registrtype !== 0 ? registrtype : null,
            em_reg_no: em_reg_no,
            edit_user: em_id,
            emqual_slno: slno,
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [id, no, education, course, Specialization, university, board, qual_year, em_mark_grade,
        registrtype, slno, pass_fail, em_reg_no, em_id])

    const updatepostdata4 = useMemo(() => {
        return {
            em_no: id,
            em_id: no,
            em_education: education,
            em_course: course !== 0 ? course : null,
            em_specialization: Specialization !== 0 ? Specialization : null,
            em_univ_institute: university !== 0 ? university : null,
            em_board: board,
            em_year: qual_year,
            em_mark_grade: em_mark_grade === "" ? 0 : em_mark_grade,
            em_reg_type: registrtype !== 0 ? registrtype : null,
            em_reg_no: em_reg_no,
            edit_user: em_id,
            emqual_slno: slno,
            pass_fail: pass_fail === true ? 0 : 1
        }
    }, [id, no, education, course, Specialization, university, board, qual_year, em_mark_grade,
        registrtype, em_id, slno, pass_fail, em_reg_no])

    const submitQualification = useCallback((e) => {
        e.preventDefault();
        const submitdata = async () => {
            if (education === 5) {
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
            } else if (education === 4) {
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
            if (education === 5) {
                const result = await axioslogin.patch('/qualify', updatepostdata5)
                const { message, success } = result.data;
                if (success === 2) {
                    setQualification(resetForm);
                    setcount(count + 1)
                    reset();
                    succesNofity(message);
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            } else if (education === 4) {
                const result = await axioslogin.patch('/qualify', updatepostdata4)
                const { message, success } = result.data;
                if (success === 2) {
                    setQualification(resetForm);
                    setcount(count + 1)
                    reset();
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

    }, [postData5, postData, postData4, updatepostData, updatepostdata4, updatepostdata5,
        flag, count, education])

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
        setEducation(em_education === null ? 0 : em_education)
        setCourse(em_course === null ? 0 : em_course)
        setSpecialization(em_specialization === null ? 0 : em_specialization)
        setUniversity(em_univ_institute === null ? 0 : em_univ_institute)
        setBoard(em_board === null ? 0 : em_board)
        setRegistertype(em_reg_type === null ? 0 : em_reg_type)
        const year = new Date(em_year, 6, 2)
        setYear(year)
        setslno(emqual_slno)
        setExpyear(em_exp_date === null ? new Date() : setExpyear(format(new Date(em_exp_date), "yyyy-MM-dd")))
        setChellan(em_chellan_exp_date === null ? new Date() : setChellan(format(new Date(em_chellan_exp_date), "yyyy-MM-dd")))


    }, [])

    return (
        <Fragment>
            <Box sx={{
                width: "100%", height: { xxl: 825, xl: 680, lg: 523, md: 270, sm: 270, xs: 270 }, overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
            }} >
                <Paper square elevation={2} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Qualification Information
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                </Paper>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", flexDirection: "row", width: '100%', pt: 1 }}>
                        <Box sx={{ width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Education
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: '30%' }} >
                            <EducationSelectRedux value={education} setValue={setEducation} />
                        </Box>
                        <Box sx={{ width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    Course
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: '30%' }} >
                            <CourseSelectRedux value={course} setValue={setCourse} education={education} coursedisable={coursedisable} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", width: '100%', pt: 1 }}>
                        <Box sx={{ width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Specialization
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: '30%' }} >
                            <SpecializtionSelectRedux value={Specialization} setValue={setSpecialization}
                                course={course} specdisable={specdisable} />
                        </Box>
                        <Box sx={{ width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    University
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: '30%' }} >
                            <UniversitySelect value={university} setValue={setUniversity} unidisable={unidisable} />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 1 }}>
                        <Box sx={{ width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Board
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: '30%' }} >
                            <BoardSelectRedux value={board} setValue={setBoard} education={education} boarddisable={boarddisable} />
                        </Box>
                        <Box sx={{ width: '20%' }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Year
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: '30%' }} >
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['year']}
                                    name="year"
                                    value={year}
                                    minDate={new Date('1990')}
                                    maxDate={new Date('2022')}
                                    onChange={(e) => { updateYear(e) }}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth size='small' helperText={null} sx={{ display: 'flex' }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", pt: 1 }}>
                        <Box sx={{ width: '20%' }} >
                            <CommonCheckBox
                                name="pass_fail"
                                checked={pass_fail}
                                onChange={(e) => updateQualification(e)}
                                label="Pass or Fail"
                            />
                        </Box>
                        <Box sx={{ width: '30%' }}>
                            <TextField fullWidth
                                placeholder='Mark/Grade'
                                size="small"
                                id='em_mark_grade'
                                value={em_mark_grade}
                                name="em_mark_grade"
                                onChange={(e) => updateQualification(e)}
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
                            <RegistrationtypeSelect value={registrtype} setValue={setRegistertype} regTypedisable={regTypedisable} />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", pt: 1 }}>
                        <Box sx={{ width: '20%', pt: 0.5 }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Registration Number
                                </Typography>

                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: '30%' }} >

                            <TextField fullWidth
                                placeholder='Registration No'
                                size="small"
                                id='em_reg_no'
                                value={em_reg_no}
                                name="em_reg_no"
                                disabled={regNodisable}
                                onChange={(e) => updateQualification(e)}
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
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['day']}
                                    name="expyear"
                                    value={expyear}
                                    minDate={new Date()}
                                    disabled={regNodisable}
                                    //maxDate={new Date('2022')}
                                    onChange={setExpyear}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth size='small' helperText={null} sx={{ display: 'flex' }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 1 }}>
                        <Box sx={{ width: '20%', pt: 0.5 }}>
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    Challan Number
                                </Typography>

                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: '30%' }} >

                            <TextField fullWidth
                                placeholder='Chellan No'
                                size="small"
                                id='em_chellan'
                                value={em_chellan}
                                name="em_chellan"
                                disabled={regNodisable}
                                onChange={(e) => updateQualification(e)}
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
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    views={['day']}
                                    name="chellan"
                                    value={chellan}
                                    minDate={new Date()}
                                    disabled={regNodisable}
                                    onChange={setChellan}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth size='small' helperText={null} sx={{ display: 'flex' }} />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box>
                </Box>
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid columnDefs={columnDef} tableData={tabledata} sx={{
                        height: 600,
                        width: "100%"
                    }} rowHeight={40} headerHeight={40} />
                </Paper>
                <Paper square sx={{ backgroundColor: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 0, p: 0.3 }} >
                        <IconButton variant="outlined" size='sm' onClick={submitQualification} >
                            <LibraryAddCheckOutlinedIcon />
                        </IconButton>

                    </Box>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default memo(QualificationPage) 