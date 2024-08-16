import React, { memo, } from 'react'
import { Box, Table, Typography } from '@mui/joy';


const CredentialOperating = ({ ApprovalData }) => {

    return (
        <Box sx={{ mt: 2 }}>
            <Typography level="title-md" sx={{ ml: 1 }}>Credentialing and Privileging Recommendations</Typography>

            <Box sx={{ ml: 1 }}>
                <Typography>On the basis of experience ,certificates and available infrastructure in thte Hospital,the Managment will support the skills of the
                    Doctor with right technology required to carry out the procedures she/he asked for
                </Typography>
            </Box>
            <Typography level="title-md" sx={{ ml: 1 }}>Comments by Chief Nursing Officer</Typography>
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
                            <Typography sx={{ ml: 1, }}> {ApprovalData?.em_name}  </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Signature</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}> {ApprovalData?.em_name} </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Date</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}> {ApprovalData?.Hod_doc_approvalDate}</Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Comments by Deputy Medical Superintendent Office</Typography>

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
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.MsApproval_name} </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Date</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.MS_Nurse_approvalDate}</Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Comments by Medical Superintendent</Typography>

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
                            <Typography sx={{ ml: 1, }}> {ApprovalData?.CpApproval_name} </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Signature</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.CpApproval_name}  </Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>Date</Typography>
                        </td>
                        <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }} >
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.CP_doc_approvalDate} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <Typography level="title-md" sx={{ ml: 1 }}>Comments & Approval by Medical Director</Typography>

            <Box sx={{}}>
                <Table sx={{ p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{}}>{ApprovalData?.Md_comments} </Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>

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
                            <Typography sx={{ ml: 1, }}>{ApprovalData?.MD_Nurse_approvalDate} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>

        </Box>
    )
}

export default memo(CredentialOperating) 