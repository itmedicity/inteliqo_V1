import React, { Fragment, memo, useState } from 'react'
import ReportWithoutDownload from '../ReportComponent/ReportWithoutDownload'
import { Paper } from '@mui/material'
import { Box, Button, Divider, Input, Sheet, Table, Typography } from '@mui/joy'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import SearchIcon from '@mui/icons-material/Search'
import { axioslogin } from 'src/views/Axios/Axios'
import { format, isValid } from 'date-fns'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { screenInnerHeight } from 'src/views/Constant/Constant'

const DoctorsOPDList = () => {
  const [fromdate, Setfromdate] = useState(new Date())
  const [openBkDrop, setOpenBkDrop] = useState(false)
  const [tableArray, setTableArray] = useState([])

  const getEmpdata = async () => {
    // Fetch all active doctors
    const result = await axioslogin.get('/ActiveEmpReport/allactive/doctors')
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
      const merged = employeeData.map((item) => {
        const match = dutyData.find((i) => i.emp_id === item.em_id)
        return { ...item, ...match }
      })

      const filteredArray = uniqueDept?.map((k) => {
        return {
          ...k,
          doctors: merged?.filter((j) => j.dept_name === k.dept_name),
        }
      })
      setTableArray(filteredArray)
    } else {
      warningNofity('No Dutyplan Updated')
    }
    setOpenBkDrop(false)
    return
  }

  console.log(tableArray)

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
                  //maxDate={new Date()}
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
            <Box sx={{ flex: 1, px: 0.5, display: 'flex' }}></Box>
            <Box sx={{ flex: 1, px: 0.5, display: 'flex' }}></Box>
            <Box sx={{ flex: 1, px: 0.5, display: 'flex' }}></Box>
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
              <Table
                borderAxis="bothBetween"
                stripe="odd"
                hoverRow
                stickyHeader
                size="sm"
                sx={{
                  '& tr > *:first-of-type': {
                    position: 'sticky',
                    left: 0,
                    boxShadow: '1px 0 var(--TableCell-borderColor)',
                    bgcolor: 'background.surface',
                    zIndex: 4,
                    width: '100%',
                  },
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ width: 200, zIndex: 5, backgroundColor: '#f9fafb' }}>
                      Department
                    </th>
                    <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }}>
                      Doctor Name
                    </th>
                    <th style={{ width: 150, zIndex: 2, backgroundColor: '#f9fafb' }}>
                      Shift Name
                    </th>
                    {/* <th style={{ width: 150, zIndex: 2, backgroundColor: '#f9fafb' }}>
                      Present/Absent
                    </th>
                    <th style={{ width: 100, zIndex: 2, backgroundColor: '#f9fafb' }}>Sign</th> */}
                  </tr>
                </thead>
                <tbody>
                  {tableArray?.map((row, index) => (
                    <Fragment key={index}>
                      <tr>
                        <td style={{ zIndex: 4, backgroundColor: '#f4f6f8' }}>
                          <Box sx={{ width: 200 }}> {row?.dept_name}</Box>
                        </td>
                        <td style={{ textAlign: 'center', zIndex: 4, backgroundColor: '#f4f6f8'}}>
                          {row?.doctors?.map((val, ind) => (
                            <tr key={ind} >
                              <td  style={{width:'300px',zIndex: 4, backgroundColor: '#f4f6f8'}}> {val?.em_name}</td>
                            </tr>
                          ))}
                        </td>
                         <td style={{ textAlign: 'center',  zIndex: 4, backgroundColor: '#f4f6f8'}}>
                          {row?.doctors?.map((val, ind) => (
                            <tr key={ind}>
                              <td  style={{width:'300px',zIndex: 4, backgroundColor: '#f4f6f8'}}> {val?.shiftName}</td>
                            </tr>
                          ))}
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          </Box>
        </Paper>
      </ReportWithoutDownload>
    </div>
  )
}

export default memo(DoctorsOPDList)
