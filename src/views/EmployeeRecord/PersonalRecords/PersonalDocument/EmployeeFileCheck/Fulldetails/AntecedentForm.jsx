import { Box, IconButton, Table, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Paper } from '@mui/material';
import moment from 'moment';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { axioslogin } from 'src/views/Axios/Axios';

const Antecedentexp = lazy(() => import('./Antecedentexp'))
const PdfAndimage = lazy(() => import('../Pdfandimage/PdfAndimage'))
// const PdfAndimage = lazy(() => import('../../Pdfandimage/PdfAndimage'))


const AntecedentForm = ({ Empdata, setShowGeneral, Files }) => {
    const [experience, setexperience] = useState([])
    const [antecedentdata, setantecedentdata] = useState([])
    const Employee = useMemo(() => Empdata, [Empdata]);
    const [details, setDetails] = useState({
        // edu: [],
        exp: [],
    })
    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,

        }
    }, [Employee])
    useEffect(() => {
        if (Employee?.length !== 0) {
            const exp = JSON.parse(Employee.Experience_details)
            const details = {
                exp: exp,
                // edu: edu,
            }
            setDetails(details)
            const getCommonSettings = async () => {
                const resultexp = await axioslogin.post('/PersonalChecklist/personaldataexp', personaldata)
                const { successexp, dataexp } = resultexp.data
                if (successexp === 1 && dataexp.length > 0) {
                    setexperience(dataexp)

                } else {
                    setexperience([])
                }

                const result = await axioslogin.post('/PersonalChecklist/credentialdata', personaldata)
                const { success, data } = result.data
                if (success === 1 && data.length > 0) {
                    setantecedentdata(data[0])
                } else {
                    setantecedentdata([])
                }
            }
            getCommonSettings()
        }
        else {
            setDetails({})
        }

    }, [Employee, personaldata])

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
                                Antecedent Verification Form
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
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>State</Typography></td>
                                    <td>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{antecedentdata?.stname1 === '' ? "Not Updated" : antecedentdata?.stname1} </Typography>
                                        {/* <JoyState value={state} setValue={setState} /> */}
                                    </td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Nationality</Typography></td>
                                    <td>
                                        {/* <  JoyNation value={Nation} setValue={setNation} /> */}
                                        <Typography level="title-md" sx={{ ml: 1 }}>{antecedentdata?.nat_name1 === '' ? "Not Updated" : antecedentdata?.nat_name1} </Typography>
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
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>State</Typography></td>
                                    <td>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{antecedentdata?.state_name === '' ? "Not Updated" : antecedentdata?.state_name} </Typography>
                                        {/* <JoyState value={stateCondact} setValue={setstateCondact} /> */}

                                    </td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Nationality</Typography></td>
                                    <td>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{antecedentdata?.nat_name2 === '' ? "Not Updated" : antecedentdata?.nat_name2} </Typography>
                                        {/* <  JoyNation value={NationCondact} setValue={setNationCondact} /> */}

                                    </td>
                                </tr>

                            </tbody>
                        </Table>
                        <Antecedentexp
                            details={details} experience={experience}
                        />


                        <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Was there any disciplinary actions initiated during previous employment(s)?:If yes,mention the same</Typography></td>
                                </tr>
                                <tr>
                                    <td style={{}}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> {antecedentdata?.disciplinary === '' ? "Not Updated" : antecedentdata?.disciplinary}</Typography>

                                    </td>

                                </tr>
                            </tbody>
                        </Table>
                        <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Self Declaration Regarding criminal/negligence background</Typography>
                        <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>I  {Employee?.em_name === '' ? "Not Updated" : Employee?.em_name}  S/O
                                        of {Employee?.em_fathers_name === '' ? "Not Updated" : Employee?.em_fathers_name} solemnly declare that i do not
                                        have any criminal proceedings pending against me and I have not been convicted by a court of law.I also solemnly declare that I do not
                                        have any legal action pending against me for negligence in relation to the discharge of my duties and have not been found gulity
                                        of professional negligence in the past.</Typography></td>
                                </tr>

                            </tbody>
                        </Table>

                        <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name Of The Applicant</Typography></td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature</Typography></td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date</Typography></td>

                                </tr>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> {Employee?.em_name === '' ? "Not Updated" : Employee?.em_name}</Typography></td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> {Employee?.em_name === '' ? "Not Updated" : Employee?.em_name}</Typography></td>
                                    <td style={{}}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{moment(antecedentdata?.Declarationdate).format('DD-MM-YYYY')}</Typography>
                                    </td>

                                </tr>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Witness</Typography></td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature</Typography></td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date</Typography></td>

                                </tr>
                                <tr>
                                    <td style={{}}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> {antecedentdata?.Witness_name === '' ? "Not Updated" : antecedentdata?.Witness_name}</Typography>


                                    </td>
                                    <td style={{}}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> {antecedentdata?.Witness_name === '' ? "Not Updated" : antecedentdata?.Witness_name}</Typography>

                                    </td>
                                    <td>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{moment(antecedentdata?.Witnessdate).format('DD-MM-YYYY')}</Typography>
                                    </td>
                                </tr>

                            </tbody>
                        </Table>
                        <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>For Office Use Only</Typography></td>
                                </tr>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Verification Status</Typography></td>
                                </tr>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Experience Details</Typography></td>
                                </tr>

                            </tbody>
                        </Table>

                        <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}>
                                        <Box sx={{ mt: .5 }}>
                                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Year Wise Original Experience Certificates Verified</Typography>
                                        </Box>
                                    </td>
                                    <td>
                                        <Box>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{antecedentdata?.Certificates === 1 ? "Yes" : "No"} </Typography>
                                        </Box>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <Box sx={{ mt: .5 }}>
                                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Copies received</Typography>

                                        </Box>
                                    </td>
                                    <td>
                                        <Box>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{antecedentdata?.Copies === 1 ? "Yes" : "No"} </Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Box sx={{ mt: .5 }}>
                                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Reference Verified</Typography>
                                        </Box>
                                    </td>
                                    <td>
                                        <Box>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{antecedentdata?.Reference === 1 ? "Yes" : "No"} </Typography>
                                        </Box>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Box sx={{ mt: .5 }}>
                                            <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Continuous service acquired</Typography>
                                        </Box>
                                    </td>
                                    <td>
                                        <Box>
                                            <Typography level="title-md" sx={{ ml: 1 }}>{antecedentdata?.Continuous === 1 ? "Yes" : "No"} </Typography>
                                        </Box>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Declaration by HR</Typography>
                        <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>The above details are checked and verified</Typography></td>
                                </tr>

                            </tbody>
                        </Table>
                        <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                            <tbody>
                                <tr>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name Of The Staff</Typography></td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature</Typography></td>
                                    <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date</Typography></td>
                                </tr>
                                <tr>
                                    <td style={{}}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> {antecedentdata?.em_name === '' ? "Not Updated" : antecedentdata?.em_name}</Typography>

                                    </td>
                                    <td style={{}}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> {antecedentdata?.em_name === '' ? "Not Updated" : antecedentdata?.em_name}</Typography>
                                    </td>
                                    <td style={{}}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{moment(antecedentdata?.datesaved).format('DD-MM-YYYY')}</Typography>

                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default memo(AntecedentForm)