import { Box,  Grid, IconButton, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import EmployeeUderDeptSec from 'src/views/LeaveManagement/NightOff/EmployeeUderDeptSec'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import SaveIcon from '@mui/icons-material/Save'
import { Button, CssVarsProvider } from '@mui/joy'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { ToastContainer } from 'react-toastify'
import { memo } from 'react'
import MasterLayout from '../MasterComponents/MasterLayout'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'

const OtMaster = () => {
  const [dept, setDept] = useState(0)
  const [deptSection, setDeptSection] = useState(0)
  const [employee, setEmployee] = useState(0)
  const [tableData, setTableData] = useState([])
  const [count, setCount] = useState(0)
  const [salarybased, setSalaryBased] = useState(false)
  const [data, setData] = useState({
    emp__ot: '',
    ot_amount: '',
  })
  const { ot_amount } = data
  const updateOtAmount = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setData({ ...data, [e.target.name]: value })
  }
  const patchData = {
    emp__ot: '1',
    ot_amount: ot_amount,
    em_dept_section: deptSection,
  }
  const resetfrm = {
    emp__ot: '',
    ot_amount: '',
  }
  const patchDataEmp = {
    emp__ot: '1',
    ot_amount: ot_amount,
    em_no: employee,
  }

  useEffect(() => {
    const getSalry = async (employee) => {
      const result = await axioslogin.get(`/OtWage/byno/${employee}`)
      const { success, data } = result.data
      if (success === 1) {
        const { gross_salary } = data[0]
        const oneday_salary = gross_salary / 30
        const hrsalary = oneday_salary / 8
        const frmdata = {
          emp__ot: 1,
          ot_amount: hrsalary,
        }
        setData(frmdata)
      }
    }
    if (salarybased === true) {
      getSalry(employee)
    } else {
    }
  }, [employee, salarybased])

  const submitOtWage = async (e) => {
    e.preventDefault()
    if (employee === 0) {
      const result = await axioslogin.patch('/OtWage', patchData)
      const { message, success } = result.data
      if (success === 2) {
        setCount(count + 1)
        succesNofity(message)
        setData(resetfrm)
        setDept(0)
        setDeptSection(0)
        setEmployee(0)
        setSalaryBased(false)
      } else if (success === 0) {
        infoNofity(message.sqlMessage)
      } else {
        infoNofity(message)
      }
    } else {
      const result = await axioslogin.patch('/OtWage/onlyone/update', patchDataEmp)
      const { message, success } = result.data
      if (success === 2) {
        setCount(count + 1)
        succesNofity(message)
        setData(resetfrm)
        setDept(0)
        setDeptSection(0)
        setEmployee(0)
        setSalaryBased(false)
      } else if (success === 0) {
        infoNofity(message.sqlMessage)
      } else {
        infoNofity(message)
      }
    }
  }
  const [columnDef] = useState([
    { headerName: 'Sl No', field: 'no' },
    { headerName: 'Emp Id ', field: 'em_no', filter: true, width: 150 },
    { headerName: 'Employee Name ', field: 'em_name', filter: true, width: 250 },
    { headerName: 'Department ', field: 'dept_name', filter: true, width: 250 },
    { headerName: 'Department Section', field: 'sect_name', filter: true, width: 250 },
    { headerName: 'OT Amount', field: 'ot_amount' },
    {
      headerName: 'Action',
      cellRenderer: (params) => (
        <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)}>
          <EditIcon color="primary" />
        </IconButton>
      ),
    },
  ])
  useEffect(() => {
    const getOtWage = async () => {
      const result = await axioslogin.get('/OtWage')
      const { success, data } = result.data
      if (success === 1) {
        setTableData(data)
        setCount(0)
      } else {
        warningNofity(' Error occured contact EDP')
      }
    }
    getOtWage()
  }, [count])

  const getDataTable = async (params) => {
    const data1 = params.api.getSelectedRows()
    const { em_id } = data1[0]
    const result = await axioslogin.get(`/OtWage/${em_id}`)
    const { success, data } = result.data
    if (success === 1) {
      const { em_id, em_no, em_department, em_dept_section, ot_amount } = data[0]
      const frmdata = {
        emp__ot: em_id,
        ot_amount: ot_amount,
      }
      setDept(em_department === null ? 0 : em_department)
      setDeptSection(em_dept_section === null ? 0 : em_dept_section)
      setEmployee(em_no === null ? 0 : em_no)
      setData(frmdata)
    } else {
      setDept(0)
      setDeptSection(0)
      setEmployee(0)
      setData(resetfrm)
    }
  }
  return (
    <MasterLayout title="Over Time Wage" displayClose={true}>
      <ToastContainer />
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={2}>
            <Paper square elevation={0} sx={{ p: 1 }}>
              <Box sx={{ width: '100%' }}>
                <DeptSelectByRedux setValue={setDept} value={dept} />
              </Box>
              <Box sx={{ width: '100%', pt: 1 }}>
                <DeptSecSelectByRedux dept={dept} setValue={setDeptSection} value={deptSection} />
              </Box>
              <Box sx={{ width: '100%', pt: 1 }}>
                <EmployeeUderDeptSec
                  value={employee}
                  setValue={setEmployee}
                  deptSect={deptSection}
                />
              </Box>
              <Box sx={{ width: '100%', pt: 1 }}>
                <InputComponent
                  placeholder={'Over Time Amount'}
                  type="text"
                  size="sm"
                  name="ot_amount"
                  value={ot_amount}
                  onchange={(e) => updateOtAmount(e)}
                />
              </Box>
              <Box sx={{ p: 1 }}>
                <JoyCheckbox
                  label="Salary Based"
                  checked={salarybased}
                  name="salarybased"
                  onchange={(e) => setSalaryBased(e.target.checked)}
                />
              </Box>
              <Box sx={{ px: 0.5, mt: 0.9 }}>
                <CssVarsProvider>
                  <Button
                    variant="outlined"
                    component="label"
                    size="md"
                    color="primary"
                    onClick={submitOtWage}
                  >
                    <SaveIcon />
                  </Button>
                </CssVarsProvider>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={9} lg={9} xl={9} md={9}>
            <CommonAgGrid
              columnDefs={columnDef}
              tableData={tableData}
              sx={{
                height: 500,
                width: '100%',
              }}
              rowHeight={30}
              headerHeight={30}
            />
          </Grid>
        </Grid>
      </Box>
    </MasterLayout>
  )
}

export default memo(OtMaster)
