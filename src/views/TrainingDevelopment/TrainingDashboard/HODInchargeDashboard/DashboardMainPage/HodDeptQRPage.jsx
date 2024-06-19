import { Box, Table } from '@mui/joy';
import { Paper, Typography } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { IconButton as OpenIcon } from '@mui/material';
import { Tooltip } from '@mui/material'
import PreQRmodal from 'src/views/TrainingDevelopment/CommonPreTest/PreQRmodal';
import { CommonTrainingPreTopics } from 'src/redux/actions/Training.Action';

const HodDeptQRPage = ({ em_department }) => {

    const dispatch = useDispatch()

    const [count, Setcount] = useState(0);
    const [QRdata, setQRdata] = useState([]);
    const [QRmodal, setQRmodal] = useState(false);

    useEffect(() => {
        dispatch(CommonTrainingPreTopics(em_department))
        Setcount(0);
    }, [dispatch, em_department, count])

    //login employee topics
    const PreTopics = useSelector((state) => state?.gettrainingData?.CommonPreTopics?.CommonPreTopicsList, _.isEqual)
    const ClickToScanQR = useCallback((params) => {
        setQRdata(params);
        setQRmodal(true)
    }, [setQRdata, setQRmodal])

    return (
        <Fragment>
            {PreTopics?.length !== 0 ?
                <Paper elevation={0} sx={{
                    flex: 1,
                    p: 1, boxShadow: 4, backgroundColor: "#FFFFFF",
                }}>
                    <h5>Departmental Online Test  </h5>
                    <Box sx={{ p: 1 }}>
                        <Table stickyHeader >
                            <thead>
                                <tr style={{}}>
                                    <th style={{ width: "15%", textAlign: "center" }}>SlNo</th>
                                    <th style={{ width: "50%", textAlign: "center" }}>Training Topic</th>
                                    <th style={{ width: "20%", textAlign: "center" }}>Scan Code</th>

                                </tr>
                            </thead>
                            <tbody style={{ height: 50, overflow: "auto", '&::-webkit-scrollbar': { display: "none" } }}>
                                {PreTopics?.map((val, index) => (
                                    <tr key={index}>
                                        <td style={{ width: "15%", textAlign: "center" }}>{val.sno}</td>
                                        <td style={{ width: "50%", textAlign: "center" }}>{val.training_topic_name}</td>
                                        <td style={{ width: "20%", textAlign: "center" }}>
                                            <Tooltip title="Click to scan the QRcode">
                                                <OpenIcon onClick={(e) => ClickToScanQR(val)}>
                                                    <QrCodeScannerIcon style={{ color: "#0079FF" }} />
                                                </OpenIcon>
                                            </Tooltip>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {QRmodal === true ? <PreQRmodal count={count} Setcount={Setcount} QRdata={QRdata} QRmodal={QRmodal} setQRmodal={setQRmodal} /> : null}
                    </Box>
                </Paper>
                :
                <Paper elevation={0} sx={{
                    height: 150, flex: 1,
                    p: 1, boxShadow: 4, backgroundColor: "#FFFFFF", overflow: "auto", '&::-webkit-scrollbar': { display: "none" }
                }}>
                    <h5>Departmental Online Test   </h5>
                    <Box sx={{ textAlign: "center", color: "#D20062" }}>
                        <Typography>
                            No Trainings scheduled On this day
                        </Typography>
                    </Box>
                </Paper>
            }
        </Fragment>
    )
}


export default memo(HodDeptQRPage) 
