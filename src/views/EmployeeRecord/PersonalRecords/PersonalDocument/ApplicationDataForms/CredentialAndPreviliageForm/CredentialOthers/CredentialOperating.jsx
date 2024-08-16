import React, { memo, useCallback, useState } from 'react'
import { Box, Button, IconButton, Table, Tooltip, Typography } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const CredentialOperating = ({ Operating, setOperating, Employee, privilageData, ApprovalData }) => {
    console.log(ApprovalData);
    const [rowCount, setRowCount] = useState(1);

    const handleAddMore = () => {
        setRowCount(rowCount + 1);
        setOperating([...Operating, { // Add new empty data for the new row
            Name: '',
            Decision: '',
            NameO: 0,
            NameS: 0,
            NameA: 0,
            NameP: 0,
            em_no: Employee?.em_no,
            em_id: Employee?.em_id
        }]);
    };
    const EduSettings = useCallback((e, index) => {
        const { name, value, checked } = e.target;
        const updatedExpData = [...Operating];
        if (name === 'NameO' || name === 'NameA' || name === 'NameS' || name === 'NameP') {
            updatedExpData[index] = { ...updatedExpData[index], [name]: checked ? 1 : 0 };
        } else {
            updatedExpData[index] = { ...updatedExpData[index], [name]: value };
        }
        setOperating(updatedExpData);
    }, [Operating]);
    // const updateformSettings = async (e) => {
    //     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    //     setFormDatamain({ ...FormDatamain, [e.target.name]: value })
    // }

    return (
        <Box sx={{ mt: 2 }}>

            {privilageData.length > 0 ?
                <Table variant="outlined" borderAxis="both" >
                    <thead >
                        <tr>
                            <th>Name of the procedure</th>
                            <th style={{ textAlign: 'center' }}>O</th>
                            <th style={{ textAlign: 'center' }}>S</th>
                            <th style={{ textAlign: 'center' }}>A</th>
                            <th style={{ textAlign: 'center' }}>P</th>
                            <th>Decision of the C&P committee</th>

                        </tr>
                    </thead>
                    <tbody>
                        {privilageData?.map((item, index) => (
                            <tr key={index}>
                                <td style={{ textAlign: 'center' }}>{item?.name_procedure === null ? "not updated" : item?.name_procedure}</td>
                                <td style={{ textAlign: 'center' }}>{item?.Observer === null ? "not updated" : item?.Observer === 1 ? "YES" : "NO"}</td>
                                <td style={{ textAlign: 'center' }}>{item?.supervision === null ? "not updated" : item?.supervision === 1 ? "YES" : "NO"}</td>
                                <td style={{ textAlign: 'center' }}>{item?.Procedures === null ? "not updated" : item?.Procedures === 1 ? "YES" : "NO"}</td>
                                <td style={{ textAlign: 'center' }}>{item?.Perform_procedure === null ? "not updated" : item?.Perform_procedure === 1 ? "YES" : "NO"}</td>
                                <td style={{ textAlign: 'center' }}>{item?.decision === null ? "not updated" : item?.decision}</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>

                :
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>

                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>Name of the procedure</Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                    O
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                    S
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                    A
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                    P
                                </Typography>
                            </td>

                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                    Decision of the C&P committee
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize', textAlign: 'center' }}>
                                    Add More
                                </Typography>
                            </td>
                        </tr>
                        {[...Array(rowCount)].map((_, index) => (
                            <tr sx={{ p: 0 }} key={index}>

                                <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="Name"
                                        value={Operating[index]?.Name}
                                        onchange={(e) => EduSettings(e, index)}
                                    />
                                </td>
                                <td style={{ textAlign: "center" }} >
                                    <JoyCheckbox
                                        sx={{}}
                                        size="sm"
                                        name="NameO"
                                        checked={Operating[index]?.NameO === 0 ? false : true}
                                        onchange={(e) => EduSettings(e, index)}

                                    />
                                </td>
                                <td style={{ textAlign: "center" }} >
                                    <JoyCheckbox
                                        sx={{}}
                                        name="NameS"
                                        size="sm"
                                        checked={Operating[index]?.NameS === 0 ? false : true}
                                        onchange={(e) => EduSettings(e, index)}

                                    />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="NameA"
                                        size="sm"
                                        checked={Operating[index]?.NameA === 0 ? false : true}
                                        onchange={(e) => EduSettings(e, index)}

                                    />
                                </td>

                                <td style={{ textAlign: "center" }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="NameP"
                                        size="sm"
                                        checked={Operating[index]?.NameP === 0 ? false : true}
                                        onchange={(e) => EduSettings(e, index)}

                                    />
                                </td>
                                <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="Decision"
                                        value={Operating[index]?.Decision}
                                        onchange={(e) => EduSettings(e, index)}
                                    />
                                </td>
                                <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '30%' }} >

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
            <Typography level="title-md" sx={{ ml: 1 }}>Credentialing and Privileging Recommendations</Typography>

            <Box sx={{ ml: 1 }}>
                <Typography>On the basis of experience ,certificates and available infrastructure in thte Hospital,the Managment will support the skills of the
                    Doctor with right technology required to carry out the procedures she/he asked for
                </Typography>
            </Box>
            <Typography level="title-md" sx={{ ml: 1 }}>Comments by Head of the Department</Typography>
            <Box sx={{}}>
                <Table sx={{ p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{}}>{ApprovalData?.Hod_comments} </Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Name  </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.em_name}  </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Signature</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.em_name}  </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Date</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.Hod_Other_approvalDate} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Comments by Medical Superintendent</Typography>

            <Box sx={{}}>
                <Table sx={{ p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{}}>{ApprovalData?.MS_comments} </Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Name  </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}> {ApprovalData?.MsApproval_name} </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Signature</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}> {ApprovalData?.MsApproval_name}</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Date</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.MS_Other_approvalDate}</Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Comments and Approval by Credentialing and Privileging Committee (C & P Committee)</Typography>

            <Box sx={{}}>

                <Typography>
                    The Credentialing & privileging committee meeting held on ............ discussed the Privileges and recommended.
                </Typography>
                <Table sx={{ p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{}}>{ApprovalData?.CP_comments} </Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>C & P Committee Chairman </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.CpApproval_name}  </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Signature</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}> {ApprovalData?.CpApproval_name}</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Date</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.CP_Other_approvalDate}</Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Comments & Approval by Medical Director</Typography>

            <Box sx={{ ml: 1 }}>
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none'  >
                            <Typography sx={{}}>{ApprovalData?.MD_comments} </Typography>
                        </td>
                    </tr>
                </tbody>

            </Box>
            <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody >
                    <tr sx={{ p: 0 }}>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Signature </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.MdApproval_name} </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Date</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.MD_Other_approvalDate} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>

        </Box>
    )
}

export default memo(CredentialOperating) 