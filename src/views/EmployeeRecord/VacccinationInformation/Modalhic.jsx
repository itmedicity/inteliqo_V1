import React, { useState, useEffect,memo,useCallback } from 'react'
import Modal from '@mui/material/Modal'
import { Box, Paper, TextField, Button, Typography } from '@mui/material'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import _ from 'underscore'


const Modalhic = ({
  isModalOpen,
  setSelectedRowData,
  selectedRowData,
  setIsModalOpen,
  hicdata,
  count,
  setCount,
}) => {
  const [details, setDetails] = useState({})
  const [remarks, setRemarks] = useState('')
  
  const handleCloseModal =useCallback( () => {
    setIsModalOpen(false)
  }, [setIsModalOpen])
  
  useEffect(() => {
    if (Object.keys(hicdata).length !== 0) {
      const {
        booster_dose_due_date,
        booster_dose_given_date,
        firstdose_date,
        second_dose_due_date,
        second_dose_given_date,
        third_dose_due_date,
        third_dose_given_date,
        em_no,
        hic_frst_dose_status,
        hic_second_dose_status,
        hic_third_dose_status,
        hic_booster_dose_status,
      } = hicdata[0]
      const details = {
        booster_dose_due_date: booster_dose_due_date,
        booster_dose_given_date: booster_dose_given_date,
        firstdose_date: firstdose_date,
        second_dose_due_date: second_dose_due_date,
        second_dose_given_date: second_dose_given_date,
        third_dose_due_date: third_dose_due_date,
        third_dose_given_date: third_dose_given_date,
        em_no: em_no,
        hic_frst_dose_status: hic_frst_dose_status,
        hic_second_dose_status: hic_second_dose_status,
        hic_third_dose_status: hic_third_dose_status,
        hic_booster_dose_status: hic_booster_dose_status,
      }
      setDetails(details)
    } else {
      setDetails({})
    }
  }, [hicdata])
  // empid Verified
  const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
  const { em_id } = empData
  const handleOnClick = useCallback(async () => {
  if (remarks.trim() === '') {
    infoNofity('Please insert a remark.');
    return;
  }
  const Hicfirstdose = {
    fromDate: moment().format('yyyy-MM-DD'),
    em_no: details?.em_no,
    em_id: em_id,
    remarks: remarks,
  };
  const Hicseconddose = {
    fromDate: moment().format('yyyy-MM-DD'),
    em_no: details?.em_no,
    em_id: em_id,
    remarks: remarks,
  };
  const Hicsthirddose = {
    fromDate: moment().format('yyyy-MM-DD'),
    em_no: details?.em_no,
    em_id: em_id,
    remarks: remarks,
  };
  const Hicboosterdose = {
    fromDate: moment().format('yyyy-MM-DD'),
    em_no: details?.em_no,
    em_id: em_id,
    remarks: remarks,
  };
  if (details.hic_frst_dose_status === 0) {
    const response = await axioslogin.post('/Vaccination/Hicfirstdose', Hicfirstdose);
    const { message, success } = response.data;
    if (success === 1) {
      succesNofity('data saved successfully');
      handleCloseModal(false);
      setRemarks('');
      setCount((prevCount) => prevCount + 1);
    } else {
      infoNofity(message);
    }
  } else if (details.hic_second_dose_status === 0 && details.hic_frst_dose_status === 1) {
    const response = await axioslogin.post('/Vaccination/Hicseconddose', Hicseconddose);
    const { message, success } = response.data;
    if (success === 1) {
      succesNofity('data saved successfully');
      handleCloseModal(false);
      setRemarks('');
      setCount((prevCount) => prevCount + 1);
    } else {
      infoNofity(message);
    }
  } else if (
    details?.hic_third_dose_status === 0 &&
    details?.hic_frst_dose_status === 1 &&
    details?.hic_second_dose_status === 1
  ) {
    const response = await axioslogin.post('/Vaccination/Hicsthirddose', Hicsthirddose);
    const { message, success } = response.data;
    if (success === 1) {
      succesNofity(message);
      handleCloseModal(false);
      setRemarks('');
      setCount((prevCount) => prevCount + 1);
    } else {
      infoNofity(message);
    }
  } else {
    const response = await axioslogin.post('/Vaccination/Hicboosterdose', Hicboosterdose);
    const { message, success } = response.data;
    if (success === 1) {
      succesNofity(message);
      handleCloseModal(false);
      setRemarks('');
      setCount((prevCount) => prevCount + 1);
    } else {
      infoNofity(message);
    }
  }
}, [
  details,
  remarks,
  em_id,
  setCount,
  
]);


  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'white',
          boxShadow: 24,
          p: 2,
          borderRadius: 4,
        }}
      >
        <Paper elevation={0} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <VaccinesIcon color="success" sx={{ mr: 1 }} />
            <Typography variant="h6">Vaccination Information</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Employee information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
              <Box>
                <Typography variant="body1">Name: </Typography>
                <Typography variant="body1">Department:</Typography>
                <Typography variant="body1">Department Section:</Typography>
                <Typography variant="body1">Emp ID: </Typography>
                {details?.hic_frst_dose_status === 0 ? (
                  <Typography variant="body1">First dose vaccinated Date :</Typography>
                ) : details?.hic_second_dose_status === 0 && details?.hic_frst_dose_status === 1 ? (
                  <Typography variant="body1">Second dose vaccinated Date :</Typography>
                ) : details?.hic_third_dose_status === 0 &&
                  details?.hic_frst_dose_status === 1 &&
                  details?.hic_second_dose_status === 1 ? (
                  <Typography variant="body1">Third dose vaccinated Date :</Typography>
                ) : (
                  <Typography variant="body1">Booster dose date</Typography>
                )}
                <Typography variant="body1">Remark </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: '#78C1F3' }} variant="body1">
                  {selectedRowData?.em_name || 'N/A'}
                </Typography>
                <Typography sx={{ color: '#78C1F3' }} variant="body1">
                  {selectedRowData?.dept_name || 'N/A'}
                </Typography>
                <Typography sx={{ color: '#78C1F3' }} variant="body1">
                  {selectedRowData?.sect_name || 'N/A'}
                </Typography>
                <Typography sx={{ color: '#78C1F3' }} variant="body1">
                  {selectedRowData?.em_no || 'N/A'}
                </Typography>
                {details?.hic_frst_dose_status === 0 ? (
                  <Typography sx={{ color: '#78C1F3' }} variant="body1">
                    {details?.firstdose_date}
                  </Typography>
                ) : details?.hic_second_dose_status === 0 && details?.hic_frst_dose_status === 1 ? (
                  <Typography sx={{ color: '#78C1F3' }} variant="body1">
                    {details?.second_dose_given_date}
                  </Typography>
                ) : details?.hic_third_dose_status === 0 &&
                  details?.hic_frst_dose_status === 1 &&
                  details?.hic_second_dose_status === 1 ? (
                  <Typography sx={{ color: '#78C1F3' }} variant="body1">
                    {details?.third_dose_given_date}
                  </Typography>
                ) : (
                  <Typography sx={{ color: '#78C1F3' }} variant="body1">
                    {details?.booster_dose_given_date}
                  </Typography>
                )}
                <TextField
                  size="small"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  sx={{ marginTop: 1 }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="contained" color="success" onClick={handleOnClick}>
            save
          </Button>
          <Button variant="contained" color="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default memo(Modalhic)
