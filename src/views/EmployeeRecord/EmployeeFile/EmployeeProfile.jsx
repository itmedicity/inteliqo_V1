// import { CardContent, CardMedia } from '@material-ui/core'
// import { Card, Button, CardActionArea, CardActions, Stack } from '@mui/material'
// import Typography from '@mui/material/Typography';
import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ImageIcon from '@mui/icons-material/Image';
// import WorkIcon from '@mui/icons-material/Work';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import EmployeeProfileCard from './EmployeeProfileCard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ArticleIcon from '@mui/icons-material/Article';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import BusinessIcon from '@mui/icons-material/Business';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import BadgeIcon from '@mui/icons-material/Badge';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
// import PanToolIcon from '@mui/icons-material/PanTool';
import HttpsIcon from '@mui/icons-material/Https';
// import { deepOrange, green } from '@mui/material/colors';
import { useHistory, useParams } from 'react-router';
// import EmployeeTraining from './EmployeeTraining';

const EmployeeProfile = () => {
    const history = useHistory()
    const { id, no } = useParams()
    // Application Form Route
    const appplicationform = () => {
        history.push(`/Home/ApplicationForm/${4516}`)
    }
    // Personal Information
    const personalInformation = () => {
        history.push(`/Home/PersonalInformation/${4516}`)
    }
    //Employee Qualification
    const EmpQualification = () => {
        history.push(`/Home/EmployeeQualification/${id}/${no}`)
    }
    //Employee Experience
    const Employeexperience = () => {
        history.push(`/Home/EmployeeExperience/${id}/${no}`)
    }
    //Statutory Informnation
    const StatutoryInformation = () => {
        history.push(`/Home/StatutoryInformation/${id}/${no}`)
    }
    //Contract Informnation
    const ContractInformation = () => {
        history.push(`/Home/ContractInformation/${id}/${no}`)
    }
    //Employee Company
    const EmployeeCompany = () => {
        history.push(`/Home/EmployeeCompany/${4516}`)
    }
    //Salary Information
    const SalaryInformation = () => {
        history.push(`/Home/SalaryInformation/${id}/${no}`)
    }
    //Allownace Information
    const allowance = () => {
        history.push(`/Home/EmployeeAllowance/${4516}`)
    }
    //Annual Leave Settngs
    const AnnualLeaveSettings = () => {
        history.push(`/Home/AnnualLeaveSettings/${4516}`)
    }
    //Employee Training
    const EmployeeTrainingInformation = () => {
        history.push(`/Home/EmployeeTraining/${4516}`)
    }
    //Salary Increment Settings
    const SalaryIncrementSettings = () => {
        history.push(`/Home/SalaryIncrement/${4516}`)
    }
    //Employee document checklist
    const Employeedocumentchecklist = () => {
        history.push(`/Home/EmployeeDocumentChecklist/${4516}`)
    }
    //Vaccination Information
    const Vaccinationinformation = () => {
        history.push(`/Home/VaccinationInformation/${4516}`)
    }
    //fine or other deduction
    const fineorotherdeduction = () => {
        history.push(`/Home/FineorDeduction/${4516}`)
    }
    //employee end of service
    const endofservice = () => {
        history.push(`/Home/EmployeeEndofService/${4516}`)
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card" style={{ backgroundColor: "#b0bec5", borderRadius: 8 }} >
                {/* <div className="card-header bg-dark pb-0 border border-dark text-white ">
                    <h5>{props.heading}</h5>
                </div> */}
                <div className="card-body">
                    <div className="row p-0"  >
                        <div className="col-md-3 col-sm-12" >
                            <EmployeeProfileCard />
                        </div>
                        <div className="col-md-9 col-sm-12 pl-0">
                            <div className="card"  >
                                {/* <div className="card-header bg-dark pb-0 border border-dark text-white ">
                                    <h5>District</h5>
                                </div> */}
                                <div className="card-body">
                                    <div className="row">

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={4}>
                                                {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                                    Text only
                                                </Typography> */}
                                                {/* <Demo> */}
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={appplicationform}  >
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#ff8a80' }} variant="rounded" >
                                                                <AppRegistrationIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="My Profile" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={personalInformation}  >
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#ea80fc' }} variant="rounded" >
                                                                <PermContactCalendarIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Personal Information" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={EmpQualification}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#8c9eff' }} variant="rounded">
                                                                <CastForEducationIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Qualification" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={Employeexperience} >
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: "#80d8ff" }} variant="rounded">
                                                                <ArticleIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Experience" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={StatutoryInformation} >
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#a7ffeb' }} variant="rounded">
                                                                <LibraryBooksIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Statutory Information" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={ContractInformation}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#ffccbc' }} variant="rounded">
                                                                <ContactPhoneIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Contract Information" />
                                                    </ListItem>
                                                </List>
                                                {/* </Demo> */}
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                                    Icon with text
                                                </Typography> */}
                                                {/* <Demo> */}
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={EmployeeCompany}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#c5e1a5' }} variant="rounded">
                                                                <BusinessIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Company Information" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={SalaryInformation}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#80cbc4' }} variant="rounded">
                                                                <AttachMoneyIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Salary information" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={allowance}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#ea80fc' }} variant="rounded">
                                                                <AlignVerticalCenterIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Earnings / Deduction" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={AnnualLeaveSettings}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#b39ddb' }} variant="rounded">
                                                                <BadgeIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Annual Leave Setting" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={fineorotherdeduction}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#b2ebf2' }} variant="rounded">
                                                                <AdminPanelSettingsIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Fine / Other Deduction" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={SalaryIncrementSettings}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#9fa8da' }} variant="rounded">
                                                                <LegendToggleIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Salary Increment Setting" />
                                                    </ListItem>
                                                </List>
                                                {/* </Demo> */}
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                                    Icon with text
                                                </Typography> */}
                                                {/* <Demo> */}
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={Employeedocumentchecklist}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#ffab91' }} variant="rounded">
                                                                <ListAltIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Document Checklist" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={Vaccinationinformation}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#e1bee7' }} variant="rounded">
                                                                <EnhancedEncryptionIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Vaccination Information" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={EmployeeTrainingInformation}>
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#81d4fa' }} variant="rounded">
                                                                <InsertChartIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Training Information" />
                                                    </ListItem>
                                                    <ListItem style={{ cursor: "pointer" }} onClick={endofservice} >
                                                        <ListItemAvatar>
                                                            <Avatar sx={{ bgcolor: '#ffcc80' }} variant="rounded" >
                                                                <HttpsIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="End Of Service" />
                                                    </ListItem>
                                                    {/* <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar>
                                                                <BeachAccessIcon />
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                                    </ListItem> */}
                                                </List>
                                                {/* </Demo> */}
                                            </Grid>
                                        </Grid>

                                        {/* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <ImageIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <WorkIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Work" secondary="Jan 7, 2014" />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <BeachAccessIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary="Vacation" secondary="July 20, 2014" />
                                            </ListItem>
                                        </List> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EmployeeProfile
