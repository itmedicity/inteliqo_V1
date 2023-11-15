import React, { memo, useCallback, useState, useEffect, Fragment } from 'react'
import TableEditModals from './TableEditModals';
import { CssVarsProvider, Sheet, Table } from '@mui/joy';
import TrainingEmpSchedule from './TrainingEmpSchedule';

const DeptTrainingRow = ({ checkdata, count, Setcount, id, yr, monthdata, end, EmpDetails }) => {
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
        const mapdata = checkdata?.filter((val) => val.months === id && val.year === yr)
        setdata(mapdata);
    }, [checkdata, id, yr])



    return (
        <Fragment>

            {
                data?.length !== 0 ?
                    <CssVarsProvider>
                        <Table
                            borderAxis="both"
                            size="lg"  >
                            <tbody>
                                {
                                    data?.map((val, index) => (
                                        <tr key={index} style={{ textTransform: "capitalize" }}>
                                            <td
                                                key={index}
                                                onClick={() => handleClick(val)}
                                                style={{

                                                    textAlign: "center",
                                                    textDecoration: "underline",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                {val.training_topic_name.toLowerCase()}
                                            </td>
                                            <td style={{ textAlign: "center" }}>{val.traineer_name.toLowerCase()}</td>
                                            <td style={{ textAlign: "center" }}>
                                                {val.date}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody >
                        </Table >
                    </CssVarsProvider> :
                    <CssVarsProvider>
                        <Table
                            borderAxis="both"
                            size="lg" >
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: "center" }}>Not Updated</td>
                                    <td style={{ textAlign: "center" }}>Not Updated</td>
                                    <td style={{ textAlign: "center" }}>Not Updated</td>
                                </tr>

                            </tbody>

                        </Table>
                    </CssVarsProvider>
            }

            {
                flag === 1 ? <TrainingEmpSchedule EmpDetails={EmpDetails} yr={yr} end={end} monthdata={monthdata} rowdata={rowdata} setrowdata={setrowdata} count={count} Setcount={Setcount} open={open} setOpen={setOpen} flag={flag} setFlag={setFlag} /> : null
            }
        </Fragment >
    );
}

export default memo(DeptTrainingRow);
