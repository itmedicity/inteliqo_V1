import { Box, Button, CssVarsProvider, Input } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DoctorDepartment from '../DoctorDutyplan/Components/DoctorDepartment'
import DoctorDepartmentSection from '../DoctorDutyplan/Components/DoctorDepartmentSection'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from 'date-fns'
import Preview from './Preview'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'

const DoctorPunchReport = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const [dept, changeDept] = useState(0)
  const [section, changeSection] = useState(0)
  const [tableArray, settableArray] = useState([])
  const [openBkDrop, setOpenBkDrop] = useState(false)

  const punchViewFunction = useCallback(async () => {
    setOpenBkDrop(true)
    const getEmpData = {
      dept_id: dept,
      sect_id: section,
    }
    const result1 = await axioslogin.post('/empmast/doctors/bysection', getEmpData)
    const { success, data: employeeData } = result1.data
    if (success === 1) {
      const arr = employeeData?.map((val) => val.em_no)

      const postdata = {
        em_no: arr,
        from: format(startOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'),
        to: format(endOfMonth(new Date(selectedMonth)), 'yyyy-MM-dd'),
      }
      const result = await axioslogin.post('/DoctorsProcess/punchmastdata', postdata)
      const { success, data: punchMasteData } = result.data

      if (success === 1) {
        const dateRange = eachDayOfInterval({
          start: new Date(startOfMonth(new Date(selectedMonth))),
          end: new Date(endOfMonth(new Date(selectedMonth))),
        })?.map((e) => format(new Date(e), 'yyyy-MM-dd'))

        const resultss = [...new Set(punchMasteData?.map((e) => e?.em_no))]?.map((el) => {
          const empArray = punchMasteData?.filter((e) => e?.em_no === el)
          let emName = empArray?.find((e) => e?.em_no === el)?.em_name
          let emNo = empArray?.find((e) => e?.em_no === el)?.em_no
          let emId = empArray?.find((e) => e?.em_no === el)?.emp_id

          return {
            em_no: el,
            emName: emName,
            punchMaster: dateRange?.map((e) => {
              return {
                attDate: e,
                duty_date: empArray?.find((em) => em?.duty_day === e)?.duty_date ?? e,
                duty_status: empArray?.find((em) => em?.duty_day === e)?.duty_status ?? 0,
                em_name: empArray?.find((em) => em?.duty_day === e)?.em_name ?? emName,
                em_no: empArray?.find((em) => em?.duty_day === e)?.em_no ?? emNo,
                emp_id: empArray?.find((em) => em?.duty_day === e)?.emp_id ?? emId,
                duty_desc: empArray?.find((em) => em?.duty_day === e)?.duty_desc ?? 'A',
                nmc_punchin: empArray?.find((em) => em?.duty_day === e)?.nmc_punchin ?? null,
                nmc_punchout: empArray?.find((em) => em?.duty_day === e)?.nmc_punchout ?? null,
                punch_in: empArray?.find((em) => em?.duty_day === e)?.punch_in ?? null,
                punch_out: empArray?.find((em) => em?.duty_day === e)?.punch_out ?? null,
                nmc_punch_status:
                  empArray?.find((em) => em?.duty_day === e)?.nmc_punch_status ?? 'A',
              }
            }),
            totalDays: dateRange?.length,
            totalP: empArray?.filter((el) => el?.duty_desc === 'P').length ?? 0,
            totalNMCP: empArray?.filter((el) => el?.nmc_punch_status === 'P').length ?? 0,
          }
        })
        settableArray(resultss)
        setOpenBkDrop(false)
      } else {
        infoNofity('No Punch Details')
        setOpenBkDrop(false)
      }
    } else {
      warningNofity('Error While Getting Employees')
      setOpenBkDrop(false)
    }
  }, [dept, section, selectedMonth])

  return (
    <CustomLayout title="Doctors Punch Report" displayClose={true}>
      <CustomBackDrop open={openBkDrop} text="Please wait !. " />
      <Box
        sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}
      >
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Box sx={{ flex: 1, px: 0.5 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['year', 'month']}
                value={selectedMonth}
                onChange={(newValue) => {
                  setSelectedMonth(newValue)
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
          <Box sx={{ flex: 1, px: 0.5 }}>
            <DoctorDepartment value={dept} setValue={changeDept} />
          </Box>
          <Box sx={{ flex: 1, px: 0.5 }}>
            <DoctorDepartmentSection value={section} setValue={changeSection} dept={dept} />
          </Box>
          <Box sx={{ mr: 1 }}>
            <Button
              aria-label="Like"
              variant="outlined"
              color="primary"
              size="sm"
              onClick={punchViewFunction}
              fullWidth
              startDecorator={<HourglassEmptyOutlinedIcon />}
              sx={{ mx: 0.5 }}
            >
              Process & View
            </Button>
          </Box>
        </Box>
        <CssVarsProvider>
          <Box p={1}>
            {tableArray?.length === 0 ? (
              <Box
                sx={{
                  flex: 1,
                  fontWeight: 700,
                  fontSize: 25,
                  pt: 20,
                  display: 'flex',
                  justifyContent: 'center', // horizontal centering
                  alignItems: 'center', // vertical centering
                  color: 'lightgray',
                }}
              >
                No Employee Data Available
              </Box>
            ) : (
              <Preview empData={tableArray} />
            )}
          </Box>
        </CssVarsProvider>
      </Box>
    </CustomLayout>
  )
}

export default memo(DoctorPunchReport)
