import React, { useCallback, useEffect, useMemo, memo, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { employeeNumber } from 'src/views/Constant/Constant'
import {
    errorNofity,
    infoNofity,
    succesNofity,
    warningNofity,
} from 'src/views/CommonCode/Commonfunc'
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Button, CssVarsProvider, Option, Select, Tooltip } from '@mui/joy'
import JoySalutation from 'src/views/MuiComponents/JoyComponent/JoySalutation'
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyRegion from 'src/views/MuiComponents/JoyComponent/JoyRegion'
import JoyGender from 'src/views/MuiComponents/JoyComponent/JoyGender'
import JoyBloodGroup from 'src/views/MuiComponents/JoyComponent/JoyBloodGroup'
import JoyReligion from 'src/views/MuiComponents/JoyComponent/JoyReligion'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import JoyBranchSelect from 'src/views/MuiComponents/JoyComponent/JoyBranchSelect'
import JoyInstitutionSelect from 'src/views/MuiComponents/JoyComponent/JoyInstitutionSelect'
import JoyDesignationSelect from 'src/views/MuiComponents/JoyComponent/JoyDesignationSelect'
import JoyCategorySelect from 'src/views/MuiComponents/JoyComponent/JoyCategorySelect'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoyGradeSelect from 'src/views/MuiComponents/JoyComponent/JoyGradeSelect'
import JoyDoctorTypeSelect from 'src/views/MuiComponents/JoyComponent/JoyDoctorTypeSelect'
import { addDays, addYears } from 'date-fns'
import _ from 'underscore'
import CloseIcon from '@mui/icons-material/Close';
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment'
import JoyDepartmentSection from 'src/views/MuiComponents/JoyComponent/JoyDepartmentSection'
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch } from 'react-redux'
import { getDepartmentSection } from 'src/redux/actions/Common.Action'
import JoyClicnicalType from 'src/views/MuiComponents/JoyComponent/JoyClicnicalType'

