import {
    CssVarsProvider,
    Typography,
    Button,
    List,
    ListItemDecorator,
    Sheet,
    ListItemContent,
    ListDivider
} from '@mui/joy'
import IconButton from '@mui/joy/IconButton';
import { Box, Paper } from '@mui/material'
import React, { memo } from 'react'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Switch, { switchClasses } from '@mui/joy/Switch';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRightRounded';
import Flight from '@mui/icons-material/Flight';
import Wifi from '@mui/icons-material/Wifi';
import Bluetooth from '@mui/icons-material/Bluetooth';
import Podcasts from '@mui/icons-material/Podcasts';
import ListItem, { listItemClasses } from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import Overview from './Overview';
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ScannedDoc = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    const [empfile, setEmpfile] = useState(0)
    const [ApplicationEmployment, setApplicationEmployment] = useState(0)
    const [biodata, setBiodata] = useState(0)
    const [interviewAssessment, setInterviewAssessment] = useState(0)
    const [offerletter, setOfferletter] = useState(0)
    const [preEmploymentHealth, setPreEmploymentHealth] = useState(0)

    const [personalData, setPersonaldata] = useState(0)
    const [accademicCertificate, setAccademicCertificate] = useState(0)
    const [regCertificate, setRegCertficate] = useState(0)
    const [expCertificate, setExpCertificate] = useState(0)
    const [photoidproof, setPhotoidproof] = useState(0)
    const [antecedentVerify, setAntecedentVerify] = useState(0)
    const [credentialverify, setCredentialVerify] = useState(0)
    const [credentailprivilg, setCredenailPrivilg] = useState(0)
    const [jobDescription, setJobDescription] = useState(0)
    const [appointmentletter, setappointmentletter] = useState(0)
    const [joiningletter, setjoiningletter] = useState(0)
    const [compLetter, setCompLetter] = useState(0)
    const [statutoryRecord, setstatutoryRecord] = useState(0)
    const [inductionRecord, setInductionRecord] = useState(0)
    const [deptOreintn, setdeptOrientation] = useState(0)
    const [empRights, setemprights] = useState(0)
    const [vaccination, setVaccination] = useState(0)
    const [reviewProbation, setReviewprobation] = useState(0)
    const [confimLetter, setConfirmLetter] = useState(0)

    const [trainingRecord, setTrainingRecord] = useState(0)
    const [training, setTraining] = useState(0)
    const [performanceAppraisal, setperformaceAppraisal] = useState(0)
    const [annualhealth, setAnnualHeath] = useState(0)

    const [disciplinerecord, setDisciplinerecord] = useState(0)
    const [grievancerecord, setGrievancerecord] = useState(0)
    const [otherrecord, setOtherrecord] = useState(0)

    const [dueclearence, setDueClrearence] = useState(0)
    const [exitquestin, setExitquestion] = useState(0)

    const Array = [
        { dueslno: 1, duename: 'Yes' },
        { dueslno: 2, duename: 'No' },
        { dueslno: 3, duename: 'NA' }
    ]


    return (
        <Box sx={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: 'space-between' }} >
            <Paper elevation={3} sx={{ display: "flex", flexDirection: 'column', width: '30%', p: 0.5, backgroundColor: '#EEEFF0' }} >
                <Box>
                    <CssVarsProvider>
                        {/* <Typography
                        level="h3"
                        fontSize="xl2"
                        fontWeight="xl"
                        id="ios-example-demo"
                        mb={1}
                    >
                        Scanned Docments
                    </Typography> */}
                        <List >
                            <ListItem nested>
                                <ListItem
                                    sx={{
                                        bgcolor: 'background.surface',
                                        mb: 1,
                                        borderRadius: 4,
                                    }}
                                >
                                    <ListItemButton
                                        aria-describedby="employee-documents"
                                        sx={{ borderRadius: 5, justifyContent: 'center' }}
                                    >
                                        EMPLOYEE FILE CHECKLIST
                                    </ListItemButton>
                                </ListItem>
                                {/* <Typography level="body3" aria-hidden>
                                    Included with your recent Apple device purchase. Must be accepted within
                                    90 days of activation.
                                </Typography> */}
                            </ListItem>
                        </List>
                    </CssVarsProvider>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        pl: '24px',
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: "none" }
                    }}
                >
                    <CssVarsProvider>
                        <List
                            size="sm"
                            sx={(theme) => ({
                                // Gatsby colors
                                '--joy-palette-primary-plainColor': '#8a4baf',
                                '--joy-palette-neutral-plainHoverBg': 'transparent',
                                '--joy-palette-neutral-plainActiveBg': 'transparent',
                                '--joy-palette-primary-plainHoverBg': 'transparent',
                                '--joy-palette-primary-plainActiveBg': 'transparent',
                                [theme.getColorSchemeSelector('dark')]: {
                                    '--joy-palette-text-secondary': '#635e69',
                                    '--joy-palette-primary-plainColor': '#d48cff',
                                },

                                '--List-insetStart': '32px',
                                '--List-item-paddingY': '0px',
                                '--List-item-paddingRight': '16px',
                                '--List-item-paddingLeft': '21px',
                                '--List-item-startActionWidth': '0px',
                                '--List-item-startActionTranslateX': '-50%',

                                [`& .${listItemButtonClasses.root}`]: {
                                    borderLeft: '1px solid',
                                    borderColor: 'divider',
                                },
                                [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                                    borderColor: 'currentColor',
                                },
                                [`& .${listItemClasses.nested} > .${listItemButtonClasses.root}`]: {
                                    border: 'none',
                                },
                                '& [class*="startAction"]': {
                                    color: 'var(--joy-palette-text-tertiary)',
                                },
                            })}
                        >
                            <ListItem nested>
                                <ListItem component="div" startAction={<ReceiptLong />}>
                                    <Typography level="body3" sx={{ textTransform: 'uppercase' }}>
                                        Documentation
                                    </Typography>
                                </ListItem>
                                <List sx={{ '--List-gap': '0px' }}>
                                    <ListItem>
                                        <ListItemButton selected>Checklist For Documents</ListItemButton>
                                    </ListItem>
                                </List>
                            </ListItem>

                            {/*  Pre-joining Documents start */}

                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen(!open)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open ? 'bold' : undefined,
                                            color: open ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Pre-Joining
                                    </Typography>
                                    {/* <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        6
                                    </Typography> */}
                                </ListItem>
                                {open && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>
                                        <ListItem>
                                            <ListItemButton>1. Employee File Check List</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>1. Employee File Check List</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>1. Employee File Check List</ListItemButton>
                                        </ListItem>

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '45%' }}>
                                                <ListItem>
                                                    <ListItemButton>1. Employee File Check List</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "45%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setEmpfile}
                                                                checkedValue={empfile}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                            <Box sx={{ width: '10%' }}>
                                                <IconButton
                                                    variant="plain"
                                                    size="sm"
                                                    color="neutral"
                                                //onClick={() => setOpen(!open)}
                                                >
                                                    <FilePresentIcon
                                                        sx={{ fontSize: 25 }}
                                                    />
                                                </IconButton>
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>2. Application For Employment</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setApplicationEmployment}
                                                                checkedValue={ApplicationEmployment}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton> 3. Bio Data </ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setBiodata}
                                                                checkedValue={biodata}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>4. Interview Assessment Sheet</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setInterviewAssessment}
                                                                checkedValue={interviewAssessment}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>5. Offer Letter</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setOfferletter}
                                                                checkedValue={offerletter}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>6. Pre Employment Health Check Up Form</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setPreEmploymentHealth}
                                                                checkedValue={preEmploymentHealth}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                    </List>
                                )}
                            </ListItem>

                            {/*  Pre-joining Documents Ends */}

                            {/*  Joining Formalities Documents Start */}
                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen2((bool) => !bool)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open2 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open2 ? 'bold' : undefined,
                                            color: open2 ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Joining Formalities
                                    </Typography>
                                    {/* <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        19
                                    </Typography> */}
                                </ListItem>
                                {open2 && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>

                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>7. Personnel Data Form</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setPersonaldata}
                                                                checkedValue={personalData}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>8. Self attested copies of Academic Certificates</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setAccademicCertificate}
                                                                checkedValue={accademicCertificate}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>9. Self attested copies of Registration Certificates</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setRegCertficate}
                                                                checkedValue={regCertificate}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>10. Self attested copies of Experience Certificates</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setExpCertificate}
                                                                checkedValue={expCertificate}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>11. Self attested copy of Photo ID proof</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setPhotoidproof}
                                                                checkedValue={photoidproof}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>12. Antecedent verification Form</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setAntecedentVerify}
                                                                checkedValue={antecedentVerify}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>13. Credential Verification Form</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setCredentialVerify}
                                                                checkedValue={credentialverify}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* 
                                        <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>14. Credentialing and Previleging Form</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setCredenailPrivilg}
                                                                checkedValue={credentailprivilg}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>15. Job Description and Job Specification </ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setJobDescription}
                                                                checkedValue={jobDescription}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>16. Appointment Letter</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setappointmentletter}
                                                                checkedValue={appointmentletter}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>17. Joining Letter</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setjoiningletter}
                                                                checkedValue={joiningletter}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>18. Competency assessment</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setCompLetter}
                                                                checkedValue={compLetter}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>19. statutory Record</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setstatutoryRecord}
                                                                checkedValue={statutoryRecord}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>20. Induction Record</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setInductionRecord}
                                                                checkedValue={inductionRecord}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>21. Department Orientation</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setdeptOrientation}
                                                                checkedValue={deptOreintn}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>22. Employee Rights and Responsibilities</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setemprights}
                                                                checkedValue={empRights}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>23. Vaccination Card</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setVaccination}
                                                                checkedValue={vaccination}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>24. Review of Probation Period</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setReviewprobation}
                                                                checkedValue={reviewProbation}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>25. Confirmation Letter</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setConfirmLetter}
                                                                checkedValue={confimLetter}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                    </List>
                                )}
                            </ListItem>
                            {/*  Joining Formalities Documents End */}

                            {/*  Annual Mandatory Documents Start */}
                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen3((bool) => !bool)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open3 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open3 ? 'bold' : undefined,
                                            color: open3 ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Annual Mandatory Events
                                    </Typography>
                                    {/* <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        4
                                    </Typography> */}
                                </ListItem>
                                {open3 && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>
                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>26. Training Record</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setTrainingRecord}
                                                                checkedValue={trainingRecord}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>27. BLS/ACLS/PALS/NALS Training</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setTraining}
                                                                checkedValue={training}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>28. Performance Appraisal Forms</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setperformaceAppraisal}
                                                                checkedValue={performanceAppraisal}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>29. Annual Health Check-Up form</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setAnnualHeath}
                                                                checkedValue={annualhealth}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                    </List>
                                )}
                            </ListItem>
                            {/*  Annual Mandatory Documents End */}

                            {/*  Special Documents Start */}
                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen4((bool) => !bool)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open4 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open4 ? 'bold' : undefined,
                                            color: open4 ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Special Documents
                                    </Typography>
                                    {/* <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        3
                                    </Typography> */}
                                </ListItem>
                                {open4 && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>
                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>30. Any disciplinary record</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setDisciplinerecord}
                                                                checkedValue={disciplinerecord}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>31.Any grievance record</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setGrievancerecord}
                                                                checkedValue={grievancerecord}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>32.Any other records</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setOtherrecord}
                                                                checkedValue={otherrecord}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                    </List>
                                )}
                            </ListItem>
                            {/*  Speical Documents End */}


                            {/*  Exit Documents Start */}
                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen5((bool) => !bool)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open5 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open5 ? 'bold' : undefined,
                                            color: open5 ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Exit Documents
                                    </Typography>
                                    {/* <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        2
                                    </Typography> */}
                                </ListItem>
                                {open5 && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>
                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                        </ListItem>

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>33.Dues Clearence Certificate</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setDueClrearence}
                                                                checkedValue={dueclearence}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>

                                        </Box> */}

                                        {/* <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                            <Box sx={{ width: '50%' }}>
                                                <ListItem>
                                                    <ListItemButton>34. Exit Questionnaire</ListItemButton>
                                                </ListItem>
                                            </Box>
                                            <Box sx={{ display: "flex", width: "50%", flexDirection: 'row', justifyContent: 'center', pl: 1, pt: 1 }}>
                                                {
                                                    Array && Array.map((val, index) => {
                                                        return <Box sx={{ display: 'flex', width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" } }}
                                                            key={index}
                                                        >
                                                            <MappingCheckbox
                                                                label={val.duename}
                                                                name={val.duename}
                                                                value={val.dueslno}
                                                                onChange={setExitquestion}
                                                                checkedValue={exitquestin}
                                                            />
                                                        </Box>
                                                    })
                                                }
                                            </Box>
                                        </Box> */}
                                    </List>
                                )}
                            </ListItem>
                            {/*  Exit Documents End */}

                        </List>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Box sx={{ display: "flex", flex: 1, width: '70%', px: 1 }} >
                <Paper elevation={3} sx={{ flex: 1, p: 1, }} >
                    <Box>
                        <Overview />
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}


export default memo(ScannedDoc)