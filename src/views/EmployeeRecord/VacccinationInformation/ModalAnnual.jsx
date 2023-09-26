import { TextField, FormControlLabel, Tooltip, Paper, Box } from '@mui/material'
import React, { useState } from 'react'
import Modal from '@mui/material/Modal'
import moment from 'moment'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import { Checkbox, Typography, Button } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { memo } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import imageCompression from 'browser-image-compression'
import { useCallback } from 'react';


const ModalAnnual = ({
  isModalOpen,
  setIsModalOpen,
  selectedRowData,
  setCount,
  count,
  flag,
  setShowGeneral,
}) => {
  const [titerValue, setTiterValue] = useState('')
  const [showTiterValue, setShowTiterValue] = useState(false)
  const [fromDate, setFromDate] = useState(moment())
  const [showUploadImageSection, setShowUploadImageSection] = useState(false)
  const [selectedFileIndex, setSelectedFileIndex] = useState(-1)

  // Function to open the view file modal
  const openViewFileModal = useCallback((index) => {
    setSelectedFileIndex(index)
  },[])

  const handleCloseModal =useCallback( () => {
    setIsModalOpen(false)
    setTiterValue('')
    setCount(count + 1)
  },[count])

  // saving the date
  const [selectedFiles, setSelectedFiles] = useState([])

  const handleFileChange = useCallback((e) => {
    const newFiles = [...selectedFiles]
    newFiles.push(e.target.files[0])
    setSelectedFiles(newFiles)
  },[])

  const handleRemoveFile =useCallback( (index) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)

    // Reset the file input value to allow selecting the same file again
    const fileInput = document.getElementById('file-input')
    if (fileInput) {
      fileInput.value = null
    }
  },[])

 
  const handleImageUpload = useCallback(async (imageFile) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  }
  const compressedFile = await imageCompression(imageFile, options)
  return compressedFile
}, []);
const handleUpload = useCallback(async () => {
  const firstdose = {
    em_id: selectedRowData.em_id,
    em_no: selectedRowData.em_no,
    firstdosedate: selectedRowData.firstdose_date,
    secondDoseDate: selectedRowData.second_dose_given_date,
    thirdDoseDate: selectedRowData.third_dose_given_date,
    hicfirst_dose_date: selectedRowData.hic_first_dose_date,
    hic_second_dose_date: selectedRowData.hic_second_dose_date,
    hic_thirdt_dose_date: selectedRowData.hic_thirdt_dose_date,
    hic_emid_first_verified: selectedRowData.hic_emid_first_verified,
    hic_emid_second_verified: selectedRowData.hic_emid_second_verified,
    hic_emid_third_verified: selectedRowData.hic_emid_third_verified,
    first_vacc_emid: selectedRowData.first_vacc_emid,
    second_vacc_emid: selectedRowData.second_vacc_emid,
    third_vacc_emid: selectedRowData.third_vacc_emid,
    booster_vacc_emid: selectedRowData.booster_vacc_emid,
  };
  const boosterdose = {
    em_id: selectedRowData.em_id,
    em_no: selectedRowData.em_no,
    firstdosedate: selectedRowData.firstdose_date,
    secondDoseDate: selectedRowData.second_dose_given_date,
    thirdDoseDate: selectedRowData.third_dose_given_date,
    booster_dose_due_date: selectedRowData.booster_dose_given_date,
    hicfirst_dose_date: selectedRowData.hic_first_dose_date,
    hic_second_dose_date: selectedRowData.hic_second_dose_date,
    hic_thirdt_dose_date: selectedRowData.hic_thirdt_dose_date,
    hic_boostert_dose_date: selectedRowData.hic_boostert_dose_date,
    hic_emid_first_verified: selectedRowData.hic_emid_first_verified,
    hic_emid_second_verified: selectedRowData.hic_emid_second_verified,
    hic_emid_third_verified: selectedRowData.hic_emid_third_verified,
    hic_emid_booster_verified: selectedRowData.hic_emid_booster_verified,
    first_vacc_emid: selectedRowData.first_vacc_emid,
    second_vacc_emid: selectedRowData.second_vacc_emid,
    third_vacc_emid: selectedRowData.third_vacc_emid,
    booster_vacc_emid: selectedRowData.booster_vacc_emid,
  };

  if (selectedRowData.first_dose_status === 1 && selectedRowData.booster_dose_status === 0) {
    const response = await axioslogin.post('/Vaccination/annualFirstdose', firstdose);
    const { message, success } = response.data;
    if (success === 1) {
      if (!selectedFiles.length) {
        infoNofity('Please select files to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('em_id', selectedRowData?.em_id);

      for (const file of selectedFiles) {
        if (file.type.startsWith('image')) {
          const compressedFile = await handleImageUpload(file);
          formData.append('files', compressedFile, compressedFile.name);
        } else {
          formData.append('files', file, file.name);
        }
      }

      const result = await axioslogin.post('/upload/uploadmultiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { success, message } = result.data;

      if (success === 1) {
        succesNofity(message);
      } else {
        warningNofity(message);
      }
      setShowUploadImageSection(true);
    } else {
      infoNofity(message);
    }
  } else if (
    selectedRowData.first_dose_status === 1 &&
    selectedRowData.booster_dose_status === 1
  ) {
    const response = await axioslogin.post('/Vaccination/annualbooster', boosterdose);
    const { message, success } = response.data;
    if (success === 1) {
      if (!selectedFiles.length) {
        infoNofity('Please select files to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('em_id', selectedRowData?.em_id);

      for (const file of selectedFiles) {
        if (file.type.startsWith('image')) {
          const compressedFile = await handleImageUpload(file);
          formData.append('files', compressedFile, compressedFile.name);
        } else {
          formData.append('files', file, file.name);
        }
      }

      const result = await axioslogin.post('/upload/uploadmultiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { success, message } = result.data;

      if (success === 1) {
        succesNofity(message);
      } else {
        warningNofity(message);
      }
      setShowUploadImageSection(true);
    } else {
      infoNofity(message);
    }
  }
}, [
  handleImageUpload,
  selectedRowData,
  selectedFiles
]);

  


  const handleOnClick = useCallback(async (event) => {
  event.preventDefault();

  if (showTiterValue) {
    const firstdose = {
      fromDate: moment(fromDate).format('yyyy-MM-DD'),
      em_no: selectedRowData?.em_no,
    };
    const boosterDose = {
      fromDate: moment(fromDate).format('yyyy-MM-DD'),
      em_no: selectedRowData?.em_no,
    };

    if (titerValue <= 12 && titerValue > 0) {
      const response = await axioslogin.post('/Vaccination/insert', firstdose);
      const { message, success } = response.data;
      if (success === 1) {
        succesNofity(message);
        setCount((prevCount) => prevCount + 1);
        handleCloseModal();
        setShowGeneral(0);
      } else {
        infoNofity(message);
        // setShowGeneral(0)
      }
    } else if (titerValue <= 100 && titerValue > 12) {
      const response = await axioslogin.post('/Vaccination/insertbooster', boosterDose);
      const { message, success } = response.data;

      if (success === 1) {
        succesNofity(message);
        handleCloseModal();
        setCount((prevCount) => prevCount + 1);
        setShowGeneral(0);
      } else {
        infoNofity(message);
        // setShowGeneral(0)
      }
    } else {
      infoNofity('Enter correct titer value');
    }
  } else {
    // for taking the first-time vaccination
    const firsttime = {
      fromDate: moment(fromDate).format('yyyy-MM-DD'),
      em_no: selectedRowData?.em_no,
    };
    const response = await axioslogin.post('/Vaccination/insert', firsttime);
    const { message, success } = response.data;
    if (success === 1) {
      succesNofity(message);
      setCount((prevCount) => prevCount + 1);
      handleCloseModal();
      setShowGeneral(0);
    } else {
      infoNofity(message);
    }
  }
}, [
  titerValue,
  showTiterValue,
  selectedRowData,
  fromDate,
  setShowGeneral,
  setCount
]);

  // Render selected files with view buttons
  const renderSelectedFiles = () => {
    return selectedFiles.map((file, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          width: '100%',
          padding: '1px 0',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '5%', pr: 1, color: '#78C1F3' }}>{index + 1}.</Box>
        <Box sx={{ width: '75%' }}>{file.name}</Box>
        <Box sx={{ width: '20%' }}>
          <Tooltip title="Close">
            <IconButton color="primary" aria-label="Close" onClick={() => handleRemoveFile(index)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton color="primary" aria-label="View" onClick={() => openViewFileModal(index)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    ))
  }

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
            <Typography variant="h6">Annual Vaccination Information</Typography>
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
              </Box>
            </Box>
          </Box>
          {/* for upload pre-employment health */}

          <Box sx={{ mt: 2 }}>
            <Box sx={{ borderColor: '#C9CCD5', display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ width: '33%' }}>
                Upload file:
              </Typography>
              <label htmlFor="file-input">
                <Tooltip title="Upload file">
                  <Button variant="outlined" component="label" size="sm" color="danger">
                    <UploadFileIcon />
                    <input
                      id="file-input"
                      type="file"
                      accept=".jpg, .jpeg, .png, .pdf"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </Button>
                </Tooltip>
              </label>
            </Box>

            <Box sx={{}}>{renderSelectedFiles()}</Box>

            <Box sx={{ mt: 1 }}>
              <Button variant="outlined" color="success" onClick={handleUpload}>
                Upload
              </Button>
            </Box>
          </Box>
          {/* Checkbox for "Yes" or "No" */}

          {showUploadImageSection && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body1">Are you vaccinated before: </Typography>
              <Box sx={{ p: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showTiterValue}
                      onChange={(e) => setShowTiterValue(e.target.checked)}
                    />
                  }
                  label="Check if Yes"
                />
              </Box>
              {/* titier value */}
              {showTiterValue && flag === 1 ? (
                <Box sx={{ mt: 2, width: '50%' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Titer Value
                  </Typography>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={titerValue}
                    onChange={(e) => setTiterValue(e.target.value)}
                  />
                </Box>
              ) : null}
              <Box sx={{ mt: 1, width: '50%' }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    views={['day']}
                    inputFormat="DD-MM-YYYY"
                    minDate={new Date()}
                    value={fromDate}
                    onChange={setFromDate}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        helperText={null}
                        size="small"
                        sx={{ display: 'flex', pt: 0.5 }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
              {flag === 1 && titerValue <= 12 && titerValue > 0 ? (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ color: 'red' }}>
                    The patient needs 3 dose.
                  </Typography>
                </Box>
              ) : null}
              {flag === 1 && titerValue > 12 && titerValue <= 100 ? (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ color: 'blue' }}>
                    The patient needs only booster dose.
                  </Typography>
                </Box>
              ) : null}
              {flag === 1 && titerValue > 100 ? (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ color: 'blue' }}>
                    Enter Correct titer value.
                  </Typography>
                </Box>
              ) : null}

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" color="success" onClick={handleOnClick}>
                  save
                </Button>
                <Button variant="outlined" color="primary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Box>
            </Box>
          )}
        </Paper>

        {/* modal for displaying */}
        <Modal open={selectedFileIndex !== -1} onClose={() => setSelectedFileIndex(-1)}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              width: '80%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Box
              sx={{
                border: '1px solid #ccc',
                padding: '10px',
                width: '100%',
                height: '800px',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {selectedFileIndex !== -1 && (
                <>
                  {selectedFiles[selectedFileIndex].type.startsWith('image/') ? (
                    // Display the selected image
                    <img
                      src={URL.createObjectURL(selectedFiles[selectedFileIndex])}
                      alt="Selected File"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  ) : (
                    // Display the selected PDF file using the 'object' element
                    <object
                      data={URL.createObjectURL(selectedFiles[selectedFileIndex])}
                      type="application/pdf"
                      width="100%"
                      height="100%"
                    >
                      PDF Viewer not available. You can download the PDF file{' '}
                      <a href={URL.createObjectURL(selectedFiles[selectedFileIndex])}>here</a>.
                    </object>
                  )}
                </>
              )}
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" color="primary" onClick={() => setSelectedFileIndex(-1)}>
                Close
              </Button>
            </Box>
          </Paper>
        </Modal>
      </Box>
    </Modal>
  )
}

export default memo(ModalAnnual)
