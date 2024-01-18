import React, { Fragment, memo, useEffect, useState } from 'react'
import _ from 'underscore';
import { useDispatch, useSelector } from 'react-redux';
import { MonthlyReport } from 'src/redux/actions/Training.Action';
import { Paper } from '@mui/material';
import ReportLayout from 'src/views/HrReports/ReportComponent/ReportLayout';
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne';
import { ToastContainer } from 'react-toastify';

const TrainingMonthlyReport = ({ Month, count }) => {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Month !== null) {
            const mnth = Month + 1;
            dispatch(MonthlyReport(mnth))
        }
    }, [dispatch, count, Month])

    const Report = useSelector((state) => state?.gettrainingData?.MonthlyDetails?.MonthlyDetailsList, _.isEqual);

    useEffect(() => {
        const displayData = Report?.map((val) => {
            const object = {
                calender_slno: val.calender_slno,
                em_name: val.em_name,
                emp_dept: val.emp_dept,
                emp_dept_sectn: val.emp_dept_sectn,
                emp_desig: val.emp_desig,
                offline_status: val.offline_status,
                posttest_mark: val.posttest_mark,
                posttest_status: val.posttest_status,
                pretest_status: val.pretest_status,
                retest_mark: val.retest_mark !== null ? val.retest_mark : "No Retest",
                schedule_date: val.schedule_date,
                slno: val.slno,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                em_id: val.em_id,
                online_status: val.online_status,
                retest_status: val.retest_status,
                retest: val.retest_status === 1 ? "Yes" : "No",
                Pretest_mark: val.Pretest_mark,
                online_mode: val.online_mode === 1 ? "Yes" : "No",
                offline_mode: val.offline_mode === 1 ? "Yes" : "No",
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                eligible: val.retest_mark >= 2 || val.posttest_mark >= 2 ? "Eligible" : "Not Eligible"
            }
            return object;
        })
        setData(displayData)
    }, [Report, setData])

    const [columnDef] = useState([
        { headerName: 'Sl.No', field: 'calender_slno', filter: true, width: 100 },
        { headerName: 'Emp No', field: 'em_id', filter: true, width: 200 },
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 200 },
        { headerName: 'Department', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Training Topics', field: 'training_topic_name', filter: true, width: 200 },
        { headerName: 'Online_mode', field: 'online_mode', filter: true, width: 200 },
        { headerName: 'Offline_mode', field: 'offline_mode', filter: true, width: 200 },
        { headerName: 'Pree-Test Mark', field: 'Pretest_mark', filter: true, width: 200 },
        { headerName: 'Post-Mark', field: 'posttest_mark', filter: true, width: 200 },
        { headerName: 'Retest_Status', field: 'retest', filter: true, width: 200 },
        { headerName: 'Retest_mark', field: 'retest_mark', filter: true, width: 200 },
        { headerName: 'Eligible/Not', field: 'eligible', filter: true, width: 200 },
    ])

    return (
        <Fragment>
            <ToastContainer />
            <ReportLayout title="Monthly Training Report" data={data} displayClose={true} >
                <Paper sx={{ width: '100%' }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            p: 1, mt: 0.5,
                            display: 'flex',
                            backgroundColor: '#f0f3f5',
                            flexDirection: "column",
                        }} >
                        <CustomAgGridRptFormatOne
                            tableDataMain={data}
                            columnDefMain={columnDef}
                        />
                    </Paper>
                </Paper>
            </ReportLayout>
        </Fragment>

    )
}

export default memo(TrainingMonthlyReport)
