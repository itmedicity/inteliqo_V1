import { FormControl, MenuItem, Select, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { addDays, addYears } from 'date-fns'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-bootstrap'
import { useHistory } from 'react-router'
import moment from 'moment'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import BloodGroupSelect from 'src/views/CommonCode/BloodGroupSelect'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DesignationMast from 'src/views/CommonCode/DesignationMast'
import DoctorType from 'src/views/CommonCode/DoctorType'
import EmployeeCategory from 'src/views/CommonCode/EmployeeCategory'
import EmployeeInstitutiontype from 'src/views/CommonCode/EmployeeInstitutiontype'
import GradeeSelect from 'src/views/CommonCode/GradeeSelect'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import RegionSelect from 'src/views/CommonCode/RegionSelect'
import ReligionSelect from 'src/views/CommonCode/ReligionSelect'
import Salutation from 'src/views/CommonCode/Salutation'
import { employeeNumber, getSerialnumberempid } from 'src/views/Constant/Constant'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import TextInput from 'src/views/Component/TextInput'

const EmployeeRecord = () => {

    // use state intialization
    const [employeerecord, getFormdata] = useState({
        empID: '',
        empName: '',
        empNo: '',
        addressPermnt: '',
        perPincode: '',
        addressPresent: '',
        prePincode: '',
        mobileNo: '',
        landPhone: '',
        email: '',
        Selectgender: '0',
        dateofbirth: '',
        dateofjoining: '',
        age: '',
        empstatus: false
    });

    // usestare
    const [cont_perioddate, setcont_perioddate] = useState(0)
    const [cont_gracedate, setcont_gracedate] = useState(0)
    const [probationendate, setdesiggperioddate] = useState(0)
    const [retirementyear, setretirementyear] = useState(0)

    // usestate for age
    const [agestate, agesetstate] = useState(0)
    const getage = (e) => {
        var dateofbirth = e.target.value
        var today = new Date();
        var birthDate = new Date(dateofbirth);  // create a date object directly from `dateofbirth` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var retireyear = 56 - parseInt(age_now)
        var retirementyear = addYears(today, retireyear)
        setretirementyear(retirementyear)
        agesetstate(age_now)
    }

    // serialnum function
    useEffect(() => {
        getSerialnumberempid().then((val) => {
            const varid = {
                empID: val,
                empName: '',
                empNo: '',
                addressPermnt: '',
                perPincode: '',
                addressPresent: '',
                prePincode: '',
                mobileNo: '',
                landPhone: '',
                email: '',
                Selectgender: '0',
                dateofbirth: '',
                dateofjoining: '',
                empstatus: false,
                age: ''
            }
            getFormdata(varid)
        })
    }, [])

    const classes = useStyles();
    const history = useHistory()
    // Context API
    const { selectedDept, updateSelected,
        udateGrade,
        setEarnTypecontext,
        getregion,
        udateregion,
        udatereligion,
        getemployeecategory,
        udateemployeecategory,
        updatebloodgroup,
        getDoctype,
        updatedoctortype,
        selectDesignation,
        updateDesignation,
        updateDesignationType,
        selectSalutation,
        updateSalutSelected,
        selectBranchMast,
        updateBranchSelected,
        selectDeptSection,
        selectInstiType,
        updateInstituteSeleted
    } = useContext(PayrolMasterContext);

    // destructuring employeerecord
    const { empID, empName, empNo, addressPermnt, perPincode, mobileNo, landPhone, email, addressPresent, dateofbirth, dateofjoining, Selectgender, empstatus } = employeerecord

    // employee category on change
    useEffect(() => {
        if (getemployeecategory !== 0) {
            const getcategorydata = async () => {
                const result = await axioslogin.get(`/empcat/${getemployeecategory}`)
                const { data } = result.data;
                var today = new Date();
                var cont_grace = data[0].cont_grace;
                var cont_period = data[0].cont_period;
                var empstat_period = data[0].empstat_period;
                setcont_perioddate(addDays(today, cont_grace))
                setcont_gracedate(addDays(today, cont_period))
                setdesiggperioddate(addDays(today, empstat_period))
            }
            getcategorydata();
        }
    }, [getemployeecategory])

    // data for sumbimssion
    const submitdata = {
        em_no: empNo,
        em_id: empID,
        em_salutation: selectSalutation,
        em_name: empName,
        em_gender: Selectgender,
        em_dob: dateofbirth,
        em_age_year: agestate,
        em_doj: dateofjoining,
        em_mobile: mobileNo,
        em_phone: landPhone,
        em_email: email,
        em_region: getregion,
        em_branch: selectBranchMast,
        em_department: selectedDept,
        em_dept_section: selectDeptSection,
        em_institution_type: selectInstiType,
        em_designation: selectDesignation,
        em_doc_type: getDoctype,
        em_category: getemployeecategory,
        em_prob_end_date: moment(probationendate).format('YYYY-MM-DD'),
        em_conf_end_date: moment(cont_gracedate).format('YYYY-MM-DD'),
        em_retirement_date: moment(retirementyear).format('YYYY-MM-DD'),
        em_contract_end_date: moment(cont_perioddate).format('YYYY-MM-DD'),
        em_status: empstatus === true ? 1 : 0,
        create_user: employeeNumber(),
    }

    // for submition
    const submitemployeerecord = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/empmast', submitdata);
        const { success, message } = result.data;
        if (success === 1) {
            succesNofity(message)
            // get serial number on successs
            getSerialnumberempid().then((val) => {
                const varid = {
                    empID: val,
                    empName: '',
                    empNo: '',
                    addressPermnt: '',
                    perPincode: '',
                    addressPresent: '',
                    prePincode: '',
                    mobileNo: '',
                    landPhone: '',
                    email: '',
                    Selectgender: '0',
                    dateofbirth: '',
                    dateofjoining: '',
                    empstatus: false,
                    age: ''
                }
                getFormdata(varid)
            })
            setcont_perioddate(0)
            udateregion(0)
            udateGrade(0)
            setEarnTypecontext(0)
            udateregion(0)
            udatereligion(0)
            udateemployeecategory(0)
            updatebloodgroup(0)
            updatedoctortype(0)
            updateSelected(0)
            updateDesignationType(0)
            updateDesignation(0)
            updateSalutSelected(0)
            updateBranchSelected(0)
            updateInstituteSeleted(0)
        } else if (success === 0) {
            warningNofity(message.sqlMessage)
            udateGrade(0)
            setEarnTypecontext(0)
            udateregion(0)
            udatereligion(0)
            udateemployeecategory(0)
            updatebloodgroup(0)
            updatedoctortype(0)
            updateSelected(0)
            updateDesignationType(0)
            updateDesignation(0)
            updateSalutSelected(0)
            updateBranchSelected(0)
            updateInstituteSeleted(0)
            // get serial number on reset
            getSerialnumberempid().then((val) => {
                const varid = {
                    empID: val,
                    empName: '',
                    empNo: '',
                    addressPermnt: '',
                    perPincode: '',
                    addressPresent: '',
                    prePincode: '',
                    mobileNo: '',
                    landPhone: '',
                    email: '',
                    Selectgender: '0',
                    dateofbirth: '',
                    dateofjoining: '',
                    empstatus: false,
                    age: ''
                }
                getFormdata(varid)
            })
        } else if (success === 2) {
            infoNofity(message)
        }
    }

    // toSetting
    const toSettings = (e) => {
        history.push('/Home');
        udateGrade(0)
        setEarnTypecontext(0)
        udateregion(0)
        udatereligion(0)
        udateemployeecategory(0)
        updatebloodgroup(0)
        updatedoctortype(0)
        updateSelected(0)
        updateDesignationType(0)
        updateSalutSelected(0)
    }

    // update change
    const updateFormData = (e) => {
        e.preventDefault();
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getFormdata({ ...employeerecord, [e.target.name]: value })
    }




    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Employee Register</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <form className={classes.empRecordStyle} onSubmit={submitemployeerecord} >
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <Salutation style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div>
                                        <div className="col-md-2">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Employee ID"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={empID}
                                                name="empID"
                                                disabled="disabled"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Employee Name"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={empName}
                                                name="empName"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Employee No"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={empNo}
                                                name="empNo"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 p-1">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Permanent Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPermnt}
                                                name="addressPermnt"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Pincode"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={perPincode}
                                                name="perPincode"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 p-1">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Present Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPresent}
                                                name="addressPresent"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Pincode"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={perPincode}
                                                name="prePincode"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <FormControl
                                                fullWidth
                                                margin="dense"
                                                className="mt-1"
                                            >
                                                <Select
                                                    name="Selectgender"
                                                    value={Selectgender}
                                                    onChange={(e) => updateFormData(e)}
                                                    fullWidth
                                                    variant="outlined"
                                                    className="ml-1"
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}

                                                >
                                                    <MenuItem value='0' disabled>Gender</MenuItem>
                                                    <MenuItem value='1'>Male</MenuItem>
                                                    <MenuItem value='2'>Female</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>

                                        <div className="col-md-2">

                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Mobile No"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={mobileNo}
                                                name="mobileNo"
                                            />

                                        </div>
                                        <div className="col-md-2">

                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Land Phone"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={landPhone}
                                                name="landPhone"
                                            />
                                        </div>
                                        <div className="col-md-4">

                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Email Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={email}
                                                name="email"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <RegionSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <ReligionSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div>
                                        <div className="col-md-1">
                                            <BloodGroupSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div>
                                        <div className="col-md-2">

                                            <TextInput
                                                type="date"
                                                classname="form-control form-control-sm"
                                                Placeholder="Date Of Birth"
                                                changeTextValue={(e) => {
                                                    updateFormData(e)
                                                    getage(e)
                                                }
                                                }
                                                value={dateofbirth}
                                                name="dateofbirth"
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Age"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={agestate}
                                                name="agestate"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <TextInput
                                                type="date"
                                                classname="form-control form-control-sm"
                                                Placeholder="Date Of Joining"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={dateofjoining}
                                                name="dateofjoining"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <GradeeSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div>
                                        <div className="col-md-2">
                                            <DoctorType style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div>
                                    </div>
                                </div>
                                {/* Second card start here */}
                                <div className="card mt-1">
                                    <div className="card-body">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <BrnachMastSelection style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                                </div>
                                                <div className="col-md-4">
                                                    <DepartmentSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                                </div>
                                                <div className="col-md-4">
                                                    <DepartmentSectionSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4 pl-3 ">
                                                    <EmployeeInstitutiontype style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                                </div>
                                                <div className="col-md-4 pl-4 pr-2">
                                                    <DesignationMast style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                                </div>
                                                <div className="col-md-4">
                                                    <EmployeeCategory style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                                </div>
                                                <TextField
                                                    name="cont_period"
                                                    value={cont_perioddate}
                                                    hidden
                                                />
                                                <TextField
                                                    name="cont_grace"
                                                    value={cont_gracedate}
                                                    hidden
                                                />
                                                <TextField
                                                    name="desiggperiod"
                                                    value={probationendate}
                                                    hidden
                                                />
                                                <TextField
                                                    name="retirementdate"
                                                    value={retirementyear}
                                                    hidden
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                color="secondary"
                                                                name="empstatus"
                                                                value={empstatus}
                                                                checked={empstatus}
                                                                className="ml-2"
                                                                onChange={(e) => { updateFormData(e) }}
                                                            />
                                                        }
                                                        label="Employee Status"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row col-md-12">
                                    <div className="col-md-2 col-sm-12 col-xs-12">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            type="Submit"
                                            className="ml-1"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                    <div className="col-md-2 col-sm-12 col-xs-12">
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EmployeeRecord
