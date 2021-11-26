import { Button, TextField } from '@material-ui/core'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import React, { memo, Fragment, useState, useContext } from 'react'
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
import { employeeNumber } from 'src/views/Constant/Constant'
import moment from 'moment';
import QualificationTable from './EmployeeFileTable/QualificationTable'

const EmployeeQualification = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id, no } = useParams();
    const [count, setcount] = useState(0);
    const { selectEducation, updateEducation } = useContext(PayrolMasterContext)
    const { selectCourse, updateCourse } = useContext(PayrolMasterContext)
    const { selectSpec, updateSpec } = useContext(PayrolMasterContext)
    const { selectUniversity, updateUniversity } = useContext(PayrolMasterContext)
    const { selectreg, updatereg } = useContext(PayrolMasterContext)
    const [year, setYear] = useState(null);

    //Initializing
    const [qualification, setQualification] = useState({
        em_education: '',
        em_course: '',
        em_specialization: '',
        em_univ_institute: '',
        em_year: '',
        em_mark_grade: '',
        em_reg_type: '',
        em_reg_no: ''
    })

    //destructuring
    const { em_mark_grade, em_reg_no } = qualification
    const updateQualification = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.value : e.target.value;
        setQualification({ ...qualification, [e.target.name]: value })
    }

    //Year update function
    const updateYear = (val) => {
        setYear(val)
    }

    //moment passout year
    const qual_year = moment(year).format('YYYY')

    //Post data
    const postData = {
        em_no: employeeNumber(),
        em_education: selectEducation,
        em_course: selectCourse,
        em_specialization: selectSpec,
        em_univ_institute: selectUniversity,
        em_year: qual_year,
        em_mark_grade,
        em_reg_type: selectreg,
        em_reg_no,
        create_user: employeeNumber(),
    }

    //Form reset
    const resetForm = {
        em_education: '',
        em_course: '',
        em_specialization: '',
        em_univ_institute: '',
        em_year: '',
        em_mark_grade: '',
        em_reg_type: '',
        em_reg_no: ''
    }
    const reset = () => {
        updateEducation(0)
        updateCourse(0)
        updateSpec(0)
        updateUniversity(0)
        updatereg(0)
        setYear(null)
    }

    //Form Submitting
    const submitQualification = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/qualify', postData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setcount(count + 1)
            setQualification(resetForm);
            reset();
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Back to home page
    const toSettings = () => {
        history.push(`/Home/Profile/${id}/${no}`);
    }

    return (
        <Fragment>
            <PageLayout heading="Qualification">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3">
                            <form className={classes.root} onSubmit={submitQualification}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <EducationSelection />
                                    </div>
                                    <div className="col-md-12">
                                        <CourseSelection />
                                    </div>
                                    <div className="col-md-12">
                                        <SpecializationSelection />
                                    </div>
                                    <div className="col-md-12">
                                        <UniversitySelection />
                                    </div>
                                    <div className="col-md-6 pt-1">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                views={['year']}
                                                label="Year"
                                                name="year"
                                                value={year}
                                                onChange={(e) => { updateYear(e) }}
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
                                        <TextField
                                            label="Mark/Grade"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="em_mark_grade"
                                            value={em_mark_grade}
                                            onChange={(e) => { updateQualification(e) }}
                                        >
                                        </TextField>
                                    </div>
                                    <div className="col-md-12">
                                        <RegistrationTypeSelection />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            label="Registration Number"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="em_reg_no"
                                            value={em_reg_no}
                                            onChange={(e) => { updateQualification(e) }}
                                        >
                                        </TextField>
                                    </div>
                                    <div className="row col-md-12 pt-2">
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-1">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                type="Submit"
                                                className="ml-2"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                className="ml-2"
                                                onClick={toSettings}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-9">
                            <QualificationTable update={count} />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default memo(EmployeeQualification)
