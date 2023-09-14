import { Box, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { CssVarsProvider } from '@mui/joy'
import moment from 'moment'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import { memo } from 'react'

const EntryInformation = ({ details, setIsModalOpen }) => {
  function formatWithSundayCheck(date) {
    const givenDate = moment(date)
    const threeDaysLater = givenDate.clone().add(3, 'days')
    if (threeDaysLater.day() === 0) {
      return threeDaysLater.add(1, 'days').format('DD-MM-YYYY')
    } else {
      return threeDaysLater.format('DD-MM-YYYY')
    }
  }
  function formatWithSunday(date) {
    const givenDate = moment(date)
    const threeDaysLater = givenDate.clone().add(10, 'days')
    if (threeDaysLater.day() === 0) {
      return threeDaysLater.add(1, 'days').format('DD-MM-YYYY')
    } else {
      return threeDaysLater.format('DD-MM-YYYY')
    }
  }
  // icon buttton
  const handleIconClick = () => {
    setIsModalOpen(true)
  }

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Box sx={{ p: 1, fontWeight: 500 }}>
        <CssVarsProvider>
          <Typography>Employee Information</Typography>
        </CssVarsProvider>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          border={1}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>Employee Name</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderBottom={1}
          borderTop={1}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{ textTransform: 'capitalize' }}>
              {details?.em_name || 'N/A'}
            </Typography>
          </CssVarsProvider>
        </Box>
        <Box
          border={1}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>Blood Group</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderRight={1}
          borderBottom={1}
          borderTop={1}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{ textTransform: 'capitalize' }}>
              {details?.group_name || 'N/A'}
            </Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>Mobile Number</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{ textTransform: 'capitalize' }}>
              {details?.em_mobile || 'N/A'}
            </Typography>
          </CssVarsProvider>
        </Box>
      </Box>
      {/* vaccination details */}
      <Box sx={{ p: 1, fontWeight: 500, mt: 5 }}>
        <CssVarsProvider>
          <Typography>Vaccination Information</Typography>
        </CssVarsProvider>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          border={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 600, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>Vaccination Details</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, fontWeight: 600, display: 'flex', width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>Actual Date</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          border={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 600, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>Due date</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto', fontWeight: 600 }}
        >
          <CssVarsProvider>
            <Typography>Vaccinated date</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto', fontWeight: 600 }}
        >
          <CssVarsProvider>
            <Typography>Remark</Typography>
          </CssVarsProvider>
        </Box>
      </Box>
      {/* first dose date */}
      <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 500, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>First Dose</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.first_dose_given_date
                ? moment(details.first_dose_given_date).format('DD-MM-YYYY')
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.first_dose_given_date
                ? formatWithSundayCheck(details.first_dose_given_date)
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
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
              details.firstdose_date > formatWithSundayCheck(details.first_dose_given_date)
                ? '#FAD4D4'
                : 'initial',
          }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.firstdose_date ? moment(details.firstdose_date).format('DD-MM-YYYY') : 'N/A'}
            </Typography>
          </CssVarsProvider>
          {/* icon button */}
          {details.first_dose_given_status === 1 && details.first_dose_status == 0 ? (
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
          <CssVarsProvider>
            <Typography sx={{}}>{details?.remark || 'N/A'}</Typography>
          </CssVarsProvider>
        </Box>
      </Box>
      {/* second dose details */}
      <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 500, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>Second Dose</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.second_dose_due_date
                ? moment(details.second_dose_due_date).format('DD-MM-YYYY')
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.second_dose_due_date
                ? formatWithSunday(details.second_dose_due_date)
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
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
              details.second_dose_given_date > formatWithSunday(details.second_dose_due_date)
                ? '#FAD4D4'
                : 'initial',
          }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.second_dose_given_date
                ? moment(details.second_dose_given_date).format('DD-MM-YYYY')
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
          {/* icon button */}
          {details.first_dose_status === 1 && details.second_dose_status === 0 ? (
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
          <CssVarsProvider>
            <Typography sx={{}}>{details?.remarksecond || 'N/A'}</Typography>
          </CssVarsProvider>
        </Box>
      </Box>
      {/* third dose date */}
      <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 500, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>Third Dose</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.third_dose_due_date
                ? moment(details.third_dose_due_date).format('DD-MM-YYYY')
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.third_dose_due_date ? formatWithSunday(details.third_dose_due_date) : 'N/A'}
            </Typography>
          </CssVarsProvider>
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
              details.third_dose_given_date > formatWithSunday(details.third_dose_due_date)
                ? '#FAD4D4'
                : 'initial',
          }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.third_dose_given_date
                ? moment(details.third_dose_given_date).format('DD-MM-YYYY')
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
          {/* icon button */}
          {details.first_dose_status === 1 &&
          details.second_dose_status === 1 &&
          details.third_dose_status === 0 ? (
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
          <CssVarsProvider>
            <Typography sx={{}}>{details?.remarkthird || 'N/A'}</Typography>
          </CssVarsProvider>
        </Box>
      </Box>
      {/* booster dose */}
      <Box sx={{ display: 'flex', flexDirection: 'row', px: 1, width: '100%' }}>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 500, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography>Booster dose</Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.booster_dose_date_given
                ? moment(details.booster_dose_date_given).format('DD-MM-YYYY')
                : details.booster_dose_due_date
                ? moment(details.booster_dose_due_date).format('DD-MM-YYYY')
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.booster_dose_date_given
                ? formatWithSunday(details.booster_dose_date_given)
                : details.booster_dose_due_date
                ? formatWithSunday(details.booster_dose_due_date)
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
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
          <CssVarsProvider>
            <Typography sx={{}}>
              {details.booster_dose_given_date
                ? moment(details.booster_dose_given_date).format('DD-MM-YYYY')
                : 'N/A'}
            </Typography>
          </CssVarsProvider>
          {/* icon button */}
          {details.booster_dose_given_status === 1 && details.booster_dose_status === 0 ? (
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
          <CssVarsProvider>
            <Typography sx={{}}>{details?.remarkbooster || 'N/A'}</Typography>
          </CssVarsProvider>
        </Box>
      </Box>
    </Box>
  )
}

export default memo(EntryInformation)
