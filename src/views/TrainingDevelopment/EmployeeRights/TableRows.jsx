import React, { memo, useCallback, useState, useEffect, Fragment } from 'react'
import { Chip, CssVarsProvider, Table, Tooltip } from '@mui/joy';
import TrainingEmpSchedule from '../DepartmentalTraining/TrainingEmpSchedule';
import { format, isBefore } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';

const TableRows = ({ checkdata, count, Setcount, monthdata, id, yr, end, EmpDetails }) => {
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState(0);
    const [rowdata, setrowdata] = useState({});
    const [data, setdata] = useState([]);
    const [Scheduledata, setScheduledata] = useState([]);

    const handleClick = useCallback((val) => {
        setrowdata(val);
        setOpen(true);
        setFlag(1);
        const obj = {
            dept: val.dept_id,
            topic: val.topic_slno,
            date: format(new Date(val.schedule_date), 'yyy-MM-dd')
        }
        const getScheduleDetails = async (obj) => {
            const result = await axioslogin.post('/TrainingAfterJoining/scheduledatas', obj)
            const { success, data } = result.data;
            if (success === 2) {
                setScheduledata(data)
            } else {
                setScheduledata([])
            }
        }
        getScheduleDetails(obj)
    }, [])


    useEffect(() => {
        const mapdata = checkdata?.filter((val) => val.months === id && val.year === yr)
        setdata(mapdata);
    }, [checkdata, id, yr])

    return (
        <Fragment>
            {
                data?.length !== 0 ?
                    <CssVarsProvider>
                        <Table
                            color="success"
                            borderAxis="both"
                            size="lg"  >
                            <tbody>
                                {
                                    data?.map((val, index) => (
                                        <tr key={index} style={{
                                            backgroundColor:
                                                isBefore(new Date(), new Date(val.schedule_date)) === false ? '#F8E8EE' : '#EEF5FF'
                                        }}>
                                            <td onClick={() => handleClick(val)} style={{
                                                textTransform: "capitalize", width: "40%", color: "#344CB7", textAlign: "center",

                                            }}
                                            >
                                                <Tooltip title="Schedule Trainings">
                                                    <Chip sx={{
                                                        width: "30%",
                                                        cursor: "pointer",
                                                        backgroundColor:
                                                            isBefore(new Date(), new Date(val?.schedule_date)) === false ? '#C2D9FF' : '#C2D9FF'
                                                    }}  >
                                                        {val?.training_topic_name?.toLowerCase()}
                                                    </Chip>
                                                </Tooltip>
                                            </td>
                                            <td >{val?.traineer_name?.toLowerCase()}</td>
                                            <td >{val?.date}</td>
                                        </tr>
                                    ))
                                }
                            </tbody >
                        </Table >
                    </CssVarsProvider > :
                    <CssVarsProvider>
                        <Table
                            borderAxis="both"
                            color="success"
                            size="lg" >
                            <tbody>
                                <tr>
                                    <td style={{ p: 1, width: "40%", textAlign: "center" }}>Not Scheduled</td>
                                    <td style={{ p: 1, textAlign: "center" }}>Not Scheduled</td>
                                    <td style={{ p: 1, textAlign: "center" }}>Not Scheduled</td>

                                </tr>

                            </tbody>

                        </Table>
                    </CssVarsProvider>
            }

            {
                flag === 1 ? <TrainingEmpSchedule Scheduledata={Scheduledata} EmpDetails={EmpDetails} yr={yr} end={end} monthdata={monthdata} rowdata={rowdata} setrowdata={setrowdata} count={count} Setcount={Setcount} open={open} setOpen={setOpen} flag={flag} setFlag={setFlag} /> : null
            }
        </Fragment >
    )
}

export default memo(TableRows)
