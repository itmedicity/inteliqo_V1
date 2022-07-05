import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import CourseSelection from 'src/views/CommonCode/CourseSelection'
import EducationSelection from 'src/views/CommonCode/EducationSelection'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayout from 'src/views/CommonCode/PageLayout'
import RegistrationTypeSelection from 'src/views/CommonCode/RegistrationTypeSelection'
import SpecializationSelection from 'src/views/CommonCode/SpecializationSelection'
import { UniversitySelection } from 'src/views/CommonCode/UniversitySelection'
import moment from 'moment';
import QualificationTable from './EmployeeFileTable/QualificationTable'
import FooterSaveClosebtn from 'src/views/CommonCode/FooterSaveClosebtn'
import TextInput from 'src/views/Component/TextInput'
import { TextField } from '@material-ui/core'
import BoardMastSelection from 'src/views/CommonCode/BoardMastSelection'
import { format } from 'date-fns'
import ReactTooltip from 'react-tooltip';
const EmployeeQualification = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id, no } = useParams();
    const { employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [unidisable, setunidisable] = useState(false)
    const [boarddisable, setBoarddisable] = useState(false)
    const [coursedisable, setcoursedisable] = useState(false)
    const [specdisable, setspecdisable] = useState(false)
    const [regTypedisable, setregTypedisable] = useState(false)
    const [regNodisable, setregNodisable] = useState(false)
    const [count, setcount] = useState(0);
    const { selectEducation, selectCourse, selectSpec, selectUniversity, updateUniversity, updatereg,
        selectBoard, selectreg, updateBoard, updateSpec, updateEducation, updateCourse } = useContext(PayrolMasterContext)
    const [year, setYear] = useState(new Date());
    const [expyear, setExpyear] = useState(new Date())
    const [chellan, setChellan] = useState(new Date())
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
        em_chellan: ''
    })

    //destructuring
    const { em_mark_grade, em_reg_no, em_chellan } = qualification
    const updateQualification = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.value : e.target.value;
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
        em_chellan_exp_date: em_chellan === "" ? null : chellan
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
        em_chellan: ''
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
        history.push(`/Home/Profile/${id}/${no}`);
    }

    return (
        <Fragment>
            <PageLayout heading="Qualification">
                <form className={classes.root} onSubmit={submitQualification}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">

                                <div className="row">
                                    <div className="col-md-12 pt-1">
                                        <EducationSelection style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                    </div>
                                    <div className="col-md-12 pt-1">
                                        <CourseSelection
                                            disable={coursedisable}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                    </div>
                                    <div className="col-md-12 pt-1">
                                        <SpecializationSelection
                                            disable={specdisable}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                    </div>
                                    <div className="col-md-12 pt-1">
                                        <UniversitySelection
                                            disable={unidisable}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                    </div>
                                    <div className="col-md-12 pt-1">
                                        <BoardMastSelection
                                            disable={boarddisable}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                    </div>
                                    <div className="col-md-6 col-xs-12 pt-1" style={{
                                        paddingLeft: '0.5rem', paddingRight: '-0.5rem'
                                    }} >
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
                                    </div>
                                    <div className="col-md-6 pt-1">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Mark/Grade"
                                            value={em_mark_grade}
                                            name="em_mark_grade"
                                            changeTextValue={(e) => updateQualification(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 pt-1">
                                        <RegistrationTypeSelection
                                            disable={regTypedisable}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                    </div>
                                    <div className="col-md-12 pt-1">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Registration No"
                                                    disabled={regNodisable}
                                                    value={em_reg_no}
                                                    name="em_reg_no"
                                                    changeTextValue={(e) => updateQualification(e)}
                                                />
                                            </div>
                                            <div className="col-md-6 " data-tip="Expeiry Date" data-for='toolTip2' data-place='top'>
                                                <ReactTooltip id="toolTip2" />
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
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 pt-1">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Chellan No"
                                                    disabled={regNodisable}
                                                    value={em_chellan}
                                                    name="em_chellan"
                                                    changeTextValue={(e) => updateQualification(e)}
                                                />
                                            </div>
                                            <div className="col-md-6 " data-tip="chellan end Date" data-for='toolTip2' data-place='top'>
                                                <ReactTooltip id="toolTip2" />
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <QualificationTable update={count} />
                            </div>
                            <div className="col-md-12 pt-1">
                                <div className="card-footer  text-muted ">
                                    <FooterSaveClosebtn
                                        redirect={toSettings}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </PageLayout >
        </Fragment >
    )
}

export default EmployeeQualification
