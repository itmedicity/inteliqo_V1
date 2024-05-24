import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'

const AnnualHealthother = () => {
    return (
        <Box>
            <CustmTypog title={'Other Consultations (if required)'} />
            <Box sx={{ ml: 1, mt: 1 }}>
                <Typography level="title-md"></Typography>
            </Box>
            <CustmTypog title={'Fitness Certificate'} />
            <Box sx={{ ml: 1, mt: 1 }}>
                <Typography level="title-md">Mr./Miss./Mrs. _______________, age  _____ Years, has been carefully examined by me and the supportive evidence of the test results,
                    I am hereby recommending to continue/not to continue , him/her for the prescribed job of ____________,at Travancore Medical College Hospital(Travancore Medicity).</Typography>
                <Typography level="title-md" sx={{ mt: 1 }}>Consultant Name:</Typography>
                <Typography level="title-md">Date:</Typography>
            </Box>
            <CustmTypog title={'For the Use of HR office only'} />
            <Box sx={{ ml: 1, mt: 1 }}>
                <Typography level="title-md">Mr./Miss./Mrs. _______________, age  _____ Years, has submitted the supportive evidences of the test results,vaccination details and these are verified by HRD recommends him/her to continue/not to continue pending to take decision for the prescribed job of __________ , at Travancore Medical College Hospital(Travancore Medicity).</Typography>
                <Typography level="title-md" sx={{ mt: 1 }}>Name of the staff :</Typography>
                <Typography level="title-md">Emp.ID:</Typography>
                <Typography level="title-md">Date:</Typography>
            </Box>

        </Box>
    )
}

export default memo(AnnualHealthother) 