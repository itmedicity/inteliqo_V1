import React, { lazy, memo, useEffect, useMemo, useState } from 'react'
import Table from '@mui/joy/Table';
import { Box, Typography } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';

const InductionRecordTrainer = lazy(() => import('./InductionRecordTrainer'))

const InductionRecord = ({ Empdata }) => {
    const [Hod, SetHod] = useState([]);
    const [inductionData, SetInductionData] = useState([]);
    const empdata = useMemo(() => Empdata, [Empdata])
    useEffect(() => {
        if (empdata?.length !== 0) {
            const postdata = {
                dept_sec: empdata?.em_dept_section,
            };
            const personaldata = {
                em_id: empdata?.em_id,
            };
            const fetchData = async () => {
                const result = await axioslogin.post('/PersonalChecklist/HODincharge', postdata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    SetHod(data[0])
                }
                else {
                    SetHod([])

                }
                const resultdata = await axioslogin.post('/PersonalChecklist/TrainingData', personaldata)
                const { successTraining, dataTraining } = resultdata.data
                if (successTraining === 1 && dataTraining?.length > 0) {
                    SetInductionData(dataTraining)
                }
                else {
                    SetInductionData([])
                }

            }
            fetchData()
        }

    }, [empdata])
    return (
        <Box sx={{ height: window.innerHeight - 170, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Name Of The Employee</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{empdata?.em_name === '' ? "Not Updated" : empdata?.em_name} </Typography>
                        </td>
                    </tr>

                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm'>
                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Employee ID</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}> {empdata?.em_no === '' ? "Not Updated" : empdata?.em_no}</Typography> </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Designation</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{empdata?.desg_name === '' ? "Not Updated" : empdata?.desg_name} </Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Department</Typography></td>
                        <td> <Typography level="title-md" sx={{ ml: 1 }}>{empdata?.dept_name === '' ? "Not Updated" : empdata?.dept_name} </Typography> </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Name Of HOD</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{Hod?.em_name === '' ? "Not Updated" : Hod?.em_name}  </Typography></td>
                    </tr>

                </tbody>
            </Table>

            <Table aria-label="basic table" borderAxis="both" variant="outlined" sx={{ mt: 1 }}>
                <thead>
                    <tr>
                        <th > Sl No</th>
                        <th>Date</th>
                        <th > Name of the Training Topic</th>
                        <th>Duration </th>
                        <th>Pre Test</th>
                        <th>Post Test </th>
                        <th>Name of Trainer </th>
                        <th>Hod Name</th>
                        <th>Remark</th>

                    </tr>

                </thead>
                {inductionData?.map((item, index) => (
                    <tbody key={index}>
                        <tr>
                            <td>{item?.int_slno === null ? "not updated" : item?.int_slno}</td>
                            <td> {moment(item?.induction_date).format('DD-MM-YYYY')}</td>
                            <td>{item?.training_topic_name === null ? "not updated" : item?.training_topic_name}</td>
                            <td>{item?.hours === null ? "not updated" : item?.hours}</td>
                            <td>{item?.induct_pre_mark === null ? "not updated" : item?.induct_pre_mark}</td>
                            <td>{item?.induct_post_mark === null ? "not updated" : item?.induct_post_mark}</td>
                            <td><InductionRecordTrainer traineer={item?.trainers} /></td>
                            <td>{Hod?.em_name === '' ? "Not Updated" : Hod?.em_name}</td>
                            <td>{item?.em_mark_grade === null ? "not updated" : item?.em_mark_grade}</td>

                        </tr>
                    </tbody>
                ))}


            </Table>
        </Box>
    )
}

export default memo(InductionRecord) 