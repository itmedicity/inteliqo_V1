import React, { memo, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'



const Vaccinationdetials = ({empVaccination}) => {
      const [details, setDetails] = useState({})

         useEffect(() => {
    if (Object.keys(empVaccination).length !== 0) {
      const {
        booster_dose_due_date,
        booster_dose_given_date,
        firstdose_date,
        second_dose_due_date,
        second_dose_given_date,
        third_dose_due_date,
        third_dose_given_date,
  
      
      } = empVaccination[0]
      const details = {
        booster_dose_due_date: booster_dose_due_date,
        booster_dose_given_date: booster_dose_given_date,
        firstdose_date: firstdose_date,
        second_dose_due_date: second_dose_due_date,
        second_dose_given_date: second_dose_given_date,
        third_dose_due_date: third_dose_due_date,
        third_dose_given_date: third_dose_given_date,
      
      }
      setDetails(details)
    } else {
      setDetails({})
    }
  }, [empVaccination])
  return (
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
                {details?.firstdose_date === null
                  ? 'not vaccinated'
                  : details?.firstdose_date}
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
                    {details?.second_dose_due_date === null
                      ? 'not vaccinated'
                      : details?.second_dose_due_date}
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 43 }}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                    {details?.second_dose_given_date === null
                      ? 'not vaccinated'
                      : details?.second_dose_given_date}
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
                    {details?.third_dose_due_date === null
                      ? 'not vaccinated'
                      : details?.third_dose_due_date}
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 43 }}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                    {details?.third_dose_given_date === null
                      ? 'not vaccinated'
                      : details?.third_dose_given_date}
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
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 43,}}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                
                    {details?.booster_dose_due_date === null
                      ? 'not vaccinated'
                      :details?.booster_dose_due_date
                       }
                  </Typography>
                </CssVarsProvider>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 43, }}>
                <CssVarsProvider>
                  <Typography sx={{ p: 1 }}>
                    {details?.booster_dose_given_date === null
                      ? 'not vaccinated'
                      : details?.booster_dose_given_date}
                  </Typography>
                </CssVarsProvider>
              </Box>
            </Box>
          </Box>
        </Box>
  )
}

export default  memo(Vaccinationdetials)