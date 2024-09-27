import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import _ from 'underscore';
import { Checkbox } from '@mui/joy';
import InductionCompletedList from './InductionCompletedList';
import ReportLayout from '../../ReportComponent/ReportLayout';
import InductionPendingList from './InductionPendingList';
import EmployeePassedList from './EmployeePassedList';
import EmployeeFailedList from './EmployeeFailedList';

const CompletedAndPendingStaffList = () => {

    const [count, Setcount] = useState(0);
    const [CompletedFlag, SetCompletedFlag] = useState(true);
    const [PendingFlag, SetPendingFlag] = useState(false);
    const [CompleteList, setCompleteList] = useState([]);
    const [PendingList, setPendingList] = useState([]);
    const [flag, SetFlag] = useState(0);
    const [Success_flag, Setsuccess_flag] = useState(false);
    const [Falied_flag, SetFalied_flag] = useState(false);
    const [Success_emps, setSuccess_emps] = useState([]);
    const [Failed_emps, setFailed_emps] = useState([]);

    const HandlePendingList = useCallback((e) => {
        if (e.target.checked === true) {
            SetPendingFlag(e.target.checked)
            SetCompletedFlag(false);
            Setsuccess_flag(false)
            SetFalied_flag(false)
        }
        else {
            SetPendingFlag(false)
            SetCompletedFlag(false);
            Setsuccess_flag(false)
            SetFalied_flag(false)
        }
    }, [SetPendingFlag, SetCompletedFlag, Setsuccess_flag, SetFalied_flag])


    const HandleCompletedList = useCallback((e) => {
        if (e.target.checked === true) {
            SetCompletedFlag(e.target.checked)
            SetPendingFlag(false);
        }
        else {
            SetPendingFlag(false)
            SetCompletedFlag(false);
            Setsuccess_flag(false)
            SetFalied_flag(false)
        }
    }, [SetPendingFlag, SetCompletedFlag, Setsuccess_flag, SetFalied_flag])

    const HandleSuccessList = useCallback((e) => {
        if (e.target.checked === true) {
            Setsuccess_flag(e.target.checked)
            SetPendingFlag(false)
            SetCompletedFlag(false);
            SetFalied_flag(false)
        }
        else {
            SetPendingFlag(false)
            SetCompletedFlag(false);
            Setsuccess_flag(false)
            SetFalied_flag(false)
        }
    }, [SetPendingFlag, SetCompletedFlag, Setsuccess_flag, SetFalied_flag])

    const HandleFailedList = useCallback((e) => {
        if (e.target.checked === true) {
            SetFalied_flag(e.target.checked)
            SetPendingFlag(false)
            SetCompletedFlag(false);
            Setsuccess_flag(false)
        }
        else {
            SetPendingFlag(false)
            SetCompletedFlag(false);
            Setsuccess_flag(false)
            SetFalied_flag(false)
        }
    }, [SetPendingFlag, SetCompletedFlag, Setsuccess_flag, SetFalied_flag])

    return (
        <Paper elevation={0}>
            <ReportLayout title="Induction Training Reports" data={flag === 1 ? CompleteList : flag === 2 ? PendingList : flag === 3 ? Success_emps : flag === 4 ? Failed_emps : []} displayClose={true} >
                <Box sx={{ width: "100%" }}>
                    {/* <Box sx={{ display: "flex", justifyContent: "space-evenly", p: 1, backgroundColor: "#232D3F",bgcolor: "#92A9BD"  }}> */}
                    <Box sx={{ display: "flex", justifyContent: "space-evenly", p: 1, bgcolor: "#B5C0D0" }}>

                        <Box sx={{ mt: 1, }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={CompletedFlag}
                                className="ml-1"
                                onChange={(e) => HandleCompletedList(e)}
                                label="Completed List"
                                variant="plain"
                                sx={{
                                    // Default icon color when unchecked
                                    '& .MuiSvgIcon-root': {
                                        color: '#0B2F9F'
                                    },
                                    // Icon color when checked
                                    '&.Mui-checked .MuiSvgIcon-root': {
                                        color: '#0B2F9F'
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Checkbox
                                checked={PendingFlag}
                                onChange={(e) => HandlePendingList(e)}
                                label="Pending List"
                                variant="plain"
                                sx={{
                                    // Default icon color when unchecked
                                    '& .MuiSvgIcon-root': {
                                        color: '#0B2F9F'
                                    },
                                    // Icon color when checked
                                    '&.Mui-checked .MuiSvgIcon-root': {
                                        color: '#0B2F9F'
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mt: 1, }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={Success_flag}
                                className="ml-1"
                                onChange={(e) => HandleSuccessList(e)}
                                label="Employees Who Passed the Exams"
                                variant="plain"
                                sx={{
                                    // Default icon color when unchecked
                                    '& .MuiSvgIcon-root': {
                                        color: '#0B2F9F'
                                    },
                                    // Icon color when checked
                                    '&.Mui-checked .MuiSvgIcon-root': {
                                        color: '#0B2F9F'
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mt: 1, }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={Falied_flag}
                                className="ml-1"
                                onChange={(e) => HandleFailedList(e)}
                                label="Employees Needing Exam Retakes"
                                variant="plain"
                                sx={{
                                    // Default icon color when unchecked
                                    '& .MuiSvgIcon-root': {
                                        color: '#0B2F9F'
                                    },
                                    // Icon color when checked
                                    '&.Mui-checked .MuiSvgIcon-root': {
                                        color: '#0B2F9F'
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                    {CompletedFlag === true ? <InductionCompletedList SetFlag={SetFlag} CompletedFlag={CompletedFlag} Setcount={Setcount} count={count} CompleteList={CompleteList} setCompleteList={setCompleteList} /> : null}
                    {PendingFlag === true ? <InductionPendingList SetFlag={SetFlag} PendingList={PendingList} setPendingList={setPendingList} PendingFlag={PendingFlag} Setcount={Setcount} count={count} /> : null}
                    {Success_flag === true ? <EmployeePassedList SetFlag={SetFlag} Success_emps={Success_emps} setSuccess_emps={setSuccess_emps} Success_flag={Success_flag} Setcount={Setcount} count={count} /> : null}
                    {Falied_flag === true ? <EmployeeFailedList SetFlag={SetFlag} Failed_emps={Failed_emps} setFailed_emps={setFailed_emps} Falied_flag={Falied_flag} Setcount={Setcount} count={count} /> : null}

                </Box>
            </ReportLayout>
        </Paper>
    )
}
export default memo(CompletedAndPendingStaffList) 
