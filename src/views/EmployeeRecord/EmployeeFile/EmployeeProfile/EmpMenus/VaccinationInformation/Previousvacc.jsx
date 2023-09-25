import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import { CssVarsProvider } from '@mui/joy'

const Previousvacc = ({data}) => {
  return (
    <Box>
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
        {data?.map((item, index) => (
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
              {item?.firstdose_date === null ? 'not required' : item.firstdose_date}
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
              {item?.second_dose_given_date === null ? 'not required' : item.second_dose_given_date}
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
              {item?.third_dose_given_date === null ? 'not required' : item.third_dose_given_date}
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
              {item?.booster_dose_given_date === null
                ? 'not required'
                : item.booster_dose_given_date}
            </Box>
          </Box>
        ))}
      </Box>
  )
}

export default memo(Previousvacc) 