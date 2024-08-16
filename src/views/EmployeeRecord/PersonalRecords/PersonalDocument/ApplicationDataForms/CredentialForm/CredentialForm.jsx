import { Box, Button, Tooltip, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import Table from '@mui/joy/Table';
import moment from 'moment';
import JoyState from 'src/views/MuiComponents/JoyComponent/JoyState';
import JoyNation from 'src/views/MuiComponents/JoyComponent/JoyNation';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const CredentialDeclaration = lazy(() => import('./CredentialDeclaration'))
const CredentialEdu = lazy(() => import('./CredentialEdu'))
const CredentialRegistration = lazy(() => import('./CredentialRegistration'))



const CredentialForm = ({ Empdata, setEmpdata }) => {

    const Employee = useMemo(() => Empdata, [Empdata]);
    const [state, setState] = useState(0)
    const [Nation, setNation] = useState(0)
    const [HrdNo, setHrdNo] = useState(0)
    // const [disciplinary, setdisciplinary] = useState("")
    // const [Witness, setWitness] = useState("")
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [Declarationdate, setDeclarationdate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    // const [DeclarationDate , setDeclarationdate ] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [datesaved, setdatesaved] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [stateCondact, setstateCondact] = useState(0)
    const [NationCondact, setNationCondact] = useState(0)
    const [educaton, seteducation] = useState([])
    const [registration, setregistration] = useState([])
    const [Training, setTraining] = useState([])

    const [FormData, setFormData] = useState({
        edu: [],
    })
    //for Getting Registration data
    const [ExpData, setExpData] = useState([{
        NameOfReg: '',
        RegIssuing: '',
        RegNo: "",
        RegDate: "",
        Validity: '',
        em_no: Employee?.em_no,
        em_id: Employee?.em_id
    }]);
    //for Getting training data
    const [trainData, settrainData] = useState([{
        NameOfpgrm: '',
        from: '',
        to: "",
        conducted: "",
        em_no: Employee?.em_no,
        em_id: Employee?.em_id
    }]);
    // checklist
    const [Verificationdata, setVerificationdata] = useState({
        original: false,
        Copies: false,
        Registration: false,
        screenshot: false,
        RegistrationCopies: false,
        OriginalChecked: false,
        TrainingCopies: false,

    })
    const { original, Copies, Registration, screenshot, RegistrationCopies, OriginalChecked, TrainingCopies } = Verificationdata
    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,

        }
    }, [Employee])
    useEffect(() => {
        if (Employee?.length !== 0) {
            const { nation, state, stateCondact, nationcondact } = Employee
            setNation(nation)
            setState(state)
            setstateCondact(stateCondact)
            setNationCondact(nationcondact)
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

                const result = await axioslogin.post('/PersonalChecklist/credentialveridataedu', personaldata)
                const { success, data } = result.data

                if (success === 1 && data?.length > 0) {
                    setUpdateFlag(1)
                    const { original_certificates, Copies, Registration, screenshot, RegistrationCopies, OriginalChecked, TrainingCopies, datesaved, Declarationdate, HrdNo } = data[0]
                    const frmdata = {
                        original: original_certificates === 1 ? true : false,
                        Copies: Copies === 1 ? true : false,
                        Registration: Registration === 1 ? true : false,
                        screenshot: screenshot === 1 ? true : false,
                        RegistrationCopies: RegistrationCopies === 1 ? true : false,
                        OriginalChecked: OriginalChecked === 1 ? true : false,
                        TrainingCopies: TrainingCopies === 1 ? true : false,
                    }

                    setVerificationdata(frmdata)
                    setdatesaved(datesaved)
                    setDeclarationdate(Declarationdate)
                    setHrdNo(HrdNo)
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
                }


            }
            getCommonSettings()
        }
    }, [personaldata, Employee])
    const postdata = useMemo(() => {
        return {
            em_no: Employee?.em_no,
            em_id: Employee?.em_id,
            ExpData: ExpData,
            trainData: trainData,
            original: original === true ? 1 : 0,
            Copies: Copies === true ? 1 : 0,
            Registration: Registration === true ? 1 : 0,
            screenshot: screenshot === true ? 1 : 0,
            RegistrationCopies: RegistrationCopies === true ? 1 : 0,
            OriginalChecked: OriginalChecked === true ? 1 : 0,
            TrainingCopies: TrainingCopies === true ? 1 : 0,
            datesaved: datesaved,
            Declarationdate: Declarationdate,
            HrdNo: HrdNo,
        }
    }, [ExpData, trainData, Employee, original, Copies, datesaved, Registration, Declarationdate, screenshot,
        RegistrationCopies, OriginalChecked, TrainingCopies, HrdNo])
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (HrdNo === 0) {
            warningNofity("Please enter all data")
        }
        else {
            const result = await axioslogin.post('/PersonalChecklist/CredentialverificationInsert', postdata)
            const { success } = result.data
            if (success === 1) {
                succesNofity("Data Inserted SuccessFully")
            }
            else {
                warningNofity("Data Not Inserted")
            }
        }

    }, [postdata, HrdNo])
    return (
        <Box sx={{ height: window.innerHeight - 170, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Name Of The Employee</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.em_name} </Typography>
                        </td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Permanent Address</Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' sx={{ mt: 1 }} variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> House Name</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.addressPermnt1 === '' ? "Not Updated" : Employee?.addressPermnt1} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Street Name </Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.addressPermnt2 === '' ? "Not Updated" : Employee?.addressPermnt2} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>City</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.addressPermnt2 === '' ? "Not Updated" : Employee?.addressPermnt2} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Pin Code</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.hrm_pin1 === '' ? "Not Updated" : Employee?.hrm_pin1} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>State</Typography></td>
                        <td>
                            {/* <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography> */}
                            <JoyState value={state} setValue={setState} disabled={true} />
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Nationality</Typography></td>
                        <td>
                            <  JoyNation value={Nation} setValue={setNation} disabled={true} />
                            {/* <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography> */}
                        </td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Contact Address</Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' sx={{ mt: 1 }} variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> House Name</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.addressPresent1 === '' ? "Not Updated" : Employee?.addressPresent1} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Street Name </Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.addressPresent2 === '' ? "Not Updated" : Employee?.addressPresent2} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>City</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.addressPresent2 === '' ? "Not Updated" : Employee?.addressPresent2} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Pin Code</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.hrm_pin2 === '' ? "Not Updated" : Employee?.hrm_pin2} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>State</Typography></td>
                        <td>
                            {/* <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography> */}
                            <JoyState value={stateCondact} setValue={setstateCondact} disabled={true} />

                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Nationality</Typography></td>
                        <td>
                            {/* <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography> */}
                            <  JoyNation value={NationCondact} setValue={setNationCondact} disabled={true} />

                        </td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Academic Details</Typography>
            {/* experience table */}
            <CredentialEdu educaton={educaton} FormData={FormData} />
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Registraction Details</Typography>
            {/* for Registration Detials */}
            <CredentialRegistration setExpData={setExpData} ExpData={ExpData} Employee={Employee} registration={registration} />
            {/* for CredentialDeclaration Detials */}
            <CredentialDeclaration trainData={trainData} settrainData={settrainData} Employee={Employee} HrdNo={HrdNo} setHrdNo={setHrdNo} Declarationdate={Declarationdate}
                setDeclarationdate={setDeclarationdate} Training={Training}
                Verificationdata={Verificationdata} setVerificationdata={setVerificationdata} datesaved={datesaved} setdatesaved={setdatesaved} />

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
        </Box >
    )
}

export default memo(CredentialForm)