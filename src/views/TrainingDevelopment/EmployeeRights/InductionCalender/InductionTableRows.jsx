import React, { memo, useState, useEffect, Fragment, useCallback } from 'react'
import { Box, Chip, CssVarsProvider, Table, Tooltip } from '@mui/joy';
import ViewDetailedModal from './ViewDetailedModal';
import { isBefore } from 'date-fns';

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
                            color="success"
                            borderAxis="both"
                            size="lg"  >
                            <tbody>
                                <tr>
                                    <td style={{ textTransform: "capitalize", width: "50%", color: "#344CB7" }}
                                    >
                                        <Box sx={{
                                            width: "100%", overflow: "auto", '&::-webkit-scrollbar': {
                                                height: 5
                                            },
                                        }}>
                                            {typearr.type_name.toLowerCase()}
                                        </Box>
                                    </td>
                                    <td>
                                        <Box sx={{
                                            p: 1,
                                            display: "flex",
                                            overflow: "auto", '&::-webkit-scrollbar': {
                                                height: 5
                                            }, gap: 2,

                                        }}>
                                            {
                                                data?.map((val, index) => (
                                                    <Box key={index}
                                                        onClick={() => handleClick(val)}>
                                                        <Tooltip title="View Details">

                                                            <Chip sx={{
                                                                cursor: "pointer",
                                                                color: "black",
                                                                backgroundColor:
                                                                    isBefore(new Date(), new Date(val.induction_date)) === false ? '#F7A4A4' : '#B1D0E0'
                                                            }}  >
                                                                {val.date}
                                                            </Chip>
                                                        </Tooltip>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </td>
                                </tr>
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
                                    <td style={{ p: 1, width: "50%", textAlign: "center" }}>Not Scheduled</td>
                                    <td style={{ p: 1, width: "50%", textAlign: "center" }}>Not Scheduled</td>
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


