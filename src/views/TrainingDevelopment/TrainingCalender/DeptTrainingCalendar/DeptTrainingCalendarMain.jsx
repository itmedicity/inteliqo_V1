import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { getYear, getMonth, subYears } from 'date-fns';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DeptEmployeeNameDesList, TrainerNames, TrainingTopics } from 'src/redux/actions/Training.Action';
import { CssVarsProvider, Input, Tooltip } from '@mui/joy';
import { setDepartment } from 'src/redux/actions/Department.action';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeptCalendarLayout from './DeptCalendarLayout';

const DeptTrainingCalendarMain = () => {

    const dispatch = useDispatch()

    const [count, SetCount] = useState(0)
    const [dept, setdept] = useState(0);
    const [deptSec, setdeptSec] = useState(0);
    const [year, setYear] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [table, setTable] = useState(0);
    const [checkdata, setCheckdata] = useState([]);

    useEffect(() => {
        dispatch(setDepartment());
        dispatch(TrainingTopics());
        dispatch(TrainerNames());
        dispatch(DeptEmployeeNameDesList(dept))
    }, [dispatch, count, dept])

    const EmpDetails = useSelector((state) => state?.gettrainingData?.deptEmpNameDesDetails?.deptEmpNameDesDetailsList,);

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

            <Box sx={{ p: 0, width: "100%", display: "flex", flexDirection: "row", gap: 0.5, flexWrap: "wrap" }}>
                <Tooltip title="Select Department">
                    <Box sx={{ flex: 1 }}>
                        <DepartmentDropRedx getDept={setdept} />
                    </Box>
                </Tooltip>
                <Tooltip title="Select Department Section">
                    <Box sx={{ flex: 1 }}>
                        <DepartmentSectionRedx getSection={setdeptSec} />
                    </Box>
                </Tooltip>
                <Tooltip title="Select Year">
                    <Box sx={{ flex: 1 }}>
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
            </Box>
            <Box>
                {table === 1 ? <DeptCalendarLayout checkdata={checkdata} setTable={setTable} EmpDetails={EmpDetails} table={table} count={count} SetCount={SetCount} dept={dept} deptSec={deptSec} year={year} /> : null}
            </Box>
        </Fragment >
    );
};

export default memo(DeptTrainingCalendarMain) 
