import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer } from 'react-toastify';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import { Box, Button, Sheet, Table, Typography } from '@mui/joy';

const EmpDetailsShow = ({ data }) => {

    const history = useHistory()

    const [Viewdata, setViewData] = useState({
        dept_name: '',
        desg_name: '',
        em_mobile: '',
        em_name: '',
        sect_name: '',
        training_topic_name: '',
        em_no: 0,
        em_id: 0,
        question_count: 0,
        topic_slno: 0,
        Emslno: 0,
        mark: 0,
        postmark: 0,
        retest: 0
    });

    const { dept_name, desg_name, em_name, training_topic_name, postmark, retest, posttest, em_no, topic_slno, question_count, Emslno, em_id, training_status, pretest_status, posttest_status, pretest, online, mark } = Viewdata;

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { dept_name, desg_name, em_mobile, postmark, em_name, sect_name, training_topic_name, topic_slno, em_no, em_id, question_count, Emslno, pretest_status, posttest_status, online_mode, mark, offline_mode, training_status } = data[0];
            const obj = {
                dept_name: dept_name,
                desg_name: desg_name,
                em_mobile: em_mobile,
                em_name: em_name,
                sect_name: sect_name,
                training_topic_name: training_topic_name,
                topic_slno: topic_slno,
                em_no: em_no,
                em_id: em_id,
                question_count: question_count,
                Emslno: Emslno,
                pretest_status: pretest_status,
                posttest_status: posttest_status,
                online_mode: online_mode,
                offline_mode: offline_mode,
                training_status: training_status,
                pretest: pretest_status === 1 ? "Yes" : " No",
                posttest: posttest_status === 1 ? "Yes" : " Not Attend",
                online: online_mode === 1 ? "Online" : "Offline",
                postmark: postmark === null ? "Not attend" : postmark,
                mark: mark,
                retest: postmark < 2 ? 1 : 0
            }
            setViewData(obj);
        }
    }, [data, setViewData])

    const ClickToTest = useCallback(() => {
        if (training_status === 1 && pretest_status !== 1) {
            history.push(`/OnlinePreTest/${Emslno}/${em_id}/${topic_slno}/${question_count}`)
        }
        else if (training_status === 1 && pretest_status === 1 && posttest_status === 0) {
            history.push(`/OnlinePostTest/${Emslno}/${em_id}/${topic_slno}/${question_count}`)
        }
        else if (training_status === 1 && pretest_status === 1 && posttest_status === 1) {
            warningNofity("Already Attend the Online Test")
        }

    }, [Emslno, em_id, history, topic_slno, question_count, training_status, pretest_status, posttest_status])

    //close the tab
    const GotoLogin = useCallback(() => {
        history.push(`/PreLogInpage/${topic_slno}`)
    }, [history, topic_slno])


    return (
        <div>
            <ToastContainer />
            <Paper variant="outlined" sx={{
                px: 1
            }} >
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    fontFamily: "serif",
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1

                    }}>
                        <Box sx={{ display: "flex", py: 0.3, mt: 1 }} >
                            <Typography
                                fontSize="xl2"
                                lineHeight={0}
                                endDecorator={<PersonOutlinedIcon color='primary' />}
                                sx={{ textTransform: 'capitalize', fontFamily: "serif", }}
                            >
                                {em_name.toLowerCase()}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mt: 1 }} >
                            <Typography textColor="text.secondary"
                                startDecorator={
                                    <ManageAccountsOutlinedIcon fontSize='md' color='primary' />
                                }
                                endDecorator={
                                    <Typography>
                                        |
                                    </Typography>
                                }
                                sx={{ textTransform: 'capitalize', fontFamily: "serif", }}
                            >
                                {desg_name.toLowerCase()}
                            </Typography>
                            <Typography textColor="text.secondary"
                                startDecorator={
                                    <LanOutlinedIcon fontSize='md' color='primary' />
                                }
                                endDecorator={
                                    <Typography>
                                        |
                                    </Typography>
                                }
                                px={1}
                                sx={{ textTransform: 'capitalize', fontFamily: "serif", }}
                            >
                                {dept_name.toLowerCase()}
                            </Typography>
                            <Typography textColor="text.secondary"
                                sx={{ fontFamily: "serif" }}
                                startDecorator={<NumbersOutlinedIcon fontSize='md' color='primary' />}
                            >
                                {em_no}
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Paper >
            <Paper elevation={0} sx={{ p: 1 }}>

                {/* pretest-start */}
                <Box>
                    {
                        pretest_status === 0 ?
                            <Box>
                                <Box>
                                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 2 }}>
                                        <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>Your Topic is </Typography>
                                        <Typography sx={{ fontFamily: "serif", color: "blue", fontWeight: "bold" }}>{training_topic_name} </Typography>
                                    </Box>
                                    <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>Click START button to attend the Pre-Test</Typography>

                                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, }}>
                                        <Button sx={{ backgroundColor: "blue", color: "white", width: "80%" }} onClick={ClickToTest}>
                                            START
                                        </Button>
                                    </Box>
                                </Box>
                                <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                                    <Typography sx={{ fontFamily: "serif", color: "red", fontSize: "sm", textDecoration: "underline" }}>NB:Carefully Read the following instructions: </Typography>
                                    <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* Make sure you have good internet connection</Typography>
                                    <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* 60 seconds alloted to each question.</Typography>
                                    <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* Below average score Employees should Attend the retest</Typography>
                                    <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* If you cannot finish a question within the given time,You can automatically goes to the next question</Typography>
                                </Box>
                            </Box>
                            : null}
                </Box>

                {/* Pre-test end */}

                {/* Post-test start */}
                {pretest_status === 1 && posttest_status === 0 ?
                    <Box>
                        <Typography sx={{ mt: 1 }}>Online-Test Result</Typography>
                        <Sheet variant="outlined">
                            <Table variant="soft" borderAxis="bothBetween">
                                <thead>
                                    <tr>
                                        <th>Topic</th>
                                        <th style={{ textTransform: "capitalize", }}> {training_topic_name.toLowerCase()}</th>
                                    </tr>
                                    <tr>
                                        <th>Pre-Test</th>
                                        <th style={{ textTransform: "capitalize", }}> {pretest}</th>
                                    </tr>
                                    <tr>
                                        <th>Pre-Test Mark</th>
                                        <th style={{ textTransform: "capitalize" }}> {mark}</th>
                                    </tr>
                                    <tr>
                                        <th>Training Mode</th>
                                        <th style={{ textTransform: "capitalize", }}> {online}</th>
                                    </tr>
                                </thead>
                            </Table>
                        </Sheet>
                        <Typography sx={{ mt: 1, fontFamily: "serif", fontSize: "sm" }}>Click START button to attend the Pre-Test</Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, }}>
                            <Button sx={{ backgroundColor: "blue", color: "white", width: "80%" }} onClick={ClickToTest}>
                                Start
                            </Button>
                        </Box>
                        <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                            <Typography sx={{ fontFamily: "serif", color: "red", fontSize: "sm", textDecoration: "underline" }}>NB:Carefully Read the following instructions: </Typography>
                            <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* Make sure you have good internet connection</Typography>
                            <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* 60 seconds alloted to each question.</Typography>
                            <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* Below average score Employees should Attend the retest</Typography>
                            <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* If you cannot finish a question within the given time,You can automatically goes to the next question</Typography>
                        </Box>
                    </Box>

                    : null}

                {/* Post-test end */}

                {/* Complete Result start */}
                {
                    pretest_status === 1 && posttest_status === 1 ?
                        <Box>
                            <Typography sx={{ mt: 1 }}>Online-Test Result</Typography>
                            <Sheet variant="outlined">
                                <Table variant="soft" borderAxis="bothBetween">
                                    <thead>
                                        <tr>
                                            <th>Topic</th>
                                            <th style={{ textTransform: "capitalize", }}> {training_topic_name.toLowerCase()}</th>
                                        </tr>
                                        <tr>
                                            <th>Pre-Test</th>
                                            <th style={{ textTransform: "capitalize", }}> {pretest}</th>
                                        </tr>
                                        <tr>
                                            <th>Pre-Test Mark</th>
                                            <th style={{ textTransform: "capitalize" }}> {mark}</th>
                                        </tr>
                                        <tr>
                                            <th>Post-Test</th>
                                            <th style={{ textTransform: "capitalize", }}> {posttest}</th>
                                        </tr>
                                        <tr>
                                            <th>Post-Test Mark</th>
                                            <th style={{ textTransform: "capitalize", }}> {postmark}</th>
                                        </tr>
                                        <tr>
                                            <th>Training Mode</th>
                                            <th style={{ textTransform: "capitalize", }}> {online}</th>
                                        </tr>
                                    </thead>
                                </Table>
                            </Sheet>
                            {retest === 1 ?
                                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 2 }}>
                                    <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>Your have Retest On the Topic</Typography>
                                    <Typography sx={{ fontFamily: "serif", color: "blue", fontWeight: "bold" }}>{training_topic_name} </Typography>
                                </Box>
                                : null
                            }
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, }}>
                                <Button sx={{ backgroundColor: "blue", color: "white", width: "80%" }} onClick={GotoLogin}>
                                    Close the window
                                </Button>
                            </Box>
                        </Box>

                        : null}
                {/* Complete Result end */}
            </Paper >
        </div >
    )
}

export default memo(EmpDetailsShow)
