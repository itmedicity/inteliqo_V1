import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer } from 'react-toastify';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import { Box, Button, Sheet, Table, Typography } from '@mui/joy';

const RetestdoneBySystem = ({ Selecteddata }) => {

    const history = useHistory()

    const [Viewdata, setViewData] = useState({
        sn: 0,
        retest_sl_no: 0,
        candidate_em_no: '',
        candidate_dept: 0,
        candidate_dept_sec: 0,
        retest_date: '',
        retest_topic: 0,
        attendance_status: 0,
        retest_quest_count: 0,
        retest_status: 0,
        retest_mark: 0,
        candid_id: 0,
        em_name: '',
        topic_slno: 0,
        training_topic_name: '',
        dept_id: 0,
        dept_name: '',
        sect_id: 0,
        sect_name: '',
        online_mode: 0,
        premark: 0,
        postmark: 0,
        pretest_status: 0,
        posttest_status: 0
    });
    const { candidate_em_no, retest_quest_count, candid_id, em_name, topic_slno, training_topic_name, dept_name, premark, postmark, pretest_status, posttest_status, online, pretest, posttest } = Viewdata;

    useEffect(() => {
        if (Object.keys(Selecteddata).length !== 0) {
            const { sn, retest_sl_no, candidate_em_no, candidate_dept, candidate_dept_sec, retest_date, retest_topic, attendance_status, retest_quest_count, retest_status, retest_mark, candid_id, em_name, topic_slno, training_topic_name, dept_id, dept_name, sect_id, sect_name, online_mode, premark, postmark, pretest_status, posttest_status } = Selecteddata[0];
            const obj = {
                sn: sn,
                retest_sl_no: retest_sl_no,
                candidate_em_no: candidate_em_no,
                candidate_dept: candidate_dept,
                candidate_dept_sec: candidate_dept_sec,
                retest_date: retest_date,
                retest_topic: retest_topic,
                attendance_status: attendance_status,
                retest_quest_count: retest_quest_count,
                retest_status: retest_status,
                retest_mark: retest_mark,
                candid_id: candid_id,
                em_name: em_name,
                topic_slno: topic_slno,
                training_topic_name: training_topic_name,
                dept_id: dept_id,
                dept_name: dept_name,
                sect_id: sect_id,
                sect_name: sect_name,
                premark: premark,
                postmark: postmark,
                pretest: pretest_status === 1 ? "Yes" : " No",
                posttest: posttest_status === 1 ? "Yes" : " Not Attend",
                online: online_mode === 1 ? "Online" : "Offline",

            }
            setViewData(obj);
        }
    }, [Selecteddata, setViewData])


    const ClickToReTest = useCallback(() => {
        if (pretest_status === 1 && posttest_status === 0) {
            history.push(`/OnlinePostTest/${candidate_em_no}/${candid_id}/${topic_slno}/${retest_quest_count}`)
        }
        else if (pretest_status === 1 && posttest_status === 1) {
            warningNofity("Already Attend the Online Test")
        }

    }, [candidate_em_no, candid_id, history, topic_slno, retest_quest_count, pretest_status, posttest_status])

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
                                {dept_name?.toLowerCase()}
                            </Typography>
                            <Typography textColor="text.secondary"
                                sx={{ fontFamily: "serif" }}
                                startDecorator={<NumbersOutlinedIcon fontSize='md' color='primary' />}
                            >
                                {candidate_em_no}
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Paper >
            <Paper elevation={0} sx={{ p: 1 }}>

                <Box>
                    {
                        pretest_status === 1 ?

                            <Box>
                                <Typography sx={{ mt: 1 }}>Online-Test Result</Typography>
                                <Sheet variant="outlined">
                                    <Table variant="soft" borderAxis="bothBetween">
                                        <thead>
                                            <tr>
                                                <th>Topic</th>
                                                <th style={{ textTransform: "capitalize", }}>
                                                    {training_topic_name.toLowerCase()}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>Pre-Test</th>
                                                <th style={{ textTransform: "capitalize", }}>
                                                    {pretest}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>Pre-Test Mark</th>
                                                <th style={{ textTransform: "capitalize" }}>
                                                    {premark}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>Post-Test</th>
                                                <th style={{ textTransform: "capitalize", }}>
                                                    {posttest}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>Post-Test Mark</th>
                                                <th style={{ textTransform: "capitalize", }}>
                                                    {postmark}
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>Training Mode</th>
                                                <th style={{ textTransform: "capitalize", }}>
                                                    {online}
                                                </th>
                                            </tr>
                                        </thead>
                                    </Table>
                                </Sheet>
                            </Box>
                            : null}
                </Box>
                <Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mt: 2 }}>
                        <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>Your Topic is </Typography>
                        <Typography sx={{ fontFamily: "serif", color: "blue", fontWeight: "bold" }}>
                            {training_topic_name}
                        </Typography>
                    </Box>
                    <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>Click START button to attend the Test</Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, }}>
                        <Button sx={{ backgroundColor: "blue", color: "white", width: "80%" }}
                            onClick={ClickToReTest}
                        >
                            START
                        </Button>
                    </Box>
                </Box>
                {/* } */}
            </Paper >
            <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1, mt: 1 }}>
                <Typography sx={{ fontFamily: "serif", color: "red", fontSize: "sm", textDecoration: "underline" }}>NB:Carefully Read the following instructions: </Typography>
                <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* Make sure you have good internet connection</Typography>
                <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* 60 seconds alloted to each question.</Typography>
                <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* Below average score Employees should Attend the retest</Typography>
                <Typography sx={{ fontFamily: "serif", fontSize: "sm" }}>* If you cannot finish a question within the given time,You can automatically goes to the next question</Typography>
            </Box>
        </div >
    )
}

export default memo(RetestdoneBySystem) 
