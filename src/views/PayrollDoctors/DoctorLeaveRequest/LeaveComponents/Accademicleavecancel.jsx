import React, { memo, useCallback, useMemo, useState } from 'react'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import { Avatar, Box, Button, ModalDialog, Textarea } from '@mui/joy'
import { format, isValid } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const Accademicleavecancel = ({ open, setOpen, accData, data, setCount }) => {
  const academicData = useMemo(() => accData || data || {}, [accData, data])
  const [reason, setReason] = useState('')

  const handleClose = useCallback(() => {
    setReason('')
    setOpen(false)
  }, [setOpen])

  const formatDate = (dateVal, formatStr = 'dd-MM-yyyy') => {
    if (!dateVal) return 'NIL'
    const d = new Date(dateVal)
    return isValid(d) ? format(d, formatStr) : 'NIL'
  }

  const handleCancel = useCallback(async () => {
    if (!reason || reason.trim() === '') {
      warningNofity('Reason For Cancel The Request is Mandatory')
      return
    }

    try {
      const deleteData = {
        lv_cancel_cmnt: reason,
        lv_cancel_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        leave_slno: academicData?.leave_slno,
        em_no: academicData?.em_no,
      }

      const result = await axioslogin.patch('/DoctorsProcess/doctorAccademic/delete', deleteData)
      const { success, message } = result.data

      if (success === 1 || success === 2) {
        succesNofity(message || 'Academic Leave Request Deleted Successfully')
        if (setCount) setCount(Math.random())
        handleClose()
      } else {
        errorNofity(message || 'Error While Deleting Academic Leave Request')
      }
    } catch (error) {
      errorNofity('Error While Cancelling Academic Leave Request!')
    }
  }, [reason, academicData, setCount, handleClose])

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ModalDialog
        size="lg"
        sx={{
          p: 0,
          minWidth: { xs: '90%', sm: 500, md: 550 },
          overflow: 'hidden',
        }}
      >
        <ModalClose
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.body',
          }}
        />

        {/* Modal Header */}
        <Box
          sx={{
            p: 1.5,
            width: '100%',
            display: 'flex',
            borderRadius: 0,
            flex: 1,
            bgcolor: '#E0FBE2',
          }}
        >
          <Box sx={{ flex: 1, width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Academic/Exam Leave Cancel</Typography>
          </Box>
        </Box>

        {/* Employee Info Header */}
        <Box sx={{ display: 'flex', p: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              pr: 2,
              '--Avatar-size': '60px',
              '--Avatar-ringSize': '8px',
            }}
          >
            <Avatar src="" size="sm" />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Typography level="title-lg">{academicData?.em_name || 'NIL'}</Typography>
                <Typography level="title-lg">Employee No # {academicData?.em_no || 'NIL'}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography level="body-sm" fontFamily="monospace">
                Department Section:
              </Typography>
              <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }}>
                {academicData?.sect_name || 'NIL'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Academic Leave Request Info */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            px: 2,
            py: 1,
            borderBlockStyle: 'outset',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                Request Date
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                :{' '}
                {formatDate(
                  academicData?.request_date || academicData?.requestDate,
                  'dd-MM-yyyy HH:mm'
                )}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                Leave From Date
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                : {formatDate(academicData?.leave_fromdate || academicData?.leaveFrom)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                Leave To Date
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                : {formatDate(academicData?.leave_todate || academicData?.leaveTo)}
              </Typography>
            </Box>
          </Box>

          {academicData?.rejoin_date && (
            <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
              <Box sx={{ flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg">
                  Rejoin Date
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                  : {formatDate(academicData?.rejoin_date)}
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                No Of Leave
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                : {academicData?.no_of_leave ?? 'NIL'}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                Reason
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                : {academicData?.leave_reason || 'NIL'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Reason & Action Buttons */}
        <Box sx={{ p: 1.5 }}>
          <Textarea
            name="Outlined"
            placeholder="Reason For Cancel The Request here…"
            variant="outlined"
            minRows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', px: 1, py: 1.5 }}>
            <Button variant="solid" color="danger" onClick={handleCancel}>
              Delete Request
            </Button>
            <Button variant="solid" color="neutral" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  )
}

export default memo(Accademicleavecancel)
