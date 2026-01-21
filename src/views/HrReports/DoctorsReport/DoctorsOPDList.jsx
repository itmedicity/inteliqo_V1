import React, { Fragment, memo, useState } from 'react'
import ReportWithoutDownload from '../ReportComponent/ReportWithoutDownload'
import { Paper } from '@mui/material'
import { Box, Button, Divider, IconButton, Input, Sheet, Table, Tooltip, Typography } from '@mui/joy'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import SearchIcon from '@mui/icons-material/Search'
import { axioslogin } from 'src/views/Axios/Axios'
import { format, isValid } from 'date-fns'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { screenInnerHeight } from 'src/views/Constant/Constant'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { pdfDoctordownlod } from './PDFViewDoctorDutyList'
import "./DoctorSchedule.css";

const DoctorsOPDList = () => {
  const [fromdate, Setfromdate] = useState(new Date())
  const [openBkDrop, setOpenBkDrop] = useState(false)
  const [tableArray, setTableArray] = useState([])
  const [clickSearch, setClickSearch] = useState(false)

  const getEmpdata = async () => {
    // Fetch all active doctors
    const result = await axioslogin.get('/ActiveEmpReport/allOPD/doctors')
    const { success, data: employeeData } = result.data
    if (success !== 1 || !isValid(fromdate)) {
      warningNofity('There Is No Doctors Data!')
      setOpenBkDrop(false)
      return
    }
    // Prepare employee ID array
    const empIds = employeeData.map((emp) => emp.em_id)

    const uniqueDept = [...new Set(employeeData?.map((i) => i?.dept_name))]?.map((dept) => ({
      dept_name: dept,
    }))

    // Payload for dutyplan request
    const dutyPayload = {
      duty_date: format(new Date(fromdate), 'yyyy-MM-dd'),
      empData: empIds,
    }

    // Fetch dutyplan
    const dutyResponse = await axioslogin.post('/DoctorsProcess/bydate/dutyplan', dutyPayload)
    const { success: dutySuccess, data: dutyData } = dutyResponse.data

    if (dutySuccess === 1) {
      const merged = employeeData?.map((item) => {
        const match = dutyData?.find((i) => i?.emp_id === item?.em_id)
        return { ...item, ...match }
      })

      const filteredArray = uniqueDept?.map((k) => {
        return {
          ...k,
          doctors: merged?.filter((j) => j?.dept_name === k?.dept_name),
        }
      })
      setTableArray(filteredArray)
      setClickSearch(true)
    } else {
      warningNofity('No Dutyplan Updated')
    }
    setOpenBkDrop(false)
    return
  }

  const download = async () => {
    if (clickSearch === false) { warningNofity("Click Search Button!!") }
    else {
      pdfDoctordownlod(tableArray, fromdate)
    }

  }

  return (
    <div>
      <ReportWithoutDownload title="Doctor OPD Report" displayClose={true}>
        <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flex: 1, px: 0.5, display: 'flex' }}>
              <Typography sx={{ p: 1 }}>Duty Date:</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={['day']}
                  value={fromdate}
                  inputFormat="dd-MM-yyyy"
                  size="small"
                  onChange={(newValue) => {
                    Setfromdate(newValue)
                  }}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Input
                        ref={inputRef}
                        {...inputProps}
                        disabled={true}
                        style={{ width: '100%' }}
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
                flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 },
                justifyContent: 'flex-start',
                pl: 0.5,
              }}
            >
              <Button
                aria-label="Like"
                variant="outlined"
                color="primary"
                onClick={getEmpdata}
                fullWidth
                startDecorator={<SearchIcon />}
                sx={{ mx: 0.5 }}
              >
                Search
              </Button>
            </Box>
            <Box sx={{ flex: 1, px: 0.5, display: 'flex' }}>
              <Tooltip title="Download as PDF" followCursor placement='top' arrow >
                <IconButton variant="outlined" size='lg' sx={{ color: 'blue' }}
                  onClick={download}
                >
                  <DownloadForOfflineIcon />
                </IconButton>
              </Tooltip >
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              p: 0.5,
              height: (screenInnerHeight * 75) / 100,
              overflow: 'auto',
              '::-webkit-scrollbar': { display: 'none', backgroundColor: 'lightgoldenrodyellow' },
            }}
          >
            <Sheet
              variant="outlined"
              invertedColors
              sx={{
                '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                overflow: 'auto',
                borderRadius: 5,
                width: '100%',
              }}
            >

              {tableArray.map((dept, index) => (
                <div key={index} className="department">
                  <div className="department-header">
                    {dept.dept_name}
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>Doctor Name</th>
                        <th>Consultation Days</th>
                        {/* <th>Time</th>
                <th>Status</th>
                <th>Remarks</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {dept.doctors.map((doc, i) => (
                        <tr key={i}>
                          <td>{doc.em_name}</td>
                          <td>{doc.shiftName}</td>
                          {/* <td>{doc.time}</td>
                  <td><StatusIcon status={doc.status} /></td>
                  <td>{doc.remarks}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </Sheet>
          </Box>
        </Paper>
      </ReportWithoutDownload>
    </div>
  )
}

export default memo(DoctorsOPDList)
