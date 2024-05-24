
import React, { useCallback, useEffect, memo, useState, lazy } from 'react'
// import { useHistory } from 'react-router'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
// import { employeeNumber } from 'src/views/Constant/Constant'

import { ToastContainer } from 'react-toastify'
// import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Button, CssVarsProvider, Tooltip, Modal, ModalClose } from '@mui/joy'
// import JoySalutation from 'src/views/MuiComponents/JoyComponent/JoySalutation'
import SaveIcon from '@mui/icons-material/Save';
// import PreviewIcon from '@mui/icons-material/Preview';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyRegion from 'src/views/MuiComponents/JoyComponent/JoyRegion'
import JoyGender from 'src/views/MuiComponents/JoyComponent/JoyGender'
import JoyBloodGroup from 'src/views/MuiComponents/JoyComponent/JoyBloodGroup'
// import JoyReligion from 'src/views/MuiComponents/JoyComponent/JoyReligion'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import JoyBranchSelect from 'src/views/MuiComponents/JoyComponent/JoyBranchSelect'
import JoyInstitutionSelect from 'src/views/MuiComponents/JoyComponent/JoyInstitutionSelect'
import JoyDesignationSelect from 'src/views/MuiComponents/JoyComponent/JoyDesignationSelect'
import JoyCategorySelect from 'src/views/MuiComponents/JoyComponent/JoyCategorySelect'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoyGradeSelect from 'src/views/MuiComponents/JoyComponent/JoyGradeSelect'
import JoyDoctorTypeSelect from 'src/views/MuiComponents/JoyComponent/JoyDoctorTypeSelect'
import { addDays, addYears } from 'date-fns'
import { useDispatch } from 'react-redux'
// import _ from 'underscore'
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment'
import JoyDepartmentSection from 'src/views/MuiComponents/JoyComponent/JoyDepartmentSection'
import { setDepartment } from 'src/redux/actions/Department.action'
import { getDepartmentSection } from 'src/redux/actions/Common.Action'
import JoyClicnicalType from 'src/views/MuiComponents/JoyComponent/JoyClicnicalType'

const Qualification = lazy(() => import('./Qualification'))
const ConvertionSubmitModal = lazy(() => import('./ConvertionSubmitModal'))


