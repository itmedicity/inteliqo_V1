import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, IconButton, Table, Typography } from '@mui/joy'
import { Paper, TableContainer } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';

const PersonalDataAccademic = lazy(() => import('./PersonalDataAccademic'))
const PersonalDataformExp = lazy(() => import('./PersonalDataformExp'))
const PersonalDataHighlights = lazy(() => import('./PersonalDataHighlights'))
// const PdfAndimage = lazy(() => import('../../Pdfandimage/PdfAndimage'))


const PersonalDataForm = ({ Empdata, setShowGeneral, Files }) => {
    const Employee = useMemo(() => Empdata, [Empdata]);
    const [langauge, setLangauge] = useState([])
    const [edudata, setedudata] = useState([])
    const [expdata, setexpdata] = useState([])
    const [educaton, seteducation] = useState([])
    const [experience, setexperience] = useState([])
    const [HighData, setHighData] = useState([])

    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,

        }
    }, [Employee])

    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [setShowGeneral])

    useEffect(() => {
        if (Employee.length !== 0) {
            const exp = JSON?.parse(Employee?.Experience_details)
            const edu = JSON?.parse(Employee?.Education_details)
            setexpdata(exp)
            setedudata(edu)
            const getCommonSettings = async () => {
                const result = await axioslogin.post('/PersonalChecklist/personaldata', personaldata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    setLangauge(data[0])
                }
                else {
                    setLangauge([])

                }
                const resultedu = await axioslogin.post('/PersonalChecklist/personaldataedu', personaldata)
                const { successedu, dataedu } = resultedu.data
                if (successedu === 1 && dataedu.length > 0) {
                    seteducation(dataedu)

                } else {
                    seteducation([])

                }
                const resultexp = await axioslogin.post('/PersonalChecklist/personaldataexp', personaldata)
                const { successexp, dataexp } = resultexp.data
                if (successexp === 1 && dataexp.length > 0) {
                    setexperience(dataexp)

                } else {
                    setexperience([])
                }
                const resulthigh = await axioslogin.post('/PersonalChecklist/personaldatahigh', personaldata)
                const { successhigh, datahigh } = resulthigh.data
                if (successhigh === 1 && datahigh.length > 0) {

                    setHighData(datahigh[0])
                }
            }
            getCommonSettings()
        }
    }, [Employee, personaldata])
    return (
        <Box >
            <Box >
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                Personal Data Form
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
            <Box sx={{ height: window.innerHeight - 190, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
                {/* {Files.length !== 0 ?
                    <Box>
                        <PdfAndimage Files={Files} />
                    </Box>

                    : */}
                <Box>
                    {/* <CustmTypog title={itemname} /> */}
                    <TableContainer sx={{}}>
                        <Table aria-label="basic table" borderAxis="both" size='sm'>
                            <tbody >
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> Name </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> Father&apos;s Name </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_fathers_name === '' ? "Not Updated" : Empdata?.em_fathers_name} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Permanent Address(with pincode)</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Present Address(with pincode) </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>
                                            {Empdata?.addressPermnt1 === '' ? "Not Updated" : Empdata?.addressPermnt1},
                                            {Empdata?.addressPermnt2 === '' ? "Not Updated" : Empdata?.addressPermnt2}
                                        </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>
                                            {Empdata?.addressPresent1 === '' ? "Not Updated" : Empdata?.addressPresent1},
                                            {Empdata?.addressPresent2 === '' ? "Not Updated" : Empdata?.addressPresent2}
                                        </Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table aria-label="basic table" borderAxis="both" size='sm'>
                            <tbody >
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> Land Phone </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_phone === '' ? "Not Updated" : Empdata?.em_phone} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Passport No </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_passport_no === '' ? "Not Updated" : Empdata?.em_passport_no} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Mob </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_mobile === '' ? "Not Updated" : Empdata?.em_mobile} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Driving License No</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_license_no === '' ? "Not Updated" : Empdata?.em_license_no} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Email </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_email === '' ? "Not Updated" : Empdata?.em_email} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Permanent Account Number</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_account_no === '' ? "Not Updated" : Empdata?.em_account_no} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Nationality </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Gender</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_gender === 1 ? "Male" : Empdata?.em_gender === 2 ? "Female" : "Other"} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Religion/Community </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.relg_name === '' ? "Not Updated" : Empdata?.relg_name} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Date of Birth</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>  {moment(Empdata?.em_dob).format('DD-MM-YYYY')}</Typography>
                                    </td>
                                </tr>

                            </tbody>
                        </Table>
                        {/* <Table>
                            <TableBody >
                                <TableRow sx={{ p: 0 }}>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '25%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Family Details </Typography>
                                    </TableCell>
                                    <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '80%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                    </TableCell>

                                </TableRow>
                            </TableBody>
                        </Table> */}
                        <Table aria-label="basic table" borderAxis="both" size='sm'>
                            <tbody >
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}> Langauge Known </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Write </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Speak </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Read </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Malayalam </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.malayalam_write === 1 ? "Yes" : "No"} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.malayalam_speak === 1 ? "Yes" : "No"} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.malayalam_read === 1 ? "Yes" : "No"} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>English </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.english_write === 1 ? "Yes" : "No"} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.english_speak === 1 ? "Yes" : "No"}</Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.english_read === 1 ? "Yes" : "No"} </Typography>
                                    </td>
                                </tr>
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Hindi </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.hindi_write === 1 ? "Yes" : "No"} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.hindi_speak === 1 ? "Yes" : "No"} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.hindi_read === 1 ? "Yes" : "No"} </Typography>
                                    </td>
                                </tr>


                            </tbody>
                        </Table>
                        <Table aria-label="basic table" borderAxis="both" size='sm'>
                            <tbody >
                                <tr sx={{ p: 0 }}>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>Others </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.other_langauge === '' ? "Not Updated" : langauge?.other_langauge} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.other_write === '' ? "Not Updated" : langauge?.other_write} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.other_speak === '' ? "Not Updated" : langauge?.other_speak} </Typography>
                                    </td>
                                    <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                        <Typography level="title-md" sx={{ ml: 1 }}>{langauge?.other_read === '' ? "Not Updated" : langauge?.other_read} </Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </TableContainer>
                    <PersonalDataAccademic edudata={edudata} educaton={educaton} HighData={HighData} />
                    <PersonalDataformExp expdata={expdata} experience={experience} />
                    <PersonalDataHighlights HighData={HighData} Empdata={Empdata} />
                </Box>
                {/* } */}
            </Box>
        </Box >
    )
}

export default memo(PersonalDataForm) 