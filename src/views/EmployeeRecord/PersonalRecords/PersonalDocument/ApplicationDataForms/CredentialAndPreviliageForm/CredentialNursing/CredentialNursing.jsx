import { Box, Button, Table, Tooltip, Typography } from '@mui/joy'
import moment from 'moment';
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const CredentialNursRegistration = lazy(() => import('./CredentialNursRegistration'))

const CredentialNursing = ({ Empdata }) => {
    const Employee = useMemo(() => Empdata, [Empdata]);
    const [HrdNo, setHrdNo] = useState(0)
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [Training, setCredentialTraining] = useState([])
    const [Credentialcert, setCredentialcert] = useState([])
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
    const [List, setList] = useState([
        { slno: 1, name: 'Admission Procedure ', u: 0, s: 0, i: 0, remark: "" },
        { slno: 2, name: 'Initial assesment in OPD ', u: 0, s: 0, i: 0, remark: "" },
        { slno: 3, name: 'Transfer in and out of the patient by wheel chair/trolly ', u: 0, s: 0, i: 0, remark: "" },
        { slno: 4, name: 'Standard precautions', u: 0, s: 0, i: 0, remark: "" },
        { slno: 5, name: 'Therapeutic communication', u: 0, s: 0, i: 0, remark: "" },
        { slno: 6, name: 'Cleaning and disinfection of unit and OP', u: 0, s: 0, i: 0, remark: "" },
        { slno: 7, name: 'Local preparation for surgery/procedure', u: 0, s: 0, i: 0, remark: "" },
        { slno: 8, name: 'Attending to personal hygiene of the patient', u: 0, s: 0, i: 0, remark: "" },
        { slno: 9, name: 'correct and timely discharge of file', u: 0, s: 0, i: 0, remark: "" },
        { slno: 10, name: 'Biomedical waste management ', u: 0, s: 0, i: 0, remark: "" },
        { slno: 11, name: 'Assisst in oral feeding', u: 0, s: 0, i: 0, remark: "" },
        { slno: 12, name: 'Bedmaking if necessary', u: 0, s: 0, i: 0, remark: "" },
        { slno: 13, name: 'equipment cleaning', u: 0, s: 0, i: 0, remark: "" },
        { slno: 14, name: 'Collection of consumables from store', u: 0, s: 0, i: 0, remark: "" },
        { slno: 15, name: 'Escort patient to various department', u: 0, s: 0, i: 0, remark: "" },
        { slno: 16, name: 'Report various incident in their working area', u: 0, s: 0, i: 0, remark: "" },
        { slno: 17, name: 'End of life care', u: 0, s: 0, i: 0, remark: "" },
        { slno: 18, name: 'Announcing various code', u: 0, s: 0, i: 0, remark: "" },
        { slno: 19, name: 'Transportation of sample in to lab', u: 0, s: 0, i: 0, remark: "" },
        { slno: 20, name: 'Maintain quality indicator register', u: 0, s: 0, i: 0, remark: "" },
        // Other items in the list...
    ]);
    const { specialization, datesaved } = FormDatamain
    const { original, Copies, Registration, screenshot, RegistrationCopies, OriginalChecked, TrainingCopies } = Verificationdata
    const { training } = ExpData[0]
    const { Certification } = CertificateData[0]
    // const { Name } = Operating[0]

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
            List: List,
        }
    }, [ExpData, Employee, CertificateData, HrdNo, specialization, Certification,
        List, datesaved, training, original, Copies, Registration, screenshot, RegistrationCopies,
        OriginalChecked, TrainingCopies
    ])


    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (HrdNo === 0) {
            warningNofity("Please enter all data")
        } else if (training === '') {
            warningNofity("Please enter the training details")
        } else if (Certification === '') {
            warningNofity("Please enter the certification details")
        } else if (specialization === '') {
            warningNofity("Please enter the specialization details")
        }

        else {
            const result = await axioslogin.post('/PersonalChecklist/CredentialNursing', postdata)
            const { success, message } = result.data

            if (success === 1) {
                succesNofity(message)
            }
            else {
                warningNofity(message)
            }
        }

    }, [postdata, HrdNo, training, Certification, specialization,])
    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,

        }
    }, [Employee])

    // for data save
    useEffect(() => {
        if (Employee?.length !== 0) {
            const getCommonSettings = async () => {
                const result = await axioslogin.post('/PersonalChecklist/credentialnursingTraining ', personaldata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    setUpdateFlag(1)
                    setCredentialTraining(data)
                }
                const resultcerti = await axioslogin.post('/PersonalChecklist/credentialnursingCertificate ', personaldata)
                const { successcert, datacert } = resultcerti.data
                if (successcert === 1 && datacert?.length > 0) {
                    setCredentialcert(datacert)
                }
                const resultdetails = await axioslogin.post('/PersonalChecklist/credentialnursingdetails ', personaldata)
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
                const resultdata = await axioslogin.post('/PersonalChecklist/credentialnursingData ', personaldata)
                const { successdata, dataprivilege } = resultdata.data
                if (successdata === 1 && dataprivilege?.length > 0) {

                    const updatedList = List.map(item => {
                        const foundItem = dataprivilege.find(privilege => privilege.name_procedure === item.name);
                        if (foundItem) {
                            return {
                                ...item,
                                u: foundItem.procedure_unsupervised,
                                s: foundItem.supervision,
                                i: foundItem.interested,
                                remark: foundItem.decision
                            };
                        }
                        return item;
                    });

                    setList(updatedList);
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
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                            <Typography sx={{ ml: 1 }}>Address </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                            <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                {Employee?.addressPermnt1 === '' ? 'Not Updated' : Employee?.addressPermnt1},
                                {Employee?.addressPermnt2 === '' ? 'Not Updated' : Employee?.addressPermnt2}
                            </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>


            <CredentialNursRegistration Employee={Employee} ExpData={ExpData} setExpData={setExpData} HrdNo={HrdNo} setHrdNo={setHrdNo} FormDatamain={FormDatamain} setFormDatamain={setFormDatamain}
                CertificateData={CertificateData} setCertificateData={setCertificateData} Verificationdata={Verificationdata} setVerificationdata={setVerificationdata}
                List={List} setList={setList} Training={Training} Credentialcert={Credentialcert} ApprovalData={ApprovalData} />

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
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
            </Box>
        </Box>

    )
}

export default memo(CredentialNursing)