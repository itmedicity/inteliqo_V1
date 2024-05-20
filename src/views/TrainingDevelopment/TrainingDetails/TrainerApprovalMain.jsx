import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TrainerApprovals, TrainerApprovalsInduct } from 'src/redux/actions/Training.Action';
import _ from 'underscore';
import { Checkbox } from '@mui/joy';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import TrainerDeptAprvl from './TrainerDeptAprvl';
import TrainerInductAprvls from './TrainerInductAprvls';

const TrainerApprovalMain = () => {

    const [count, Setcount] = useState(0);
    const [InductionFlag, SetInductionFlag] = useState(true);
    const [Deprtmtl_flag, SetDeprtmtl_flag] = useState(false);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id, hod } = employeeProfileDetl;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(TrainerApprovals(em_id))
        dispatch(TrainerApprovalsInduct(em_id))
        Setcount(0)
    }, [dispatch, em_id, Setcount, count])


    const HandleDept = useCallback((e) => {
        if (e.target.checked === true) {
            SetDeprtmtl_flag(e.target.checked)
            SetInductionFlag(false);
        }
        else {
            SetDeprtmtl_flag(false)
            SetInductionFlag(false);
        }
    }, [SetDeprtmtl_flag, SetInductionFlag])


    const HandleInduction = useCallback((e) => {
        if (e.target.checked === true) {
            SetInductionFlag(e.target.checked)
            SetDeprtmtl_flag(false);
        }
        else {
            SetDeprtmtl_flag(false)
            SetInductionFlag(false);
        }
    }, [SetDeprtmtl_flag, SetInductionFlag])


    return (
        <Paper elevation={0}>
            <CustomLayout title="Trainer Approvals" displayClose={true} >
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-evenly", p: 2, backgroundColor: "#C7C8CC" }}>
                        <Box sx={{ mt: 1 }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={InductionFlag}
                                className="ml-1"
                                onChange={(e) => HandleInduction(e)}
                                label="Induction"
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={Deprtmtl_flag}
                                className="ml-1"
                                onChange={(e) => HandleDept(e)}
                                label="Departmental"
                            />
                        </Box>
                    </Box>

                    {Deprtmtl_flag === true ? <TrainerDeptAprvl em_id={em_id} hod={hod} Deprtmtl_flag={Deprtmtl_flag} Setcount={Setcount} count={count} /> : null}
                    {InductionFlag === true ? <TrainerInductAprvls em_id={em_id} hod={hod} InductionFlag={InductionFlag} Setcount={Setcount} count={count} /> : null}
                </Box>

            </CustomLayout>
        </Paper>
    )
}

export default memo(TrainerApprovalMain)
