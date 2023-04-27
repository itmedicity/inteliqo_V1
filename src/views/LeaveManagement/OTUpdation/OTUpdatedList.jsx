import { Box, FormControl, MenuItem, Paper, Select } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { getOtUpdationList } from 'src/redux/actions/OTAction'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import _ from 'underscore';
import { getMonth } from 'date-fns'

const OTUpdatedList = () => {

    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([])
    const [changeMonth, setChngeMonth] = useState(0)

    const [column] = useState([

        { headerName: 'Emp.ID ', field: 'em_no', filter: true },
        { headerName: 'Emp. Name', field: 'em_name', filter: true },
        { headerName: 'Department Section', field: 'sect_name', filter: true },
        { headerName: 'OT Date ', field: 'ot_days', },
        { headerName: 'OT Amount ', field: 'ot_amount', wrapText: true, minWidth: 250, },
    ])
    useEffect(() => {
        dispatch(getOtUpdationList());
    }, [dispatch])

    const alldata = useSelector((state) => state.getOTApprovalData.otUpdation.otUpdationList, _.isEqual)
    const employeeDetl = useMemo(() => alldata, [alldata]);

    useEffect(() => {
        const filterdata = employeeDetl && employeeDetl.filter((val) => {
            return (val.ot_updation_status === 1)
        })
        if (Object.keys(filterdata).length > 0) {
            setTableData(filterdata)
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
        }
    }, [employeeDetl, changeMonth])

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
                                onChange={useCallback((e) => setChngeMonth(e.target.value))}
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