import React, { memo, useState,lazy } from 'react'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import ReportWithoutDownload from '../ReportComponent/ReportWithoutDownload'
import { Paper } from '@mui/material'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { Box, IconButton, Tooltip, Typography } from '@mui/joy'
import { pdfdownlod } from '../Employee Punch Report/PunchReport'
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import DoctorDepartmentSection from 'src/views/PayrollDoctors/DoctorDutyplan/Components/DoctorDepartmentSection'
import DoctorDepartment from 'src/views/PayrollDoctors/DoctorDutyplan/Components/DoctorDepartment'

const PunchTable = lazy(() => import('../Employee Punch Report/PunchTable'))

const DoctorPunchReport = () => {
  const [dept, setDept] = useState(0)
  const [tableData, setTableData] = useState([])
  const [Empno, setEmpNo] = useState(0)
  const [fromdate, Setfromdate] = useState(new Date())
  const [todate, Settodate] = useState(new Date())
  const [drop, setDropOpen] = useState(false)
  const [deptSect, setDepartSection] = useState(0)

  const getData = async () => {}

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
      <ReportWithoutDownload title="Doctor Punch Report" displayClose={true}>
        <Paper sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Box
            sx={{
              mt: 1,
              ml: 0.5,
              display: 'flex',
              flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
              flexDirection: 'row',
            }}
          >
            <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
             <DoctorDepartment value={dept} setValue={setDept} />
              {/* <JoyDepartment deptValue={dept} getDept={setDept} /> */}
            </Box>
            <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
              <DoctorDepartmentSection
                            value={deptSect}
                            setValue={setDepartSection}
                            dept={dept}
                          />
              {/* <JoyDepartmentSection sectValues={deptSect} getSection={setDepartSection} dept={dept} /> */}
            </Box>
            <Tooltip title="Employee Number" followCursor placement="top" arrow>
              <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                <InputComponent
                  type="number"
                  size="sm"
                  placeholder="Employee Number"
                  name="Empno"
                  value={Empno}
                  onchange={(e) => setEmpNo(e.target.value)}
                />
              </Box>
            </Tooltip>
            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, display: 'flex', flexDirection: 'row' }}>
              <Typography sx={{ p: 1 }}>From:</Typography>
              <InputComponent
                type="date"
                size="sm"
                placeholder="From Date"
                name="Fromdate"
                value={fromdate}
                onchange={(e) => Setfromdate(e.target.value)}
              />
            </Box>
            <Box sx={{ flex: 1, mt: 0.5, px: 0.3, display: 'flex', flexDirection: 'row' }}>
              <Typography sx={{ p: 1 }}>To:</Typography>
              <InputComponent
                type="date"
                size="sm"
                placeholder="ToDate"
                name="Todate"
                value={todate}
                onchange={(e) => Settodate(e.target.value)}
              />
            </Box>
            <Box sx={{ ml: 1 }}>
              <IconButton variant="outlined" size="lg" color="primary" onClick={getData}>
                <PublishedWithChangesIcon />
              </IconButton>
            </Box>
            <Box sx={{ ml: 1 }}>
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
      </ReportWithoutDownload>
    </>
  )
}

export default memo(DoctorPunchReport)
