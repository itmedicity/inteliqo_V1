import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo, useEffect, useMemo, useState } from 'react'
import { TableContainer } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';

const CredentialEdu = lazy(() => import('./CredentialEdu'))
const CredentialTraining = lazy(() => import('./CredentialTraining'))


const CredentialOtherReg = ({ Employee, ExpData, setExpData, CertificateData, setCertificateData, setVerificationdata, ApprovalData,
    FormDatamain, setFormDatamain, Verificationdata, setHrdNo, HrdNo, Operating, setOperating, Credentialcert, privilageData, Training }) => {
    const [FormData, setFormData] = useState({
        edu: [],
    })
    const [registration, setregistration] = useState([])
    const [educaton, seteducation] = useState([])
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
            }
            getCommonSettings()
        }
    }, [personaldata, Employee])
    return (
        <Box sx={{ mt: 1 }}>
            {/* <CustmTypog title={'Registration Details'} /> */}
            <Typography level="title-md" sx={{ ml: 1 }}>Registration Details </Typography>
            <TableContainer sx={{ mt: 1 }}>
                <Table sx={{ mt: 1, p: 0, width: '100%' }} size='sm' >
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
                <CredentialTraining ExpData={ExpData} setExpData={setExpData} Employee={Employee} CertificateData={CertificateData} FormDatamain={FormDatamain} setFormDatamain={setFormDatamain}
                    setCertificateData={setCertificateData} Verificationdata={Verificationdata} setVerificationdata={setVerificationdata} ApprovalData={ApprovalData}
                    HrdNo={HrdNo} setHrdNo={setHrdNo} Operating={Operating} setOperating={setOperating} Credentialcert={Credentialcert} privilageData={privilageData} Training={Training} />
            </TableContainer>

        </Box>
    )
}

export default memo(CredentialOtherReg)