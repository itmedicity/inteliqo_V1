import { Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import moment from 'moment'
import React, { Fragment, Suspense, useCallback, useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import LeaveCancelEmp from '../EmpView/LeaveCancelEmp';
import HalfdayCancelEmp from '../EmpView/HalfdayCancelEmp';
import NopunchCancelEmp from '../EmpView/NopunchCancelEmp';
import CompOffCancelEmp from '../EmpView/CompOffCancelEmp';

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
        const { hrstatus, code } = event
        if (hrstatus === 1) {
            warningNofity("HR Approval is Already done! You can't delete request")
        } else {
            if (code === 1) {
                setlveData(event)
                setleaveReqModal(true)
            } else if (code === 2) {
                sethalfData(event)
                sethalfDayReqModal(true)
            } else if (code === 3) {
                setnoPunchData(event)
                setnoPunchReqModal(true)
            } else if (code === 4) {
                setcoffData(event)
                setcoffReqModal(true)
            }
        }

    }, [])


    return (
        <Fragment>
            <Suspense>
                <LeaveCancelEmp open={leaveReqModal} setOpen={setleaveReqModal} data={lveData} setCount={setCount} />
                <HalfdayCancelEmp open={halfDayReqModal} setOpen={sethalfDayReqModal} data={halfData} setCount={setCount} />
                <NopunchCancelEmp open={noPunchReqModal} setOpen={setnoPunchReqModal} data={noPunchData} setCount={setCount} />
                <CompOffCancelEmp open={coffReqModal} setOpen={setcoffReqModal} data={coffData} setCount={setCount} />
            </Suspense>
            <TableContainer component={Grid}
                item
                xs={'auto'}
                sm={'auto'}
                md={'auto'}
                lg={'auto'}
                xl={'auto'}
                sx={{
                    display: 'flex',
                }}>
                <Table sx={{ border: 1 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Emp Name</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Deptartment Section</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Request Type</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Date</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Reason</TableCell>
                            <TableCell align="center" style={{ fontWeight: 'bold', color: '#4f5d73', fontFamily: 'sans-serif' }} >Leave Cancel</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            List && List.map((val, index) => {
                                return < TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{val.name} </TableCell>
                                    <TableCell align="center">{val.section} </TableCell>
                                    <TableCell align="center">{val.type} </TableCell>
                                    <TableCell align="center">{moment(val.fromDate).format("DD-MM-YYYY")}</TableCell>
                                    <TableCell align="center">{val.reason}</TableCell>
                                    <TableCell align="center">
                                        <IconButton size="small"
                                            onClick={(e) => {
                                                LeaveCancel(val)
                                            }}
                                        >
                                            <DeleteIcon fontSize="inherit" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

export default DeptSectionBasedEmpTable