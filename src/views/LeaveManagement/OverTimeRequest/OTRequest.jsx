import React, { Fragment } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import { MdDelete, MdOutlineAddCircleOutline } from 'react-icons/md'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OTRequestTable from './OTRequestTable'
import { tableIcons } from 'src/views/Constant/MaterialIcon';

const OTRequest = () => {
    function createData(date, shift, shift_Start, shift_end, in_time, out_time, over_time) {
        return { date, shift, shift_Start, shift_end, in_time, out_time, over_time };
    }
    const rows = [
        createData('26/12/2021', 'M1', '9.00', '5.00', '8.58', '7.00', '2'),
        createData('27/12/2021', 'M1', '9.00', '5.00', '9.00', '8.00', '3'),
        createData('28/12/2021', 'M1', '9.00', '5.00', '9.00', '8.00', '3'),
        createData('29/12/2021', 'M1', '9.00', '5.00', '9.00', '8.00', '3'),
        createData('30/12/2021', 'M1', '9.00', '5.00', '9.00', '8.00', '3'),
        createData('31/12/2021', 'M1', '9.00', '5.00', '9.00', '8.00', '3'),

    ];
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const ViewTable = () => {
        history.push(`/Home`)
    }


    return (
        <Fragment>
            <PageLayoutSave
                heading="Over Time Request"
                redirect={RedirectToProfilePage}
                //submit={submitFine}
                view={ViewTable}
            >

                <div className="card">
                    <div className="card-body">
                        <div className="row g-1">
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Employee Name"
                                    //value={fine_descp}
                                    //name="fine_descp"
                                    disabled="Disabled"
                                />
                            </div>
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Employee ID"
                                    //value={fine_descp}
                                    //name="fine_descp"
                                    disabled="Disabled"
                                />
                            </div>
                            <div className="col-md-2">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Designation"
                                    //value={fine_descp}
                                    //name="fine_descp"
                                    disabled="Disabled"
                                />
                            </div>
                            <div className="col-md-2">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="Start Date"
                                //value={fineend}
                                // name="fineend"
                                // changeTextValue={(e) => { }}
                                />
                            </div>
                            <div className="col-md-2">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="End Date"
                                //value={fineend}
                                // name="fineend"
                                // changeTextValue={(e) => { }}
                                />
                            </div>
                            <div className="col-md-1">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="No of days"
                                    fullWidth
                                // value={}
                                // name=""
                                />
                            </div>
                            <div className="col-md-1 pl-2">
                                <MdOutlineAddCircleOutline align="right" className="text-danger" size={32}
                                />

                            </div>
                        </div>
                        <div className="row g-1 pt-2">
                            <div className="card ">
                                <div className="col-md-12">
                                    <TableContainer sx={{ maxHeight: 150 }}>
                                        <Table size="small"
                                            icons={tableIcons}
                                            stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow >
                                                    <TableCell align="center">Date</TableCell>
                                                    <TableCell align="center">Shift</TableCell>
                                                    <TableCell align="center">Shift Start</TableCell>
                                                    <TableCell align="center">Shift end</TableCell>
                                                    <TableCell align="center">In</TableCell>
                                                    <TableCell align="center">Out</TableCell>
                                                    <TableCell align="center">OT(In hour)</TableCell>
                                                    <TableCell align="center">
                                                        <DeleteForeverOutlinedIcon size={20} />

                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.date}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" align="center" >
                                                            {row.date}
                                                        </TableCell>
                                                        <TableCell align="center">{row.shift}</TableCell>
                                                        <TableCell align="center">{row.shift_Start}</TableCell>
                                                        <TableCell align="center">{row.shift_end}</TableCell>
                                                        <TableCell align="center">{row.in_time}</TableCell>
                                                        <TableCell align="center">{row.out_time}</TableCell>
                                                        <TableCell align="center">{row.over_time}</TableCell>
                                                        <TableCell align="center">
                                                            <MdDelete size={20} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        <div className="row g-1 pt-1">
                            < div className="col-md-8">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Over Time Reason"
                                //value={fine_descp}
                                //name="fine_descp"
                                />
                            </div>
                            <div className="col-md-4 ">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Total Over Time "
                                //value={fine_descp}
                                //name="fine_descp"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 pt-2">
                    <div className="card">
                        <OTRequestTable />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment >
    )
}

export default OTRequest
