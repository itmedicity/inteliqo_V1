import React, { memo, useCallback, useState } from 'react'
import { Box, Button, Checkbox, IconButton, Table, Tooltip, Typography } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const CredentialOperating = ({ privilageData, FormDatamain, setFormDatamain, Credentialdata }) => {

    const updateformSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        setFormDatamain({ ...FormDatamain, [e.target.name]: value });
    }
    const { MdName, MdRemark, Mddatesaved } = FormDatamain
    return (
        <Box sx={{ mt: 2 }}>

            <Table variant="outlined" borderAxis="both" >
                <thead >
                    <tr>
                        <th>Name of the procedure</th>
                        <th style={{ textAlign: 'center' }}>U</th>
                        <th style={{ textAlign: 'center' }}>S</th>
                        <th style={{ textAlign: 'center' }}>I</th>
                        <th>Decision of the C&P committee</th>

                    </tr>
                </thead>
                <tbody>
                    {privilageData?.map((item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center' }}>{item?.name_procedure === null ? "not updated" : item?.name_procedure}</td>
                            <td style={{ textAlign: 'center' }}>{item?.procedure_unsupervised === null ? "not updated" : item?.procedure_unsupervised === 1 ? "YES" : "NO"}</td>
                            <td style={{ textAlign: 'center' }}>{item?.supervision === null ? "not updated" : item?.supervision === 1 ? "YES" : "NO"}</td>
                            <td style={{ textAlign: 'center' }}>{item?.interested === null ? "not updated" : item?.interested === 1 ? "YES" : "NO"}</td>
                            <td style={{ textAlign: 'center' }}>{item?.decision === null ? "not updated" : item?.decision}</td>

                        </tr>
                    ))}
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Credentialing and Privileging Recommendations</Typography>

            <Box sx={{ ml: 1 }}>
                <Typography>On the basis of experience ,certificates and available infrastructure in the Hospital,the Managment will support the skills of the
                    Doctor with right technology required to carry out the procedures she/he asked for
                </Typography>
            </Box>
            <Typography level="title-md" sx={{ ml: 1 }}>Comments by Head of the Department</Typography>
            <Box sx={{ ml: 1 }}>
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>{Credentialdata?.Hod_comments} </Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Name  </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {Credentialdata?.em_name} </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Signature</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {Credentialdata?.em_name}</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Date</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>{Credentialdata?.Hod_doc_approvalDate}</Typography>

                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Box>

            <Typography level="title-md" sx={{ ml: 1 }}>Comments by Medical Superintendent</Typography>
            <Box sx={{ ml: 1 }}>
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>{Credentialdata?.MS_comments} </Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Name  </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {Credentialdata?.MsApproval_name} </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Signature</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {Credentialdata?.MsApproval_name}</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Date</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>{Credentialdata?.MS_doc_approvalDate}</Typography>

                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
            <Typography level="title-md" sx={{ ml: 1 }}>Comments and Approval by Credentialing and Privileging Committee (C & P Committee)</Typography>
            <Box sx={{ ml: 1 }}>
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>{Credentialdata?.CP_comments} </Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Name  </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {Credentialdata?.CpApproval_name} </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Signature</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {Credentialdata?.CpApproval_name}</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Date</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>{Credentialdata?.CP_doc_approvalDate}</Typography>

                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Box>
            <Typography level="title-md" sx={{ ml: 1 }}>Comments & Approval by Medical Director</Typography>

            <Box sx={{ ml: 1 }}>
                <Typography>
                </Typography>
                <Typography>
                    {/* The Credentialing & privileging committee meeting held on ............ discussed the Privileges and recommended. */}
                </Typography>
            </Box>
            <Box sx={{ ml: 1 }}>
                <InputComponent
                    type="text"
                    size="sm"
                    name="MdRemark"
                    value={MdRemark}
                    onchange={(e) => updateformSettings(e)}
                />
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Name  </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {MdName} </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Signature</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {MdName}</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Date</Typography>
                            </td>
                            <td padding='none'  >
                                <InputComponent
                                    type="date"
                                    size="sm"
                                    name="Mddatesaved"
                                    value={Mddatesaved}
                                    onchange={(e) => updateformSettings(e)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Box>

        </Box>
    )
}

export default memo(CredentialOperating) 