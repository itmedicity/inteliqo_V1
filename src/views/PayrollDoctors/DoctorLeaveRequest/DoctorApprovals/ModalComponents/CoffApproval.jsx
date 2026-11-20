import React, { memo, useState } from 'react'
import Modal from '@mui/joy/Modal';
import { Button, ModalClose, ModalDialog, Textarea, Typography, Box, Avatar } from '@mui/joy';
import { format } from 'date-fns'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';

const CoffApproval = ({ open, setOpen, coffData, setCount }) => {

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
        doc_cmp_off_reqid: coffData?.doc_cmp_off_reqid,
        remark,
        date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        emid: employeeIdNumber(),
      };

      let url;
      let requestData;

      if (coffData?.approvalType === 1) {
        url = '/DoctorsProcess/hodcoff/status';

        requestData = {
          hod_approval_status: status,
          hod_approval_comment: commonData.remark,
          hod_approval_date: commonData.date,
          hod_emid: commonData.emid,
          doc_cmp_off_reqid: commonData.doc_cmp_off_reqid,
        };

      } else if (coffData?.approvalType === 2) {
        url = '/DoctorsProcess/dmscoff/status';

        requestData = {
          dms_approval_status: status,
          dms_approval_comment: commonData.remark,
          dms_approval_date: commonData.date,
          dms_emid: commonData.emid,
          doc_cmp_off_reqid: commonData.doc_cmp_off_reqid,
        };

      } else if (coffData?.approvalType === 3) {

        requestData = {
          ms_approval_status: status,
          ms_approval_comment: commonData.remark,
          ms_approval_date: commonData.date,
          ms_emid: commonData.emid,
          doc_cmp_off_reqid: commonData.doc_cmp_off_reqid,
          lvereq_desc: coffData?.duty_type === 1
            ? 'DOFF'
            : coffData?.duty_type === 2 || coffData?.duty_type === 3 ||coffData?.duty_type === 4
              ? 'COFF'
              : 'A',

          duty_desc: coffData?.duty_type === 1
            ? 'DOFF'
            : coffData?.duty_type === 2 || coffData?.duty_type === 3 ||coffData?.duty_type === 4
              ? 'COFF'
              : 'A',
          em_no: coffData?.em_no,
          leave_date: coffData?.leave_date
        };

        if (status === 1) {
          url = '/DoctorsProcess/mscoff/approve';

        } else {
          url = '/DoctorsProcess/mscoff/reject';
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
                {coffData?.approvalType === 1 ? 'HOD APPROVAL' : coffData?.approvalType === 2 ? 'DMS APPROVAL' : coffData?.approvalType === 3 ? 'MS approval' : 'NIL'}
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
                  <Typography level="title-lg">{coffData?.em_name}</Typography>
                  <Typography level="title-lg">Employee No # {coffData?.em_no}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }} >
                <Typography level="body-sm" fontFamily="monospace" >Department Section</Typography>
                <Typography level="body-sm" color="primary" variant="plain" noWrap sx={{ mx: 0.5 }} >{coffData?.sect_name}</Typography>
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
                  :{coffData?.requestDate}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  Duty Type
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{coffData?.offduty}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  Special Duty Type
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{coffData?.specialduty}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  Duty taken Date
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{coffData?.dutyTakenDate}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', width: '100%', }} >
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  Leave Date
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{coffData?.leaveDate}
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
                  :{coffData?.cf_reason}
                </Typography>
              </Box>
            </Box>
            {coffData?.approvalType === 1 ? null : <Box sx={{ flex: 1, display: 'flex', width: '100%', }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg"  >
                  HOD Comment
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                  :{coffData?.hod_approval_comment === null ? 'NIL' : coffData?.hod_approval_comment}
                </Typography>
              </Box>
            </Box>
            }
            {
              coffData?.approvalType === 2 || coffData?.approvalType === 1 ? null : <Box sx={{ flex: 1, display: 'flex', width: '100%', }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <Typography fontSize="sm" fontWeight="lg"  >
                    DMS Comment
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                    :{coffData?.dms_approval_comment === null ? 'NIL' : coffData?.dms_approval_comment}
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

export default memo(CoffApproval) 
