import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const CredentialOperating = lazy(() => import('./CredentialOperating'))


const CredentialPrivileging = ({ ApprovalData, Operating, setOperating, Employee, privilageData }) => {


    return (
        <Box>

            <Typography level="title-md" sx={{ ml: 1 }}>Operating Privilege</Typography>

            <Box sx={{ ml: 1 }}>
                <Typography>
                    Operating privilege request can be listed in a separate sheet to level of supervision required.Your logbook will be a useful guide.
                </Typography>

                <Typography sx={{ mt: 1 }}>
                    Please put tick in the appropriate column against each procedure
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
            <CredentialOperating Operating={Operating} setOperating={setOperating} Employee={Employee} privilageData={privilageData} ApprovalData={ApprovalData} />
        </Box>
    )
}

export default memo(CredentialPrivileging)