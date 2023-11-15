import { Box, Tooltip, } from '@mui/material'
import React, { useEffect, useState, memo, useCallback } from 'react'
import moment from 'moment'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import IconButton from '@mui/material/IconButton'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import Heading from 'src/views/Component/MuiCustomComponent/Heading'

const Entrydetails = ({ details, setIsModalOpen }) => {
  const [formattedDate, setFormattedDate] = useState('');
  const [secondDate, setSecondDate] = useState('');
  const [thirdDate, setThirdDate] = useState('');
  const [boosterDate, setBoosterDate] = useState('');
  const [boosterdueDate, setBoosterDueDate] = useState('');

  const [empdata, setDetails] = useState({
    first_dose_given_date: '',
    firstdose_date: '',
    first_dose_given_status: '',
    first_dose_status: '',
    hic_frst_dose_status: '',
    remark: '',
    second_dose_due_date: '',
    second_dose_given_date: '',
    second_dose_given_status: '',
    third_dose_due_date: '',
    third_dose_given_date: '',
    third_dose_status: '',
    hic_second_dose_status: '',
    remarksecond: '',
    booster_dose_date_given: '',
    booster_dose_due_date: '',
    booster_dose_given_date: '',
    booster_dose_given_status: '',
    remarkbooster: '',
    second_dose_status: "",
    booster_dose_status: "",
    remarkthird: '',
  })

  const { first_dose_given_date,
    firstdose_date,
    first_dose_given_status,
    first_dose_status,
    hic_frst_dose_status,
    remark,
    second_dose_due_date,
    second_dose_given_date,
    booster_dose_status,
    third_dose_due_date,
    third_dose_given_date,
    third_dose_status,
    hic_second_dose_status,
    remarksecond,
    booster_dose_date_given,
    booster_dose_due_date,
    booster_dose_given_date,
    booster_dose_given_status,
    remarkbooster,
    second_dose_status,
    remarkthird, } = empdata

  useEffect(() => {
    if (Object.keys(details).length !== 0) {
      const { first_dose_given_date,
        firstdose_date,
        first_dose_given_status,
        first_dose_status,
        hic_frst_dose_status,
        remark,
        second_dose_due_date,
        second_dose_given_date,
        second_dose_given_status,
        third_dose_due_date,
        third_dose_given_date,
        third_dose_status,
        hic_second_dose_status,
        second_dose_status,
        remarksecond,
        booster_dose_date_given,
        booster_dose_due_date,
        booster_dose_status,
        booster_dose_given_date,
        booster_dose_given_status,
        remarkbooster,
        remarkthird,

      } = details
      const obj = {
        second_dose_given_status: second_dose_given_status,
        booster_dose_due_date: booster_dose_due_date,
        booster_dose_given_date: booster_dose_given_date,
        firstdose_date: firstdose_date,
        second_dose_due_date: second_dose_due_date,
        second_dose_given_date: second_dose_given_date,
        third_dose_due_date: third_dose_due_date,
        third_dose_given_date: third_dose_given_date,
        first_dose_status: first_dose_status,
        third_dose_status: third_dose_status,
        first_dose_given_status: first_dose_given_status,
        booster_dose_given_status: booster_dose_given_status,
        first_dose_given_date: first_dose_given_date,
        booster_dose_date_given: booster_dose_date_given,
        remark: remark,
        remarksecond: remarksecond,
        second_dose_status: second_dose_status,
        remarkthird: remarkthird,
        remarkbooster: remarkbooster,
        booster_dose_status: booster_dose_status,
        hic_frst_dose_status: hic_frst_dose_status,
        hic_second_dose_status: hic_second_dose_status,
      }
      setDetails(obj)
      const formatDate = (date, daysToAdd) => {
        const givenDate = moment(date);
        const futureDate = givenDate.clone().add(daysToAdd, 'days');
        if (futureDate.day() === 0) {
          return futureDate.add(1, 'days').format('DD-MM-YYYY');
        } else {
          return futureDate.format('DD-MM-YYYY');
        }
      };
      setFormattedDate(formatDate(first_dose_given_date, 3));
      setSecondDate(formatDate(second_dose_due_date, 10));
      setThirdDate(formatDate(third_dose_due_date, 10));
      setBoosterDate(formatDate(booster_dose_date_given, 10));
      setBoosterDueDate(formatDate(booster_dose_due_date, 10));


    } else {
      setDetails({})
      setFormattedDate('');
      setSecondDate('');
      setThirdDate('');
      setBoosterDate('');
      setBoosterDueDate('');
    }
  }, [details])

  // icon buttton
  const handleIconClick = useCallback(() => {
    setIsModalOpen(true)
  }, [setIsModalOpen])
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
          <Heading title={'Vaccination Details'} />
        </Box>
        <Box
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, fontWeight: 600, display: 'flex', width: '25%', height: 'auto' }}
        >
          <Heading title={'Actual Date'} />
        </Box>
        <Box
          border={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 600, width: '25%', height: 'auto' }}
        >
          <Heading title={'Due date'} />
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto', fontWeight: 600 }}
        >
          <Heading title={'Vaccinated date'} />
        </Box>
        <Box
          borderRight={0.5}
          borderBottom={0.5}
          borderTop={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto', fontWeight: 600 }}
        >
          <Heading title={'Remark'} />
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
          <Heading title={'First Dose'} />
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <Heading title={first_dose_given_date
            ? moment(first_dose_given_date).format('DD-MM-YYYY')
            : 'N/A'} />
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
          <Heading title={first_dose_given_date
            ? formattedDate
            : 'N/A'} />
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
            // backgroundColor:
            //   moment(firstdose_date).format('DD-MM-YYYY') >
            //   formattedDate
            //     ? '#FAD4D4'
            //     : 'initial',
          }}
        >
          <Heading title={firstdose_date ? moment(firstdose_date).format('DD-MM-YYYY') : 'N/A'} />
          {/* icon button */}
          {first_dose_given_status === 1 && first_dose_status === 0 ? (
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
          <Heading title={remark || 'N/A'} />
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
          <Heading title={'Second Dose'} />
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <Heading title={second_dose_due_date
            ? moment(second_dose_due_date).format('DD-MM-YYYY')
            : 'N/A'} />
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <Heading title={second_dose_due_date
            ? secondDate
            : 'N/A'} />
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
              second_dose_given_date > second_dose_due_date ? '#FAD4D4' : 'initial',
          }}
        >
          <Heading title={second_dose_given_date
            ? moment(second_dose_given_date).format('DD-MM-YYYY')
            : 'N/A'} />
          {first_dose_status === 1 &&
            second_dose_status === 0 &&
            hic_frst_dose_status === 1 ? (
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
          <Heading title={remarksecond || 'N/A'} />
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
          <Heading title={'Third Dose'} />
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <Heading title={third_dose_due_date
            ? moment(third_dose_due_date).format('DD-MM-YYYY')
            : 'N/A'} />
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <Heading title={third_dose_due_date ? thirdDate : 'N/A'} />
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
              third_dose_given_date > third_dose_due_date ? '#FAD4D4' : 'initial',
          }}
        >
          <Heading title={third_dose_given_date
            ? moment(third_dose_given_date).format('DD-MM-YYYY')
            : 'N/A'} />
          {/* icon button */}
          {first_dose_status === 1 &&
            second_dose_status === 1 &&
            third_dose_status === 0 &&
            hic_second_dose_status === 1 ? (
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
          <Heading title={remarkthird || 'N/A'} />

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
          <Heading title={'Booster Dose'} />
        </Box>
        <Box
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', width: '25%', height: 'auto' }}
        >
          <Heading title={booster_dose_date_given
            ? moment(booster_dose_date_given).format('DD-MM-YYYY')
            : booster_dose_due_date
              ? moment(booster_dose_due_date).format('DD-MM-YYYY')
              : 'N/A'} />
        </Box>
        <Box
          borderRight={0.5}
          borderLeft={0.5}
          borderBottom={0.5}
          borderColor="#C9CCD5"
          sx={{ p: 1, display: 'flex', fontWeight: 400, width: '25%', height: 'auto' }}
        >
          <Heading title={booster_dose_date_given
            ? boosterDate
            : booster_dose_due_date
              ? boosterdueDate
              : 'N/A'} />
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
          <Heading title={booster_dose_given_date
            ? moment(booster_dose_given_date).format('DD-MM-YYYY')
            : 'N/A'} />
          {booster_dose_given_status === 1 && booster_dose_status === 0 ? (
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
          <Heading title={remarkbooster || 'N/A'} />

        </Box>
      </Box>
    </Box>
  )
}

export default memo(Entrydetails)