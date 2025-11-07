import { Paper } from '@mui/material'
import React, { memo, useState } from 'react'
import CustomAgGridRptFormatOne from 'src/views/Component/CustomAgGridRptFormatOne'
import DashboardLayout from './DashboardLayout'

const DashboardReport = ({ view, data,setView }) => {
  const [columnDef] = useState([
    { headerName: 'Emp No', field: 'em_no' },
    { headerName: 'Name ', field: 'em_name' },
    { headerName: 'Date Of Birth ', field: 'em_dob' },
    { headerName: 'Gender ', field: 'em_gender' },
    { headerName: 'Date Of Joining ', field: 'em_doj' },
    { headerName: 'Mobile No ', field: 'em_mobile' },
    { headerName: 'Mail ID', field: 'em_email' },
    { headerName: 'Branch ', field: 'branch_name' },
    { headerName: 'Dept Name ', field: 'dept_name' },
    { headerName: 'Dept Section ', field: 'sect_name' },
    { headerName: 'Institution Type ', field: 'inst_emp_type' },
    { headerName: 'Designation ', field: 'desg_name' },
    { headerName: 'Category ', field: 'ecat_name' },
    { headerName: 'Adhaar Number', field: 'em_adhar_no' },
    { headerName: 'Account Number', field: 'em_account_no' },
    { headerName: 'Passport Number', field: 'em_passport_no' },
    { headerName: 'PAN Number', field: 'em_pan_no' },
    { headerName: 'ESI Number', field: 'em_esi_no' },
    { headerName: 'PF Number', field: 'em_pf_no', minWidth: 200 },
    { headerName: 'LWF Number', field: 'lwfnumber' },
    { headerName: 'Retirement Date ', field: 'em_retirement_date' },
    { headerName: 'Address1 ', field: 'addressPresent1', minWidth: 200 },
    { headerName: 'Address2 ', field: 'addressPresent2', minWidth: 200 },
    { headerName: 'Pin', field: 'hrm_pin2' },
    { headerName: 'Gross Salary', field: 'gross_salary' },
  ])

  const [punchcolumnDef] = useState([
    { headerName: 'Emp No', field: 'em_no' },
    { headerName: 'Name ', field: 'em_name' },
    { headerName: 'Branch ', field: 'branch_name' },
    { headerName: 'Dept Name ', field: 'dept_name' },
    { headerName: 'Dept Section ', field: 'sect_name' },
    { headerName: 'Designation ', field: 'desg_name' },
    { headerName: 'NMC Reg. No ', field: 'nmc_regno' },
  ])

  return (
    <DashboardLayout
      title={
        view === 1
          ? 'Doctors List'
          : view === 2
          ? 'Accdemic Doctors List'
          : view === 3
          ? 'Clinical Doctors List'
          : view === 4
          ? 'today Present Doctors List'
          : view === 5
          ? 'TMC Punched Doctors List'
          : view === 6
          ? 'NMC Punched Doctors List'
          : 'NIL'
      }
      displayClose={true}
      setView={setView}
      data={data}
    >
      <Paper
        square
        elevation={0}
        sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <CustomAgGridRptFormatOne
          tableDataMain={data}
          columnDefMain={
            view === 1
              ? columnDef
              : view === 2
              ? columnDef
              : view === 3
              ? columnDef
              : view === 4
              ? punchcolumnDef
              : view === 5
              ? punchcolumnDef
              : view === 6
              ? punchcolumnDef
              : []
          }
        />
      </Paper>
    </DashboardLayout>
  )
}

export default memo(DashboardReport)
