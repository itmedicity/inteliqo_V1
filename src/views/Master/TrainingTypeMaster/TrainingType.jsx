import { Button, CssVarsProvider } from '@mui/joy'
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SaveIcon from '@mui/icons-material/Save'
import { axioslogin } from 'src/views/Axios/Axios'
import { useCallback } from 'react'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useMemo } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MasterLayout from '../MasterComponents/MasterLayout'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import { employeeIdNumber } from 'src/views/Constant/Constant'

const TrainingType = () => {
  const [type, setType] = useState('')
  const [status, SetStatus] = useState(false)
  const [count, setCount] = useState(0)
  const [tableData, setTableData] = useState([])
  const [slno, setSlno] = useState(0)
  const [flag, setFlag] = useState(0)
  const [countDay, setcountDay] = useState('')

  const reset = () => {
    setType('')
    setcountDay('')
    SetStatus(false)
  }
  //postData
  const postData = useMemo(() => {
    return {
      type_name: type,
      count_day: countDay,
      type_status: status === true ? 1 : 0,
      create_user: employeeIdNumber(),
    }
  }, [type, countDay, status])

  //patchData
  const patchData = useMemo(() => {
    return {
      trainingtype_slno: slno,
      type_name: type,
      count_day: countDay,
      type_status: status,
      edit_user: employeeIdNumber(),
    }
  }, [slno, type, countDay, status])

  // view
  useEffect(() => {
    const getData = async () => {
      const result = await axioslogin.get('/TrainingType/select')
      const { success, data } = result.data
      if (success === 2) {
        const viewData = data?.map((val) => {
          const obj = {
            trainingtype_slno: val?.trainingtype_slno,
            type_name: val?.type_name,
            type_date: val?.type_date,
            count_day: val?.count_day,
            type_status: val?.type_status,
            statusChecked: val?.type_status === 0 ? 'NO' : 'YES',
          }
          return obj
        })
        setTableData(viewData)
        setCount(0)
      } else {
        setTableData([])
      }
    }
    getData()
  }, [count])

  //clickEdit
  const getDataTable = useCallback((params) => {
    setFlag(1)
    const data = params.api.getSelectedRows()
    const { trainingtype_slno, count_day, type_name, type_status } = data[0]
    setSlno(trainingtype_slno)
    setType(type_name)
    setcountDay(count_day)
    SetStatus(type_status === 1 ? true : false)
  }, [])

  //submit
  const submitTrainingType = useCallback(() => {
    //insert
    const insertData = async (postData) => {
      const result = await axioslogin.post('/TrainingType/insert', postData)
      const { success, message } = result.data
      if (success === 1) {
        setCount(count + 1)
        reset()
        succesNofity(message)
        setFlag(0)
      } else if (success === 0) {
        infoNofity(message.sqlMessage)
        reset()
      } else {
        infoNofity(message)
        reset()
      }
    }

    //update
    const EditData = async (patchData) => {
      const result = await axioslogin.patch('/TrainingType/update', patchData)
      const { message, success } = result.data
      if (success === 2) {
        succesNofity(message)
        reset()
        setCount(count + 1)
        setSlno(0)
        setFlag(0)
      } else {
        warningNofity(message)
        reset()
      }
    }
    if (flag === 0) {
      insertData(postData)
    } else {
      EditData(patchData)
    }
  }, [patchData, postData, count, flag])

  //delete
  const deleteValue = useCallback(
    (params) => {
      const data = params.api.getSelectedRows()
      const { trainingtype_slno } = data[0]
      if (trainingtype_slno !== 0) {
        const patchdata = {
          trainingtype_slno: trainingtype_slno,
        }
        const dataDelete = async (patchdata) => {
          const result = await axioslogin.patch(`/TrainingType/delete/data`, patchdata)
          const { message, success } = result.data
          if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
          }
        }
        dataDelete(patchdata)
      }
    },
    [count],
  )

  //column def
  const [columnDef] = useState([
    { headerName: 'Sl.No ', field: 'trainingtype_slno', filter: true, width: 150 },
    { headerName: 'Training Name ', field: 'type_name', filter: true, width: 300 },
    { headerName: 'Due Days ', field: 'count_day', filter: true, width: 250 },
    { headerName: 'Status ', field: 'statusChecked', filter: true, width: 150 },
    {
      headerName: 'Edit',
      cellRenderer: (params) => (
        <Fragment>
          <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)}>
            <EditIcon color="primary" />
          </IconButton>
        </Fragment>
      ),
    },
    {
      headerName: 'Delete',
      cellRenderer: (params) => (
        <Fragment>
          <IconButton sx={{ paddingY: 0.5 }} onClick={() => deleteValue(params)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </Fragment>
      ),
    },
  ])

  return (
    <MasterLayout title="Training Type Master" displayClose={true}>
      <ToastContainer />
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={2}>
            <Paper square elevation={0} sx={{ p: 1 }}>
              <Box sx={{ width: '100%', pt: 1 }}>
                <InputComponent
                  placeholder={'Training Type Name'}
                  type="text"
                  size="sm"
                  name="type"
                  value={type}
                  onchange={(e) => setType(e.target.value)}
                />
              </Box>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ mt: 1, width: '50%' }}>
                  <InputComponent
                    type="text"
                    size="sm"
                    value={countDay}
                    onchange={(e) => setcountDay(e.target.value)}
                  />
                </Box>
                <Box sx={{ mt: 1, ml: 1, width: '50%' }}>
                  <Typography>Days</Typography>
                </Box>
              </Box>
              <Box sx={{ width: '100%', pt: 1 }}>
                <JoyCheckbox
                  label="Status"
                  checked={status}
                  name="status"
                  onchange={(e) => SetStatus(e.target.checked)}
                />
              </Box>
              <Box sx={{}}>
                <CssVarsProvider>
                  <Button
                    variant="outlined"
                    component="label"
                    size="md"
                    color="primary"
                    onClick={submitTrainingType}
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

export default memo(TrainingType)
