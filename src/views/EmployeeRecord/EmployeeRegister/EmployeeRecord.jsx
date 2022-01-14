import { FormControl, MenuItem, Select, TextField, FormControlLabel, Checkbox } from '@material-ui/core'
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
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import RegionSelect2 from 'src/views/CommonCode/RegionSelect2'
import ReactTooltip from 'react-tooltip';

const EmployeeRecord = () => {

    // use state intialization
    const [employeerecord, getFormdata] = useState({
        empID: '',
        empName: '',
        empNo: '',
        addressPermnt1: '',
        addressPermnt2: '',
        perPincode: '',
        addressPresent1: '',
        addressPresent2: '',
        prePincode: '',
        mobileNo: '',
        landPhone: '',
        email: '',
        Selectgender: '0',
        dateofbirth: '',
        dateofjoining: '',
        empstatus: false,
        presPincode: ''
    });

    // usestare
    const [cont_perioddate, setcont_perioddate] = useState(0)
    const [contractflag, setcontractflag] = useState(0)
    const [cont_gracedate, setcont_gracedate] = useState(0)
    const [probationendate, setdesiggperioddate] = useState(0)
    const [retirementyear, setretirementyear] = useState(0)

    // usestate for age
    const [agestate, agesetstate] = useState({
        yearage: 0,
        mnthage: 0,
        dayge: 0
    })

    // destructure age
    const { yearage, mnthage, dayge } = agestate

    // function for age calculation
    const getage = (e) => {
        var dateofbirth = e.target.value
        var today = new Date();
        var birthDate = new Date(dateofbirth);  // create a date object directly from `dateofbirth` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var dayage;
        var monthage;
        if (birthDate.getDate() > today.getDate()) {
            dayage = birthDate.getDate() - today.getDate()
        }
        else {
            dayage = today.getDate() - birthDate.getDate();
        }
        if (birthDate.getMonth() > today.getMonth()) {
            monthage = birthDate.getMonth() - today.getMonth()
        }
        else {
            monthage = today.getMonth() - birthDate.getMonth();
        }
        var retireyear = 56 - parseInt(age_now)
        var retirementyear = addYears(today, retireyear)
        setretirementyear(retirementyear)

        const agefromnaw = {
            yearage: age_now,
            mnthage: monthage,
            dayge: dayage

        }
        agesetstate(agefromnaw)
    }



    const classes = useStyles();
    const history = useHistory()
    // Context API
    const { selectedDept,
        updateSelected,
        udateGrade,
        setEarnTypecontext,
        getregion,
        udateregion,
        udatereligion, getreligion,
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
        updateInstituteSeleted,
        getbloodgroup, getregion2, udateregion2
    } = useContext(PayrolMasterContext);

    // destructuring employeerecord
    const { empID, empName, empNo, addressPresent1, addressPresent2, perPincode, mobileNo, landPhone, email,
        addressPermnt1, addressPermnt2, dateofbirth, dateofjoining, Selectgender, empstatus, presPincode } = employeerecord
    // data for sumbimssion
    const submitdata = {
        em_no: empNo,
        em_id: empID,
        em_salutation: selectSalutation,
        em_name: empName,
        em_gender: Selectgender,
        em_dob: dateofbirth,
        em_age_year: yearage,
        em_doj: dateofjoining,
        em_mobile: mobileNo,
        em_phone: landPhone,
        em_email: email,
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
        addressPermnt1: addressPermnt1,
        addressPermnt2: addressPermnt2,
        perPincode: perPincode,
        em_region: getregion,
        addressPresent1: addressPresent1,
        addressPresent2: addressPresent2,
        presPincode: presPincode,
        hrm_region2: getregion2,
        blood_slno: getbloodgroup,
        em_age_month: mnthage,
        em_age_day: dayge,
        hrm_religion: getreligion,
        contractflag: contractflag

    }

    const submitemployee = {
        emp_no: empNo,
        em_id: empID,
        emp_status: empstatus === true ? 1 : 0,
        emp_email: email,
        emp_password: empNo,
        create_user: employeeNumber()
    }

    // serialnum function
    useEffect(() => {
        getSerialnumberempid().then((val) => {
            const varid = {
                empID: val,
                empName: '',
                empNo: '',
                addressPermnt1: '',
                addressPermnt2: '',
                perPincode: '',
                addressPresent1: '',
                addressPresent2: '',
                prePincode: '',
                mobileNo: '',
                landPhone: '',
                email: '',
                Selectgender: '0',
                dateofbirth: '',
                dateofjoining: '',
                empstatus: false,
                presPincode: ''
            }
            getFormdata(varid)
        })

        return (
            udateGrade(0),
            setEarnTypecontext(0),
            udateregion(0),
            udatereligion(0),
            udateemployeecategory(0),
            updatebloodgroup(0),
            updatedoctortype(0),
            updateSelected(0),
            updateDesignationType(0),
            updateDesignation(0),
            updateSalutSelected(0),
            updateBranchSelected(0),
            updateInstituteSeleted(0),
            udateregion2(0)
        )

    }, [setEarnTypecontext, udateGrade,
        udateregion,
        udateregion2, udatereligion,
        updateBranchSelected, updateDesignation,
        updateDesignationType, updateInstituteSeleted,
        updateSalutSelected, updateSelected, updatebloodgroup, updatedoctortype, udateemployeecategory])

    useEffect(() => {

        // employee category on change
        if (getemployeecategory !== 0) {
            const getcategorydata = async () => {
                const result = await axioslogin.get(`/empcat/${getemployeecategory}`)
                const { data } = result.data;
                var today = new Date();
                var cont_grace = data[0].cont_grace;
                var ecat_cont_period = data[0].ecat_cont_period;
                var ecat_prob_period = data[0].ecat_prob_period;
                if (ecat_cont_period > 0) {
                    setcont_perioddate(addDays(today, ecat_cont_period))
                    setcontractflag(1)
                }
                else {

                    setcont_perioddate(new Date('0000:00:00'))
                }
                if (cont_grace > 0) {

                    setcont_gracedate(addDays(today, cont_grace))
                } else {

                    setcont_gracedate(new Date('0000:00:00'))
                }
                if (ecat_prob_period > 0) {
                    setdesiggperioddate(addDays(today, ecat_prob_period))
                }
                else {

                    setdesiggperioddate(new Date('0000:00:00'))
                }

            }
            getcategorydata();
        }

    }, [getemployeecategory])

    // for submition
    const submitemployeerecord = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/empmast', submitdata);
        const { success, message } = result.data;
        if (success === 1) {
            // update hrm_employee table
            const resultemployee = await axioslogin.post('/employee', submitemployee);
            const { success, message } = resultemployee.data;
            if (success === 1) {
                succesNofity('Save Successfully')
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
                udateregion2(0)
                // get serial number on reset
                getSerialnumberempid().then((val) => {
                    const varid = {
                        empID: val,
                        empName: '',
                        empNo: '',
                        addressPermnt1: '',
                        addressPermnt2: '',
                        perPincode: '',
                        addressPresent1: '',
                        addressPresent2: '',
                        prePincode: '',
                        mobileNo: '',
                        landPhone: '',
                        email: '',
                        Selectgender: '0',
                        dateofbirth: '',
                        dateofjoining: '',
                        empstatus: false,
                        presPincode: ''
                    }
                    getFormdata(varid)
                })
            } else if (success === 0) {
                errorNofity(message)
            } else if (success === 2) {
                infoNofity(message)
            }
        } else if (success === 0) {
            warningNofity(message.sqlMessage)
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
                <form className={classes.empRecordStyle} onSubmit={submitemployeerecord} >
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">

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
                                        <div className="col-md-4">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Permanent Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPermnt1}
                                                name="addressPermnt1"
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Permanent Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPermnt2}
                                                name="addressPermnt2"
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
                                        <div className="col-md-2">
                                            <RegionSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-12 p-1">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Present Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPresent1}
                                                name="addressPresent1"
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Present Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPresent2}
                                                name="addressPresent2"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Pincode"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={presPincode}
                                                name="presPincode"
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <RegionSelect2 style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
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
                                        <div className="col-md-3">

                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Land Phone"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={landPhone}
                                                name="landPhone"
                                            />
                                        </div>
                                        <div className="col-md-3">

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
                                            <BloodGroupSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <ReligionSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div>
                                        {/* <div className="col-md-1">
                                            <BloodGroupSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </div> */}
                                        <div className="col-md-2" data-tip="Date of birth" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
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
                                                disabled
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={yearage}
                                                name="yearage"
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Month Age"
                                                disabled
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={mnthage}
                                                name="mnthage"
                                            />
                                        </div>
                                        <div className="col-md-1">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Day Age"
                                                disabled
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={dayge}
                                                name="dayge"
                                            />
                                        </div>
                                        <div className="col-md-2" data-tip="Date of Joining" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
                                            <TextInput
                                                type="date"
                                                classname="form-control form-control-sm"
                                                Placeholder="Date Of Joining"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={dateofjoining}
                                                name="dateofjoining"
                                            />
                                        </div>
                                        <div className="col-md-1">
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

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <FooterClosebtn
                            redirect={toSettings}
                        />
                    </div>
                </form>

            </div>
        </Fragment>
    )
}

export default EmployeeRecord
