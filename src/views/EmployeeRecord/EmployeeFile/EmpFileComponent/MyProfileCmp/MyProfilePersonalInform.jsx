import {
    Card, CardActionArea, CardContent, CardHeader, Grid, Avatar,
    IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography,
    ListItemButton, ListItemIcon, Tooltip, Skeleton
} from '@mui/material'
import React, { Fragment, useState, useEffect, memo } from 'react'
// import { red } from '@mui/material/colors';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import HomeIcon from '@mui/icons-material/Home';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PlaceIcon from '@mui/icons-material/Place';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import WcIcon from '@mui/icons-material/Wc';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import BadgeIcon from '@mui/icons-material/Badge';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ProfilePicDefault from '../../../../../assets/images/default.png'
import { PUBLIC_NAS_FOLDER, urlExist } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import MyProfileExpQualify from './MyProfileExpQualify';
import MyProfleExperience from './MyProfleExperience';
import MyProfileSalary from './MyProfileSalary';
import AnualLeave from './AnualLeave';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DomainIcon from '@mui/icons-material/Domain';
import CategoryIcon from '@mui/icons-material/Category';
// import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp';
import ProfileVerificationModal from './ProfileVerificationModal';


const MyProfilePersonalInform = ({ empid, redirect, count, setCount }) => {

    const [src, setSrc] = useState(ProfilePicDefault)
    const profilePic = `${PUBLIC_NAS_FOLDER + empid}/profilePic.jpg`;

    const loginDetl = useSelector((state) => {
        return state.getPrifileDateEachEmp;
    })

    const { personalData, personalDataStatus } = loginDetl.empPersonalData;

    useEffect(() => {

        const empiddata = {
            em_id: empid
        }

        const getProfilePicInform = async () => {
            const result = await axioslogin.post('/upload', empiddata);
            const { data } = result.data;
            var { hrm_profile } = data[0];
            if (hrm_profile === 1) {
                urlExist(profilePic, (status) => {
                    if (status === 200) {
                        setSrc(profilePic)
                    }
                })
            }
        }
        getProfilePicInform()
    }, [empid, profilePic])

    const {
        addressPermnt1, addressPermnt2, addressPresent1, addressPresent2, branch_name, dept_name, verification_status,
        desg_name, ecat_name, em_conf_end_date, em_contract_end_date, em_dob, em_doj, em_email,
        em_gender, em_mobile, em_name, em_phone, em_retirement_date, hrm_pin1, per_region, pres_region,
        sect_name, em_adhar_no, em_account_no, bank_name, em_maritalstatus, relg_name, group_name, em_ifsc, em_pan_no
    } = personalData

    const emp = {
        name: em_name === '' ? 'NOT UPDATED' : em_name,
        presAddress: addressPermnt1 === '' ? 'NOT UPDATED' : ` ${addressPermnt1} ${addressPermnt2} ${per_region}`,
        permAddress: addressPresent1 === '' ? 'NOT UPDATED' : `${addressPresent1} ${addressPresent2} ${pres_region}`,
        region: per_region === '' ? 'NOT UPDATED' : per_region,
        pincode: hrm_pin1 === '' ? 'NOT UPDATED' : hrm_pin1,
        mobile: em_mobile === '' ? 'NOT UPDATED' : em_mobile,
        phone: em_phone === '' ? 'NOT UPDATED' : em_phone,
        email: em_email === '' ? 'NOT UPDATED' : em_email,
        adhar: em_adhar_no === null ? 'NOT UPDATED' : em_adhar_no,
        designation: desg_name === '' ? 'NOT UPDATED' : desg_name,
        account: em_account_no === null ? 'NOT UPDATED' : em_account_no,
        bank: bank_name === null ? 'NOT UPDATED' : bank_name,
        gender: em_gender === 2 ? 'Female' : 'Male',
        ismarried: em_maritalstatus === '2' ? 'Not Married' : em_maritalstatus === null ? 'NOT UPDATED' : 'Married',
        religion: relg_name === null ? 'NOT UPDATED' : relg_name,
        age: em_dob === null ? 'NOT UPDATED' : em_dob,
        dob: em_dob === null ? 'NOT UPDATED' : em_dob,
        bloodgroup: group_name === null ? 'NOT UPDATED' : group_name,
        ifcscode: em_ifsc === null ? 'NOT UPDATED' : em_ifsc,
        panNo: em_pan_no === null ? 'NOT UPDATED' : em_pan_no,
        dateofJoin: em_doj === null ? 'NOT UPATED' : em_doj,
        branch: branch_name === null ? 'NOT UPATED' : branch_name,
        department: dept_name === null ? 'NOT UPATED' : dept_name,
        deptSection: sect_name === null ? 'NOT UPATED' : sect_name,
        emp_category: ecat_name === null ? 'NOT UPATED' : ecat_name,
        probEndDate: em_conf_end_date === null ? 'NOT UPATED' : em_conf_end_date,
        constractEnd: em_contract_end_date === null ? 'NOT UPATED' : em_contract_end_date,
        retirement: em_retirement_date === null ? 'NOT UPATED' : em_retirement_date,
        verification_status: verification_status === null ? 'NOT UPDATED' : verification_status
    }
    const [modeopen, setModelopen] = useState(0)
    const [open, setOpen] = useState(false)
    //function verifying the profile
    const getVerification = async (empid) => {
        setModelopen(empid)
        setOpen(true)
    }
    const handleClose = async () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <ProfileVerificationModal open={open} modeopen={modeopen} setOpen={setOpen} handleClose={handleClose} count={count} setCount={setCount} />
            <Card sx={{ borderRadius: 2, boxShadow: 5 }} >
                <CardHeader
                    // sx={{ backgroundColor: '#b6b8c3' }}
                    title={
                        <Fragment>
                            {
                                personalDataStatus === true ? emp.name : <Skeleton />
                            }
                        </Fragment>
                    }
                    titleTypographyProps={{
                        variant: 'body1',
                    }}
                    subheader={
                        <Fragment>
                            {
                                personalDataStatus === true ? emp.designation : <Skeleton />
                            }
                            <Typography variant="subtitle2" component="div" gutterBottom>
                                Information Technology
                            </Typography>
                        </Fragment>
                    }
                    subheaderTypographyProps={{
                        variant: 'subtitle2',
                    }}
                    avatar={
                        <Avatar
                            sx={{ bgcolor: '#49599a', width: 65, height: 65, marginLeft: 3 }}
                            aria-label="recipe"
                            variant="rounded"
                            src={src}
                        >
                            <PersonPinIcon />
                        </Avatar>
                    }

                    action={
                        <Fragment>

                            <IconButton aria-label="settings" sx={{ marginLeft: 10 }}
                                onClick={() => getVerification(empid)}
                                disabled={emp.verification_status === 1 ? true : false}
                            >
                                <VerifiedSharpIcon fontSize='large' color={emp.verification_status === 1 ? 'success' : 'error'} />
                            </IconButton>
                            <IconButton aria-label="settings" sx={{ marginLeft: 3 }} onClick={() => redirect()} >
                                <CloseIcon fontSize='large' sx={{ color: "#212121" }} />
                            </IconButton>
                        </Fragment>
                    }
                />
                <CardContent className='pt-1' >
                    <Grid container spacing={2}  >
                        <Grid item xs={12} md={6}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        {/* <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon> */}
                                        <Avatar sx={{ bgcolor: '#49599a' }} >
                                            <HomeIcon sx={{ color: 'white' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Permanent Address"
                                        primaryTypographyProps={{ variant: "caption" }}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {emp.presAddress}
                                                </Typography>
                                                {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Region" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1' >
                                                    <ListItemIcon>
                                                        <PlaceIcon />
                                                    </ListItemIcon>
                                                    {/* place */}
                                                    <ListItemText primary={emp.region} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Postal Pincode" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <PersonPinCircleIcon />
                                                    </ListItemIcon>
                                                    {/* pin code */}
                                                    <ListItemText primary={emp.pincode} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Mobile Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <PhoneIphoneIcon />
                                                    </ListItemIcon>
                                                    {/* mobile */}
                                                    <ListItemText primary={emp.mobile} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Home Telephone Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <LocalPhoneIcon />
                                                    </ListItemIcon>
                                                    {/* Phone */}
                                                    <ListItemText primary={emp.phone} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Email Address" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <AlternateEmailIcon />
                                                    </ListItemIcon>
                                                    {/* Mail Id */}
                                                    <ListItemText primary={emp.email} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Adhar Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <BadgeIcon />
                                                    </ListItemIcon>
                                                    {/* adhar number */}
                                                    <ListItemText primary={emp.adhar} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Bank Account Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <AccountBalanceIcon />
                                                    </ListItemIcon>
                                                    {/* Account number */}
                                                    <ListItemText primary={emp.account} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Bank Name" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <SavingsIcon />
                                                    </ListItemIcon>
                                                    {/* bank Master */}
                                                    <ListItemText primary={emp.bank} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Date Of Join" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <DateRangeIcon />
                                                    </ListItemIcon>
                                                    {/* Date of Join */}
                                                    <ListItemText primary={emp.dateofJoin} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Company Branch Name" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <DomainIcon />
                                                    </ListItemIcon>
                                                    {/* Company Branch Name */}
                                                    <ListItemText primary={emp.branch} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Department Name" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <AccountBalanceIcon />
                                                    </ListItemIcon>
                                                    {/* Department Name */}
                                                    <ListItemText primary={emp.department} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Department Section" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <SavingsIcon />
                                                    </ListItemIcon>
                                                    {/* Department Section Name */}
                                                    <ListItemText primary={emp.deptSection} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                            </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#49599a' }} >
                                            <HomeWorkIcon sx={{ color: 'white' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Present Address"
                                        primaryTypographyProps={{ variant: "caption" }}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {emp.permAddress}
                                                </Typography>
                                                {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>

                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Gender" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <WcIcon />
                                                    </ListItemIcon>
                                                    {/* Gender */}
                                                    <ListItemText primary={emp.gender} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Marital Status" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <SupervisorAccountIcon />
                                                    </ListItemIcon>
                                                    {/* Marital Status */}
                                                    <ListItemText primary={emp.ismarried} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Religion" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <SupervisorAccountIcon />
                                                    </ListItemIcon>
                                                    {/* Religion */}
                                                    <ListItemText primary={emp.religion} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Age" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <CalendarViewMonthIcon />
                                                    </ListItemIcon>
                                                    {/* Age */}
                                                    <ListItemText primary={emp.age} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12}  >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Date Of Birth" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <CalendarViewWeekIcon />
                                                    </ListItemIcon>
                                                    {/* DOB */}
                                                    <ListItemText primary={emp.dob} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Blood Group" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <BloodtypeIcon />
                                                    </ListItemIcon>
                                                    {/* BLood Group */}
                                                    <ListItemText primary={emp.bloodgroup} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>

                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12} >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="IFSC Code" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <AccountBalanceWalletIcon />
                                                    </ListItemIcon>
                                                    {/* Ifsc Code*/}
                                                    <ListItemText primary={emp.ifcscode} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="PAN Number" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <ConfirmationNumberIcon />
                                                    </ListItemIcon>
                                                    {/* Pan Number */}
                                                    <ListItemText primary={emp.panNo} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12} >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Employee Category " followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <CategoryIcon />
                                                    </ListItemIcon>
                                                    {/* Employee category*/}
                                                    <ListItemText primary={emp.emp_category} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Probation / Training End Date" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <EventAvailableIcon />
                                                    </ListItemIcon>
                                                    {/* Probation/ Trainig End Date */}
                                                    <ListItemText primary={emp.probEndDate} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} md={12} >
                                    <ListItem disablePadding>
                                        <Grid item xs={12} md={6} >
                                            <Tooltip title="Retirement Date" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <PermContactCalendarIcon />
                                                    </ListItemIcon>
                                                    {/* Retirement Date*/}
                                                    <ListItemText primary={emp.retirement} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Tooltip title="Contract End Date" followCursor placement='top' arrow >
                                                <ListItemButton className='py-1'>
                                                    <ListItemIcon>
                                                        <EventBusyIcon />
                                                    </ListItemIcon>
                                                    {/* Contract End Date*/}
                                                    <ListItemText primary={emp.constractEnd} />
                                                </ListItemButton>
                                            </Tooltip>
                                        </Grid>
                                    </ListItem>
                                </Grid>
                            </List>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={12} direction="row" spacing={2} >
                        <Grid item xs={12} md={6} >
                            <MyProfileExpQualify />
                            <MyProfileSalary />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <MyProfleExperience />
                            <AnualLeave />
                        </Grid>
                        {/* <Grid item xs={12} md={6} >

                        </Grid>
                        <Grid item xs={12} md={6} >

                        </Grid> */}
                    </Grid>
                </CardContent>
                <CardActionArea>
                    {/* <Button size="small">Learn More</Button> */}
                </CardActionArea>
            </Card>
        </Fragment >
    )
}

export default memo(MyProfilePersonalInform)