import React, { memo, useState } from 'react'
import ReportLayout from '../ReportComponent/ReportLayout'
import { Paper } from '@mui/material'
import DoctorsCategory from 'src/views/PayrollDoctors/DoctorRegister/DoctorsCategory'
import { Box, IconButton } from '@mui/joy'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'

const DoctorCategoryReport = () => {
  const [category, setCategory] = useState(0)
  const [tableData, setTableData] = useState([])
  const [openBkDrop, setOpenBkDrop] = useState(false)

  const getData = async () => {
    setOpenBkDrop(true)
    const postdata = {
      category_slno: category,
    }
    const result = await axioslogin.post('/CategoryReport/categorylist', postdata)
    const { success, data } = result.data
    if (success === 1) {
      setTableData(data)
      setOpenBkDrop(false)
    } else {
      warningNofity('No Under This Category!')
      setOpenBkDrop(false)
    }
  }

  const [column] = useState([
    { headerName: 'ID', field: 'em_no' },
    { headerName: 'Name ', field: 'em_name', sortingOrder: ['asc'] },
    { headerName: 'Category ', field: 'ecat_name' },
    { headerName: 'Age ', field: 'em_age_year' },
    { headerName: 'Mobile ', field: 'em_mobile' },
    { headerName: 'Gender', field: 'Gender' },
    { headerName: 'Blood_group ', field: 'group_name' },
    { headerName: 'Dept_Name ', field: 'dept_name' },
    { headerName: 'Dept_Section ', field: 'sect_name' },
    { headerName: 'Branch ', field: 'branch_name' },
    { headerName: 'Emp_Type ', field: 'inst_emp_type' },
    { headerName: 'Designation ', field: 'desg_name' },
    { headerName: 'Date of joining ', field: 'em_doj' },
  ])

  return (
    <ReportLayout title="Doctor Category Report" data={tableData} displayClose={true}>
      <CustomBackDrop open={openBkDrop} text="Please wait !.. Processing Data... " />
      <Paper sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
            flexDirection: 'row',
          }}
        >
          <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
            <DoctorsCategory value={category} setValue={setCategory} />
          </Box>
          <Box sx={{ ml: 1, mt: 0.5 }}>
            <IconButton variant="outlined" size="md" color="primary" onClick={getData}>
              <PublishedWithChangesIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}></Box>
          <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}></Box>
          <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}></Box>
        </Box>
        <Paper
          square
          elevation={0}
          sx={{
            p: 1,
            mt: 0.5,
            display: 'flex',
            backgroundColor: '#f0f3f5',
            flexDirection: 'column',
          }}
        >
          <CustomAgGridRptFormatOne tableDataMain={tableData} columnDefMain={column} />
        </Paper>
      </Paper>
    </ReportLayout>
  )
}

export default memo(DoctorCategoryReport)
