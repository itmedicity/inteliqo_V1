import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { Checkbox, FormControlLabel } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import MarkingComponent from './MarkingComponent'
const HodAuthorisation = () => {
    const history = useHistory()
    const [hodcheck, sethod] = useState(false)
    const [inchargecheck, setincharge] = useState(false)
    const [tabledataset, settabledata] = useState(0)

    const [tabledata, setTabledata] = useState([{
        sect_name: '',
        em_name: '',
        emp_id: '',
        coassign: false,
    }])

    const updateAuthorization = async (e) => {
        e.target.checked === true ? sethod(true) : setincharge(false)
        e.target.checked === false ? sethod(false) : setincharge(false)
    }

    const updateAuthorizationin = async (e) => {
        e.target.checked === true ? setincharge(true) : sethod(false)
        e.target.checked === false ? setincharge(false) : sethod(false)
    }

    const gethod = async () => {
        const result = await axioslogin.get('/authorization/hod')
        const { success, data } = result.data;
        if (success === 1) {
            settabledata(1)
            setTabledata(data);
        } else {
            warningNofity(" Error occured contact EDP")
        }
    }
    const getincharge = async () => {
        const result = await axioslogin.get('/authorization/incharge')
        const { success, data } = result.data;
        if (success === 1) {
            settabledata(1)
            setTabledata(data);
        } else {
            warningNofity(" Error occured contact EDP")
        }
    }

    const toSettings = () => {
        history.push('/Home/Settings');
    }
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <PageLayoutCloseOnly
                heading="HOD Authorisation Assignment"
                redirect={toSettings}
            >
                <div className="card">
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="row g-1">
                                <div className="col-md-1 text-center">
                                    <FormControlLabel
                                        className="pb-0 mb-0"
                                        control={
                                            <Checkbox
                                                name="hodcheck"
                                                color="primary"
                                                value={hodcheck}
                                                checked={hodcheck}
                                                className="py-0 px-3"
                                                onChange={(e) => {
                                                    updateAuthorization(e)
                                                    gethod(e)
                                                }}
                                            />
                                        }
                                        label="HOD"
                                    />
                                </div>
                                <div className="col-md-2 text-center ">
                                    <FormControlLabel
                                        className="pb-0 mb-0 noWrap"
                                        control={
                                            <Checkbox
                                                name="incharge"
                                                color="primary"
                                                value={inchargecheck}
                                                checked={inchargecheck}
                                                className="py-0 pl-3 "
                                                onChange={(e) => {
                                                    updateAuthorizationin(e)
                                                    getincharge(e)
                                                }}
                                            />
                                        }
                                        label="Incharge"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-1 ">
                    <div className="card ">
                        <div className="col-md-12 pt-1">
                            <TableContainer sx={{ maxHeight: 250 }}>
                                <Table size="small"
                                    stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                            <TableCell align="center">emp_id</TableCell>
                                            <TableCell align="center">Department</TableCell>
                                            <TableCell align="center">Employee Name</TableCell>
                                            <TableCell align="center">CO</TableCell>
                                            <TableCell align="center">Assign</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {
                                        tabledataset === 1 ? <TableBody>
                                            {tabledata && tabledata.map((tabledata, index) => {
                                                return <MarkingComponent
                                                    value={tabledata}
                                                    key={index}
                                                />
                                            }
                                            )}
                                        </TableBody> : null
                                    }
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default HodAuthorisation
