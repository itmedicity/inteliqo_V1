import React, { memo, useState } from 'react'
import Modal from '@mui/joy/Modal';
import { Button, ModalClose, ModalDialog, Textarea, Typography, Box, Avatar } from '@mui/joy';
import { format, eachDayOfInterval } from 'date-fns'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';

const AccademicApproval = ({ open, setOpen, accData, setCount }) => {

  const [remark, setRemark] = useState('');
  const [openBkDrop, setOpenBkDrop] = useState(false)

  const handleRequest = async (status) => {
    setOpenBkDrop(true);

    if (!remark?.trim()) {
      setOpenBkDrop(false);
      infoNofity("Please Add Remarks!");
      return;
    }

    try {
      const commonData = {
        leave_slno: accData?.leave_slno,
        remark,
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        emid: employeeIdNumber(),
      };

      let url;
      let requestData;

      if (accData?.approvalType === 1) {
        url = '/DoctorsProcess/hodAcc/status';

        requestData = {
          hod_approval_status: status,
          hod_approval_comment: commonData.remark,
          hod_approval_date: commonData.date,
          hod_emid: commonData.emid,
          leave_slno: commonData.leave_slno,
        };

      } else if (accData?.approvalType === 2) {
        url = '/DoctorsProcess/dmsAcc/status';

        requestData = {
          dms_approval_status: status,
          dms_approval_comment: commonData.remark,
          dms_approval_date: commonData.date,
          dms_emid: commonData.emid,
          leave_slno: commonData.leave_slno,
        };

      } else if (accData?.approvalType === 3) {

        requestData = {
          ms_approval_status: status,
          ms_approval_comment: commonData.remark,
          ms_approval_date: commonData.date,
          ms_emid: commonData.emid,
          leave_slno: commonData.leave_slno,
        };

        if (status === 1) {
          const dateDifference = eachDayOfInterval({
            start: new Date(accData?.leave_fromdate),
            end: new Date(accData?.leave_todate),
          });

          const leaveDoctormast = dateDifference.map((date) => ({
            date: format(date, 'yyyy-MM-dd'),
            lvereq_desc: 'EML',
            duty_desc: 'EML',
            em_no: accData?.em_no,
          }));

          requestData = {
            punchmastLeave: leaveDoctormast,
            tableLeave: requestData,
          };

          url = '/DoctorsProcess/msAcc/approve';

        } else {
          url = '/DoctorsProcess/msAcc/reject';
        }
      }

      if (!url) return;

      const { data } = await axioslogin.patch(url, requestData);
      const { message, success } = data;

      setOpenBkDrop(false);
      setOpen(false);
      setCount(Math.random());

      success === 1
        ? succesNofity(message)
        : errorNofity(message);

    } catch (error) {
      setOpenBkDrop(false);
      errorNofity("Something went wrong");
    }
  };

  const handleApproverequest = () => handleRequest(1);

  const handleRejectRequest = () => handleRequest(2);


  const close = async () => {
    setOpen(false)
    setOpenBkDrop(false)
  }

  return (
    <>
      <CustomBackDrop open={openBkDrop} text="Please wait !. Leave Detailed information Updation In Process" />

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={close}
        sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',

        }}
      >
        <ModalDialog size="lg" sx={{ p: 0, }}  >
          <ModalClose
            //  variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Box sx={{
            p: 1,
            width: '100%', display: 'flex', borderRadius: 0, flex: 1,
            bgcolor: '#E0FBE2'
          }}>
            <Box sx={{ flex: 1, width: '100%' }} >
              <Typography sx={{ fontWeight: 600 }} >
                {accData?.approvalType === 1 ? 'HOD APPROVAL' :accData?.approvalType === 2 ?'DMS APPROVAL':accData?.approvalType === 3 ?'MS approval': 'NIL'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', p: 1 }} >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                pr: 2,
                "--Avatar-size": "60px",
                "--Avatar-ringSize": "8px"
              }}
            >
              <Avatar src="" size="sm" />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} >
              <Box sx={{ display: 'flex', }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, }} >
                  <Typography level="title-lg">{accData?.em_name}</Typography>
                  <Typography level="title-lg">Employee No # {accData?.em_no}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                <Typography level="body-sm" fontFamily="monospace" >Department Section</Typography>
                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{accData?.sect_name}</Typography>
              </Box>
            </Box>

          </Box>
          <Box
            sx={{
              display: 'flex', justifyContent: 'center',
              alignItems: 'center', px: 1, borderBlockStyle: 'outset',
              flexDirection: 'column',
            }} >
            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
              <Box sx={{ flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  Request Date
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{accData?.requestDate}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  Leave From Date
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{accData?.leaveFrom}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  Leave To Date
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{accData?.leaveTo}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  Leave Reason
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{accData?.leave_reason}
                </Typography>
              </Box>
            </Box>
            {accData?.approvalType === 1 ? null:<Box sx={{ flex: 1, display: 'flex', width: '100%', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  HOD Comment
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{accData?.hod_approval_comment === null ? 'NIL' : accData?.hod_approval_comment}
                </Typography>
              </Box>
            </Box>
            }
            {
              accData?.approvalType === 2 ? null:<Box sx={{ flex: 1, display: 'flex', width: '100%', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  DMS Comment
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{accData?.dms_approval_comment === null ? 'NIL' : accData?.dms_approval_comment}
                </Typography>
              </Box>
            </Box>
            }
             </Box>
          <Box sx={{ p: 1 }} >
            <Textarea name="Outlined" placeholder="Reason For Cancel The Request here…"
              variant="outlined" onChange={(e) => setRemark(e.target.value)} />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', px: 2, py: 2, mb: 1 }}>
              <Button variant='solid' color="success" onClick={handleApproverequest}>
                Approve
              </Button>
              <Button variant="solid" color="danger" onClick={handleRejectRequest}>
                Reject
              </Button>
            </Box>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default memo(AccademicApproval) 
