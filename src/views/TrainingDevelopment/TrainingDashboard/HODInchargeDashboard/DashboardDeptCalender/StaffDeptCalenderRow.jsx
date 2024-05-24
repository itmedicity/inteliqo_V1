import React, { memo, useState, useEffect, Fragment } from 'react'
import { Chip, CssVarsProvider, Table, } from '@mui/joy';
import { isBefore } from 'date-fns';

const StaffDeptCalenderRow = ({ checkdata, id, yr }) => {
    const [data, setdata] = useState([]);

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
                                                isBefore(new Date(), new Date(val?.schedule_date)) === false ? '#F8E8EE' : '#EEF5FF'
                                        }}>
                                            <td style={{
                                                textTransform: "capitalize", width: "40%", color: "#344CB7", textAlign: "center",
                                            }}
                                            >
                                                <Chip sx={{
                                                    width: "30%",

                                                    backgroundColor:
                                                        isBefore(new Date(), new Date(val?.schedule_date)) === false ? '#C2D9FF' : '#C2D9FF'
                                                }}  >
                                                    {val?.training_topic_name?.toLowerCase()}
                                                </Chip>

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

        </Fragment >
    )
}

export default memo(StaffDeptCalenderRow) 
