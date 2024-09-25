import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import _ from 'underscore';
import { Checkbox } from '@mui/joy';
import InductionCompletedList from './InductionCompletedList';
import ReportLayout from '../../ReportComponent/ReportLayout';
import InductionPendingList from './InductionPendingList';

const CompletedAndPendingStaffList = () => {

    const [count, Setcount] = useState(0);
    const [CompletedFlag, SetCompletedFlag] = useState(true);
    const [PendingFlag, SetPendingFlag] = useState(false);
    const [CompleteList, setCompleteList] = useState([]);
    const [PendingList, setPendingList] = useState([]);

    const HandlePendingList = useCallback((e) => {
        if (e.target.checked === true) {
            SetPendingFlag(e.target.checked)
            SetCompletedFlag(false);
        }
        else {
            SetPendingFlag(false)
            SetCompletedFlag(false);
        }
    }, [SetPendingFlag, SetCompletedFlag])


    const HandleCompletedList = useCallback((e) => {
        if (e.target.checked === true) {
            SetCompletedFlag(e.target.checked)
            SetPendingFlag(false);
        }
        else {
            SetPendingFlag(false)
            SetCompletedFlag(false);
        }
    }, [SetPendingFlag, SetCompletedFlag])

    return (
        <Paper elevation={0}>
            <ReportLayout title="Induction Training Reports" data={CompleteList} displayClose={true} >
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-evenly", p: 1, backgroundColor: "#304463" }}>
                        <Box sx={{ mt: 1, }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={CompletedFlag}
                                className="ml-1"
                                onChange={(e) => HandleCompletedList(e)}
                                label="Completed List"
                                sx={{ color: "white" }}
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={PendingFlag}
                                className="ml-1"
                                onChange={(e) => HandlePendingList(e)}
                                label="Pending List"
                                sx={{ color: "white" }}
                            />
                        </Box>
                    </Box>
                    {CompletedFlag === true ? <InductionCompletedList CompletedFlag={CompletedFlag} Setcount={Setcount} count={count} CompleteList={CompleteList} setCompleteList={setCompleteList} /> : null}
                    {PendingFlag === true ? <InductionPendingList PendingList={PendingList} setPendingList={setPendingList} PendingFlag={PendingFlag} Setcount={Setcount} count={count} /> : null}
                </Box>
            </ReportLayout>
        </Paper>
    )
}
export default memo(CompletedAndPendingStaffList) 
