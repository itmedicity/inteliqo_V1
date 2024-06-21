import { Box } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import { IconButton as OpenIcon } from '@mui/material';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
// import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
// import DoneIcon from '@mui/icons-material/Done';

const HODInductaprvl = ({ em_id, InductionFlag }) => {

    const [tableData, setTableData] = useState([]);
    const [ShowData, setShowData] = useState([]);

    useEffect(() => {
        if (InductionFlag === true) {
            const getDeptData = (async () => {
                const result = await axioslogin.get(`/TrainingDetails/hod_Induct_Apprvl/${em_id}`)
                const { data, success } = result.data;
                if (success === 2) {
                    setTableData(data)
                }
                else {
                    setTableData([])
                }
            })
            getDeptData()
        }
    }, [InductionFlag, em_id])

    useEffect(() => {
        if (Object.keys(tableData).length !== 0 && InductionFlag === true) {
            const displayData = tableData?.map((val, index) => {
                const object = {
                    Tr_Apprvl_slno: val.Tr_Apprvl_slno,
                    induction_slno: val.induction_slno,
                    schedule_no: val.schedule_no,
                    date: moment(val.induction_date).format("DD-MM-YYYY"),
                    topic_slno: val.topic_slno,
                    em_name: val.em_name,
                    em_no: val.em_no,
                    training_topic_name: val.training_topic_name,
                    trainer_induct_apprvl_status: val.trainer_induct_apprvl_status,
                    training_induct_hod_aprvl_status: val.training_induct_hod_aprvl_status,
                    training_induct_hod_apprvls_user: val.training_induct_hod_apprvls_user,
                    training_induct_hod_apprvls_date: val.training_induct_hod_apprvls_date,
                    EmployeeID: val.EmployeeID,
                    training_iduct_tnd_verify_status: val.training_iduct_tnd_verify_status,
                    status: val.training_iduct_tnd_verify_status === 1 ? "Completed" : "Pending"
                }
                return object;
            })
            setShowData(displayData)
        }
    }, [tableData, InductionFlag, setShowData])

    // const handleSelect = useCallback((params) => {
    //     const datas = params.data
    //     const { induction_slno, EmployeeID } = datas;
    //     const obj = {
    //         training_induct_hod_aprvl_status: 1,
    //         training_induct_hod_apprvls_user: em_id,
    //         training_induct_hod_apprvls_date: moment(new Date()).format("YYYY:MM:DD HH:mm:ss"),
    //         induction_slno: induction_slno,
    //         EmployeeID: EmployeeID
    //     }
    //     const DeptVeriftn = (async (obj) => {
    //         const result = await axioslogin.patch(`/TrainingDetails/updte_hod_Induct_veriftn`, obj)
    //         const { message, success } = result.data;
    //         if (success === 1) {
    //             succesNofity(message)
    //             Setcount(count + 1)
    //         }
    //         else {
    //             warningNofity("Not verified")
    //         }
    //     })
    //     DeptVeriftn(obj)

    // }, [em_id, Setcount, count])

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
        //         if (params.data.training_induct_hod_aprvl_status === 1) {
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
    )
}

export default memo(HODInductaprvl)


