import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Box, IconButton as OpenIcon, Paper, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { PreTestEmpListAll } from 'src/redux/actions/Training.Action';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import moment from 'moment';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import QRCodeModalPage from './QRCodeModalPage';
import DoneIcon from '@mui/icons-material/Done';

const PretestEmpList = () => {
    const dispatch = useDispatch()
    const [tabledata, setTabledata] = useState([]);
    const [count, Setcount] = useState(0);

    const [QRdata, setQRdata] = useState([]);
    const [QRmodal, setQRmodal] = useState(false);


    useEffect(() => {
        dispatch(PreTestEmpListAll())
        Setcount(0);
    }, [dispatch, count])

    //login employee topics
    const EmpDetails = useSelector((state) => state?.gettrainingData?.PreTestEmpListAll?.PreTestEmpListAllList, _.isEqual)

    useEffect(() => {
        const displayData = EmpDetails?.map((val) => {
            const object = {
                sl: val.sl,
                slno: val.slno,
                em_id: val.em_id,
                em_name: val.em_name,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                question_count: val.question_count,
                dept_id: val.dept_id,
                desg_slno: val.desg_slno,
                sect_id: val.sect_id,
                pretest_status: val.pretest_status,
                schedule_date: val.schedule_date,
                posttest_permission: val.posttest_permission,
                date: moment(val.schedule_date).format('YYYY-MM-DD'),
                training_status: val.training_status
            }
            return object;
        })
        setTabledata(displayData)
    }, [EmpDetails, setTabledata])

    //QR Code
    const ClickToScanQR = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setQRdata(data);
        setQRmodal(true)
    }, [setQRdata, setQRmodal])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'sl', filter: true, width: 100 },
        { headerName: 'Employee Number', field: 'em_id', filter: true, width: 100 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 200 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 200 },

        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.pretest_status === 1) {
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
        }
    ])
    return (
        <CustomLayout title="Employee training Topic View List" displayClose={true} >
            <Box sx={{ width: "100%", p: 1, height: screenInnerHeight - 120 }}>
                <Paper variant='outlined' sx={{ mt: 1, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tabledata}
                        sx={{
                            height: 800,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
                {QRmodal === true ? <QRCodeModalPage count={count} Setcount={Setcount} QRdata={QRdata} QRmodal={QRmodal} setQRmodal={setQRmodal} /> : null}
            </Box>
        </CustomLayout >
    )
}

export default memo(PretestEmpList)
