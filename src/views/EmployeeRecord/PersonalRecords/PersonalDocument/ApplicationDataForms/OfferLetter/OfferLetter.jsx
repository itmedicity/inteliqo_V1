import { Box, Card, Typography } from '@mui/joy'
import moment from 'moment'
import React, { memo } from 'react'

const OfferLetter = ({ Files, Empdata }) => {
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
                <Box sx={{ p: 3, height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                    <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                        <Typography>TMCH/HRD/OL/MM/YY/REF:NO</Typography>
                        <Typography sx={{}}>DATE :</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: 'center', mt: 5 }}>
                        <Typography level="h4" >PROVISIONAL OFFER LETTER</Typography>

                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: "flex", width: '100%' }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Name :</Typography>
                            <Typography level="title-md" sx={{ width: '70%' }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Address:</Typography>
                            <Typography level="title-md" sx={{ width: '70%' }}>{Empdata?.addressPermnt1 === '' ? "Not Updated" : Empdata?.addressPermnt1} ,{Empdata?.addressPermnt2 === '' ? "Not Updated" : Empdata?.addressPermnt2}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Gender :</Typography>
                            <Typography level="title-md" sx={{ width: '70%' }}>{Empdata?.em_gender === 0 ? "Not Updated" : Empdata?.em_gender === 1 ? "Male" : Empdata?.em_gender === 2 ? "FeMale" : 'Other'}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Tel.No:</Typography>
                            <Typography level="title-md" sx={{ width: '70%' }}>{Empdata?.em_mobile === 0 ? "Not Updated" : Empdata?.em_mobile}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Email.Id:</Typography>
                            <Typography level="title-md" sx={{ width: '70%' }}>{Empdata?.em_email === '' ? "Not Updated" : Empdata?.em_email}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }} >Designation Offered:</Typography>
                            <Typography level="title-md" sx={{ width: '70%' }}> {Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Department:</Typography>
                            <Typography level="title-md" sx={{ width: '70%' }}> {Empdata?.dept_name === '' ? "Not Updated" : Empdata?.dept_name}</Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <Typography level="title-md" sx={{ width: '30%' }}>Expected DOJ:</Typography>
                            <Typography level="title-md" sx={{ width: '70%' }}>{Empdata?.em_doj === 0 ? "Not Updated" : moment(Empdata?.em_doj).format('DD-MM-YYYY')}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >Dear Mr/Ms</Typography>
                        <Typography level="title-md" >{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}</Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >Further to the interview and discussions you had with us, we are pleased to offer you the post
                            of {Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name} in the Department of {Empdata?.dept_name === '' ? "Not Updated" : Empdata?.dept_name} Travancore Medical
                            College Hospital,Kollam, Kerala</Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >It is prerequisite that you have to be medically ft during the medical checkup to be held at the timeof
                            your joining. Please note that this is Provisional Offer Letter. The Company’s standard Appointment
                            Letter containing terms &  conditions and duties &  responsibilities will be issued to you on
                            your joining the Company.
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >This offer is subject to submission of following original documents along with copies on your joining </Typography>

                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >1. 3 passport size photographs, Aadhaar Card & PAN Card. </Typography>
                        <Typography level="title-md" > 2. Age proof and all Academic Certifcates.</Typography>
                        <Typography level="title-md" > 3. Experience Certifcates and reference certifcates/letters.</Typography>
                        <Typography level="title-md" >4. Relieving order from previous employer.</Typography>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >We are looking forward to a long and mutually promising association. </Typography>

                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >For Travancore Medical College Hospital, </Typography>

                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography level="title-md" >G Ganesh Potti </Typography>
                        <Typography level="title-md" >General Manager– HR </Typography>
                    </Box>
                </Box>
                // : <Box sx={{
                //     display: "flex", alignItems: 'center', justifyContent: 'center',
                //     overflowX: 'auto',
                //     height: window.innerHeight - 200,
                //     scrollbarWidth: 'none',
                //     '&::-webkit-scrollbar': {
                //         width: 0,
                //     },
                // }}>
                //     <Box sx={{ width: '10%' }}>No Data Found</Box>
                // </Box>

            }

        </>
    )
}

export default memo(OfferLetter)