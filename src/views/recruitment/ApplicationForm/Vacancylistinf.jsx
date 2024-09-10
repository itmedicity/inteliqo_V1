import React, { memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/joy';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import moment from 'moment';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const Vacancylistinf = ({ vacancydata, selectedVacancies, setSelectedVacancies }) => {


    const handleCheckboxChange = (desgId, isChecked) => {
        if (isChecked) {
            setSelectedVacancies([...selectedVacancies, desgId]);
        } else {
            const updatedVacancies = selectedVacancies.filter(id => id !== desgId);
            setSelectedVacancies(updatedVacancies);
        }
    };

    return (
        <>
            <CustmTypog title={'Vacancy List Based on Your Qualification'} />
            <TableContainer sx={{ mt: 1 }}>
                {vacancydata?.map((val, index) => {
                    return (

                        <Box key={val.desg_id} sx={{ mt: 2, width: '100%', cursor: 'pointer' }}>
                            <Card sx={{ borderRadius: 15 }}>
                                <Box sx={{}}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                        <Typography level="body-xs">{val?.desg_name}</Typography>
                                        <Typography level="body-xs">
                                            Posted On: {moment(new Date(val?.annouced_date)).format('DD-MM-YYYY ')}
                                        </Typography>
                                    </Box>
                                    <Typography level="body-xs">{val?.experiencefrom}-{val?.experienceto} Years Experience</Typography>
                                </Box>

                                <CardContent orientation="horizontal">
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ display: 'flex', justifyContent: "space-around", }}>
                                            <Typography level="body-xs" sx={{ wordBreak: 'break-word', mt: 1 }}>
                                                Click Tick to Apply For the Post
                                            </Typography>

                                            <IconButton sx={{ p: 0, m: 0 }}

                                            >
                                                <ArrowCircleRightIcon
                                                    color="primary"
                                                    sx={{
                                                        animation: 'move 1s ease infinite', // Use the keyframe name directly
                                                        '@keyframes move': { // Define the keyframes for the animation
                                                            '0%': {
                                                                transform: 'translateX(-10px)',
                                                            },
                                                            '50%': {
                                                                transform: 'translateX(10px)',
                                                            },
                                                            '100%': {
                                                                transform: 'translateX(-10px)',
                                                            },
                                                        },
                                                    }}
                                                />

                                            </IconButton>
                                            <Box sx={{ mt: 1 }}>
                                                <JoyCheckbox
                                                    label=''
                                                    name={`recruitment_status_${val.desg_id}`}
                                                    checked={selectedVacancies.includes(val.desg_id)}
                                                    onchange={(e) => handleCheckboxChange(val.desg_id, e.target.checked)}
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, flexWrap: 'wrap', }}>
                                            <Typography level="body-xs" sx={{ wordBreak: 'break-word' }}>
                                                JOB ID: {val?.manpower_Request_slno}
                                            </Typography>
                                            <Typography level="body-xs" sx={{ wordBreak: 'break-word', color: '#FF76CE' }}>
                                                Apply Before: {moment(new Date(val?.required_date)).format('DD-MM-YYYY HH MM a')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>

                    )
                })}
            </TableContainer>
        </>
    )
}

export default memo(Vacancylistinf) 