import { FormControl, IconButton, MenuItem, Select } from '@material-ui/core'
import Checkbox from '@mui/material/Checkbox'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import BloodGroupSelect from 'src/views/CommonCode/BloodGroupSelect'
import PageLayout from 'src/views/CommonCode/PageLayout'
import RegionSelect from 'src/views/CommonCode/RegionSelect'
import ReligionSelect from 'src/views/CommonCode/ReligionSelect'
import TextInput from 'src/views/Component/TextInput'
import './EmpStyle.css'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { useHistory, useParams } from 'react-router'
import { MdDeleteSweep, MdOutlineAddCircleOutline } from 'react-icons/md'
import { axioslogin } from 'src/views/Axios/Axios'
import RegionSelect2 from 'src/views/CommonCode/RegionSelect2'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { employeeNumber } from 'src/views/Constant/Constant'
import BankNameSelect from 'src/views/CommonCode/BankNameSelect'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import ProfilePic from '../../../assets/images/default.png'
import { Avatar, Stack } from '@mui/material'
import ReactTooltip from 'react-tooltip';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';

const PersonalInformation = () => {
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
            }
            getbankIfsc()
        }
    }, [selectBank])


    // reload page
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
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
            <PageLayout heading="Personal Information">
                <form onSubmit={personaldataSubmit} >
                    <div className="card">
                        <div className="card-body">

                            <div className="row g-1">
                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-header">Present Address</div>
                                        <div className="card-body">
                                            <div className="row g-1">
                                                <div className="col-md-12" data-tip="Permanent-House Name" data-for='toolTip1' data-place='top'>
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
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Address 1"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={addressPermnt1}
                                                        name="addressPermnt1"
                                                    />
                                                </div>
                                                <div className="col-md-12" data-tip="Permanent-Street Name" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Address 2"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={addressPermnt2}
                                                        name="addressPermnt2"
                                                    />
                                                </div>
                                                <div className="col-md-5">
                                                    <RegionSelect2
                                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 2, paddingBottom: 4 }}
                                                    />
                                                </div>
                                                <div className="col-md-7" data-tip="Pincode" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Pincode"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={pin1}
                                                        name="pin1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <div className="card">
                                        <div className="card-header">Contact Address</div>
                                        <div className="card-body">
                                            <div className="row g-1">
                                                <div className="col-md-12" data-tip="Present-House Name" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Address 1"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={contactaddress1}
                                                        name="contactaddress1"
                                                    />
                                                </div>
                                                <div className="col-md-12" data-tip="Present-Street Name" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Address 2"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={contactaddress2}
                                                        name="contactaddress2"
                                                    />
                                                </div>
                                                <div className="col-md-5">
                                                    <RegionSelect
                                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                    />
                                                </div>
                                                <div className="col-md-7" data-tip="Pincode" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Pincode"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={contactpin1}
                                                        name="contactpin1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2 d-flex justify-content-evenly">
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
                                </div>
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-body pb-1 pt-2">
                                            <div className="row g-1">
                                                <div className="col-md-2">
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
                                                </div>
                                                <div className="col-md-2" data-tip="Mobile No" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Mobile No"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={mobile}
                                                        name="mobile"
                                                    />
                                                </div>
                                                <div className="col-md-2" data-tip="Landline" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Land Phone No"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={land_no}
                                                        name="land_no"
                                                    />
                                                </div>
                                                <div className="col-md-2" data-tip="Passport No" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Passsport Number"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={passp_no}
                                                        name="passp_no"
                                                    />
                                                </div>
                                                <div className="col-md-2" data-tip="License No" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Driving License"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={license}
                                                        name="license"
                                                    />
                                                </div>
                                                <div className="col-md-2" data-tip="Aadhar No." data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Adhar No"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={adhar_no}
                                                        name="adhar_no"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row g-1 pb-0">
                                                <div className="col-md-2" data-tip="email Id" data-for='toolTip1' data-place='top'>
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
                                                    <ReligionSelect
                                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                    />
                                                </div>
                                                <div className="col-md-2">
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
                                                </div>

                                                <div className="col-md-3">
                                                    <BankNameSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                                </div>
                                                <div className="col-md-3" data-tip="Account No." data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="ACCOUNT NO"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={accountno}
                                                        name="accountno"
                                                    />
                                                </div>



                                            </div>
                                            <div className="row g-1  pb-0">
                                                <div className="col-md-2">
                                                    <BloodGroupSelect
                                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                    />
                                                </div>
                                                <div className="col-md-2" data-tip="DOB" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Date Of Birth"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={dob}
                                                        name="dob"
                                                    />
                                                </div>
                                                <div className="col-md-2" data-tip="Age" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="Age as of Now"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={age}
                                                        name="age"
                                                    />
                                                </div>
                                                <div className="col-md-3" data-tip="IFSC" data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="IFC CODE"
                                                        value={ifsc}
                                                        disabled={true}
                                                    />
                                                </div>
                                                <div className="col-md-3" data-tip="Pan No." data-for='toolTip1' data-place='top'>
                                                    <ReactTooltip id="toolTip1" />
                                                    <TextInput
                                                        type="text"
                                                        classname="form-control form-control-sm"
                                                        Placeholder="PAN NO"
                                                        changeTextValue={(e) => updateFormData(e)}
                                                        value={panmum}
                                                        name="panmum"
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-1">
                                        <div className="col-md-6">
                                            <div className="card mt-1">
                                                <div className="card-header pt-1 pb-1">Family Details</div>
                                                <div className="card-body pb-1 pt-2">
                                                    <div className="row g-1">
                                                        <div className="col-md-3">
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
                                                        </div>
                                                        <div className="col-md-5">
                                                            <TextInput
                                                                type="text"
                                                                classname="form-control form-control-sm"
                                                                Placeholder="Name Of the Family Members"
                                                                value={namefamilymembers}
                                                                name="namefamilymembers"
                                                                changeTextValue={(e) => {
                                                                    updateonchange(e)

                                                                }}
                                                            />
                                                        </div>
                                                        <div className="col-md-3">
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
                                                        </div>
                                                        <div className="col-md-1 text-center">
                                                            <IconButton
                                                                aria-label="add"
                                                                style={{ padding: '0rem' }}
                                                                onClick={(e) => {
                                                                    onClickAddrelation(e)
                                                                }}
                                                            >
                                                                <MdOutlineAddCircleOutline className="text-info" size={30} />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                    <div className="row g-1 familydetl table-wrapper-scroll-y my-custom-scrollbar mt-2">
                                                        <table className="table table-bordered table-striped mb-0 ">
                                                            <tbody>
                                                                {arrydata.map((val, index) => {
                                                                    return (
                                                                        <tr key={val.id}>
                                                                            <th scope="row" className="py-0 text-center" style={{ width: "20%" }}>
                                                                                {' '}
                                                                                <IconButton
                                                                                    aria-label="add"
                                                                                    style={{ padding: '0rem' }}
                                                                                    onClick={(e) => {
                                                                                        onClickdelete(val.id)
                                                                                    }}
                                                                                >
                                                                                    <MdDeleteSweep className="text-info" size={25} />
                                                                                </IconButton>
                                                                            </th>
                                                                            <td className="py-0" style={{ width: "20%" }}>{val.relationname}</td>
                                                                            <td className="py-0" style={{ width: "20%" }}>{val.namefamilymembers}</td>
                                                                            <td className="py-0" style={{ width: "20%" }}>{val.relationmrd_no}</td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card mt-1">
                                                <div className="card-header pt-1 pb-1">Language Known</div>
                                                <div className="card-body pb-1 pt-2">
                                                    <div className="row g-1">
                                                        <table className="table table-striped table-bordered mb-1 ">
                                                            <thead>
                                                                <tr className="text-center">
                                                                    <th scope="col" className="py-0 m-0">
                                                                        Language
                                                                    </th>
                                                                    <th scope="col" className="py-0 m-0">
                                                                        Write
                                                                    </th>
                                                                    <th scope="col" className="py-0 m-0">
                                                                        Speak
                                                                    </th>
                                                                    <th scope="col" className="py-0 m-0">
                                                                        Read
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="text-center">
                                                                    <th scope="row" className="py-0 m-0">
                                                                        Malayalam
                                                                    </th>
                                                                    <td className="py-0 m-0">
                                                                        <Checkbox color="secondary" name="malwrite" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                    <td className="py-0 m-0">
                                                                        <Checkbox color="secondary" name="malspeak" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                    <td className="py-0 m-0">
                                                                        <Checkbox color="secondary" name="malread" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                </tr>
                                                                <tr className="text-center">
                                                                    <th scope="row" className="py-0 m-0">
                                                                        Hindi
                                                                    </th>
                                                                    <td className="py-0 m-0">
                                                                        <Checkbox color="secondary" name="hindiwrite" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                    <td className="py-0 m-0">
                                                                        <Checkbox color="secondary" name="hindispeak"
                                                                            sx={{
                                                                                padding: 0
                                                                            }} />
                                                                    </td>
                                                                    <td className="py-0 m-0">
                                                                        <Checkbox color="secondary" name="hindiread" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                </tr>
                                                                <tr className="text-center">
                                                                    <th scope="row" className="p-0 m-0">
                                                                        English
                                                                    </th>
                                                                    <td className="p-0 m-0">
                                                                        <Checkbox color="secondary" name="engwrite" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                    <td className="p-0 m-0">
                                                                        <Checkbox color="secondary" name="engspeak" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                    <td className="p-0 m-0">
                                                                        <Checkbox color="secondary" name="engread" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                </tr>
                                                                <tr className="text-center">
                                                                    <th scope="row" className="p-0 m-0">
                                                                        Tamil
                                                                    </th>
                                                                    <td className="p-0 m-0">
                                                                        <Checkbox color="secondary" name="tamilwrite" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                    <td className="p-0 m-0">
                                                                        <Checkbox color="secondary" name="tamilspeak" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                    <td className="p-0 m-0">
                                                                        <Checkbox color="secondary" name="tamilread" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                </tr>
                                                                <tr className="text-center">
                                                                    <th scope="row" className="p-0 m-0">
                                                                        Arabic
                                                                    </th>
                                                                    <td className="p-0 m-0">
                                                                        <Checkbox color="secondary" name="arabicwrite" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                    <td className="p-0 m-0">
                                                                        <Checkbox color="secondary" name="arabicspeak" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                    <td className="p-0 m-0">
                                                                        <Checkbox color="secondary" name="arabicread" sx={{
                                                                            padding: 0
                                                                        }} />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer text-muted">
                            <FooterClosebtn redirect={RedirectToProfilePage} />
                        </div>
                    </div>
                </form>
            </PageLayout>
        </Fragment >
    )
}

export default PersonalInformation
