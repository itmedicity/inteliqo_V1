import { Box, Button, Modal, ModalClose, Option, Select, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const ConsultingDutyShift = ({
  open,
  setOpen,
  sectionShiftList,
  commonSettingData,
  setDutyAssignments,
  selectedData,
}) => {
  const { notapplicable_shift, default_shift, week_off_day, doff } = commonSettingData

  const [Shift, setShift] = useState(0)
  const [shiftName, setShiftName] = useState('')

  const handleModalClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const multiShiftSubmit = async () => {
    if (Shift === 0) return warningNofity('Must Select A Shift')

    const { formattedDate, dutySlno } = selectedData

    const obj = {
      shift_id: Shift,
      shiftName: shiftName,
      offday_flag: Shift === week_off_day ? 1 : 0,
    }

    setDutyAssignments((prev) => {
      const existingIndex = prev.findIndex((entry) => entry.date === formattedDate)
      if (existingIndex !== -1) {
        const updated = [...prev]
        updated[existingIndex] = { ...updated[existingIndex], dutySlno, ...obj }
        setShift(0)
        handleModalClose()
        return updated
      } else {
        setShift(0)
        handleModalClose()
        return [...prev, { date: formattedDate, dutySlno, ...obj }]
      }
    })
  }

  return (
    <Modal open={open} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        variant="outlined"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          borderRadius: 'md',
          p: 0.5,
          boxShadow: 'lg',
          bgcolor: 'background.body',
          minHeight: 200,
        }}
      >
        <ModalClose
          onClick={handleModalClose}
          variant="outlined"
          sx={{
            top: 'calc(-1/4 * var(--IconButton-size))',
            right: 'calc(-1/4 * var(--IconButton-size))',
            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
            borderRadius: '50%',
            bgcolor: 'background.body',
          }}
        />
        <Box sx={{ border: '0.5px solid #e9ecef' }}>
          <Box
            sx={{
              p: 1,
              width: '100%',
              display: 'flex',
              borderRadius: 0,
              flex: 1,
              bgcolor: '#E0FBE2',
            }}
          >
            <Box sx={{ flex: 1, width: '100%' }}>
              <Typography sx={{ fontWeight: 600 }}>Consulting Duty selection</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flex: 1, p: 1 }}>
            <Select
              value={Shift}
              onChange={(event, newValue) => {
                setShiftName(event.target.innerText)
                setShift(newValue)
              }}
              size="md"
              variant="outlined"
              sx={{ width: '100%' }}
            >
              <Option disabled value={0}>
                {' '}
                Select Duty Shift
              </Option>
              {sectionShiftList?.map((val, index) => {
                return (
                  <Option
                    value={val?.shiftcode}
                    key={index}
                    disabled={
                      val?.shiftcode === notapplicable_shift ||
                      val?.shiftcode === default_shift ||
                      val?.shiftcode === doff
                        ? true
                        : false
                    }
                  >
                    {val?.shiftDescription}
                  </Option>
                )
              })}
            </Select>
          </Box>
          <Box sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', px: 2, py: 3, flexDirection: 'row-reverse', gap: 1 }}>
              <Button
                variant="outlined"
                color="success"
                onClick={() => setOpen(false)}
                size="sm"
                sx={{ py: 0, color: '#d50000' }}
              >
                <CancelOutlinedIcon sx={{ fontSize: 25 }} />
              </Button>

              <Button
                variant="outlined"
                color="danger"
                onClick={multiShiftSubmit}
                size="sm"
                sx={{ py: 0, color: '#81c784' }}
              >
                <LibraryAddCheckIcon sx={{ fontSize: 25 }} />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default memo(ConsultingDutyShift)
