import { Box,} from '@mui/material'
import React, { memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import Heading from 'src/views/Component/MuiCustomComponent/Heading'

const Previousvacc = ({data}) => {
  return (
    <Box>
     <Box sx={{ p: 1, fontWeight: 500 }}>
        <CustmTypog title={'Previous Year Vacciantion Date'} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
          <Box
            border={1}
            sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
          >
            <Heading title={'Vaccination'}/>
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
           <Heading title={'First Dose'}/>
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
          <Heading title={'Second Dose'}/>
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
           <Heading title={'Third Dose'}/>
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
           <Heading title={'Booster Dose'}/>
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
            <Heading title={'Hepatitis B'}/>
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
              {item?.firstdose_date === null ? 'not required' : item?.firstdose_date}
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
              {item?.second_dose_given_date === null ? 'not required' : item?.second_dose_given_date}
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
              {item?.third_dose_given_date === null ? 'not required' : item?.third_dose_given_date}
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
                : item?.booster_dose_given_date}
            </Box>
          </Box>
        ))}
      </Box>
  )
}

export default memo(Previousvacc) 