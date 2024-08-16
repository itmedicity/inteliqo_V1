import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo, useEffect, useMemo, useState } from 'react'
import { TableContainer } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';

const CredentialTraining = lazy(() => import('./CredentialTraining'))
const CredentialEdu = lazy(() => import('./CredentialEdu'))


const CredentialFormRegistration = ({ Employee, FormDatamain, setFormDatamain }) => {
    const [FormData, setFormData] = useState({
        edu: [],
    })
    const [registration, setregistration] = useState([])
    const [educaton, seteducation] = useState([])
    const [Training, setCredentialTraining] = useState([])
    const [Credentialcert, setCredentialcert] = useState([])
    const [Credentialdata, setCredentialdata] = useState([])
    const [privilageData, setprivilageData] = useState([])

    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,

        }
    }, [Employee])


    useEffect(() => {
        if (Employee?.length !== 0) {
            const edu = JSON?.parse(Employee?.Education_details)
            const formData = {
                edu: edu,
            }
            setFormData(formData)
            const getCommonSettings = async () => {
                const resultedu = await axioslogin.post('/PersonalChecklist/personaldataedu', personaldata)
                const { successedu, dataedu } = resultedu.data
                if (successedu === 1 && dataedu?.length > 0) {

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

                const result = await axioslogin.post('/PersonalChecklist/credentialdocTraining ', personaldata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {

                    setCredentialTraining(data)
                }
                const resultcerti = await axioslogin.post('/PersonalChecklist/credentialdocCertificate ', personaldata)
                const { successcert, datacert } = resultcerti.data
                if (successcert === 1 && datacert?.length > 0) {

                    setCredentialcert(datacert)
                }
                const resultdetails = await axioslogin.post('/PersonalChecklist/credentialdocdetails ', personaldata)
                const { successdetails, datadetails } = resultdetails.data
                if (successdetails === 1 && datadetails?.length > 0) {
                    setCredentialdata(datadetails[0])
                }
                const resultdata = await axioslogin.post('/PersonalChecklist/credentialprivilageData ', personaldata)
                const { successdata, dataprivilege } = resultdata.data
                if (successdata === 1 && dataprivilege?.length > 0) {

                    setprivilageData(dataprivilege)
                }
            }
            getCommonSettings()
        }
    }, [personaldata, Employee])

    return (
        <Box sx={{ mt: 1 }}>
            {/* <CustmTypog title={'Registration Details'} /> */}
            <Typography level="title-md" sx={{ ml: 1 }}>Registration Details </Typography>
            <TableContainer sx={{ mt: 1 }}>
                <Table variant="outlined" borderAxis="both" sx={{ mt: 1, p: 0, width: '100%' }} size='sm' >
                    <thead>
                        <tr sx={{ p: 0 }}>

                            <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Name Of the registration  </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> Registration Issuing Authority </Typography>
                            </th>

                            <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Registration Number </Typography>
                            </th>

                            <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Registration Date </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>Validity </Typography>
                            </th>

                        </tr>
                    </thead>
                    <tbody >
                        {registration?.map((val, index) => (
                            <tr key={val.registration_sl_no}>
                                <td>   {val?.NameOfReg === "" ? "not updated" : val?.NameOfReg}</td>
                                <td>{val?.RegAuthority === "" ? "not updated" : val?.RegAuthority}</td>
                                <td>{val?.RegNo === 0 ? "not updated" : val?.RegNo}</td>
                                <td> {val?.RegDate === 0 ? "not updated" : moment(val?.RegDate).format('DD-MM-YYYY')}</td>
                                <td> {val?.Validity === 0 ? "not updated" : moment(val?.Validity).format('DD-MM-YYYY')}</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

                <Typography level="title-md" sx={{ ml: 1 }}>Academic Detailsls </Typography>


                <CredentialEdu educaton={educaton} FormData={FormData} />
                <CredentialTraining Training={Training} Credentialcert={Credentialcert} Credentialdata={Credentialdata} privilageData={privilageData}
                    FormDatamain={FormDatamain} setFormDatamain={setFormDatamain} />
            </TableContainer>

        </Box>
    )
}

export default memo(CredentialFormRegistration) 