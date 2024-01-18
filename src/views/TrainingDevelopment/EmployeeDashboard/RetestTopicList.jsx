import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Box, IconButton as OpenIcon, Paper, Tooltip } from '@mui/material';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import moment from 'moment';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DoneIcon from '@mui/icons-material/Done';
import RetestQRscanPage from './RetestQRscanPage';

const RetestTopicList = ({ count, Setcount, ResetTopics }) => {

    const [data, setData] = useState([]);
    const [Selecteddata, SetSelectedData] = useState([]);
    const [opeQRCodeModal, setopeQRCodeModal] = useState(false);

    useEffect(() => {
        const displayData = ResetTopics?.map((val) => {
            const object = {
                sn: val.sn,
                attendance_status: val.attendance_status,
                candidate_em_no: val.candidate_em_no,
                candidate_dept: val.candidate_dept,
                candidate_dept_sec: val.candidate_dept_sec,
                em_name: val.em_name,
                retest_date: val.retest_date,
                date: moment(val.schedule_date).format('YYYY-MM-DD'),
                retest_mark: val.retest_mark,
                retest_quest_count: val.retest_quest_count,
                retest_sl_no: val.retest_sl_no,
                retest_status: val.retest_status,
                retest_topic: val.retest_topic,
                sect_name: val.sect_name,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
            }
            return object;
        })
        setData(displayData)
    }, [ResetTopics, setData])

    //QR Code
    const ClickToScanQR = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetSelectedData(data);
        setopeQRCodeModal(true)
    }, [SetSelectedData, setopeQRCodeModal])

    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'sn', filter: true, width: 100 },
        { headerName: 'Employee Number', field: 'candidate_em_no', filter: true, width: 100 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 200 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 200 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.retest_status === 1) {
                    return <OpenIcon
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Test completed">
                            <DoneIcon />
                        </Tooltip>
                    </OpenIcon>
                } else {
                    return <OpenIcon onClick={(e) => ClickToScanQR(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Scan QR Code">
                            <QrCodeScannerIcon color='primary' />
                        </Tooltip>
                    </OpenIcon>
                }
            }
        },
    ])
    return (
        <CustomLayout title="Employee training Topic View List" displayClose={true} >
            <Box sx={{ width: "100%", p: 1, height: screenInnerHeight - 120 }}>
                <Paper variant='outlined' sx={{ mt: 1, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={data}
                        sx={{
                            height: 800,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>

                {opeQRCodeModal === true ? <RetestQRscanPage count={count} Setcount={Setcount} Selecteddata={Selecteddata} opeQRCodeModal={opeQRCodeModal} setopeQRCodeModal={setopeQRCodeModal} /> : null}
            </Box>
        </CustomLayout >
    )
}

export default memo(RetestTopicList)
