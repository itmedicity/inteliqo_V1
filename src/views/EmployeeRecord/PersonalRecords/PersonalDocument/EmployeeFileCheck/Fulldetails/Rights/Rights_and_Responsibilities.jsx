import React, { lazy, memo, useCallback, } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from '@mui/material';

const PdfAndimage = lazy(() => import('../../Pdfandimage/PdfAndimage'))


const Rights_and_Responsibilities = ({ Empdata, setShowGeneral, Files }) => {
    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])
    return (
        <Box>
            <Box sx={{ p: 1 }}>
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                Employee Rights and Responsibilities
                            </Typography>
                        </Box>
                        <Box >
                            <IconButton
                                variant="outlined"
                                size='xs'
                                color="danger"
                                onClick={toRedirectToHome}
                                sx={{ color: '#ef5350', }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>


                {Files.length !== 0 ?
                    <Box>
                        <PdfAndimage Files={Files} />
                    </Box>

                    :
                    <Box >

                        <Box sx={{}}>
                            <Typography level='h4'>EMPLOYEE RIGHTS:-</Typography>
                            <Box sx={{ ml: 1 }}>
                                <Typography level="title-md">1. Right to a congenial and growth oriented working environment.</Typography>
                                <Typography level="title-md">2. To avail the rights and benefits being extended by the organization.</Typography>
                                <Typography level="title-md">3. To be treated considerately and respectfully ,and not discriminated on the basis of caste,religion,sex,or socio-economic background.</Typography>
                                <Typography level="title-md">4. To be aware of the terms and condition his/her employment before joining the organization.</Typography>
                                <Typography level="title-md">5. Right to avail leave benefits,which should adequately cover personal needs,sickness and emergencies.</Typography>
                                <Typography level="title-md">6. Right to present grievances in their respective functional areas and seek redressal in appropriate forum.</Typography>
                                <Typography level="title-md">7. Right to safeguard their self-esteem and pursue personal and career advancement without affecting their work and job responsibilities.</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography level='h4'>EMPLOYEE RESPONSIBILITIES:-</Typography>
                            <Box sx={{ ml: 1 }}>
                                <Typography level="title-md">1. To be aware of the hospital policies.</Typography>
                                <Typography level="title-md">2. To ensure complete and dedicated attention to their assigned duties.</Typography>
                                <Typography level="title-md">3. To pursue organization&apos;s objectives as envisaged in the Institution&apos;s vision and mission statement.</Typography>
                                <Typography level="title-md">4. To continuously strive in enhancing functional effectiveness by improving competency in work.</Typography>
                                <Typography level="title-md">5. to function as an effective member of the team by cooperating in the team function to achieve optimum productivity in the respective functional areas.</Typography>
                                <Typography level="title-md">6. TMCH function round the clock and employees are expected to work on shifts or normal duty hours to support the Hospital&apos;s 24 X 7 operations.Employees may be required to work overtime when the workload so necessitates.</Typography>
                                <Typography level="title-md">7. Leave should be planned well in advanced and prior sanction taken before proceeding on leave.If for whatever reason an employee is unable to report to work on schedule,he/she must inform his/her Manager,preferably in writing.</Typography>
                                <Typography level="title-md">8. Employees are expected to use emailand internet access that is provided ina manner that is ethical and lawful.</Typography>
                                <Typography level="title-md">9. The employee are responsible for ensuring that the equipment allocated to them or in use in their work is used and maintained in accordance with the standard operating guidelines.</Typography>
                                <Typography level="title-md">10.All employees are expected to maintain proper discipline, professinal ethics and complete integrity in the performance of work.</Typography>
                                <Typography level="title-md">11.All employees are expected to maintain complete confidentiality in respect of their documents and patient information they handle.</Typography>

                            </Box>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography level="title-md">Name:- {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}</Typography>
                            </Box>
                            <Box>
                                <Typography level="title-md">Date:-</Typography>
                            </Box>


                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Typography level="title-md">Signature:-</Typography>

                        </Box>
                    </Box>
                }
            </Box>
        </Box >
    )
}

export default memo(Rights_and_Responsibilities) 