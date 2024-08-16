import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'

const CredentialOperating = lazy(() => import('./CredentialOperating'))

const CredentialPrivileging = ({ privilageData, FormDatamain, setFormDatamain }) => {
    return (
        <Box>

            <Typography level="title-md" sx={{ ml: 1 }}>Privileging</Typography>
            <Box sx={{ ml: 1 }}>
                <Typography>
                    Privilege request can be listed in a separate sheet to level of supervision required. Please put tick in the appropriate column against each procedure
                </Typography>

                <Typography sx={{ mt: 1 }}>
                    U - Can do the procedure unsupervised
                </Typography>
                <Typography>
                    S - Need Supervision to do the procedure(peer present /involved in procedure)
                </Typography>
                <Typography>
                    I - Interested to get trained in the procedure
                </Typography>
            </Box>

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
            <CredentialOperating FormDatamain={FormDatamain} setFormDatamain={setFormDatamain} />

        </Box>
    )
}

export default memo(CredentialPrivileging)