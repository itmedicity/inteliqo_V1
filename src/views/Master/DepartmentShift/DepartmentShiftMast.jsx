import React, { memo, Suspense, useEffect } from 'react'
import { useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import {
  errorNofity,
  succesNofity,
  infoNofity,
  warningNofity,
} from 'src/views/CommonCode/Commonfunc'
import ShiftSelect from 'src/views/CommonCode/ShiftSelect'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, Table, Tooltip } from '@mui/joy'
import {
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import { useCallback } from 'react'
import JoyDepartmentSection from 'src/views/MuiComponents/JoyComponent/JoyDepartmentSection'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import DeleteIcon from '@mui/icons-material/Delete'
import { setDepartment } from 'src/redux/actions/Department.action'

const DepartmentShiftMast = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setDepartment())
    dispatch(setCommonSetting())
  }, [dispatch])
  const [arraydata, arraydataset] = useState([])
  const [count, setCount] = useState(0)
  const [tableData, setTableData] = useState([])
  const [flag, setFlag] = useState(0)
  const [slno, setSlno] = useState(0)
  const [dept, setDept] = useState(0)
  const [deptSect, setDeptSect] = useState(0)
  const [shift, setShift] = useState(0)
  const [shiftName, setShiftName] = useState('')

  const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
  const { notapplicable_shift, default_shift, week_off_day } = state

  //adding shifts to table
  const getShiftData = useCallback(() => {
    if (notapplicable_shift === null && default_shift === null && week_off_day === null) {
      warningNofity('Please Add Default Shift and Not Applicable in common setting')
    } else {
      if (shift === default_shift) {
        warningNofity('Default Already Exist!!')
      } else if (shift === 0) {
        warningNofity('Please Select a shift!!')
      } else if (shift === notapplicable_shift) {
        warningNofity('NA Already Exist!!')
      } else if (shift === week_off_day) {
        warningNofity('Week Off Already Exist')
      } else if (arraydata.some((key) => key.shiftcode === shift)) {
        warningNofity('Shift Time Already Added!!')
      } else {
        const newdata = {
          id: Math.ceil(Math.random() * 1000),
          shiftcode: shift,
          shiftDescription: shiftName,
        }
        const newdatas = [...arraydata, newdata]
        arraydataset(newdatas)
      }
    }
  }, [shift, notapplicable_shift, default_shift, week_off_day, arraydata, shiftName])

  //removing shift from table
  const onClickdelete = useCallback(
    (checkid) => {
      const newdata = [...arraydata]
      const index = arraydata.findIndex((arraid) => arraid.id === checkid)
      newdata.splice(index, 1)
      arraydataset(newdata)
    },
    [arraydata],
  )

  //saving department shift master
  const submitFormData = useCallback(
    async (e) => {
      e.preventDefault()
      const defautdata = {
        id: Math.ceil(Math.random() * 1000),
        shiftcode: default_shift,
        shiftDescription: 'default',
      }
      const noappdata = {
        id: Math.ceil(Math.random() * 1000),
        shiftcode: notapplicable_shift,
        shiftDescription: 'NA',
      }
      const weekoffdata = {
        id: Math.ceil(Math.random() * 1000),
        shiftcode: week_off_day,
        shiftDescription: 'WOFF',
      }
      const newdatas = [...arraydata, defautdata, noappdata, weekoffdata]

      const postData = {
        dept_id: dept,
        sect_id: deptSect,
        shft_code: newdatas,
        updated_user: employeeIdNumber(),
      }
      const patchdata = {
        dept_id: dept,
        sect_id: deptSect,
        shft_code: newdatas,
        updated_user: employeeIdNumber(),
        dept_shift_Slno: slno,
      }

      if (flag === 1) {
        const result = await axioslogin.patch('/departmentshift', patchdata)
        const { success, message } = result.data
        if (success === 2) {
          succesNofity(message)
          setCount(count + 1)
          setDept(0)
          setDeptSect(0)
          setShift(0)
          arraydataset([])
          setFlag(0)
          setSlno(0)
        } else {
          errorNofity(message)
        }
      } else {
        const result = await axioslogin.post('/departmentshift', postData)
        const { success, message } = result.data
        if (success === 1) {
          succesNofity(message)
          setCount(count + 1)
          setDept(0)
          setDeptSect(0)
          setShift(0)
          arraydataset([])
        } else if (success === 0) {
          infoNofity('Department Already Mapped, Please Edit!! ')
          setDept(0)
          setDeptSect(0)
          setShift(0)
          arraydataset([])
        } else {
          errorNofity(message)
        }
      }
    },
    [
      notapplicable_shift,
      default_shift,
      week_off_day,
      arraydata,
      count,
      dept,
      deptSect,
      slno,
      flag,
    ],
  )

  useEffect(() => {
    //get table Data
    const getTableData = async () => {
      const results = await axioslogin.get('/departmentshift/select')
      const { success, data } = results.data
      if (success === 1) {
        setTableData(data)
        setCount(0)
      } else {
        setTableData([])
      }
    }
    getTableData()
  }, [count])

  const [columnDef] = useState([
    { headerName: 'Sl No', field: 'dept_shift_Slno' },
    { headerName: 'Department', field: 'dept_name', filter: true, width: 150 },
    { headerName: 'Department Section', field: 'sect_name', filter: true, width: 150 },
    {
      headerName: 'Edit',
      cellRenderer: (params) => (
        <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)}>
          <EditIcon color="primary" />
        </IconButton>
      ),
    },
  ])

  const getEdit = useCallback(
    (params) => {
      setFlag(1)
      const { dept_id, sect_id, shft_code, dept_shift_Slno } = params.data
      setDept(dept_id)
      setDeptSect(sect_id)
      setSlno(dept_shift_Slno)
      const obj = JSON.parse(shft_code)
      setShift(0)
      setShiftName('')
      arraydataset(
        obj.filter(
          (val) =>
            val.shiftcode !== notapplicable_shift &&
            val.shiftcode !== default_shift &&
            val.shiftcode !== week_off_day,
        ),
      )
    },
    [default_shift, notapplicable_shift, week_off_day],
  )

  return (
    <MasterLayout title={'Department Shift Master'} displayClose={true}>
      <Box sx={{ width: '100%' }}>
        <Paper variant="outlined" square sx={{ width: '100%', display: 'flex', py: 2, px: 0.5 }}>
          <Box
            sx={{
              width: '100%',
              px: 1,
              mt: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <JoyDepartment deptValue={dept} getDept={setDept} />
            </Box>
            <Box sx={{ flex: 1, mt: 0.5 }}>
              <JoyDepartmentSection sectValues={deptSect} getSection={setDeptSect} />
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', mt: 0.5 }}>
              <Box sx={{ flex: 1, pr: 0.3 }}>
                <ShiftSelect value={shift} setValue={setShift} setShiftName={setShiftName} />
              </Box>
              <Tooltip title="Add" followCursor placement="top" arrow>
                <Button
                  aria-label="Like"
                  variant="outlined"
                  color="primary"
                  onClick={getShiftData}
                  sx={{
                    color: '#90caf9',
                  }}
                >
                  <AddCircleOutlineIcon />
                </Button>
              </Tooltip>
            </Box>
            <Box sx={{ px: 0.5, mt: 0.9 }}>
              <Tooltip title="Save" followCursor placement="top" arrow>
                <Button
                  variant="outlined"
                  component="label"
                  size="md"
                  color="primary"
                  onClick={submitFormData}
                >
                  <SaveIcon />
                </Button>
              </Tooltip>
            </Box>
            <Box sx={{ flex: 1, mt: 0.5 }}></Box>
            <Box sx={{ flex: 1, mt: 0.5 }}></Box>
            <Box sx={{ flex: 1, mt: 0.5 }}></Box>
          </Box>
          <Box sx={{ width: '100%', px: 1, mt: 0.5, display: 'flex', flexDirection: 'row' }}>
            <TableContainer sx={{}}>
              <Table
                size="small"
                stickyHeader
                aria-label="sticky table"
                sx={{ border: '1px solid #e0e0e0' }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      size="medium"
                      padding="none"
                      align="center"
                      rowSpan={2}
                      sx={{ fontWeight: 550 }}
                    >
                      {' '}
                      Shift Code{' '}
                    </TableCell>
                    <TableCell
                      size="medium"
                      padding="none"
                      align="center"
                      rowSpan={2}
                      sx={{ fontWeight: 550 }}
                    >
                      Shift Description
                    </TableCell>
                    <TableCell
                      size="medium"
                      padding="none"
                      align="right"
                      rowSpan={2}
                      sx={{ fontWeight: 550 }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Suspense>
                    {arraydata?.map((val, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="center">{val.shiftcode}</TableCell>
                          <TableCell align="center">{val.shiftDescription}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              aria-label="add"
                              style={{ padding: '0rem' }}
                              onClick={(e) => onClickdelete(val.id)}
                            >
                              <DeleteIcon color="success" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </Suspense>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
        <Paper
          square
          elevation={0}
          sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: 'column' }}
        >
          <CommonAgGrid
            columnDefs={columnDef}
            tableData={tableData}
            sx={{
              height: 400,
              width: '100%',
            }}
            rowHeight={30}
            headerHeight={30}
          />
        </Paper>
      </Box>
    </MasterLayout>
  )
}

export default memo(DepartmentShiftMast)
