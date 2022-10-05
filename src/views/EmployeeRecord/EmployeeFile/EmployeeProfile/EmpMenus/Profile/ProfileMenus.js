import { CssVarsProvider, Typography } from '@mui/joy';
import { Box, Grid, IconButton, Paper, Tooltip, } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import { InfoOutlined } from '@material-ui/icons';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MyLocationOutlinedIcon from '@mui/icons-material/MyLocationOutlined';
import ProfileAcademicBox from './ProfileAcademicBox';
import ProfileExperience from './ProfileExperience';
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp';
import ProfileVerificationModal from 'src/views/EmployeeRecord/EmployeeFile/EmpFileComponent/MyProfileCmp/ProfileVerificationModal';

const ProfileMenus = () => {

    const state = useSelector((state) => {
        return state.getMenuRenderCompRights.slno;
    })

    // get personal details 
    const loginDetl = useSelector((state) => {
        return state.getPrifileDateEachEmp;
    })

    const { personalData, personalDataStatus } = loginDetl.empPersonalData;

    const {
        em_no, addressPermnt1, addressPermnt2, addressPresent1, addressPresent2, branch_name, dept_name, verification_status,
        desg_name, ecat_name, em_conf_end_date, em_contract_end_date, em_dob, em_doj, em_email, em_age_year,
        em_gender, em_mobile, em_name, em_phone, em_retirement_date, hrm_pin1, per_region, pres_region,
        sect_name, em_adhar_no, em_account_no, bank_name, em_maritalstatus, relg_name, group_name, em_ifsc, em_pan_no,
        em_esi_no, em_pf_no, em_uan_no, second_level_required, second_level_verification, verification_required, em_id
    } = personalData

    const emp = {
        name: em_name === '' ? false : em_name,
        presAddress: addressPermnt1 === '' ? false : ` ${addressPermnt1} ${addressPermnt2} ${per_region}`,
        permAddress: addressPresent1 === '' ? false : `${addressPresent1} ${addressPresent2} ${pres_region}`,
        region: per_region === '' ? false : per_region,
        pincode: hrm_pin1 === '' ? false : hrm_pin1,
        mobile: em_mobile === '' ? false : em_mobile,
        phone: em_phone === '' ? false : em_phone,
        email: em_email === '' ? false : em_email,
        adhar: em_adhar_no === null ? false : em_adhar_no,
        designation: desg_name === '' ? false : desg_name,
        account: em_account_no === null ? false : em_account_no,
        bank: bank_name === null ? false : bank_name,
        em_esi_no: em_esi_no === null ? false : em_esi_no,
        em_pf_no: em_pf_no === null ? false : em_pf_no,
        em_uan_no: em_uan_no === null ? false : em_uan_no,
        gender: em_gender === 2 ? 'Female' : 'Male',
        ismarried: em_maritalstatus === '2' ? 'Not Married' : em_maritalstatus === null ? false : 'Married',
        religion: relg_name === null ? false : relg_name,
        age: em_age_year === null ? false : em_age_year,
        dob: em_dob === null ? false : em_dob,
        bloodgroup: group_name === null ? false : group_name,
        ifcscode: em_ifsc === null ? false : em_ifsc,
        panNo: em_pan_no === null ? false : em_pan_no,
        dateofJoin: em_doj === null ? 'NOT UPATED' : em_doj,
        branch: branch_name === null ? 'NOT UPATED' : branch_name,
        department: dept_name === null ? 'NOT UPATED' : dept_name,
        deptSection: sect_name === null ? 'NOT UPATED' : sect_name,
        emp_category: ecat_name === null ? 'NOT UPATED' : ecat_name,
        probEndDate: em_conf_end_date === null ? 'NOT UPATED' : em_conf_end_date,
        constractEnd: em_contract_end_date === null ? 'NOT UPATED' : em_contract_end_date,
        retirement: em_retirement_date === null ? 'NOT UPATED' : em_retirement_date,
        verification_required: verification_required,
        verification_status: verification_status === null ? false : verification_status,
        second_level_required: second_level_required,
        second_level_verification: second_level_verification
    }

    const getVerification = async (em_id) => {
        console.log("verified");
        //setModelopen(empid)
        // setOpen(true)
    }

    const notUpdated = <CssVarsProvider>
        <Typography variant="soft" color="danger" width="100%" >
            not updated / Required
        </Typography>
    </CssVarsProvider>;

    return (
        <Box sx={{
            p: 0.5,
            width: '100%',
        }} >

            {/* <ProfileVerificationModal open={open} modeopen={modeopen} setOpen={setOpen} handleClose={handleClose}
                count={count} setCount={setCount}
                slno={slno}
            /> */}

            {/* Box 1  */}
            <Paper variant="outlined" sx={{
                px: 1,
            }} >
                <Box sx={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        //backgroundColor: "lightcoral",
                        flex: 1

                    }}>
                        <CssVarsProvider>
                            <Box sx={{ display: "flex", py: 0.3 }} >
                                {/* <PersonOutlinedIcon /> */}
                                <Typography
                                    fontSize="xl2"
                                    lineHeight={0}
                                    // startDecorator={}
                                    endDecorator={<PersonOutlinedIcon color='primary' />}
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    {emp.name.toLowerCase()}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }} >
                                <Typography textColor="text.secondary"
                                    startDecorator={
                                        <ManageAccountsOutlinedIcon fontSize='md' color='primary' />
                                    }
                                    endDecorator={
                                        <Typography>
                                            |
                                        </Typography>
                                    }
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    {emp.designation.toLowerCase()}
                                </Typography>
                                <Typography textColor="text.secondary"
                                    startDecorator={
                                        <LanOutlinedIcon fontSize='md' color='primary' />
                                    }
                                    endDecorator={
                                        <Typography>
                                            |
                                        </Typography>
                                    }
                                    px={1}
                                    sx={{ textTransform: 'capitalize' }}
                                >
                                    {emp.department.toLowerCase()}
                                </Typography>
                                <Typography textColor="text.secondary"
                                    startDecorator={<NumbersOutlinedIcon fontSize='md' color='primary' />}
                                >
                                    {em_no}
                                </Typography>
                            </Box>

                        </CssVarsProvider>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        //backgroundColor: "lightgray" 
                    }}
                    >
                        <IconButton aria-label="settings" sx={{ marginLeft: 10 }}
                            onClick={() => getVerification(em_id)}
                            disabled={emp.verification_status === 1 && emp.second_level_required === 0 && emp.second_level_verification === 1 || verification_required === 0 ? true : false}
                        >
                            <VerifiedSharpIcon
                                fontSize='large'
                                color={emp.verification_status === 1 ? 'success' : emp.second_level_required && emp.second_level_verification === 1 ? 'success' : 'error'}
                            />
                        </IconButton>

                    </Box>
                </Box>




            </Paper >
            {/* Main Secondary Box */}
            < Box sx={{
                width: '100%',
                height: { xxl: 750, xl: 600, lg: 450, md: 450, sm: 450, xs: 300 },
                overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }} >
                {/* Box Two */}
                < Box >
                    <CssVarsProvider>
                        <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                            Contact Information
                        </Typography>
                    </CssVarsProvider>
                    <Paper variant="outlined" sx={{
                        px: 1, mt: 0.3
                    }}>
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', p: 0.5 }} >
                            <Box sx={{ display: 'flex', width: '20%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        Permanent Address
                                    </Typography>

                                </CssVarsProvider>
                            </Box>
                            <CssVarsProvider>
                                <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                            </CssVarsProvider>
                            <Box sx={{ display: 'flex', width: '50%', textTransform: "capitalize" }}>
                                {emp.presAddress.toLowerCase()}{emp.pincode === false ? '' :
                                    <Box sx={{ display: 'flex', px: 1 }}>
                                        <Box sx={{ display: 'flex', textTransform: "capitalize", alignItems: "center" }}>
                                            <MyLocationOutlinedIcon color='primary' fontSize="small" />
                                        </Box>
                                        <Tooltip title="Postal Pincode" followCursor placement='top' arrow >
                                            <Box sx={{ display: 'flex', stextTransform: "capitalize", px: 1 }}>
                                                {emp.pincode}
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                }
                            </Box>
                            <Tooltip title="Region Name" followCursor placement='top' arrow >
                                <Box sx={{ display: 'flex', width: '30%', textTransform: "capitalize", alignItems: "center" }}>
                                    <LocationOnOutlinedIcon color='primary' fontSize="small" />
                                    {emp.region.toLowerCase()}
                                </Box>
                            </Tooltip>
                        </Box>

                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', p: 0.5 }} >
                            <Box sx={{ display: 'flex', width: '20%' }}>
                                <CssVarsProvider>
                                    <Typography textColor="text.secondary">
                                        Present Address
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <CssVarsProvider>
                                <Typography endDecorator={<ArrowRightOutlinedIcon />} ></Typography>
                            </CssVarsProvider>
                            <Box sx={{ display: 'flex', width: '50%', textTransform: "capitalize" }}>
                                {emp.permAddress.toLowerCase()}{emp.pincode === false ? '' :
                                    <Box sx={{ display: 'flex', px: 1 }}>
                                        <Box sx={{ display: 'flex', textTransform: "capitalize", alignItems: "center" }}>
                                            <MyLocationOutlinedIcon color='primary' fontSize="small" />
                                        </Box>
                                        <Tooltip title="Postal Pincode" followCursor placement='top' arrow >
                                            <Box sx={{ display: 'flex', stextTransform: "capitalize", px: 1 }}>
                                                {emp.pincode}
                                            </Box>
                                        </Tooltip>
                                    </Box>
                                }
                            </Box>
                            <Tooltip title="Region Name" followCursor placement='top' arrow >
                                <Box sx={{ display: 'flex', width: '30%', textTransform: "capitalize", alignItems: "center" }}>
                                    <LocationOnOutlinedIcon color='primary' fontSize="small" />
                                    {emp.region.toLowerCase()}
                                </Box>
                            </Tooltip>
                        </Box>
                    </Paper>
                </Box >

                {/* Box 2 */}
                {/* General Information Start here */}

                <Box sx={{ py: 0.5 }}>
                    <CssVarsProvider>
                        <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                            General Information
                        </Typography>
                    </CssVarsProvider>
                    <Paper variant="outlined" sx={{
                        px: 1, mt: 0.3
                    }}>
                        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} direction="row" >
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Mobile #
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >
                                        {emp.mobile === false ? notUpdated : emp.mobile}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Telephone
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.phone === false ? notUpdated : emp.phone}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Gender
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.gender}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Age
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >
                                        <CssVarsProvider>
                                            {emp.age === false ? notUpdated : emp.age} <Typography level="body4" > &nbsp;{emp.age === false ? '' : 'Years'} </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Date of Birth
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.dob === false ? notUpdated : emp.dob}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Marital Status
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.ismarried === false ? notUpdated : emp.ismarried}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Religion
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", textTransform: "capitalize" }} >{emp.religion === false ? notUpdated : emp.religion.toLowerCase()}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                @email
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.email === false ? notUpdated : emp.email.toLowerCase()}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Adhar #
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.adhar === false ? notUpdated : emp.adhar}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Blood Group
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.bloodgroup === false ? notUpdated : emp.bloodgroup}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Pan Number
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.panNo === false ? notUpdated : emp.panNo}</Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>

                {/* Box 3 */}
                {/* Complany information */}

                <Box sx={{ py: 0.5 }} >
                    <CssVarsProvider>
                        <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }} startDecorator={<ArrowRightOutlinedIcon />} >
                            Company Information
                        </Typography>
                    </CssVarsProvider>
                    <Paper variant="outlined" sx={{
                        px: 1, mt: 0.3,
                    }}>
                        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} direction="row" >
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Branch
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >
                                        {emp.branch === false ? notUpdated : emp.branch}
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Department
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", textTransform: 'capitalize' }} >{emp.department === false ? notUpdated : emp.department.toLowerCase()}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Section
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", textTransform: 'capitalize' }} >{emp.deptSection === false ? notUpdated : emp.deptSection.toLowerCase()}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Date of Join
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.dateofJoin === false ? notUpdated : emp.dateofJoin}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Account #
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.account === false ? notUpdated : emp.account}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Bank Name
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", textTransform: 'capitalize' }} >{emp.bank === false ? notUpdated : emp.bank.toLowerCase()}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                IFSC Code
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.ifcscode === false ? notUpdated : emp.ifcscode}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Retirement
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%" }} >{emp.retirement === false ? notUpdated : emp.retirement}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Contract Start
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.dateofJoin === false ? notUpdated : emp.dateofJoin}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Contract End
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.constractEnd === false ? notUpdated : emp.constractEnd}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                Start &nbsp;<Typography level="body4" >(Probation/Training)</Typography>
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.dateofJoin === false ? notUpdated : emp.dateofJoin}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                End &nbsp;<Typography level="body4" >(Probation/Training)</Typography>
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.probEndDate === false ? notUpdated : emp.probEndDate}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                ESI #
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.em_esi_no === false ? notUpdated : emp.em_esi_no}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                PF #
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.em_pf_no === false ? notUpdated : emp.em_pf_no}</Box>
                                </Box>
                            </Grid>
                            <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
                                <Box sx={{ display: 'flex', width: "100%", }} >
                                    <Box sx={{ display: 'flex', width: "40%", }} >
                                        <CssVarsProvider>
                                            <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />} >
                                                UAN #
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ display: 'flex', width: "60%", }} >{emp.em_uan_no === false ? notUpdated : emp.em_uan_no}</Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>

                {/* Box 4 */}
                {/* Academic qualification */}

                <Box sx={{ display: 'flex', py: 0.5 }} >
                    {/* Academic Detail Box*/}
                    <ProfileAcademicBox />
                    {/* Professional Expereince Box */}
                    <ProfileExperience />
                </Box>
                {/* Main secondary Box End */}
            </Box >
            {/* Main Box */}
        </Box >
    )
}

export default ProfileMenus