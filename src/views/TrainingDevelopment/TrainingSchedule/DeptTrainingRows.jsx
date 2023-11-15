import React, { memo, useCallback, useState } from 'react'
import { Fragment } from 'react';
import TableEditModal from './TableEditModal';
import { useEffect } from 'react';
import { Table } from '@mui/joy';
import { getDate, getMonth, getYear } from 'date-fns';

const DeptTrainingRows = ({ checkdata, count, Setcount, id, yr }) => {
    const [open, setOpen] = useState(false);
    const [flag, setFlag] = useState(0);
    const [rowdata, setrowdata] = useState({});
    const [data, setdata] = useState([]);

    const handleClick = useCallback((val) => {
        setrowdata(val);
        setOpen(true);
        setFlag(1);
    }, [])

    useEffect(() => {
        const mapdata = checkdata?.filter((val) => {
            return val.months === id && val.year === yr;
        });
        if (mapdata) {
            const modifiedData = mapdata?.map((val) => {
                const scheduleDate = val.schedule_date;
                const dateObj = new Date(scheduleDate);

                return {
                    ...val,
                    schedule_date: dateObj
                };
            });

            setdata(modifiedData);
        }
    }, [checkdata, id, yr]);

    return (
        <Fragment>
            {
                data.length !== 0 ?
                    <Table
                        borderAxis="both"
                        size="lg"  >
                        <tbody>
                            {
                                data?.map((val, index) => (

                                    < tr key={index} style={{ textTransform: "capitalize" }}>

                                        <td
                                            key={index}
                                            onClick={() => handleClick(val)}
                                            style={{

                                                textAlign: "start",
                                                textDecoration: "underline",
                                                cursor: "pointer"
                                            }}
                                        >
                                            {val.training_topic_name.toLowerCase()}
                                        </td>
                                        <td style={{ textAlign: "start" }}>{val.traineer_name.toLowerCase()}</td>
                                        <td style={{ textAlign: "start" }}>
                                            {val.date}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody >
                    </Table > :

                    <Table
                        borderAxis="both"
                        size="lg" >
                        <tbody>
                            <tr>

                                <td style={{ textAlign: "start" }}>Not Updated</td>
                                <td style={{ textAlign: "start" }}>Not Updated</td>
                                <td style={{ textAlign: "start" }}>Not Updated</td>
                            </tr>

                        </tbody>

                    </Table>
            }

            {
                flag === 1 ? <TableEditModal rowdata={rowdata} setrowdata={setrowdata} count={count} Setcount={Setcount} open={open} setOpen={setOpen} flag={flag} setFlag={setFlag} /> : null
            }
        </Fragment >
    );
}

export default memo(DeptTrainingRows);
