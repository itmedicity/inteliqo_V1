import { Box, Radio, RadioGroup } from '@mui/joy';
import { Paper, IconButton, Tooltip } from '@mui/material';
import React, { lazy, useState, useEffect, memo } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import NightsStayOutlinedIcon from '@mui/icons-material/NightsStayOutlined';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { axioslogin } from 'src/views/Axios/Axios'
import { format } from 'date-fns'
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CoffApprove = lazy(() => import('./ModalComponents/CoffApproval'))
const AccApprove = lazy(() => import('./ModalComponents/AccademicApproval'))
const LeaveApprove = lazy(() => import('./ModalComponents/LeaveApproval'))

const MSApprove = () => {
  const [value, setValue] = useState(1);
  const [tableData, setTableData] = useState([])
  const [coffOpen, setcoffOpen] = useState(false)
  const [coffData, setCoffData] = useState([])

  const [accOpen, setAccOpen] = useState(false)
  const [accData, setAccData] = useState([])

  const [leaveOpen, setLeaveOpen] = useState(false)
  const [leaveData, setLeaveData] = useState([])
  const [count, setcount] = useState(0)

  const menuList = [
    { slno: 1, name: 'Leave Request', icon: <AccountBalanceWalletOutlinedIcon color='warning' /> },
    { slno: 2, name: 'Off Request', icon: <NightsStayOutlinedIcon color='secondary' /> },
    { slno: 3, name: 'Accademic/Exam Leave Request', icon: <PersonOffOutlinedIcon color='info' /> },
  ]

  const handleChangeRadioBtn = async (event) => {
    let radioBtnVal = event.target.value;
    setValue(radioBtnVal);
  }

  useEffect(() => {
    const getShowStatus = (k) =>
      k?.hod_required_status === 1 && k?.hod_approval_status === 0
        ? "HOD Approval Pending"
        : k?.hod_required_status === 1 && k?.hod_approval_status === 2
          ? "HOD Approval Rejected"
          : k?.hod_required_status === 1 && k?.hod_approval_status === 1 &&
            k?.dms_required_status === 1 && k?.dms_approval_status === 0
            ? "DMS Approval Pending"
            : k?.dms_required_status === 1 && k?.dms_approval_status === 2
              ? "DMS Approval Rejected"
              : k?.dms_required_status === 1 && k?.dms_approval_status === 1 &&
                k?.ms_required_status === 1 && k?.ms_approval_status === 0
                ? "MS Approval Pending"
                : k?.ms_required_status === 1 && k?.ms_approval_status === 2
                  ? "MS Approval Rejected"
                  : k?.ms_required_status === 1 && k?.ms_approval_status === 1
                    ? "Approved"
                    : "NIL";

    const getCommonData = (data) =>
      data
        ?.filter(
          (i) =>
            i.hod_approval_status !== 2 &&
            i.dms_approval_status !== 2 &&
            i.ms_approval_status === 0 &&
            i.lv_cancel_status === 0
        )
        ?.map((k) => ({
          ...k,
          showStatus: getShowStatus(k),
        }));

    const getData = async (url, extraData) => {
      try {
        const { data, success } = (await axioslogin.get(url)).data;

        if (success === 1) {
          const tableData = getCommonData(data).map((k) => ({
            ...k,
            ...extraData(k),
          }));

          setTableData(tableData);
        } else {
          setTableData([]);
        }
      } catch (error) {
        setTableData([]);
      }
    };

    if (value === '2') {
      getData('/DoctorsProcess/allCoffRequest', (k) => ({
        requesttype: 2,
        approvalType: 3,
        leaveDate: format(new Date(k?.leave_date), 'dd-MM-yyyy'),
        dutyTakenDate: format(new Date(k?.duty_taken_date), 'dd-MM-yyyy'),
        specialduty:
          k?.special_duty_type === 1
            ? "Inside Duty"
            : k?.special_duty_type === 2
              ? "OutSide Duty"
              : "NIL",
        offduty:
          k?.duty_type === 1
            ? "Night Duty"
            : k?.duty_type === 2
              ? "Special Duty"
              : k?.duty_type === 3
                ? "Sunday Duty"
                : "NIL",
        requestDate: format(new Date(k?.reqestdate), 'dd-MM-yyyy'),
      }));

    } else if (value === '3') {
      getData('/DoctorsProcess/allAccmdRequest', (k) => ({
        requesttype: 3,
        approvalType: 3,
        leaveFrom: format(new Date(k?.leave_fromdate), 'dd-MM-yyyy'),
        leaveTo: format(new Date(k?.leave_todate), 'dd-MM-yyyy'),
        requestDate: format(new Date(k?.request_date), 'dd-MM-yyyy'),
      }));

    } else if (value === 1 || value === '1') {
      getData('/DoctorsProcess/allleaveRequest', (k) => ({
        requesttype: 1,
        approvalType: 3,
        leaveFrom: format(new Date(k?.leave_date), 'dd-MM-yyyy'),
        leaveTo: format(new Date(k?.leavetodate), 'dd-MM-yyyy'),
      }));
    }
  }, [value, count]);

  const [columnDef] = useState([
    { headerName: 'ID#', field: 'em_no', filter: true, minWidth: 100 },
    { headerName: 'Name ', field: 'em_name', filter: true, minWidth: 200 },
    { headerName: 'Department ', field: 'dept_name', minWidth: 200, filter: true },
    { headerName: 'Section', field: 'sect_name', filter: true, minWidth: 200 },
    { headerName: 'Status', field: 'showStatus', filter: true, minWidth: 200 },
    {
      headerName: 'Action',
      cellRenderer: params => {
        if (params.data.ms_approval_status === 1 || params.data.ms_approval_status === 2) {
          return <IconButton
            sx={{ paddingY: 0.5, cursor: 'none' }}  >
            <Tooltip title="Cancel Request">
              <BeenhereIcon />
            </Tooltip>
          </IconButton>
        } else {
          return <IconButton onClick={() => handleClickIcon(params)}
            sx={{ paddingY: 0.5 }} >
            <Tooltip title="Click Here to Approve/Reject">
              <CheckCircleOutlineIcon color='primary' />
            </Tooltip>
          </IconButton>
        }
      }
    },
  ])

  const handleClickIcon = async (params) => {
    const { requesttype } = params.data
    if (requesttype === 2) {
      setcoffOpen(true)
      setCoffData(params.data)
    } else if (requesttype === 3) {
      setAccOpen(true)
      setAccData(params.data)
    } else if (requesttype === 1) {
      setLeaveOpen(true)
      setLeaveData(params.data)
    }

  }

  return (
    <CustomLayout title="Doctor Leave - MS Approval" displayClose={true} >
      <CoffApprove open={coffOpen} setOpen={setcoffOpen} coffData={coffData} setCount={setcount} />
      <AccApprove open={accOpen} setOpen={setAccOpen} accData={accData} setCount={setcount} />
      <LeaveApprove open={leaveOpen} setOpen={setLeaveOpen} leaveData={leaveData} setCount={setcount} />
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, p: 0.5, alignItems: 'center' }} >
          <Box sx={{ display: 'flex', flex: 2 }}>
            {
              <RadioGroup
                defaultValue="female"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChangeRadioBtn}
                sx={{ display: 'flex', flexDirection: 'row', flex: 1 }}
                size="lg"
              >
                {
                  menuList && menuList?.map((val, idx) => {
                    return <Box key={idx} sx={{ display: 'flex', flex: 1 }}>
                      <Radio
                        value={val.slno}
                        label={val.name}
                        color="success"
                        variant="outlined"
                      />
                    </Box>
                  })
                }
              </RadioGroup>
            }

          </Box>
        </Paper>
        <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
          <CommonAgGrid
            columnDefs={columnDef}
            tableData={tableData}
            sx={{
              height: 600,
              width: "100%"
            }}
            rowHeight={30}
            headerHeight={30}
          />
        </Paper>
      </Box>
    </CustomLayout>
  )
}

export default memo(MSApprove) 
