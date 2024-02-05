import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Box, IconButton as OpenIcon, Paper, Tooltip } from '@mui/material';
import { CommonTrainingPostTopics } from 'src/redux/actions/Training.Action';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import PostQRmodal from './PostQRmodal';

const TopicScanList = () => {
    const dispatch = useDispatch()

    const [count, Setcount] = useState(0);
    const [TestTopics, SetTestTopics] = useState(0);
    const [QRdata, setQRdata] = useState([]);
    const [QRmodal, setQRmodal] = useState(false);

    useEffect(() => {
        dispatch(CommonTrainingPostTopics())
        Setcount(0);
    }, [dispatch, count])

    //login employee topics
    const PostTopics = useSelector((state) => state?.gettrainingData?.CommonPostTopics?.CommonPostTopicsList, _.isEqual)

    useEffect(() => {
        const displayData = PostTopics?.map((val) => {
            const object = {
                sno: val.sno,
                slno: val.slno,
                topic: val.topic,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
            }
            return object;
        })
        SetTestTopics(displayData)
    }, [PostTopics, SetTestTopics])


    const ClickToScanQR = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setQRdata(data);
        setQRmodal(true)
    }, [setQRdata, setQRmodal])

    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'sno', filter: true, width: 100 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 200 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                return <OpenIcon onClick={(e) => ClickToScanQR(params)}
                    sx={{ paddingY: 0.5 }} >
                    <Tooltip title="Scan QR Code">
                        <QrCodeScannerIcon color='primary' />
                    </Tooltip>
                </OpenIcon>
            }
        },
    ])
    return (
        <CustomLayout title="Training Topics" displayClose={true} >
            <Box sx={{ width: "100%", p: 1, height: screenInnerHeight - 120 }}>
                <Paper variant='outlined' sx={{ mt: 1, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={TestTopics}
                        sx={{
                            height: 800,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
                {QRmodal === true ? <PostQRmodal count={count} Setcount={Setcount} QRdata={QRdata} QRmodal={QRmodal} setQRmodal={setQRmodal} /> : null}
            </Box>
        </CustomLayout >
    )
}

export default memo(TopicScanList)
