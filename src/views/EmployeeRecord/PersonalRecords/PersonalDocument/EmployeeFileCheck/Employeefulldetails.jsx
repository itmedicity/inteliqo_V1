import { Box, Button, Typography, } from '@mui/joy'
import { Paper } from '@mui/material';
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { biodetails, getPicAndPdf, getempdetails, interviewmark } from '../Functions/PdfAndPicture';

const ViewApplication = lazy(() => import('./Fulldetails/ViewApplication'))
const BioData = lazy(() => import('./Fulldetails/BioData'))
const AssesmentSheet = lazy(() => import('./Fulldetails/AssesmentSheet'))
const OfferLetter = lazy(() => import('./Fulldetails/OfferLetter'))
const PdfFormat1 = lazy(() => import('./Fulldetails/PdfFormat1'))
const PdfFormat2 = lazy(() => import('./Fulldetails/PdfFormat2'))
const PdfFormat3 = lazy(() => import('./Fulldetails/PdfFormat3'))
const PdfFormat4 = lazy(() => import('./Fulldetails/PdfFormat4'))
const Joinpdfformat1 = lazy(() => import('./Fulldetails/Joinpdfformat1'))
const Joinpdfformat2 = lazy(() => import('./Fulldetails/Joinpdfformat2'))
const Joinpdfformat3 = lazy(() => import('./Fulldetails/Joinpdfformat3'))
const Joinpdfformat4 = lazy(() => import('./Fulldetails/Joinpdfformat4'))
const AntecedentForm = lazy(() => import('./Fulldetails/AntecedentForm'))
const CredentialForm = lazy(() => import('./Fulldetails/CredentialForm'))
const AnnualHealthCheckUp = lazy(() => import('./Fulldetails/AnnualHealthCheckUpForm/AnnualHealthCheckUp'))
const PersonalDataForm = lazy(() => import('./Fulldetails/PersonalDataForm/PersonalDataForm'))
const HealthCheckupForm = lazy(() => import('./Fulldetails/HealthCheckUpForm/HealthCheckupForm'))
const CredentialFormAndPrivilage = lazy(() => import('./Fulldetails/CredentialingAndPrivilage/CredentialForm'))
const InductionRecord = lazy(() => import('./Fulldetails/InductionRecord/InductionRecord'))
const DepartmentOrientation = lazy(() => import('./Fulldetails/DepartmentalOrientation/DepartmentOrientation'))
const RightsandResponsibilities = lazy(() => import('./Fulldetails/Rights/Rights_and_Responsibilities'))
const Vaccination = lazy(() => import('./Fulldetails/Vaccination/Vaccination'))
const TrainingRecord = lazy(() => import('./Fulldetails/TrainingRecord/TrainingRecord'))
const Record = lazy(() => import('./Fulldetails/Record/Record'))
const DuesClearance = lazy(() => import('./Fulldetails/DuesClearance/DuesClearance'))
const ExitQuestion = lazy(() => import('./Fulldetails/ExitQuestion/ExitQuestion'))
const SelfAttestedAcca = lazy(() => import('./Fulldetails/SelfAttestedAccademic/SelfAttestedAcca'))
const SelfAttestedReg = lazy(() => import('./Fulldetails/SelfAttestRegis/SelfAttestedReg'))
const SelfAttestedExp = lazy(() => import('./Fulldetails/SelfAttestedExp/SelfAttestedExp'))
const SelfAttestedidproof = lazy(() => import('./Fulldetails/SelfAttestidproof/SelfAttestedidproof'))
const CompetencyAssessment = lazy(() => import('./Fulldetails/CompetencyAssessment/CompetencyAssessment'))
const StatutoryRecords = lazy(() => import('./Fulldetails/Statutory Records/StatutoryRecords'))
const ReviewProbationPeriod = lazy(() => import('./Fulldetails/Review of Probation Period/ReviewProbationPeriod'))
const ConfirmationLetter = lazy(() => import('./Fulldetails/Confirmation Letter/ConfirmationLetter'))
const BlsTraining = lazy(() => import('./Fulldetails/BlsTraining/BlsTraining'))
const AppraisalForms = lazy(() => import('./Fulldetails/AppraisalForms/AppraisalForms'))
const DisciplinaryRecord = lazy(() => import('./Fulldetails/Disciplinary Record/DisciplinaryRecord'))
const GrievanceRecord = lazy(() => import('./Fulldetails/Grievance Record/GrievanceRecord'))
const JobDescription = lazy(() => import('./Fulldetails/JobDescription/JobDescription'))





