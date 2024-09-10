import React, { memo } from 'react'
import { TableContainer, } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { Box, Typography } from '@mui/joy';
import moment from 'moment';
import WorkIcon from '@mui/icons-material/Work';

const Expmodalinformation = ({ formdata, expdata }) => {
    // const { Workingstatus, Employer, expstartdate, expenddate, jobexp } = expdata
    return (
        <>
            <CustmTypog title={'Your Experience Information'} />
            <TableContainer sx={{ mt: 2 }}>
                {expdata?.map((val, index) => {
                    return (
                        <Box key={index} sx={{ mt: 1, display: "flex", width: '100%' }}>
                            <Box sx={{
                                width: "100%",

                            }}>
                                <Box sx={{ display: 'flex', gap: 2, mt: 1, }}>
                                    <Box><WorkIcon /></Box>
                                    <Box sx={{ mt: .5, display: 'flex', gap: 1 }}>
                                        <Box><Typography level="title-md" sx={{ wordBreak: 'break-word', }}> {val?.jobexp}</Typography></Box>
                                        <Box>   <Typography level="body-sm" sx={{ wordBreak: 'break-word', }}>(  {moment(new Date(val?.expstartdate)).format('DD-MM-YYYY')} -  {moment(new Date(val?.expenddate)).format('DD-MM-YYYY')})</Typography></Box>

                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                    <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', }}> {val?.Employer}</Typography> </Box>
                                </Box>
                            </Box>

                        </Box>

                    )
                })}

            </TableContainer>
        </>
    )
}

export default memo(Expmodalinformation)