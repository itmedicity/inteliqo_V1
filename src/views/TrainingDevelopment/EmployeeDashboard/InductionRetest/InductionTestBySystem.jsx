
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

const InductionTestBySystem = ({ Selecteddata }) => {

    const selectdata = useMemo(() => Selecteddata, [Selecteddata])

    const history = useHistory()

    const [Viewdata, setViewData] = useState({
        dept_name: '',
        desg_name: '',
        em_name: '',
        sect_name: '',
        training_topic_name: '',
        em_no: 0,
        em_id: 0,
        re_questn_count: 0,
        topic_slno: 0,
        postmark: 0,
        retest: 0,
        training_status: 0,
        desg_slno: 0,
        retest_mark: 0,
        retest_status: 0,
        premark: 0

    });
    const { retest_slno, em_name, re_questn_count, em_id,
        topic_slno, training_topic_name, dept_name, em_no, desg_name, premark, postmark, pretest_status, posttest_status, training_status, retest_status, pretest, posttest, online, retest, retest_mark } = Viewdata;


    useEffect(() => {
        if (Object.keys(selectdata).length !== 0) {
            const { sn, retest_slno, retest_em_no, re_emp_dept, re_dept_sec, em_name, date, re_topic, re_attendance, re_questn_count, em_id,
                sect_id, sect_name, topic_slno, training_topic_name, dept_id, dept_name, em_no, desg_name, desg_slno, premark, postmark, pretest_status, posttest_status, online_mode, training_status, retest_status, retest_mark } = selectdata;
            const obj = {
                sn: sn,
                retest_slno: retest_slno,
                retest_em_no: retest_em_no,
                re_emp_dept: re_emp_dept,
                re_dept_sec: re_dept_sec,
                em_name: em_name,
                date: date,
                re_topic: re_topic,
                re_attendance: re_attendance,
                re_questn_count: re_questn_count,
                em_id: em_id,
                sect_id: sect_id,
                sect_name: sect_name,
                topic_slno: topic_slno,
                training_topic_name: training_topic_name,
                dept_id: dept_id,
                dept_name: dept_name,
                em_no: em_no,
                desg_name: desg_name,
                desg_slno: desg_slno,
                premark: premark,
                postmark: postmark,
                pretest_status: pretest_status,
                posttest_status: posttest_status,
                online_mode: online_mode,
                training_status: training_status,
                pretest: pretest_status === 1 ? "Yes" : " No",
                posttest: posttest_status === 1 ? "Yes" : " Not Attend",
                online: online_mode === 1 ? "Online" : "Offline",
                retest: retest_status === 1 ? "Yes" : " Not Attend",
                retest_mark: retest_mark,
                retest_status: retest_status
            }
            setViewData(obj);
        }
    }, [selectdata])

    const ClickToTest = useCallback(() => {
        if (training_status === 1 && retest_status === 0) {

            history.push(`/OnlineInductReTest/${retest_slno}/${em_id}/${topic_slno}/${re_questn_count}`)
        }
        else if (training_status === 1 && pretest_status === 1 && posttest_status === 1 && retest_status === 1) {
            warningNofity("Already Attend the Retest Test")
        }
    }, [retest_slno, em_id, history, topic_slno, re_questn_count, retest_status, training_status, pretest_status, posttest_status])

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
                </Paper >
            </Box>

        </div >
    )
}

export default memo(InductionTestBySystem)

