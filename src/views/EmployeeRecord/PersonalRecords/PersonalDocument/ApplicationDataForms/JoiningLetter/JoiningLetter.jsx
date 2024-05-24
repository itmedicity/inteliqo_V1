import { Box, Card, Typography } from '@mui/joy'
import moment from 'moment';
import React, { memo } from 'react'

const JoiningLetter = ({ Files, Empdata }) => {
    console.log(Empdata);
    return (
        <>
            {/* for pdf View */}
            {Files.length !== 0 ?
                <Box sx={{
                    mt: 1,
                    overflowX: 'auto',
                    height: window.innerHeight - 160,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}>
                    {Files.map((file, index) => (
                        <Box key={index} sx={{ p: 1 }}>
                            {file.endsWith('.pdf') ? (
                                <Card>
                                    <embed
                                        src={file}
                                        type="application/pdf"
                                        height={window.innerHeight - 200}
                                        width="100%"
                                    />
                                </Card>
                            ) : (
                                <Card>
                                    <img
                                        src={file}
                                        height={window.innerHeight - 200}
                                        alt=''
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </Card>
                            )}
                        </Box>
                    ))}
                </Box>
                :
                <Box sx={{
                    mt: 1,
                    p: 3,
                    overflowX: 'auto',
                    height: window.innerHeight - 160,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}>
                    <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                        <Typography>TMCH/HRD/JL/..../..../....</Typography>
                        <Typography sx={{}}>DATE :{moment(Empdata?.em_doj).format('DD-MM-YYYY')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: 'center', mt: 5 }}>
                        <Typography level="h4" > JOINING LETTER
                        </Typography>

                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >To ,</Typography>
                        <Typography level="title-md" >The H.R. Department</Typography>
                        <Typography level="title-md" >TMCH</Typography>
                        <Typography level="title-md" >Dear Sir ,</Typography>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <Typography level="title-md" >With due respect, I {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} a m Emp.ID: {Empdata?.em_no === 0 ? "Not Updated" : Empdata?.em_no} would like to inform you that I am joining in Travancore </Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >Medical Hospital as {Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name} in the department of {Empdata?.dept_name === '' ? "Not Updated" : Empdata?.dept_name} on {moment(Empdata?.em_doj).format('DD-MM-YYYY')}</Typography>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >I hope you will accept my joining as   {Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name}</Typography>
                    </Box>


                    <Box sx={{ mt: 10 }}>
                        <Typography level="title-md" >Sincerely ,</Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >Name :{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >Designation : {Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name}</Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >Signature :  {Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}      </Typography>
                    </Box>
                </Box>
            }
        </>
    )
}

export default memo(JoiningLetter)