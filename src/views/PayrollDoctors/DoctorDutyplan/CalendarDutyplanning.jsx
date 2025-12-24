import React, { lazy, memo, useCallback, useMemo, useState } from 'react'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  format,
  isSameMonth,
} from 'date-fns'
import { Box, Button, Grid, IconButton, Menu, MenuItem, Typography, Input } from '@mui/joy'
import {
  errorNofity,
  infoNofity,
  succesNofity,
  warningNofity,
} from 'src/views/CommonCode/Commonfunc'
import { ListItemText } from '@mui/material'
import { useQuery } from 'react-query'
import {
  getCommonSettingData,
  getDepartmentSectionShift,
  getHolidayListAll,
} from 'src/redux/reduxFun/useQueryFunctions'
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { axioslogin } from 'src/views/Axios/Axios'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import SaveIcon from '@mui/icons-material/Save'
import { getDoctordutyList } from 'src/views/Master/MenuCreationMaster/FuncLis'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'
import DoctorDepartmentSection from './Components/DoctorDepartmentSection'
import SectionBasedDoctors from './Components/SectionBasedDoctors'
import EmployeeRightsDepartment from './Components/EmployeeRightsDepartment'

const ConsultingShift = lazy(() => import('./ConsultingDutyShift'))

const CalendarDutyplanning = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [dept, changeDept] = useState(0)
  const [section, changeSection] = useState(0)
  const [emply, getEmployee] = useState(0)
  const [viewCalendar, setViewCalendar] = useState(0)
  const [dutyAssignments, setDutyAssignments] = useState([])
  const [saveData, setSaveData] = useState([])
  const [openShift, setOpenshift] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedData, setSelectedData] = useState({})
  const [backdropOpen, setBackdropOpen] = useState(false)

  const {
    data: holidayList,
    isLoading: isholidayLoading,
    error: holidayError,
  } = useQuery({
    queryKey: ['allHolidayList'],
    queryFn: getHolidayListAll,
  })

  const {
    data: commonSettingData,
    isLoading: iscommonSettingLoading,
    error: commonSettingError,
  } = useQuery({
    queryKey: ['commongSettingData'],
    queryFn: getCommonSettingData,
  })

  const {
    data: dutyList,
    isLoading: isdoctorDutyLoading,
    error: doctorDutyError,
  } = useQuery({
    queryKey: ['doctorDutyList'],
    queryFn: getDoctordutyList,
  })

  const departmentSectionShift = useMemo(() => {
    return {
      dept_id: dept,
      sect_id: section,
    }
  }, [dept, section])

  const { data: sectionShiftList } = useQuery({
    queryKey: ['getDepartmentShiftList', departmentSectionShift],
    queryFn: () => getDepartmentSectionShift(departmentSectionShift),
    enabled: !!departmentSectionShift,
    staleTime: Infinity,
  })

  // const departmentList=getEmployeeRightsbasedDepartments(em_id)

  const handlePrevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1))
  const handleNextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1))

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const allDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const weeks = allDays.reduce((acc, day, index) => {
    const weekIndex = Math.floor(index / 7)
    acc[weekIndex] = [...(acc[weekIndex] || []), day]
    return acc
  }, [])

  const daysOfWeek = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.']

  const dutyAssignmentMap = useMemo(() => {
    return dutyAssignments.reduce((acc, item) => {
      acc[item.date] = item
      return acc
    }, {})
  }, [dutyAssignments])

  const saveDataMap = useMemo(() => {
    return saveData.reduce((acc, item) => {
      acc[item.duty_day] = item
      return acc
    }, {})
  }, [saveData])

  const onClickDutyPlanButton = useCallback(async () => {
    setBackdropOpen(true)
    if (dept !== 0 && section !== 0 && emply !== 0) {
      const { notapplicable_shift, default_shift } = commonSettingData

      const result = await axioslogin.get(`/DoctorsProcess/getdoctor/${emply}`)
      const { success, data: employeeData } = result.data
      if (success === 1) {
        setSaveData([])
        setDutyAssignments([])
        //checking wheher duty plan is already inserted in these dates
        const postDate = {
          start_date: format(new Date(monthStart), 'yyyy-MM-dd'),
          end_date: format(new Date(monthEnd), 'yyyy-MM-dd'),
          empData: [emply],
        }

        const result = await axioslogin.post('/DoctorsProcess/check', postDate)
        const { success } = result.data
        if (success === 1) {
          /******** If duty plan is already inserted *********/
          const result = await axioslogin.post('/DoctorsProcess/getData', postDate)
          const { success, data } = result.data
          if (success === 1) {
            setSaveData(data)
            setViewCalendar(1)
            setBackdropOpen(false)
          } else {
            setSaveData([])
            setDutyAssignments([])
            setBackdropOpen(false)
            warningNofity('Error While Getting Dutyplan data')
          }
        } else {
          /******** If duty plan not exist *********/
          //finding the dates between start date and end date
          const dateRange = eachDayOfInterval({
            start: new Date(monthStart),
            end: new Date(monthEnd),
          })

          const fullDutyplanDateRange = dateRange?.map((val) => {
            return { date: format(new Date(val), 'yyyy-MM-dd') }
          })

          const fullShiftDutyDay = await employeeData
            ?.map((val) => {
              return fullDutyplanDateRange?.map((value) => {
                return {
                  date: value?.date,
                  emp_id: val?.em_id,
                  doj: val?.em_doj,
                  em_no: val?.em_no,
                  holiday_type: val?.holiday_type,
                }
              })
            })
            .flat(Infinity)

          const fullMonthHolidayList = holidayList
            ?.map((values) => {
              return values?.hld_date >= format(new Date(monthStart), 'yyyy-MM-dd') &&
                values?.hld_date <= format(new Date(monthEnd), 'yyyy-MM-dd')
                ? values
                : null
            })
            .filter((val) => val !== null)

          //add the holiday details into the shift plan array
          const fullholidayFilterFun = (values) => {
            const holiday = fullMonthHolidayList.find((val) => val.hld_date === values.date)
            if (holiday !== undefined) {
              return {
                date: values?.date,
                emp_id: values?.emp_id,
                em_no: values?.em_no,
                shift: values?.date >= values?.doj ? default_shift : notapplicable_shift,
                holidayStatus: values?.holiday_type === 1 && holiday?.special_type === 2 ? 0 : 1,
                holidayName:
                  values?.holiday_type === 1 && holiday?.special_type === 2
                    ? null
                    : holiday?.hld_desc,
                holidaySlno:
                  values?.holiday_type === 1 && holiday?.special_type === 2 ? 0 : holiday?.hld_slno,
                plan_user: employeeIdNumber(),
              }
            } else {
              return {
                date: values?.date,
                emp_id: values?.emp_id,
                em_no: values?.em_no,
                shift: values?.date >= values?.doj ? default_shift : notapplicable_shift,
                holidayStatus: 0,
                holidayName: null,
                holidaySlno: 0,
                plan_user: employeeIdNumber(),
              }
            }
          }

          // after the holiday inserted duty day array
          const insertDutyPlanArray = await fullShiftDutyDay.map(fullholidayFilterFun)

          // duty plan inserting function
          const insertDutyPlainIntDB = await axioslogin.post(
            '/DoctorsProcess/insert',
            insertDutyPlanArray,
          )
          const { success1 } = insertDutyPlainIntDB.data
          if (success1 === 1) {
            const result = await axioslogin.post('/DoctorsProcess/getData', postDate)
            const { success, data } = result.data
            if (success === 1) {
              setSaveData(data)
              setViewCalendar(1)
              setBackdropOpen(false)
            } else {
              setSaveData([])
              setDutyAssignments([])
              setBackdropOpen(false)
              warningNofity('Error While Getting Doctor data')
            }
          } else {
            setSaveData([])
            setDutyAssignments([])
            setBackdropOpen(false)
            warningNofity('Error While Inserting Doctor Dutyplan')
          }
        }
      } else {
        infoNofity("Doctor data doesn't found ")
        setBackdropOpen(false)
        setSaveData([])
        setDutyAssignments([])
      }
    } else {
      warningNofity('Select All Option')
      setViewCalendar(0)
      setBackdropOpen(false)
      setSaveData([])
      setDutyAssignments([])
    }
  }, [dept, section, emply, monthStart, monthEnd, holidayList, commonSettingData])

  const handleBoxClick = (event, date) => {
    event.stopPropagation() // Prevent bubbling to parent click handler

    if (!isSameMonth(date, monthStart)) return
    setAnchorEl(event.currentTarget)
    setSelectedDate(date)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedDate(null)
  }

  const handleDutySelect = (dutySlno) => {
    if (!selectedDate) return
    const formattedDate = format(selectedDate, 'yyyy-MM-dd')
    const obj = {
      formattedDate: formattedDate,
      dutySlno: dutySlno,
    }
    if (sectionShiftList?.length !== 0) {
      setSelectedData(obj)
      setOpenshift(true)
    } else {
      infoNofity('No Shift Added Agaisnt Department')
      setSelectedData({})
      setOpenshift(false)
    }
  }

  const saveAllDuties = useCallback(async () => {
    setBackdropOpen(true)
    const updateData = dutyAssignments
      ?.filter((i) => saveData?.some((j) => i?.date === j?.duty_day))
      ?.map((i) => {
        const match = saveData?.find((j) => i?.date === j?.duty_day)
        return {
          ...i,
          dutyplan_slno: match?.dutyplan_slno,
          plan_update_user: employeeIdNumber(),
        }
      })
    const result = await axioslogin.patch('/DoctorsProcess/update/calendarduty', updateData)
    const { success } = result.data
    if (success === 1) {
      succesNofity('Dutyplan Inserted Successfully')
      setBackdropOpen(false)
    } else {
      errorNofity('Error While Inserting Dutyplan')
      setBackdropOpen(false)
    }
  }, [dutyAssignments, saveData])

  if (iscommonSettingLoading || isholidayLoading || isdoctorDutyLoading) return <p>Loading...</p>
  if (commonSettingError || holidayError || doctorDutyError) return <p>Error occurred.</p>

  return (
    <>
      <ConsultingShift
        open={openShift}
        setOpen={setOpenshift}
        sectionShiftList={sectionShiftList}
        commonSettingData={commonSettingData}
        setDutyAssignments={setDutyAssignments}
        selectedData={selectedData}
      />
      <CustomBackDrop open={backdropOpen} text="Please Wait" />
      <Box sx={{ p: 2, flexGrow: 1, zIndex: 99 }} onClick={() => handleClose()}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1, px: 0.5, width: '20%' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={['year', 'month']}
                minDate={subMonths(new Date(), 1)}
                maxDate={addMonths(new Date(), 1)}
                value={currentMonth}
                size="small"
                onChange={(newValue) => {
                  setCurrentMonth(newValue)
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
            <EmployeeRightsDepartment value={dept} setValue={changeDept}/>
          </Box>
          <Box sx={{ flex: 1, px: 0.5 }}>
            <DoctorDepartmentSection value={section} setValue={changeSection} dept={dept} />
          </Box>
          <Box sx={{ flex: 1, px: 0.5 }}>
            <SectionBasedDoctors value={emply} setValue={getEmployee} sect={section} />
          </Box>
          <Box sx={{ px: 0.5 }}>
            <Button
              aria-label="Like"
              variant="outlined"
              color="primary"
              size="sm"
              onClick={onClickDutyPlanButton}
              fullWidth
              startDecorator={<HourglassEmptyOutlinedIcon />}
              sx={{ mx: 0.5 }}
            >
              Process
            </Button>
          </Box>
          <Box sx={{ px: 0.5 }}>
            <Button
              aria-label="Like"
              variant="outlined"
              color="success"
              size="sm"
              onClick={saveAllDuties}
              fullWidth
              startDecorator={<SaveIcon />}
              sx={{ mx: 0.5 }}
            >
              Save
            </Button>
          </Box>
        </Box>

        {viewCalendar === 1 ? (
          <Box
            border="1px solid #ccc"
            //borderRadius="8px"
            overflow="hidden"
            mt={2}
            sx={{ p: 2 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 2,
              }}
            >
              {/* Left: Month Selector */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handlePrevMonth}>
                  <ArrowBackIos fontSize="small" />
                </IconButton>
                <Typography variant="subtitle1" sx={{ mx: 1, fontWeight: 'bold' }}>
                  {format(currentMonth, 'MMMM-yyyy').toUpperCase()}
                </Typography>
                <IconButton onClick={handleNextMonth}>
                  <ArrowForwardIos fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Weekdays Header */}
            <Grid container spacing={1}>
              {daysOfWeek?.map((day, index) => (
                <Grid xs={12 / 7} key={index}>
                  <Typography align="center" fontWeight="bold">
                    {day}
                  </Typography>
                </Grid>
              ))}
            </Grid>

            {/* Calendar Grid */}

            {weeks?.map((week, weekIndex) => (
              <Grid container spacing={1} key={weekIndex} sx={{ mt: 0.5 }}>
                {week?.map((date, dayIndex) => {
                  const formattedDate = format(date, 'yyyy-MM-dd')

                  const assignment = dutyAssignmentMap[formattedDate]
                  const saved = saveDataMap[formattedDate]

                  // Priority: dutyAssignments > saveData
                  const dutySlno = assignment?.dutySlno ?? saved?.doctor_dutyslno ?? null

                  const shiftName = assignment?.shiftName ?? saved?.shiftName ?? null

                  const dutyLabel =
                    dutySlno === 0
                      ? 'NIL'
                      : dutyList?.find((opt) => opt?.dutyslno === dutySlno)?.duty_name

                  const holidayName = saved?.holiday === 1 ? saved?.holiday_name : null

                  return (
                    <Grid xs={12 / 7} key={dayIndex}>
                      <Box
                        onClick={(event) => handleBoxClick(event, date)}
                        sx={{
                          position: 'relative', // <-- required for absolute positioning inside
                          borderRadius: 5,
                          cursor: isSameMonth(date, monthStart) ? 'pointer' : null,
                          boxShadow:
                            '0px 4px 6px rgba(201, 201, 201, 0.2), 0px 6px 20px rgba(215, 215, 215, 0.19)',
                          height: 80,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          p: 1,
                          fontSize: '0.9rem',
                          bgcolor: '#ede7f6',
                          zIndex: 999,
                        }}
                      >
                        {/* Date number */}
                        <Typography
                          fontSize="0.8rem"
                          sx={{
                            position: 'absolute',
                            top: 4,
                            left: 6,
                            color: isSameMonth(date, monthStart) ? 'text.primary' : 'lightgray',
                          }}
                        >
                          {format(date, 'd')}
                        </Typography>
                        {/* Duty Name */}
                        {dutyLabel && (
                          <Typography
                            fontSize="0.8rem"
                            sx={{
                              position: 'absolute',

                              top: '40%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              color: '#673ab7',
                            }}
                          >
                            {dutyLabel}
                          </Typography>
                        )}
                        {/* Duty Name */}
                        {shiftName && (
                          <Typography
                            fontSize="0.8rem"
                            sx={{
                              position: 'absolute',
                              top: '60%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              color: '#673ab7',
                            }}
                          >
                            {shiftName}
                          </Typography>
                        )}
                        {/* Holiday Name */}
                        {holidayName && (
                          <Typography
                            fontSize="0.6rem"
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 6,
                              color: 'red',
                              fontWeight: 600,
                              textAlign: 'right',
                              maxWidth: '60%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                            title={holidayName}
                          >
                            {holidayName}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            ))}

            {/* Menu on Click */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ width: 300, bgcolor: 'lightgray' }}
            >
              {dutyList?.map((duty, index) => (
                <MenuItem key={index} onClick={() => handleDutySelect(duty?.dutyslno)}>
                  <ListItemText primary={duty?.duty_name} />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ) : null}
      </Box>
    </>
  )
}

export default memo(CalendarDutyplanning)
