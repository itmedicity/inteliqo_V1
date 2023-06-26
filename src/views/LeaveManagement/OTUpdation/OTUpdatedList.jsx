import { Box, FormControl, IconButton, MenuItem, Paper, Select, Tooltip } from '@mui/material'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { getOtUpdationList } from 'src/redux/actions/OTAction'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import _ from 'underscore';
import { getMonth } from 'date-fns'
import DeleteIcon from '@mui/icons-material/Delete';
import { axioslogin } from 'src/views/Axios/Axios'

const OTUpdatedList = () => {

    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([])
    const [changeMonth, setChngeMonth] = useState(0)
    const [count, setCount] = useState(0)

    const [column] = useState([
        { headerName: 'Emp.ID ', field: 'em_no', filter: true },
        { headerName: 'Emp. Name', field: 'em_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        { headerName: 'OT Date ', field: 'ot_days', },
        { headerName: 'OT Amount ', field: 'ot_amount', wrapText: true, minWidth: 250, },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Delete" followCursor placement='top' arrow >
                        <IconButton sx={{ paddingY: 0.5 }}
                            onClick={() => deleteFromOtUpdate(params)}
                        >
                            <DeleteIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])
    useEffect(() => {
        dispatch(getOtUpdationList());
    }, [dispatch, count])

    const alldata = useSelector((state) => state.getOTApprovalData.otUpdation.otUpdationList, _.isEqual)
    const employeeDetl = useMemo(() => alldata, [alldata]);

    useEffect(() => {
        const filterdata = employeeDetl && employeeDetl.filter((val) => {
            return (val.ot_updation_status === 1)
        })
        if (Object.keys(filterdata).length > 0) {
            setTableData(filterdata)
            setCount(0)
        } else {
            infoNofity("No Employees for OT Updation!!")
            setTableData([])
        }
        if (changeMonth !== 0) {
            const filterdata = employeeDetl && employeeDetl.filter((val) => {
                return (val.ot_updation_status === 1)
            })
            const list = filterdata && filterdata.filter((val) => {
                return ((getMonth(new Date(val.ot_updation_date)) + 1) === changeMonth)
            })
            setTableData(list)
            setCount(0)
        }
    }, [employeeDetl, changeMonth])

    const deleteFromOtUpdate = async (params) => {
        const data = params.api.getSelectedRows()
        const { ot_slno, emp_id } = data[0]
        const postData = {
            ot_slno: ot_slno,
            emp_id: emp_id
        }
        const result = await axioslogin.patch('/overtimerequest/otupdatelist/update', postData)
        const { success, message } = result.data;
        if (success === 2) {
            setCount(count + 1)
            succesNofity(message)
        } else {
            warningNofity(message)
        }
    }

    return (
        <CustomLayout title="Over Time Updation List" displayClose={true} >
            <ToastContainer />
            <Paper sx={{ width: '100%', }}  >
                <Paper square sx={{ display: 'flex', flex: 1, mb: 0.4, p: 0.8, alignItems: 'center', }} >
                    <Box sx={{ display: 'flex', flex: 1, pt: 0.4, pr: 0.8, }} >
                        <FormControl
                            fullWidth={true}
                            margin="dense"
                            size='small'
                            sx={{ display: "flex", flex: 2 }}
                        >
                            <Select
                                fullWidth
                                variant="outlined"
                                margin='dense'
                                size='small'
                                defaultValue={0}
                                value={changeMonth}
                                onChange={(e) => setChngeMonth(e.target.value)}
                            >
                                <MenuItem value={0} disabled>Select Month</MenuItem>
                                <MenuItem value={1} >January</MenuItem>
                                <MenuItem value={2} >February</MenuItem>
                                <MenuItem value={3} >March</MenuItem>
                                <MenuItem value={4} >April</MenuItem>
                                <MenuItem value={5} >May</MenuItem>
                                <MenuItem value={6} >June</MenuItem>
                                <MenuItem value={7} >July</MenuItem>
                                <MenuItem value={8} >August</MenuItem>
                                <MenuItem value={9} >September</MenuItem>
                                <MenuItem value={10} >October</MenuItem>
                                <MenuItem value={11} >November</MenuItem>
                                <MenuItem value={12} >December</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 3, pt: 0.4, pr: 0.8, }} >
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >
                    <CommonAgGrid
                        columnDefs={column}
                        tableData={tableData}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    // rowStyle={rowStyle}
                    // getRowStyle={getRowStyle}
                    />
                </Paper>
            </Paper>

        </CustomLayout>
    )
}

export default OTUpdatedList