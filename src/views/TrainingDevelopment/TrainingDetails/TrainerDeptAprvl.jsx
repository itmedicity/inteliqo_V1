import { Box, Tooltip } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import _ from 'underscore';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { IconButton as OpenIcon } from '@mui/material';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
import DoneIcon from '@mui/icons-material/Done';

const TrainerDeptAprvl = ({ hod, em_id, Deprtmtl_flag, Setcount, count }) => {
    const [ShowData, setShowData] = useState([]);

    const tarinerAppvls = useSelector((state) => state?.gettrainingData?.GetTrainerApprvls?.GetTrainerApprvlsList, _.isEqual);
    useEffect(() => {
        if (Object.keys(tarinerAppvls).length !== 0 && Deprtmtl_flag === true) {
            const displayData = tarinerAppvls?.map((val) => {
                const object = {
                    Tr_Apprvl_slno: val.Tr_Apprvl_slno,
                    detail_slno: val.detail_slno,
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    training_name: val.training_name,
                    scheduled_slno: val.scheduled_slno,
                    training_apprvl_status: val.training_apprvl_status,
                    employeeId: val.employeeId,
                    em_no: val.em_no,
                    em_name: val.em_name,
                    date: moment(val.schedule_date).format("DD-MM-YYYY"),
                    training_apprvl_user: val.training_apprvl_user,
                    training_apprvl_date: val.training_apprvl_date,
                }
                return object;
            })
            setShowData(displayData)
        }
    }, [tarinerAppvls, Deprtmtl_flag, setShowData])

    const handleSelect = useCallback((params) => {
        const datas = params.data
        const { topic_slno, detail_slno, employeeId } = datas;
        const obj = {
            training_apprvl_status: 1,
            training_apprvl_user: em_id,
            training_apprvl_date: moment(new Date()).format("YYYY:MM:DD HH:mm:ss"),
            topic_slno: topic_slno,
            detail_slno: detail_slno,
            employeeId: employeeId
        }
        const patchdata = {
            training_hod_apprvls_status: 1,
            training_hod_apprvls_user: em_id,
            training_hod_apprvls_date: moment(new Date()).format("YYYY:MM:DD HH:mm:ss"),
            topic_slno: topic_slno,
            slno: detail_slno,
            EmployeeId: employeeId
        }
        if (hod === 1) {
            const HodApprovals = (async (patchdata) => {
                const result = await axioslogin.patch(`/TrainingDetails/updte_hod_dept_veriftn`, patchdata)
                const { success } = result.data;
                if (success === 1) {
                    const result = await axioslogin.patch(`/TrainingDetails/updte_trainer_veriftn`, obj)
                    const { message, success } = result.data;
                    if (success === 1) {
                        succesNofity(message)
                        Setcount(count + 1)
                    }
                    else {
                        warningNofity("Not verified")
                    }
                }
            })
            HodApprovals(patchdata)
        }
        else {
            const DeptVeriftn = (async (obj) => {
                const result = await axioslogin.patch(`/TrainingDetails/updte_trainer_veriftn`, obj)
                const { message, success } = result.data;
                if (success === 1) {
                    succesNofity(message)
                    Setcount(count + 1)
                }
                else {
                    warningNofity("Not verified")
                }
            })
            DeptVeriftn(obj)
        }


    }, [em_id, hod, Setcount, count])

    //Induct
    const [columnDef] = useState([
        { headerName: 'Slno', field: 'Tr_Apprvl_slno', filter: true, width: 100 },
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 200 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 200 },
        { headerName: 'Training Topics', field: 'training_topic_name', filter: true, width: 200 },
        { headerName: 'Schedule Date', field: 'date', filter: true, width: 200 },
        {
            headerName: 'Verification',
            cellRenderer: params => {
                if (params.data.training_apprvl_status === 1) {
                    return <OpenIcon
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Verified">
                            <DoneIcon />
                        </Tooltip>
                    </OpenIcon>
                } else {
                    return <OpenIcon onClick={() => handleSelect(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Verify">
                            <HowToRegIcon color='primary' />
                        </Tooltip>
                    </OpenIcon>
                }
            }
        }
    ])

    return (
        <div>
            <Box sx={{ width: "100%", height: 500, overflow: 'auto' }}>
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={ShowData}
                    sx={{
                        height: 400,
                        width: "100%",
                        mt: 0.5
                    }}
                    rowHeight={30}
                    headerHeight={30}
                />
            </Box>
        </div>
    )
}

export default memo(TrainerDeptAprvl)


