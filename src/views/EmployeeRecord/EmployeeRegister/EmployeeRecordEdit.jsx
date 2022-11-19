import { FormControl, MenuItem, Select, TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import { addDays, addYears, differenceInDays, isValid } from 'date-fns'
import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useHistory, useParams } from 'react-router'
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
import { employeeNumber } from 'src/views/Constant/Constant'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import TextInput from 'src/views/Component/TextInput'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import RegionSelect2 from 'src/views/CommonCode/RegionSelect2'
import ReactTooltip from 'react-tooltip';
import { ToastContainer } from 'react-toastify'

const EmployeeRecordEdit = () => {

    const { id, no } = useParams();
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
        getbloodgroup, getregion2, udateregion2,
        updateDepartmentSection
    } = useContext(PayrolMasterContext);
    // usestare
    const [cont_perioddate, setcont_perioddate] = useState('')
    const [cont_gracedate, setcont_gracedate] = useState('')
    const [probationendate, setdesiggperioddate] = useState(new Date())
    const [retirementyear, setretirementyear] = useState(0)

    //useState for probation status
    const [prob_status, setProb_status] = useState(0)
    const [destype, setDestype] = useState(0)

    //usestate for contract status
    const [contractflag, setcontractflag] = useState(0)
    const [emptype, setEmptype] = useState(0)

    //setting old category
    const [oldCategory, setOldCategory] = useState(0)
    //setting old contract status
    const [oldContract_Status, setOldContract_Status] = useState(0)
    //setting old probation end date
    const [oldprob_end_date, setOldprob_end_date] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [old_cont_end_date, setOld_cont_end_date] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [oldprob_status, setOld_prob_Status] = useState(0)

    // use state intialization
    const [employeerecord, getFormdata] = useState({
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
        doctortype: false,
        dateofbirth: '',
        dateofjoining: '',
        empstatus: false,
        presPincode: ''
    });
    // destructuring employeerecord
    const { empName, empNo, addressPresent1, addressPresent2,
        perPincode, mobileNo, landPhone, email,
        addressPermnt1, addressPermnt2, dateofbirth,
        dateofjoining, Selectgender, empstatus,
        presPincode, doctortype } = employeerecord

    const defaultstate = {
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
        doctortype: false,
        dateofbirth: '',
        dateofjoining: '',
        empstatus: false,
        presPincode: ''
    }
    // usestate for age
    const [agestate, agesetstate] = useState({
        yearage: 0,
        mnthage: 0,
        dayge: 0
    })
    const defaultage = {
        yearage: 0,
        mnthage: 0,
        dayge: 0
    }
    // destructure age
    const { yearage, mnthage, dayge } = agestate
    //useEffect for getting details of the employee for edit
    useEffect(() => {
        const getEmployeedetails = async () => {
            const result = await axioslogin.get(`/empmast/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { addressPermnt1, addressPermnt2, addressPresent1,
                    addressPresent2, hrm_pin1, em_phone, em_mobile,
                    em_email, em_no, em_name, em_doc_type, em_gender,
                    em_dob, em_doj, hrm_pin2, em_department, em_region,
                    em_category, blood_slno, hrm_religion, em_age_month,
                    em_age_year, em_age_day, em_salutation, em_branch,
                    em_dept_section, em_institution_type,
                    em_designation, hrm_region2, em_conf_end_date,
                    em_contract_end_date, em_prob_end_date, em_retirement_date,
                    contract_status, probation_status } = data[0]
                const frmdata = {
                    empName: em_name,
                    empNo: em_no,
                    addressPermnt1: addressPermnt1,
                    addressPermnt2: addressPermnt2,
                    perPincode: hrm_pin1,
                    addressPresent1: addressPresent1,
                    addressPresent2: addressPresent2,
                    prePincode: hrm_pin2,
                    mobileNo: em_mobile,
                    landPhone: em_phone,
                    email: em_email,
                    Selectgender: em_gender,
                    doctortype: em_doc_type === null ? false : true,
                    dateofbirth: em_dob,
                    dateofjoining: em_doj,
                    empstatus: true,
                    presPincode: hrm_pin2
                }
                const age = {
                    yearage: em_age_year,
                    mnthage: em_age_month,
                    dayge: em_age_day
                }
                getFormdata(frmdata)
                agesetstate(age)
                updateSelected(em_department)
                udateregion(em_region)
                udateemployeecategory(em_category)
                updatebloodgroup(blood_slno)
                updatedoctortype(em_doc_type === null ? 0 : em_doc_type)
                updateSalutSelected(em_salutation)
                updateBranchSelected(em_branch)
                updateDepartmentSection(em_dept_section)
                updateInstituteSeleted(em_institution_type)
                updateDesignation(em_designation)
                udatereligion(hrm_religion)
                udateregion2(hrm_region2)
                setcont_perioddate(em_contract_end_date)
                setdesiggperioddate(em_prob_end_date)
                setretirementyear(em_retirement_date)
                setcont_gracedate(em_conf_end_date)
                setOldCategory(em_category)//setting category to old
                setOldContract_Status(contract_status)//setting old contract status
                setOldprob_end_date(em_prob_end_date)//old probation end date
                setOld_cont_end_date(em_contract_end_date)//old contract end date
                setOld_prob_Status(probation_status)//setting old 
            }
        }
        getEmployeedetails()
    }, [id])

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

        var retirementyear = addYears(birthDate, 56)
        setretirementyear(retirementyear)

        const agefromnaw = {
            yearage: age_now,
            mnthage: monthage,
            dayge: dayage
        }
        agesetstate(agefromnaw)
    }

    // data for sumbimssion
    const submitdata = useMemo(() => {
        return {
            em_no: id,
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
            em_doc_type: doctortype === true ? getDoctype : null,
            em_category: getemployeecategory,
            em_prob_end_date: moment(probationendate).format('YYYY-MM-DD'),
            em_conf_end_date: moment(cont_gracedate).format('YYYY-MM-DD'),
            em_retirement_date: moment(retirementyear).format('YYYY-MM-DD'),
            em_contract_end_date: moment(cont_perioddate).format('YYYY-MM-DD'),
            em_status: empstatus === true ? 1 : 0,
            edit_user: employeeNumber(),
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
            contractflag: emptype === 2 ? contractflag : 0,
            probation_status: destype === 1 || destype === 2 ? prob_status : 0
        }

    }, [empNo, selectSalutation, empName, Selectgender,
        dateofbirth, yearage, dateofjoining, mobileNo,
        landPhone, email, selectBranchMast, selectedDept,
        selectDeptSection, selectInstiType, selectDesignation,
        doctortype, getDoctype, getemployeecategory,
        probationendate, cont_gracedate, retirementyear,
        cont_perioddate, empstatus, addressPermnt1,
        addressPermnt2, perPincode, getregion, addressPresent1,
        addressPresent2, presPincode, getregion2, getbloodgroup,
        mnthage, dayge, getreligion, contractflag, prob_status, destype, emptype])

    useEffect(() => {
        return (
            udateGrade(0),
            setEarnTypecontext(0),
            udateregion(null),
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
            udateregion2(null)
        )
    }, [setEarnTypecontext, udateGrade,
        udateregion,
        udateregion2, udatereligion,
        updateBranchSelected, updateDesignation,
        updateDesignationType, updateInstituteSeleted,
        updateSalutSelected, updateSelected, updatebloodgroup,
        updatedoctortype, udateemployeecategory])

    useEffect(() => {
        // employee category on change
        if (getemployeecategory !== 0) {
            const getcategorydata = async () => {
                const result = await axioslogin.get(`/empcat/${getemployeecategory}`)
                const { data } = result.data;
                var today = new Date(dateofjoining);
                var cont_grace = data[0].cont_grace;
                var ecat_cont_period = data[0].ecat_cont_period;
                var ecat_prob_period = data[0].ecat_prob_period;
                var des_type = data[0].des_type;
                var emp_type = data[0].emp_type;
                setEmptype(emp_type)//setting category emptype
                setDestype(des_type)//setting category destype
                if (ecat_cont_period > 0) {
                    setcont_perioddate(addDays(today, ecat_cont_period))
                    setcontractflag(1)
                }
                else {
                    setcont_perioddate(new Date('0000:00:00'))
                    setcontractflag(0)
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
                //setting probation status
                if (des_type === 1 || des_type === 2) {
                    setProb_status(1)
                }
                else {
                    setProb_status(0)
                }
            }
            getcategorydata();
        }

        return () => {
            setProb_status(0)
            setdesiggperioddate(new Date('0000:00:00'))
            setcont_gracedate(new Date('0000:00:00'))
            setcont_perioddate(new Date('0000:00:00'))
            setcontractflag(0)
            setEmptype(0)
            setDestype(0)
        }
    }, [getemployeecategory, dateofjoining])

    const submitemployeerecord = useCallback((e) => {
        e.preventDefault();
        const probdate = moment(oldprob_end_date).format('YYYY-MM-DD');
        const cont_date = moment(old_cont_end_date).format('YYYY-MM-DD');

        //new entry for hrm_emp_contract_detl
        const newContractEntry = async () => {
            const postContractDetl = {
                em_id: no,
                em_no: id,
                em_cont_start: dateofjoining,
                em_cont_end: moment(cont_perioddate).format('YYYY-MM-DD'),
                em_prob_end_date: moment(probationendate).format('YYYY-MM-DD'),
                em_conf_end_date: moment(cont_gracedate).format('YYYY-MM-DD'),
                status: contractflag === 0 ? 0 : 1
            }
            const result = await axioslogin.post('/empmast/createContract', postContractDetl)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity("Data Updated Successfully")
            }
            else {
                warningNofity(message)
            }
        }

        const submitFunction = async (submitdata) => {
            const result = await axioslogin.patch('/empmast/empregister/Edit', submitdata);
            const { success, message } = result.data;
            if (success === 1) {
                const result = await axioslogin.get(`/empmast/${empNo}`)
                const { success, data } = result.data
                if (success === 1) {
                    getFormdata(defaultstate)
                    agesetstate(defaultage)
                    udateGrade(0)
                    setEarnTypecontext(0)
                    udateregion(null)
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
                    udateregion2(null)
                    history.push('/Home/EmployeeRecord')
                    //succesNofity("Updated Successfully")
                }
                else {
                    errorNofity("Error Occured!!Please Contact EDP")
                }
            } else if (success === 0) {
                infoNofity(message.sqlMessage)
            } else if (success === 2) {
                infoNofity(message)
            }
            else {
                infoNofity(message)
            }
        }

        const submit = async (submitdata) => {
            const result = await axioslogin.patch('/empmast/empregister/Edit', submitdata);
            const { success, message } = result.data;
            if (success === 1) {
                const result = await axioslogin.get(`/empmast/${empNo}`)
                const { success, data } = result.data
                if (success === 1) {
                    getFormdata(defaultstate)
                    agesetstate(defaultage)
                    udateGrade(0)
                    setEarnTypecontext(0)
                    udateregion(null)
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
                    udateregion2(null)
                    history.push('/Home/EmployeeRecord')
                    succesNofity("Updated Successfully")
                }
                else {
                    errorNofity("Error Occured!!Please Contact EDP")
                }
            } else if (success === 0) {
                infoNofity(message.sqlMessage)
            } else if (success === 2) {
                infoNofity(message)
            }
            else {
                infoNofity(message)
            }
        }

        const UpdateContractDetl = async (no) => {
            const updateData = {
                em_prob_end_date: moment(probationendate).format('YYYY-MM-DD'),
                em_cont_end: moment(cont_perioddate).format('YYYY-MM-DD'),
                status: contractflag === 0 ? 0 : 1,
                em_id: no
            }
            const result = await axioslogin.patch('/empmast/update/contractdetl', updateData);
            const { success, message } = result.data;
            if (success === 2) {
                succesNofity(message)
            }
            else {
                infoNofity(message)
            }
        }

        const today = moment(new Date()).format('YYYY-MM-DD');

        if (probdate > today && cont_date > today && oldContract_Status === 1 && oldprob_status === 1 && oldCategory !== getemployeecategory) {
            submitFunction(submitdata)
            UpdateContractDetl(no)
        }
        else if (probdate < today && cont_date < today && oldContract_Status === 1 && oldprob_status === 0 && oldCategory !== getemployeecategory) {
            infoNofity("Employee Contract Date Already Exceeded, You Can Edit This Employee Through Contract Renewal Process!")
        }
        else if (probdate < today && cont_date > today && oldContract_Status === 1 && oldprob_status === 1 && oldCategory !== getemployeecategory) {
            infoNofity("Employee Training or Probation End Date Already Exceeded, You Can Edit This Employee Through Company Information!")
        }
        else if (probdate < today && cont_date < today && oldContract_Status === 0 && oldprob_status === 1 && oldCategory !== getemployeecategory) {
            if (contractflag === 1) {
                submitFunction(submitdata)
                newContractEntry()
            }
            else {
                submit(submitdata)
            }

        }
        else if (probdate < today && cont_date < today && oldContract_Status === 0 && oldprob_status === 0 && oldCategory !== getemployeecategory) {
            if (contractflag === 1) {
                submitFunction(submitdata)
                newContractEntry()
            }
            else {
                submit(submitdata)
            }
        }
        else if (probdate < today && cont_date > today && oldContract_Status === 1 && oldprob_status === 0 && oldCategory !== getemployeecategory) {
            submitFunction(submitdata)
            UpdateContractDetl(no)
        }
        else {
            submit(submitdata)

        }
    }, [submitdata, probationendate, oldCategory, no, oldContract_Status, contractflag, oldprob_status, old_cont_end_date, oldprob_end_date])


    // const result = await axioslogin.patch('/empmast/empregister/Edit', submitdata);
    // const { success, message } = result.data;
    // if (success === 1) {
    //     const result = await axioslogin.get(`/empmast/${empNo}`)
    //     const { success, data } = result.data
    //     if (success === 1) {
    //         getFormdata(defaultstate)
    //         agesetstate(defaultage)
    //         udateGrade(0)
    //         setEarnTypecontext(0)
    //         udateregion(null)
    //         udatereligion(0)
    //         udateemployeecategory(0)
    //         updatebloodgroup(0)
    //         updatedoctortype(0)
    //         updateSelected(0)
    //         updateDesignationType(0)
    //         updateDesignation(0)
    //         updateSalutSelected(0)
    //         updateBranchSelected(0)
    //         updateInstituteSeleted(0)
    //         udateregion2(null)
    //         history.push('/Home/EmployeeRecord')
    //         succesNofity("Updated Successfully")
    //     }
    //     else {
    //         errorNofity("Error Occured!!Please Contact EDP")
    //     }
    // } else if (success === 0) {
    //     infoNofity(message.sqlMessage)
    // } else if (success === 2) {
    //     infoNofity(message)
    // }
    // else {
    //     infoNofity(message)
    // }


    // toSetting
    const toSettings = (e) => {
        history.push('/Home');
        getFormdata(defaultstate)
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
    const toTable = useCallback(() => {
        history.push('/Home/EmployeeRecordTable')
    })

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
                                        <div className="col-md-7">
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Employee Name"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={empName}
                                                name="empName"
                                            />
                                        </div>
                                        <div className="col-md-3" data-tip="Emp No" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Employee No"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={empNo}
                                                disabled={true}
                                                name="empNo"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 p-1">
                                    <div className="row">
                                        <div className="col-md-4" data-tip="Permanent-House Name" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Permanent Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPermnt1}
                                                name="addressPermnt1"
                                            />
                                        </div>
                                        <div className="col-md-4" data-tip="Permanent-Street Name" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Permanent Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPermnt2}
                                                name="addressPermnt2"
                                            />
                                        </div>
                                        <div className="col-md-2" data-tip="Pincode" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
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
                                            <RegionSelect />
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-12 p-1">
                                    <div className="row">
                                        <div className="col-md-4" data-tip="Present-House Name" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Present Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPresent1}
                                                name="addressPresent1"
                                            />
                                        </div>
                                        <div className="col-md-4" data-tip="Present-Street Name" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Present Address"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPresent2}
                                                name="addressPresent2"
                                            />
                                        </div>
                                        <div className="col-md-2" data-tip="Pincode" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
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

                                        <div className="col-md-2" data-tip="Mobile No" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Mobile No"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={mobileNo}
                                                name="mobileNo"
                                            />
                                        </div>
                                        <div className="col-md-3" data-tip="Landline" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Land Phone"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={landPhone}
                                                name="landPhone"
                                            />
                                        </div>
                                        <div className="col-md-3" data-tip="email Id" data-for='toolTip1' data-place='top'>
                                            <ReactTooltip id="toolTip1" />
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
                                        <div className="d-flex justify-content-between col-md-2">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="secondary"
                                                        name="doctortype"
                                                        value={doctortype}
                                                        checked={doctortype}
                                                        className="ml-2 pt-1"
                                                        onChange={(e) => { updateFormData(e) }}
                                                    />
                                                }
                                            // label="Doctor"
                                            />
                                            <DoctorType style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} doctortype={doctortype} />
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
                            view={toTable}
                        />
                    </div>
                </form>

            </div>
        </Fragment>
    )
}

export default EmployeeRecordEdit