const ConvertionModal = ({ isModalOpen, setIsModalOpen, item, personaldata }) => {

    // const history = useHistory();
    const dispatch = useDispatch()
    const [gender, setGender] = useState(0)
    const [bloodgrp, setBloodgrp] = useState(0)
    const [grade, setGrade] = useState(0)
    const [doctortype, setDoctortype] = useState(false)
    const [modalopen, setModalOpen] = useState(false)
    const [doct, setDoct] = useState(0)
    const [dateofbirth, setdateofbirth] = useState('')
    const [empno, setEmpno] = useState('')
    // const [salutation, setSalutation] = useState(0)
    const [empname, setEmpname] = useState('')
    const [mobileno, setMobileno] = useState('')
    const [email, setEmail] = useState('')
    const [permantPin, setPermantPin] = useState('')
    const [retirementyear, setretirementyear] = useState('')
    const [cont_gracedate, setcont_gracedate] = useState('')
    const [probationendDate, setProbationEndDate] = useState('')
    const [cont_perioddate, setcont_perioddate] = useState('')
    const [contractflag, setcontractflag] = useState(0)
    const [prob_status, setProb_status] = useState(0)
    const [clinictype, setClinictype] = useState(0)
    const [doctor, setDoctor] = useState(false)
    const [landphone, setLandphone] = useState('')
    const [region1, setRegion1] = useState(0)
    // const [religion, setReligion] = useState(0)
    const [addressPresent1, setaddressPresent1] = useState('')
    const [addressPresent2, setaddressPresent2] = useState('')
    const [addressPermnt1, setaddressPermnt1] = useState('')
    const [addressPermnt2, setaddressPermnt2] = useState('')
    const [dept, setDept] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [institute, setInstitute] = useState(0)
    const [designation, setDesignation] = useState(0)
    const [category, setCategory] = useState(0)
    const [Salary, setSalary] = useState('')
    const [empstatus, setempstatus] = useState(true)
    const [branch, setBranch] = useState(0)
    const [application_no, setapplication] = useState(0)
    // const [grade, setGrade] = useState(0)
    // usestate for age
    const [agestate, agesetstate] = useState({
        yearage: 0,
        mnthage: 0,
        dayge: 0,
    })
    const { yearage, mnthage, dayge } = agestate

    const [details, setDetails] = useState({
        dateofjoing: (moment(new Date()).format('DD-MM-YYYY'))
    })
    const { dateofjoing } = details;

    useEffect(() => {

        const { first_name, last_name, reg_pincode, email, mobile_num, region, application_no } = item
        setEmpname(first_name + ' ' + last_name)
        setPermantPin(reg_pincode)
        setRegion1(region)
        setMobileno(mobile_num)
        setEmail(email)
        // setReligion(religion)
        setapplication(application_no)

    }, [item])

    useEffect(() => {
        if (personaldata && personaldata.length > 0) {
            const { dateofjoing } = personaldata[0]
            const exp = JSON.parse(personaldata[0].Experience_details)
            const edu = JSON.parse(personaldata[0].Education_details)

            const details = {
                dateofjoing: dateofjoing,
                exp: exp,
                edu: edu,

            }
            setDetails(details)
        }
        else {
            setDetails({})
        }

    }, [personaldata])

    useEffect(() => {
        dispatch(setDepartment());

        if (dept !== 0) {
            dispatch(getDepartmentSection(dept))
        }
    }, [dispatch, dept])


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
                var today = new Date(dateofjoing)
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
    }, [category, dateofjoing])


    // for submition
    const submitmodal = useCallback(
        (e) => {
            e.preventDefault()
            setModalOpen(true)

        }, [])

    return (
        <Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 1500,
                        height: 500,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,
                        overflowX: "auto", '::-webkit-scrollbar': { display: "none" }
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />

                    <>
                        <SessionCheck />
                        <ToastContainer />
                        {/* <CustomLayout title="Employee Register" displayClose={true} > */}
                        <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column', overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                            <Box sx={{ flex: 1, mt: 1, px: 0.3 }} >
                                <CustmTypog title='Personal Details' />
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <InputComponent
                                        disabled
                                        type="text"
                                        size="sm"
                                        placeholder="Salutation"
                                        name="empname"
                                        value={item?.sal_name}

                                    // onchange={(e) => setEmpname(e.target.value)}
                                    />
                                    {/* <JoySalutation
                                        value={item?.salutation} setValue={setSalutation}
                                    /> */}
                                </Box>
                                <Tooltip title=" Name" followCursor placement='top' arrow>
                                    <Box sx={{ flex: 2, mt: 0.5, px: 0.3, }} >
                                        <InputComponent
                                            // disabled
                                            type="text"
                                            size="sm"
                                            placeholder="Employee Name"
                                            name="empname"
                                            value={empname}
                                            onchange={(e) => setEmpname(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                {/* <Tooltip title=" Name" followCursor placement='top' arrow>
                                    <Box sx={{ flex: 2, mt: 0.5, px: 0.3, }} >
                                        <InputComponent
                                            disabled
                                            type="text"
                                            size="sm"
                                            placeholder="Employee Name"
                                            name="empname"
                                            value={item?.last_name}
                                        // onchange={(e) => setEmpname(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip> */}

                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <InputComponent
                                        // disabled
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
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
                                            // disabled
                                            type="text"
                                            size="sm"
                                            placeholder="Pincode"
                                            name="permantPin"
                                            value={permantPin === null ? "Not Updated" : permantPin}
                                            onchange={(e) => setPermantPin(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    {/* <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                        <InputComponent
                                            disabled
                                            type="text"
                                            size="sm"
                                            placeholder="Pincode"
                                            name="permantPin"
                                            value={item?.reg_name === null ? 'Not Updated' : item?.reg_name}
                                        // onchange={(e) => setPermantPin(e.target.value)}
                                        />
                                    </Box> */}

                                    <JoyRegion
                                        regValue={region1 === null ? "Not Updated" : region1}
                                    />
                                </Box>
                            </Box>
                            {/* Third Line */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
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
                                            // disabled
                                            type="text"
                                            size="sm"
                                            placeholder="Pincode"
                                            name="presentPin"
                                            value={permantPin === null ? "Not Updated" : permantPin}
                                            onchange={(e) => setPermantPin(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    {/* <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                        <InputComponent
                                            disabled
                                            type="text"
                                            size="sm"
                                            placeholder="Pincode"
                                            name="permantPin"
                                            value={item?.reg_name === null ? 'Not Updated' : item?.reg_name}
                                        // onchange={(e) => setPermantPin(e.target.value)}
                                        />
                                    </Box> */}
                                    <JoyRegion
                                        regValue={region1 === null ? "Not Updated" : region1} getRegion={setRegion1}
                                    />
                                </Box>
                            </Box>
                            {/* fourth Line */}
                            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyGender
                                        value={gender} setValue={setGender}
                                    />
                                </Box>
                                <Tooltip title="Mobile No" followCursor placement='top' arrow>
                                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                        <InputComponent
                                            // disabled
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
                                            // disabled
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
                            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyBloodGroup
                                        value={bloodgrp} setValue={setBloodgrp}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                        <InputComponent
                                            disabled
                                            type="text"
                                            size="sm"
                                            placeholder="religion"
                                            name="email"
                                            value={item?.relg_name}
                                        // onchange={(e) => setEmail(e.target.value)}
                                        />
                                    </Box>

                                    {/* <JoyReligion
                                        Value={religion} setValue={setReligion}
                                    /> */}
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
                            {/* <Box sx={{ flex: 1, mt: 1, bgcolor: 'lightgray' }} > */}
                            <CustmTypog title='Official Details' />
                            {/* </Box> */}

                            <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                                <Tooltip title="Date of Joining" followCursor placement='top' arrow>
                                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                        <InputComponent
                                            disabled
                                            type="date"
                                            size="sm"
                                            placeholder="Date of Joining"
                                            name="dateofjoining"
                                            value={dateofjoing}
                                        // onchange={(e) => setDateofJoining(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyGradeSelect
                                        value={grade} setValue={setGrade}
                                    />
                                </Box>
                                <Box sx={{ mt: 1.5, pl: 0.5, }} >
                                    <JoyCheckbox
                                        label='Employee Status'
                                        name="doctortype"
                                        checked={doctortype}
                                        onchange={(e) => setDoctortype(e.target.checked)}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.5, }} >
                                    <JoyDoctorTypeSelect
                                        value={doct} setValue={setDoct} disabled={doctortype === true ? false : true}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyBranchSelect
                                        value={branch} setValue={setBranch}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'row', }}>

                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyDepartment
                                        deptValue={dept} getDept={setDept}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyDepartmentSection
                                        sectValues={deptSect} getSection={setDeptSect} dept={dept}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyInstitutionSelect
                                        value={institute} setValue={setInstitute}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyDesignationSelect
                                        desgValue={designation} getDesg={setDesignation}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyCategorySelect
                                        value={category} setValue={setCategory}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                                    <JoyClicnicalType
                                        value={clinictype} setValue={setClinictype}
                                    />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    mt: 1.5, px: 0.3,
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
                                <Box sx={{ mt: 1.5, px: 0.3, }} >
                                    <JoyCheckbox
                                        label='Employee Status'
                                        name="empstatus"
                                        checked={empstatus}
                                        onchange={(e) => setempstatus(e.target.checked)}
                                    />
                                </Box>
                            </Box>
                            <Box>
                                <Qualification details={details} />
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
                                                onClick={submitmodal}
                                            >
                                                <SaveIcon />
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                </Tooltip>

                            </Box>
                        </Box>
                        {/* </CustomLayout> */}
                    </>
                    <ConvertionSubmitModal
                        modalopen={modalopen} setModalOpen={setModalOpen} empname={empname}
                        gender={gender} bloodgrp={bloodgrp} grade={grade} doctortype={doctortype} doct={doct} dateofbirth={dateofbirth} empno={empno}
                        mobileno={mobileno} email={email} permantPin={permantPin} retirementyear={retirementyear} cont_gracedate={cont_gracedate}
                        probationendDate={probationendDate} cont_perioddate={cont_perioddate} contractflag={contractflag} prob_status={prob_status}
                        clinictype={clinictype} doctor={doctor} landphone={landphone} region1={region1} item={item}
                        addressPresent1={addressPresent1} addressPresent2={addressPresent2} addressPermnt1={addressPermnt1} addressPermnt2={addressPermnt2}
                        dept={dept} deptSect={deptSect} institute={institute} designation={designation}
                        category={category} Salary={Salary} empstatus={empstatus} branch={branch} application_no={application_no}
                        yearage={yearage} mnthage={mnthage} dayge={dayge} dateofjoing={dateofjoing} details={details} setIsModalOpen={setIsModalOpen}

                    />
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(ConvertionModal)