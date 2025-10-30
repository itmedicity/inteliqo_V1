import { Button, CssVarsProvider } from '@mui/joy'
import { Box,  Grid, Paper,  IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import { ToastContainer } from 'react-toastify'
import TrainingTypeSelect from 'src/views/MuiComponents/TrainingTypeSelect'
import { useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Fragment } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import MasterLayout from '../MasterComponents/MasterLayout'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import { employeeIdNumber } from 'src/views/Constant/Constant'

const TrainingSubTypeMaster = () => {
  const [sub_type, setSub_type] = useState('')
  const [sub_type_status, setsub_type_status] = useState(false)
  const [trainingtype, settrainingtype] = useState(0)
  const [tableData, setTabledata] = useState([])
  const [count, setCount] = useState(0)
  const [Subtype_slno, setSubtype_slno] = useState(0)
  const [flag, setFlag] = useState(0)
  const [subtype_count, setsubtype_count] = useState('')

  //PostData
  const PostData = useMemo(() => {
    return {
      training_type_no: trainingtype,
      subtype_name: sub_type,
      subtype_count: parseInt(subtype_count),
      subtype_status: sub_type_status === true ? 1 : 0,
      create_user: employeeIdNumber(),
    }
  }, [trainingtype, sub_type, sub_type_status, subtype_count])

  //PatchData
  const PatchData = useMemo(() => {
    return {
      subtype_slno: Subtype_slno,
      training_type_no: trainingtype,
      subtype_name: sub_type,
      subtype_status: sub_type_status === true ? 1 : 0,
      update_user: employeeIdNumber(),
      subtype_count: parseInt(subtype_count) === 0 ? 0 : parseInt(subtype_count),
    }
  }, [Subtype_slno, trainingtype, sub_type, sub_type_status,  subtype_count])

  //reset
  const reset = useCallback(() => {
    settrainingtype(0)
    setSub_type('')
    setsub_type_status(false)
    setsubtype_count(0)
  }, [])

  //view
  useEffect(() => {
    const getData = async () => {
      const result = await axioslogin.get('/TrainingSubType/select')
      const { success, data } = result.data
      if (success === 2) {
        const viewData = data?.map((val) => {
          const obj = {
            subtype_slno: val?.subtype_slno,
            training_type_no: val?.training_type_no,
            subtype_name: val?.subtype_name,
            subtype_count: val?.subtype_count,
            subtype_status: val?.subtype_status,
            subtypeStatus: val?.subtype_status === 0 ? 'NO' : 'YES',
            trainingtype_slno: val?.trainingtype_slno,
            type_name: val?.type_name,
          }
          return obj
        })
        setTabledata(viewData)
        setCount(0)
      } else {
        setTabledata([])
      }
    }
    getData()
  }, [count])

  //ClickEdit
  const getDataTable = useCallback((params) => {
    setFlag(1)
    const data = params.api.getSelectedRows()
    const { trainingtype_slno, subtype_name, subtype_status, subtype_slno, subtype_count } = data[0]
    settrainingtype(trainingtype_slno)
    setSub_type(subtype_name)
    setsub_type_status(subtype_status === 1 ? true : false)
    setSubtype_slno(subtype_slno)
    setsubtype_count(subtype_count)
  }, [])

  //Delete
  const DeleteRow = useCallback(
    (params) => {
      const data = params.api.getSelectedRows()
      const { subtype_slno } = data[0]
      const id = subtype_slno
      const patchdata = {
        Subtype_slno: subtype_slno,
      }
      if (id !== 0) {
        const dataDelete = async (patchdata) => {
          const result = await axioslogin.patch(`/TrainingSubType/delete`, patchdata)
          const { message, success } = result.data
          if (success === 2) {
            succesNofity(message)
            setCount(count + 1)
          } else {
            warningNofity(message)
          }
        }
        dataDelete(patchdata)
      }
    },
    [count],
  )

  //Submit
  const submitTrainingCategory = useCallback(() => {
    // Insert
    const InsertData = async (PostData) => {
      const response = await axioslogin.post('/TrainingSubType/insert', PostData)
      const { message, success } = response.data
      if (success === 1) {
        setCount(count + 1)
        reset()
        succesNofity(message)
        setFlag(0)
      } else if (success === 0) {
        infoNofity(message)
        reset()
      } else {
        warningNofity(message)
        reset()
      }
    }
    // Edit
    const EditData = async (PatchData) => {
      const result = await axioslogin.patch('/TrainingSubType/update', PatchData)
      const { message, success } = result.data
      if (success === 2) {
        reset()
        setCount(count + 1)
        setSubtype_slno(0)
        succesNofity(message)
        setFlag(0)
      } else {
        warningNofity(message)
        reset()
      }
    }
    //flag checking
    if (flag === 0) {
      InsertData(PostData)
    } else {
      EditData(PatchData)
    }
  }, [PostData, PatchData, count, flag, reset])

  //column def
  const [columnDef] = useState([
    { headerName: 'Sl.No ', field: 'subtype_slno', filter: true, width: 150 },
    { headerName: 'Training Type', field: 'type_name', filter: true, width: 250 },
    { headerName: 'Training SubType Name ', field: 'subtype_name', filter: true, width: 250 },
    { headerName: 'Subtype Count ', field: 'subtype_count', filter: true, width: 250 },
    { headerName: 'Status ', field: 'subtypeStatus', filter: true, width: 250 },
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
          <IconButton sx={{ paddingY: 0.5 }} onClick={() => DeleteRow(params)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </Fragment>
      ),
    },
  ])

  return (
    <MasterLayout title="Training SubType Master" displayClose={true}>
      <ToastContainer />
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={2}>
            <Paper square elevation={0} sx={{ p: 1 }}>
              <Box sx={{ pt: 1 }}>
                <TrainingTypeSelect value={trainingtype} setValue={settrainingtype} />
              </Box>
              <Box sx={{ width: '100%', pt: 1 }}>
                <InputComponent
                  placeholder={'SubType Name'}
                  type="text"
                  size="sm"
                  name="sub_type"
                  value={sub_type}
                  onchange={(e) => setSub_type(e.target.value)}
                />
              </Box>

              <Box sx={{ width: '100%' }}>
                <Box sx={{ mt: 1 }}>
                  <InputComponent
                    placeholder={'Number of Trainings'}
                    type="number"
                    size="sm"
                    value={subtype_count}
                    onchange={(e) => setsubtype_count(e.target.value)}
                  />
                </Box>
              </Box>
              <Box sx={{ width: '100%', pt: 1 }}>
                <JoyCheckbox
                  label="Status"
                  checked={sub_type_status}
                  name="sub_type_status"
                  onchange={(e) => setsub_type_status(e.target.checked)}
                />
              </Box>
              <Box sx={{}}>
                <CssVarsProvider>
                  <Button
                    variant="outlined"
                    component="label"
                    size="md"
                    color="primary"
                    onClick={submitTrainingCategory}
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

export default memo(TrainingSubTypeMaster)
