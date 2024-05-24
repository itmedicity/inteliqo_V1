import { Fragment, memo, React, useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/joy/Box';
import { Paper } from '@mui/material';
import { CssVarsProvider, Input, Tooltip } from '@mui/joy';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import { getMonth, getYear, subYears } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';
import { DeptEmployeeNameDesList, TrainerNames, TrainingTopics } from 'src/redux/actions/Training.Action';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import TableCalender from './TableCalender';
import _ from 'underscore';
import { ToastContainer } from 'react-toastify';

const DepartmentalCalender = () => {
    const dispatch = useDispatch();


    const [dept, setdept] = useState(0);
    const [deptSec, setdeptSec] = useState(0);
    const [table, setTable] = useState(0);
    const [checkdata, setCheckdata] = useState([]);
    const [count, Setcount] = useState(0);
    const [year, setYear] = useState(moment(new Date()).format("YYYY-MM-DD"));

    useEffect(() => {
        dispatch(setDepartment());
        dispatch(TrainingTopics());
        dispatch(TrainerNames());
        dispatch(DeptEmployeeNameDesList(dept))
    }, [dispatch, count, dept])

    const EmpDetails = useSelector((state) => state?.gettrainingData?.deptEmpNameDesDetails?.deptEmpNameDesDetailsList, _.isEqual);

    const handleYearChange = useCallback((e) => {
        const Y = moment(new Date(e)).format("YYYY")
        setYear(Y);
    }, [setYear])

    const postdata = useMemo(() => {
        return {
            department: dept,
            deparment_sect: deptSec,
            schedule_year: year,
        }
    }, [dept, deptSec, year])

    useEffect(() => {
        const getData = async (postdata) => {
            const result = await axioslogin.post(`/TrainingAfterJoining/selectdepartmentalSchedule`, postdata)
            const { data, success } = result.data;
            if (success === 2) {
                if (data.length !== 0) {
                    setTable(1);
                    const displayData = data?.map((val) => {
                        const object = {
                            slno: val.slno,
                            topic_slno: val.topic_slno,
                            dept_id: val.dept_id,
                            sect_id: val.sect_id,
                            dept_name: val.dept_name,
                            schedule_year: val.schedule_year,
                            year: getYear(new Date(val.schedule_year)),
                            schedule_date: val.schedule_date,
                            months: getMonth(new Date(val.schedule_date)),
                            date: moment(val.schedule_date).format("DD/MM/YYYY"),
                            schedule_remark: val.schedule_remark,
                            training_topic_name: val.training_topic_name,
                            traineer_name: val.traineer_name
                        }
                        return object;
                    })
                    setCheckdata(displayData)
                }
                else {
                    setTable(1);
                }
            }
            else {
                warningNofity("Nodata Found")
                setCheckdata([])
                setTable(0);
            }
        }
        if ((dept !== 0 && deptSec !== 0 && deptSec !== undefined) || count !== 0) {
            getData(postdata);

        }
    }, [postdata, count, dept, deptSec, year])
    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: '100%' }}>
                <Box>
                    <Paper variant='outlined' sx={{ p: 1, width: "100%", display: "flex", flexDirection: "row", gap: 0.5, flexWrap: "wrap" }}>
                        <Tooltip title="Select Department">
                            <Box sx={{ flex: 1, }}>
                                <DepartmentDropRedx getDept={setdept} />
                            </Box>
                        </Tooltip>
                        <Tooltip title="Select Department Section">
                            <Box sx={{ flex: 1, }}>
                                <DepartmentSectionRedx getSection={setdeptSec}
                                />
                            </Box>
                        </Tooltip>
                        <Tooltip title="Select Year">
                            <Box sx={{ flex: 1, }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['year']}
                                        value={year}
                                        onChange={handleYearChange}
                                        minDate={subYears(new Date(), 0)} // Disable previous years
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CssVarsProvider>
                                                    <Input fullWidth ref={inputRef} {...inputProps} />
                                                </CssVarsProvider>
                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Tooltip>
                        <Box sx={{ flex: 1 }}></Box>
                    </Paper>
                </Box>

            </Box>
            {
                table === 1 ? <TableCalender EmpDetails={EmpDetails} checkdata={checkdata} dept={dept} setdept={setdept} deptSec={deptSec} setdeptSec={setdeptSec} year={year}
                    setYear={setYear} count={count} Setcount={Setcount} setTable={setTable} /> : null
            }
        </Fragment>
    );
}

export default memo(DepartmentalCalender)


