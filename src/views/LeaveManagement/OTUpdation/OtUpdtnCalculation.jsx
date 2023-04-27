import { Button, CssVarsProvider, Input, Textarea, Typography } from '@mui/joy';
import { Box, Paper, Tooltip } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { addMonths } from 'date-fns';
import moment from 'moment';
import CustomAgGridMenuSelection from 'src/views/Component/CustomAgGridMenuSelection';
import { getOtUpdationList } from 'src/redux/actions/OTAction';
import _ from 'underscore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import { axioslogin } from 'src/views/Axios/Axios';

const OtUpdtnCalculation = () => {

    const dispatch = useDispatch();

    const [value, setValue] = useState(moment(new Date()));
    const [dept, changeDept] = useState(0);
    const [section, changeSection] = useState(0);
    const [empNo, setEmpNo] = useState(0);
    const [rows, setRows] = useState([])
    const [tableData, setTableData] = useState([])
    const [updateArray, setupdateArray] = useState([])
    const [count, setCount] = useState(0)

    // dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
        dispatch(getOtUpdationList());
    }, [dispatch, count])

    const alldata = useSelector((state) => state.getOTApprovalData.otUpdation.otUpdationList, _.isEqual)
    const employeeDetl = useMemo(() => alldata, [alldata]);

    const getEmpNO = async (e) => {
        setEmpNo(Number(e.target.value))
    }

    const [column] = useState([
        {
            headerName: 'Sl No',
            field: 'slno',
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
            resizable: true,
        },
        { headerName: 'Emp.ID ', field: 'em_no', filter: true },
        { headerName: 'Emp. Name', field: 'em_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        { headerName: 'OT Date ', field: 'ot_days', },
        { headerName: 'OT Amount ', field: 'ot_amount', wrapText: true, minWidth: 250, },
    ])
    const onSelectionChanged = (event) => {
        if (event.api.getSelectedRows() === 0) {
            setRows([])
        }
        else {
            setRows(event.api.getSelectedRows())
        }
    }
    const handleOnClickFuntion = useCallback(() => {
        if (dept !== 0 && section !== 0) {
            const filterdata = employeeDetl && employeeDetl.filter((val) => {
                return (val.ot_deptsec_id === section && val.ot_updation_status === 0)
            })
            if (Object.keys(filterdata).length > 0) {
                setTableData(filterdata)
            } else {
                infoNofity("No OT request pending for this department!!")
                setTableData([])
            }
        } else if (empNo !== 0) {
            const selectedEmp = employeeDetl?.filter((val) => val.em_no === empNo && val.ot_updation_status === 0);
            if (Object.keys(selectedEmp).length > 0) {
                setTableData(selectedEmp)
            } else {
                infoNofity("There is no employee in this employee number!")
                setTableData([])
            }
        } if (dept !== 0 && section !== 0 && empNo !== 0) {
            const filterdata = employeeDetl && employeeDetl.filter((val) => {
                return (val.ot_deptsec_id === section && val.em_no === empNo && val.ot_updation_status === 0)
            })
            if (Object.keys(filterdata).length > 0) {
                setTableData(filterdata)
            } else {
                infoNofity("No OT request pending for this department!!")
                setTableData([])
            }
        }
    }, [employeeDetl, dept, section, empNo, count])
    const getAll = useCallback(() => {
        const filterdata = employeeDetl && employeeDetl.filter((val) => {
            return (val.ot_updation_status === 0)
        })
        if (Object.keys(filterdata).length > 0) {
            setTableData(filterdata)
        } else {
            infoNofity("No Employees for OT Updation!!")
            setTableData([])
        }
    }, [employeeDetl])

    useEffect(() => {
        if (Object.keys(rows).length > 0) {
            const obj = {
                ot_updation_status: 1,
                ot_updation_date: moment(value).format('YYYY-MM-DD')
            }
            const array = rows.map((item) => item.ot_updation_status === 0 ? { ...item, ...obj } : item);
            setupdateArray(array)
        } else {

        }
    }, [rows])


    const SaveAll = async () => {
        if (value === '') {
            infoNofity("Please Select Date!")
        }
        const result = await axioslogin.patch('/overtimerequest/otupdation/status', updateArray)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity("Updated Successfully")
            setCount(count + 1)
            setRows([])
            setTableData([])
            setEmpNo(0)
        }
        else {
            infoNofity(message)
        }
    }
    return (
        <CustomLayout title="Over Time Updation" displayClose={true} >
            <ToastContainer />
            <Paper sx={{ width: '100%', p: 0.5, flexDirection: 'column' }}  >
                <Paper variant="outlined" sx={{ width: '100%', p: 0.5, flexDirection: 'column' }}  >
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentDropRedx getDept={changeDept} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <DepartmentSectionRedx getSection={changeSection} />
                        </Box>
                        <Tooltip title="Employee Number" followCursor placement='top' arrow>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <Textarea
                                    onChange={getEmpNO}
                                />
                            </Box>
                        </Tooltip>
                        <Box sx={{ display: 'flex', flex: 1, px: 0.5 }}>
                            <Box sx={{ px: 0.5, mt: 0.2 }}>
                                <CssVarsProvider>
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        component="label"
                                        size="md"
                                        fullWidth
                                        color="primary"
                                        startDecorator={<SearchIcon />}
                                        onClick={handleOnClickFuntion}
                                        sx={{ mx: 0.5 }}
                                    >
                                        Search
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ px: 0.5, mt: 0.2 }}>
                                <CssVarsProvider>
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        component="label"
                                        size="md"
                                        fullWidth
                                        color="primary"
                                        onClick={getAll}
                                        startDecorator={<FormatListBulletedIcon />}
                                        sx={{ mx: 0.5 }}
                                    >
                                        All
                                    </Button>
                                </CssVarsProvider>
                            </Box>

                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%', pt: 0.3 }}>
                        <Box sx={{ p: 1 }}>
                            <CssVarsProvider>
                                <Typography>
                                    OT Updation for Salary Month
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    // minDate={subMonths(new Date(), 1)}
                                    maxDate={addMonths(new Date(), 1)}
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{ px: 0.5 }}>
                            <CssVarsProvider>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    fullWidth
                                    color="success"
                                    startDecorator={<SaveIcon />}
                                    onClick={SaveAll}
                                    sx={{ mx: 0.5 }}
                                >
                                    SAVE
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ p: 1, flex: 2, }}>

                        </Box>
                    </Box>
                </Paper>
                <Paper square sx={{ pt: 1.5, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CustomAgGridMenuSelection
                        columnDefs={column}
                        onSelectionChanged={onSelectionChanged}
                        tableData={tableData}
                        sx={{
                            height: 400,
                            width: '100%',
                        }}
                    />
                </Paper>
            </Paper>
        </CustomLayout>
    )
}

export default memo(OtUpdtnCalculation) 