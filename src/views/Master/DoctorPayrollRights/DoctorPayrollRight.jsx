import React, { memo, useState } from 'react'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, Grid, IconButton } from '@mui/joy'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import AllEmployeeAutocomplete from 'src/views/MuiComponents/AllEmployeeAutocomplete'
import DoctorDepartmentMultiSelect from 'src/views/PayrollDoctors/DoctorDutyplan/Components/DoctorDepartmentMultiSelect'
import SaveIcon from '@mui/icons-material/Save'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { getemployeeRightsList } from '../MenuCreationMaster/FuncLis'
import { useQuery, useQueryClient } from 'react-query'
import EditIcon from '@mui/icons-material/Edit'
import DoctorDepartment from 'src/views/PayrollDoctors/DoctorDutyplan/Components/DoctorDepartment'

const DoctorPayrollRight = () => {
  const queryClient = useQueryClient()
  const [selectEmployee, setSelectEmployee] = useState(0)
  const [selectedDept, setSelectedDept] = useState([])
  const [rightStatus, setrightStatus] = useState(false)
  const [update, setUpdate] = useState(0)
  const [updateDept, setUpdateDept] = useState(0)
  const [slno, setSlno] = useState(0)

  const { data: rightList } = useQuery({
    queryKey: ['employeeRightList'],
    queryFn: getemployeeRightsList,
  })

  const [columnDef] = useState([
    { headerName: 'Sl No', field: 'right_slno' },
    { headerName: 'Emp No', field: 'em_no', filter: true, width: 150 },
    { headerName: 'Name', field: 'em_name', filter: true, width: 150 },
    { headerName: 'Department', field: 'dept_name', filter: true, width: 150 },
    { headerName: 'Status ', field: 'showStatus', width: 100 },
    {
      headerName: 'Edit',
      cellRenderer: (params) => (
        <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)}>
          <EditIcon color="primary" />
        </IconButton>
      ),
    },
  ])

  const getEdit = async (params) => {
    setUpdate(1)
    const { department, em_id, right_slno, right_status } = params.data
    setSelectEmployee(em_id)
    setUpdateDept(department)
    setrightStatus(right_status === 1 ? true : false)
    setSlno(right_slno)
  }

  const SubmitFormData = async () => {
    const insertArray = selectedDept?.map((k) => {
      return {
        em_id: selectEmployee,
        department: k,
        right_status: rightStatus === true ? 1 : 0,
      }
    })
    if (update === 1) {
      const updateData = {
        em_id: selectEmployee,
        department: updateDept,
        right_status: rightStatus === true ? 1 : 0,
        right_slno: slno,
      }
      const result = await axioslogin.patch('/DoctorsProcess/update/rights', updateData)
      const { success, message } = result.data
      if (success === 2) {
        succesNofity(message)
        setSelectEmployee(0)
        setUpdate(0)
        setUpdateDept(0)
        setrightStatus(false)
        queryClient.invalidateQueries('employeeRightList')
      } else {
        warningNofity(message)
        setSelectEmployee(0)
        setSelectedDept([])
        setrightStatus(false)
      }
    } else {
      const result = await axioslogin.post('/DoctorsProcess/insert/rights', insertArray)
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        setSelectEmployee(0)
        setSelectedDept([])
        setrightStatus(false)
        queryClient.invalidateQueries('employeeRightList')
      } else {
        warningNofity(message)
        setSelectEmployee(0)
        setSelectedDept([])
        setrightStatus(false)
      }
    }
  }

  return (
    <MasterLayout title="Employee to DoctorRights" displayClose={true}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid xl={3} lg={2}>
            <Box sx={{ width: '100%', px: 1, mt: 0.5 }}>
              <AllEmployeeAutocomplete value={selectEmployee} setValue={setSelectEmployee} />
            </Box>
            <Box sx={{ width: '100%', px: 1, mt: 0.5 }}>
              {update === 1 ? (
                <DoctorDepartment value={updateDept} setValue={setUpdateDept} />
              ) : (
                <DoctorDepartmentMultiSelect value={selectedDept} setValue={setSelectedDept} />
              )}
            </Box>
            <Box sx={{ width: '100%', px: 1, mt: 0.5 }}>
              <JoyCheckbox
                label="Status"
                checked={rightStatus}
                name="rightStatus"
                onchange={(e) => setrightStatus(e.target.checked)}
              />
            </Box>
            <Box sx={{ px: 0.5, mt: 0.9 }}>
              <Button
                variant="outlined"
                component="label"
                size="md"
                color="primary"
                onClick={SubmitFormData}
              >
                <SaveIcon />
              </Button>
            </Box>
          </Grid>
          <Grid xs={9} lg={9} xl={9} md={9}>
            <CommonAgGrid
              columnDefs={columnDef}
              tableData={rightList}
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

export default memo(DoctorPayrollRight)

