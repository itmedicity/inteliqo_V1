import React, { Fragment } from 'react'
import { Card, CardActionArea, CardMedia, Stack, Avatar, Typography, CardContent, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { useHistory } from 'react-router'
import HttpsIcon from '@mui/icons-material/Https';
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
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const EmployeeProfileCardMenuList = (props) => {
    const { id, no } = props.empid
    const history = useHistory()

    const appplicationform = () => {
        history.push(`/Home/ApplicationForm/${4516}`)
    }
    // Personal Information
    const personalInformation = () => {
        history.push(`/Home/PersonalInformation/${id}/${no}`)
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
        history.push(`/Home/EmployeeCompany/${id}/${no}`)
    }
    //Salary Information
    const SalaryInformation = () => {
        history.push(`/Home/SalaryInformation/${4516}`)
    }
    //Allownace Information
    const allowance = () => {
        history.push(`/Home/EmployeeAllowance/${id}/${no}`)
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
        history.push(`/Home/FineorDeduction/${id}/${no}`)
    }
    //employee end of service
    const endofservice = () => {
        history.push(`/Home/EmployeeEndofService/${4516}`)
    }
    return (
        <Fragment>
            <Card sx={{ borderRadius: 8, boxShadow: 10 }} >
                <CardActionArea>
                    <CardContent>
                        <Grid container spacing={2} >
                            <Grid item xs={12} md={4}>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem style={{ cursor: "pointer" }} onClick={appplicationform}  >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#ff8a80', boxShadow: 15 }} variant="circular"  >
                                                <AppRegistrationIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="My Profile"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={personalInformation}  >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#ea80fc', boxShadow: 15 }} variant="circular"  >
                                                <PermContactCalendarIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Personal Information"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={EmpQualification}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#8c9eff', boxShadow: 15 }} variant="circular" >
                                                <CastForEducationIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Qualification"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={Employeexperience} >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: "#80d8ff", boxShadow: 15 }} variant="circular" >
                                                <ArticleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Experience"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={StatutoryInformation} >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#a7ffeb', boxShadow: 15 }} variant="circular" >
                                                <LibraryBooksIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Statutory Information"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={ContractInformation}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#ffccbc', boxShadow: 15 }} variant="circular" >
                                                <ContactPhoneIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Contract Information"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={EmployeeCompany}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#c5e1a5', boxShadow: 15 }} variant="circular" >
                                                <BusinessIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Company Information"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                                    <ListItem style={{ cursor: "pointer" }} onClick={SalaryInformation}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#80cbc4', boxShadow: 15 }} variant="circular" >
                                                <AttachMoneyIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Salary information"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={allowance}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#ea80fc', boxShadow: 15 }} variant="circular" >
                                                <AlignVerticalCenterIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Earnings / Deduction"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={AnnualLeaveSettings}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#b39ddb', boxShadow: 15 }} variant="circular" >
                                                <BadgeIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Annual Leave Setting"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={fineorotherdeduction}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#b2ebf2', boxShadow: 15 }} variant="circular" >
                                                <AdminPanelSettingsIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Fine / Other Deduction"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={SalaryIncrementSettings}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#9fa8da', boxShadow: 15 }} variant="circular" >
                                                <LegendToggleIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Salary Increment Setting"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={Employeedocumentchecklist}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#ffab91', boxShadow: 15 }} variant="circular" >
                                                <ListAltIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Document Checklist"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={Vaccinationinformation}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#e1bee7', boxShadow: 15 }} variant="circular" >
                                                <EnhancedEncryptionIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Vaccination Information"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                </List>

                            </Grid>
                            <Grid item xs={12} md={4}>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem style={{ cursor: "pointer" }} onClick={EmployeeTrainingInformation}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#81d4fa', boxShadow: 15 }} variant="circular" >
                                                <InsertChartIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Training Information"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                    <ListItem style={{ cursor: "pointer" }} onClick={endofservice} >
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: '#ffcc80', boxShadow: 15 }} variant="circular"  >
                                                <HttpsIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="End Of Service"
                                            primaryTypographyProps={{ noWrap: true }}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Fragment>
    )
}

export default EmployeeProfileCardMenuList
