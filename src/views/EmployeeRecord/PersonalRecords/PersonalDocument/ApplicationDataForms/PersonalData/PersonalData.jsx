import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Tooltip, Typography } from '@mui/joy'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import moment from 'moment';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import { axioslogin } from 'src/views/Axios/Axios';

const PersonalDataformExp = lazy(() => import('./PersonalDataformExp'))
const PersonalDataAccademic = lazy(() => import('./PersonalDataAccademic'))
const PersonalDataHighlights = lazy(() => import('./PersonalDataHighlights'))


const PersonalData = ({ setEmpdata, Empdata, Files }) => {

    const [Value, setValue] = useState({});
    const Employee = useMemo(() => Empdata, [Empdata]);
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [educaton, seteducation] = useState([])
    const [experience, setexperience] = useState([])

    //for getting the langauge details
    const [Langauge, setLangauge] = useState({
        MalayalamWrt: false,
        EngWrt: false,
        HindiWrt: false,
        OthrWrt: false,
        Malayalamspk: false,
        Engspk: false,
        Hindispk: false,
        Othrspk: false,
        Malayalamrd: false,
        Engrd: false,
        Hindird: false,
        Othrsrd: false,
    })
    const { MalayalamWrt,
        EngWrt,
        HindiWrt,
        OthrWrt,
        Malayalamspk,
        Engspk,
        Hindispk,
        Othrspk,
        Malayalamrd,
        Engrd,
        Hindird,
        Othrsrd,
    } = Langauge
    //for getting the employe details
    const [FormData, setFormData] = useState({
        fatherName: '',
        Permanentaddrs: '',
        Permanentaddrs1: '',
        Presentaddrs: '',
        Presentaddrs1: '',
        em_phone: '',
        em_mobile: "",
        em_email: "",
        em_gender: "",
        relg_name: "",
        em_dob: moment(new Date()).format('dd-mm-yyyy'),
        em_license_no: "",
        em_passport_no: "",
        em_account_no: "",
        em_fathers_name: "",
        edu: [],
        exp: [],
    })
    const {
        Permanentaddrs,
        Presentaddrs,
        Permanentaddrs1,
        Presentaddrs1,
        em_phone,
        em_mobile,
        em_email,
        em_gender,
        em_dob,
        relg_name,
        em_passport_no,
        em_license_no,
        em_account_no,
        em_fathers_name
    } = FormData

    //for Getting educational data
    const [EduData, setEduData] = useState({
        SslcInsti: '',
        SslcYear: '',
        SslcRank: '',
        other: '',
    })
    const { other } = EduData

    //for Getting experience data
    const [ExpData, setExpData] = useState([{
        instiname: '',
        position: '',
        dateFrom: "",
        dateto: "",
        Salery: '',
        em_no: Employee?.em_no,
        em_id: Employee?.em_id
    }]);
    //for Getting Professional Highlights
    const [HighData, setHighData] = useState({
        assignment: "",
        archieved: '',
        Current: "",
        Others: "",
        MonthlySalary: '',
        requiredtoJoin: '',
        CareerGoals: "",
        Hobbies: "",
        skill: "",
        Demands: "",
        datesaved: "",
        computer: ""
    });
    const { assignment, archieved, Current, Others, MonthlySalary, requiredtoJoin, CareerGoals, Hobbies, skill, Demands, datesaved, computer } = HighData
    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,

        }
    }, [Employee])

    //for getting the details already entered
    useEffect(() => {
        if (Employee.length !== 0) {
            const getCommonSettings = async () => {

                const { addressPermnt1, addressPermnt2, em_phone, em_mobile, em_email, em_gender, em_dob, relg_name, em_passport_no,
                    em_license_no, em_fathers_name, em_account_no, addressPresent1, addressPresent2 } = Employee

                const exp = JSON?.parse(Employee?.Experience_details)
                const edu = JSON?.parse(Employee?.Education_details)

                const formData = {
                    // fatherName: '',
                    Permanentaddrs: addressPermnt1 === null ? "Not Updated" : addressPermnt1,
                    Permanentaddrs1: addressPermnt2 === null ? "Not Updated" : addressPermnt2,
                    Presentaddrs: addressPresent1 === null ? "Not Updated" : addressPresent1,
                    Presentaddrs1: addressPresent2 === null ? "Not Updated" : addressPresent2,
                    em_phone: em_phone === null ? "Not Updated" : em_phone,
                    em_mobile: em_mobile === null ? "Not Updated" : em_mobile,
                    em_email: em_email === null ? "Not Updated" : em_email,
                    em_gender: em_gender === null ? "Not Updated" : em_gender === 1 ? "Male" : em_gender === 2 ? "Female" : "Other",
                    em_dob: em_dob === null ? "Not Updated" : em_dob,
                    relg_name: relg_name === null ? 0 : relg_name,
                    em_passport_no: em_passport_no === null ? 0 : em_passport_no,
                    em_license_no: em_license_no === null ? 0 : em_license_no,
                    em_account_no: em_account_no === null ? 0 : em_account_no,
                    em_fathers_name: em_fathers_name === null ? "not updated" : em_fathers_name,
                    exp: exp,
                    edu: edu,
                }
                // setReligion(religion)
                setFormData(formData)

                const result = await axioslogin.post('/PersonalChecklist/personaldata', personaldata)
                const { success, data } = result.data
                if (success === 1 && data.length > 0) {
                    const { english_read, english_speak, english_write, hindi_read, hindi_speak, hindi_write, malayalam_read, malayalam_speak, malayalam_write,
                        other_langauge, other_read, other_speak, other_write } = data[0]
                    const frmdata = {
                        MalayalamWrt: malayalam_write === 1 ? true : false,
                        EngWrt: english_write === 1 ? true : false,
                        HindiWrt: hindi_write === 1 ? true : false,
                        OthrWrt: other_write === 1 ? true : false,
                        Malayalamspk: malayalam_speak === 1 ? true : false,
                        Engspk: english_speak === 1 ? true : false,
                        Hindispk: hindi_speak === 1 ? true : false,
                        Othrspk: other_speak === 1 ? true : false,
                        Malayalamrd: malayalam_read === 1 ? true : false,
                        Engrd: english_read === 1 ? true : false,
                        Hindird: hindi_read === 1 ? true : false,
                        Othrsrd: other_read === 1 ? true : false,
                    }
                    const langdata = {
                        other: other_langauge === null ? "not updated" : other_langauge
                    }
                    setEduData(langdata)
                    setLangauge(frmdata)

                }
                const resultedu = await axioslogin.post('/PersonalChecklist/personaldataedu', personaldata)
                const { successedu, dataedu } = resultedu.data
                if (successedu === 1 && dataedu.length > 0) {
                    seteducation(dataedu)

                } else {
                    seteducation([])

                }
                const resultexp = await axioslogin.post('/PersonalChecklist/personaldataexp', personaldata)
                const { successexp, dataexp } = resultexp.data
                if (successexp === 1 && dataexp.length > 0) {
                    setexperience(dataexp)

                } else {
                    setexperience([])
                }

                const resulthigh = await axioslogin.post('/PersonalChecklist/personaldatahigh', personaldata)
                const { successhigh, datahigh } = resulthigh.data
                if (successhigh === 1 && datahigh.length > 0) {
                    setUpdateFlag(1)
                    const { Career_Goals, Current_salary, Demands, Details_of_Assignment, Expected_Monthly_Salary, Interests_Hobbies, Key_result_areas,
                        Others, personal_data_save, required_to_Join_date, skills, computer_awareness } = datahigh[0]
                    const highlightdata = {
                        assignment: Details_of_Assignment === null ? 'Not Updated' : Details_of_Assignment,
                        archieved: Key_result_areas === null ? 'Not Updated' : Key_result_areas,
                        Current: Current_salary === 0 ? 'Not Updated' : Current_salary,
                        Others: Others === null ? 'Not Updated' : Others,
                        MonthlySalary: Expected_Monthly_Salary === null ? 'Not Updated' : Expected_Monthly_Salary,
                        requiredtoJoin: required_to_Join_date === null ? 'Not Updated' : required_to_Join_date,
                        CareerGoals: Career_Goals === null ? 'Not Updated' : Career_Goals,
                        Hobbies: Interests_Hobbies === null ? 'Not Updated' : Interests_Hobbies,
                        skill: skills === null ? 'Not Updated' : skills,
                        Demands: Demands === null ? 'Not Updated' : Demands,
                        datesaved: personal_data_save === null ? 'Not Updated' : personal_data_save,
                        computer: computer_awareness === null ? 'Not Updated' : computer_awareness,

                    }
                    setHighData(highlightdata)
                }

            }
            getCommonSettings()
        }
    }, [Employee, personaldata])

    const updateCommonSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setLangauge({ ...Langauge, [e.target.name]: value })
    }
    const CommonSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setEduData({ ...EduData, [e.target.name]: value });
    }
    const HighLightSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setHighData({ ...HighData, [e.target.name]: value });
    }
    const PersonalSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...FormData, [e.target.name]: value });
    }
    const postdata = useMemo(() => {
        return {
            MalayalamWrt: MalayalamWrt === true ? 1 : 0,
            EngWrt: EngWrt === true ? 1 : 0,
            HindiWrt: HindiWrt === true ? 1 : 0,
            OthrWrt: OthrWrt === true ? 1 : 0,
            Malayalamspk: Malayalamspk === true ? 1 : 0,
            Engspk: Engspk === true ? 1 : 0,
            Hindispk: Hindispk === true ? 1 : 0,
            Othrspk: Othrspk === true ? 1 : 0,
            Malayalamrd: Malayalamrd === true ? 1 : 0,
            Engrd: Engrd === true ? 1 : 0,
            Hindird: Hindird === true ? 1 : 0,
            Othrsrd: Othrsrd === true ? 1 : 0,
            other: other,
            Value: Value,
            ExpData: ExpData,
            assignment: assignment,
            archieved: archieved,
            Current: Current,
            Others: Others,
            MonthlySalary: MonthlySalary,
            requiredtoJoin: requiredtoJoin,
            CareerGoals: CareerGoals,
            Hobbies: Hobbies,
            skill: skill,
            Demands: Demands,
            datesaved: datesaved,
            em_no: Employee?.em_no,
            em_id: Employee?.em_id,
            Permanentaddrs: Permanentaddrs,
            Permanentaddrs1: Permanentaddrs1,
            Presentaddrs1: Presentaddrs1,
            Presentaddrs: Presentaddrs,
            em_phone: em_phone,
            em_mobile: em_mobile,
            em_email: em_email,
            em_gender: em_gender,
            em_dob: em_dob,
            relg_name: relg_name,
            em_passport_no: em_passport_no,
            em_license_no: em_license_no,
            em_account_no: em_account_no,
            em_fathers_name: em_fathers_name,
            computer: computer,


        }
    }, [MalayalamWrt, EngWrt, HindiWrt, OthrWrt, Value, ExpData, Malayalamspk, Engspk, Hindispk, Othrspk, Malayalamrd, Engrd, Hindird, Othrsrd, computer, Permanentaddrs1,
        assignment, archieved, Current, Others, MonthlySalary, requiredtoJoin, CareerGoals, Hobbies, skill, Demands, Employee, datesaved, Presentaddrs1,
        Permanentaddrs, Presentaddrs, em_phone, other, em_mobile, em_email, em_gender, em_dob, relg_name, em_passport_no, em_license_no, em_account_no, em_fathers_name])

    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        const result = await axioslogin.post('/PersonalChecklist/PersonaldataInsert', postdata)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
        }
        else {
            warningNofity(message)
        }

        // setIsModalOpen(true)
    }, [postdata])

    const handleOnClickUpdate = useCallback(async (event) => {
        event.preventDefault()
        const result = await axioslogin.post('/PersonalChecklist/PersonaldataUpdate', postdata)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
        }
        else {
            warningNofity(message)
        }

        // setIsModalOpen(true)
    }, [postdata])
    return (
        <Box sx={{ height: window.innerHeight - 170, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1, width: '100%' }}>
            {/* <CustmTypog title={itemname} /> */}
            <TableContainer sx={{}}>
                <Table sx={{ p: 0, border: '1px solid #e0e0e0', }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Name </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.em_name} </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Father&apos;s Name </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>

                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="fathername"
                                    value={em_fathers_name}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                        </TableRow>
                        {/* <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Permanent Address(with pincode)</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Present Address(with pincode) </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="Permanentaddrs"
                                    value={Permanentaddrs}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="Presentaddrs"
                                    value={Presentaddrs}
                                    onchange={(e) => PersonalSettings(e)}
                                />
                            </TableCell>

                        </TableRow> */}

                    </TableBody>
                </Table>
                <Typography level="title-md" sx={{ ml: 1 }}>Permanent Address(with pincode)</Typography>

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="Permanentaddrs"
                                    value={Permanentaddrs}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="Permanentaddrs1"
                                    value={Permanentaddrs1}
                                    onchange={(e) => PersonalSettings(e)}
                                />
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                <Typography level="title-md" sx={{ ml: 1 }}>Present Address(with pincode) </Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="Presentaddrs"
                                    value={Presentaddrs}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="Presentaddrs1"
                                    value={Presentaddrs1}
                                    onchange={(e) => PersonalSettings(e)}
                                />
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Land Phone </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="em_phone"
                                    value={em_phone}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Passport No </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="em_passport_no"
                                    value={em_passport_no}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Mob </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="em_mobile"
                                    value={em_mobile}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Driving License No</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="em_license_no"
                                    value={em_license_no}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Email </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>

                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="em_email"
                                    value={em_email}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Permanent Account Number</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="em_account_no"
                                    value={em_account_no}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Nationality </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                {/* <JoyInput
                                    size="sm"
                                    // value={Presentaddrs}
                                    // onchange={setPresentaddrs}
                                    name="fatherName"
                                    type="text"
                                /> */}
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Gender</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="em_gender"
                                    value={em_gender}
                                    disabled={true}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Religion/Community </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1 }}>{relg_name === '' ? "Not Updated" : relg_name} </Typography>

                                {/* <JoyReligion value={Religion} setValue={setReligion} /> */}

                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Date of Birth</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="date"
                                    size="sm"
                                    name="em_dob"
                                    value={em_dob}
                                    onchange={(e) => PersonalSettings(e)}
                                />

                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
                {/* <Table>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '25%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Family Details </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '80%' }}>
                                <JoyInput
                                    size="sm"
                                    // value={Presentaddrs}
                                    // onchange={setPresentaddrs}
                                    name="fatherName"
                                    type="text"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table> */}
                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}> Langauge Known </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Write </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Speak </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Read </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Malayalam </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="MalayalamWrt"
                                        checked={MalayalamWrt}
                                        onchange={(e) => updateCommonSettings(e)}
                                    />

                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="Malayalamspk"
                                        checked={Malayalamspk}
                                        onchange={(e) => updateCommonSettings(e)}
                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1, }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="Malayalamrd"
                                        checked={Malayalamrd}
                                        onchange={(e) => updateCommonSettings(e)}
                                    />
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>English </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="EngWrt"
                                        checked={EngWrt}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="Engspk"
                                        checked={Engspk}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="Engrd"
                                        checked={Engrd}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Hindi </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="HindiWrt"
                                        checked={HindiWrt}
                                        onchange={(e) => updateCommonSettings(e)}

                                    /></Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="Hindispk"
                                        checked={Hindispk}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="Hindird"
                                        checked={Hindird}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '5.7%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>Others </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="other"
                                    value={other}
                                    onchange={(e) => CommonSettings(e)}
                                />
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography level="title-md" sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="OthrWrt"
                                        checked={OthrWrt}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="Othrspk"
                                        checked={Othrspk}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1 }}>
                                    <JoyCheckbox
                                        sx={{ p: 1 }}
                                        name="Othrsrd"
                                        checked={Othrsrd}
                                        onchange={(e) => updateCommonSettings(e)}
                                    /></Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <PersonalDataAccademic Employee={Employee} CommonSettings={CommonSettings} EduData={EduData} Value={Value} setValue={setValue} FormData={FormData}
                educaton={educaton} HighData={HighData} HighLightSettings={HighLightSettings} />
            <PersonalDataformExp Employee={Employee} ExpData={ExpData} setExpData={setExpData} experience={experience} FormData={FormData} />
            <PersonalDataHighlights Empdata={Empdata} HighData={HighData} HighLightSettings={HighLightSettings} />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                {UpdateFlag === 0 ?
                    <Tooltip title="Save">
                        <Button
                            variant="outlined"
                            component="label"
                            size="sm"
                            color="primary"
                            onClick={handleOnClick}
                        >
                            Submit Application
                        </Button>
                    </Tooltip>
                    :
                    <Tooltip title="Update">
                        <Button
                            variant="outlined"
                            component="label"
                            size="sm"
                            color="primary"
                            onClick={handleOnClickUpdate}
                        >
                            Update Application
                        </Button>
                    </Tooltip>
                }

            </Box>

        </Box>
    )
}

export default memo(PersonalData)