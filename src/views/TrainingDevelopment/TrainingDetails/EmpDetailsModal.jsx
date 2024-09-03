import { Box, Modal, ModalClose, ModalDialog, Table, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import TraineerDetail from './TraineerDetail';
import InductTraineerDetail from './InductTraineerDetail';

const EmpDetailsModal = ({ open, Setopen, selected }) => {

    const [InductionData, SetInductionData] = useState([])
    const [ShowInductionData, SetShowInductionData] = useState([])
    const [DepartData, SetDepartData] = useState([])
    const [ShowDepartData, SetShowDepartData] = useState([])
    const [EmpDetails, SetEmpDetails] = useState({
        em_name: '',
        em_no: 0,
        em_id: 0,
        dept_name: '',
        sect_name: '',
        desg_name: ''
    })
    const { em_name, em_no, em_id, dept_name, sect_name, desg_name } = EmpDetails;

    const Handleclose = useCallback((e) => {
        Setopen(false)
    }, [Setopen])

    useEffect(() => {
        if (selected?.length !== 0) {
            const viewData = selected?.find((val) => val.em_id !== 0)
            const { em_name, em_no, em_id, dept_name, sect_name, desg_name } = viewData;
            const obj = {
                em_name: em_name,
                em_no: em_no,
                em_id: em_id,
                dept_name: dept_name,
                sect_name: sect_name,
                desg_name: desg_name
            }
            SetEmpDetails(obj);
        }
    }, [selected, SetEmpDetails])

    //get Induction details
    useEffect(() => {
        const GetData = (async () => {
            if (em_id !== 0) {
                const emid = parseInt(em_id)
                const result = await axioslogin.get(`/TrainingDetails/getInduct/${emid}`)
                const { success, data } = result.data;
                if (success === 2) {
                    SetInductionData(data)
                }
                else {
                    SetInductionData([])
                }
            }
        })
        GetData()
    }, [em_id, SetInductionData])


    //get Departmental details
    useEffect(() => {
        const GetData = (async () => {
            if (em_id !== 0) {
                const emid = parseInt(em_id)
                const obj = {
                    emid: emid,
                    preId: emid,
                    postId: emid
                }
                // const result = await axioslogin.get(`/TrainingDetails/getDepartmental/${emid}`)
                const result = await axioslogin.post(`/TrainingDetails/getDepartmental`, obj)
                const { success, data } = result.data;
                if (success === 2) {
                    SetDepartData(data)
                }
                else {
                    SetDepartData([])
                }
            }
        })
        GetData()
    }, [em_id, SetDepartData])

    useEffect(() => {
        const Induct = InductionData?.map((val) => {
            const object = {
                em_id: val.em_id,
                em_no: val.em_no,
                indct_emp_no: val.indct_emp_no,
                trainers: val.trainers,
                induct_post_mark: val.induct_post_mark,
                induct_pre_mark: val.induct_pre_mark,
                induct_quest_count: val.induct_quest_count,
                induct_retest_mark: val.induct_retest_mark,
                int_slno: val.int_slno,
                pretest_status: val.pretest_status,
                retest: val.retest,
                schedule_no: val.schedule_no,
                schedule_topic: val.schedule_topic,
                schedule_type: val.schedule_type,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                posttest_status: val.posttest_status,
                induction_date: moment(val.induction_date).format("DD-MM-YYYY"),
                allowPrepost: val.posttest_status === 1 ? "Yes" : "No",
                Re_test: val.retest === 1 ? "Yes" : "No",
                Re_mark: val.induct_retest_mark !== null ? val.induct_retest_mark : "Nill",
                online_mode: val.online_mode,
                offline_mode: val.offline_mode,
                trainingmode: val.online_mode ? "Online" : "Offline",
                eligible: val.induct_retest_mark >= 2 || val.induct_post_mark >= 2 ? "Eligible" : "Not Eligible",

            }
            return object;
        })
        SetShowInductionData(Induct)
    }, [InductionData, SetShowInductionData])

    //departmental
    useEffect(() => {
        const deptdata = DepartData?.map((val) => {
            const object = {
                Dept_slno: val.Dept_slno,
                slno: val.slno,
                scheduled_slno: val.scheduled_slno,
                schedule_trainers: val.schedule_trainers,
                emp_name: val.emp_name,
                em_id: val.em_id,
                em_no: val.em_no,
                em_name: val.em_name,
                int_slno: val.int_slno,
                schedule_year: val.schedule_year,
                question_count: val.question_count,
                pretest_status: val.pretest_status,
                posttest_status: val.posttest_status,
                retest: val.retest,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                dept_pre_mark: val.dept_pre_mark,
                dept_post_mark: val.dept_post_mark,
                dept_retest_mark: val.dept_retest_mark,
                schedule_date: moment(val.schedule_date).format("DD-MM-YYYY"),
                allowPrepost: val.posttest_status === 1 ? "Yes" : "No",
                Re_test: val.retest === 1 ? "Yes" : "No",
                Re_mark: val.dept_retest_mark !== null ? val.dept_retest_mark : "No Retest",
                online_mode: val.online_mode,
                offline_mode: val.offline_mode,
                trainingmode: val.online_mode === true ? "Online" : "Offline",
                eligible: val.dept_retest_mark >= 2 || val.dept_post_mark >= 2 ? "Eligible" : "Not Eligible"
            }
            return object;
        })
        SetShowDepartData(deptdata)
    }, [DepartData, SetShowDepartData])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={Handleclose}
            sx={{ display: 'flex' }}
        >
            <ModalDialog size="lg" sx={{ width: "80%" }}>
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
                    startDecorator={
                        <FormatListBulletedIcon sx={{ color: '#535C91' }} />
                    }
                    sx={{ display: 'flex', alignItems: 'flex-start', mr: 1, color: "#9290C3" }}>
                    Training Record
                </Typography>

                <CustmTypog title={"Employee Details"} />
                <Table borderAxis="bothBetween">
                    <tbody style={{ textTransform: "capitalize" }}>
                        <tr>
                            <td>Name</td>
                            <td>{em_name.toLowerCase()}</td>
                        </tr>
                        <tr>
                            <td>Employee ID</td>
                            <td>{em_no}</td>
                        </tr>
                        <tr>
                            <td>Department</td>
                            <td>{dept_name.toLowerCase()}</td>
                        </tr>
                        <tr>
                            <td>Department Section</td>
                            <td>{sect_name.toLowerCase()}</td>
                        </tr>
                        <tr>
                            <td>Designation</td>
                            <td>{desg_name.toLowerCase()}</td>
                        </tr>
                    </tbody>
                </Table>


                {/* Induction */}
                <CustmTypog title={"Induction Training Details"} />
                {
                    InductionData?.length !== 0 ?
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{ width: "5%" }}>Slno</th>
                                    <th>Date</th>
                                    <th>Topic</th>
                                    <th>Trainers</th>
                                    <th>Online Mode</th>
                                    <th>Offline Mode</th>
                                    <th>Pre-Post Status</th>
                                    <th>Pre-Test Mark</th>
                                    <th>Post-Test Mark</th>
                                    <th>Retest</th>
                                    <th>Retest Mark</th>
                                    <th>Eligible/Not</th>

                                </tr>
                            </thead>
                            <tbody>
                                {ShowInductionData?.map((row, indx) => (
                                    <tr key={indx}>
                                        <td>{row?.int_slno}</td>
                                        <td>{row?.induction_date}</td>
                                        <td style={{ textTransform: "capitalize" }}>{row?.training_topic_name.toLowerCase()}</td>
                                        <td><InductTraineerDetail traineer={row?.trainers} /></td>
                                        <td>{row?.online_mode === 1 ? "Online" : "Not Attend"}</td>
                                        <td>{row?.offline_mode === 1 ? "Offline" : "Not Attend"}</td>
                                        <td>{row?.allowPrepost}</td>
                                        <td>{row?.pretest_status === 1 ? row?.induct_pre_mark : "Not Attend"}</td>
                                        <td>{row?.posttest_status === 1 ? row?.induct_post_mark : "Not Attend"}</td>
                                        <td>{row?.Re_test}</td>
                                        <td>{row?.Re_test === 1 ? row?.Re_mark : "Not Attend"}</td>
                                        <td>{row?.induct_post_mark >= 2 && row.posttest_status === 1 || row.Re_test === 1 && row.Re_mark >= 2 ? "Eligible" : "Not Eligible"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        : <Box> Not Attended</Box>
                }
                {/* departmental */}
                <CustmTypog title={"Departmental Training Details"} />
                {
                    ShowDepartData?.length !== 0 ?

                        < Table sx={{
                            overflow: 'auto',
                            '::-webkit-scrollbar': { display: "none" }, height: 200
                        }}>
                            <thead>
                                <tr>
                                    <th style={{ width: "5%" }}>Slno</th>
                                    <th>Date</th>
                                    <th>Topic</th>
                                    <th>Trainers</th>
                                    <th>Online Mode</th>
                                    <th>Offline Mode</th>
                                    <th>Pre-Post Status</th>
                                    <th>Pre-Test Mark</th>
                                    <th>Post-Test Mark</th>
                                    <th>Retest</th>
                                    <th>Retest Mark</th>
                                    <th>Eligible/Not</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ShowDepartData?.map((row, indx) => (
                                    <tr key={indx}>
                                        <td>{row?.Dept_slno}</td>
                                        <td>{row?.schedule_date}</td>
                                        <td style={{ textTransform: "capitalize" }}>{row?.training_topic_name.toLowerCase()}</td>
                                        <td><TraineerDetail traineer={row?.schedule_trainers} /></td>
                                        <td>{row?.online_mode === 1 ? "Online" : "Not Attend"}</td>
                                        <td>{row?.offline_mode === 1 ? "Offline" : "Not Attend"}</td>
                                        <td>{row?.allowPrepost}</td>
                                        <td>{row?.pretest_status === 1 ? row?.dept_pre_mark : "Not Attend"}</td>
                                        <td>{row?.posttest_status === 1 ? row?.dept_post_mark : "Not Attend"}</td>
                                        <td>{row?.Re_test}</td>
                                        <td>{row?.Re_mark}</td>
                                        <td>{row?.dept_post_mark >= 2 && row.posttest_status === 1 || row.Re_test === 1 && row.dept_retest_mark >= 2 ? "Eligible" : "Not Eligible"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table> :

                        <Box> Not Attended</Box>
                }

            </ModalDialog>
        </Modal >
    )
}

export default memo(EmpDetailsModal)
