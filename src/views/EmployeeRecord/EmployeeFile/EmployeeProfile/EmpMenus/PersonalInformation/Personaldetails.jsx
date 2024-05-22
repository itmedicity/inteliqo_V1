import { Button, CssVarsProvider, Typography, Select, Option, } from '@mui/joy'
import { Box, Checkbox, FormControl, Grid, IconButton, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { Fragment, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ReligionSelectRedux from 'src/views/MuiComponents/ReligionSelectRedux';
import BloodgrpSelectRedux from 'src/views/MuiComponents/BloodgrpSelectRedux';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useParams } from 'react-router-dom';
import { axiosellider, axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DetailsModel from './DetailsModel';
import { employeeNumber } from 'src/views/Constant/Constant';
import { memo } from 'react';
import RegionSelectRedux from 'src/views/MuiComponents/RegionSelectRedux';
import { useDispatch } from 'react-redux';
import { setRegionByPin } from 'src/redux/actions/Region.Action';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import BankSelection from 'src/views/Master/BankMaster/BankSelection';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import BankBranchselection from 'src/views/Master/BankMaster/BankBranchselection';

const Personaldetails = () => {

    const { id, no } = useParams()
    const [gender, setGender] = useState(0)
    const [religion, setReligion] = useState(0)
    const [marital_status, setMarital_status] = useState(0)
    const [bank, setBank] = useState(0)
    const [salarytype, setsalaryType] = useState(0)
    const [blood, setBlood] = useState(0)
    const [relation, setRelation] = useState(0)
    const [mrdnumber, setMrdnumber] = useState('')
    const [permanent_addr1, setPermanent_addr1] = useState('')
    const [addressPermnt2, setaddressPermnt2] = useState('')
    const [contactaddress1, setcontactaddress1] = useState('')
    const [contactaddress2, setcontactaddress2] = useState('')
    const [mobile, setmobile] = useState(0)
    const [land_no, setland_no] = useState(0)
    const [passp_no, setpassp_no] = useState('')
    const [license, setlicense] = useState('')
    const [adhar_no, setadhar_no] = useState('')
    const [email, setemail] = useState('')
    const [accountno, setaccountno] = useState(0)
    const [dob, setdob] = useState('')
    const [age, setage] = useState(0)
    const [ifsc, setifsc] = useState('')
    const [panmum, setpanmum] = useState('')
    const [open, setOpen] = useState(false)
    const [family_details, setFamily_details] = useState([])
    const [familArray, setFamilyArray] = useState([])
    const [count, setCount] = useState(0)

    const [presnt_pin, setPresent_pin] = useState(0)
    const [permnt_pin, setPermnt_pin] = useState(0)
    const [region1, setRegion1] = useState(0)
    const [region2, setRegion2] = useState(0)

    const [malayala_read, setMalayalam_read] = useState(false)
    const [malayala_write, setMalayalam_write] = useState(false)
    const [malayala_speak, setMalayalam_speak] = useState(false)

    const [english_read, setEnglish_read] = useState(false)
    const [english_write, setEnglish_write] = useState(false)
    const [english_speak, setEnglish_speak] = useState(false)

    const [hindi_read, setHindi_read] = useState(false)
    const [hindi_write, setHindi_write] = useState(false)
    const [hindi_speak, setHindi_speak] = useState(false)

    const [tamil_read, setTamil_read] = useState(false)
    const [tamil_write, setTamil_write] = useState(false)
    const [tamil_speak, setTamil_speak] = useState(false)

    const [arabic_read, setArabic_read] = useState(false)
    const [arabic_write, setArabci_write] = useState(false)
    const [arabic_speak, setArabic_speak] = useState(false)

    const [bankBranch, setBannkBranch] = useState(0)

    const dispatch = useDispatch();

    const pinValue = useMemo(() => presnt_pin, [presnt_pin])
    const contPin = useMemo(() => permnt_pin, [permnt_pin])

    const getRegion1 = useCallback(() => {
        if (contPin !== null) {
            dispatch(setRegionByPin(contPin));
        } else {
            dispatch(setRegionByPin(0));
        }
    }, [contPin, dispatch])

    const getRegion = useCallback(() => {
        if (pinValue !== null) {
            dispatch(setRegionByPin(pinValue));
        } else {
            dispatch(setRegionByPin(0));
        }
    }, [pinValue, dispatch])

    const relationAray = [
        { rel_slno: 1, name: 'Self' },
        { rel_slno: 2, name: 'Father' },
        { rel_slno: 3, name: 'Mother' },
        { rel_slno: 4, name: 'Brother' },
        { rel_slno: 5, name: 'Sister' },
        { rel_slno: 6, name: 'Spouse' },
        { rel_slno: 7, name: 'Children' },
    ]

    useEffect(() => {
        const getemployeedetails = async () => {
            const result = await axioslogin.get(`/common/getpersonalData/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_gender, em_dob, em_age_year, em_mobile, em_phone,
                    em_email, addressPermnt1, addressPermnt2, hrm_pin1, em_region, addressPresent1,
                    addressPresent2, hrm_pin2, hrm_region2, blood_slno, hrm_religion, em_bank,
                    em_account_no, em_ifsc, em_license_no, em_adhar_no, em_pan_no, em_passport_no,
                    salarytype, em_maritalstatus, em_bank_branch
                } = data[0]
                setPermanent_addr1(addressPermnt1)
                setaddressPermnt2(addressPermnt2)
                setPresent_pin(hrm_pin1)
                setcontactaddress1(addressPresent1)
                setcontactaddress2(addressPresent2)
                setPermnt_pin(hrm_pin2)
                setGender(em_gender === null ? 0 : parseInt(em_gender))
                setmobile(em_mobile)
                setland_no(em_phone)
                setpassp_no(em_passport_no)
                setlicense(em_license_no)
                setadhar_no(em_adhar_no)
                setemail(em_email)
                setReligion(hrm_religion === null ? 0 : parseInt(hrm_religion))
                setMarital_status(em_maritalstatus === null ? 0 : parseInt(em_maritalstatus))
                setBank(em_bank)
                setaccountno(em_account_no)
                setsalaryType(salarytype === null ? 0 : parseInt(salarytype))
                setBlood(blood_slno === null ? 0 : parseInt(blood_slno))
                setdob(em_dob)
                setage(em_age_year)
                setifsc(em_ifsc)
                setpanmum(em_pan_no)
                setRegion1(em_region === null ? 0 : parseInt(em_region))
                setRegion2(hrm_region2 === null ? 0 : parseInt(hrm_region2))
                setBannkBranch(em_bank_branch === 0 ? 0 : em_bank_branch)
            } else {
                setPermanent_addr1('')
                setaddressPermnt2('')
                setcontactaddress1('')
                setcontactaddress2('')
                setGender(0)
                setmobile('')
                setland_no('')
                setpassp_no('')
                setlicense('')
                setadhar_no('')
                setemail('')
                setReligion(0)
                setMarital_status(0)
                setBank(0)
                setaccountno(0)
                setsalaryType(0)
                setBlood(0)
                setdob('')
                setage(0)
                setifsc('')
                setpanmum('')
                setRegion1(0)
                setRegion2(0)
                setBannkBranch(0)
            }
        }
        getemployeedetails()

        const getLanguages = async () => {
            const result = await axioslogin.get(`/personaldetl/language/byno/${id}`);
            const { success, data } = result.data
            if (success === 1) {
                const { malayalam_speak, malayalam_read, malayalam_write,
                    hindi_write, hindi_speak, hindi_read, english_write, english_speak,
                    english_read, tamil_write, tamil_speak, tamil_read, arabic_write,
                    arabic_speak, arabic_read } = data[0]
                setMalayalam_read(malayalam_read === 1 ? true : false)
                setMalayalam_speak(malayalam_speak === 1 ? true : false)
                setMalayalam_write(malayalam_write === 1 ? true : false)

                setEnglish_read(english_read === 1 ? true : false)
                setEnglish_speak(english_speak === 1 ? true : false)
                setEnglish_write(english_write === 1 ? true : false)

                setHindi_read(hindi_read === 1 ? true : false)
                setHindi_speak(hindi_speak === 1 ? true : false)
                setHindi_write(hindi_write === 1 ? true : false)

                setTamil_read(tamil_read === 1 ? true : false)
                setTamil_speak(tamil_speak === 1 ? true : false)
                setTamil_write(tamil_write === 1 ? true : false)

                setArabci_write(arabic_write === 1 ? true : false)
                setArabic_read(arabic_read === 1 ? true : false)
                setArabic_speak(arabic_speak === 1 ? true : false)

            } else {
                setMalayalam_read(false)
                setMalayalam_speak(false)
                setMalayalam_write(false)

                setEnglish_read(false)
                setEnglish_speak(false)
                setEnglish_write(false)

                setHindi_read(false)
                setHindi_speak(false)
                setHindi_write(false)

                setTamil_read(false)
                setTamil_speak(false)
                setTamil_write(false)

                setArabci_write(false)
                setArabic_read(false)
                setArabic_speak(false)
            }
        }
        getLanguages()
    }, [id])

    //getting banl serial number for finding ifsc code
    useEffect(() => {
        if (bankBranch !== 0) {
            const getbankIfsc = async (e) => {
                const result = await axioslogin.get(`/bank/${bankBranch}`)
                const { success, data } = result.data
                if (success === 1) {
                    setifsc(data[0].bank_ifsc)
                }
                else {
                    setifsc(0)
                }
            }
            getbankIfsc()
        }
    }, [bankBranch])

    const getFamilyDetails = async () => {
        let uppercasetext = mrdnumber.toUpperCase();
        if (relation === 0 || uppercasetext === '') {
            warningNofity('Please Select Relation & MRD Number')
        } else {
            const result = await axiosellider.get(`/admission/patientInfo/${uppercasetext}`)
            const { success, data } = result.data
            if (success === 1) {
                setFamily_details(data);
                setOpen(true)

            } else {
                warningNofity("Please Enter Correct MRD Number!")
                setFamily_details([])
                setOpen(false)
            }
        }
    }

    useEffect(() => {
        const FamilyDetails = async () => {
            const result = await axioslogin.get(`/personaldetl/details/${no}`);
            const { success, data } = result.data
            if (success === 1) {
                setFamilyArray(data)
            } else {
                setFamilyArray([])
            }
        }
        FamilyDetails()
    }, [no, count])

    const insertLang = useMemo(() => {
        return {
            em_id: no,
            em_no: id,
            malayalam_speak: malayala_speak === true ? 1 : 0,
            malayalam_read: malayala_read === true ? 1 : 0,
            malayalam_write: malayala_write === true ? 1 : 0,
            hindi_write: hindi_write === true ? 1 : 0,
            hindi_speak: hindi_speak === true ? 1 : 0,
            hindi_read: hindi_read === true ? 1 : 0,
            english_write: english_write === true ? 1 : 0,
            english_speak: english_speak === true ? 1 : 0,
            english_read: english_read === true ? 1 : 0,
            tamil_write: tamil_write === true ? 1 : 0,
            tamil_speak: tamil_speak === true ? 1 : 0,
            tamil_read: tamil_read === true ? 1 : 0,
            arabic_write: arabic_write === true ? 1 : 0,
            arabic_speak: arabic_speak === true ? 1 : 0,
            arabic_read: arabic_read === true ? 1 : 0
        }
    }, [no, id, malayala_read, malayala_write, malayala_speak, hindi_read, hindi_speak, hindi_write,
        english_write, english_speak, english_read, tamil_write, tamil_speak, tamil_read, arabic_write,
        arabic_speak, arabic_read])


    const personaldataSubmit = async () => {
        const submitpersonal = {
            em_no: id,
            em_id: no,
            em_per_address1: permanent_addr1,
            em_per_address2: addressPermnt2,
            em_per_pincode: presnt_pin,
            em_pmnt_address1: contactaddress1,
            em_pmnt_address2: contactaddress2,
            em_pmnt_pincode: permnt_pin,
            em_passport_no: passp_no,
            em_pan_no: panmum,
            em_adhar_no: adhar_no,
            em_license_no: license,
            em_religion: religion,
            em_bloodgroup: blood,
            em_maritalstatus: marital_status,
            em_cont_mobile: mobile,
            em_cont_phone: land_no,
            em_bank: bank === 0 ? null : bank,
            em_account_no: accountno === '' ? 0 : accountno,
            em_ifsc: ifsc,
            emp_dob: dob,
            em_email: email,
            emp_yeargae: age,
            em_region: region1,
            hrm_region2: region2,
            salarytype: salarytype,
            em_bank_branch: bankBranch,
            create_user: employeeNumber()
        }

        const submitempmast = {
            em_no: id,
            em_id: no,
            em_per_address1: permanent_addr1,
            em_per_address2: addressPermnt2,
            em_per_pincode: presnt_pin,
            em_pmnt_address1: contactaddress1,
            em_pmnt_address2: contactaddress2,
            em_pmnt_pincode: permnt_pin,
            em_passport_no: passp_no,
            em_pan_no: panmum,
            em_adhar_no: adhar_no,
            em_license_no: license,
            em_religion: religion,
            em_bloodgroup: blood,
            em_maritalstatus: marital_status,
            em_cont_mobile: mobile,
            em_cont_phone: land_no,
            em_bank: bank === 0 ? null : bank,
            em_account_no: accountno === '' ? 0 : accountno,
            em_ifsc: ifsc,
            emp_dob: dob,
            em_email: email,
            emp_yeargae: age,
            em_region: region1,
            hrm_region2: region2,
            create_user: employeeNumber()
        }


        const resultemployee = await axioslogin.post('/personaldetl', submitpersonal);
        const { success, message } = resultemployee.data;
        if (success === 1) {
            const updateempmast = await axioslogin.patch('/empmast', submitempmast);
            const { success, message } = updateempmast.data;
            if (success === 2) {
                const result = await axioslogin.post('/personaldetl/langauge', insertLang);
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity("Data Saved Successfully")
                } else {
                    errorNofity(message)
                }
            } else {
                errorNofity(message)
            }
        } else {
            errorNofity(message)
        }
    }

    const deleteData = async (e, val) => {
        const { details_slno } = val;
        const result = await axioslogin.delete(`/personaldetl/${details_slno}`);
        const { success, message } = result.data
        if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
        } else {
            errorNofity(message)
            setCount(count + 1)
        }

    }

    const salaryType = [
        { slno: 1, name: "Account" },
        { slno: 2, name: "Cash" },
        { slno: 3, name: "Cheque" }
    ]


    return (
        <Fragment>
            <ToastContainer />
            <Suspense>
                <DetailsModel open={open} setOpen={setOpen} family_details={family_details}
                    empid={no} emno={id} relation={relation} count={count} setCount={setCount}
                    setMrdnumber={setMrdnumber} setRelation={setRelation} />
            </Suspense>
            <Box sx={{
                width: "100%", p: 1,
                // height: { xxl: 800, xl: 750, lg: 500, md: 500, sm: 500, xs: 350 },
                overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
            }} >
                {/* <Paper square elevation={0} > */}
                <Paper variant='outlined' square elevation={0} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Personal Information
                            </Typography>
                        </CssVarsProvider>
                    </Box>
                    <Tooltip title="Save" followCursor placement='top' arrow>
                        <Box sx={{ display: "flex", pr: 1 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="sm"
                                    color="primary"
                                    onClick={personaldataSubmit}
                                >
                                    <SaveIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Tooltip>
                </Paper>
                {/* <RegionSelectRedux getDept={changeDept} /> */}
                <Paper square elevation={0} sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" } }} >
                    <Box sx={{ display: "flex", flexDirection: "row", px: 0.5, width: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>

                            <Paper variant="outlined" sx={{ px: 1, width: "100%" }} >
                                <CssVarsProvider>
                                    <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                                        Present Address
                                    </Typography>
                                </CssVarsProvider>
                                <Tooltip title="Present House Name" followCursor placement='top' arrow >
                                    <Box sx={{ pt: 0.5 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            placeholder="Address 1"
                                            name="permanent_addr1"
                                            value={permanent_addr1}
                                            onchange={(e) => setPermanent_addr1(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Permanent Street Name" followCursor placement='top' arrow >
                                    <Box sx={{ pt: 0.5 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            placeholder="Address 2"
                                            name="addressPermnt2"
                                            value={addressPermnt2}
                                            onchange={(e) => setaddressPermnt2(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", py: 1 }}>
                                    <Tooltip title="Present Pincode" followCursor placement='top' arrow >
                                        <Box sx={{ flex: 1 }}>
                                            <InputComponent
                                                type="text"
                                                size="sm"
                                                placeholder="Pincode"
                                                name="permnt_pin"
                                                value={permnt_pin}
                                                onchange={(e) => setPermnt_pin(e.target.value)}
                                            />
                                        </Box>
                                    </Tooltip>
                                    <Tooltip title="Click" followCursor placement='top' arrow >
                                        <IconButton sx={{ paddingY: 0.5 }}
                                            onClick={(e) => getRegion1(e)}
                                        >
                                            <ArrowCircleRightIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Box sx={{ flex: 1 }}>
                                        <RegionSelectRedux value={region1} setValue={setRegion1} />
                                    </Box>
                                </Box>
                            </Paper >
                        </Box >
                        <Box sx={{ display: "flex", flexDirection: "row", flex: 1, backgroundColor: 'pink' }}>
                            <Paper variant="outlined" sx={{ px: 1, width: "100%" }} >
                                <CssVarsProvider>
                                    <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                                        Contact Address
                                    </Typography>
                                </CssVarsProvider>
                                <Tooltip title="Present-House Name" followCursor placement='top' arrow >
                                    <Box sx={{ pt: 0.5 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            placeholder="Address 1"
                                            name="contactaddress1"
                                            value={contactaddress1}
                                            onchange={(e) => setcontactaddress1(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Present-Street Name" followCursor placement='top' arrow >
                                    <Box sx={{ pt: 0.5 }}>
                                        <InputComponent
                                            type="text"
                                            size="sm"
                                            placeholder="Address 2"
                                            name="contactaddress2"
                                            value={contactaddress2}
                                            onchange={(e) => setcontactaddress2(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", py: 1 }}>

                                    <Tooltip title="Present Pincode" followCursor placement='top' arrow >
                                        <Box sx={{ flex: 1 }}>
                                            <InputComponent
                                                type="text"
                                                size="sm"
                                                placeholder="Pincode"
                                                name="presnt_pin"
                                                value={presnt_pin}
                                                onchange={(e) => setPresent_pin(e.target.value)}
                                            />
                                        </Box>
                                    </Tooltip>
                                    <Tooltip title="Click" followCursor placement='top' arrow >
                                        <IconButton sx={{ paddingY: 0.5 }}
                                            onClick={(e) => getRegion(e)}
                                        >
                                            <ArrowCircleRightIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Box sx={{ flex: 1 }}>
                                        <RegionSelectRedux value={region2} setValue={setRegion2} />
                                    </Box>
                                </Box>
                            </Paper >
                        </Box >
                    </Box >
                </Paper >
                <Paper square variant="outlined" elevation={0} sx={{ p: 0.5, mt: 0.5, display: 'flex', alignItems: "center", flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }, }} >
                    <Box sx={{ display: "flex", flexDirection: "column", px: 0.5, py: 0.5, width: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Box sx={{ flex: 1 }} >
                                <Select
                                    value={gender}
                                    onChange={(event, newValue) => {
                                        setGender(newValue);
                                    }}
                                    size='md'
                                    variant='outlined'
                                >
                                    <Option value={0} disabled>Select Gender</Option>
                                    <Option value={1}>Male</Option>
                                    <Option value={2}>Female</Option>
                                </Select>
                            </Box>
                            <Tooltip title="Mobile No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="Mobile No"
                                        name="mobile"
                                        value={mobile}
                                        onchange={(e) => setmobile(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Landline" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1, }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="Land Phone No"
                                        name="land_no"
                                        value={land_no}
                                        onchange={(e) => setland_no(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Passport No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1, }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="Passsport Number"
                                        name="passp_no"
                                        value={passp_no}
                                        onchange={(e) => setpassp_no(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="License No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1, }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="Driving License"
                                        name="license"
                                        value={license}
                                        onchange={(e) => setlicense(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Aadhar No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="Adhaar No"
                                        name="adhar_no"
                                        value={adhar_no}
                                        onchange={(e) => setadhar_no(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 1, width: "100%" }}>
                            <Box sx={{ flex: 1 }}>
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    placeholder="Email"
                                    name="email"
                                    value={email}
                                    onchange={(e) => setemail(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <ReligionSelectRedux value={religion} setValue={setReligion} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Select
                                    value={marital_status}
                                    onChange={(event, newValue) => {
                                        setMarital_status(newValue);
                                    }}
                                    size='md'
                                    variant='outlined'
                                >
                                    <Option value={0} disabled>Select Marital Status</Option>
                                    <Option value={1}>Married</Option>
                                    <Option value={2}>UnMarried</Option>
                                    <Option value={3}>Widow</Option>
                                    <Option value={4}>Divorcee</Option>
                                </Select>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <BankSelection value={bank} setValue={setBank} />
                            </Box>
                            <Tooltip title="Account No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="Account No"
                                        name="accountno"
                                        value={accountno}
                                        onchange={(e) => setaccountno(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Box sx={{ flex: 1 }}>
                                <Select
                                    value={salarytype}
                                    onChange={(event, newValue) => {
                                        setsalaryType(newValue);
                                    }}
                                    size='md'
                                    variant='outlined'
                                >
                                    <Option value={0} disabled>Select Salary Type</Option>
                                    {
                                        salaryType?.map((val, ind) => {
                                            return <Option key={ind} value={val.slno}>{val.name}</Option>
                                        })
                                    }
                                </Select>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 1, width: "100%" }}>
                            <Box sx={{ flex: 1 }}>
                                <BloodgrpSelectRedux value={blood} setValue={setBlood} />
                            </Box>
                            <Tooltip title="DOB" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }}>
                                    <InputComponent
                                        disabled={true}
                                        type="text"
                                        size="sm"
                                        placeholder="Date Of Birth"
                                        name="dob"
                                        value={dob}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Age" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }}>
                                    <InputComponent
                                        disabled={true}
                                        type="text"
                                        size="sm"
                                        placeholder="Age as of Now"
                                        name="age"
                                        value={age}
                                    />
                                </Box>
                            </Tooltip>
                            <Box sx={{ flex: 1 }}>
                                <BankBranchselection value={bankBranch} setValue={setBannkBranch} />
                            </Box>
                            <Tooltip title="IFSC" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }}>
                                    <InputComponent
                                        disabled={true}
                                        type="text"
                                        size="sm"
                                        placeholder="IFSC"
                                        name="ifsc"
                                        value={ifsc}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Pan No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="PAN NO"
                                        name="panmum"
                                        value={panmum}
                                        onchange={(e) => setpanmum(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>
                </Paper >


                <Box sx={{ display: "flex", flexDirection: "row", }}>
                    <Paper variant="outlined" sx={{ flex: 1 }} >
                        <Box sx={{}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                                    Family Details
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 1 }}>
                            <Box sx={{ flex: 1 }}>
                                <Select
                                    value={relation}
                                    onChange={(event, newValue) => {
                                        setRelation(newValue);
                                    }}
                                    size='md'
                                    variant='outlined'
                                >
                                    <Option value={0} disabled>Select Relation</Option>
                                    {
                                        relationAray?.map((val, ind) => {
                                            return <Option key={ind} value={val.rel_slno}>{val.name}</Option>
                                        })
                                    }
                                </Select>
                            </Box>
                            <Tooltip title="MRD NO" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        placeholder="Hospital MRD No"
                                        name="mrdnumber"
                                        value={mrdnumber}
                                        onchange={(e) => setMrdnumber(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Add" followCursor placement='top' arrow >
                                <IconButton sx={{ paddingY: 0.5 }}
                                    onClick={(e) => getFamilyDetails(e)}
                                >
                                    <ControlPointIcon color='primary' />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box component={Grid}
                            container
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            sx={{
                                display: 'flex',
                                overflow: 'auto',
                                '::-webkit-scrollbar': {
                                    height: 8,
                                },
                                '::-webkit-scrollbar-track': {
                                    boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
                                    borderRadius: '0px',
                                },

                                '::-webkit-scrollbar-thumb': {
                                    // background: '#077DFA',
                                    borderRadius: '0px',
                                },

                                '::-webkit-scrollbar-thumb:hover': {
                                    //   background: 'rgb(255, 251, 251)',
                                },
                                pt: 1
                            }} >
                            <TableContainer component={Grid}
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                                sx={{
                                    display: 'flex',
                                }}>
                                <Table sx={{}} size="small" >
                                    <TableHead>
                                        <TableRow sx={{}} hover >
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 200 }} > Relation </TableCell>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 200 }} >Name</TableCell>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 200 }}>MRD Number</TableCell>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550, width: 200 }}>Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            familArray?.map((item, idx) => (
                                                <TableRow key={idx} >
                                                    <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }}>{item.relation_number === 1 ? 'Self' : item.relation_number === 2 ? 'Father' : item.relation_number === 3 ? 'Mother' : item.relation_number === 4 ? 'Brother' : item.relation_number === 5 ? 'Sister' : item.relation_number === 6 ? 'Spouse' : 'Children'}</TableCell>
                                                    <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }}>{item.patient_name}</TableCell>
                                                    <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }}>{item.mrd_number}</TableCell>
                                                    <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }}> <IconButton aria-label="delete" size="small" sx={{ p: 0 }}

                                                        onClick={(e) => deleteData(e, item)} >
                                                        <DeleteIcon />
                                                    </IconButton></TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Paper>
                    <Paper variant="outlined" sx={{ flex: 1 }} >
                        <Box sx={{}}>
                            <CssVarsProvider>
                                <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                                    Languages Known
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box borderTop={1} borderLeft={1} borderBottom={1} sx={{ display: "flex", flexDirection: "row", borderColor: "lightgray" }}>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Language
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Write
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Speak
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Read
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{ display: "flex", flexDirection: "row", borderColor: "lightgray" }}>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Malayalam
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox
                                        color="secondary"
                                        name="malwrite"
                                        sx={{ padding: 0 }}
                                        onChange={(e) => setMalayalam_write(e.target.checked)}
                                        checked={malayala_write}
                                    />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="malspeak" sx={{
                                        padding: 0
                                    }}
                                        onChange={(e) => setMalayalam_speak(e.target.checked)}
                                        checked={malayala_speak} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="malread" sx={{ padding: 0 }}
                                        onChange={(e) => setMalayalam_read(e.target.checked)}
                                        checked={malayala_read} />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{ display: "flex", flexDirection: "row", borderColor: "lightgray" }}>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Hindi
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="hindiwrite" sx={{ padding: 0 }}
                                        onChange={(e) => setHindi_write(e.target.checked)}
                                        checked={hindi_write}
                                    />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="hindispeak" sx={{ padding: 0 }}
                                        onChange={(e) => setHindi_speak(e.target.checked)}
                                        checked={hindi_speak} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="hindiread" sx={{ padding: 0 }}
                                        onChange={(e) => setHindi_read(e.target.checked)}
                                        checked={hindi_read} />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{ display: "flex", flexDirection: "row", borderColor: "lightgray" }}>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            English
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="engwrite" sx={{ padding: 0 }}
                                        onChange={(e) => setEnglish_write(e.target.checked)}
                                        checked={english_write} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="engspeak" sx={{ padding: 0 }}
                                        onChange={(e) => setEnglish_speak(e.target.checked)}
                                        checked={english_speak} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="engread" sx={{ padding: 0 }}
                                        onChange={(e) => setEnglish_read(e.target.checked)}
                                        checked={english_read} />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{ display: "flex", flexDirection: "row", borderColor: "lightgray" }}>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Tamil
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="tamilwrite" sx={{ padding: 0 }}
                                        onChange={(e) => setTamil_write(e.target.checked)}
                                        checked={tamil_write} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="tamilspeak" sx={{ padding: 0 }}
                                        onChange={(e) => setTamil_speak(e.target.checked)}
                                        checked={tamil_speak} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="tamilread" sx={{ padding: 0 }}
                                        onChange={(e) => setTamil_read(e.target.checked)}
                                        checked={tamil_read} />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", pb: 1 }}>
                            <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{ display: "flex", flexDirection: "row", borderColor: "lightgray" }}>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <CssVarsProvider>
                                        <Typography >
                                            Arabic
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="arabicwrite" sx={{ padding: 0 }}
                                        onChange={(e) => setArabci_write(e.target.checked)}
                                        checked={arabic_write} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="arabicspeak" sx={{ padding: 0 }}
                                        onChange={(e) => setArabic_speak(e.target.checked)}
                                        checked={arabic_speak} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="arabicread" sx={{ padding: 0 }}
                                        onChange={(e) => setArabic_read(e.target.checked)}
                                        checked={arabic_read} />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Box >
        </Fragment >
    )
}

export default memo(Personaldetails) 