const Employeefulldetails = ({ setflag, empdata, setShowGeneral, }) => {
    const [Vaccdata, setVaccination] = useState([])
    const [activeStep, setActiveStep] = useState(1);
    const [pdfdata, Setpdfdata] = useState("")
    const [Empdata, setEmpdata] = useState([])
    const [Files, setFiles] = useState([])
    const handleNext = useCallback(() => {
        setFiles([])
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, [])


    const handleback = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setFiles([])
    }, [])
    // for getting the file if the file is upload then show the file else show the form
    useEffect(() => {
        const postdatapic = {
            em_id: empdata?.em_id,
            checklistid: activeStep,
        };
        const postdata = {
            em_no: empdata?.em_no,
        };
        const fetchData = async () => {
            if (activeStep === 1 || activeStep === 4 || activeStep === 5 || activeStep === 6 || activeStep === 7 || activeStep === 8 || activeStep === 11 || activeStep === 12 ||
                activeStep === 9 || activeStep === 10 || activeStep === 14 || activeStep === 17 || activeStep === 18 || activeStep === 19 || activeStep === 20
                || activeStep === 21 || activeStep === 23 || activeStep === 24 || activeStep === 25 || activeStep === 26
                || activeStep === 27 || activeStep === 28 || activeStep === 29 || activeStep === 30 || activeStep === 31 || activeStep === 32 || activeStep === 33) {
                setFiles([])
                getPicAndPdf(postdatapic, empdata, activeStep,).then((emplyDataArray) => {
                    const { status, data } = emplyDataArray;
                    if (status === 1) {
                        setFiles(data)
                    }
                    else {
                        setFiles([])

                    }
                    getempdetails(postdata).then((emplyArray) => {
                        const { status, data } = emplyArray;
                        if (status === 1) {
                            setEmpdata(data[0])
                        }
                        else {
                            warningNofity("no data found")
                            setEmpdata([])
                        }
                    })
                })

            } else if (activeStep === 2 || activeStep === 13) {
                setFiles([])
                getPicAndPdf(postdatapic, empdata, activeStep,).then((emplyDataArray) => {
                    const { status, data } = emplyDataArray;
                    if (status === 1) {
                        setFiles(data)
                    }
                    else {
                        biodetails(postdata).then((emplyArray) => {
                            const { status, data } = emplyArray;
                            if (status === 1) {
                                setEmpdata(data[0])

                            }
                            else {
                                warningNofity("no data found")
                                setEmpdata([])
                            }
                        })
                    }
                })
            } else if (activeStep === 3) {
                setFiles([])
                getPicAndPdf(postdatapic, empdata, activeStep,).then((emplyDataArray) => {
                    const { status, data } = emplyDataArray;
                    if (status === 1) {
                        setFiles(data)
                    }
                    else {
                        interviewmark(postdata).then((emplyArray) => {
                            const { status, data } = emplyArray;
                            if (status === 1) {
                                setEmpdata(data[0])
                            }
                            else {
                                warningNofity("no data found")
                                setEmpdata([])
                            }
                        })
                    }
                })

            }

            else if (activeStep === 15) {
                setFiles([])
                const result = await axioslogin.post('/PersonalChecklist/pdfformat', postdata)
                const { success: successdata, data: pdfdata } = result.data

                if (successdata === 1) {
                    Setpdfdata(pdfdata[0])
                    const { appmt_pdf_format } = pdfdata[0]
                    if (appmt_pdf_format === null) {
                        const response = await axioslogin.post('/upload/files', postdatapic)
                        const { success, } = response.data
                        if (success === 1) {
                            const data = response.data;
                            const fileNames = data.data
                            // Construct URLs for each file using the file names
                            const fileUrls = fileNames.map((fileName) => {
                                return `http://192.168.22.5/NAS/PersonalRecords/${empdata?.em_id}/checklist/${activeStep}/${fileName}`;
                            });
                            setFiles(fileUrls)

                        } else {
                            warningNofity("no data uploded")
                        }
                    } else {
                        const result = await axioslogin.post('/PersonalChecklist/empdetails', postdata)
                        const { success, data } = result.data
                        if (success === 1) {
                            setEmpdata(data[0])
                        }
                        else {
                            setEmpdata([])
                        }
                    }

                }
                else {
                    Setpdfdata([])
                }
            }
            else if (activeStep === 16) {
                setFiles([])
                const result = await axioslogin.post('/PersonalChecklist/pdfformatjoin', postdata)
                const { success, data: pdfdata } = result.data
                if (success === 1) {
                    Setpdfdata(pdfdata[0])
                    const { join_ltr_pdf_format } = pdfdata[0]
                    if (join_ltr_pdf_format === null) {
                        const response = await axioslogin.post('/upload/files', postdatapic)
                        const { success, } = response.data
                        if (success === 1) {
                            const data = response.data;
                            const fileNames = data.data
                            // Construct URLs for each file using the file names
                            const fileUrls = fileNames.map((fileName) => {
                                return `http://192.168.22.5/NAS/PersonalRecords/${empdata?.em_id}/checklist/${activeStep}/${fileName}`;
                            });
                            setFiles(fileUrls)

                        } else {
                            warningNofity("no data uploded")
                        }
                    } else {
                        const result = await axioslogin.post('/PersonalChecklist/empdetails', postdata)
                        const { success, data } = result.data
                        if (success === 1) {
                            setEmpdata(data[0])
                        }
                        else {
                            setEmpdata([])
                        }
                    }
                }
                else {
                    Setpdfdata([])
                }
            }
            else if (activeStep === 22) {
                setFiles([])
                const response = await axioslogin.post('/upload/files', postdatapic)
                const { success, } = response.data
                if (success === 1) {
                    const data = response.data;
                    const fileNames = data.data
                    // Construct URLs for each file using the file names
                    const fileUrls = fileNames.map((fileName) => {
                        return `http://192.168.22.5/NAS/PersonalRecords/${empdata?.em_id}/checklist/${activeStep}/${fileName}`;
                    });
                    setFiles(fileUrls)

                } else {
                    setFiles([])
                }
                const result = await axioslogin.post(`/PersonalChecklist/getAll`, postdata)
                const { success: successvac, data } = result.data
                if (successvac === 1 && data?.length > 0) {
                    setVaccination(data[0])
                }
                else {
                    setVaccination([])
                }
            }
            else {
                warningNofity("No Data Found")
            }
        }

        fetchData()

    }, [activeStep, empdata])

    return (
        <Box sx={{ backgroundColor: '#DDDDDD', p: 1, }} >
            <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: window.innerHeight - 100, borderRadius: 2 }}>
                <Box>
                    {activeStep === 1 ?
                        <ViewApplication Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                        activeStep === 2 ?
                            <BioData Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                            activeStep === 3 ?
                                <AssesmentSheet Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                activeStep === 4 ?
                                    <OfferLetter Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                    activeStep === 5 ?
                                        <HealthCheckupForm Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                        activeStep === 6 ?
                                            <PersonalDataForm Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                            activeStep === 7 ?
                                                <SelfAttestedAcca Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                activeStep === 8 ?
                                                    <SelfAttestedReg Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                    activeStep === 9 ?
                                                        <SelfAttestedExp Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                        activeStep === 10 ?
                                                            <SelfAttestedidproof Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                            activeStep === 11 ?
                                                                <AntecedentForm Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                activeStep === 12 ?
                                                                    <CredentialForm Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                    activeStep === 13 ?
                                                                        <CredentialFormAndPrivilage Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                        activeStep === 14 ?
                                                                            <JobDescription Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                            activeStep === 15 && pdfdata?.appmt_pdf_format === "Pdf Format 1" ?
                                                                                <PdfFormat1 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                activeStep === 15 && pdfdata?.appmt_pdf_format === null ?
                                                                                    <PdfFormat1 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                    activeStep === 15 && pdfdata?.appmt_pdf_format === "Pdf Format 2" ?
                                                                                        <PdfFormat2 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                        activeStep === 15 && pdfdata?.appmt_pdf_format === "Pdf Format 3" ?
                                                                                            <PdfFormat3 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                            activeStep === 15 && pdfdata?.appmt_pdf_format === "Pdf Format 4" ?
                                                                                                <PdfFormat4 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                activeStep === 16 && pdfdata?.join_ltr_pdf_format === "Pdf Format 1" ?
                                                                                                    <Joinpdfformat1 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                    activeStep === 16 && pdfdata?.join_ltr_pdf_format === null ?
                                                                                                        <Joinpdfformat1 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                        activeStep === 16 && pdfdata?.join_ltr_pdf_format === "Pdf Format 2" ?
                                                                                                            <Joinpdfformat2 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                            activeStep === 16 && pdfdata?.join_ltr_pdf_format === "Pdf Format 3" ?
                                                                                                                <Joinpdfformat3 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                activeStep === 16 && pdfdata?.join_ltr_pdf_format === "Pdf Format 4" ?
                                                                                                                    <Joinpdfformat4 Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                    activeStep === 17 ?
                                                                                                                        <CompetencyAssessment Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                        activeStep === 18 ?
                                                                                                                            <StatutoryRecords Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                            activeStep === 19 ?
                                                                                                                                <InductionRecord Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                activeStep === 20 ?
                                                                                                                                    <DepartmentOrientation Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                    activeStep === 21 ?
                                                                                                                                        <RightsandResponsibilities Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                        activeStep === 22 ?
                                                                                                                                            <Vaccination Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} Vaccdata={Vaccdata} /> :
                                                                                                                                            activeStep === 23 ?
                                                                                                                                                <ReviewProbationPeriod Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                activeStep === 24 ?
                                                                                                                                                    <ConfirmationLetter Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                    activeStep === 25 ?
                                                                                                                                                        <TrainingRecord Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                        activeStep === 26 ?
                                                                                                                                                            <BlsTraining Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                            activeStep === 27 ?
                                                                                                                                                                <AppraisalForms Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                                activeStep === 28 ?
                                                                                                                                                                    <AnnualHealthCheckUp Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                                    activeStep === 29 ?
                                                                                                                                                                        <DisciplinaryRecord Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                                        activeStep === 30 ?
                                                                                                                                                                            <GrievanceRecord Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                                            activeStep === 31 ?
                                                                                                                                                                                <Record Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                                                activeStep === 32 ?
                                                                                                                                                                                    <DuesClearance Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                                                    activeStep === 33 ?
                                                                                                                                                                                        <ExitQuestion Empdata={Empdata} setShowGeneral={setShowGeneral} Files={Files} /> :
                                                                                                                                                                                        null
                    }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                    <Button sx={{ p: 0, width: "7%" }} disabled={activeStep === 1} size='sm' variant="outlined" color="primary" onClick={handleback}>
                        BACK
                    </Button>
                    <Typography level="title-md" color="primary">{activeStep}/33</Typography>
                    <Button sx={{ p: 0, width: "7%" }} disabled={activeStep === 33} size='sm' variant="outlined" color="primary" onClick={handleNext}>
                        NEXT
                    </Button>

                </Box>
            </Paper >
        </Box>
    )
}

export default memo(Employeefulldetails) 