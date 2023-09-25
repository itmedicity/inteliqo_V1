import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, Typography } from '@mui/material'
import React, { Fragment, lazy, memo, useMemo } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { axioslogin } from 'src/views/Axios/Axios'
import { useEffect, useState } from 'react'
const Previousvacc = lazy(() => import('./Previousvacc'))
const Vaccinationdetials = lazy(() => import('./Vaccinationdetials'))



const VaccinationInformation = () => {
  const [data, setdata] = useState([])

  const state = useSelector(
    (state) => state.getPrifileDateEachEmp.empPersonalData.personalData,
    _.isEqual,
  )

  const vaccinationList= useSelector(
    (state) => state.setVaccinationemp.VaccinationList,
    _.isEqual,
  )
  const empVaccination=useMemo(()=>vaccinationList,[vaccinationList])
  


  useEffect(() => {
    const fetchData = async () => {
      const result = await axioslogin.get(`/Vaccination/getannual/${state.em_id}`)
      const { success, data } = result.data

      if (success === 1) {
        setdata(data)
      } else {
        setdata([])
      }
    }

    fetchData()
  }, [setdata,state.em_id])

  return (
    <Fragment>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ height: 30, display: 'flex', alignItems: 'center', p: 1 }}>
          <DragIndicatorOutlinedIcon color="success" />
          <Typography sx={{ fontWeight: 600, pt: 0.5 }}>Vaccination information</Typography>
        </Paper>

        <Box sx={{ p: 1, fontWeight: 500 }}>
          <CssVarsProvider>
            <Typography>Vaccinated Date and Due Date</Typography>
          </CssVarsProvider>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
          <Box
            border={1}
            sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
          >
            <CssVarsProvider>
              <Typography>Vaccination</Typography>
            </CssVarsProvider>
          </Box>
          <Box
            borderTop={1}
            borderBottom={1}
            sx={{
              p: 1,
              display: 'flex',
              width: '25%',
              height: 'auto',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <CssVarsProvider>
              <Typography sx={{}}>First Dose</Typography>
              <Typography>(0 Month)</Typography>
            </CssVarsProvider>
          </Box>
          <Box
            border={1}
            sx={{
              p: 1,
              display: 'flex',
              fontWeight: 400,
              width: '25%',
              height: 'auto',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <CssVarsProvider>
              <Typography>Second Dose</Typography>
              <Typography>(After 1 month)</Typography>
            </CssVarsProvider>
          </Box>
          <Box
            borderTop={1}
            borderRight={1}
            borderBottom={1}
            sx={{
              p: 1,
              display: 'flex',
              width: '25%',
              height: 'auto',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <CssVarsProvider>
              <Typography>Third Dose</Typography>
              <Typography>
                ( 6<sup>th</sup> month)
              </Typography>
            </CssVarsProvider>
          </Box>
          <Box
            borderTop={1}
            borderRight={1}
            borderBottom={1}
            sx={{
              p: 1,
              display: 'flex',
              width: '25%',
              height: 'auto',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <CssVarsProvider>
              <Typography>Booster Dose</Typography>
              <Typography>(if required)</Typography>
            </CssVarsProvider>
          </Box>
        </Box>

        <Vaccinationdetials  empVaccination={empVaccination}/>
       
      <Previousvacc data={data}/>
       </Box>
    </Fragment>
  )
}

export default memo( VaccinationInformation)
