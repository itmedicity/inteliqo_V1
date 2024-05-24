import { Box, Typography, Button, Textarea } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';

const DmsMarkModal = ({ setOpenRowIndex, setIsModalOpen, data, setcount, count }) => {
    const [totalmark, settotalMark] = useState(0);
    const [subjectmark, setsubMark] = useState(0);
    const [expmark, setexpMark] = useState(0);
    const [edumark, seteduMark] = useState(0);
    const [techmark, settechMark] = useState(0);
    const [presentationmark, setpresentationMark] = useState(0);
    const [analyticalmark, setanalyticalMark] = useState(0);
    const [communicationmark, setcommunicationMark] = useState(0);
    const [attitudeark, setattitudeMark] = useState(0);
    const [confidencemark, setconfidenceMark] = useState(0);
    const [bodylanmark, setbodylanMark] = useState(0);
    const [remark, setremark] = useState("");
    useEffect(() => {
        const sum =
            (parseInt(subjectmark) || 0) +
            (parseInt(expmark) || 0) +
            (parseInt(edumark) || 0) +
            (parseInt(techmark) || 0) +
            (parseInt(presentationmark) || 0) +
            (parseInt(analyticalmark) || 0) +
            (parseInt(communicationmark) || 0) +
            (parseInt(attitudeark) || 0) +
            (parseInt(confidencemark) || 0) +
            (parseInt(bodylanmark) || 0)

        settotalMark(sum)

    }, [subjectmark, expmark, edumark, techmark, presentationmark, analyticalmark, communicationmark, attitudeark, confidencemark, bodylanmark])

    const postdata = useMemo(() => {
        return {
            desg_id: data?.desg_id,
            application_no: data?.application_no,
            incharge_interview_status: 1,
            totalmark: totalmark,
            subjectmark: subjectmark,
            expmark: expmark,
            edumark: edumark,
            techmark: techmark,
            presentationmark: presentationmark,
            analyticalmark: analyticalmark,
            communicationmark: communicationmark,
            attitudeark: attitudeark,
            confidencemark: confidencemark,
            bodylanmark: bodylanmark,
            remark: remark

        }
    }, [data, totalmark, subjectmark, remark, expmark, edumark, techmark, presentationmark, analyticalmark, communicationmark, attitudeark, confidencemark, bodylanmark])

    const submitmanpower = useCallback(async (event) => {
        event.preventDefault()
        const result = await axioslogin.post('/Applicationform/Dmsinterviewinsert', postdata)
        const { success } = result.data
        if (success === 1) {
            setOpenRowIndex(null)
            setIsModalOpen(false)
            setcount(count + 1)
            succesNofity("Mark Added Sucessfully")
        } else {
            warningNofity("Something Went Wrong")
        }

    }, [postdata, setIsModalOpen, setcount, count, setOpenRowIndex])
    return (
        <Box>

            <Box sx={{ overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>
                <CustmTypog title={' Interview Assesment Sheet '} />
                <TableContainer sx={{ mt: 2 }}>
                    <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography fontSize="lg" level="h4" sx={{ ml: 1 }}>COMPETENCY </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>RATING (Out of 5)</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Subject Knowledge </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>

                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={subjectmark}
                                                onchange={(subjectmark) => setsubMark(subjectmark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Experience</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={expmark}
                                                        onChange={(e) => setexpMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={expmark}
                                                onchange={(expmark) => setexpMark(expmark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Education(Relevant to the position)</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={edumark}
                                                        onChange={(e) => seteduMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={edumark}
                                                onchange={(edumark) => seteduMark(edumark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Technical Skills</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={techmark}
                                                        onChange={(e) => settechMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={techmark}
                                                onchange={(techmark) => settechMark(techmark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Presentation Skills</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={presentationmark}
                                                        onChange={(e) => setpresentationMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={presentationmark}
                                                onchange={(presentationmark) => setpresentationMark(presentationmark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Analytical Skills</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={analyticalmark}
                                                        onChange={(e) => setanalyticalMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={analyticalmark}
                                                onchange={(analyticalmark) => setanalyticalMark(analyticalmark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Communication Skills</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={communicationmark}
                                                        onChange={(e) => setcommunicationMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={communicationmark}
                                                onchange={(communicationmark) => setcommunicationMark(communicationmark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Attitude</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={attitudeark}
                                                        onChange={(e) => setattitudeMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={attitudeark}
                                                onchange={(attitudeark) => setattitudeMark(attitudeark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Confidence</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={confidencemark}
                                                        onChange={(e) => setconfidenceMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={confidencemark}
                                                onchange={(confidencemark) => setconfidenceMark(confidencemark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Body Langauge</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={bodylanmark}
                                                        onChange={(e) => setbodylanMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={bodylanmark}
                                                onchange={(bodylanmark) => setbodylanMark(bodylanmark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Remark</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex', width: '100%' }}>
                                        {/* <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}> */}
                                        <Textarea
                                            name="Outlined"
                                            placeholder="Mark"
                                            variant="outlined"
                                            value={remark}
                                            minRows={4}
                                            sx={{ width: '100%' }}
                                            onChange={(e) => setremark(e.target.value)}
                                        />
                                        {/* <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="text"
                                                value={remark}
                                                onchange={(remark) => setremark(remark)}
                                                size="sm"
                                            /> */}
                                        {/* </Typography> */}
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Total</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography fontSize="lg" level="h4" sx={{ ml: 1, textTransform: 'capitalize' }}>
                                            {/* <Textarea
                                                        name="Outlined"
                                                        placeholder="Mark"
                                                        variant="outlined"
                                                        value={totalmark}
                                                        disabled
                                                        onChange={(e) => settotalMark(e.target.value)}
                                                    /> */}
                                            <JoyInput
                                                variant="plain"
                                                sx={{ p: 0, m: 0 }}
                                                type="number"
                                                value={totalmark}
                                                disabled
                                                onchange={(totalmark) => settotalMark(totalmark)}
                                                size="sm"
                                            />
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>

                        </TableBody>

                    </Table>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Button sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success" onClick={submitmanpower}>
                            Submit
                        </Button>
                    </Box>
                </TableContainer>
            </Box>
        </Box>
    )
}

export default memo(DmsMarkModal)