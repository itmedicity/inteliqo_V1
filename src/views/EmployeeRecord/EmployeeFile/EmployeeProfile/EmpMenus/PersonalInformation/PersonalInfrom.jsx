import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Grid, Paper } from '@mui/material'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import BloodGroupSelect from 'src/views/CommonCode/BloodGroupSelect'
import RegionSelect from 'src/views/CommonCode/RegionSelect'
import ReligionSelect from 'src/views/CommonCode/ReligionSelect'
import TextInput from 'src/views/Component/TextInput'
import { useHistory, useParams } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import RegionSelect2 from 'src/views/CommonCode/RegionSelect2'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { employeeNumber } from 'src/views/Constant/Constant'
import BankNameSelect from 'src/views/CommonCode/BankNameSelect'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import ProfilePic from 'src/assets/images/default.png'
import { Avatar, Stack } from '@mui/material'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import CustomeToolTip from 'src/views/Component/CustomeToolTip'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import IconButton from '@mui/joy/IconButton'
import { MdDeleteSweep, MdOutlineAddCircleOutline } from 'react-icons/md'
import Checkbox from '@mui/material/Checkbox'

const PersonalInfrom = () => {
    const history = useHistory()
    const { id, no } = useParams()
    // Context API
    const {
        getregion,
        udateregion,
        udatereligion,
        getreligion,
        updatebloodgroup,
        selectBank,
        updateBankName,
        getbloodgroup,
        getregion2,
        udateregion2
    } = useContext(PayrolMasterContext);
    const [ifsc, setIfsc] = useState(0)
    //getting banl serial number for finding ifsc code
    useEffect(() => {
        if (selectBank !== 0) {
            const getbankIfsc = async (e) => {
                const result = await axioslogin.get(`/bank/${selectBank}`)
                const { success, data } = result.data
                if (success === 1) {
                    setIfsc(data[0].bank_ifsc)
                }
                else {
                    setIfsc(0)
                }
            }
            getbankIfsc()
        }
    }, [selectBank])


    // reload page
    const RedirectToProfilePage = () => {
        //history.push(`/Home/Profile/${id}/${no}`)
        history.push(`/Home/Prfle/${em_no}/${em_id}`)
    }
    const [personaldta, setpersonaldata] = useState({
        addressPermnt1: '',
        addressPermnt2: '',
        pin1: '',
        contactaddress1: '',
        contactaddress2: '',
        contactpin1: '',
        mobile: '',
        land_no: 0,
        passp_no: '',
        license: '',
        adhar_no: '',
        email: '',
        dob: '',
        Selectgender: '0',
        age: 0,
        maritalstatus: '0',
        accountno: '',
        panmum: '',
        em_id: '0',
        em_no: '0'
    });
    const {
        addressPermnt1,
        addressPermnt2,
        pin1,
        contactaddress1,
        contactaddress2,
        contactpin1,
        mobile,
        land_no,
        age,
        passp_no,
        license,
        adhar_no,
        email,
        dob,
        Selectgender,
        maritalstatus,
        accountno,
        panmum,
        em_id,
        em_no
    } = personaldta

    // useState
    const [arrydata, arraydataset] = useState([])
    const [setdata, funsetdata] = useState({
        namefamilymembers: '',
        relationmrd_no: '',
        relationShip: 0,
        relationname: ''
    })
    const [relation, getrelation] = useState('')

    // destructuring data
    const { namefamilymembers, relationmrd_no, relationShip } = setdata

    // onclick addrbutton click
    const onClickAddrelation = () => {
        const newdata = {
            id: Math.ceil(Math.random() * 1000),
            namefamilymembers: namefamilymembers,
            relationmrd_no: relationmrd_no,
            relationShip: relationShip,
            relationname: relation
        }
        const newdatas = [...arrydata, newdata]
        arraydataset(newdatas)
    }

    // onchange relationship
    const getdataname = (e) => {
        getrelation(e.nativeEvent.target.textContent)
    }

    // onchange
    const updateonchange = (e) => {

        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        funsetdata({ ...setdata, [e.target.name]: value })
    }

    // ondelete
    const onClickdelete = (checkid) => {
        const newdata = [...arrydata]
        const index = arrydata.findIndex((arraid) => arraid.id === checkid)
        newdata.splice(index, 1);
        arraydataset(newdata)
    }
    // usefect to get employeedetails
    useEffect(() => {
        const getemployeedetails = async () => {
            const result = await axioslogin.get(`/common/getpersonalData/${id}`)
            const { success, data } = result.data
            console.log(data);
            if (success === 1) {
                const {
                    em_no,
                    em_id,
                    em_gender,
                    em_dob,
                    em_age_year,
                    em_mobile,
                    em_phone,
                    em_email,
                    addressPermnt1,
                    addressPermnt2,
                    hrm_pin1,
                    em_region,
                    addressPresent1,
                    addressPresent2,
                    hrm_pin2,
                    hrm_region2,
                    blood_slno,
                    hrm_religion,
                    em_bank,
                    em_account_no,
                    em_ifsc,
                    em_license_no,
                    em_adhar_no,
                    em_pan_no,
                    em_passport_no,
                    em_maritalstatus
                } = data[0]



                const peonsubmitdata = {
                    addressPermnt1: addressPermnt1,
                    addressPermnt2: addressPermnt2,
                    pin1: hrm_pin1,
                    contactaddress1: addressPresent1,
                    contactaddress2: addressPresent2,
                    contactpin1: hrm_pin2,
                    mobile: em_mobile,
                    land_no: em_phone,
                    passp_no: em_passport_no,
                    license: em_license_no,
                    adhar_no: em_adhar_no,
                    email: em_email,
                    dob: em_dob,
                    age: em_age_year,
                    Selectgender: em_gender,
                    maritalstatus: em_maritalstatus,
                    accountno: em_account_no,
                    panmum: em_pan_no,
                    em_id: em_id,
                    em_no: em_no

                }

                setpersonaldata(peonsubmitdata)
                setIfsc(em_ifsc)
                udatereligion(hrm_religion)
                updatebloodgroup(blood_slno)
                udateregion(em_region)
                udateregion2(hrm_region2)
                updateBankName(em_bank)
            }
        }
        getemployeedetails()
        return (
            udatereligion(0),
            updatebloodgroup(0),
            udateregion(0),
            udateregion2(0)
        )
    }, [udatereligion, updatebloodgroup, udateregion, udateregion2, updateBankName, id])
    const updateFormData = ((e) => {
        e.preventDefault();
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setpersonaldata({ ...personaldta, [e.target.name]: value })
    })

    // submitformdata
    const personaldataSubmit = async (e) => {
        e.preventDefault();
        const submitpersonal = {
            em_no: em_no,
            em_id: em_id,
            em_per_address1: addressPermnt1,
            em_per_address2: addressPermnt2,
            em_per_pincode: pin1,
            em_pmnt_address1: contactaddress1,
            em_pmnt_address2: contactaddress2,
            em_pmnt_pincode: contactpin1,
            em_passport_no: passp_no,
            em_pan_no: panmum,
            em_adhar_no: adhar_no,
            em_license_no: license,
            em_religion: getreligion,
            em_bloodgroup: getbloodgroup,
            em_maritalstatus: maritalstatus,
            em_cont_mobile: mobile,
            em_cont_phone: land_no,
            em_bank: selectBank === 0 ? null : selectBank,
            em_account_no: accountno === '' ? 0 : accountno,
            em_ifsc: ifsc,
            emp_dob: dob,
            em_email: email,
            emp_yeargae: age,
            em_region: getregion,
            hrm_region2: getregion2,
            create_user: employeeNumber()
        }
        const resetdata = {
            addressPermnt1: '',
            addressPermnt2: '',
            pin1: '',
            contactaddress1: '',
            contactaddress2: '',
            contactpin1: '',
            mobile: '',
            land_no: 0,
            passp_no: '',
            license: '',
            adhar_no: '',
            email: '',
            dob: '',
            Selectgender: '0',
            age: 0,
            maritalstatus: '0',
            accountno: '',
            panmum: '',
            em_id: '0',
            em_no: '0'
        }
        const resultemployee = await axioslogin.post('/personaldetl', submitpersonal);
        const { success, message } = resultemployee.data;
        if (success === 1) {
            // to update empmast 
            const updateempmast = await axioslogin.patch('/empmast', submitpersonal);
            const { success, message } = updateempmast.data;

            if (success === 2) {
                setpersonaldata(resetdata)
                setIfsc(0)
                udatereligion(0)
                updatebloodgroup(0)
                udateregion(0)
                udateregion2(0)
                RedirectToProfilePage();
                succesNofity(message)

            } else if (success === 0) {
                warningNofity(message.sqlMessage)
            } else {
                errorNofity(message)
            }


        } else if (success === 0) {
            warningNofity(message.sqlMessage)
        } else if (success === 2) {
            infoNofity(message)
        }
    }
    //Profile pic Display

    const [src, setSrc] = useState(ProfilePic)
    const profilePic = `${PUBLIC_NAS_FOLDER + no}/profilePic.jpg`;

    const empiddata = {
        em_id: no
    }

    useEffect(() => {
        const getProfilePicInform = async () => {
            const result = await axioslogin.post('/upload', empiddata);
            const { data } = result.data;
            var { hrm_profile } = data[0];
            if (hrm_profile === 1) {
                setSrc(profilePic)
            }
        }
        getProfilePicInform()
    }, [empiddata, profilePic])

    return (

        <Fragment>
            <Box sx={{
                width: "100%",
                height: { xxl: 800, xl: 750, lg: 500, md: 500, sm: 500, xs: 350 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >

                {/* Heading section start */}
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Personal Information
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>

                    {/* Heading section end */}

                    <Paper square elevation={0} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            px: 0.5,
                            width: "100%"
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                flex: 2,
                                //backgroundColor: "red",
                                width: "45%"
                            }}>
                                {/* Present address start*/}
                                <Paper variant="outlined"
                                    sx={{ px: 1, width: "100%" }}
                                >
                                    <CssVarsProvider>
                                        <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                                            Present Address
                                        </Typography>
                                    </CssVarsProvider>
                                    <input
                                        type="hidden"
                                        name="em_id"
                                        value={em_id}
                                        disabled
                                    />
                                    <input
                                        type="hidden"
                                        nname="em_no"
                                        value={em_no}
                                        disabled
                                    />
                                    <CustomeToolTip title="Present-House Name" placement="bottom">
                                        <Box
                                            sx={{
                                                pt: 1,
                                            }}
                                        >
                                            <TextInput
                                                style={{ width: "100%", paddingLeft: 13 }}
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Address 1"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPermnt1}
                                                name="addressPermnt1"
                                            />
                                        </Box>
                                    </CustomeToolTip>
                                    <CustomeToolTip title="Present-House Name" placement="bottom">
                                        <Box
                                            sx={{
                                                pt: 1
                                            }}
                                        >
                                            <TextInput
                                                style={{ width: "100%", paddingLeft: 13 }}
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Address 2"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={addressPermnt2}
                                                name="addressPermnt2"
                                            />
                                        </Box>
                                    </CustomeToolTip>
                                    <CustomeToolTip title="Present-House Name" placement="bottom">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                pt: 1,
                                            }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <RegionSelect2
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 2, paddingBottom: 4 }}
                                                />
                                            </Box>
                                            <Box sx={{ pl: 0.5, flex: 2 }}>
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Pincode"
                                                    changeTextValue={(e) => updateFormData(e)}
                                                    value={pin1}
                                                    name="pin1"
                                                    style={{ width: "100%", paddingLeft: 13 }}
                                                />
                                            </Box>
                                        </Box>
                                    </CustomeToolTip>
                                </Paper>
                            </Box>
                            {/* Present address end*/}

                            {/* Contact address start*/}
                            <Box sx={{
                                display: "flex",
                                pl: 1,
                                flex: 2,
                                //backgroundColor: "green",
                                width: "45%"
                            }}>
                                <Paper variant="outlined"
                                    sx={{ px: 1, width: "100%" }}
                                >
                                    <CssVarsProvider>
                                        <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                                            Contact Address
                                        </Typography>
                                    </CssVarsProvider>
                                    <input
                                        type="hidden"
                                        name="em_id"
                                        value={em_id}
                                        disabled
                                    />
                                    <input
                                        type="hidden"
                                        nname="em_no"
                                        value={em_no}
                                        disabled
                                    />
                                    <CustomeToolTip title="Permanent-House Name" placement="bottom">
                                        <Box
                                            sx={{
                                                pt: 1
                                            }}
                                        >
                                            <TextInput
                                                style={{ width: "100%", paddingLeft: 13 }}
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Address 1"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={contactaddress1}
                                                name="contactaddress1"
                                            />
                                        </Box>
                                    </CustomeToolTip>
                                    <CustomeToolTip title="Permanent-House Name" placement="bottom">
                                        <Box
                                            sx={{
                                                pt: 1,
                                            }}
                                        >
                                            <TextInput
                                                style={{ width: "100%", paddingLeft: 13 }}
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="Address 2"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={contactaddress2}
                                                name="contactaddress2"
                                            />
                                        </Box>
                                    </CustomeToolTip>
                                    <CustomeToolTip title="Permanent-House Name" placement="bottom">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                pt: 1,
                                                width: "100%"
                                            }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <RegionSelect
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                />
                                            </Box>
                                            <Box
                                                sx={{ pl: 0.5, flex: 2 }}
                                            >
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Pincode"
                                                    changeTextValue={(e) => updateFormData(e)}
                                                    value={contactpin1}
                                                    name="contactpin1"
                                                    style={{ width: "100%", paddingLeft: 13 }}
                                                />
                                            </Box>
                                        </Box>
                                    </CustomeToolTip>
                                </Paper>
                                {/* Contact address end*/}
                            </Box>

                            {/* Profile picture*/}
                            <Box
                                sx={{
                                    display: "flex",
                                    flex: 1,
                                    //backgroundColor: "yellow",
                                    px: 5,
                                    width: "10%"
                                }}>
                                <Stack
                                    direction="row"
                                    spacing={3}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={src}
                                        variant="square"
                                        className="img-thumbnail border-2 empImage"
                                        sx={{ width: 150, height: 150, opacity: 10 }}
                                    />
                                </Stack>
                            </Box>

                        </Box>
                    </Paper>
                    {/* First Box end */}


                    <Paper square variant="outlined" elevation={0} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },

                        // backgroundColor: "lightcyan"
                    }} >
                        {/* Other information start*/}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1, px: 0.5,
                            py: 0.5,
                            width: "100%"
                        }}>
                            {/* first row */}
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%"
                            }}>
                                <Box sx={{ flex: 1, }} >
                                    <FormControl fullWidth margin="dense" className="mt-1">
                                        <Select
                                            name="Selectgender"
                                            value={Selectgender}
                                            onChange={(e) => updateFormData(e)}
                                            fullWidth
                                            variant="outlined"
                                            className="ml-1"
                                            defaultValue={0}
                                            style={{
                                                minHeight: 10,
                                                maxHeight: 27,
                                                paddingTop: 0,
                                                paddingBottom: 4,
                                            }}
                                        >
                                            <MenuItem value="0" disabled>
                                                Gender
                                            </MenuItem>
                                            <MenuItem value="1">Male</MenuItem>
                                            <MenuItem value="2">Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Mobile No"
                                        changeTextValue={(e) => updateFormData(e)}
                                        value={mobile}
                                        name="mobile"
                                        style={{ width: "100%", }}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Land Phone No"
                                        changeTextValue={(e) => updateFormData(e)}
                                        value={land_no}
                                        name="land_no"
                                        style={{ width: "100%", }}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Passsport Number"
                                        changeTextValue={(e) => updateFormData(e)}
                                        value={passp_no}
                                        name="passp_no"
                                        style={{ width: "100%", }}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Driving License"
                                        changeTextValue={(e) => updateFormData(e)}
                                        value={license}
                                        name="license"
                                        style={{ width: "100%", }}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, pl: 0.5 }} >
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Adhar No"
                                        changeTextValue={(e) => updateFormData(e)}
                                        value={adhar_no}
                                        name="adhar_no"
                                        style={{ width: "100%", }}
                                    />
                                </Box>
                            </Box>

                            {/* second row */}

                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 0.5,
                                width: "100%"
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flex: 1,
                                    width: "50%"
                                }}>
                                    <Box sx={{
                                        flex: 1,
                                    }}>
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Email Address"
                                            changeTextValue={(e) => updateFormData(e)}
                                            value={email}
                                            name="email"
                                            style={{ width: "100%", paddingLeft: 13 }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flex: 1,
                                        pl: 0.5,
                                    }}>
                                        <ReligionSelect
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flex: 1,
                                        pl: 0.5,
                                    }}>
                                        <FormControl fullWidth margin="dense" className="mt-1">
                                            <Select
                                                name="maritalstatus"
                                                value={maritalstatus}
                                                onChange={(e) => updateFormData(e)}
                                                fullWidth
                                                variant="outlined"
                                                className="ml-1"

                                                style={{
                                                    minHeight: 10,
                                                    maxHeight: 27,
                                                    paddingTop: 0,
                                                    paddingBottom: 4,
                                                }}
                                            >
                                                <MenuItem value="0" disabled>
                                                    Marital Status
                                                </MenuItem>
                                                <MenuItem value="1">Married</MenuItem>
                                                <MenuItem value="2">UnMarried</MenuItem>
                                                <MenuItem value="3">Widow</MenuItem>
                                                <MenuItem value="4">Divorcee</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flex: 1,
                                    pl: 0.5,
                                    width: "50%",
                                }} >
                                    <Box sx={{
                                        display: "flex",
                                        flex: 1,
                                        width: "100%",
                                    }}>
                                        <Box sx={{
                                            display: "flex",
                                            flex: 1,
                                            width: "50%",
                                            //backgroundColor: "lightgreen"
                                        }}>
                                            <BankNameSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                        </Box>
                                        <Box sx={{
                                            flex: 1,
                                            pl: 0.5,
                                            width: "50%",
                                            //backgroundColor: "lightpink"
                                        }}>
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="ACCOUNT NO"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={accountno}
                                                name="accountno"
                                                style={{ width: "100%", paddingLeft: 13 }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>

                            {/* third row */}

                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%"
                            }}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flex: 1,
                                    width: "50%"
                                }}>
                                    <Box sx={{
                                        flex: 1,
                                    }}>
                                        <BloodGroupSelect
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        flex: 1,
                                        pl: 0.5,
                                    }}>
                                        < TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Date Of Birth"
                                            value={dob}
                                            name="dob"
                                            disabled={true}
                                            style={{ width: "100%", paddingLeft: 13 }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        flex: 1,
                                        pl: 0.5,
                                    }}>
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Age as of Now"
                                            value={age}
                                            name="age"
                                            disabled={true}
                                            style={{ width: "100%", paddingLeft: 13 }}
                                        />
                                    </Box>
                                </Box>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flex: 1,
                                    pl: 0.5,
                                    width: "50%",
                                }} >
                                    <Box sx={{
                                        display: "flex",
                                        flex: 1,
                                        width: "100%",
                                    }}>
                                        <Box sx={{
                                            flex: 1,
                                            width: "50%",
                                            //backgroundColor: "lightgreen"
                                        }}>
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="IFC CODE"
                                                value={ifsc}
                                                disabled={true}
                                                style={{ width: "100%", paddingLeft: 13 }}
                                            />
                                        </Box>
                                        <Box sx={{
                                            flex: 1,
                                            pl: 0.5,
                                            width: "50%",
                                            //backgroundColor: "lightpink"
                                        }}>
                                            <TextInput
                                                type="text"
                                                classname="form-control form-control-sm"
                                                Placeholder="PAN NO"
                                                changeTextValue={(e) => updateFormData(e)}
                                                value={panmum}
                                                name="panmum"
                                                style={{ width: "100%", paddingLeft: 13 }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                    </Paper>
                    {/* Other information end*/}

                    {/* Family and Languages section start*/}
                    <Paper square elevation={0} sx={{
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                        //backgroundColor: "lightcyan"
                    }} >

                    </Paper>
                    {/* Family and Language section */}
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <Box sx={{
                            display: "flex",
                            //backgroundColor: "red",
                            flex: 1,
                            flexDirection: "column",
                        }}>
                            <Paper variant="outlined"
                                sx={{ px: 1, }}
                            >
                                <Box sx={{
                                    display: "flex"
                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                                            Family Details
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}>
                                    <Box sx={{
                                        display: "flex",
                                        flex: 1,
                                        pt: 1,
                                        pl: 0.5
                                    }}>
                                        <FormControl fullWidth margin="dense" className="mt-1">
                                            <Select
                                                name="relationShip"
                                                value={relationShip}
                                                fullWidth
                                                variant="outlined"
                                                onChange={(e) => {
                                                    updateonchange(e)
                                                    getdataname(e)
                                                }}
                                                className="ml-1"
                                                defaultValue={0}
                                                style={{
                                                    minHeight: 10,
                                                    maxHeight: 27,
                                                    paddingTop: 0,
                                                    paddingBottom: 4,
                                                }}
                                            >
                                                <MenuItem value="0" disabled>
                                                    Relation
                                                </MenuItem>
                                                <MenuItem value="1">Father</MenuItem>
                                                <MenuItem value="2">Mother</MenuItem>
                                                <MenuItem value="2">Brother</MenuItem>
                                                <MenuItem value="2">Sister</MenuItem>
                                                <MenuItem value="2">Spouse</MenuItem>
                                                <MenuItem value="2">Children</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flex: 2,
                                        pt: 1,
                                        pl: 0.5
                                    }}>
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Name Of the Family Members"
                                            value={namefamilymembers}
                                            name="namefamilymembers"
                                            changeTextValue={(e) => {
                                                updateonchange(e)

                                            }}
                                            style={{
                                                width: 330
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flex: 1,
                                        pt: 1,
                                        pl: 0.5
                                    }}>
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Hospital MRD No"
                                            value={relationmrd_no}
                                            name="relationmrd_no"
                                            changeTextValue={(e) => {
                                                updateonchange(e)
                                            }}
                                        />
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flex: 0,
                                    }}>
                                        <CssVarsProvider>
                                            <IconButton
                                                aria-label="add"
                                                style={{ padding: '0rem' }}
                                                onClick={(e) => {
                                                    onClickAddrelation(e)
                                                }}
                                            >
                                                <MdOutlineAddCircleOutline className="text-info" size={30} />
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            //backgroundColor: "green",
                            flex: 1,
                            flexDirection: "column",
                            pl: 0.5,
                        }} >
                            <Paper variant="outlined"
                                sx={{ px: 1, }}
                            >
                                <Box sx={{
                                    display: "flex"
                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                                            Languages Known
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Box borderTop={1} borderLeft={1} borderBottom={1} sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        borderColor: "lightgray"

                                    }}>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <CssVarsProvider>
                                                <Typography >
                                                    Language
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <CssVarsProvider>
                                                <Typography >
                                                    Write
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <CssVarsProvider>
                                                <Typography >
                                                    Speak
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <CssVarsProvider>
                                                <Typography >
                                                    Read
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        borderColor: "lightgray"

                                    }}>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <CssVarsProvider>
                                                <Typography >
                                                    Malayalam
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="malwrite" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="malspeak" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="malread" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        borderColor: "lightgray"

                                    }}>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <CssVarsProvider>
                                                <Typography >
                                                    Hindi
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="hindiwrite" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="hindispeak"
                                                sx={{
                                                    padding: 0
                                                }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="hindiread" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        borderColor: "lightgray"
                                    }}>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <CssVarsProvider>
                                                <Typography >
                                                    English
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="engwrite" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="engspeak" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="engread" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        borderColor: "lightgray"
                                    }}>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <CssVarsProvider>
                                                <Typography >
                                                    Tamil
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="tamilwrite" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="tamilspeak" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="tamilread" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    pb: 1
                                }}>
                                    <Box borderTop={0} borderLeft={1} borderBottom={1} sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        borderColor: "lightgray"

                                    }}>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <CssVarsProvider>
                                                <Typography >
                                                    Arabic
                                                </Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="arabicwrite" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>

                                            <Checkbox color="secondary" name="arabicspeak" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                        <Box borderRight={1} sx={{
                                            display: "flex",
                                            flex: 1,
                                            justifyContent: "center",
                                            borderColor: "lightgray"
                                        }}>
                                            <Checkbox color="secondary" name="arabicread" sx={{
                                                padding: 0
                                            }} />
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Box>
                </Paper>

                {/* Footer section start*/}
                <Paper square sx={{
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{ display: "flex", p: 0.3 }} >
                        <CssVarsProvider>
                            <IconButton variant="outlined" size='sm'
                                sx={theme => ({
                                    color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.78)`,
                                })}
                                onClick={personaldataSubmit}
                            >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                {/* Footer section end*/}

            </Box >
        </Fragment >
    )
}

export default memo(PersonalInfrom)
