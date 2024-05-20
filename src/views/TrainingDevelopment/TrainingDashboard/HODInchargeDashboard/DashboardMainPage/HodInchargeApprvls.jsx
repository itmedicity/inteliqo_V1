import { Box, Tooltip, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import React, { Fragment, memo, useEffect, useState } from 'react'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { axioslogin } from 'src/views/Axios/Axios';

const HodInchargeApprvls = ({ em_id }) => {

    const [TrainerInductApproved, SetInductTrainerApproved] = useState(0)
    const [TrainerInductPending, SetTrainerInductPending] = useState(0)
    const [HodInductApproved, SetHodInductApproved] = useState(0)
    const [HodInductPending, SetHodInductPending] = useState(0)

    const [TrainerDeptApproved, SetDeptTrainerApproved] = useState(0)
    const [TrainerDeptPending, SetTrainerDeptPending] = useState(0)
    const [HodDeptApproved, SetHodDeptApproved] = useState(0)
    const [HodDeptPending, SetHodDeptPending] = useState(0)

    useEffect(() => {
        const obj = {
            em_id: em_id,
        }
        const InductApprvls = async () => {
            const results = await axioslogin.post('/TrainingDashboard/commonInductAprvlcount', obj)
            const { success, data } = results.data
            if (success === 1) {
                const displayData = data?.map((val) => {
                    const obj = {
                        trainer_induct_apprvl_status: val.trainer_induct_apprvl_status,
                        training_status: val.training_status,
                        posttest_status: val.posttest_status,
                        training_induct_hod_aprvl_status: val.training_induct_hod_aprvl_status
                    }
                    return obj
                })
                const trainerApprvls = displayData.filter(val => val.trainer_induct_apprvl_status === 1);
                const trainerApprvlslen = trainerApprvls?.length
                SetInductTrainerApproved(trainerApprvlslen);
                const TrainerPending = displayData.filter(val => val.trainer_induct_apprvl_status === 0);
                const TrainerApprvlslen = TrainerPending?.length
                SetTrainerInductPending(TrainerApprvlslen);


                const HodApprvls = displayData.filter(val => val.training_induct_hod_aprvl_status === 1);
                const HodApprvlslen = HodApprvls?.length
                SetHodInductApproved(HodApprvlslen);
                const HodPending = displayData.filter(val => val.training_induct_hod_aprvl_status === 0 && val.trainer_induct_apprvl_status === 1);
                const HodPendinglen = HodPending?.length
                SetHodInductPending(HodPendinglen);
            }
            else {
                SetInductTrainerApproved(0);
                SetTrainerInductPending(0)
                SetHodInductApproved(0)
                SetHodInductPending(0)
            }
        }
        InductApprvls()

        const DeptApprvls = async () => {
            const results = await axioslogin.post('/TrainingDashboard/commonDeptAprvlcount', obj)
            const { success, data } = results.data
            if (success === 1) {
                const displayData = data?.map((val) => {
                    const obj = {
                        training_apprvl_status: val.training_apprvl_status,
                        training_hod_apprvls_status: val.training_hod_apprvls_status
                    }
                    return obj
                })
                const trainerApprvls = displayData.filter(val => val.training_apprvl_status === 1);
                const trainerApprvlslen = trainerApprvls?.length
                SetDeptTrainerApproved(trainerApprvlslen);
                const TrainerPending = displayData.filter(val => val.training_apprvl_status === 0);
                const TrainerApprvlslen = TrainerPending?.length
                SetTrainerDeptPending(TrainerApprvlslen);

                const HodApprvls = displayData.filter((val) => val.training_hod_apprvls_status === 1);
                const HodApprvlslen = HodApprvls?.length
                SetHodDeptApproved(HodApprvlslen);
                const HodPending = displayData.filter(val => val.training_apprvl_status === 1 && val.training_hod_apprvls_status === 0);
                const HodPendinglen = HodPending?.length
                SetHodDeptPending(HodPendinglen);

            }
            else {
                SetDeptTrainerApproved(0);
                SetTrainerDeptPending(0)
                SetHodDeptApproved(0)
                SetHodDeptPending(0)
            }
        }
        DeptApprvls()
    }, [em_id, SetInductTrainerApproved, SetTrainerInductPending, SetHodInductApproved, SetHodInductPending, SetDeptTrainerApproved, SetHodDeptApproved, SetHodDeptPending])
    return (
        <Fragment>
            <Paper elevation={0} sx={{ flex: 1, boxShadow: 4, p: 1, backgroundColor: "#FFFFFF" }}>
                <h5>Approvals</h5>

                <Box sx={{ mt: 3 }}>
                    <Typography sx={{ mt: 2 }}><u>HOD Approvals</u></Typography>
                    <Box sx={{
                        mt: 1,
                        display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"
                    }}>
                        <Box sx={{ flex: 1, mt: 1 }}> <VerifiedOutlinedIcon color="secondary" /> Induction Wise</Box>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flex: 1, justifyContent: "space-between" }}>
                            <Tooltip title="Approval Count">
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#7D1E6A", backgroundColor: "#7D1E6A", textAlign: "center" }} >
                                        <Typography sx={{ color: "#F6F6C9" }}>{HodInductApproved !== null ? HodInductApproved : 0}</Typography>
                                    </Box>
                                </Box>
                            </Tooltip>

                            <Tooltip title="Pending Count">
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#153462", backgroundColor: "#153462", textAlign: "center" }} >
                                        <Typography sx={{ color: "#F6F6C9" }}>{HodInductPending !== null ? HodInductPending : 0}</Typography>
                                    </Box>
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                        <Box sx={{ flex: 1, mt: 1 }}> <VerifiedOutlinedIcon color="secondary" /> Departmental Wise</Box>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flex: 1, justifyContent: "space-between" }}>
                            <Tooltip title="Approval Count">
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#153462", backgroundColor: "#153462", textAlign: "center" }} >
                                        <Typography sx={{ color: "#F6F6C9" }}>{HodDeptApproved !== null ? HodDeptApproved : 0}</Typography>
                                    </Box>
                                </Box>
                            </Tooltip>

                            <Tooltip title="Pending Count">
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#7D1E6A", backgroundColor: "#7D1E6A", textAlign: "center" }} >
                                        <Typography sx={{ color: "#F6F6C9" }}>{HodDeptPending !== null ? HodDeptPending : 0}</Typography>
                                    </Box>
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>



                <Box sx={{ mt: 3 }}>
                    <Typography sx={{ mt: 2 }}><u>Trainer Approvals</u></Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                        <Box sx={{ flex: 1, mt: 2 }}> <VerifiedOutlinedIcon color="secondary" /> Induction Wise</Box>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flex: 1, justifyContent: "space-between" }}>
                            <Tooltip title="Approval Count">
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#7D1E6A", backgroundColor: "#7D1E6A", textAlign: "center" }} >
                                        <Typography sx={{ color: "#F6F6C9" }}>{TrainerInductApproved !== null ? TrainerInductApproved : 0}</Typography>
                                    </Box>
                                </Box>
                            </Tooltip>

                            <Tooltip title="Pending Count">
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#153462", backgroundColor: "#153462", textAlign: "center" }} >
                                        <Typography sx={{ color: "#F6F6C9" }}>{TrainerInductPending !== null ? TrainerInductPending : 0}</Typography>
                                    </Box>
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                        <Box sx={{ flex: 1, mt: 1 }}> <VerifiedOutlinedIcon color="secondary" /> Departmental Wise</Box>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flex: 1, justifyContent: "space-between" }}>
                            <Tooltip title="Approval Count">
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#153462", backgroundColor: "#153462", textAlign: "center" }} >
                                        <Typography sx={{ color: "#F6F6C9" }}>{TrainerDeptApproved !== null ? TrainerDeptApproved : 0}</Typography>
                                    </Box>
                                </Box>
                            </Tooltip>

                            <Tooltip title="Pending Count">
                                <Box sx={{ mt: 1 }}>
                                    <Box sx={{ width: 50, border: 1, borderRadius: 10, borderColor: "#7D1E6A", backgroundColor: "#7D1E6A", textAlign: "center" }} >
                                        <Typography sx={{ color: "#F6F6C9" }}>{TrainerDeptPending !== null ? TrainerDeptPending : 0}</Typography>
                                    </Box>
                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Fragment >
    )
}


export default memo(HodInchargeApprvls) 
