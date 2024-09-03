import { Box } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import _ from 'underscore';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
import moment from 'moment';
// import { axioslogin } from 'src/views/Axios/Axios';
// import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useSelector } from 'react-redux';
// import DoneIcon from '@mui/icons-material/Done';
// import { IconButton as OpenIcon } from '@mui/material';

const TrainerInductAprvls = ({ InductionFlag, count }) => {

    const [ShowData, setShowData] = useState([]);

    const tarinerAppvlsInduct = useSelector((state) => state?.gettrainingData?.GetTrainerInductApprvls?.GetTrainerInductApprvlsList, _.isEqual);

    useEffect(() => {
        if (Object.keys(tarinerAppvlsInduct).length !== 0 && InductionFlag === true) {
            const displayData = tarinerAppvlsInduct?.map((val) => {
                const object = {
                    Tr_Apprvl_slno: val.Tr_Apprvl_slno,
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    training_name: val.training_name,
                    scheduled_slno: val.scheduled_slno,
                    training_apprvl_status: val.trainer_induct_apprvl_status,
                    employeeId: val.employeeId,
                    em_no: val.emno,
                    em_name: val.em_name,
                    induction_slno: val.induction_slno,
                    date: moment(val.induction_date).format("DD-MM-YYYY"),
                    training_apprvl_user: val.trainer_induct_apprvl_user,
                    training_apprvl_date: val.trainer_induct_apprvl_date,
                    training_iduct_tnd_verify_status: val.training_iduct_tnd_verify_status,
                    status: val.training_iduct_tnd_verify_status === 1 ? "Completed" : "Pending"
                }
                return object;
            })
            setShowData(displayData)
        }
    }, [tarinerAppvlsInduct, count, InductionFlag, setShowData])

    // const handleSelect = useCallback((params) => {
    //     const data = params.data
    //     const { induction_slno, employeeId } = data;
    //     const obj = {
    //         training_apprvl_status: 1,
    //         training_apprvl_user: em_id,
    //         training_apprvl_date: moment(new Date()).format("YYYY:MM:DD HH:mm:ss"),
    //         induction_slno: induction_slno,
    //         employeeId: employeeId
    //     }
    //     const HodApprovals = {
    //         training_induct_hod_aprvl_status: 1,
    //         training_induct_hod_apprvls_user: em_id,
    //         training_induct_hod_apprvls_date: moment(new Date()).format("YYYY:MM:DD HH:mm:ss"),
    //         induction_slno: induction_slno,
    //         EmployeeID: employeeId
    //     }
    //     if (hod === 1) {
    //         const InductVeriftn = (async (obj) => {
    //             const result = await axioslogin.patch(`/TrainingDetails/updte_trainer_Induct_veriftn`, obj)
    //             const { success } = result.data;
    //             if (success === 1) {
    //                 const result = await axioslogin.patch(`/TrainingDetails/updte_hod_Induct_veriftn`, HodApprovals)
    //                 const { message, success } = result.data;
    //                 if (success === 1) {
    //                     succesNofity(message)
    //                     Setcount(count + 1)
    //                 }
    //                 else {
    //                     warningNofity("Not verified")
    //                 }
    //             }
    //             else {
    //                 warningNofity("Not verified")
    //             }
    //         })
    //         InductVeriftn(obj)
    //     } else {
    //         const InductVeriftn = (async (obj) => {
    //             const result = await axioslogin.patch(`/TrainingDetails/updte_trainer_Induct_veriftn`, obj)
    //             const { message, success } = result.data;
    //             if (success === 1) {
    //                 succesNofity(message)
    //                 Setcount(count + 1)
    //             }
    //             else {
    //                 warningNofity("Not verified")
    //             }
    //         })
    //         InductVeriftn(obj)
    //     }
    // }, [em_id, hod, Setcount, count])

    //Induct
    const [columnDef] = useState([
        { headerName: 'Slno', field: 'Tr_Apprvl_slno', filter: true, width: 100 },
        { headerName: 'Employee ID', field: 'em_no', filter: true, width: 200 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 200 },
        { headerName: 'Training Topics', field: 'training_topic_name', filter: true, width: 200 },
        { headerName: 'Schedule Date', field: 'date', filter: true, width: 200 },
        { headerName: 'Training Status', field: 'status', filter: true, width: 200 },

        // {
        //     headerName: 'Verification',
        //     cellRenderer: params => {
        //         if (params.data.training_apprvl_status === 1) {
        //             return <OpenIcon
        //                 sx={{ paddingY: 0.5, cursor: 'none' }}  >
        //                 <Tooltip title="Verified">
        //                     <DoneIcon />
        //                 </Tooltip>
        //             </OpenIcon>
        //         } else {
        //             return <OpenIcon onClick={() => handleSelect(params)}
        //                 sx={{ paddingY: 0.5 }} >
        //                 <Tooltip title="Verify">
        //                     <HowToRegIcon color='primary' />
        //                 </Tooltip>
        //             </OpenIcon>
        //         }
        //     }
        // }
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
export default memo(TrainerInductAprvls) 
