import React, { Fragment, memo, Suspense, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import MarkingComponent from './MarkingComponent'
import MasterLayout from '../MasterComponents/MasterLayout'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material'
import { ToastContainer } from 'react-toastify';

const HodAuthorisation = () => {
    const [hodcheck, sethod] = useState(false)
    const [inchargecheck, setincharge] = useState(false)
    const [tableView, setTableView] = useState(0)

    const [tabledata, setTabledata] = useState([{
        sect_name: '',
        em_name: '',
        emp_id: '',
        coassign: false,
    }])

    const gethod = useCallback(async (e) => {
        e.target.checked === true ? sethod(true) : setincharge(false)
        e.target.checked === false ? sethod(false) : setincharge(false)

        const result = await axioslogin.get('/authorization/hod')
        const { success, data, message } = result.data;
        if (success === 1) {
            setTableView(1)
            setTabledata(data);
        } else {
            setTabledata([])
            setTableView(0)
            warningNofity(message)
        }
    }, [])
    const getincharge = useCallback(async (e) => {
        e.target.checked === true ? setincharge(true) : sethod(false)
        e.target.checked === false ? setincharge(false) : sethod(false)
        const result = await axioslogin.get('/authorization/incharge')
        const { success, data, message } = result.data;
        if (success === 1) {
            setTableView(1)
            setTabledata(data);
        } else {
            setTabledata([])
            setTableView(0)
            warningNofity(message)
        }
    }, [])
    return (
        <Fragment>
            <ToastContainer />
            <MasterLayout title={"HOD Authorisation Assignment"} displayClose={true}>
                <Box sx={{ width: "100%" }} >
                    <Paper variant='outlined' square sx={{ width: '100%', display: 'flex', py: 2, px: 0.5 }} >
                        <Box sx={{ mt: 1, ml: 2 }}>
                            <JoyCheckbox
                                label='HOD'
                                checked={hodcheck}
                                name="hodcheck"
                                onchange={(e) => gethod(e)}
                            />
                        </Box>
                        <Box sx={{ mt: 1, ml: 10 }}>
                            <JoyCheckbox
                                label='Incharge'
                                checked={inchargecheck}
                                name="inchargecheck"
                                onchange={(e) => getincharge(e)}
                            />
                        </Box>
                    </Paper>
                    <Paper square variant="outlined" sx={{ display: 'flex', p: 0.5, flex: 1 }}>
                        <Box sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table size="small" stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }} > #ID </TableCell>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }} >Department</TableCell>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Employee Name</TableCell>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>CO</TableCell>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Assign</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <Suspense>
                                        {
                                            tableView === 1 ? <TableBody>
                                                {tabledata && tabledata.map((tabledata, index) => {
                                                    return <MarkingComponent
                                                        value={tabledata}
                                                        key={index}
                                                    />
                                                }
                                                )}
                                            </TableBody> : null
                                        }
                                    </Suspense>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Paper>
                </Box>
            </MasterLayout>
        </Fragment>
    )
}

export default memo(HodAuthorisation) 
