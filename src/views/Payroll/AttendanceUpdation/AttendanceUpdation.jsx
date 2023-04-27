import { CssVarsProvider, Typography } from '@mui/joy'
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import UpdationTopCard from './UpdationTopCard'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { Actiontypes } from 'src/redux/constants/action.type'
import _ from 'underscore'

const AttendanceUpdation = () => {

  const [excel, setExcel] = useState([])

  const reduxDispatch = useDispatch()
  const { GET_EXCEL_DATA } = Actiontypes;

  const excelData = useSelector((state) => state.getExcelData.excelList, _.isEqual);

  const excelDataList = useMemo(() => excelData, [excelData]);

  useEffect(() => {
    Object.keys(excelDataList).length > 0 ? setExcel(excelDataList) : setExcel([]);
  }, [excelDataList])

  useEffect(() => {
    return () => {
      reduxDispatch({ type: GET_EXCEL_DATA, payload: [], status: true })
    }
  }, [GET_EXCEL_DATA, reduxDispatch])

  return (
    <CustomLayout title="Attendance Marking - Manual" displayClose={true} >
      <ToastContainer />
      <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column', width: '100%' }}>
        <UpdationTopCard />
        <Paper square variant='outlined' elevation={0} sx={{ display: "flex", alignItems: "center", }}  >
          <Box sx={{ flex: 1 }} >
            <CssVarsProvider>
              <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                Attendance Details
              </Typography>
            </CssVarsProvider>
          </Box>
        </Paper>

        <Paper square variant="outlined" sx={{ display: 'flex', p: 0.5, flex: 1 }}>
          {/* employee Name Section */}
          <Box sx={{ width: '100%' }}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Name
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        ID #
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Total Days
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Actual Worked
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Calculated Worked
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        OFF Days
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Leaves
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Leave Without Pay
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Loss Of Pay
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Calculated LOP
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Holiday
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Holiday Worked
                      </Box>
                    </TableCell>
                    <TableCell sx={{ p: 0, backgroundColor: '#F5F5F6', border: 0.1, borderColor: '#E1E6E1' }}>
                      <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                        Total Pay Day
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {excel.map((row, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, backgroundColor: '#f1faee', width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.EmployeeName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.EmployeeNo}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.Total}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.Worked}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.CalculatedWorked}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.off}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.Leave}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.lwp}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.lop}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.Calculatedlop}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.holiday}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.holidayworked}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                        <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                          <Typography variant="body2" gutterBottom noWrap={true}>
                            {row.total_p_day}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>
    </CustomLayout>
  )
}

export default AttendanceUpdation