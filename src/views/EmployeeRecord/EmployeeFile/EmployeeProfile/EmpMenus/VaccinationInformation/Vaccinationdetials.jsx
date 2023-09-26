import React, { memo, useEffect, useState } from 'react'
import { Box, } from '@mui/material'
import Heading from 'src/views/Component/MuiCustomComponent/Heading'



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
            sx={{ display: 'flex', fontWeight: 400, width: '25%', height: 'auto', }}
          >
          <Box sx={{p:1}}>
               <Heading  title={'Hepatitis B'}/>
               </Box>
     
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
          <Box sx={{p:1}}>
             <Heading  title=  {details?.firstdose_date === null
                  ? 'not vaccinated'
                  : details?.firstdose_date}/>
          </Box>
        
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
                <Heading  title={'Due Date'}/>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 23 }}>
                <Heading  title={'Given Date'}/>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 43,p:1  }}>
                <Heading  title=   {details?.second_dose_due_date === null
                      ? 'not vaccinated'
                      : details?.second_dose_due_date}/>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 43,p:1  }}>
                 <Heading  title=  {details?.second_dose_given_date === null
                      ? 'not vaccinated'
                      : details?.second_dose_given_date}/>
              
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
               <Heading  title={'Due Date'}/>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 23 }}>
                <Heading  title={'Given Date'}/>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 43,p:1  }}>
                <Heading  title= {details?.third_dose_due_date === null
                      ? 'not vaccinated'
                      : details?.third_dose_due_date}/>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 43,p:1  }}>
                  <Heading  title=  {details?.third_dose_given_date === null
                      ? 'not vaccinated'
                      : details?.third_dose_given_date}/>
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
               <Heading  title={'Due Date'}/>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 23 }}>
               <Heading  title={'Given Date'}/>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box borderBottom={1} borderRight={1} sx={{ width: '50%', height: 43,p:1 }}>
                 <Heading  title=  {details?.booster_dose_due_date === null
                      ? 'not vaccinated'
                      :details?.booster_dose_due_date
                       }/>
              </Box>
              <Box borderBottom={1} sx={{ width: '50%', height: 43,p:1 }}>
                    <Heading  title= {details?.booster_dose_given_date === null
                      ? 'not vaccinated'
                      : details?.booster_dose_given_date}/>
              </Box>
            </Box>
          </Box>
        </Box>
  )
}

export default  memo(Vaccinationdetials)