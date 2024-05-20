import { Box, Table } from '@mui/joy';
import { Paper, Typography } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InductionPrePostTopics } from 'src/redux/actions/Training.Action';
import _ from 'underscore';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InductionQRModal from '../../InductionTest/InductionQRModal';
import { IconButton as OpenIcon } from '@mui/material';
import { Tooltip } from '@mui/material'

const QRCodepage = () => {

    const dispatch = useDispatch()

    const [count, Setcount] = useState(0);
    const [QRdata, setQRdata] = useState([]);
    const [QRmodal, setQRmodal] = useState(false);

    useEffect(() => {
        dispatch(InductionPrePostTopics())
        Setcount(0);
    }, [dispatch, count])

    //login employee topics
    const PrePostTopics = useSelector((state) => state?.gettrainingData?.InductionPrePostTopics?.InductionPrePostTopicsList, _.isEqual)

    const ClickToScanQR = useCallback((val) => {
        const data = val;
        setQRdata(data);
        setQRmodal(true)
    }, [setQRdata, setQRmodal])
    return (
        <Fragment>
            {PrePostTopics?.length !== 0 ?

                <Paper elevation={0} sx={{
                    height: 150, flex: 1,
                    p: 1, boxShadow: 4, backgroundColor: "#FFFFFF", overflow: "auto", '&::-webkit-scrollbar': { display: "none" }
                }}>
                    <h5>Induction Online Test   </h5>


                    <Box sx={{ p: 1 }}>
                        <Table stickyFooter >
                            <thead>
                                <tr style={{}}>
                                    <th style={{ width: "15%", textAlign: "center" }}>SlNo</th>
                                    <th style={{ width: "50%", textAlign: "center" }}>Training Topic</th>
                                    <th style={{ width: "20%", textAlign: "center" }}>Scan Code</th>

                                </tr>
                            </thead>
                            <tbody>
                                {PrePostTopics?.map((val, index) => (
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
                        {QRmodal === true ? <InductionQRModal count={count} Setcount={Setcount} QRdata={QRdata} QRmodal={QRmodal} setQRmodal={setQRmodal} /> : null}
                    </Box>

                </Paper>
                :
                <Paper elevation={0} sx={{
                    height: 150, flex: 1,
                    p: 1, boxShadow: 4, backgroundColor: "#FFFFFF", overflow: "auto", '&::-webkit-scrollbar': { display: "none" }
                }}>
                    <h5>Induction Online Test   </h5>
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

export default memo(QRCodepage) 
