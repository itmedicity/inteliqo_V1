import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import React, { lazy, useCallback } from 'react';
import { Fragment, memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { Paper } from '@mui/material'


const ViewModalApplication = lazy(() => import('./ApplicationDataForms/ApplicationEmp/ViewDataModal'))
const InterViewAssesment = lazy(() => import('./ApplicationDataForms/InterviewSheet/InterViewAssesment'))
const PersonalData = lazy(() => import('./ApplicationDataForms/PersonalData/PersonalData'))
const AntecedentForm = lazy(() => import('./ApplicationDataForms/AntecedentVerificationForm/AntecedentForm'))
const CredentialForm = lazy(() => import('./ApplicationDataForms/CredentialForm/CredentialForm'))
const HealthCheckForm = lazy(() => import('./ApplicationDataForms/PreEmploymentForm/HealthCheckForm'))
const InductionRecord = lazy(() => import('./ApplicationDataForms/InductionRecord/InductionRecord'))
const DepartmentOrientation = lazy(() => import('./ApplicationDataForms/DepartmentOrientation/DepartmentOrientation'))
const RightsAndResponsibilites = lazy(() => import('./ApplicationDataForms/RightsAndResponsibilites/RightsAndResponsibilites'))
const AnnualHealthCheckup = lazy(() => import('./ApplicationDataForms/AnnualHealthCheckup/AnnualHealthCheckup'))
const DueClearance = lazy(() => import('./ApplicationDataForms/DueClearance/DueClearance'))
const ExitQuestion = lazy(() => import('./ApplicationDataForms/ExitQuestion/ExitQuestion'))
const Accadamic = lazy(() => import('./ApplicationDataForms/AccadamicCirtificate/Accadamic'))
const Registration = lazy(() => import('./ApplicationDataForms/RegistrationCertificate/Registration'))
const Experience = lazy(() => import('./ApplicationDataForms/ExperienceCertificate/Experience'))
const IdProof = lazy(() => import('./ApplicationDataForms/IDproof/IdProof'))
const JobDiscription = lazy(() => import('./ApplicationDataForms/JobDiscription/JobDiscription'))
const Appointment = lazy(() => import('./ApplicationDataForms/Appointment/Appointment'))
const JoiningLetter = lazy(() => import('./ApplicationDataForms/JoiningLetter/JoiningLetter'))
const Competency = lazy(() => import('./ApplicationDataForms/Competency/Competency'))
const Statutory = lazy(() => import('./ApplicationDataForms/StatutoryRecord/Statutory'))
const ProbationPeriod = lazy(() => import('./ApplicationDataForms/ReviewofProbationPeriod/ProbationPeriod'))
const ConfirmationLetter = lazy(() => import('./ApplicationDataForms/ConfirmationLetter/ConfirmationLetter'))
const BioData = lazy(() => import('./ApplicationDataForms/BioData/BioData'))
const OfferLetter = lazy(() => import('./ApplicationDataForms/OfferLetter/OfferLetter'))
const Vaccination = lazy(() => import('./ApplicationDataForms/Vaccination/Vaccination'))





const Viewpageall = ({ setflag, Files, Empdata, checklistid, itemname, setShowGeneral, setEmpdata, selectedRowData }) => {

    const toRedirectToHome = useCallback((e, item) => {
        // setflag(1)
        setShowGeneral(0)
    }, [setShowGeneral])
    return (
        <Fragment>
            <Paper elevation={0} square={false}
                sx={{
                    width: { md: "100%", sm: "100%", xl: "100%", lg: "100%", xs: "100%" }, height: window.innerHeight - 120, p: 1
                }}

            >
                <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                        <Paper square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', justifyContent: "space-between" }} >
                            <Box sx={{ display: "flex" }}>
                                <DragIndicatorOutlinedIcon />
                                <CssVarsProvider>
                                    <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                        {itemname}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", pr: 1 }}>
                                <CssVarsProvider>
                                    <IconButton
                                        variant="outlined"
                                        size='xs'
                                        color="danger"
                                        onClick={toRedirectToHome}
                                        sx={{ color: '#ef5350' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>

                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Paper>
                <Box sx={{ mt: 1 }}>
                    {
                        checklistid === 1 ? <ViewModalApplication
                            setEmpdata={setEmpdata} Empdata={Empdata} /> :
                            checklistid === 2 ? <BioData
                                Files={Files} /> :
                                checklistid === 4 ? <OfferLetter
                                    Files={Files} Empdata={Empdata} /> :
                                    checklistid === 3 ? <InterViewAssesment
                                        setEmpdata={setEmpdata} Empdata={Empdata} Files={Files} /> :
                                        checklistid === 6 ? <PersonalData
                                            setEmpdata={setEmpdata} Files={Files} Empdata={Empdata} /> :
                                            checklistid === 7 ? <Accadamic
                                                Files={Files} /> :
                                                checklistid === 8 ? <Registration
                                                    Files={Files} /> :
                                                    checklistid === 9 ? <Experience
                                                        Files={Files} /> :
                                                        checklistid === 10 ? <IdProof
                                                            Files={Files} /> :
                                                            checklistid === 14 ? <JobDiscription
                                                                Files={Files} /> :
                                                                checklistid === 15 ? <Appointment
                                                                    Files={Files} Empdata={Empdata} /> :
                                                                    checklistid === 16 ? <JoiningLetter
                                                                        Files={Files} Empdata={Empdata} /> :
                                                                        checklistid === 17 ? <Competency
                                                                            Files={Files} /> :
                                                                            checklistid === 18 ? <Statutory
                                                                                Files={Files} /> :
                                                                                checklistid === 22 ? <Vaccination
                                                                                    Files={Files} Empdata={Empdata} /> :
                                                                                    checklistid === 23 ? <ProbationPeriod
                                                                                        Files={Files} /> :
                                                                                        checklistid === 24 ? <ConfirmationLetter
                                                                                            Files={Files} /> :
                                                                                            checklistid === 11 ? <AntecedentForm
                                                                                                setEmpdata={setEmpdata} Empdata={Empdata} /> :
                                                                                                checklistid === 12 ? <CredentialForm
                                                                                                    setEmpdata={setEmpdata} Empdata={Empdata} /> :
                                                                                                    checklistid === 5 ? <HealthCheckForm
                                                                                                        setEmpdata={setEmpdata} Empdata={Empdata} Files={Files} /> :
                                                                                                        checklistid === 19 ? <InductionRecord
                                                                                                            setEmpdata={setEmpdata} Empdata={Empdata} /> :
                                                                                                            checklistid === 20 ? <DepartmentOrientation
                                                                                                                setEmpdata={setEmpdata} Empdata={Empdata} /> :
                                                                                                                checklistid === 21 ? <RightsAndResponsibilites
                                                                                                                    setEmpdata={setEmpdata} Empdata={Empdata} /> :
                                                                                                                    checklistid === 28 ? <AnnualHealthCheckup
                                                                                                                        setEmpdata={setEmpdata} Empdata={Empdata} /> :
                                                                                                                        checklistid === 32 ? <DueClearance
                                                                                                                            setEmpdata={setEmpdata} Empdata={Empdata} /> :
                                                                                                                            checklistid === 33 ? <ExitQuestion
                                                                                                                                setEmpdata={setEmpdata} Empdata={Empdata} /> :
                                                                                                                                null

                    }
                </Box>
                {/* for pdf View */}
                {/* <Box sx={{
                    mt: 1,

                    overflowX: 'auto',
                    height: window.innerHeight - 160,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}>
                    {Files.map((file, index) => (
                        <Box key={index} sx={{ p: 1 }}>
                            {file.endsWith('.pdf') ? (
                                <Card>
                                    <embed
                                        src={file}
                                        type="application/pdf"
                                        height={window.innerHeight - 200}
                                        width="100%"
                                    />
                                </Card>

                            ) : (
                                <Card>
                                    <img
                                        src={file}
                                        height={window.innerHeight - 200}
                                        alt=''
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </Card>

                            )}
                        </Box>
                    ))}
                </Box> */}

            </Paper>

        </Fragment>
    )
}

export default memo(Viewpageall) 