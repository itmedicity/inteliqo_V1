import React, { memo, useEffect, useState } from 'react'
import Modal from '@mui/joy/Modal'
import { Button, ModalClose, ModalDialog, Textarea, Typography, Box } from '@mui/joy'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined'
import { Paper } from '@mui/material'
import { format } from 'date-fns'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { getDoctorLeaveData } from '../../LeaveFunctions'
import moment from 'moment';

const LeaveApproval = ({ open, setOpen, leaveData, setCount }) => {

  const [remark, setRemark] = useState('')
  const [openBkDrop, setOpenBkDrop] = useState(false)
  const [leaveDetl, setLeaveDetl] = useState([])

  useEffect(() => {
    getDoctorLeaveData(leaveData?.lve_uniq_no).then((emplyleaveArray) => {
      setLeaveDetl(emplyleaveArray)
    })

  }, [leaveData])

  const handleRequest = async (status) => {
    setOpenBkDrop(true);

    //for checking remark is null or not
    if (!remark?.trim()) {
      setOpenBkDrop(false);
      infoNofity("Please Add Remarks!");
      return;
    }

    try {
      const approvalType = leaveData?.approvalType;
      const leaveSlno = leaveData?.leave_slno;
      const emno = leaveData?.em_no;
      const emid = employeeIdNumber();
      const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      const approvalConfig = {
        1: {
          status: "hod_approval_status",
          comment: "hod_approval_comment",
          date: "hod_approval_date",
          emid: "hod_emid",
          approveUrl: "/DoctorsProcess/hodLeavereq/approve",
          rejectUrl: "/DoctorsProcess/hodLeavereq/reject",
        },
        2: {
          status: "dms_approval_status",
          comment: "dms_approval_comment",
          date: "dms_approval_date",
          emid: "dms_emid",
          approveUrl: "/DoctorsProcess/dmsLeavereq/approve",
          rejectUrl: "/DoctorsProcess/dmsLeavereq/reject",
        },
        3: {
          status: "ms_approval_status",
          comment: "ms_approval_comment",
          date: "ms_approval_date",
          emid: "ms_emid",
          approveUrl: "/DoctorsProcess/msLeavereq/approve",
          rejectUrl: "/DoctorsProcess/msLeavereq/reject",
        },
      };

      const config = approvalConfig[approvalType];

      if (!config) {
        setOpenBkDrop(false);
        return;
      }

      const requestData = {
        [config.status]: status,
        [config.comment]: remark,
        [config.date]: date,
        [config.emid]: emid,
        leave_slno: leaveSlno,
      };

      // ---------------------------------------------------
      // CANCEL LEAVES - HOD / DMS / MS REJECTION
      // ---------------------------------------------------
      const cancelLeaves = async () => {
        const casualLeave = leaveDetl
          ?.filter((val) => val.leave_typeid === 1)
          ?.map((val) => ({
            ...val,
            cl_lv_taken: 0,
            cl_bal_leave: 0,
            emno,
          }));

        const commonLeave = leaveDetl
          ?.filter(
            (val) =>
              ![1, 3, 4, 8, 11].includes(val.leave_typeid)
          )
          ?.map((val) => ({
            ...val,
            emno,
          }));

        const requests = [];

        if (casualLeave?.length) {
          requests.push(
            axioslogin.post(
              "/LeaveRequestApproval/CancelCasualyLeave",
              casualLeave
            )
          );
        }

        if (commonLeave?.length) {
          requests.push(
            axioslogin.post(
              "/LeaveRequestApproval/CancelCommonLeave",
              commonLeave
            )
          );
        }

        const results = await Promise.all(requests);

        results.forEach(({ data }) => {
          if (data?.success !== 1) {
            throw new Error(data?.message);
          }
        });
      };

      // ---------------------------------------------------
      // MS APPROVAL - UPDATE CASUAL LEAVE
      // ---------------------------------------------------
      const updateCasualLeave = async () => {
        const casualLeave = leaveDetl
          ?.filter((val) => val.leave_typeid === 1)
          ?.map((val) => ({ ...val }));

        if (!casualLeave?.length) return;

        const { data } = await axioslogin.post(
          "/LeaveRequestApproval/updateCasualLeaveTable",
          casualLeave
        );

        if (data?.success !== 1) {
          throw new Error(data?.message);
        }
      };

      // ---------------------------------------------------
      // MS APPROVAL - UPDATE PUNCH MASTER
      // ---------------------------------------------------
      const updatePunchMaster = async () => {
        if (!leaveDetl?.length) return;

        const leaveType = {
          1: "CL",
          5: "LWP",
          7: "SL",
          9: "CNFL",
        };

        const data = leaveDetl.map((val) => ({
          ...val,
          lvereq_desc: leaveType[val.leave_typeid] || "A",
          duty_desc: leaveType[val.leave_typeid] || "A",
          leave_dates: format(
            new Date(val.leave_dates),
            "yyyy-MM-dd"
          ),
          emno,
        }));

        const result = await axioslogin.post(
          "/DoctorsProcess/doctorleave/update",
          data
        );

        if (result?.data?.success !== 1) {
          throw new Error(result?.data?.message);
        }
      };

      // ---------------------------------------------------
      // APPROVAL TYPE 3 - MS
      // ---------------------------------------------------
      if (approvalType === 3 && status === 1) {
        await updateCasualLeave();
        await updatePunchMaster();
      }

      // ---------------------------------------------------
      // REJECTION
      // ---------------------------------------------------
      if (status !== 1) {
        await cancelLeaves();
      }

      // ---------------------------------------------------
      // APPROVE / REJECT REQUEST
      // ---------------------------------------------------
      const url =
        status === 1
          ? config.approveUrl
          : config.rejectUrl;

      const { data } = await axioslogin.patch(url, requestData);

      setOpenBkDrop(false);
      setOpen(false);
      setCount(Math.random());

      data?.success === 1
        ? succesNofity(data?.message)
        : errorNofity(data?.message);

    } catch (error) {
      console.error(error);

      setCount(Math.random());
      setOpenBkDrop(false);
      setOpen(false);

      errorNofity("Error Updating Leave Request");

      const errorLog = {
        error_log_table: "punch_master,leave_request,leave_reqdetl",
        error_log: error?.message || error,
        em_no: leaveData?.em_no,
        formName: "Leave Approval Modal Approval HR Page",
      };

      axioslogin.post("/common/errorLog", errorLog);
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
      <CustomBackDrop
        open={openBkDrop}
        text="Please wait !. Leave Detailed information Updation In Process"
      />
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={close}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog size="lg">
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Box sx={{ display: 'flex', flex: 1, alignContent: 'center', alignItems: 'center' }}>
            <Typography
              fontSize="xl2"
              lineHeight={1}
              startDecorator={<EmojiEmotionsOutlinedIcon sx={{ color: 'green' }} />}
              sx={{ display: 'flex', alignItems: 'flex-start', mr: 2 }}
            >
              {leaveData?.em_name}
            </Typography>
            <Typography
              lineHeight={1}
              component="h3"
              id="modal-title"
              level="h5"
              textColor="inherit"
              fontWeight="md"
              endDecorator={
                <Typography
                  level="h6"
                  justifyContent="center"
                  alignItems="center"
                  alignContent="center"
                  lineHeight={1}
                >
                  {leaveData?.em_no}
                </Typography>
              }
              sx={{ color: 'neutral.400', display: 'flex' }}
            >
              {`employee ID#`}
            </Typography>
            <Typography level="body1" sx={{ px: 1, textTransform: 'lowercase' }}>
              {leaveData?.sect_name}
            </Typography>
          </Box>
          <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 1,
                flexDirection: 'column',
              }}
            >
              <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg">
                    Leave From Date
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                    :{leaveData?.leaveFrom}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg">
                    Leave To Date
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                    :{leaveData?.leaveTo}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg">
                    No Of Leave
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                    :{leaveData?.no_of_leave}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg">
                    Leave Reason
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                    :{leaveData?.leave_reason}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg">
                    HOD Comment
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                    :
                    {leaveData?.hod_approval_comment === null
                      ? 'NIL'
                      : leaveData?.hod_approval_comment}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg">
                    DMS Comment
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }}>
                    :
                    {leaveData?.dms_approval_comment === null
                      ? 'NIL'
                      : leaveData?.dms_approval_comment}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
          <Paper variant="outlined" square sx={{
            p: 0.5, mb: 0.8, width: '100%',
            //  height: 200,
            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
          }} >
            {
              leaveDetl?.map((val, idx) => {
                return <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flex: 1 }} key={idx} >
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }} >
                    {moment(val.leave_dates).format('DD-MM-YYYY')}
                  </Typography>
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }}>
                    {val.leavetype_name}
                  </Typography>
                  <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1 }}>
                    {val.leave_name}
                  </Typography>
                </Box>
              })
            }
          </Paper>
          <Box sx={{ pt: 0.5 }}>
            <Textarea
              name="Outlined"
              placeholder="Remark For Approve/Reject The Request here…"
              variant="outlined"
              onChange={(e) => setRemark(e.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
              <Button variant="solid" color="success" onClick={handleApproverequest}>
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

export default memo(LeaveApproval)
