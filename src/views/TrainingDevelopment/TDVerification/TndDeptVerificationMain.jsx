import { Box, Tooltip } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { axioslogin } from 'src/views/Axios/Axios';
import { format } from 'date-fns';
import { IconButton as OpenIcon } from '@mui/material';
import DeptVerificationModal from './DeptVerificationModal';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import DoneIcon from '@mui/icons-material/Done';

const TndDeptVerificationMain = () => {

    const [viewData, SetviewData] = useState([])
    const [count, setcount] = useState(0)
    const [modalData, SetModalData] = useState([])
    const [open, Setopen] = useState(false)

    useEffect(() => {
        const getData = (async () => {
            const result = await axioslogin.get(`/TrainingVerification/GetDeptTrainings`)
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data?.map((val) => {
                    const obj = {
                        dept_slno: val.dept_slno,
                        slno: val.slno,
                        dept_id: val.dept_id,
                        dept_name: val.dept_name,
                        sect_id: val.sect_id,
                        sect_name: val.sect_name,
                        schedule_date: val.schedule_date,
                        date: format(new Date(val.schedule_date), 'dd-MM-yyyy'),
                        topic_slno: val.topic_slno,
                        training_topic_name: val.training_topic_name,
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
        const GetDeptData = params.data
        const { dept_id, sect_id } = GetDeptData
        const obj = {
            dept_id: dept_id,
            sect_id: sect_id
        }
        const result = await axioslogin.post(`/TrainingVerification/getDeptEmpList`, obj)
        const { success, data } = result.data;
        if (success === 2) {
            const viewData = data?.map((val) => {
                const obj = {
                    dept_verifn_slno: val.dept_verifn_slno,
                    slno: val.slno,
                    em_no: val.em_no,
                    em_name: val.em_name,
                    emp_ID: val.em_id,
                    schedule_date: val.schedule_date,
                    date: format(new Date(val.schedule_date), 'yyyy-MM-dd'),
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    training_status: val.training_status,
                    pretest_status: val.pretest_status,
                    pretest: val.pretest_status === 1 ? "Completed" : "Pending",
                    posttest_status: val.posttest_status,
                    posttest: val.posttest_status === 1 ? "Completed" : "Pending",
                    trainer_apprvl_status: val.training_apprvl_status,
                    training_hod_apprvls_status: val.training_hod_apprvls_status,
                    tnd_verification_status: val.tnd_verification_status,
                    hours: val.hours,
                    pre_mark: val.posttest_status === 0 ? "Not Attended" : val.pre_mark,
                    post_mark: val.posttest_status === 0 ? "Not Attended" : val.post_mark,
                    dept_id: val.dept_id,
                    dept_name: val.dept_name,
                    sect_name: val.sect_name,
                    sect_id: val.sect_id,
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
        { headerName: 'Sl.No ', field: 'dept_slno', filter: true, minWidth: 90 },
        { headerName: 'Department', field: 'dept_name', filter: true, minWidth: 200 },
        { headerName: 'Department Section ', field: 'sect_name', filter: true, minWidth: 200 },
        { headerName: 'Schedule Date ', field: 'date', filter: true, minWidth: 100 },

        {
            headerName: 'Verify & Submit',
            cellRenderer: params => {
                if (params.data.tnd_verification_status === 1) {
                    return <OpenIcon
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Verified">
                            <DoneIcon color='success' />
                        </Tooltip>
                    </OpenIcon>
                } else {
                    return <OpenIcon onClick={() => getRows(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Verify & Submit">
                            <BeenhereIcon color='primary' />
                        </Tooltip>
                    </OpenIcon>
                }
            }
        }
    ])

    return (
        <Fragment>
            {open === true ? < DeptVerificationModal open={open} Setopen={Setopen} modalData={modalData} setcount={setcount} count={count} /> : null}
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

export default memo(TndDeptVerificationMain) 
