import React, { useEffect, useState } from 'react'
import { Box, CssVarsProvider, IconButton } from '@mui/joy'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Paper, Typography, Tooltip } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import CloseIcon from '@mui/icons-material/Close'
import AddTaskIcon from '@mui/icons-material/AddTask'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import { axioslogin } from 'src/views/Axios/Axios'
import { memo } from 'react'
import { useCallback } from 'react'
import { IconButton as OpenIcon } from '@mui/material'

const Firstdosevac = ({
  item,
  setCount,
  count,
  setShowGeneral,
  flag,
  setIsModalOpen,
  setSelectedRowData,
  sethicdata,
}) => {
  // hic verification
  const handleIconClick = useCallback(async (params) => {
    setIsModalOpen(true)
    setSelectedRowData(params.data)
      const { em_no } = params.data; 
    const response = await axioslogin.get(`/Vaccination/getdataVaccination/${em_no}`)
    const { data,success } = response.data
     if (success===1){
       sethicdata(data)
    }else{
        sethicdata([])
    }
    
  }, [setIsModalOpen,setSelectedRowData,sethicdata])

  const toRedirectToHome = () => {
    setShowGeneral(0)
  }
  const [data, setData] = useState([])

  useEffect(() => {
    if (flag === 1) {
        if (Object.keys(item).length > 0) {
      const firstdose =
        item?.filter((val) => val.first_dose_status === 1 && val.hic_frst_dose_status === 0)
      setData(firstdose)
      setCount(0)
        }else{
            setData([])
        }
    } else {
      if (Object.keys(item).length > 0) {
      const firstdose =  item?.filter((val) => val.first_dose_status === 1)
      setData(firstdose)
      setCount(0)
      }else{
          setData([])
      }
    }
  }, [item, count, setCount])

  let preparedColumnDef
  if (flag === 1) {
    preparedColumnDef = [
      { headerName: 'Emp ID', field: 'em_no', filter: true },
      { headerName: 'Employee Name', field: 'em_name', filter: true },
      { headerName: 'Department', field: 'dept_name', filter: true },
      { headerName: 'Department Section', field: 'sect_name', filter: true },
      {
        headerName: 'Action',
        cellRenderer: (params) => {
          if (
            params.data.hic_frst_dose_status === 1 ||
            params.data.hic_second_dose_status === 1 ||
            params.data.hic_third_dose_status === 1 ||
            params.data.hic_booster_dose_status === 1
          ) {
            return (
              <IconButton sx={{ paddingY: 0.5, cursor: 'none' }}>
                <Tooltip title="approved ">
                  <BeenhereIcon />
                </Tooltip>
              </IconButton>
            )
          } else {
            return (
               <OpenIcon
              sx={{ p: 0.1 }}
              fontSize="small"
              color="primary"
              onClick={() => handleIconClick(params)}
            >
              <Tooltip title="Click Here to select a date">
                <AddTaskIcon />
              </Tooltip>
            </OpenIcon> 
            )
          }
        },
      },
    ]
  } else {
    preparedColumnDef = [
      { headerName: 'Emp ID', field: 'em_no', filter: true },
      { headerName: 'Employee Name', field: 'em_name', filter: true },
      { headerName: 'Department', field: 'dept_name', filter: true },
      { headerName: 'Department Section', field: 'sect_name', filter: true },
    ]
  }
  const [columnDef] = useState(preparedColumnDef)

  return (
    <Box>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Paper sx={{ flex: 1 }}>
          <Paper square sx={{ display: 'flex', height: 30, flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flex: 1, height: 30 }}>
              <Paper
                square
                sx={{
                  display: 'flex',
                  flex: 1,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <DragIndicatorOutlinedIcon />

                  <Typography sx={{ display: 'flex' }}>First Dose Vaccinated</Typography>
                </Box>
                <Box sx={{ display: 'flex', pr: 1 }}>
                  <CssVarsProvider>
                    <IconButton
                      variant="outlined"
                      size="xs"
                      color="danger"
                      onClick={toRedirectToHome}
                      sx={{ color: '#ef5350' }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </CssVarsProvider>
                </Box>
              </Paper>
            </Box>
          </Paper>
          <CommonAgGrid
            columnDefs={columnDef}
            tableData={data}
            sx={{
              height: 700,
              width: '100%',
                p:1
            }}
            rowHeight={30}
            headerHeight={30}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default memo(Firstdosevac)
