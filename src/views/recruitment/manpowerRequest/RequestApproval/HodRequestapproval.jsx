
import React, { memo, lazy, useState, useEffect, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom';
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { IconButton, Paper, Tooltip } from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import BeenhereIcon from '@mui/icons-material/Beenhere'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector } from 'react-redux'
import _ from 'underscore'
const ModalHod = lazy(() => import('./ModalHod'))


const HodRequestapproval = () => {
    const [data, setData] = useState([])
    const [count, setcount] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState({})
    const history = useHistory();
    const toRedirectToHome = () => {
        history.push('/Home');
    }
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_department } = employeeProfileDetl;
    const postData = useMemo(() => {
        return {
            dept_id: em_department
        }
    }, [em_department])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.post('/Manpower/approvalgethod/all', postData)
            const { success, data } = result.data

            if (success === 1) {
                const arr = data?.map((val) => {
                    const obj = {
                        dept_name: val?.dept_name.toLowerCase(),
                        desg_name: val?.desg_name.toLowerCase(),
                        em_name: val?.em_name === null ? null : val?.em_name.toLowerCase(),
                        addition_status: val?.addition_status,
                        apprentice_status: val?.apprentice_status,
                        contract_status: val?.contract_status,
                        createdate: moment(val?.createdate).format('DD-MM-YYYY'),
                        dept_id: val?.dept_id,
                        desg_id: val?.desg_id,
                        ed_approval_status: val?.ed_approval_status,
                        manpower_required_no: val?.manpower_required_no,
                        new_position_status: val?.new_position_status,
                        permanent_status: val?.permanent_status,
                        replacement_emid: val?.replacement_emid,
                        replacement_status: val?.replacement_status,
                        required_date: moment(val?.required_date).format('DD-MM-YYYY'),
                        salaryfrom: val?.salaryfrom,
                        salaryto: val?.salaryto,
                        trainee_status: val?.trainee_status,
                        Hod_approval: val?.Hod_approval_status,
                        Hod_approval_status: val?.Hod_approval_status === 1 ? 'Approved' : val?.Hod_approval_status === 2 ? 'Rejected' : "Pending"
                        // type: val.apprentice_status === 1 ? 'Apprentice' : val.contract_status === 1 ? 'Contract' : val.permanent_status === 1 ? 'Permanent' : val.trainee_status === 1 ? 'Trainee' : 'NIL'
                    }
                    return obj
                })
                setcount(0)
                setData(arr)
            } else {
                setData([])
            }
        }
        fetchData()
    }, [count])

    const handleIconClick = useCallback((params) => {
        setIsModalOpen(true)
        setSelectedRowData(params?.data)
    }, [setIsModalOpen, setSelectedRowData])

    const [columnDef] = useState([
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Designation', field: 'desg_name', filter: true },
        // { headerName: 'Type', field: 'manpower_required_no', filter: true },
        { headerName: 'Required No', field: 'manpower_required_no', filter: true },
        // { headerName: 'Replacement', field: 'sect_name', filter: true },
        { headerName: 'Requested date', field: 'createdate', filter: true },
        { headerName: 'last date', field: 'required_date', filter: true },
        {
            headerName: 'Action',
            cellRenderer: (params) => {
                if (params?.data?.Hod_approval === 1) {
                    return (
                        <IconButton sx={{ p: 0.1, cursor: 'none' }}>
                            <Tooltip title="approved ">
                                <BeenhereIcon />
                            </Tooltip>
                        </IconButton>
                    )
                }
                else if (params?.data?.Hod_approval === 2) {
                    return (
                        <IconButton sx={{ p: 0.1, cursor: 'none' }}>
                            <Tooltip title="approved ">
                                <HighlightOffIcon />
                            </Tooltip>
                        </IconButton>
                    )
                }
                else {
                    return (
                        <IconButton
                            sx={{ p: 0.1 }}
                            fontSize="small"
                            color="primary"
                            onClick={() => handleIconClick(params)}
                        >
                            <Tooltip title="Click Here to Approve">
                                <AddTaskIcon />
                            </Tooltip>
                        </IconButton>
                    )
                }

            },
        },
        { headerName: 'Status', field: 'Hod_approval_status', filter: true },
    ])
    return (
        <DasboardCustomLayout
            title={"Manpower Request Approval"}
            displayClose={true}
            setClose={toRedirectToHome}
        >
            <Paper sx={{ flex: 1 }}>
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={data}
                    sx={{
                        height: window.innerHeight - 120,
                        width: '100%',
                        p: 1,
                    }}
                    rowHeight={30}
                    headerHeight={30}
                />
                <ModalHod
                    setcount={setcount}
                    count={count}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    selectedRowData={selectedRowData}
                />
            </Paper>
        </DasboardCustomLayout>
    )
}

export default memo(HodRequestapproval) 