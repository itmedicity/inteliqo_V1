import React, { useState, lazy, useCallback, useMemo, memo, useEffect } from 'react'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout';
import { Paper, IconButton } from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { useHistory } from 'react-router-dom';
import { Box, Tooltip } from '@mui/joy';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import { useDispatch } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action';
import { axioslogin } from 'src/views/Axios/Axios'
import moment from 'moment';
import AddTaskIcon from '@mui/icons-material/AddTask'
const VacancyModal = lazy(() => import('./VacancyModal'))

const Vacancy = () => {
    const dispatch = useDispatch();
    const [dept, changeDept] = useState(0);
    const [data, setdata] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState({})
    const [count, setcount] = useState(0)
    //  dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch,])

    const history = useHistory();
    const toRedirectToHome = () => {
        history.push('/Home');
    }
    // for getting the data
    const postData = useMemo(() => {
        return {
            dept_id: dept,
        }
    }, [dept])
    useEffect(() => {
        if (dept !== 0) {
            const fetchData = async () => {
                const result = await axioslogin.post('/Manpower/vacancy', postData)
                const { success, data } = result.data
                if (success === 1) {
                    const arr = data?.map((val, index) => {
                        const obj = {
                            desg_name: val?.desg_name.toLowerCase(),
                            manpower_required_no: val?.manpower_required_no,
                            createdate: moment(val?.createdate).format('DD-MM-YYYY'),
                            required_date: moment(val?.required_date).format('DD-MM-YYYY'),
                            ed_approval_date: moment(val?.ed_approval_date).format('DD-MM-YYYY'),
                            dept_name: val?.dept_name.toLowerCase(),
                            sl_no: index + 1,
                            desg_id: val?.desg_id,
                            dept_id: val?.dept_id
                        }
                        return obj
                    })
                    setcount(0)
                    setdata(arr)
                } else {
                    setdata([])
                }
            }
            fetchData()
        } else {
        }
    }, [dept, count])

    // view data
    const handleIconClick = useCallback((params) => {
        setIsModalOpen(true)
        setSelectedRowData(params?.data)
    }, [setIsModalOpen, setIsModalOpen])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'sl_no' },
        { headerName: 'Designation', field: 'desg_name', filter: true },
        { headerName: 'Required No', field: 'manpower_required_no', filter: true },
        { headerName: 'Requested date', field: 'createdate', filter: true },
        { headerName: 'Approved date', field: 'ed_approval_date', filter: true },
        { headerName: 'Wanted date', field: 'required_date', filter: true },
        {
            headerName: 'Action',
            cellRenderer: (params) => {
                return (
                    <IconButton
                        sx={{ p: 0.1 }}
                        fontSize="small"
                        color="primary"
                        onClick={() => handleIconClick(params)}
                    >
                        <Tooltip title="Click Here to Announce Vacancy">
                            <AddTaskIcon />
                        </Tooltip>
                    </IconButton>
                )
            },
        },
    ])
    return (
        <DasboardCustomLayout
            title={"Vacancy Announcement"}
            displayClose={true}
            setClose={toRedirectToHome}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100% ', justifyItems: 'center' }}>
                <Box sx={{ width: "30%", mt: 1, px: 0.2, ml: .5, display: 'flex' }}>
                    <DepartmentDropRedx getDept={changeDept} deptValue={dept} />
                </Box>
                <Paper sx={{ flex: 1 }}>
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={data}
                        sx={{
                            height: window.innerHeight - 160,
                            width: '100%',
                            p: 1,
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                    <VacancyModal
                        setcount={setcount}
                        count={count}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        selectedRowData={selectedRowData}
                    />
                </Paper>
            </Box>


        </DasboardCustomLayout>
    )
}

export default memo(Vacancy)