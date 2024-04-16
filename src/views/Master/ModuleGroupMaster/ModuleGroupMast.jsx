import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Grid, IconButton } from '@mui/material'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'

const ModuleGroupMast = () => {
  const [count, setCount] = useState(0)
  const [slno, setSlno] = useState(0)
  const [tableData, setTableData] = useState([])
  const [flag, setFlag] = useState(0)
  const [formData, setFormData] = useState({
    module_group_name: '',
    module_recruitment: false,
    module_emprecord: false,
    module_attenmangemnt: false,
    module_leavemangment: false,
    module_payroll: false,
    module_performanceApp: false,
    module_trainAndDevolp: false,
    module_resignation: false,
    module_dashboard: false,
    module_reports: false,
    module_vaccination: false,
    module_contractRenew: false
  })

  // destructuring the form element vlaues
  const {
    module_group_name,
    module_recruitment,
    module_emprecord,
    module_attenmangemnt,
    module_leavemangment,
    module_payroll,
    module_performanceApp,
    module_trainAndDevolp,
    module_resignation,
    module_dashboard,
    module_reports,
    module_vaccination,
    module_contractRenew
  } = formData

  // Get the value from the element to variables
  const getModuleGroupFormData = useCallback((e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }, [formData])

  // COnvert Data For Submitting false to 1 and 0
  const postData = useMemo(() => {
    return {
      module_group_name,
      module_slno: {
        module_home: 1,
        module_recruitment: module_recruitment === true ? 2 : 0,
        module_emprecord: module_emprecord === true ? 3 : 0,
        module_attenmangemnt: module_attenmangemnt === true ? 4 : 0,
        module_leavemangment: module_leavemangment === true ? 5 : 0,
        module_payroll: module_payroll === true ? 6 : 0,
        module_performanceApp: module_performanceApp === true ? 7 : 0,
        module_trainAndDevolp: module_trainAndDevolp === true ? 8 : 0,
        module_resignation: module_resignation === true ? 9 : 0,
        module_dashboard: module_dashboard === true ? 11 : 0,
        module_reports: module_reports === true ? 12 : 0,
        module_vaccination: module_vaccination === true ? 13 : 0,
        module_contractRenew: module_contractRenew === true ? 14 : 0
      },
    }
  }, [module_group_name, module_recruitment, module_emprecord, module_attenmangemnt, module_leavemangment,
    module_payroll, module_performanceApp, module_trainAndDevolp, module_resignation,
    module_dashboard, module_reports, module_vaccination, module_contractRenew])

  const postEditData = useMemo(() => {
    return {
      module_group_name,
      module_slno: {
        module_home: 1,
        module_recruitment: module_recruitment === true ? 2 : 0,
        module_emprecord: module_emprecord === true ? 3 : 0,
        module_attenmangemnt: module_attenmangemnt === true ? 4 : 0,
        module_leavemangment: module_leavemangment === true ? 5 : 0,
        module_payroll: module_payroll === true ? 6 : 0,
        module_performanceApp: module_performanceApp === true ? 7 : 0,
        module_trainAndDevolp: module_trainAndDevolp === true ? 8 : 0,
        module_resignation: module_resignation === true ? 9 : 0,
        module_dashboard: module_dashboard === true ? 11 : 0,
        module_reports: module_reports === true ? 12 : 0,
        module_vaccination: module_vaccination === true ? 13 : 0,
        module_contractRenew: module_contractRenew === true ? 14 : 0
      },
      mdgrp_slno: slno,
    }
  }, [module_group_name, module_recruitment, module_emprecord, module_attenmangemnt, module_leavemangment,
    module_payroll, module_performanceApp, module_trainAndDevolp, module_resignation, slno,
    module_dashboard, module_reports, module_vaccination, module_contractRenew])

  const resetForm = useMemo(() => {
    return {
      module_group_name: '',
      module_recruitment: false,
      module_emprecord: false,
      module_attenmangemnt: false,
      module_leavemangment: false,
      module_payroll: false,
      module_performanceApp: false,
      module_trainAndDevolp: false,
      module_resignation: false,
      module_dashboard: false,
      module_reports: false,
      module_vaccination: false,
      module_contractRenew: false
    }
  }, [])

  const submitModuleGroupMast = useCallback(async (e) => {
    e.preventDefault()
    if (flag === 1) {
      const result = await axioslogin.patch('/modulegroup', postEditData)
      const { success, message } = result.data
      if (success === 2) {
        succesNofity(message)
        setFlag(1)
        setCount(count + 1)
        setSlno(1)
        setFormData(resetForm)
      } else {
        infoNofity(message)
      }
    } else {
      const result = await axioslogin.post('/modulegroup', postData)
      const { success, message } = result.data
      if (success === 1) {
        succesNofity(message)
        setFormData(resetForm)
        setCount(count + 1)
      } else if (success === 0) {
        errorNofity(message)
      } else if (success === 2) {
        infoNofity(message.sqlMessage)
      }
    }
  }, [postData, count, flag, resetForm, postEditData])

  useEffect(() => {
    const getModuleGroupNameList = async () => {
      const result = await axioslogin.get('/modulegroup/select')
      const { success, data } = result.data;
      if (success === 1) {
        setTableData(data);
        setCount(0)
      } else {
        setTableData([])
      }
    }
    getModuleGroupNameList()
  }, [count])

  const [columnDef] = useState([
    { headerName: 'Sl No', field: 'mdgrp_slno' },
    { headerName: 'Module Group Name', field: 'module_group_name', filter: true, width: 200 },
    {
      headerName: 'Edit', cellRenderer: params =>
        <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
          <EditIcon color='primary' />
        </IconButton>
    },
  ])

  const getEdit = useCallback((params) => {
    setFlag(1)
    const { mdgrp_slno, module_group_name, module_slno } = params.data
    const module_status = JSON.parse(module_slno)
    const form_dis_data = {
      module_group_name: module_group_name,
      module_recruitment: module_status.module_recruitment === 0 ? false : true,
      module_emprecord: module_status.module_emprecord === 0 ? false : true,
      module_attenmangemnt: module_status.module_attenmangemnt === 0 ? false : true,
      module_leavemangment: module_status.module_leavemangment === 0 ? false : true,
      module_payroll: module_status.module_payroll === 0 ? false : true,
      module_performanceApp: module_status.module_performanceApp === 0 ? false : true,
      module_trainAndDevolp: module_status.module_trainAndDevolp === 0 ? false : true,
      module_resignation: module_status.module_resignation === 0 ? false : true,
      module_dashboard: module_status.module_dashboard === 0 ? false : true,
      module_reports: module_status.module_reports === 0 ? false : true,
      module_vaccination: module_status.module_vaccination === 0 ? false : true,
      module_contractRenew: module_status.module_contractRenew === 0 ? false : true
    }
    setFormData(form_dis_data)
    setSlno(mdgrp_slno)
  }, [])

  return (
    <MasterLayout title="Module Group Master" displayClose={true} >
      <ToastContainer />
      <SessionCheck />
      <Box sx={{ width: "100%" }} >
        <Grid container spacing={1}>
          <Grid item xl={3} lg={2}>
            <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
              <InputComponent
                placeholder={'Module Group Name'}
                type="text"
                size="sm"
                name="module_group_name"
                value={module_group_name}
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Recruitment'
                checked={module_recruitment}
                name="module_recruitment"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Employee Record'
                checked={module_emprecord}
                name="module_emprecord"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Attendance Management '
                checked={module_attenmangemnt}
                name="module_attenmangemnt"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Leave Management'
                checked={module_leavemangment}
                name="module_leavemangment"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Payroll'
                checked={module_payroll}
                name="module_payroll"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Performance Apprarisal'
                checked={module_performanceApp}
                name="module_performanceApp"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Training & Deveolopment'
                checked={module_trainAndDevolp}
                name="module_trainAndDevolp"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Resignation'
                checked={module_resignation}
                name="module_resignation"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Dash Board'
                checked={module_dashboard}
                name="module_dashboard"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Reports'
                checked={module_reports}
                name="module_reports"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Vaccination Information'
                checked={module_vaccination}
                name="module_vaccination"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Contract Renewal'
                checked={module_contractRenew}
                name="module_contractRenew"
                onchange={(e) => getModuleGroupFormData(e)}
              />
            </Box>
            <Box sx={{ px: 0.5, mt: 0.9 }}>
              <CssVarsProvider>
                <Button
                  variant="outlined"
                  component="label"
                  size="md"
                  color="primary"
                  onClick={submitModuleGroupMast}
                >
                  <SaveIcon />
                </Button>
              </CssVarsProvider>
            </Box>
          </Grid>
          <Grid item xs={9} lg={9} xl={9} md={9}>
            <CommonAgGrid
              columnDefs={columnDef}
              tableData={tableData}
              sx={{
                height: 400,
                width: "100%"
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

export default memo(ModuleGroupMast) 
