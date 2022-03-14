import React, { Fragment, useState, memo, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SessionCheck from 'src/views/Axios/SessionCheck'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import CoffShowTableMap from './CoffShowTableMap';


const CoffshowTable = ({ emp_id, overtime, setOtAdd, setnewottime, setotslno, Setovertimesl }) => {
    const [arraydata, setarraydata] = useState([])
    const [deletearry, setDeletearry] = useState([])
    const [tabledata, setTabledata] = useState([{
        coff_slno: '',
        ot_days: '',
        ot_time: '',
        ot_slno: ''
    }])
    const postdata = {
        emp_id: emp_id
    }
    useEffect(() => {
        const getOt = async () => {
            const result = await axioslogin.post('/overtimerequest/get/otcalc', postdata)
            const { success, data, message } = result.data;
            if (success === 1) {
                setTabledata(data);
            } else if (success === 2) {
                warningNofity(message)
            } else {
                warningNofity("Error Occured Please Contact EDP")
            }
        }
        getOt();
    }, [emp_id]);

    useEffect(() => {
        const addot = async () => {
            const fixedwagessum = arraydata.map((val) => val.ot_time).reduce((sum, val) => sum + val, 0)
            const totalOT = fixedwagessum + overtime;
            setOtAdd({
                totalot: totalOT,
            })
            setnewottime({
                over_time: totalOT,
            })
            setotslno(arraydata.map((val) => val.coff_slno))
            Setovertimesl(arraydata.map((val) => val.ot_slno))
        }
        addot()
    }, [arraydata]);
    return (
        <Fragment>
            <SessionCheck />
            <div className="row g-1 ">
                <div className="card ">
                    <div className="col-md-12 pt-1">
                        <TableContainer sx={{ maxHeight: 250 }}>
                            <Table size="small"
                                stickyHeader aria-label="sticky table">
                                <TableHead >
                                    <TableRow >
                                        <TableCell align="center">OT Slno</TableCell>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">OT Time</TableCell>
                                        <TableCell align="center">Select</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tabledata && tabledata.map((tabledata, index) => {
                                        return <CoffShowTableMap
                                            value={tabledata}
                                            key={index}
                                            setarraydata={setarraydata}
                                            arraydata={arraydata}
                                            setDeletearry={setDeletearry}
                                            deletearry={deletearry}
                                        />
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(CoffshowTable)