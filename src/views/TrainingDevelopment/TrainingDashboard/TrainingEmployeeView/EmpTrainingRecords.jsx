import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { Checkbox, Sheet, Table, Typography } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { format } from 'date-fns';

const EmpTrainingRecords = () => {

    const [InductionFlag, SetInductionFlag] = useState(false);
    const [Deprtmtl_flag, SetDeprtmtl_flag] = useState(false);
    const [data, Setdata] = useState([])
    const [deptdata, SetDeptdata] = useState([])

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const HandleInduction = useCallback((e) => {
        if (e.target.checked === true) {
            SetInductionFlag(e.target.checked)
            const getData = async () => {
                const result = await axioslogin.get(`/TrainingRecord/getInducttrainings/${em_id}`)
                const { success, data } = result.data
                if (success === 2) {
                    Setdata(data)
                } else {
                    Setdata([])
                }
            }
            getData()
            SetDeprtmtl_flag(false);
        }
        else {
            SetDeprtmtl_flag(false)
            SetInductionFlag(false);
        }
    }, [SetDeprtmtl_flag, SetInductionFlag, Setdata, em_id])

    const HandleDept = useCallback((e) => {
        if (e.target.checked === true) {
            SetDeprtmtl_flag(e.target.checked)
            const obj = {
                pre_id: em_id,
                post_id: em_id,
                emp_id: em_id
            }
            const getDeptData = async () => {
                const result = await axioslogin.post(`/TrainingRecord/getDeptTraining`, obj)
                const { success, data } = result.data
                if (success === 2) {
                    SetDeptdata(data)
                } else {
                    SetDeptdata([])
                }
            }
            // const getDeptData = async () => {
            //     const result = await axioslogin.get(`/TrainingRecord/getDeptTraining/${em_id}`)
            //     const { success, data } = result.data
            //     if (success === 2) {
            //         SetDeptdata(data)
            //     } else {
            //         SetDeptdata([])
            //     }
            // }
            getDeptData()
            SetInductionFlag(false);
        }
        else {
            SetDeprtmtl_flag(false)
            SetInductionFlag(false);
        }
    }, [SetDeprtmtl_flag, SetInductionFlag, SetDeptdata, em_id])

    return (
        <Paper elevation={0}>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-evenly", p: 2, backgroundColor: "#DDE6ED" }}>
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
                </Box>

                {InductionFlag === true ?
                    <Box>
                        {data.length !== 0 ?
                            <Sheet sx={{
                                overflow: 'auto',
                                '::-webkit-scrollbar': { display: "none" }, height: 700,
                                width: "100%"
                            }}>
                                <Table borderAxis='both' stickyHeader>
                                    <thead>
                                        <tr style={{ background: "#F6F5F5" }} >
                                            <th style={{ width: '5%', textAlign: "center" }}>Slno</th>
                                            <th style={{ width: '30%', textAlign: "center" }}>Topic</th>
                                            <th style={{ textAlign: "center" }}> Scheduled Date</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Pre-Test Mark</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Post-Test Mark</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Duration (hr)</th>
                                            <th>Approval status</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ textTransform: "capitalize" }}>
                                        {data.map((row, ndx) => (
                                            <tr key={ndx}>
                                                <td style={{ width: '5%', textAlign: "center" }}>{row?.view_slno}</td>
                                                <td style={{ width: '30%' }}>{row?.training_topic_name === null ? "Not updated" : row?.training_topic_name.toLowerCase()}</td>
                                                <td style={{ textAlign: "center" }}>{format(new Date(row?.induction_date), "dd-MM-yyyy")}</td>
                                                <td style={{ textAlign: "center" }}>{row?.pre_mark === null ? "Not Attended" : row?.pre_mark}</td>
                                                <td style={{ textAlign: "center" }}>{row?.post_mark === null ? "Not Attended" : row?.post_mark}</td>
                                                <td style={{ textAlign: "center" }}>{row?.hours}</td>
                                                <td>{row?.training_iduct_tnd_verify_status === 0 ? "Approval Pending" : "Approved"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Sheet>
                            : <Typography sx={{ mt: 1, textAlign: "center" }}>No Data</Typography>
                        }
                    </Box>
                    : null}

                {Deprtmtl_flag === true ?
                    <Box>
                        {deptdata?.length !== 0 ?
                            <Sheet sx={{
                                overflow: 'auto',
                                '::-webkit-scrollbar': { display: "none" }, height: 700,
                                width: "100%"
                            }}>
                                <Table borderAxis='both' stickyHeader>
                                    <thead>
                                        <tr style={{ background: "#F6F5F5" }} >
                                            <th style={{ width: '5%', textAlign: "center" }}>Slno</th>
                                            <th style={{ width: '30%', textAlign: "center" }}>Topic</th>
                                            <th style={{ textAlign: "center" }}> Scheduled Date</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Pre-Test Mark</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Post-Test Mark</th>
                                            <th style={{ width: '10%', textAlign: "center" }}>Duration (hr)</th>
                                            <th>Approval status</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ textTransform: "capitalize" }}>
                                        {deptdata?.map((row, ndx) => (
                                            <tr key={ndx}>
                                                <td style={{ width: '5%', textAlign: "center" }}>{row?.view_slno}</td>
                                                <td style={{ width: '30%' }}>{row?.training_topic_name === null ? "Not updated" : row?.training_topic_name.toLowerCase()}</td>
                                                <td style={{ textAlign: "center" }}>{format(new Date(row?.schedule_date), "dd-MM-yyyy")}</td>
                                                <td style={{ textAlign: "center" }}>{row?.pre_mark === null ? "Not Attended" : row?.pre_mark}</td>
                                                <td style={{ textAlign: "center" }}>{row?.post_mark === null ? "Not Attended" : row?.post_mark}</td>
                                                <td style={{ textAlign: "center" }}>{row?.hours}</td>
                                                <td>{row?.tnd_verification_status === 0 ? "Approval Pending" : "Approved"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Sheet>
                            : <Typography sx={{ mt: 1, textAlign: "center" }}>No Data</Typography>
                        }
                    </Box>
                    :
                    null}
            </Box>
        </Paper>
    )
}

export default memo(EmpTrainingRecords) 
