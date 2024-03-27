import { IconButton, Paper } from '@mui/material'
import React, { Fragment, Suspense, useCallback, useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import LeaveCancelEmp from '../EmpView/LeaveCancelEmp';
import HalfdayCancelEmp from '../EmpView/HalfdayCancelEmp';
import NopunchCancelEmp from '../EmpView/NopunchCancelEmp';
import CompOffCancelEmp from '../EmpView/CompOffCancelEmp';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import BeenhereIcon from '@mui/icons-material/Beenhere';

const DeptSectionBasedEmpTable = ({ leavecanceldetl, setCount }) => {

    const List = useMemo(() => leavecanceldetl, [leavecanceldetl])

    //MODAL STATES FOR RENDERING OPEN MODAL & UPDATE DATA
    const [leaveReqModal, setleaveReqModal] = useState(false);
    const [coffReqModal, setcoffReqModal] = useState(false);
    const [halfDayReqModal, sethalfDayReqModal] = useState(false);
    const [noPunchReqModal, setnoPunchReqModal] = useState(false);

    //UPDATE DATA
    const [lveData, setlveData] = useState({});
    const [coffData, setcoffData] = useState({});
    const [halfData, sethalfData] = useState({});
    const [noPunchData, setnoPunchData] = useState({});

    const LeaveCancel = useCallback(async (event) => {
        const { hrstatus, code } = event.data
        if (hrstatus === 1) {
            warningNofity("HR Approval is Already done! You can't delete request")
        } else {
            if (code === 1) {
                setlveData(event.data)
                setleaveReqModal(true)
            } else if (code === 2) {
                sethalfData(event.data)
                sethalfDayReqModal(true)
            } else if (code === 3) {
                setnoPunchData(event.data)
                setnoPunchReqModal(true)
            } else if (code === 4) {
                setcoffData(event.data)
                setcoffReqModal(true)
            }
        }

    }, [])

    const [columnDef] = useState([
        { headerName: 'Emp. ID', field: 'emno', filter: true },
        { headerName: 'Emp. Name', field: 'name', filter: true },
        { headerName: 'Dept. Section', field: 'section', filter: true },
        { headerName: 'Request Type', field: 'type', },
        { headerName: 'Leave Date', field: 'fromDate', },
        { headerName: 'Leave Reason', field: 'reason', },
        { headerName: 'Status', field: 'status', },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.hrstatus === 1) {
                    return <IconButton
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <BeenhereIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ paddingY: 0.5 }} onClick={() => LeaveCancel(params)} >
                        <DeleteIcon color='primary' />
                    </IconButton>
                }
            }
        },
    ])

    return (
        <Fragment>
            <Suspense>
                <LeaveCancelEmp open={leaveReqModal} setOpen={setleaveReqModal} data={lveData} setCount={setCount} />
                <HalfdayCancelEmp open={halfDayReqModal} setOpen={sethalfDayReqModal} data={halfData} setCount={setCount} />
                <NopunchCancelEmp open={noPunchReqModal} setOpen={setnoPunchReqModal} data={noPunchData} setCount={setCount} />
                <CompOffCancelEmp open={coffReqModal} setOpen={setcoffReqModal} data={coffData} setCount={setCount} />
            </Suspense>
            <Paper square elevation={0} sx={{
                p: 1, mt: 0.5, display: 'flex', flexDirection: "column",
                width: "100%"
            }} >
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={List}
                    sx={{
                        height: 400,
                        width: "100%"
                    }}
                    rowHeight={30}
                    headerHeight={30}
                />
            </Paper>
        </Fragment>
    )
}

export default DeptSectionBasedEmpTable