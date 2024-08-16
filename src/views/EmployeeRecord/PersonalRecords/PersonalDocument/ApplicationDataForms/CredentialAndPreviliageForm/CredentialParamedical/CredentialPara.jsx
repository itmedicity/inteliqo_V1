import { Box, Button, Table, Tooltip, Typography } from '@mui/joy'
import moment from 'moment';
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const CredentialParaRegistration = lazy(() => import('./CredentialParaRegistration'))


const CredentialPara = ({ Empdata }) => {
    const Employee = useMemo(() => Empdata, [Empdata]);
    const [HrdNo, setHrdNo] = useState(0)
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [Training, setCredentialTraining] = useState([])
    const [Credentialcert, setCredentialcert] = useState([])
    const [privilageData, setprivilageData] = useState([])
    const [ApprovalData, setApprovalData] = useState([])


    const [ExpData, setExpData] = useState([{
        training: '',
        conducted: '',
        em_no: Employee?.em_no,
        em_id: Employee?.em_id
    }]);

    const [CertificateData, setCertificateData] = useState([{
        Certification: '',
        Year: '',
        em_no: Employee?.em_no,
        em_id: Employee?.em_id
    }]);

    const [Operating, setOperating] = useState([{
        Name: '',
        Decision: '',
        Deci: '',
        NameU: 0,
        NameI: 0,
        NameS: 0,
        em_no: Employee?.em_no,
        em_id: Employee?.em_id
    }]);

    const [Verificationdata, setVerificationdata] = useState({
        original: 0,
        Copies: 0,
        Registration: 0,
        screenshot: 0,
        RegistrationCopies: 0,
        OriginalChecked: 0,
        TrainingCopies: 0,

    })

    const [FormDatamain, setFormDatamain] = useState({
        specialization: '',
        datesaved: moment(new Date()).format('YYYY-MM-DD'),
    })

    const { specialization, datesaved } = FormDatamain
    const { original, Copies, Registration, screenshot, RegistrationCopies, OriginalChecked, TrainingCopies } = Verificationdata
    const { training } = ExpData[0]
    const { Certification } = CertificateData[0]
    const { Name } = Operating[0]

    const postdata = useMemo(() => {
        return {
            em_no: Employee?.em_no,
            em_id: Employee?.em_id,
            department: Employee?.em_department,
            ExpData: ExpData,
            CertificateData: CertificateData,
            HrdNo: HrdNo,
            specialization: specialization,
            datesaved: datesaved,
            original: original,
            Copies: Copies,
            Registration: Registration,
            screenshot: screenshot,
            RegistrationCopies: RegistrationCopies,
            OriginalChecked: OriginalChecked,
            TrainingCopies: TrainingCopies,
            training: training,
            Certification: Certification,
            Operating: Operating,

        }
    }, [ExpData, Employee, CertificateData, HrdNo, specialization, Certification,
        datesaved, training, original, Copies, Registration, screenshot, RegistrationCopies,
        OriginalChecked, TrainingCopies, Operating
    ])
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (HrdNo === 0) {
            warningNofity("Please enter all data")
        } else if (training === '') {
            warningNofity("Please enter the training details")
        } else if (Certification === '') {
            warningNofity("Please enter the certification details")
        } else if (Name === '') {
            warningNofity("Please enter the Operating Privilege details")
        } else if (specialization === '') {
            warningNofity("Please enter the specialization details")
        }

        else {
            const result = await axioslogin.post('/PersonalChecklist/CredentialPara', postdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
            }
            else {
                warningNofity(message)
            }
        }

    }, [postdata, HrdNo, training, Certification, Name, specialization])

    //for getting the value
    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,

        }
    }, [Employee])
    useEffect(() => {
        if (Employee?.length !== 0) {
            const getCommonSettings = async () => {
                const result = await axioslogin.post('/PersonalChecklist/credentialparaTraining ', personaldata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    setUpdateFlag(1)
                    setCredentialTraining(data)
                }
                const resultcerti = await axioslogin.post('/PersonalChecklist/credentialparaCertificate ', personaldata)
                const { successcert, datacert } = resultcerti.data
                if (successcert === 1 && datacert?.length > 0) {

                    setCredentialcert(datacert)
                }
                const resultdetails = await axioslogin.post('/PersonalChecklist/credentialparadetails ', personaldata)
                const { successdetails, datadetails } = resultdetails.data
                if (successdetails === 1 && datadetails?.length > 0) {
                    const { Copies, Orginal, Orginal_Certificates, Registration,
                        Registration_Copies, Screenshot, copies_Training, date_saved, specialization, staff_hrd
                    } = datadetails[0]
                    setApprovalData(datadetails[0])
                    setHrdNo(staff_hrd)
                    const frmdata = {

                        specialization: specialization,
                        datesaved: moment(new Date(date_saved)).format('YYYY-MM-DD'),
                    }
                    setFormDatamain(frmdata)
                    const verification = {
                        original: Orginal_Certificates,
                        Copies: Copies,
                        Registration: Registration,
                        screenshot: Screenshot,
                        RegistrationCopies: Registration_Copies,
                        OriginalChecked: Orginal,
                        TrainingCopies: copies_Training,
                    }
                    setVerificationdata(verification)
                }
                const resultdata = await axioslogin.post('/PersonalChecklist/credentialparaprivilageData ', personaldata)
                const { successdata, dataprivilege } = resultdata.data
                if (successdata === 1 && dataprivilege?.length > 0) {

                    setprivilageData(dataprivilege)
                }
            }
            getCommonSettings()
        }
    }, [personaldata, Employee])

    return (
        <Box sx={{ height: window.innerHeight - 220, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1, mt: 2 }}>

            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography sx={{ ml: 1 }}> Name  </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.em_name} </Typography>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography sx={{ ml: 1 }}>ID No</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.em_no === '' ? 'Not Updated' : Employee?.em_no} </Typography>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography sx={{ ml: 1 }}>Date Of Joining  </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.em_doj === '' ? 'Not Updated' : Employee?.em_doj} </Typography>
                        </td>
                    </tr>

                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography sx={{ ml: 1 }}>Designation </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.desg_name === '' ? 'Not Updated' : Employee?.desg_name} </Typography>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography sx={{ ml: 1 }}>Department </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.dept_name === '' ? 'Not Updated' : Employee?.dept_name} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <CredentialParaRegistration Employee={Employee} ExpData={ExpData} setExpData={setExpData} HrdNo={HrdNo} setHrdNo={setHrdNo} FormDatamain={FormDatamain} setFormDatamain={setFormDatamain}
                CertificateData={CertificateData} setCertificateData={setCertificateData} Verificationdata={Verificationdata} setVerificationdata={setVerificationdata} Operating={Operating} setOperating={setOperating}
                Training={Training} Credentialcert={Credentialcert} privilageData={privilageData} ApprovalData={ApprovalData} />

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Tooltip title="View">
                    {UpdateFlag === 0 ?
                        <Tooltip title="Save">
                            <Button
                                variant="outlined"
                                component="label"
                                size="sm"
                                color="primary"
                                onClick={handleOnClick}
                            >
                                Submit Application
                            </Button>
                        </Tooltip>
                        :
                        <Tooltip title="Update">
                            <Button
                                variant="outlined"
                                component="label"
                                size="sm"
                                color="primary"
                                disabled={true}
                            >
                                Update Application
                            </Button>
                        </Tooltip>
                    }
                </Tooltip>
            </Box>
        </Box>

    )
}

export default memo(CredentialPara)