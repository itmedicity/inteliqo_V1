import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { Checkbox, CssVarsProvider, IconButton, Input, Tooltip, Typography } from '@mui/joy'
import { format, isValid } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { ToastContainer } from 'react-toastify'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ReportLayout from '../../ReportComponent/ReportLayout';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import { useDispatch, useSelector } from 'react-redux';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';
import { getDepartmentSectionAll } from 'src/redux/reduxFun/reduxHelperFun';

const MonthlyDepartmentalTrainingReports = () => {

    const [TrainigDetails, setTrainigDetails] = useState([])
    const [selectedMonth, setselectedMonth] = useState('');
    const [PendingFlag, setPendingFlag] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setdeptSection())
    }, [dispatch])

    const filterDeptSection = useSelector((state) => getDepartmentSectionAll(state))
    const departmentSectionListFilterd = useMemo(() => filterDeptSection, [filterDeptSection])

    const HandleMonth = useCallback(async (newValue) => {
        const date = new Date(newValue);
        if (isValid(date) && date !== null && date !== undefined) {
            const formattedDate = format(date, 'yyyy-MM-dd');
            setselectedMonth(formattedDate);
        } else {
            warningNofity("Selected Date is not valid");
        }
    }, []);

    const HandlePendingFlag = useCallback((e) => {
        if (e.target.checked === true) {
            setPendingFlag(e.target.checked)
        }
        else {
            setPendingFlag(false)
        }
    }, [setPendingFlag])

    const SearchingProcess = useCallback(async () => {
        if (selectedMonth !== '') {
            const obj = {
                selectedmonth: format(new Date(selectedMonth), 'MM')
            };

            try {
                const result = await axioslogin.post(`/TrainingInductionReport/ScheduledDeptTrainingList`, obj);
                const { success, data } = result.data;

                if (success === 2 && data.length !== 0) {
                    const mappedData = data.map((val) => ({
                        Slno: val.Slno,
                        training_topic_name: val.training_topic_name,
                        schedule_date: val.schedule_date,
                        date: format(new Date(val.schedule_date), 'dd-MM-yyyy'),
                        trainer_name: val.trainer_name,
                        dept_name: val.dept_name,
                        sect_name: val.sect_name,
                        schedule_remark: val.schedule_remark,
                        department: val.department,
                        deparment_sect: val.deparment_sect
                    }));

                    setTrainigDetails(mappedData);

                    if (PendingFlag === true) {
                        const filteredWithDept = departmentSectionListFilterd.filter(
                            (val) => val.dept_id !== mappedData.department &&
                                val.sect_id !== mappedData.deparment_sect
                        );
                        // Assuming you want to update the training details with the filtered data.
                        setTrainigDetails(filteredWithDept);
                    }
                } else {
                    warningNofity("No Training Records Found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                warningNofity("An error occurred while fetching training records");
            }
        } else {
            warningNofity("Select Any Month For Search");
        }
    }, [selectedMonth, PendingFlag, departmentSectionListFilterd]);


    //table
    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'Slno', filter: true, width: 150 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 300 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 300 },
        { headerName: 'Training Date', field: 'date', filter: true, width: 150 },
        { headerName: 'Training Topic', field: 'training_topic_name', filter: true, width: 250 },
        { headerName: 'Trainer Name', field: 'trainer_name', filter: true, width: 200 },
        { headerName: 'Remarks', field: 'schedule_remark', filter: true, width: 250 }
    ])
    const [PendingcolumnDef] = useState([
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 1000 },
    ])

    return (
        <Paper elevation={0}>
            <ReportLayout title="Departmental Training Reports" data={TrainigDetails} displayClose={true} >
                <ToastContainer />
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ mt: 0.3, p: 1, display: "flex", flexDirection: "row", width: "60%", gap: 2 }}>
                        <Box sx={{ p: 1, mt: 3 }}>
                            <Checkbox
                                name="status"
                                color="primary"
                                checked={PendingFlag}
                                className="ml-1"
                                onChange={(e) => HandlePendingFlag(e)}
                                label="Pending Department List"
                            />
                        </Box>
                        <Box sx={{ p: 0.5, flex: 1 }}>
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>Select Month</Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <LocalizationProvider dateAdapter={AdapterMoment} >
                                    <DatePicker
                                        views={['month']}
                                        inputFormat="DD-MM-YYYY"
                                        value={selectedMonth}
                                        onChange={(newValue) => {
                                            HandleMonth(newValue);
                                        }}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                <CssVarsProvider>
                                                    <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                </CssVarsProvider>
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>
                        <Box sx={{ p: 0.5, mt: 3 }}>
                            <CssVarsProvider>
                                <Tooltip title="Search Employees">
                                    <IconButton variant="outlined" size='sm' color="primary"
                                        onClick={SearchingProcess}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                            </CssVarsProvider>
                        </Box>

                    </Box>
                    {PendingFlag === false ?
                        <Box sx={{ width: "100%", }}>
                            <Paper sx={{ height: 700, display: 'flex', flexDirection: "column" }}>
                                <CustomAgGridRptFormatOne
                                    tableDataMain={TrainigDetails}
                                    columnDefMain={columnDef}
                                    sx={{
                                        height: 600,
                                        width: "100%",
                                        mt: 1
                                    }}
                                    rowHeight={30}
                                    headerHeight={30}
                                />
                            </Paper>
                        </Box>
                        :
                        <Box sx={{ width: "100%", }}>
                            <Paper sx={{ height: 700, display: 'flex', flexDirection: "column" }}>
                                <CustomAgGridRptFormatOne
                                    tableDataMain={TrainigDetails}
                                    columnDefMain={PendingcolumnDef}
                                    sx={{
                                        height: 600,
                                        width: "100%",
                                        mt: 1
                                    }}
                                    rowHeight={30}
                                    headerHeight={30}
                                />
                            </Paper>
                        </Box>
                    }
                </Box>
            </ReportLayout>
        </Paper>
    )
}

export default memo(MonthlyDepartmentalTrainingReports) 
