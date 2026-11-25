import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Paper, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity, errorNofity } from 'src/views/CommonCode/Commonfunc';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import moment from 'moment';

const OtRequestTable = ({ employeeData, count, setCount }) => {

    const [tableData, setTableData] = useState([]);

    // Logged in user information
    const empInform = useSelector((state) => getEmployeeInformationLimited(state));
    const { em_id } = useMemo(() => empInform, [empInform]);

    const targetEmpId = employeeData?.emID || em_id;

    // Load Overtime details
    useEffect(() => {
        if (targetEmpId && targetEmpId !== 0) {
            const fetchOtDetails = async () => {
                try {
                    const result = await axioslogin.get(`/overtimerequest/details/${targetEmpId}`);
                    const { success, data } = result.data;
                    if (success === 1) {
                        const formatted = data.map((item, idx) => ({
                            ...item,
                            slno: idx + 1,
                            ot_days_formatted: item.ot_days ? moment(item.ot_days).format('DD-MM-YYYY') : '',
                            ot_date_formatted: item.ot_date ? moment(item.ot_date).format('DD-MM-YYYY') : '',
                            ot_duration_formatted: `${Math.floor((item.over_time || 0) / 60)}h ${(item.over_time || 0) % 60}m`
                        }));
                        setTableData(formatted);
                    } else if (success === 0) {
                        setTableData([]);
                    } else {
                        setTableData([]);
                    }
                } catch {
                    setTableData([]);
                }
            };
            fetchOtDetails();
        }
    }, [targetEmpId, count]);

    // Handle Delete OT Request
    const handleDeleteOTRequest = useCallback(async (params) => {
        const rowData = params?.data;
        if (!rowData) return;

        const { ot_slno, em_no, check_in, check_out } = rowData;

        const punchResetArray = [
            { emp_code: em_no, punch_time: check_in },
            { emp_code: em_no, punch_time: check_out }
        ];

        try {
            const result = await axioslogin.delete(`/overtimerequest/delete/${ot_slno}`);
            const { message, success } = result.data;

            if (success === 1) {
                try {
                    await axioslogin.patch('/overtimerequest/inactive/punch', punchResetArray);
                } catch {
                    // Ignore punch reset secondary error
                }
                succesNofity(message || "Overtime request deleted successfully");
                if (setCount) {
                    setCount(prev => prev + 1);
                }
            } else {
                warningNofity("Failed to delete request, contact EDP");
            }
        } catch (err) {
            errorNofity(err?.message || "Error deleting request");
        }
    }, [setCount]);

    const [columnDefs] = useState([
        { headerName: 'Sl No', field: 'slno', filter: true, width: 90 },
        { headerName: 'OT Date', field: 'ot_days_formatted', filter: true, width: 130 },
        { headerName: 'Request Date', field: 'ot_date_formatted', filter: true, width: 140 },
        { headerName: 'Over Time', field: 'ot_duration_formatted', filter: true, width: 120 },
        { headerName: 'OT Reason', field: 'ot_reson', filter: true, minWidth: 160 },
        { headerName: 'OT Remarks', field: 'ot_remarks', wrapText: true, minWidth: 180 },
        { headerName: 'Status', field: 'who', filter: true, width: 160 },
        {
            headerName: 'Action',
            width: 100,
            cellRenderer: (params) => (
                <Tooltip title="Delete Overtime Request" followCursor placement='top' arrow>
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteOTRequest(params)}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )
        }
    ]);

    return (
        <Paper square elevation={0} sx={{ p: 0, mt: 0.8, display: 'flex', flexDirection: "column", width: "100%" }}>
            <CommonAgGrid
                columnDefs={columnDefs}
                tableData={tableData}
                sx={{
                    height: 380,
                    width: "100%"
                }}
                rowHeight={32}
                headerHeight={32}
            />
        </Paper>
    );
};

export default memo(OtRequestTable);
