import { Box, Tooltip } from '@mui/material'
import React, { useCallback } from 'react'
import moment from 'moment'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import { memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import Heading from 'src/views/Component/MuiCustomComponent/Heading'

const Entrydetails = ({details,setIsModalOpen}) => {


  const formatWithSundayCheck = useCallback((date) => {
    const givenDate = moment(date);
    const threeDaysLater = givenDate.clone().add(3, 'days');
    if (threeDaysLater.day() === 0) {
      return threeDaysLater.add(1, 'days').format('DD-MM-YYYY');
    } else {
      return threeDaysLater.format('DD-MM-YYYY');
    }
  }, []);
 const formatWithSunday = useCallback((date) => {
    const givenDate = moment(date);
    const tenDaysLater = givenDate.clone().add(10, 'days');
    if (tenDaysLater.day() === 0) {
      return tenDaysLater.add(1, 'days').format('DD-MM-YYYY');
    } else {
      return tenDaysLater.format('DD-MM-YYYY');
    }
  }, []);
  // icon buttton
  const handleIconClick = () => {
    setIsModalOpen(true)
  }
  return (
    <Box>
     <Box sx={{ p: 1, fontWeight: 500, mt: 5 }}>
        <CustmTypog title={'Vaccination Information'} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          border={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 600, width: '25%', height: 'auto' }}
        >
          <Heading  title={'Vaccination Details'}/>
        </Box>
        <Box
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, fontWeight: 600, display: 'flex', width: '25%', height: 'auto' }}
        >
        <Heading  title={'Actual Date'}/>
        </Box>
        <Box
          border={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 600, width: '25%', height: 'auto' }}
        >
          <Heading  title={'Due date'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto', fontWeight: 600 }}
        >
         <Heading  title={'Vaccinated date'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto', fontWeight: 600 }}
        >
        <Heading  title={'Remark'}/>
        </Box>
      </Box>
      {/* first dose */}
      <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 500, width: '25%', height: 'auto' }}
        >
        <Heading  title={'First Dose'}/>
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
        <Heading title=  {details?.first_dose_given_date
                ? moment(details?.first_dose_given_date).format('DD-MM-YYYY')
                : 'N/A'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{
            p: 1,
            display: 'flex',
            fontWeight: 400,
            width: '25%',
            height: 'auto',
          }}
        >
         <Heading title=  {details?.first_dose_given_date
                ? formatWithSundayCheck(details?.first_dose_given_date)
                : 'N/A'}/>
        </Box>

        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '25%',
            height: 'auto',
            backgroundColor:
              moment(details?.firstdose_date).format('DD-MM-YYYY') >
              formatWithSundayCheck(details?.first_dose_given_date)
                ? '#FAD4D4'
                : 'initial',
          }}
        >
          <Heading title= {details?.firstdose_date ? moment(details?.firstdose_date).format('DD-MM-YYYY') : 'N/A'}/>
          {/* icon button */}
          {details?.first_dose_given_status === 1 && details?.first_dose_status === 0 ? (
            <IconButton onClick={handleIconClick} sx={{ color: 'green', p: 0 }}>
              <Tooltip title="Click Here to vaccinate">
                <AddCircleOutlineIcon />
              </Tooltip>
            </IconButton>
          ) : (
            <BeenhereIcon color="disabled" />
          )}
        </Box>

        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
         <Heading title= {details?.remark || 'N/A'}/>
        </Box>
      </Box>
      {/* second dose */}
       <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 500, width: '25%', height: 'auto' }}
        >
         <Heading  title={'Second Dose'}/>
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
         <Heading title=   {details?.second_dose_due_date
                ? moment(details?.second_dose_due_date).format('DD-MM-YYYY')
                : 'N/A'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
         <Heading title=  {details?.second_dose_due_date
                ? formatWithSunday(details?.second_dose_due_date)
                : 'N/A'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '25%',
            height: 'auto',
            backgroundColor:
              details?.second_dose_given_date > details?.second_dose_due_date ? '#FAD4D4' : 'initial',
          }}
        >
          <Heading title=   {details?.second_dose_given_date
                ? moment(details?.second_dose_given_date).format('DD-MM-YYYY')
                : 'N/A'}/>
          {details?.first_dose_status === 1 &&
          details?.second_dose_status === 0 &&
          details?.hic_frst_dose_status === 1 ? (
            <IconButton onClick={handleIconClick} sx={{ color: 'green', p: 0 }}>
              <Tooltip title="Click Here to vaccinate">
                <AddCircleOutlineIcon />
              </Tooltip>
            </IconButton>
          ) : (
            <BeenhereIcon color="disabled" />
          )}
        </Box>

        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
         <Heading title= {details?.remarksecond || 'N/A'}/>
        </Box>
      </Box>
      {/* third dose */}
       <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 500, width: '25%', height: 'auto' }}
        >
          <Heading  title={'Third Dose'}/>
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
         <Heading title=     {details?.third_dose_due_date
                ? moment(details?.third_dose_due_date).format('DD-MM-YYYY')
                : 'N/A'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <Heading title= {details?.third_dose_due_date ? formatWithSunday(details?.third_dose_due_date) : 'N/A'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '25%',
            height: 'auto',
            backgroundColor:
              details?.third_dose_given_date > details?.third_dose_due_date ? '#FAD4D4' : 'initial',
          }}
        >
      <Heading title=  {details?.third_dose_given_date
                ? moment(details?.third_dose_given_date).format('DD-MM-YYYY')
                : 'N/A'}/>
          {/* icon button */}
          {details?.first_dose_status === 1 &&
          details?.second_dose_status === 1 &&
          details?.third_dose_status === 0 &&
          details?.hic_second_dose_status === 1 ? (
            <IconButton onClick={handleIconClick} sx={{ color: 'green', p: 0 }}>
              <Tooltip title="Click Here to vaccinate">
                <AddCircleOutlineIcon />
              </Tooltip>
            </IconButton>
          ) : (
            <BeenhereIcon color="disabled" />
          )}
        </Box>

        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
         <Heading title= {details?.remarkthird || 'N/A'}/>
       
        </Box>
      </Box>
      {/* booster */}
       <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 500, width: '25%', height: 'auto' }}
        >
        <Heading  title={'Booster Dose'}/>
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
         <Heading title=   {details?.booster_dose_date_given
                ? moment(details?.booster_dose_date_given).format('DD-MM-YYYY')
                : details?.booster_dose_due_date
                ? moment(details?.booster_dose_due_date).format('DD-MM-YYYY')
                : 'N/A'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <Heading title=   {details?.booster_dose_date_given
                ? formatWithSunday(details?.booster_dose_date_given)
                : details?.booster_dose_due_date
                ? formatWithSunday(details?.booster_dose_due_date)
                : 'N/A'}/>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '25%',
            height: 'auto',
          }}
        >
         <Heading title=   {details?.booster_dose_given_date
                ? moment(details?.booster_dose_given_date).format('DD-MM-YYYY')
                : 'N/A'}/>
          {details?.booster_dose_given_status === 1 && details?.booster_dose_status === 0 ? (
            <IconButton onClick={handleIconClick} sx={{ color: 'green', p: 0 }}>
              <Tooltip title="Click Here to vaccinate">
                <AddCircleOutlineIcon />
              </Tooltip>
            </IconButton>
          ) : (
            <BeenhereIcon color="disabled" />
          )}
        </Box>

        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <Heading title= {details?.remarkbooster || 'N/A'}/>
        </Box>
      </Box>
      </Box>
  )
}

export default memo( Entrydetails)