import { Box, IconButton, Table, Tooltip, Typography } from '@mui/joy'
import React, { lazy, memo, useState } from 'react'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyHrd from 'src/views/MuiComponents/JoyComponent/JoyHrd';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import moment from 'moment';

const CredentialPrivileging = lazy(() => import('./CredentialPrivileging'))

const CredentialTraining = ({ ExpData, setExpData, Employee, CertificateData, setCertificateData, setVerificationdata, ApprovalData,
    Verificationdata, setHrdNo, HrdNo, FormDatamain, setFormDatamain, Operating, setOperating, Training, Credentialcert, privilageData }) => {
    const [rowCount, setRowCount] = useState(1);
    const [rowcerCount, setRowcerCount] = useState(1);


    const handleAddMore = () => {
        setRowCount(rowCount + 1);
        setExpData([...ExpData, { // Add new empty data for the new row
            training: '',
            conducted: '',
            em_no: Employee?.em_no,
            em_id: Employee?.em_id
        }]);
    };
    const EduSettings = (e, index) => {
        const { name, value } = e.target;
        const updatedExpData = [...ExpData]; // Create a copy of expData array
        updatedExpData[index] = { ...updatedExpData[index], [name]: value }; // Update the corresponding row data
        setExpData(updatedExpData);
    };

    const handleAddcer = () => {
        setRowcerCount(rowcerCount + 1);
        setCertificateData([...CertificateData, { // Add new empty data for the new row
            Certification: '',
            Year: '',
            em_no: Employee?.em_no,
            em_id: Employee?.em_id
        }]);
    };
    const CertifiSettings = (e, index) => {
        const { name, value } = e.target;
        const updatedExpData = [...CertificateData]; // Create a copy of expData array
        updatedExpData[index] = { ...updatedExpData[index], [name]: value }; // Update the corresponding row data
        setCertificateData(updatedExpData);
    };
    const { original, Copies, Registration, screenshot, RegistrationCopies, OriginalChecked, TrainingCopies } = Verificationdata

    const updateCommonSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        setVerificationdata({ ...Verificationdata, [e.target.name]: value });
    }

    const { specialization, datesaved } = FormDatamain

    const updateformSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        setFormDatamain({ ...FormDatamain, [e.target.name]: value });
    }
    return (
        <Box>

            <Typography level="title-md" sx={{ ml: 1 }}>Training Details </Typography>

            {Training.length > 0 ?
                <Table variant="outlined" borderAxis="both" >
                    <thead >
                        <tr>
                            <th>Name of the training/workshop program</th>
                            <th>Condcuted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Training?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.Training_name === null ? "not updated" : item?.Training_name}</td>
                                <td>{item?.Condcuted === null ? "not updated" : item?.Condcuted}</td>

                            </tr>
                        ))}
                    </tbody>

                </Table>
                :
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>

                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Name of the training/workshop program  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Condcuted </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Add more </Typography>
                            </td>

                        </tr>
                        {[...Array(rowCount)].map((_, index) => (
                            <tr sx={{ p: 0 }} key={index}>

                                <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="training"
                                        value={ExpData[index]?.training}
                                        onchange={(e) => EduSettings(e, index)}
                                    />
                                </td>
                                <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '20%' }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="conducted"
                                        value={ExpData[index]?.conducted}
                                        onchange={(e) => EduSettings(e, index)}
                                    />
                                </td>
                                <td sx={{}}>
                                    {index === rowCount - 1 && (
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Tooltip title="Add More Experience" followCursor placement='top' arrow>
                                                <IconButton sx={{ paddingY: 0.5, ml: 2, color: '#5BBCFF', }} onClick={handleAddMore}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>

                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            }


            <Typography level="title-md" sx={{ ml: 1 }}>Please list your current life support certificate and the year of certification</Typography>

            {Credentialcert.length > 0 ?
                <Table variant="outlined" borderAxis="both" >
                    <thead >
                        <tr>
                            <th>Certification</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Credentialcert?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.Certification === null ? "not updated" : item?.Certification}</td>
                                <td>{item?.certification_date === null ? "not updated" : moment(item?.certification_date).format('DD-MM-YYYY')}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table> :
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                                <Typography sx={{ ml: 1, textAlign: 'center' }}>Certification </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Year  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Add More  </Typography>
                            </td>
                        </tr>
                        {[...Array(rowcerCount)].map((_, index) => (
                            <tr sx={{ p: 0 }} key={index}>
                                <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="Certification"
                                        value={CertificateData[index]?.Certification}
                                        onchange={(e) => CertifiSettings(e, index)}
                                    />
                                </td>
                                <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '50%' }} >
                                    <InputComponent
                                        type="date"
                                        size="sm"
                                        name="Year"
                                        value={CertificateData[index]?.Year}
                                        onchange={(e) => CertifiSettings(e, index)}
                                    />
                                </td>
                                <td sx={{}}>
                                    {index === rowcerCount - 1 && (
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Tooltip title="Add More Experience" followCursor placement='top' arrow>
                                                <IconButton sx={{ paddingY: 0.5, ml: 2, color: '#5BBCFF', }} onClick={handleAddcer}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>

                                    )}
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </Table>
            }
            <Typography level="title-md" sx={{ ml: 1 }}>Do you request any specialized Training at  TMCH ?</Typography>


            <InputComponent
                type="text"
                size="sm"
                name="specialization"
                value={specialization}
                onchange={(e) => updateformSettings(e)}
            />


            <Typography level="title-md" sx={{ ml: 1 }}>Verification Status</Typography>

            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>Academic Details </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Registration Details</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Training Details</Typography>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="original"
                                        checked={original === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Orginal Certificates Verified
                                </Typography>
                            </Box>

                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Registration"
                                        checked={Registration === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Registration Verified
                                </Typography>
                            </Box>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="OriginalChecked"
                                        checked={OriginalChecked === 1}
                                        disabled={true}

                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Orginal Checked
                                </Typography>
                            </Box>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Copies"
                                        checked={Copies === 1}
                                        disabled={true}

                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Copies received
                                </Typography>
                            </Box>

                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="screenshot"
                                        checked={screenshot === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Screenshot attached
                                </Typography>
                            </Box>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="TrainingCopies"
                                        checked={TrainingCopies === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    copies received
                                </Typography>
                            </Box>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                        </td>

                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Box sx={{ display: "flex" }}>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="RegistrationCopies"
                                        checked={RegistrationCopies === 1}
                                        disabled={true}
                                    />
                                </Typography>
                                <Typography sx={{ ml: 1, pt: 1 }}>
                                    Copies Received
                                </Typography>
                            </Box>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >

                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Declaration By Ms Office/Hr</Typography>

            <Box sx={{}}>
                <Typography sx={{ ml: 1, pt: 1 }}>
                    The Above details are checked and verified
                </Typography>
            </Box>
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textAlign: 'center' }}>Name of the staff </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Signature</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Date</Typography>
                        </td>
                    </tr>
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <JoyHrd value={HrdNo} setValue={setHrdNo} />
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <JoyHrd value={HrdNo} setValue={setHrdNo} unidisable={true} />
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                            <InputComponent
                                type="date"
                                size="sm"
                                name="datesaved"
                                value={datesaved}
                                onchange={(e) => updateformSettings(e)}
                            />
                        </td>
                    </tr>

                </tbody>
            </Table>
            <CredentialPrivileging Employee={Employee} FormDatamain={FormDatamain} setFormDatamain={setFormDatamain}
                Operating={Operating} setOperating={setOperating} privilageData={privilageData} ApprovalData={ApprovalData} />
        </Box >
    )
}

export default memo(CredentialTraining)