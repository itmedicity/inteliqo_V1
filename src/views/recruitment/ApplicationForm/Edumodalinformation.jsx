import React, { memo } from 'react'
import { TableContainer } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { Box, Typography } from '@mui/joy';
import moment from 'moment';
import WorkIcon from '@mui/icons-material/Work';

const Edumodalinformation = ({ formdata, education, edudata, eduname }) => {

    return (
        <>
            <CustmTypog title={'Your Education Information'} />
            <TableContainer sx={{ mt: 2 }}>
                {edudata.map((val, index) => {
                    const correspondingEduName = eduname[index];

                    return (
                        <Box key={index} sx={{ mt: 1, display: "flex", width: '100%' }}>
                            <Box sx={{
                                width: "100%",

                            }}>
                                <Box sx={{ display: 'flex', gap: 2, mt: 1, }}>
                                    <Box><WorkIcon /></Box>
                                    <Box sx={{ mt: .5, display: 'flex', gap: 1 }}>
                                        <Box><Typography level="title-md" sx={{ wordBreak: 'break-word', }}> {correspondingEduName?.edu_desc}</Typography></Box>
                                        <Box>   <Typography level="body-sm" sx={{ wordBreak: 'break-word', }}>(  {moment(new Date(val?.edustartdate)).format('DD-MM-YYYY')} -  {moment(new Date(val?.eduenddate)).format('DD-MM-YYYY')})</Typography></Box>

                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                    <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', }}> {val?.schoolname}</Typography> </Box>
                                </Box>
                            </Box>
                        </Box>

                    )
                })}
            </TableContainer>
        </>
    )
}

export default memo(Edumodalinformation)