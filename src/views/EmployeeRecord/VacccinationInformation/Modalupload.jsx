import React from 'react'
import Modal from '@mui/material/Modal'
import { Box, Paper, Button, Typography } from '@mui/material'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import _ from 'underscore'
import { memo } from 'react'
const Modalupload = ({ setModalOpen, ModalOpen, setCount, count, selectedRowData }) => {
  const handleCloseModal = () => {
    setCount(count + 1)
    setModalOpen(false)
  }

  // for upload file

  return (
    <Box>
      <Modal open={ModalOpen} onClose={handleCloseModal}>
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
              <Typography variant="h6">Annual Health Check Up </Typography>
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
                  <Box sx={{ mt: 2 }}>
                    {/* <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} /> */}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    sx={{ color: '#78C1F3', textTransform: 'capitalize' }}
                    variant="body1"
                  >
                    {selectedRowData?.em_name || 'N/A'}
                  </Typography>
                  <Typography
                    sx={{ color: '#78C1F3', textTransform: 'capitalize' }}
                    variant="body1"
                  >
                    {selectedRowData?.dept_name || 'N/A'}
                  </Typography>
                  <Typography
                    sx={{ color: '#78C1F3', textTransform: 'capitalize' }}
                    variant="body1"
                  >
                    {selectedRowData?.sect_name || 'N/A'}
                  </Typography>
                  <Typography sx={{ color: '#78C1F3' }} variant="body1">
                    {selectedRowData?.em_no || 'N/A'}
                  </Typography>

                  {/* for file upload */}
                  {/* <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} /> */}
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="contained" color="success">
                save
              </Button>
              <Button variant="contained" color="primary">
                Close
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </Box>
  )
}

export default memo(Modalupload)
