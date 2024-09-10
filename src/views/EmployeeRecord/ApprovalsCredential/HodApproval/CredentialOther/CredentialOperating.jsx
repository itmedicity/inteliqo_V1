import React, { memo, } from 'react'
import { Box, Table, Typography } from '@mui/joy';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';

const CredentialOperating = ({ FormDatamain, setFormDatamain }) => {

    const updateformSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? (e.target.checked ? 1 : 0) : e.target.value;
        setFormDatamain({ ...FormDatamain, [e.target.name]: value });
    }
    const { HodName, HodRemark, Hoddatesaved } = FormDatamain
    return (
        <Box sx={{ mt: 2 }}>
            <Typography level="title-md" sx={{ ml: 1 }}>Credentialing and Privileging Recommendations</Typography>

            <Box sx={{ ml: 1 }}>
                <Typography>On the basis of experience ,certificates and available infrastructure in thte Hospital,the Managment will support the skills of the
                    Doctor with right technology required to carry out the procedures she/he asked for
                </Typography>
            </Box>
            <Typography level="title-md" sx={{ ml: 1 }}>Comments by Head of the Department</Typography>
            <Box sx={{ ml: 1 }}>
                <InputComponent
                    type="text"
                    size="sm"
                    name="HodRemark"
                    value={HodRemark}
                    onchange={(e) => updateformSettings(e)}
                />
                <Table sx={{ mt: 1, p: 0, width: '100%' }} aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Name  </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {HodName} </Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Signature</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}> {HodName}</Typography>
                            </td>
                            <td padding='none'  >
                                <Typography sx={{ ml: 1, }}>Date</Typography>
                            </td>
                            <td padding='none'  >
                                <InputComponent
                                    type="date"
                                    size="sm"
                                    name="Hoddatesaved"
                                    value={Hoddatesaved}
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