import React, {  useState,  useMemo } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import { Paper } from '@mui/material'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { Box, IconButton, Input, Tooltip, Typography } from '@mui/joy'
import { pdfdownlod } from 'src/views/HrReports/Employee Punch Report/PunchReport'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import DoctorDepartmentSection from 'src/views/PayrollDoctors/DoctorDutyplan/Components/DoctorDepartmentSection'
import { axioslogin } from 'src/views/Axios/Axios'
import { addDays, format } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import PunchTable from 'src/views/HrReports/Employee Punch Report/PunchTable'
import EmployeeRightsDepartment from '../DoctorDutyplan/Components/EmployeeRightsDepartment'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DoctorsList from '../DoctorDutyplan/Components/DoctorsList'

const DepartmentWisePunchView = () => {
  const [dept, setDept] = useState(0)
  const [tableData, setTableData] = useState([])
  const [Empno, setEmpNo] = useState(0)
  const [fromdate, Setfromdate] = useState(new Date())
  const [todate, Settodate] = useState(new Date())
  const [drop, setDropOpen] = useState(false)
  const [deptSect, setDepartSection] = useState(0)

  const postData = useMemo(() => {
    return {
      empno: parseInt(Empno),
      fromdate: format(new Date(fromdate), 'yyyy-MM-dd'),
      todate: format(new Date(todate), 'yyyy-MM-dd'),
    }
  }, [Empno, fromdate, todate])

  const postDataDep = useMemo(() => {
    return {
      deptno: dept,
      deptsec: deptSect,
      fromdate: format(new Date(fromdate), 'yyyy-MM-dd'),
      todate: format(new Date(todate), 'yyyy-MM-dd'),
    }
  }, [dept, deptSect, fromdate, todate])

  const getData = async () => {
    setDropOpen(true)
    if (Empno !== 0 && fromdate !== '' && todate !== '') {
      const result = await axioslogin.post(`/DoctorsProcess/single/doctorPunch`, postData)
      const { data: firstApiData, success } = result.data
      if (success === 1) {
        const result = await axioslogin.post(`/DoctorsProcess/punchReport/singledoctor`, postData)
        const { data, success } = result.data

        if (success === 1) {
          const setData = data?.map((data) => {
            let shiftIn = `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(
              new Date(data.shift_in),
              'HH:mm',
            )}`
            let shiftOut =
              data.shft_cross_day === 0
                ? `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(
                    new Date(data.shift_out),
                    'HH:mm',
                  )}`
                : `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(
                    new Date(data.shift_out),
                    'HH:mm',
                  )}`
            return {
              dept_name: data?.dept_name,
              duty_day: data?.duty_day,
              em_name: data?.em_name,
              em_no: data?.em_no,
              sect_name: data?.sect_name,
              shft_cross_day: data?.shft_cross_day,
              shift_id: data?.shift_id,
              shift_in: shiftIn,
              shift_out: shiftOut,
            }
          })

          const updatedSecondApiData = setData.map((data) => {
            const correspondingFirstData = firstApiData.filter((firstApiData) => {
              return (
                parseInt(firstApiData.emp_code) === data.em_no &&
                new Date(firstApiData.punch_time).toDateString() ===
                  new Date(data.duty_day).toDateString()
              )
            })
            return {
              ...data,
              new_field: correspondingFirstData.map((data) => data.punch_time),
            }
          })
          const array = updatedSecondApiData.sort(
            (a, b) => new Date(a.duty_day) - new Date(b.duty_day),
          )
          setDropOpen(false)
          setTableData(array)
        }
      }
    } else if (dept !== 0 && deptSect !== 0 && fromdate !== '' && todate !== '') {
      const result = await axioslogin.post(`/DoctorsProcess/doctorPunch/dept`, postDataDep)
      const { data: firstApiData, success } = result.data
      if (success === 1) {
        const result = await axioslogin.post(`/DoctorsProcess/doctorPunchmast`, postDataDep)
        const { data, success } = result.data
        if (success === 1) {
          const setData = data?.map((data) => {
            let shiftIn = `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(
              new Date(data.shift_in),
              'HH:mm',
            )}`
            let shiftOut =
              data.shft_cross_day === 0
                ? `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(
                    new Date(data.shift_out),
                    'HH:mm',
                  )}`
                : `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(
                    new Date(data.shift_out),
                    'HH:mm',
                  )}`
            return {
              dept_name: data?.dept_name,
              duty_day: data?.duty_day,
              em_name: data?.em_name,
              em_no: data?.em_no,
              sect_name: data?.sect_name,
              shft_cross_day: data?.shft_cross_day,
              shift_id: data?.shift_id,
              shift_in: shiftIn,
              shift_out: shiftOut,
            }
          })

          const updatedSecondApiData = setData.map((data) => {
            const correspondingFirstData = firstApiData.filter((firstApiData) => {
              return (
                parseInt(firstApiData.emp_code) === data.em_no &&
                new Date(firstApiData.punch_time).toDateString() ===
                  new Date(data.duty_day).toDateString()
              )
            })
            return {
              ...data,
              new_field: correspondingFirstData.map((data) => data.punch_time),
            }
          })
          const array = updatedSecondApiData.sort(
            (a, b) => new Date(a.duty_day) - new Date(b.duty_day),
          )

          setTableData(array)
          // setTableData(updatedSecondApiData)
          setDropOpen(false)
        }
      }
    } else {
      setDept(0)
      setDepartSection(0)
      setEmpNo(0)
      setTableData([])
      warningNofity('Please Enter from date and to date')
      setDropOpen(false)
    }
  }

  const handleIconClick = () => {
    if (tableData.length > 0) {
      pdfdownlod(tableData)
    } else {
      warningNofity('no data to show')
    }
  }
  return (
    <>
      <CustomBackDrop open={drop} text="Your Request Is Processing. Please Wait..." />
      <CustomLayout title="Doctor Punch Report" displayClose={true}>
        <Paper sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3 }}>
            <Box
              sx={{
                display: 'flex',
                flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                flexDirection: 'row',
                px: 0.5,
              }}
            >
              <EmployeeRightsDepartment value={dept} setValue={setDept} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                flexDirection: 'row',
                px: 0.5,
              }}
            >
              <DoctorDepartmentSection value={deptSect} setValue={setDepartSection} dept={dept} />
            </Box>
            <Tooltip title="Employee Number" followCursor placement="top" arrow>
              <Box
                sx={{
                  display: 'flex',
                  flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                  flexDirection: 'row',
                  px: 0.5,
                }}
              >
                <DoctorsList value={Empno} setValue={setEmpNo} sect={deptSect} />
              </Box>
            </Tooltip>
            <Box
              sx={{
                display: 'flex',
                flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                flexDirection: 'row',
                px: 0.5,
              }}
            >
              <Typography sx={{ p: 1 }}>From:</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['day']}
                  value={fromdate}
                  inputFormat="dd/MM/yyyy"
                  onChange={(newValue) => {
                    Setfromdate(newValue)
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Input
                        ref={inputRef}
                        {...inputProps}
                        style={{ width: '80%' }}
                        disabled={true}
                      />
                      {InputProps?.endAdornment}
                    </Box>
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                flexDirection: 'row',
                px: 0.5,
              }}
            >
              <Typography sx={{ p: 1 }}>To:</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['day']}
                  value={todate}
                  inputFormat="dd/MM/yyyy"
                  onChange={(newValue) => {
                    Settodate(newValue)
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Input
                        ref={inputRef}
                        {...inputProps}
                        style={{ width: '80%' }}
                        disabled={true}
                      />
                      {InputProps?.endAdornment}
                    </Box>
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box sx={{ display: 'flex', px: 0.3 }}>
              <IconButton variant="outlined" size="lg" color="primary" onClick={getData}>
                <PublishedWithChangesIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', px: 0.3 }}>
              <IconButton variant="outlined" size="lg" color="primary" onClick={handleIconClick}>
                <DownloadForOfflineIcon />
              </IconButton>
            </Box>
          </Box>
          <Paper
            square
            elevation={0}
            sx={{
              p: 1,
              mt: 0.5,
              display: 'flex',
              flexDirection: 'column',
              height: window.innerHeight - 170,
              overflow: 'auto',
            }}
          >
            <PunchTable tableData={tableData} />
          </Paper>
        </Paper>
      </CustomLayout>
    </>
  )
}

export default DepartmentWisePunchView
