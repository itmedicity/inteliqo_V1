import { Box, IconButton, Table, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Paper } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { axioslogin } from 'src/views/Axios/Axios';

const CredentialFormEdu = lazy(() => import('./CredentialFormEdu'))
const PdfAndimage = lazy(() => import('../Pdfandimage/PdfAndimage'))


const CredentialForm = ({ Empdata, setShowGeneral, Files }) => {
    const Employee = useMemo(() => Empdata, [Empdata]);
    const [educaton, seteducation] = useState([])
    const [registration, setregistration] = useState([])
    const [Training, setTraining] = useState([])
    const [Verificationdata, setVerificationdata] = useState([])

    const [details, setDetails] = useState({
        edu: [],
    })
    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,
        }
    }, [Employee])
    useEffect(() => {
        if (Employee?.length !== 0) {
            const edu = JSON.parse(Employee?.Education_details)
            const details = {
                edu: edu,
            }
            setDetails(details)
            const getCommonSettings = async () => {
                const resultedu = await axioslogin.post('/PersonalChecklist/personaldataedu', personaldata)
                const { successedu, dataedu } = resultedu.data
                if (successedu === 1 && dataedu.length > 0) {
                    seteducation(dataedu)

                } else {
                    seteducation([])

                }
                const resultreg = await axioslogin.post('/PersonalChecklist/credentialregistration', personaldata)
                const { successreg, datareg } = resultreg.data
                if (successreg === 1) {
                    setregistration(datareg)
                }
                else {
                    setregistration([])
                }
                const resultTraining = await axioslogin.post('/PersonalChecklist/credentialTraining', personaldata)
                const { successtrain, datatrain } = resultTraining.data
                if (successtrain === 1) {
                    setTraining(datatrain)
                }
                else {
                    setTraining([])
                }
                const result = await axioslogin.post('/PersonalChecklist/credentialveridataedu', personaldata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    setVerificationdata(data[0])
                }
            }
            getCommonSettings()
        }
        else {
            setDetails({})
        }

    }, [Empdata, Employee, personaldata])
    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])
    return (
        <Box >
            <Box sx={{ p: 1 }}>
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                Credential  Verification Form
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
                    <Box>
                        <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Name Of The Employee</Typography></td>
                                    <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.em_name} </Typography>
                                    </td>
                                </tr>

                            </tbody>
                        </Table>
                        <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Permanent Address</Typography>
                        <Table aria-label="basic table" borderAxis="both" size='sm' sx={{ mt: 1 }} variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> House Name</Typography></td>
                                    <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPermnt1} </Typography>
                                    </td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Street Name </Typography></td>
                                    <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPermnt2} </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>City</Typography></td>
                                    <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPermnt2} </Typography>
                                    </td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Pin Code</Typography></td>
                                    <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.hrm_pin1} </Typography>
                                    </td>
                                </tr>


                            </tbody>
                        </Table>

                        <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Contact Address</Typography>
                        <Table aria-label="basic table" borderAxis="both" size='sm' sx={{ mt: 1 }} variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> House Name</Typography></td>
                                    <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPresent1} </Typography>
                                    </td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Street Name </Typography></td>
                                    <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPresent2} </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>City</Typography></td>
                                    <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPresent2} </Typography>
                                    </td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Pin Code</Typography></td>
                                    <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.hrm_pin2} </Typography>
                                    </td>
                                </tr>


                            </tbody>
                        </Table>
                        <CredentialFormEdu
                            details={details} educaton={educaton} registration={registration} Training={Training} Employee={Employee} Verificationdata={Verificationdata}
                        />
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default memo(CredentialForm) 