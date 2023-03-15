import { CssVarsProvider, Typography } from '@mui/joy'
import { Alert, Box, Grid, Paper, } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import PayslipTopCard from './PayslipTopCard'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import VirtualTable from './PaySlipComponents/VirtualTable';
import { Virtuoso } from 'react-virtuoso';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import TableView from './PaySlipComponents/TableView';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

const PaySlipCalculation = () => {

  const [plan, setPlan] = useState([])
  const [view, setView] = useState(0)

  const data = useSelector((state) => state.getPaySlipData.dataList, _.isEqual)
  const pyaSlipData = useMemo(() => data, [data]);
  const dispatch = useDispatch();
  useEffect(() => dispatch(setCommonSetting()), [])
  // const arr=pyaSlipData.map((val)=>{
  //   // console.log(val);
  //   const array=pyaSlipData.filter((values)=>val.em_no===values.em_no?values:null)
  //   console.log(array.length);
  // })

  useEffect(() => {
    console.log(pyaSlipData);
    if (Object.keys(pyaSlipData).length > 0) {
      setPlan(pyaSlipData)
      setView(1)
      //const { em_no } = pyaSlipData[0]
      //console.log(em_no);
    } else {

    }
  }, [pyaSlipData])

  console.log(plan);

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
          <Paper square variant="outlined" sx={{
            display: 'flex', p: 0.5, flex: 1, flexDirection: 'column',
            overflow: 'auto',
            '::-webkit-scrollbar': {
              height: 8,
            },
            '::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
              borderRadius: '0px',
            },

            '::-webkit-scrollbar-thumb': {
              // background: '#077DFA',
              borderRadius: '0px',
            },

            '::-webkit-scrollbar-thumb:hover': {
              //   background: 'rgb(255, 251, 251)',
            },
          }}>
            <Box sx={{ display: "flex", flexDirection: "row", px: 1, width: '100%' }}>
              <Box border={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                <CssVarsProvider>
                  <Typography >
                    Name
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '5%' }} >
                <CssVarsProvider>
                  <Typography >
                    ID #
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '5%' }} >
                <CssVarsProvider>
                  <Typography >
                    Total Days
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                <CssVarsProvider>
                  <Typography >
                    Calculated Work Days
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                <CssVarsProvider>
                  <Typography >
                    Fixed Wages
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                <CssVarsProvider>
                  <Typography >
                    Earnings
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                <CssVarsProvider>
                  <Typography >
                    Deduction
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                <CssVarsProvider>
                  <Typography >
                    Gross Salary
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                <CssVarsProvider>
                  <Typography >
                    ESI
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                <CssVarsProvider>
                  <Typography >
                    PF
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                <CssVarsProvider>
                  <Typography >
                    Net Salary
                  </Typography>
                </CssVarsProvider>
              </Box>
            </Box>

            {
              view === 1 ? <TableView plan={plan} /> : null
            }




            {/* 
            <Virtuoso
              style={{ height: 400, width: '100%' }}
              data={plan}

              itemContent={(index, user) => {
                //return <div> {user.make}</ div>

                return <VirtualTable user={user} />
              }}
            /> */}
          </Paper>

        </Paper>
      </Box>
    </Fragment >
  )
}

export default memo(PaySlipCalculation) 