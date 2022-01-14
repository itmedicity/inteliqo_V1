import React, { Fragment, useEffect, useState } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OTRequestTable from './OTRequestTable'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios'
import { format } from 'date-fns'

const OTRequest = () => {
    const history = useHistory()
    const [otDate, setOtDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [tabledata, setTableData] = useState({
        date: '',
        shift: '',
        shift_Start: '',
        shift_end: '',
        in_time: '',
        out_time: '',
        over_time: ''
    })
    const postdata = {
        emp_no: '8889',
        ot_date: otDate,
    }


    const getShiftdetail = async () => {
        const result = await axioslogin.post('/common/getShiftdetails', postdata)
        const { success, data } = result.data;

        if (success === 1) {
            const { ot_date, shft_code, shft_chkin_time, shft_chkout_time, check_in, check_out } = data[0]
            const frmdata = {
                date: ot_date,
                shift: shft_code,
                shift_Start: shft_chkin_time,
                shift_end: shft_chkout_time,
                in_time: check_in,
                out_time: check_out
            }
            console.log(data);
            setTableData(frmdata);
        } else if (success === 2) {
            infoNofity("No Shift is added to this employee")
        } else {
            warningNofity(" Error occured contact EDP")
        }
    }

    //Get Data
    useEffect(() => {


    }, []);

    const getDate = (e) => {
        var selectdate = e.target.value
        var selectDate = format(new Date(selectdate), "yyyy-MM-dd")
        setOtDate(selectDate)
    }

    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }



    return (
        <Fragment>
            <PageLayoutSave
                heading="Over Time Request"
                redirect={RedirectToProfilePage}
            //submit={}

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
                                    value={otDate}
                                    name="otDate"
                                    changeTextValue={(e) => {
                                        getDate(e)
                                    }}
                                />

                            </div>


                            <div className="col-md-1 pl-2">
                                <MdOutlineAddCircleOutline align="right" className="text-danger" size={32}
                                    onClick={getShiftdetail} />

                            </div>
                        </div>
                        <div className="row g-1 ">
                            <div className="card ">
                                <div className="col-md-12">
                                    <TableContainer sx={{ maxHeight: 150 }}>
                                        <Table size="small"
                                            // icons={tableIcons}
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
                                                    {/* <TableCell align="center">
                                                        <DeleteForeverOutlinedIcon size={20} />

                                                    </TableCell> */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                <TableRow
                                                    // key={row.date}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    {/* <TableCell component="th" scope="row" align="center" >
                                                            {row.date}
                                                        </TableCell> */}
                                                    <TableCell align="center">{tabledata.date}</TableCell>
                                                    <TableCell align="center">{tabledata.shift}</TableCell>
                                                    <TableCell align="center">{tabledata.shift_Start}</TableCell>
                                                    <TableCell align="center">{tabledata.shift_end}</TableCell>
                                                    <TableCell align="center">{tabledata.in_time}</TableCell>
                                                    <TableCell align="center">{tabledata.out_time}</TableCell>
                                                    <TableCell align="center">{tabledata.over_time}</TableCell>

                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        <div className="row g-1 pt-2">
                            < div className="col-md-12">
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Over Time Reason"
                                //value={fine_descp}
                                //name="fine_descp"
                                />
                            </div>
                            <div className="row g-1 ">
                                <div className="col-md-12 ">
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
