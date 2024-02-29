import React, { memo, useState, useEffect, Fragment, useCallback } from 'react'
import { CssVarsProvider, Table } from '@mui/joy';
import ViewDetailedModal from './ViewDetailedModal';

const InductionTableRows = ({ datas, id, yr }) => {

    const [data, setdata] = useState([]);
    const [flag, setFlag] = useState(0);
    const [rowdata, setrowdata] = useState({});
    const [open, setOpen] = useState(false);
    const [typearr, Settypearr] = useState([]);

    useEffect(() => {
        const mapdata = datas?.filter((val) => val.months === id && parseInt(val.year) === yr && val.schedule_type !== 0)
        const filarray = mapdata?.find((val) => val.schedule_type !== 0)
        Settypearr(filarray)
        setdata(mapdata);
    }, [datas, id, yr])


    const handleClick = useCallback((val) => {
        setrowdata(val);
        setOpen(true);
        setFlag(1);
    }, [setOpen, setFlag, setrowdata])


    return (
        <Fragment>
            {
                data?.length !== 0 ?
                    <CssVarsProvider>
                        <Table
                            borderAxis="both"
                            size="lg"  >
                            <tbody>
                                <tr>
                                    <td
                                    >
                                        {typearr.type_name.toLowerCase()}
                                    </td>
                                    {
                                        data?.map((val, index) => (
                                            <td
                                                key={index}
                                                onClick={() => handleClick(val)}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",

                                                    textAlign: "center",
                                                    textDecoration: "underline",
                                                    cursor: "pointer"
                                                }}>
                                                {val.date}
                                            </td>
                                        ))
                                    }
                                </tr>
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
                                </tr>

                            </tbody>

                        </Table>
                    </CssVarsProvider>
            }
            {
                flag === 1 ? <ViewDetailedModal rowdata={rowdata} setrowdata={setrowdata} open={open} setOpen={setOpen} flag={flag} setFlag={setFlag} /> : null
            }
        </Fragment >
    );
}

export default memo(InductionTableRows);