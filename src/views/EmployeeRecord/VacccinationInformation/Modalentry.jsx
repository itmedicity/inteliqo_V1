import React, { useState, memo, useCallback } from 'react'
import Modal from '@mui/material/Modal'
import { Box, Paper, TextField, Button, Typography } from '@mui/material'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import _ from 'underscore'


const Modalentry = ({ isModalOpen, setIsModalOpen, details, count, setcount }) => {
  const [remarks, setRemarks] = useState('')
  const [remarksbooster, setremarksbooster] = useState('')
  const [remarkssecond, setremarkssecond] = useState('')
  const [remarksthird, setremarksthird] = useState('')
  const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
  const { em_id } = empData
  const handleCloseModal = useCallback(() => {
    setcount(count + 1)
    setIsModalOpen(false)
  }, [setcount, count, setIsModalOpen])
  const handleOnClick = useCallback(async (event) => {
    event.preventDefault();

    if (
      (details.first_dose_given_status === 1 &&
        details.first_dose_status === 0 &&
        remarks.trim() === '') ||
      (details.booster_dose_given_status === 1 &&
        details.first_dose_given_status === 0 &&
        remarksbooster.trim() === '') ||
      (details.first_dose_status === 1 &&
        details.second_dose_status === 0 &&
        remarkssecond.trim() === '') ||
      (details.first_dose_status === 1 &&
        details.second_dose_status === 1 &&
        details.booster_dose_status === 0 &&
        remarksthird.trim() === '')
    ) {
      infoNofity('Remarks must be provided before saving.');
      return;
    }

    const firstdose = {
      fromDate: moment().format('yyyy-MM-DD'),
      em_no: details.em_no,
      secondDoseDueDate: moment().add(30, 'days').format('YYYY-MM-DD'),
      thirdDoseDueDate: moment().add(180, 'days').format('YYYY-MM-DD'),
      booster_dose_due_date: moment().add(360, 'days').format('YYYY-MM-DD'),
      remarks: remarks,
      annual_dose: moment().add(360, 'days').format('YYYY-MM-DD'),
      // vaccin_slno: details.vaccin_slno,
      em_id: em_id,
    };
    const boosterDose = {
      fromDate: moment().format('yyyy-MM-DD'),
      secondDoseDueDate: moment().format('YYYY-MM-DD'),
      thirdDoseDueDate: moment().format('YYYY-MM-DD'),
      annual_dose: moment().add(360, 'days').format('YYYY-MM-DD'),
      booster_dose_due_date: moment().add(10, 'days').format('YYYY-MM-DD'),
      em_no: details.em_no,
      remarksbooster: remarksbooster,
      em_id: em_id,
    };
    const seconddose = {
      fromDate: moment().format('yyyy-MM-DD'),
      em_no: details.em_no,
      remarkssecond: remarkssecond,
      em_id: em_id,
    };
    const thirddose = {
      fromDate: moment().format('yyyy-MM-DD'),
      em_no: details.em_no,
      remarksthird: remarksthird,
      em_id: em_id,
    };

    if (details.first_dose_given_status === 1 && details.first_dose_status === 0) {
      const response = await axioslogin.post('/Vaccination/insertFirstdose', firstdose);
      const { message, success } = response.data;
      if (success === 1) {
        succesNofity(message);
        handleCloseModal();
      } else {
        infoNofity(message);
      }
    } else if (details.booster_dose_given_status === 1 && details.first_dose_given_status === 0) {
      if (details.booster_dose_status === 1) {
        infoNofity('you are fully vaccinated');
      } else {
        const response = await axioslogin.post('/Vaccination/insertboosterdose', boosterDose);
        const { message, success } = response.data;

        if (success === 1) {
          succesNofity(message);
          handleCloseModal();
        } else {
          infoNofity(message);
        }
      }
    } else if (details.first_dose_status === 1 && details.second_dose_status === 0) {
      const response = await axioslogin.post('/Vaccination/insertSeconddose', seconddose);
      const { message, success } = response.data;

      if (success === 1) {
        succesNofity(message);
        handleCloseModal();
      } else {
        infoNofity(message);
      }
    } else if (
      details.first_dose_status === 1 &&
      details.second_dose_status === 1 &&
      details.booster_dose_status === 0
    ) {
      if (details.third_dose_status === 1) {
        infoNofity('you are vaccinated');
      } else {
        const response = await axioslogin.post('/Vaccination/insertThirddose', thirddose);
        const { message, success } = response.data;

        if (success === 1) {
          succesNofity(message);
          handleCloseModal();
        } else {
          infoNofity(message);
        }
      }
    } else if (details.booster_dose_status === 1) {
      infoNofity('you are fully vaccinated');
    }
  }, [
    handleCloseModal,
    details,
    remarks,
    remarksbooster,
    remarkssecond,
    remarksthird,
    em_id,

  ]);


  return (
    <Box>
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
              {details?.first_dose_given_status === 1 && details?.first_dose_status === 0 ? (
                <Typography variant="h6">Vaccination Type First Dose</Typography>
              ) : details?.booster_dose_given_status === 1 &&
                details?.first_dose_given_status === 0 ? (
                <Typography variant="h6">Vaccination Type Booster Dose</Typography>
              ) : details?.first_dose_status === 1 && details?.second_dose_status === 0 ? (
                <Typography variant="h6">Vaccination Type second Dose</Typography>
              ) : details?.first_dose_status === 1 &&
                details?.second_dose_status === 1 &&
                details?.booster_dose_status === 0 ? (
                <Typography variant="h6">Vaccination Type third Dose</Typography>
              ) : (
                'Vaccination date not selected by HR'
              )}
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
                  {details?.first_dose_given_status === 1 && details?.first_dose_status === 0 ? (
                    <Typography variant="body1">FirstDose given date: </Typography>
                  ) : details.booster_dose_given_status === 1 &&
                    details?.first_dose_given_status === 0 ? (
                    <Typography variant="body1">BoosterDose given date: </Typography>
                  ) : details?.first_dose_status === 1 && details?.second_dose_status === 0 ? (
                    <Typography variant="body1">secondDose given date: </Typography>
                  ) : details?.first_dose_status === 1 &&
                    details?.second_dose_status === 1 &&
                    details?.booster_dose_status === 0 ? (
                    <Typography variant="body1">thirddose given date: </Typography>
                  ) : (
                    ''
                  )}
                  <Typography variant="body1">Remark: </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{ color: '#78C1F3', textTransform: 'capitalize' }}
                    variant="body1"
                  >
                    {details?.em_name}
                  </Typography>
                  <Typography
                    sx={{ color: '#78C1F3', textTransform: 'capitalize' }}
                    variant="body1"
                  >
                    {details?.dept_name}
                  </Typography>
                  <Typography
                    sx={{ color: '#78C1F3', textTransform: 'capitalize' }}
                    variant="body1"
                  >
                    {details?.sect_name}
                  </Typography>
                  <Typography sx={{ color: '#78C1F3' }} variant="body1">
                    {details?.em_no}
                  </Typography>
                  {details?.first_dose_given_status === 1 && details?.first_dose_status === 0 ? (
                    <Typography sx={{ color: '#78C1F3' }} variant="body1">
                      {moment(details?.first_dose_given_date).format('DD-MM-YYYY')}
                    </Typography>
                  ) : details?.booster_dose_given_status === 1 &&
                    details?.first_dose_given_status === 0 ? (
                    <Typography sx={{ color: '#78C1F3' }} variant="body1">
                      {moment(details?.booster_dose_date_given).format('DD-MM-YYYY')}
                    </Typography>
                  ) : details?.first_dose_status === 1 && details?.second_dose_status === 0 ? (
                    <Typography sx={{ color: '#78C1F3' }} variant="body1">
                      {moment(details?.second_dose_due_date).format('DD-MM-YYYY')}
                    </Typography>
                  ) : details?.first_dose_status === 1 &&
                    details?.second_dose_status === 1 &&
                    details?.booster_dose_status === 0 ? (
                    <Typography sx={{ color: '#78C1F3' }} variant="body1">
                      {moment(details?.third_dose_due_date).format('DD-MM-YYYY')}
                    </Typography>
                  ) : (
                    ''
                  )}
                  {/* for remark */}
                  {details?.first_dose_given_status === 1 && details?.first_dose_status === 0 ? (
                    <TextField
                      size="small"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      sx={{ marginTop: 1 }}
                    />
                  ) : details?.booster_dose_given_status === 1 &&
                    details?.first_dose_given_status === 0 ? (
                    <TextField
                      size="small"
                      value={remarksbooster}
                      onChange={(e) => setremarksbooster(e.target.value)}
                      sx={{ marginTop: 1 }}
                    />
                  ) : details?.first_dose_status === 1 && details?.second_dose_status === 0 ? (
                    <TextField
                      size="small"
                      value={remarkssecond}
                      onChange={(e) => setremarkssecond(e.target.value)}
                      sx={{ marginTop: 1 }}
                    />
                  ) : details?.first_dose_status === 1 &&
                    details?.second_dose_status === 1 &&
                    details?.booster_dose_status === 0 ? (
                    <TextField
                      size="small"
                      value={remarksthird}
                      onChange={(e) => setremarksthird(e.target.value)}
                      sx={{ marginTop: 1 }}
                    />
                  ) : (
                    ''
                  )}
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="contained" color="success" onClick={handleOnClick}>
                save
              </Button>
              <Button variant="contained" color="primary" onClick={handleCloseModal}>
                Close
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </Box>
  )
}

export default memo(Modalentry)
