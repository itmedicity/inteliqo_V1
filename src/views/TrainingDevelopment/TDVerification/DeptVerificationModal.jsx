import { Box, Button, Modal, ModalClose, ModalDialog, Sheet, Table, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import DeptPreMark from './DeptPreMark';
import DeptPostMark from './DeptPostMark';

const DeptVerificationModal = ({ open, Setopen, modalData, setcount, count }) => {

    const data = useMemo(() => modalData, [modalData])
    const { dept_name, sect_name, training_topic_name } = modalData[0];
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const Handleclose = useCallback((e) => {
        Setopen(false)
    }, [Setopen])

    const handleVerification = useCallback(async () => {
        const arr = data?.map((val) => {
            const obj = {
                tnd_verification_status: val.post_mark > 2 ? 1 : 0,
                tnd_verification_user: val.post_mark > 2 ? em_id : 0,
                edit_user: val.post_mark > 2 ? em_id : 0,
                slno: val.slno,
            }
            return obj
        })
        const result = await axioslogin.patch('/TrainingVerification/DeptVerification/list', arr)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            Setopen(false)
            setcount(count + 1)
        } else {
            warningNofity(message)
            Setopen(false)
        }
    }, [data, count, em_id, setcount, Setopen])

    const getColor = (val) => val === 1 ? '#C6EBC5' : '#F6F5F5'
    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={Handleclose}
            sx={{ display: 'flex' }}
        >
            <ModalDialog size="lg" sx={{ width: "70%" }}>
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body'
                    }}
                />
                <Typography
                    fontSize="xl2"
                    lineHeight={1}
                    sx={{ display: 'flex', alignItems: 'flex-start', mr: 1, color: "#9290C3" }}>
                    Verify & Submit
                </Typography>
                <Box sx={{ p: 0.5 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Box><Typography>Department:</Typography></Box>
                        <Box><Typography style={{ textTransform: "capitalize" }}> {dept_name?.toLowerCase()}</Typography></Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Box><Typography>Department Section:</Typography></Box>
                        <Box><Typography style={{ textTransform: "capitalize" }}>{sect_name?.toLowerCase()}</Typography></Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                        <Box><Typography>Topic:</Typography></Box>
                        <Box><Typography style={{ textTransform: "capitalize" }}>{training_topic_name?.toLowerCase()}</Typography></Box>
                    </Box>
                </Box>
                <CustmTypog title={"Departmental Training Details"} />
                <Sheet sx={{
                    overflow: 'auto',
                    '::-webkit-scrollbar': { display: "none" }, height: 200,
                    width: "100%"
                }}>
                    <Table borderAxis='both' stickyHeader>
                        <thead>
                            <tr style={{ background: "#F6F5F5" }} >
                                <th style={{ width: '5%', p: 1 }}>Slno</th>
                                <th>Em ID</th>
                                <th style={{ width: '20%' }}>Name</th>
                                <th>Date</th>
                                <th>Pre-Test Mark</th>
                                <th>Post-Test Mark</th>
                                <th>Duration (hr)</th>
                                <th>Approvals</th>
                            </tr>
                        </thead>
                        <tbody style={{ textTransform: "capitalize" }}>
                            {data?.map((row, ndx) => (
                                <tr key={ndx}
                                    style={{ backgroundColor: getColor(row?.tnd_verification_status) }}>
                                    <td>{row?.dept_verifn_slno}</td>
                                    <td>{row?.em_no}</td>
                                    <td>{row?.em_name.toLowerCase()}</td>
                                    <td>{row?.date}</td>
                                    {/* <td>{row?.pre_mark === null ? "Not Attended" : row?.pre_mark}</td> */}
                                    <td> <DeptPreMark emId={row?.emp_ID} scheduled_slno={row?.scheduled_slno} /> </td>
                                    <td> <DeptPostMark emId={row?.emp_ID} scheduled_slno={row?.scheduled_slno} /> </td>
                                    {/* <td>{row?.post_mark === null ? "Not Attended" : row?.post_mark}</td> */}
                                    <td>{row?.hours}</td>
                                    <td>{row?.tnd_verification_status === 1 ? "Verified" : "Not Verified"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Sheet>
                <Box sx={{ textAlign: "right", p: 0.5 }}>
                    <Button color="success" onClick={handleVerification}>
                        Verification
                    </Button>
                </Box>
            </ModalDialog>
        </Modal >
    )
}

export default memo(DeptVerificationModal) 
