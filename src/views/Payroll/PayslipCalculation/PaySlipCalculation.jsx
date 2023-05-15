import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material'
import React, { Fragment, memo, Suspense, useEffect, useMemo, useState } from 'react'
import PayslipTopCard from './PayslipTopCard'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import TableView from './PaySlipComponents/TableView';
import CommonCheckBox from 'src/views/Component/CommonCheckBox';

const PaySlipCalculation = () => {

  const [plan, setPlan] = useState([])
  const [view, setView] = useState(0)

  const data = useSelector((state) => state.getPaySlipData.dataList, _.isEqual)
  const pyaSlipData = useMemo(() => data, [data]);
  const dispatch = useDispatch();
  useEffect(() => dispatch(setCommonSetting()), [])

  useEffect(() => {
    if (Object.keys(pyaSlipData).length > 0) {
      setPlan(pyaSlipData)
    } else {
      setPlan([])
    }
  }, [pyaSlipData])

  return (
    <Fragment>
      <Box sx={{ width: "100%" }} >
        <Paper square elevation={2} sx={{ p: 0.5, height: '400' }}>
          <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
            <Box sx={{ flex: 1 }} >
              <CssVarsProvider>
                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                  Pay Slip Calculation
                </Typography>
              </CssVarsProvider>
            </Box>
          </Paper>
          <PayslipTopCard setView={setView} />
          <Box sx={{ flex: 1, pt: 0.5 }} >
            <TableContainer component={Paper}>
              <Table sx={{ backgroundColor: '#F3F6F9' }} size="small" >
                <TableHead>
                  <TableRow sx={{ color: '#003A75' }} hover >
                    {/* <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>
                      <CommonCheckBox />
                    </TableCell> */}
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }} > Name </TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }} >ID #</TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Total Days</TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Total Pay Days</TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Fixed Wages</TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>#</TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Earnings</TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>#</TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Deduction</TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>#</TableCell>
                    {/* <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>ESI Employer</TableCell> */}
                    {/* <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>PF Employer</TableCell> */}
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Gross Amount</TableCell>
                    <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Net Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Suspense>
                    {
                      plan?.map((val, ind) => {
                        return <TableView key={ind} val={val} />
                      })
                    }
                  </Suspense>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Box>
    </Fragment >
  )
}

export default memo(PaySlipCalculation)