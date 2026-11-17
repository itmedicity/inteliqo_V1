import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Typography from '@mui/joy/Typography'
import { Avatar, Box, Button, ModalDialog, Textarea } from '@mui/joy'
import { Paper } from '@mui/material'
import { format, isValid } from 'date-fns'
import moment from 'moment'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { getDoctorLeaveData } from '../LeaveFunctions'
import { employeeIdNumber } from 'src/views/Constant/Constant'
const Leavedeletemodal = ({ open, setOpen, data, leavedata, setCount }) => {
  const leaveData = useMemo(() => data || leavedata || {}, [data, leavedata])
  const [reason, setReason] = useState('')
  const [leaveDetl, setLeaveDetl] = useState([])

  useEffect(() => {
    if (leaveData?.lve_uniq_no) {
      getDoctorLeaveData(leaveData.lve_uniq_no).then((detailArray) => {
        setLeaveDetl(detailArray || [])
      })
    } else {
      setLeaveDetl([])
    }
  }, [leaveData?.lve_uniq_no])

  const handleClose = useCallback(() => {
    setReason('')
    setOpen(false)
  }, [setOpen])

  const formatDate = (dateVal, formatStr = 'dd-MM-yyyy') => {
    if (!dateVal) return 'NIL'
    const d = new Date(dateVal)
    return isValid(d) ? format(d, formatStr) : 'NIL'
  }

  const handleDelete = async () => {
    if (!reason?.trim()) {
      warningNofity('Reason for Cancel/Delete is Mandatory');
      return;
    }

    const emno = leaveData?.em_no;

    // Prepare leave data
    const casualLev = leaveDetl
      ?.filter(val => val.leave_typeid === 1)
      ?.map(val => ({
        ...val,
        cl_lv_taken: 0,
        cl_bal_leave: 0,
        emno
      })) || [];

    const commonLeaves = leaveDetl
      ?.filter(val => ![1, 3, 4, 8, 11].includes(val.leave_typeid))
      ?.map(val => ({ ...val, emno })) || [];

    const lwfLeave = leaveDetl
      ?.map(val => ({ ...val, emno })) || [];

    const deleteData = {
      lv_cancel_cmnt: reason,
      lv_cancel_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      lve_uniq_no: leaveData?.lve_uniq_no,
      leave_slno: leaveData?.leave_slno,
      lv_cancel_emid: employeeIdNumber(),
      em_no: emno
    };

    // Reusable API update function
    const updateLeave = async (url, data, errorMsg) => {
      if (!data.length) return;

      const { success, message } = (await axioslogin.post(url, data)).data;

      if (success !== 1) {
        throw new Error(`${errorMsg} ${message}`);
      }
    };

    try {
      // Update all related tables
      await Promise.all([
        updateLeave(
          '/LeaveRequestApproval/CancelCasualyLeave',
          casualLev,
          'CL Updation Error:'
        ),
        updateLeave(
          '/LeaveRequestApproval/CancelCommonLeave',
          commonLeaves,
          'Common Leave Updation Error:'
        ),
        updateLeave(
          '/DoctorsProcess/deleteLeave/punchmast',
          lwfLeave,
          'LWP Punch Master Updation Error:'
        )
      ]);

      // Delete leave request
      const { success, message } = (
        await axioslogin.patch(
          '/DoctorsProcess/doctorleave/delete',
          deleteData
        )
      ).data;

      if ([1, 2].includes(success)) {
        setOpen(false);
        if (setCount) setCount(Math.random());
        succesNofity(message || 'Leave Request Cancelled Successfully');
      } else {
        errorNofity(message || 'Error while updating leave request table');
      }

    } catch (error) {
      if (setCount) setCount(Math.random());

      errorNofity('Error Updating Leave Request');

      const errorLog = {
        error_log_table: 'doctor_punch_master,doctor_leave_request,doctor_leave_request_detl',
        error_log: error,
        em_no: employeeIdNumber(),
        formName: 'Doctor Leave Delete Modal'
      };

      axioslogin.post('/common/errorLog', errorLog);
      setOpen(false);
    }
  };

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
            <Typography sx={{ fontWeight: 600 }}>Leave Request Delete</Typography>
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
                <Typography level="title-lg">{leaveData?.em_name || 'NIL'}</Typography>
                <Typography level="title-lg">Employee No # {leaveData?.em_no || 'NIL'}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography level="body-sm" fontFamily="monospace">
                Department Section:
              </Typography>
              <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }}>
                {leaveData?.sect_name || 'NIL'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Leave Request Info */}
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
                {leaveData?.request_date
                  ? formatDate(leaveData.request_date, 'dd-MM-yyyy HH:mm')
                  : 'NIL'}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                From Date
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                : {formatDate(leaveData?.leave_date)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                To Date
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                : {formatDate(leaveData?.leavetodate)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg">
                No Of Leave
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                : {leaveData?.no_of_leave ?? 'NIL'}
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
                : {leaveData?.leave_reason || 'NIL'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Detailed Leave Days (if available) */}
        {leaveDetl && leaveDetl.length > 0 && (
          <Paper
            variant="outlined"
            square
            sx={{
              p: 1,
              mx: 2,
              my: 1,
              maxHeight: 150,
              overflow: 'hidden',
            }}
          >
            <Typography level="body-xs" fontWeight="bold" sx={{ mb: 0.5 }}>
              Leave Days Breakdown:
            </Typography>
            {leaveDetl.map((val, idx) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                  py: 0.2,
                }}
                key={idx}
              >
                <Typography fontSize="sm" sx={{ flex: 1 }}>
                  {val.leave_dates ? moment(val.leave_dates).format('DD-MM-YYYY') : 'NIL'}
                </Typography>
                <Typography fontSize="sm" sx={{ flex: 1 }}>
                  {val.leavetype_name || ''}
                </Typography>
                <Typography fontSize="sm" sx={{ flex: 1 }}>
                  {val.leave_name || ''}
                </Typography>
              </Box>
            ))}
          </Paper>
        )}

        {/* Cancel / Delete Reason & Action Buttons */}
        <Box sx={{ p: 2 }}>
          <Textarea
            name="Outlined"
            placeholder="Reason for deleting/canceling the request here…"
            variant="outlined"
            minRows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', pt: 2 }}>
            <Button variant="solid" color="success" onClick={handleDelete}>
              Delete Request
            </Button>
            <Button variant="solid" color="danger" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  )
}

export default memo(Leavedeletemodal)
