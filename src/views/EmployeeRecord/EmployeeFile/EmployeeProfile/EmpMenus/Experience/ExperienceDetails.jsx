import { differenceInMonths, differenceInYears } from 'date-fns'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { useParams } from 'react-router'
import { axioslogin } from 'src/views/Axios/Axios'
import {
  errorNofity,
  infoNofity,
  succesNofity,
  warningNofity,
} from 'src/views/CommonCode/Commonfunc'
import { format } from 'date-fns'
import { Box, Paper } from '@mui/material'
import { Button, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import { useSelector } from 'react-redux'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit'
import _ from 'underscore'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoyDesignationSelect from 'src/views/MuiComponents/JoyComponent/JoyDesignationSelect'
import SaveIcon from '@mui/icons-material/Save'
import { IconButton as OpenIcon } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const ExperienceDetails = () => {
  //const classes = useStyles()
  const { id, no } = useParams()
  const [count, setCount] = useState(0) //table row refreshing
  const [flag, setflag] = useState(0) //setting flag=1 for updation
  const [desg, setDesg] = useState(0) //designation
  const [slno, setslno] = useState(0)
  const [totyear, settotyear] = useState(0)
  const [data, setData] = useState([])
  const [totmonth, setTotmonth] = useState(0)

  //Initial State
  const [formData, setformData] = useState({
    institution_name: '',
    gross_salary: '',
    tmch_exp: false,
    workstartdate: format(new Date(), 'yyyy-MM-dd'),
    workenddate: format(new Date(), 'yyyy-MM-dd'),
  })
  //defaultState
  const defaultState = useMemo(() => {
    return {
      institution_name: '',
      gross_salary: '',
      tmch_exp: false,
      workstartdate: format(new Date(), 'yyyy-MM-dd'),
      workenddate: format(new Date(), 'yyyy-MM-dd'),
    }
  }, [])
  //Destructuring
  const { institution_name, gross_salary, tmch_exp, workstartdate, workenddate } = formData
  //getting form data
  const updateEmployeeExpFormData = async (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setformData({ ...formData, [e.target.name]: value })
    const expyear = differenceInYears(new Date(workenddate), new Date(workstartdate))
    settotyear(expyear)
    const monthdiff = differenceInMonths(new Date(workenddate), new Date(workstartdate))
    const month = monthdiff % 12
    setTotmonth(month)
  }

  const empno = useSelector((state) => state.getProfileData.ProfileData[0].em_no, _.isEqual)

  //postData
  const postData = useMemo(() => {
    return {
      em_no: id,
      em_id: no,
      em_institution: institution_name,
      em_designation: desg,
      em_from: moment(workstartdate).format('YYYY-MM-DD'),
      em_to: moment(workenddate).format('YYYY-MM-DD'),
      em_total_year: totyear,
      em_salary: gross_salary,
      create_user: empno,
      tmch_exp: tmch_exp === true ? 1 : 0,
    }
  }, [
    id,
    no,
    institution_name,
    desg,
    totyear,
    gross_salary,
    tmch_exp,
    workenddate,
    workstartdate,
    empno,
  ])

  //function for getting selected row to edit
  const getTableData = useCallback((params) => {
    setflag(1)
    const data = params.api.getSelectedRows()
    const {
      em_institution,
      em_designation,
      em_from,
      em_to,
      em_total_year,
      em_salary,
      is_tmch,
      emexp_slno,
    } = data[0]
    const frmData = {
      institution_name: em_institution,
      gross_salary: em_salary,
      workstartdate: em_from,
      workenddate: em_to,
      tmch_exp: is_tmch === 1 ? true : false,
    }
    setDesg(em_designation)
    setformData(frmData)
    settotyear(em_total_year)
    setslno(emexp_slno)
  }, [])

  //patchdata for updating
  const patchData = useMemo(() => {
    return {
      em_no: id,
      em_id: no,
      emexp_slno: slno,
      em_institution: institution_name,
      tmch_exp: tmch_exp === false ? 0 : 1,
      em_designation: desg,
      em_from: moment(workstartdate).format('YYYY-MM-DD'),
      em_to: moment(workenddate).format('YYYY-MM-DD'),
      em_total_year: totyear,
      em_salary: gross_salary,
      create_user: no,
    }
  }, [
    id,
    no,
    slno,
    institution_name,
    tmch_exp,
    desg,
    workenddate,
    workstartdate,
    totyear,
    gross_salary,
  ])

  //saving formdata
  const submitFormData = useCallback(
    (e) => {
      e.preventDefault()
      const submitformadata = async (postData) => {
        const result = await axioslogin.post('/experience', postData)
        const { success, message } = result.data
        if (success === 1) {
          settotyear(0)
          setTotmonth(0)
          setDesg(0)
          succesNofity(message)
          setformData(defaultState)
          setCount(count + 1)
        } else if (success === 2) {
          warningNofity(message)
        } else {
          infoNofity(message)
        }
      }
      //updating data in database
      const submitUpdateData = async (patchData) => {
        const result = await axioslogin.patch('/experience', patchData)
        const { success, message } = result.data
        if (success === 2) {
          settotyear(0)
          setDesg(0)
          setTotmonth(0)
          succesNofity(message)
          setformData(defaultState)
          setCount(count + 1)
        } else {
          infoNofity(message)
        }
      }
      if (flag === 1) {
        submitUpdateData(patchData)
      } else {
        if (workstartdate === workenddate) {
          warningNofity('Please Select Experience Year')
        } else {
          submitformadata(postData)
        }
      }
    },
    [postData, patchData, flag, count, setDesg, workstartdate, defaultState, workenddate],
  )

  const [columnDef] = useState([
    { headerName: 'Emp No', field: 'em_no', wrapText: true, minWidth: 90 },
    { headerName: 'Institution ', field: 'em_institution', wrapText: true, minWidth: 400 },
    { headerName: 'Designation ', field: 'desg_name', wrapText: true, minWidth: 200 },
    { headerName: 'Start Date ', field: 'em_from', wrapText: true, minWidth: 150 },
    { headerName: 'End Date', field: 'em_to', minWidth: 150 },
    { headerName: 'Total Year', field: 'year', minWidth: 150 },
    { headerName: 'Total Month ', field: 'month', minWidth: 150 },
    { headerName: 'Total Days', field: 'day', minWidth: 150 },
    { headerName: 'Gross salary', field: 'em_salary', minWidth: 150 },
    {
      headerName: 'Edit',
      minWidth: 150,
      cellRenderer: (params) => (
        <OpenIcon
          sx={{ pb: 2, boxShadow: 0 }}
          size="sm"
          color="primary"
          onClick={() => getTableData(params)}
        >
          <EditIcon />
        </OpenIcon>
      ),
    },
    {
      headerName: 'Edit',
      minWidth: 100,
      cellRenderer: (params) => (
        <Tooltip title="Delete" followCursor placement="top" arrow>
          <OpenIcon sx={{ pb: 1 }} onClick={() => deleteExp(params)}>
            <DeleteIcon color="primary" />
          </OpenIcon>
        </Tooltip>
      ),
    },
  ])

  const deleteExp = async (params) => {
    const { emexp_slno } = params.data
    const result = await axioslogin.delete(`/experience/${emexp_slno}`)
    const { success, message } = result.data
    if (success === 1) {
      succesNofity(message)
      setCount(count + 1)
    } else {
      warningNofity(message)
    }
  }

  useEffect(() => {
    const getTableData = async () => {
      const results = await axioslogin.get(`/experience/select/${id}`)
      const { success, data } = results.data
      if (success === 1) {
        setData(data)
        setCount(0)
      } else if (success === 0) {
        infoNofity('No Experience Is added to This Employee')
      } else {
        errorNofity('Error Occured,Please Contact EDP')
      }
    }
    getTableData()
  }, [id, count])

  return (
    <Fragment>
      <Box
        sx={{
          width: '100%',
          p: 1,
          overflow: 'auto',
          '::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {/* heading Section start */}
        <Paper
          variant="outlined"
          square
          elevation={0}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box sx={{ flex: 1 }}>
            <CssVarsProvider>
              <Typography
                startDecorator={<DragIndicatorOutlinedIcon />}
                textColor="neutral.400"
                sx={{ display: 'flex' }}
              >
                Experience Information
              </Typography>
            </CssVarsProvider>
          </Box>
          <Tooltip title="Save" followCursor placement="top" arrow>
            <Box sx={{ display: 'flex', pr: 1 }}>
              <CssVarsProvider>
                <Button
                  variant="outlined"
                  component="label"
                  size="sm"
                  color="primary"
                  onClick={submitFormData}
                >
                  <SaveIcon />
                </Button>
              </CssVarsProvider>
            </Box>
          </Tooltip>
        </Paper>
        {/* headig section end */}
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, px: 0.5, mt: 0.5 }}>
          {/* first row start */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
            <Box sx={{ width: '20%' }}>
              <CssVarsProvider>
                <Typography textColor="text.secondary">Institution Name</Typography>
              </CssVarsProvider>
            </Box>
            <Box sx={{ width: '30%' }}>
              <InputComponent
                type="text"
                size="sm"
                placeholder="Institution Name"
                name="institution_name"
                value={tmch_exp === true ? 'Travancore Medicity' : institution_name}
                onchange={(e) => updateEmployeeExpFormData(e)}
              />
            </Box>
            <Box sx={{ width: '50%', pl: 5, mt: 1 }}>
              <JoyCheckbox
                label="Medicity Experience"
                name="tmch_exp"
                checked={tmch_exp}
                onchange={(e) => updateEmployeeExpFormData(e)}
              />
            </Box>
          </Box>
          {/* first row end */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 0.5 }}>
            <Box sx={{ width: '20%' }}>
              <CssVarsProvider>
                <Typography textColor="text.secondary">Designation</Typography>
              </CssVarsProvider>
            </Box>
            <Box sx={{ width: '30%' }}>
              <JoyDesignationSelect desgValue={desg} getDesg={setDesg} />
            </Box>
            <Box sx={{ width: '20%', pl: 0.5 }}>
              <CssVarsProvider>
                <Typography textColor="text.secondary">Gross Salary</Typography>
              </CssVarsProvider>
            </Box>
            <Box sx={{ width: '30%' }}>
              <InputComponent
                type="text"
                size="sm"
                placeholder="Gross Salary"
                name="gross_salary"
                value={gross_salary}
                onchange={(e) => updateEmployeeExpFormData(e)}
              />
            </Box>
          </Box>
          {/* second row start */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 0.5 }}>
            <Box sx={{ width: '20%' }}>
              <CssVarsProvider>
                <Typography textColor="text.secondary">Work Start Date</Typography>
              </CssVarsProvider>
            </Box>
            <Box sx={{ width: '30%' }}>
              <Input
                type="date"
                slotProps={{
                  input: {
                    max: moment(new Date()).format('YYYY-MM-DD'),
                  },
                }}
                value={workstartdate}
                name="workstartdate"
                onChange={(e) => updateEmployeeExpFormData(e)}
              />
            </Box>
            <Box sx={{ width: '20%', pl: 0.5 }}>
              <CssVarsProvider>
                <Typography textColor="text.secondary">Work End Date</Typography>
              </CssVarsProvider>
            </Box>
            <Box sx={{ width: '30%' }}>
              <Input
                type="date"
                slotProps={{
                  input: {
                    min: moment(workstartdate).format('YYYY-MM-DD'),
                    max: moment(new Date()).format('YYYY-MM-DD'),
                  },
                }}
                value={workenddate}
                name="workenddate"
                onChange={(e) => updateEmployeeExpFormData(e)}
              />
            </Box>
          </Box>
          {/* second row end */}

          {/* third row start */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 0.5 }}>
            <Box sx={{ width: '20%' }}>
              <CssVarsProvider>
                <Typography textColor="text.secondary">Total Year Experience</Typography>
              </CssVarsProvider>
            </Box>
            <Box sx={{ width: '30%' }}>
              <InputComponent
                type="text"
                size="sm"
                placeholder="Total Year"
                name="totyear"
                value={totyear}
                disabled
              />
            </Box>
            <Box sx={{ width: '20%', pl: 0.5 }}>
              <CssVarsProvider>
                <Typography textColor="text.secondary">Total Month Experience</Typography>
              </CssVarsProvider>
            </Box>
            <Box sx={{ width: '30%' }}>
              <InputComponent
                type="text"
                size="sm"
                placeholder="Total Month"
                name="totmonth"
                value={totmonth}
                disabled
              />
            </Box>
          </Box>
          {/* third row end */}
          <Paper
            square
            elevation={0}
            sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: 'column' }}
          >
            <CommonAgGrid
              columnDefs={columnDef}
              tableData={data}
              sx={{
                height: 400,
                width: '100%',
              }}
              rowHeight={30}
              headerHeight={30}
            />
          </Paper>
        </Box>
      </Box>
    </Fragment>
  )
}

export default memo(ExperienceDetails)
