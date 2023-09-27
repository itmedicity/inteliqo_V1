import { Box, } from '@mui/material'
import React, { lazy ,memo} from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import Heading from 'src/views/Component/MuiCustomComponent/Heading'
const Entrydetails = lazy(() => import('./Entrydetails'))

const EntryInformation = ({ details, setIsModalOpen }) => {

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Box sx={{ p: 1, fontWeight: 500 }}>
      <CustmTypog title={'Employee Information'} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          border={1}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
        <Heading  title={'Employee Name'}/>
        </Box>
        <Box
          borderBottom={1}
          borderTop={1}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <Heading  title= {details?.em_name || 'N/A'}/>
        </Box>
        <Box
          border={1}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <Heading  title={'Blood Group'}/>
        </Box>
        <Box
          borderRight={1}
          borderBottom={1}
          borderTop={1}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
        <Heading  title=  {details?.group_name || 'N/A'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <Heading  title={'Mobile Number'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <Heading  title={details?.em_mobile || 'N/A'}/>
        </Box>
      </Box>
      {/* vaccination details */}

        <Entrydetails details={details} setIsModalOpen={setIsModalOpen} />
    </Box>
  )
}

export default memo(EntryInformation)
