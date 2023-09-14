import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { axioslogin } from 'src/views/Axios/Axios'
import { useEffect, useState } from 'react'
import Moment from 'moment'

const VaccinationInformation = () => {
  const [data, setdata] = useState([])

  const state = useSelector(
    (state) => state.getPrifileDateEachEmp.empPersonalData.personalData,
    _.isEqual,
  )

  const [vaccinationList, setVaccinationList] = useSelector(
    (state) => state.setVaccinationemp.VaccinationList,
    _.isEqual,
  )

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
  }, [setdata])

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
        <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
          <Box
            borderLeft={1}
            borderRight={1}
            borderBottom={1}
            sx={{ display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
          >
            <CssVarsProvider>
              <Typography p={1}>Hepatitis B</Typography>
            </CssVarsProvider>
          </Box>
          <Box
            borderBottom={1}
            sx={{
              display: 'flex',
              width: '25%',
              height: 'auto',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <CssVarsProvider>
              <Typography sx={{ p: 1 }}>
                {vaccinationList.firstdose_date === null
                  ? 'not vaccinated'
                  : vaccinationList.firstdose_date}
              </Typography>
            </CssVarsProvider>
          </Box>
          <Box
            borderLeft={1}
            borderRight={1}
            sx={{
              display: 'flex',
              fontWeight: 400,
              width: '25%',
              height: 'auto',
              textAlign: 'center',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 23 }}>
                <CssVarsProvider>
                  <Typography sx={{}}>Due Date</Typography>
                </CssVarsProvider>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 23 }}>
                <CssVarsProvider>
                  <Typography sx={{}}>Given Date</Typography>
                </CssVarsProvider>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 43 }}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                    {vaccinationList.second_dose_due_date === null
                      ? 'not vaccinated'
                      : vaccinationList.second_dose_due_date}
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 43 }}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                    {vaccinationList.second_dose_given_date === null
                      ? 'not vaccinated'
                      : vaccinationList.second_dose_given_date}
                  </Typography>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
          <Box
            borderRight={1}
            sx={{
              display: 'flex',
              fontWeight: 400,
              width: '25%',
              height: 'auto',
              textAlign: 'center',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 23 }}>
                <CssVarsProvider>
                  <Typography sx={{}}>Due Date</Typography>
                </CssVarsProvider>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 23 }}>
                <CssVarsProvider>
                  <Typography sx={{}}>Given Date</Typography>
                </CssVarsProvider>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 43 }}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                    {vaccinationList.third_dose_due_date === null
                      ? 'not vaccinated'
                      : vaccinationList.third_dose_due_date}
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 43 }}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                    {vaccinationList.third_dose_given_date === null
                      ? 'not vaccinated'
                      : vaccinationList.third_dose_given_date}
                  </Typography>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
          <Box
            borderRight={1}
            sx={{
              display: 'flex',
              fontWeight: 400,
              width: '25%',
              height: 'auto',
              textAlign: 'center',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 23 }}>
                <CssVarsProvider>
                  <Typography sx={{}}>Due Date</Typography>
                </CssVarsProvider>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 23 }}>
                <CssVarsProvider>
                  <Typography sx={{}}>Given Date</Typography>
                </CssVarsProvider>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 43 }}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                    {vaccinationList.booster_dose_date_given === null
                      ? 'not vaccinated'
                      : Moment(vaccinationList.booster_dose_date_given)
                          .add(10, 'days')
                          .format('YYYY-MM-DD')}
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 43 }}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                    {vaccinationList.booster_dose_given_date === null
                      ? 'not vaccinated'
                      : vaccinationList.booster_dose_given_date}
                  </Typography>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* previous year vacciantion  */}
        <Box sx={{ p: 1, fontWeight: 500 }}>
          <CssVarsProvider>
            <Typography>Previous Year Vacciantion Date</Typography>
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
            </CssVarsProvider>
          </Box>
        </Box>
        {data.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
            <Box
              borderRight={1}
              borderLeft={1}
              borderBottom={1}
              sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
            >
              <CssVarsProvider>
                <Typography>Hepatitis B</Typography>
              </CssVarsProvider>
            </Box>
            <Box
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
              {/* FIRST DOSE DATE  */}
              {item.firstdose_date === null ? 'not required' : item.firstdose_date}
            </Box>
            <Box
              borderRight={1}
              borderLeft={1}
              borderBottom={1}
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
              {/* SECOND DOSE DATE */}
              {item.second_dose_given_date === null ? 'not required' : item.second_dose_given_date}
            </Box>
            <Box
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
              {/* THIRD DOSE DATE */}
              {item.third_dose_given_date === null ? 'not required' : item.third_dose_given_date}
            </Box>
            <Box
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
              {/* BOOSTER DOSE DATE */}
              {item.booster_dose_given_date === null
                ? 'not required'
                : item.booster_dose_given_date}
            </Box>
          </Box>
        ))}
      </Box>
    </Fragment>
  )
}

export default VaccinationInformation
