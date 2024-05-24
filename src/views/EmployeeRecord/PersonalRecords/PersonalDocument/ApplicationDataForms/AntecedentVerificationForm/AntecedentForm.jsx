import { Box, Button, Tooltip, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import Table from '@mui/joy/Table';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import JoyState from 'src/views/MuiComponents/JoyComponent/JoyState';
import JoyNation from 'src/views/MuiComponents/JoyComponent/JoyNation';
import { axioslogin } from 'src/views/Axios/Axios';
import JoyHrd from 'src/views/MuiComponents/JoyComponent/JoyHrd';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import moment from 'moment';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const Antecedentexp = lazy(() => import('./Antecedentexp'))


const AntecedentForm = ({ setEmpdata, Empdata }) => {

    // const [selectValue, setSelectValue] = useState(0)
    const Employee = useMemo(() => Empdata, [Empdata]);
    const [state, setState] = useState(0)
    const [Nation, setNation] = useState(0)
    const [HrdNo, setHrdNo] = useState(0)
    const [disciplinary, setdisciplinary] = useState("")
    const [Witness, setWitness] = useState("")
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [Declarationdate, setDeclarationdate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [Witnessdate, setWitnessdate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [datesaved, setdatesaved] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [stateCondact, setstateCondact] = useState(0)
    const [NationCondact, setNationCondact] = useState(0)
    const [experience, setexperience] = useState([])
    const [FormData, setFormData] = useState({
        exp: [],
    })
    // const ExpChecklist = [
    //     { value: 1, name: "Year wise original certificates verified" },
    //     { value: 2, name: "Copies received" },
    //     { value: 3, name: "Reference Verified" },
    //     { value: 4, name: "Continuous service acquired" }

    // ]

    const [Recorddata, setRecorddata] = useState({
        Certificates: false,
        Copies: false,
        Reference: false,
        Continuous: false,

    })
    const { Certificates, Copies, Reference, Continuous } = Recorddata

    const updateCommonSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setRecorddata({ ...Recorddata, [e.target.name]: value })
    }
    const personaldata = useMemo(() => {
        return {
            em_no: Employee?.em_no,

        }
    }, [Employee])
    useEffect(() => {
        if (Employee.length !== 0) {

            const exp = JSON?.parse(Employee?.Experience_details)
            const formData = {
                exp: exp,
            }

            setFormData(formData)
            const getCommonSettings = async () => {
                const resultexp = await axioslogin.post('/PersonalChecklist/personaldataexp', personaldata)
                const { successexp, dataexp } = resultexp.data
                if (successexp === 1 && dataexp?.length > 0) {
                    setexperience(dataexp)
                } else {
                    setexperience([])
                }
                const result = await axioslogin.post('/PersonalChecklist/credentialdata', personaldata)
                const { success, data } = result.data

                if (success === 1 && data?.length > 0) {
                    setUpdateFlag(1)
                    const { Certificates, Continuous, Copies, Declarationdate, HrdNo, Reference, Witness_name, Witnessdate, datesaved, disciplinary, nation,
                        nationcondact, state, stateCondact
                    } = data[0]
                    const frmdata = {
                        Certificates: Certificates === 1 ? true : false,
                        Continuous: Continuous === 1 ? true : false,
                        Copies: Copies === 1 ? true : false,
                        Reference: Reference === 1 ? true : false,
                    }
                    setRecorddata(frmdata)
                    setDeclarationdate(Declarationdate)
                    setHrdNo(HrdNo)
                    setWitness(Witness_name)
                    setWitnessdate(Witnessdate)
                    setdatesaved(datesaved)
                    setdisciplinary(disciplinary)
                    setNation(nation)
                    setNationCondact(nationcondact)
                    setState(state)
                    setstateCondact(stateCondact)
                } else {
                    setUpdateFlag(0)
                }
            }
            getCommonSettings()
        }
    }, [Employee, personaldata])
    const postdata = useMemo(() => {
        return {
            state: state,
            Nation: Nation,
            HrdNo: HrdNo,
            disciplinary: disciplinary,
            Witness: Witness,
            Declarationdate: Declarationdate,
            Witnessdate: Witnessdate,
            datesaved: datesaved,
            stateCondact: stateCondact,
            NationCondact: NationCondact,
            Certificates: Certificates === true ? 1 : 0,
            Copies: Copies === true ? 1 : 0,
            Reference: Reference === true ? 1 : 0,
            Continuous: Continuous === true ? 1 : 0,
            em_no: Employee?.em_no,
            em_id: Employee?.em_id,
        }
    }, [state, Nation, HrdNo, disciplinary, Witness, Declarationdate, Witnessdate, datesaved, stateCondact, NationCondact, Certificates, Copies, Reference, Continuous,
        Employee
    ])
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (HrdNo === 0) {
            warningNofity("Please enter all the data")
        }
        else {
            const result = await axioslogin.post('/PersonalChecklist/CredentialdataInsert', postdata)
            const { success } = result.data
            if (success === 1) {
                succesNofity("Data Inserted SuccessFully")
            }
            else {
                warningNofity("Data Not Inserted")
            }
        }


        // setIsModalOpen(true)
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
                        <td><Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPermnt1} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Street Name </Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPermnt2} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>City</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPermnt2} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Pin Code</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.hrm_pin1} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>State</Typography></td>
                        <td>
                            {/* <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography> */}
                            <JoyState value={state} setValue={setState} />
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Nationality</Typography></td>
                        <td>
                            <  JoyNation value={Nation} setValue={setNation} />
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
                        <td><Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPresent1} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Street Name </Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPresent2} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>City</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.addressPresent2} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Pin Code</Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.hrm_pin2} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>State</Typography></td>
                        <td>
                            {/* <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography> */}
                            <JoyState value={stateCondact} setValue={setstateCondact} />

                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Nationality</Typography></td>
                        <td>
                            {/* <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography> */}
                            <  JoyNation value={NationCondact} setValue={setNationCondact} />

                        </td>
                    </tr>

                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Experience Details</Typography>
            <Antecedentexp experience={experience} FormData={FormData} />

            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Was there any disciplinary actions initiated during previous employment(s)?:If yes,mention the same</Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}>
                            <JoyInput
                                // placeholder={'other'}
                                type="text"
                                size="sm"
                                name="setdisciplinary"
                                value={disciplinary}
                                onchange={setdisciplinary}
                            />
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


                            <JoyInput
                                // placeholder={'other'}
                                type="date"
                                size="sm"
                                name="Declarationdate"
                                value={Declarationdate}
                                onchange={setDeclarationdate}
                            />
                        </td>

                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Witness</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Signature</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date</Typography></td>

                    </tr>
                    <tr>
                        <td style={{}}>
                            <JoyInput
                                // placeholder={'other'}
                                type=""
                                size="sm"
                                name="Witness"
                                value={Witness}
                                onchange={setWitness}
                            />
                        </td>
                        <td style={{}}>
                            <JoyInput
                                // placeholder={'other'}
                                type=""
                                size="sm"
                                name="Witness"
                                value={Witness}
                                disabled={true}
                                onchange={setWitness}
                            />
                        </td>
                        <td>
                            <JoyInput
                                // placeholder={'other'}
                                type="date"
                                size="sm"
                                name="Witnessdate"
                                value={Witnessdate}
                                onchange={setWitnessdate}
                            />
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
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Certificates"
                                        size="sm"
                                        checked={Certificates}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Year Wise Original Experience Certificates Verified</Typography>
                                </Box>
                            </Box>


                            {/* <CssVarsProvider>
                                {
                                    ExpChecklist?.map((val, idx) => {
                                        return <Box sx={{
                                            display: 'flex', p: 1,
                                            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                        }}
                                            key={idx}
                                        >
                                            <MappingCheckbox
                                                label={val.name}
                                                name={val.name}
                                                value={val.value}
                                                onChange={setSelectValue}
                                                checkedValue={selectValue}
                                            />
                                        </Box>
                                    })
                                }
                            </CssVarsProvider> */}
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Copies"
                                        size="sm"
                                        checked={Copies}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Copies received</Typography>
                                </Box>
                            </Box>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Reference"
                                        size="sm"
                                        checked={Reference}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Reference Verified</Typography>
                                </Box>
                            </Box>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Continuous"
                                        size="sm"
                                        checked={Continuous}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Continuous service acquired</Typography>
                                </Box>
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
                        <td style={{}}> <JoyHrd value={HrdNo} setValue={setHrdNo} /></td>
                        <td style={{}}> <JoyHrd value={HrdNo} setValue={setHrdNo} unidisable={true} /></td>
                        <td style={{}}>
                            <JoyInput
                                // placeholder={'other'}
                                type="date"
                                size="sm"
                                name="datesaved"
                                value={datesaved}
                                onchange={setdatesaved}
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>

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

export default memo(AntecedentForm)