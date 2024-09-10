import { Box, Typography } from '@mui/joy'
import React, { lazy, memo, } from 'react'
import Table from '@mui/joy/Table';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import JoyHrd from 'src/views/MuiComponents/JoyComponent/JoyHrd';

const CredentialTraining = lazy(() => import('./CredentialTraining'))


const CredentialDeclaration = ({ trainData, settrainData, Employee, Verificationdata, setVerificationdata, datesaved, setdatesaved,
    HrdNo, setHrdNo, Declarationdate, setDeclarationdate, Training }) => {
    // const [selectAcademic, setSelectAcademic] = useState(0)
    // const [selectRegistration, setSelectRegistration] = useState(0)
    // const [selectTraining, setSelectTraining] = useState(0)
    const { original, Copies, Registration, screenshot, RegistrationCopies, OriginalChecked, TrainingCopies } = Verificationdata
    const updateCommonSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setVerificationdata({ ...Verificationdata, [e.target.name]: value })
    }
    // const Academic = [
    //     { value: 1, name: "Original Certificates verified" },
    //     { value: 2, name: "Copies Received" },

    // ]
    // const Registration = [
    //     { value: 1, name: "Registration Verified" },
    //     { value: 2, name: "Screen shot attached" },
    //     { value: 2, name: "Copies received" },
    // ]
    // const Training = [
    //     { value: 1, name: "Originals checked" },
    //     { value: 2, name: "Copies received" },
    // ]
    return (
        <Box>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Training Details</Typography>
            {/* training details */}
            <CredentialTraining trainData={trainData} settrainData={settrainData} Employee={Employee} Training={Training} />

            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Declaration By Applicant</Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' sx={{ mt: 1 }} variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>I hereby declare that the information given above are true and correct to the best
                            of my knowledge and belief.I agree if this information is found to be incorrect/false the company is free to terminate my contract /service.</Typography></td>

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
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.em_name} </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_name === '' ? "Not Updated" : Employee?.em_name} </Typography></td>
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
                </tbody>
            </Table>
            <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Verification Status</Typography>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Academic Details</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Registration Details</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Training Details</Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}>

                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="original"
                                        size="sm"
                                        checked={original}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Original Certificates Verified</Typography>
                                </Box>
                            </Box>
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
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Copies Received</Typography>
                                </Box>
                            </Box>
                        </td>
                        <td style={{}}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Registration"
                                        size="sm"
                                        checked={Registration}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Registration Verified</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="screenshot"
                                        size="sm"
                                        checked={screenshot}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Screen Shot Attached</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="RegistrationCopies"
                                        size="sm"
                                        checked={RegistrationCopies}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Copies Received</Typography>
                                </Box>
                            </Box>

                        </td>
                        <td style={{}}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="OriginalChecked"
                                        size="sm"
                                        checked={OriginalChecked}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Originals Checked</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ mt: .5 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="TrainingCopies"
                                        size="sm"
                                        checked={TrainingCopies}
                                        onchange={(e) => updateCommonSettings(e)}

                                    />
                                </Box>
                                <Box>
                                    <Typography level="title-md" sx={{ ml: 2, textAlign: "center" }}>Copies Received</Typography>
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
        </Box>
    )
}

export default memo(CredentialDeclaration) 