import React, { Fragment, lazy, memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Box, IconButton as OpenIcon, Paper, Tooltip } from '@mui/material';
import { screenInnerHeight } from 'src/views/Constant/Constant';
import moment from 'moment';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CustomInnerHeightDashBoard from 'src/views/Component/MuiCustomComponent/CustomInnerHeightDashBoard';
import InductionTestBySystem from './InductionTestBySystem';
const InductionRetestQRscanPage = lazy(() => import('../InductionRetest/QRInductionRetest/InductionRetestQRscanPage'))

const InductionTopicList = ({ count, setShow, Setcount, InductionResetTopics }) => {

    const [data, setData] = useState([]);
    const [Selecteddata, SetSelectedData] = useState([]);
    const [opeQRCodeModal, setopeQRCodeModal] = useState(false);
    const [openTest, setopenTest] = useState(false);

    useEffect(() => {
        const displayData = InductionResetTopics?.map((val) => {
            const object = {
                sn: val.sn,
                retest_slno: val.retest_slno,
                retest_em_no: val.retest_em_no,
                re_emp_dept: val.re_emp_dept,
                re_dept_sec: val.re_dept_sec,
                em_name: val.em_name,
                retest_date: val.retest_date,
                date: moment(val.schedule_date).format('YYYY-MM-DD'),
                re_topic: val.re_topic,
                re_attendance: val.re_attendance,
                re_questn_count: val.re_questn_count,
                em_id: val.em_id,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                em_no: val.em_no,
                desg_name: val.desg_name,
                desg_slno: val.desg_slno,
                premark: val.premark,
                postmark: val.postmark,
                pretest_status: val.pretest_status,
                posttest_status: val.posttest_status,
                online_mode: val.online_mode,
                training_status: val.training_status,
                retest: val.retest,
                retest_mark: val.retest_mark,
                retest_status: val.retest_status
            }
            return object;
        })
        setData(displayData)
    }, [InductionResetTopics, setData])

    //QR Code
    const ClickToScanQR = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetSelectedData(data);
        setopeQRCodeModal(true)
    }, [SetSelectedData, setopeQRCodeModal])

    const ClickToTest = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setopenTest(true)
        SetSelectedData(data);
    }, [setopenTest, SetSelectedData])

    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'sn', filter: true, width: 100 },
        { headerName: 'Employee Id', field: 'em_no', filter: true, width: 100 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 200 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 200 },
        {
            headerName: 'Scan code',
            cellRenderer: params => {
                return <OpenIcon onClick={(e) => ClickToScanQR(params)}
                    sx={{ paddingY: 0.5 }} >
                    <Tooltip title="Scan QR Code">
                        <QrCodeScannerIcon color='primary' />
                    </Tooltip>
                </OpenIcon>
            }
        },
        {
            headerName: 'Use system',
            cellRenderer: params => {
                return <OpenIcon onClick={(e) => ClickToTest(params)}
                    sx={{ paddingY: 0.5 }} >
                    <Tooltip title="Exam attend through system">
                        <OpenInNewIcon color='primary' />
                    </Tooltip>
                </OpenIcon>
            }
        },
    ])
    const toClose = useCallback(() => {
        setShow(0)
    }, [setShow])
    return (
        <Fragment>
            {openTest === true ? <InductionTestBySystem Selecteddata={Selecteddata} />
                :
                <CustomInnerHeightDashBoard title="Employee Induction Training Retest Topics" toClose={toClose} >
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

                        {opeQRCodeModal === true ? <InductionRetestQRscanPage count={count} Setcount={Setcount} Selecteddata={Selecteddata} opeQRCodeModal={opeQRCodeModal} setopeQRCodeModal={setopeQRCodeModal} /> : null}

                    </Box>
                </CustomInnerHeightDashBoard >
            }
        </Fragment>
    )
}

export default memo(InductionTopicList)