const EmployeeRecordEdit = () => {

    const { id, no } = useParams();
    const history = useHistory();
    const dispatch = useDispatch()



    const [salutation, setSalutation] = useState(0)
    const [empname, setEmpname] = useState('')
    const [empno, setEmpno] = useState('')

    const [addressPermnt1, setaddressPermnt1] = useState('')
    const [addressPermnt2, setaddressPermnt2] = useState('')
    const [permantPin, setPermantPin] = useState('')
    const [region1, setRegion1] = useState(0)

    const [addressPresent1, setaddressPresent1] = useState('')
    const [addressPresent2, setaddressPresent2] = useState('')
    const [presentPin, setPresentPin] = useState('')
    const [region2, setRegion2] = useState(0)
    const [gender, setGender] = useState(0)
    const [mobileno, setMobileno] = useState('')
    const [landphone, setLandphone] = useState('')
    const [email, setEmail] = useState('')
    const [bloodgrp, setBloodgrp] = useState(0)
    const [religion, setReligion] = useState(0)
    const [dateofbirth, setdateofbirth] = useState('')
    const [dept, setDept] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [institute, setInstitute] = useState(0)
    const [designation, setDesignation] = useState(0)
    const [category, setCategory] = useState(0)
    const [Salary, setSalary] = useState('')
    const [empstatus, setempstatus] = useState(true)
    const [branch, setBranch] = useState(0)
    const [grade, setGrade] = useState(0)

    const [dateofjoining, setDateofJoining] = useState('')
    const [doctortype, setDoctortype] = useState(false)
    const [doct, setDoct] = useState(0)
    const [retirementyear, setretirementyear] = useState('')
    const [cont_gracedate, setcont_gracedate] = useState('')
    const [probationendDate, setProbationEndDate] = useState('')
    const [cont_perioddate, setcont_perioddate] = useState('')
    const [contractflag, setcontractflag] = useState(0)
    const [prob_status, setProb_status] = useState(0)


    const [oldCategory, setOldCategory] = useState(0)
    const [oldContract_Status, setOldContract_Status] = useState(0)
    const [oldprob_end_date, setOldprob_end_date] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [old_cont_end_date, setOld_cont_end_date] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [oldprob_status, setOld_prob_Status] = useState(0)

    const [clinictype, setClinictype] = useState(0)
    const [doctor, setDoctor] = useState(false)

    useEffect(() => {
        dispatch(setDepartment());

        if (dept !== 0) {
            dispatch(getDepartmentSection(dept))
        }
    }, [dispatch, dept])

    // usestate for age
    const [agestate, agesetstate] = useState({
        yearage: 0,
        mnthage: 0,
        dayge: 0,
    })
    const { yearage, mnthage, dayge } = agestate

    const getBirthDate = useCallback((e) => {
        setdateofbirth(e.target.value)
        var dateofbirth = e.target.value
        var today = new Date()
        var birthDate = new Date(dateofbirth) // create a date object directly from `dateofbirth` argument
        var age_now = today.getFullYear() - birthDate.getFullYear()
        var dayage
        var monthage

        if (birthDate.getDate() > today.getDate()) {
            dayage = birthDate.getDate() - today.getDate()
        } else {
            dayage = today.getDate() - birthDate.getDate()
        }
        if (birthDate.getMonth() > today.getMonth()) {
            monthage = birthDate.getMonth() - today.getMonth()
        } else {
            monthage = today.getMonth() - birthDate.getMonth()
        }
        const agefromnaw = {
            yearage: age_now,
            mnthage: monthage,
            dayge: dayage,
        }
        agesetstate(agefromnaw)

        var retirementyear = addYears(birthDate, 56)
        setretirementyear(retirementyear)
    }, [])

    useEffect(() => {
        // employee category details when a selected
        if (category !== 0) {
            const getcategorydata = async () => {
                const result = await axioslogin.get(`/empcat/${category}`)
                const { data } = result.data
                var today = new Date(dateofjoining)
                var cont_grace = data[0].cont_grace
                var ecat_cont_period = data[0].ecat_cont_period
                var ecat_prob_period = data[0].ecat_prob_period
                if (ecat_cont_period > 0) {
                    setcont_perioddate(addDays(today, ecat_cont_period))
                    setcontractflag(1)
                } else {
                    setcont_perioddate(new Date('0000:00:00'))
                    setcontractflag(0)
                }
                if (cont_grace > 0) {
                    setcont_gracedate(addDays(today, cont_grace))
                } else {
                    setcont_gracedate(new Date('0000:00:00'))
                }
                if (ecat_prob_period > 0) {
                    setProbationEndDate(addDays(today, ecat_prob_period))
                    setProb_status(1)
                } else {
                    setProbationEndDate(new Date('0000:00:00'))
                    setProb_status(0)
                }
            }
            getcategorydata()
        }
    }, [category, dateofjoining])

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
                    contract_status, probation_status, recomend_salary, clinicaltype,
                    doctor_status } = data[0]
                const age = {
                    yearage: em_age_year,
                    mnthage: em_age_month,
                    dayge: em_age_day
                }
                setEmpno(em_no)
                setEmpname(em_name)
                setGender(em_gender)
                setdateofbirth(em_dob)
                setDateofJoining(em_doj)
                setSalary(recomend_salary === null ? 0 : recomend_salary)
                setaddressPermnt1(addressPermnt1)
                setaddressPermnt2(addressPermnt2)
                setaddressPresent1(addressPresent1)
                setaddressPresent2(addressPresent2)
                setPermantPin(hrm_pin1)
                setPresentPin(hrm_pin2)
                setLandphone(em_phone)
                setMobileno(em_mobile)
                setEmail(em_email)
                agesetstate(age)
                setDept(em_department)
                setRegion1(em_region)
                setCategory(em_category)
                setBloodgrp(blood_slno)
                setDoct(em_doc_type === null ? 0 : em_doc_type)
                setSalutation(em_salutation)
                setBranch(em_branch)
                setDeptSect(em_dept_section)
                setInstitute(em_institution_type)
                setDesignation(em_designation)
                setReligion(hrm_religion)
                setRegion2(hrm_region2)
                setcont_perioddate(em_contract_end_date)
                setProbationEndDate(em_prob_end_date)
                setretirementyear(em_retirement_date)
                setcont_gracedate(em_conf_end_date)
                setOldCategory(em_category)//setting category to old
                setOldContract_Status(contract_status)//setting old contract status
                setOldprob_end_date(em_prob_end_date)//old probation end date
                setOld_cont_end_date(em_contract_end_date)//old contract end date
                setOld_prob_Status(probation_status)//setting old 
                setClinictype(clinicaltype === 0 ? 0 : clinicaltype)
                setDoctor(doctor_status === 1 ? true : false)
            }
        }
        getEmployeedetails()
    }, [id])

    const toTable = useCallback(() => {
        history.push('/Home/EmployeeRecordTable')
    })


    // data for sumbimssion
    const submitdata = useMemo(() => {
        return {

            em_salutation: salutation,
            em_name: empname,
            em_gender: gender,
            em_dob: dateofbirth,
            em_age_year: yearage,
            em_doj: dateofjoining,
            em_mobile: mobileno,
            em_phone: landphone,
            em_email: email,
            em_branch: branch,
            em_department: dept,
            em_dept_section: deptSect,
            em_institution_type: institute,
            em_designation: designation,
            em_doc_type: doctortype === true ? doct : null,
            em_category: category,
            em_prob_end_date: moment(probationendDate).format('YYYY-MM-DD'),
            em_conf_end_date: moment(cont_gracedate).format('YYYY-MM-DD'),
            em_retirement_date: moment(retirementyear).format('YYYY-MM-DD'),
            em_contract_end_date: moment(cont_perioddate).format('YYYY-MM-DD'),
            em_status: empstatus === true ? 1 : 0,
            edit_user: employeeNumber(),
            addressPermnt1: addressPermnt1,
            addressPermnt2: addressPermnt2,
            perPincode: permantPin,
            em_region: region1,
            addressPresent1: addressPresent1,
            addressPresent2: addressPresent2,
            presPincode: presentPin,
            hrm_region2: region2,
            blood_slno: bloodgrp,
            em_age_month: mnthage,
            em_age_day: dayge,
            hrm_religion: religion,
            contractflag: contractflag,
            probation_status: prob_status,
            recomend_salary: Salary,
            clinicaltype: clinictype,
            doctor_status: doctor === true ? 1 : 0,
            em_no: parseInt(empno),
        }

    }, [empno, id, salutation, empname, gender, dateofbirth, branch, dept, deptSect, institute, doct, region2,
        cont_gracedate, dateofjoining, category, retirementyear, cont_perioddate, permantPin, region1,
        yearage, mobileno, landphone, email, designation, bloodgrp, presentPin, mnthage, dayge, religion,
        Salary, empstatus, addressPermnt1, addressPermnt2, addressPresent1, addressPresent2, doctortype,
        probationendDate, prob_status, contractflag, clinictype, doctor])

    const clearForm = useCallback(() => {
        setEmpno('')
        setEmpname('')
        setGender(0)
        setdateofbirth('')
        setDateofJoining('')
        setSalary('')
        setaddressPermnt1('')
        setaddressPermnt2('')
        setaddressPresent1('')
        setaddressPresent2('')
        setPermantPin('')
        setPresentPin('')
        setLandphone('')
        setMobileno('')
        setEmail('')
        agesetstate(0)
        setDept(0)
        setRegion1(0)
        setCategory(0)
        setBloodgrp(0)
        setDoct(0)
        setSalutation(0)
        setBranch(0)
        setDeptSect(0)
        setInstitute(0)
        setDesignation(0)
        setReligion(0)
        setRegion2(0)
        setcont_perioddate('')
        setProbationEndDate('')
        setretirementyear('')
        setcont_gracedate('')
        setClinictype(0)
        setDoctor(false)
    }, [])

    const Notification = async () => {
        history.push('/Home/EmployeeRecord')
    }


    const submitemployeerecord = useCallback(() => {

        const today = moment(new Date()).format('YYYY-MM-DD');
        const probdate = moment(oldprob_end_date).format('YYYY-MM-DD');
        const cont_date = moment(old_cont_end_date).format('YYYY-MM-DD');

        const updateContractEmp = async (submitdata) => {
            const result = await axioslogin.patch('/empmast/empregister/Edit', submitdata);
            const { success, message } = result.data;
            if (success === 1) {
                const result = await axioslogin.get(`/empmast/${id}`)
                const { success, data } = result.data
                if (success === 1) {
                    const postContractDetl = {
                        em_id: no,
                        em_no: id,
                        em_cont_start: dateofjoining,
                        em_cont_end: moment(cont_perioddate).format('YYYY-MM-DD'),
                        em_prob_end_date: moment(probationendDate).format('YYYY-MM-DD'),
                        em_conf_end_date: moment(cont_gracedate).format('YYYY-MM-DD'),
                        status: contractflag === 0 ? 0 : 1
                    }
                    const result = await axioslogin.post('/empmast/createContract', postContractDetl)
                    const { success, message } = result.data
                    if (success === 1) {
                        Notification().then(succesNofity("Data Updated Successfully!"))
                        clearForm()
                    }
                    else {
                        warningNofity(message)
                    }
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

        const updateFunction = async (submitdata) => {
            const result = await axioslogin.patch('/empmast/empregister/Edit', submitdata);
            const { success, message } = result.data;
            if (success === 1) {
                const result = await axioslogin.get(`/empmast/${id}`)
                const { success, data, message } = result.data
                if (success === 1) {
                    succesNofity(message)
                    clearForm()
                    Notification().then(succesNofity("Data Updated Successfully!"))
                    // history.push('/Home/EmployeeRecord')
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
        if (contractflag === 1) {
            if (cont_date < today) {
                infoNofity("Employee Contract Date Already Exceeded, You Can Edit This Employee Through Contract Renewal Process!")
            } else {
                updateContractEmp(submitdata)
            }
        } else {
            if (probdate < today) {
                infoNofity("Employee Probation date already Exceeded!!You Can Edit This Employee Through Company Information!")
            } else {
                updateFunction(submitdata)
            }

        }
    }, [submitdata, oldprob_end_date, old_cont_end_date, id])

    return (
        <>
            <SessionCheck />
            <ToastContainer />
            <CustomLayout title="Employee Register Edit" displayClose={true} >
                <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }} >
                        <CustmTypog title='Personal Details' />
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoySalutation value={salutation} setValue={setSalutation} />
                        </Box>
                        <Box sx={{ flex: 2, mt: 0.5, px: 0.3, }} >
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Employee Name"
                                name="empname"
                                value={empname}
                                onchange={(e) => setEmpname(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Employee Number"
                                name="empno"
                                value={empno}
                                onchange={(e) => setEmpno(e.target.value)}
                            />
                        </Box>
                    </Box>
                    {/* Second Line */}
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Tooltip title="Permanent House Name" followCursor placement='top' arrow>
                            <Box sx={{ flex: 2, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Permanent Address"
                                    name="addressPermnt1"
                                    value={addressPermnt1}
                                    onchange={(e) => setaddressPermnt1(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Tooltip title="Permanent Street Name" followCursor placement='top' arrow>
                            <Box sx={{ flex: 2, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Permanent Address"
                                    name="addressPermnt2"
                                    value={addressPermnt2}
                                    onchange={(e) => setaddressPermnt2(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Tooltip title="Pin Code" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Pincode"
                                    name="permantPin"
                                    value={permantPin}
                                    onchange={(e) => setPermantPin(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyRegion regValue={region1} getRegion={setRegion1} />
                        </Box>
                    </Box>
                    {/* Third Line */}
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Tooltip title="Present House Name" followCursor placement='top' arrow>
                            <Box sx={{ flex: 2, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Present Address"
                                    name="addressPresent1"
                                    value={addressPresent1}
                                    onchange={(e) => setaddressPresent1(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Tooltip title="Present Street Name" followCursor placement='top' arrow>
                            <Box sx={{ flex: 2, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Present Address"
                                    name="addressPresent2"
                                    value={addressPresent2}
                                    onchange={(e) => setaddressPresent2(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Tooltip title="Pin Code" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Pincode"
                                    name="presentPin"
                                    value={presentPin}
                                    onchange={(e) => setPresentPin(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyRegion regValue={region2} getRegion={setRegion2} />
                        </Box>
                    </Box>
                    {/* fourth Line */}
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyGender value={gender} setValue={setGender} />
                        </Box>
                        <Tooltip title="Mobile No" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Mobile Number"
                                    name="mobileno"
                                    value={mobileno}
                                    onchange={(e) => setMobileno(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Tooltip title="Landline" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Land Phone"
                                    name="landphone"
                                    value={landphone}
                                    onchange={(e) => setLandphone(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Tooltip title="Email" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onchange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                    </Box>
                    {/* Fifth Row */}
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyBloodGroup value={bloodgrp} setValue={setBloodgrp} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyReligion value={religion} setValue={setReligion} />
                        </Box>
                        <Tooltip title="Date of Birth" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="date"
                                    size="sm"
                                    placeholder="Date of Birth"
                                    name="dateofbirth"
                                    value={dateofbirth}
                                    onchange={(e) => getBirthDate(e)}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, display: 'flex', flexDirection: 'row' }} >
                            <Box sx={{ flex: 1 }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Date of Birth"
                                    name="yearage"
                                    value={yearage}
                                    disabled
                                />
                            </Box>
                            <Box sx={{ flex: 1, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Date of Birth"
                                    name="mnthage"
                                    value={mnthage}
                                    disabled
                                />
                            </Box>
                            <Box sx={{ flex: 1, }} >
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Date of Birth"
                                    name="dayge"
                                    value={dayge}
                                    disabled
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, mt: 1, px: 0.3, bgcolor: 'lightgray' }} >
                        <CustmTypog title='Officaial Details' />
                    </Box>

                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Tooltip title="Date of Joining" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                <InputComponent
                                    type="date"
                                    size="sm"
                                    placeholder="Date of Joining"
                                    name="dateofjoining"
                                    value={dateofjoining}
                                    onchange={(e) => setDateofJoining(e.target.value)}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyGradeSelect value={grade} setValue={setGrade} />
                        </Box>
                        <Box sx={{ mt: 1.5, pl: 0.5, }} >
                            <JoyCheckbox
                                // label='Employee Status'
                                name="doctortype"
                                checked={doctortype}
                                onchange={(e) => setDoctortype(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.5, }} >
                            <JoyDoctorTypeSelect value={doct} setValue={setDoct} disabled={doctortype === true ? false : true} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyBranchSelect value={branch} setValue={setBranch} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyDepartment deptValue={dept} getDept={setDept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyDepartmentSection sectValues={deptSect} getSection={setDeptSect} dept={dept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyInstitutionSelect value={institute} setValue={setInstitute} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyDesignationSelect desgValue={designation} getDesg={setDesignation} />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyCategorySelect value={category} setValue={setCategory} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <JoyClicnicalType value={clinictype} setValue={setClinictype} />
                        </Box>
                        <Box sx={{
                            mt: 1.5, pl: 0.5,
                        }} >
                            <JoyCheckbox
                                label='Check If Doctor'
                                name="doctor"
                                checked={doctor}
                                disabled={clinictype === 1 ? false : true}
                                onchange={(e) => setDoctor(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <InputComponent
                                type="text"
                                size="sm"
                                placeholder="Proposed Salary"
                                name="Salary"
                                value={Salary}
                                onchange={(e) => setSalary(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ mt: 1.5, pl: 0.5, }} >
                            <JoyCheckbox
                                label='Employee Status'
                                name="empstatus"
                                checked={empstatus}
                                onchange={(e) => setempstatus(e.target.checked)}
                            />
                        </Box>
                    </Box>
                    {/* Footer Section */}
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Tooltip title="Save" followCursor placement='top' arrow>
                            <Box sx={{ px: 0.5, mt: 0.9 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="sm"
                                        color="primary"
                                        onClick={submitemployeerecord}
                                    >
                                        <SaveIcon />
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                        </Tooltip>
                        <Tooltip title="View" followCursor placement='top' arrow>
                            <Box sx={{ px: 0.5, mt: 0.9 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="sm"
                                        color="primary"
                                        onClick={toTable}
                                    >
                                        <PreviewIcon />
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                        </Tooltip>
                        <Tooltip title="Close" followCursor placement='top' arrow>
                            <Box sx={{ px: 0.5, mt: 0.9 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                        size="sm"
                                        color="primary"
                                        onClick={toTable}
                                    >
                                        <CloseIcon />
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
            </CustomLayout>
        </>
    )
}

export default memo(EmployeeRecordEdit)