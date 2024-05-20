
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer } from 'react-toastify';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import { Box, Button, Sheet, Table, Typography } from '@mui/joy';

const TestBySystem = ({ Selecteddata }) => {

    const Selectdata = useMemo(() => Selecteddata, [Selecteddata])

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
        postmark: 0,
        retest: 0,
        training_status: 0,
        desg_slno: 0,
        candid_id: 0,
        retest_mark: 0
    });

    const { em_name, retest_quest_count, retest_sl_no, retest_status, topic_slno, training_topic_name, candid_id,
        dept_name, premark, postmark, retest_mark, pretest_status, posttest_status, training_status, em_no, desg_name, pretest, posttest, online, retest } = Viewdata;


    useEffect(() => {
        if (Object.keys(Selectdata).length !== 0) {
            const { sn, attendance_status, candidate_em_no, candidate_dept, candidate_dept_sec, em_name, retest_date, date, retest_mark, retest_quest_count, retest_sl_no, retest_status, retest_topic, sect_name, topic_slno, training_topic_name, candid_id, dept_id,
                dept_name, em_no, premark, postmark, pretest_status, posttest_status, online_mode, training_status, desg_name, desg_slno } = Selectdata;
            const obj = {
                sn: sn,
                em_no: em_no,
                training_status: training_status,
                attendance_status: attendance_status,
                candidate_em_no: candidate_em_no,
                candidate_dept: candidate_dept,
                candidate_dept_sec: candidate_dept_sec,
                em_name: em_name,
                retest_date: retest_date,
                date: date,
                retest_mark: retest_mark,
                retest_quest_count: retest_quest_count,
                retest_sl_no: retest_sl_no,
                retest_status: retest_status,
                retest_topic: retest_topic,
                sect_name: sect_name,
                topic_slno: topic_slno,
                training_topic_name: training_topic_name,
                candid_id: candid_id,
                dept_id: dept_id,
                dept_name: dept_name,
                premark: premark,
                postmark: postmark,
                pretest: pretest_status === 1 ? "Yes" : " No",
                posttest: posttest_status === 1 ? "Yes" : " Not Attend",
                online: online_mode === 1 ? "Online" : "Offline",
                desg_name: desg_name,
                desg_slno: desg_slno,
                retest: retest_status === 1 ? "Yes" : " Not Attend",
            }
            setViewData(obj);
        }
    }, [Selectdata, setViewData])

    const ClickToTest = useCallback(() => {
        if (training_status === 1 && retest_status === 0) {

            history.push(`/OnlineReTest/${retest_sl_no}/${candid_id}/${topic_slno}/${retest_quest_count}`)
        }
        else if (training_status === 1 && pretest_status === 1 && posttest_status === 1 && retest_status === 1) {
            warningNofity("Already Attend the Retest Test")
        }

    }, [retest_sl_no, candid_id, history, topic_slno, retest_quest_count, retest_status, training_status, pretest_status, posttest_status])

    //close the tab
    const closeTab = () => {
        history.push(`/Home`)
    };

    return (
        <div>
            <ToastContainer />
            <Box>
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
                    {
                        retest_status === 0 ?
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
                                                <th style={{ textTransform: "capitalize" }}> {premark}</th>
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

                                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, }}>
                                    <Button sx={{ backgroundColor: "blue", color: "white", width: "50%" }} onClick={ClickToTest}>
                                        START RE-TEST
                                    </Button>
                                </Box>
                            </Box>

                            : null}
                    {
                        retest_status === 1 ?
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
                                                <th style={{ textTransform: "capitalize" }}> {premark}</th>
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
                                                <th>Re-Test Status</th>
                                                <th style={{ textTransform: "capitalize", }}> {retest}</th>
                                            </tr>
                                            <tr>
                                                <th>Re-Test Mark</th>
                                                <th style={{ textTransform: "capitalize", }}> {retest_mark}</th>
                                            </tr>
                                            <tr>
                                                <th>Training Mode</th>
                                                <th style={{ textTransform: "capitalize", }}> {online}</th>
                                            </tr>
                                        </thead>
                                    </Table>
                                </Sheet>

                                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, }}>
                                    <Button sx={{ backgroundColor: "blue", color: "white", width: "80%" }} onClick={closeTab}>
                                        Close the window
                                    </Button>
                                </Box>
                            </Box>

                            : null}
                    {/* Complete Result end */}
                </Paper >
            </Box>

        </div >
    )
}

export default memo(TestBySystem)
