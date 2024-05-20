import { Paper, Box, TextField } from '@mui/material';
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton as Openbtn } from '@mui/material';
import EditscheduleModal from './EditscheduleModal';
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage';
import _ from 'underscore';
import TrainingTypeSelect from 'src/views/MuiComponents/TrainingTypeSelect';
import { TrainingType } from 'src/redux/actions/Training.Action';

const TrainingScheduleEmployees = ({ setShow, count, Setcount }) => {
    const [tableData, setTableData] = useState([]);
    const [filterdate, setFilterDate] = useState(moment());
    const [pickdate, setPickdate] = useState();
    const [flag, setFlag] = useState(0);
    const [open, setOpen] = useState(false);
    const [modalflag, setmodalFlag] = useState(0);
    const [scheduledata, setScheduleData] = useState({});
    const [trainingType, setTrainingtype] = useState(0);

    const schedule = useSelector((state) => state?.gettrainingData?.trainingSchedule?.trainingScheduleList, _.isEqual)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(TrainingType());
    }, [dispatch, count])

    useEffect(() => {
        const displayData = schedule?.map((val) => {
            const object = {
                tnd_slno: val.tnd_slno,
                tns_emp_id: val.tns_emp_id,
                trainingtype_slno: val.trainingtype_slno,
                type_name: val.type_name,
                tnd_date: moment(val.tnd_date).format("DD-MM-YYYY"),
                em_id: val.em_id,
                em_name: val.em_name,
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                cat_slno: val.cat_slno,
                trin_cat_name: val.trin_cat_name,
                name_slno: val.name_slno,
                training_name: val.training_name
            }
            return object;
        })
        setTableData(displayData)

        if (flag === 1) {
            const ScheduleDate = displayData.filter((val) => {
                return val.tnd_date === pickdate

            })

            if (ScheduleDate.length !== 0) {
                setTableData(ScheduleDate);
            }
            else {
                warningNofity("No training Scheduled")
            }
        }
    }, [schedule, pickdate, flag])

    //edit field
    const editField = useCallback((params) => {
        setScheduleData(params.data);
        setOpen(true);
        setmodalFlag(1);
    }, [])

    const [columnDef] = useState([
        { headerName: 'Emp_No', field: 'tns_emp_id', filter: true, minWidth: 150 },
        { headerName: 'Name', field: 'em_name', filter: true, minWidth: 150 },
        { headerName: 'Department', field: 'dept_name', filter: true, minWidth: 150 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, minWidth: 250 },
        { headerName: 'Training Type', field: 'type_name', filter: true, minWidth: 250 },
        { headerName: 'Training Category', field: 'trin_cat_name', filter: true, minWidth: 200 },
        { headerName: 'Training Name', field: 'training_name', filter: true, minWidth: 150 },
        { headerName: 'Schedule Date', field: 'tnd_date', filter: true, minWidth: 100 },

        {
            headerName: 'Edit', width: 150, cellRenderer: params =>
                <Fragment>
                    <Openbtn sx={{ paddingY: 0.5 }} onClick={() => editField(params)} >
                        <EditIcon color='primary' />
                    </Openbtn>
                </Fragment>
        },
    ])

    const handleDateChange = useCallback(() => {
        const selectdate = moment(filterdate, "DD-MM-YYYY").toDate();
        const getdate = moment(selectdate).format("DD-MM-YYYY")
        setPickdate(getdate);
        setFlag(1);

        const scheduleType = schedule?.filter((val) => {
            return val.trainingtype_slno === trainingType
        })
        setTableData(scheduleType);
    }, [filterdate, trainingType, schedule])

    return (
        <CustomDashboardPage title="Training Schedule_New Joinees" displayClose={true} setClose={setShow}  >
            <Paper variant='outlined' sx={{ width: "100%", p: 1 }}>
                <Box sx={{ p: 1, display: "flex", flexDirection: "row", gap: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment} >
                        <DatePicker
                            views={['day']}
                            inputFormat="DD-MM-YYYY"
                            value={filterdate}
                            onChange={setFilterDate}
                            renderInput={(params) => (
                                <TextField {...params} helperText={null} size="small" />
                            )}
                        />
                    </LocalizationProvider>

                    <Box sx={{ width: "20%" }} >
                        <TrainingTypeSelect
                            value={trainingType}
                            setValue={setTrainingtype}
                        />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <SearchIcon
                            color="neutral"
                            onClick={handleDateChange}
                        />
                    </Box>
                </Box>

                <Paper square sx={{
                    pt: 1, mt: 0.5, display: 'flex', flexDirection: "column"
                }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 700,
                            width: "100%",
                            overflow: 'auto',
                            '::-webkit-scrollbar': { display: "none" }
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
                {modalflag === 1 ? <EditscheduleModal count={count} Setcount={Setcount} scheduledata={scheduledata} open={open} setOpen={setOpen} modalflag={modalflag} setmodalFlag={setmodalFlag} /> : null}
            </Paper>
        </CustomDashboardPage>
    )
}
export default memo(TrainingScheduleEmployees)
