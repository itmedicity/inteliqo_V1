import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { Checkbox } from '@mui/joy';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import HodDeptapvl from './HodDeptapvl';
import HODInductaprvl from './HODInductaprvl';

const HODApprovalsMain = () => {
    const [count, Setcount] = useState(0);
    const [InductionFlag, SetInductionFlag] = useState(true);
    const [Deprtmtl_flag, SetDeprtmtl_flag] = useState(false);

    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;


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
            <CustomLayout title="HOD Approvals" displayClose={true} >
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
                    {Deprtmtl_flag === true ? <HodDeptapvl em_id={em_id} Deprtmtl_flag={Deprtmtl_flag} Setcount={Setcount} count={count} /> : null}
                    {InductionFlag === true ? <HODInductaprvl em_id={em_id} InductionFlag={InductionFlag} Setcount={Setcount} count={count} /> : null}
                </Box>

            </CustomLayout>
        </Paper>
    )
}

export default memo(HODApprovalsMain)


