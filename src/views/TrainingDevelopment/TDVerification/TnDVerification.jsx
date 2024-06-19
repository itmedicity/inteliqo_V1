import { Box, Checkbox } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import TDVerificationMainPage from './TDVerificationMainPage';
import TndDeptVerificationMain from './TndDeptVerificationMain';

const TnDVerification = () => {
    const [InductionFlag, SetInductionFlag] = useState(true);
    const [Deprtmtl_flag, SetDeprtmtl_flag] = useState(false);

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
            <CustomLayout title="T&D Verification" displayClose={true} >
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

                    {InductionFlag === true ? <TDVerificationMainPage /> : null}
                    {Deprtmtl_flag === true ? <TndDeptVerificationMain /> : null}
                </Box>

            </CustomLayout>
        </Paper>
    )
}

export default memo(TnDVerification) 
