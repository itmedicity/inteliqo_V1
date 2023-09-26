import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, Typography } from '@mui/material'
import React, { Fragment, lazy, memo, useMemo } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { axioslogin } from 'src/views/Axios/Axios'
import { useEffect, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import Heading from 'src/views/Component/MuiCustomComponent/Heading'
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
        <CustmTypog title={'Vaccinated Date and Due Date'} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
          <Box
            border={1}
            sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
          >
          <Heading  title={'Vaccination'}/>
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
                    <Heading  title={'First Dose'}/>
                    <Heading  title={'(0 Month)'}/>
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
            <Heading  title={'Second Dose'}/>
            <Heading  title={'(After 1 month)'}/>
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
            <Heading  title={'Third Dose'}/>
            <Heading  title={'( after 6 month)'}/>
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
           <Heading  title={'Booster Dose'}/>
            <Heading  title={'( if required)'}/>
          </Box>
        </Box>

        <Vaccinationdetials  empVaccination={empVaccination}/>
       
      <Previousvacc data={data}/>
       </Box>
    </Fragment>
  )
}

export default memo( VaccinationInformation)
