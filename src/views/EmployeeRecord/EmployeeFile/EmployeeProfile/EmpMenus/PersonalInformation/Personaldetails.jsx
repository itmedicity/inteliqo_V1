import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Checkbox, FormControl, Grid, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import React, { Fragment, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ReligionSelectRedux from 'src/views/MuiComponents/ReligionSelectRedux';
import BankSelectredux from 'src/views/MuiComponents/BankSelectredux';
import BloodgrpSelectRedux from 'src/views/MuiComponents/BloodgrpSelectRedux';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { useParams } from 'react-router-dom';
import { axiosellider, axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DetailsModel from './DetailsModel';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { employeeNumber } from 'src/views/Constant/Constant';
import { memo } from 'react';
import RegionSelectRedux from 'src/views/MuiComponents/RegionSelectRedux';
import { useDispatch } from 'react-redux';
import { setRegionByPin } from 'src/redux/actions/Region.Action';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

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

    const dispatch = useDispatch();

    const pinValue = useMemo(() => presnt_pin, [presnt_pin])
    const contPin = useMemo(() => permnt_pin, [permnt_pin])

    const getRegion1 = useCallback(() => {
        if (contPin !== null) {
            dispatch(setRegionByPin(contPin));
        } else {
            dispatch(setRegionByPin(0));
        }
    }, [contPin])

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
                    salarytype, em_maritalstatus,
                } = data[0]
                setPermanent_addr1(addressPermnt1)
                setaddressPermnt2(addressPermnt2)
                setPresent_pin(hrm_pin1)
                setcontactaddress1(addressPresent1)
                setcontactaddress2(addressPresent2)
                setPermnt_pin(hrm_pin2)
                setGender(em_gender)
                setmobile(em_mobile)
                setland_no(em_phone)
                setpassp_no(em_passport_no)
                setlicense(em_license_no)
                setadhar_no(em_adhar_no)
                setemail(em_email)
                setReligion(hrm_religion)
                setMarital_status(em_maritalstatus)
                setBank(em_bank)
                setaccountno(em_account_no)
                setsalaryType(salarytype)
                setBlood(blood_slno)
                setdob(em_dob)
                setage(em_age_year)
                setifsc(em_ifsc)
                setpanmum(em_pan_no)
                setRegion1(em_region)
                setRegion2(hrm_region2)
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
            }
        }
        getemployeedetails()
    }, [id])

    //getting banl serial number for finding ifsc code
    useEffect(() => {
        if (bank !== 0) {
            const getbankIfsc = async (e) => {
                const result = await axioslogin.get(`/bank/${bank}`)
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
    }, [bank])

    const getFamilyDetails = async () => {
        if (relation === 0 || mrdnumber === '') {
            warningNofity('Please Select Relation & MRD Number')
        } else {
            const result = await axiosellider.get(`/admission/patientInfo/${mrdnumber}`)
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
                succesNofity("Data Saved Successfully")
            } else {
                errorNofity(message)
            }
        } else {
            errorNofity(message)
        }
    }

    return (
        <Fragment>
            <Suspense>
                <DetailsModel open={open} setOpen={setOpen} family_details={family_details}
                    empid={no} emno={id} relation={relation} count={count} setCount={setCount}
                    setMrdnumber={setMrdnumber} setRelation={setRelation} />
            </Suspense>
            <Box sx={{ width: "100%", height: { xxl: 800, xl: 750, lg: 500, md: 500, sm: 500, xs: 350 }, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                {/* <Paper square elevation={0} > */}
                <Paper square elevation={2} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                    <Box sx={{ flex: 1 }} >
                        <CssVarsProvider>
                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                Personal Information
                            </Typography>
                        </CssVarsProvider>
                    </Box>
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
                                        <TextField
                                            fullWidth
                                            placeholder='Address 1'
                                            size="small"
                                            id='permanent_addr1'
                                            value={permanent_addr1}
                                            name="permanent_addr1"
                                            onChange={(e) => setPermanent_addr1(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Permanent Street Name" followCursor placement='top' arrow >
                                    <Box sx={{ pt: 1 }}>
                                        <TextField
                                            fullWidth
                                            placeholder='Address 2'
                                            size="small"
                                            id='addressPermnt2'
                                            value={addressPermnt2}
                                            name="addressPermnt2"
                                            onChange={(e) => setaddressPermnt2(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", py: 1 }}>
                                    <Tooltip title="Present Pincode" followCursor placement='top' arrow >
                                        <Box sx={{ flex: 1 }}>
                                            <TextField
                                                fullWidth
                                                placeholder='Pincode'
                                                size="small"
                                                id='permnt_pin'
                                                value={permnt_pin}
                                                name="permnt_pin"
                                                onChange={(e) => setPermnt_pin(e.target.value)}
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
                                        <TextField
                                            fullWidth
                                            placeholder='Address 1'
                                            size="small"
                                            id='contactaddress1'
                                            value={contactaddress1}
                                            name="contactaddress1"
                                            onChange={(e) => setcontactaddress1(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Present-Street Name" followCursor placement='top' arrow >
                                    <Box sx={{ pt: 1 }}>
                                        <TextField
                                            fullWidth
                                            placeholder='Address 2'
                                            size="small"
                                            id='contactaddress2'
                                            value={contactaddress2}
                                            name="contactaddress2"
                                            onChange={(e) => setcontactaddress2(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", py: 1 }}>

                                    <Tooltip title="Present Pincode" followCursor placement='top' arrow >
                                        <Box sx={{ flex: 1 }}>
                                            <TextField
                                                fullWidth
                                                placeholder='Pincode'
                                                size="small"
                                                id='presnt_pin'
                                                value={presnt_pin}
                                                name="presnt_pin"
                                                onChange={(e) => setPresent_pin(e.target.value)}
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
                                <FormControl fullWidth
                                    size='small'   >
                                    <Select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                    >
                                        <MenuItem value={0} >
                                            Select Gender
                                        </MenuItem>
                                        <MenuItem value="1">Male</MenuItem>
                                        <MenuItem value="2">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Tooltip title="Mobile No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }} >
                                    <TextField
                                        fullWidth
                                        placeholder='Mobile No'
                                        size="small"
                                        id='mobile'
                                        value={mobile}
                                        name="mobile"
                                        onChange={(e) => setmobile(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Landline" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1, }} >
                                    <TextField
                                        fullWidth
                                        placeholder='Land Phone No'
                                        size="small"
                                        id='land_no'
                                        value={land_no}
                                        name="land_no"
                                        onChange={(e) => setland_no(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Passport No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1, }} >
                                    <TextField
                                        fullWidth
                                        placeholder='Passsport Number'
                                        size="small"
                                        id='passp_no'
                                        value={passp_no}
                                        name="passp_no"
                                        onChange={(e) => setpassp_no(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="License No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1, }} >
                                    <TextField
                                        fullWidth
                                        placeholder='Driving License'
                                        size="small"
                                        id='license'
                                        value={license}
                                        name="license"
                                        onChange={(e) => setlicense(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Tooltip title="Aadhar No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }} >
                                    <TextField
                                        fullWidth
                                        placeholder='Adhaar No'
                                        size="small"
                                        id='adhar_no'
                                        value={adhar_no}
                                        name="adhar_no"
                                        onChange={(e) => setadhar_no(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", pt: 1, width: "100%" }}>
                            <Box sx={{ flex: 1 }}>
                                <TextField
                                    variant='outlined'
                                    placeholder='email'
                                    size='small'
                                    id='email'
                                    value={email}
                                    name="email"
                                    onChange={(e) => setemail(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <ReligionSelectRedux value={religion} setValue={setReligion} />
                            </Box>
                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                <FormControl fullWidth
                                    size='small'   >
                                    <Select
                                        value={marital_status}
                                        onChange={(e) => setMarital_status(e.target.value)}
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                    >
                                        <MenuItem value={0} >
                                            Select Marital Status
                                        </MenuItem>
                                        <MenuItem value="1">Married</MenuItem>
                                        <MenuItem value="2">UnMarried</MenuItem>
                                        <MenuItem value="3">Widow</MenuItem>
                                        <MenuItem value="4">Divorcee</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ flex: 1, pl: 0.3 }}>
                                <BankSelectredux value={bank} setValue={setBank} />
                            </Box>
                            <Tooltip title="Account No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1, pl: 0.3 }}>
                                    <TextField
                                        variant='outlined'
                                        placeholder='Account No'
                                        size='small'
                                        id='accountno'
                                        value={accountno}
                                        name="accountno"
                                        onChange={(e) => setaccountno(e.target.value)}
                                    />
                                </Box>
                            </Tooltip>
                            <Box sx={{ flex: 1 }}>
                                <FormControl
                                    fullWidth
                                    size='small'   >
                                    <Select
                                        value={salarytype}
                                        onChange={(e) => setsalaryType(e.target.value)}
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                    >
                                        <MenuItem value={0} >
                                            Select Salary Type
                                        </MenuItem>
                                        <MenuItem value="1">Account</MenuItem>
                                        <MenuItem value="2">Cash</MenuItem>
                                        <MenuItem value="3">Cheque</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "row", width: "100%", pt: 1 }}>
                            <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
                                <Box sx={{ flex: 1, }}>
                                    <BloodgrpSelectRedux value={blood} setValue={setBlood} />
                                </Box>
                                <Tooltip title="DOB" followCursor placement='top' arrow >
                                    <Box sx={{ flex: 1, pl: 0.3 }}>
                                        <TextField
                                            variant='outlined'
                                            placeholder='Date Of Birth'
                                            size='small'
                                            id='dob'
                                            value={dob}
                                            name="dob"
                                            disabled={true}
                                        />
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Age" followCursor placement='top' arrow >
                                    <Box sx={{ flex: 1 }}>
                                        <TextField
                                            variant='outlined'
                                            placeholder='Age as of Now'
                                            size='small'
                                            id='age'
                                            value={age}
                                            name="age"
                                            disabled={true}
                                        />
                                    </Box>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "row", flex: 1, width: '100%' }}>
                                <Tooltip title="IFSC" followCursor placement='top' arrow >
                                    <Box sx={{ flex: 1 }}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            placeholder='IFSC'
                                            size='small'
                                            id='ifsc'
                                            value={ifsc}
                                            name="ifsc"
                                            disabled={true}
                                        />
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Pan No" followCursor placement='top' arrow >
                                    <Box sx={{ flex: 1, pl: 0.3 }}>
                                        <TextField
                                            fullWidth
                                            variant='outlined'
                                            placeholder='PAN NO'
                                            size='small'
                                            id='panmum'
                                            value={panmum}
                                            name="panmum"
                                            onChange={(e) => setpanmum(e.target.value)}
                                        />
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                </Paper>


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
                                <FormControl
                                    fullWidth
                                    size='small'   >
                                    <Select
                                        value={relation}
                                        onChange={(e) => setRelation(e.target.value)}
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                    >
                                        <MenuItem value={0} >
                                            Select Relation
                                        </MenuItem>
                                        {
                                            relationAray?.map((val, ind) => {
                                                return <MenuItem key={ind} value={val.rel_slno}>{val.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Tooltip title="Pan No" followCursor placement='top' arrow >
                                <Box sx={{ flex: 1 }}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        placeholder='Hospital MRD No'
                                        size='small'
                                        id='mrdnumber'
                                        value={mrdnumber}
                                        name="mrdnumber"
                                        onChange={(e) => setMrdnumber(e.target.value)}
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
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            familArray?.map((e, idx) => (
                                                <TableRow key={idx} >
                                                    <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }}>{e.relation_number === 1 ? 'Self' : e.relation_number === 2 ? 'Father' : e.relation_number === 3 ? 'Mother' : e.relation_number === 4 ? 'Brother' : e.relation_number === 5 ? 'Sister' : e.relation_number === 6 ? 'Spouse' : 'Children'}</TableCell>
                                                    <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }}>{e.patient_name}</TableCell>
                                                    <TableCell size='small' padding='none' align="center" sx={{ minHeight: 25 }}>{e.mrd_number}</TableCell>
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
                                    <Checkbox color="secondary" name="malwrite" sx={{
                                        padding: 0
                                    }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="malspeak" sx={{
                                        padding: 0
                                    }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="malread" sx={{
                                        padding: 0
                                    }} />
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
                                    <Checkbox color="secondary" name="hindiwrite" sx={{
                                        padding: 0
                                    }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="hindispeak" sx={{ padding: 0 }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="hindiread" sx={{
                                        padding: 0
                                    }} />
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
                                    <Checkbox color="secondary" name="engwrite" sx={{ padding: 0 }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="engspeak" sx={{ padding: 0 }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="engread" sx={{ padding: 0 }} />
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
                                    <Checkbox color="secondary" name="tamilwrite" sx={{ padding: 0 }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="tamilspeak" sx={{ padding: 0 }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="tamilread" sx={{ padding: 0 }} />
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
                                    <Checkbox color="secondary" name="arabicwrite" sx={{ padding: 0 }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="arabicspeak" sx={{ padding: 0 }} />
                                </Box>
                                <Box borderRight={1} sx={{ display: "flex", flex: 1, justifyContent: "center", borderColor: "lightgray" }}>
                                    <Checkbox color="secondary" name="arabicread" sx={{ padding: 0 }} />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Paper square sx={{ backgroundColor: "#F8F8F8", display: "flex", flexDirection: "row" }}>
                    <Box sx={{ display: "flex", p: 0.3 }} >
                        <IconButton variant="outlined" size='sm'
                            onClick={personaldataSubmit}
                        >
                            <LibraryAddCheckOutlinedIcon color='primary' />
                        </IconButton>
                    </Box>
                </Paper>
            </Box >
        </Fragment >
    )
}

export default memo(Personaldetails) 