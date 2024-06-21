import { Box, Tooltip } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import DoneIcon from '@mui/icons-material/Done';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { axioslogin } from 'src/views/Axios/Axios';
import VerificationModal from './VerificationModal';
import { IconButton as OpenIcon } from '@mui/material';
import { format } from 'date-fns';

const TDVerificationMainPage = () => {

    const [viewData, SetviewData] = useState([])
    const [count, setcount] = useState(0)
    const [modalData, SetModalData] = useState([])
    const [open, Setopen] = useState(false)

    useEffect(() => {
        const getData = (async () => {
            const result = await axioslogin.get(`/TrainingVerification/getInductionData`)
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data?.map((val) => {
                    const obj = {
                        slno: val.slno,
                        schedule_slno: val.schedule_slno,
                        induction_date: val.induction_date,
                        schedule_date: format(new Date(val.induction_date), 'yyyy-MM-dd'),
                        topic_slno: val.topic_slno,
                        training_topic_name: val.training_topic_name
                    }
                    return obj;
                })
                SetviewData(viewData);

            } else {
                SetviewData([]);
            }
        })
        getData()
    }, [count])

    const getRows = useCallback(async (params) => {
        const getId = params.data
        const { schedule_slno } = getId;
        const result = await axioslogin.get(`/TrainingVerification/getInductEmpAllData/${schedule_slno}`)
        const { success, data } = result.data;
        if (success === 2) {
            const viewData = data?.map((val) => {
                const obj = {
                    veriftn_slno: val.veriftn_slno,
                    induction_slno: val.induction_slno,
                    em_no: val.em_no,
                    em_name: val.em_name,
                    emp_ID: val.em_id,
                    induction_date: val.induction_date,
                    date: format(new Date(val.induction_date), 'yyyy-MM-dd'),
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    training_status: val.training_status,
                    pretest_status: val.pretest_status,
                    pretest: val.pretest_status === 1 ? "Completed" : "Pending",
                    posttest_status: val.posttest_status,
                    posttest: val.posttest_status === 1 ? "Completed" : "Pending",
                    online_mode: val.online_mode,
                    offline_mode: val.offline_mode,
                    retest: val.retest,
                    hours: val.hours,
                    training_iduct_tnd_verify_status: val.training_iduct_tnd_verify_status,
                    completed: val.training_iduct_tnd_verify_status === 1 ? "Verified" : "Not Verified",
                    pre_mark: val.pre_mark === null ? "Not Attended" : val.pre_mark,
                    post_mark: val.post_mark === null ? "Not Attended" : val.post_mark,
                    question_count: val.question_count,
                }
                return obj;
            })
            SetModalData(viewData);
        } else {
            SetModalData([]);
        }
        Setopen(true)
    }, [Setopen, SetModalData])

    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'slno', filter: true, minWidth: 100 },
        { headerName: 'Topics', field: 'training_topic_name', filter: true, minWidth: 300 },
        { headerName: 'Schedule Date', field: 'schedule_date', filter: true, minWidth: 100 },
        {
            headerName: 'Verification ',
            cellRenderer: params => {
                if (params.data.training_iduct_tnd_verify_status === 1) {
                    return <OpenIcon
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Verified">
                            <DoneIcon color='success' />
                        </Tooltip>
                    </OpenIcon>
                } else {
                    return <OpenIcon onClick={() => getRows(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Verify ">
                            <BeenhereIcon color='primary' />
                        </Tooltip>
                    </OpenIcon>
                }
            }
        }
    ])

    return (
        <Fragment>
            {open === true ? < VerificationModal open={open} SetModalData={SetModalData} Setopen={Setopen} modalData={modalData} setcount={setcount} count={count} /> : null}
            <Box sx={{ width: "100%", p: 0.5, mt: 1 }}>
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={viewData}
                    sx={{
                        height: 700
                    }}
                    rowHeight={30}
                    headerHeight={30}
                />
            </Box>
        </Fragment>
    )
}
export default memo(TDVerificationMainPage) 
