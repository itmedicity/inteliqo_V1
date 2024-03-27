import { Box, Tooltip } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { IconButton as OpenIcon } from '@mui/material';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DoneIcon from '@mui/icons-material/Done';

const HodDeptapvl = ({ em_id, Deprtmtl_flag, Setcount, count }) => {

    const [tableData, setTableData] = useState([]);
    const [ShowData, setShowData] = useState([]);

    useEffect(() => {
        if (Deprtmtl_flag === true) {
            const getDeptData = (async () => {
                const result = await axioslogin.get(`/TrainingDetails/hod_dept_Apprvl/${em_id}`)
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
    }, [Deprtmtl_flag, em_id])

    useEffect(() => {
        if (Object.keys(tableData).length !== 0 && Deprtmtl_flag === true) {
            const displayData = tableData?.map((val, index) => {
                const object = {
                    Tr_Apprvl_slno: val.Tr_Apprvl_slno,
                    slno: val.slno,
                    date: moment(val.schedule_date).format("DD-MM-YYYY"),
                    em_name: val.em_name,
                    training_apprvl_status: val.training_apprvl_status,
                    training_hod_apprvls_status: val.training_hod_apprvls_status,
                    training_hod_apprvls_user: val.training_hod_apprvls_user,
                    training_hod_apprvls_date: val.training_hod_apprvls_date,
                    topic_slno: val.topic_slno,
                    training_topic_name: val.training_topic_name,
                    em_no: val.em_no,
                    EmployeeId: val.EmployeeId
                }
                return object;
            })
            setShowData(displayData)
        }
    }, [tableData, Deprtmtl_flag, setShowData])

    const handleSelect = useCallback((params) => {
        const datas = params.data
        const { topic_slno, slno, EmployeeId } = datas;
        const obj = {
            training_hod_apprvls_status: 1,
            training_hod_apprvls_user: em_id,
            training_hod_apprvls_date: moment(new Date()).format("YYYY:MM:DD HH:mm:ss"),
            topic_slno: topic_slno,
            slno: slno,
            EmployeeId: EmployeeId
        }
        const DeptVeriftn = (async (obj) => {
            const result = await axioslogin.patch(`/TrainingDetails/updte_hod_dept_veriftn`, obj)
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

    }, [em_id, Setcount, count])

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

export default memo(HodDeptapvl) 
