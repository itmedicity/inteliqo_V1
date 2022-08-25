import { CssVarsProvider, Typography } from '@mui/joy';
import { Box, Grid, Paper, Tooltip, } from '@mui/material';
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

const ProfileMenus = () => {

    const state = useSelector((state) => {
        return state.getMenuRenderCompRights.slno;
    })

    // get personal details 
    const loginDetl = useSelector((state) => {
        return state.getPrifileDateEachEmp;
    })

    const { personalData, personalDataStatus } = loginDetl.empPersonalData;
    console.log(personalData)

    const {
        em_no, addressPermnt1, addressPermnt2, addressPresent1, addressPresent2, branch_name, dept_name, verification_status,
        desg_name, ecat_name, em_conf_end_date, em_contract_end_date, em_dob, em_doj, em_email, em_age_year,
        em_gender, em_mobile, em_name, em_phone, em_retirement_date, hrm_pin1, per_region, pres_region,
        sect_name, em_adhar_no, em_account_no, bank_name, em_maritalstatus, relg_name, group_name, em_ifsc, em_pan_no,
        em_esi_no, em_pf_no, em_uan_no, second_level_required, second_level_verification, verification_required
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
        em_esi_no: em_esi_no === null ? 'NOT UPDATED' : em_esi_no,
        em_pf_no: em_pf_no === null ? 'NOT UPDATED' : em_pf_no,
        em_uan_no: em_uan_no === null ? 'NOT UPDATED' : em_uan_no,
        gender: em_gender === 2 ? 'Female' : 'Male',
        ismarried: em_maritalstatus === '2' ? 'Not Married' : em_maritalstatus === null ? 'NOT UPDATED' : 'Married',
        religion: relg_name === null ? 'NOT UPDATED' : relg_name,
        age: em_age_year === null ? 'NOT UPDATED' : em_age_year,
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
        verification_required: verification_required,
        verification_status: verification_status === null ? 'NOT UPDATED' : verification_status,
        second_level_required: second_level_required,
        second_level_verification: second_level_verification
    }

    return (
        <Box sx={{ p: 0.5, width: '100%' }} >
            {/* Box 1  */}
            <Paper variant="outlined" sx={{
                px: 1
            }} >
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
            </Paper>
            {/* Box Two */}
            <Box>
                <CssVarsProvider>
                    <Typography textColor="text.secondary" sx={{ fontStyle: "oblique" }} startDecorator={<ArrowRightOutlinedIcon />} >
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
                            {emp.presAddress.toLowerCase()}{emp.pincode === 'NOT UPDATED' ? '' :
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
                            {emp.permAddress.toLowerCase()}{emp.pincode === 'NOT UPDATED' ? '' :
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

                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', py: 0.5 }}>
                        <Box sx={{ display: 'flex', width: '25%', alignItems: 'center', }} >
                            <Tooltip title="Mobile Number" followCursor placement='top' arrow >
                                <Box sx={{ display: 'flex', stextTransform: "capitalize", px: 1 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />}>
                                            {emp.mobile}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', width: '25%', alignItems: 'center', }} >
                            <Tooltip title="Phone Number" followCursor placement='top' arrow >
                                <Box sx={{ display: 'flex', stextTransform: "capitalize", px: 1 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />}>
                                            {emp.phone}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', width: '25%', alignItems: 'center', }} >
                            <Tooltip title="Gender" followCursor placement='top' arrow >
                                <Box sx={{ display: 'flex', stextTransform: "capitalize", px: 1 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />}>
                                            {emp.gender}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', width: '25%', alignItems: 'center', }} >
                            <Tooltip title="Age & Date Of Birth" followCursor placement='top' arrow >
                                <Box sx={{ display: 'flex', stextTransform: "capitalize", px: 1 }}>
                                    <CssVarsProvider>
                                        <Typography textColor="text.secondary" startDecorator={<ArrowRightOutlinedIcon color='primary' />}>
                                            {emp.dob} | {emp.age} <Typography level="body4" > &nbsp; Years</Typography>
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>
                </Paper>
            </Box>

            {/* Box 2 */}
            <Box>
                <CssVarsProvider>
                    <Typography textColor="text.secondary" sx={{ fontStyle: "oblique" }} startDecorator={<ArrowRightOutlinedIcon />} >
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
                                            Mobile Number
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: 'flex', width: "60%", }} >{emp.mobile}</Box>
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
                                <Box sx={{ display: 'flex', width: "60%", }} >{emp.phone}</Box>
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
                                        {emp.age} <Typography level="body4" > &nbsp; Years</Typography>
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
                                <Box sx={{ display: 'flex', width: "60%", }} >{emp.dob}</Box>
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
                                <Box sx={{ display: 'flex', width: "60%", }} >{emp.ismarried}</Box>
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
                                <Box sx={{ display: 'flex', width: "60%", }} >{emp.ismarried}</Box>
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
                                <Box sx={{ display: 'flex', width: "60%", textTransform: "capitalize" }} >{emp.religion.toLowerCase()}</Box>
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
                                <Box sx={{ display: 'flex', width: "60%", }} >{emp.email.toLowerCase()}</Box>
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
                                <Box sx={{ display: 'flex', width: "60%", }} >{emp.adhar}</Box>
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
                                <Box sx={{ display: 'flex', width: "60%", }} >{emp.bloodgroup}</Box>
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
                                <Box sx={{ display: 'flex', width: "60%", }} >{emp.panNo}</Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Box>
    )
}

export default ProfileMenus