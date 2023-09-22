import React, { useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Box, IconButton, Paper, Typography, Tooltip } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { axioslogin } from 'src/views/Axios/Axios'
import AddTaskIcon from '@mui/icons-material/AddTask'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import { memo } from 'react'
import { useCallback } from 'react'

const Booster = ({
  item,
  setCount,
  count,
  setShowGeneral,
  flag,
  setSelectedRowData,
  sethicdata,
  setIsModalOpen,
}) => {
  // hic verification

  const handleIconClick = useCallback(async (params) => {
    setIsModalOpen(true)
    setSelectedRowData(params.data)
    const response = await axioslogin.get(`/Vaccination/getdataVaccination/${params.data.em_no}`)
    const { data } = response.data
    sethicdata(data)
  }, [])
  const toRedirectToHome = () => {
    setShowGeneral(0)
  }
  const [data, setData] = useState([])

  useEffect(() => {
    if (flag === 1) {
      const seconddose =
        item &&
        item.filter((val) => val.booster_dose_status === 1 && val.hic_booster_dose_status === 0)
      setData(seconddose)
      setCount(0)
    } else {
      const seconddose = item && item.filter((val) => val.booster_dose_status === 1)
      setData(seconddose)
      setCount(0)
    }
  }, [item, count, setCount, flag])

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
          if (params.data.hic_booster_dose_status === 1) {
            return (
              <IconButton sx={{ paddingY: 0.5, cursor: 'none' }}>
                <Tooltip title="approved ">
                  <BeenhereIcon />
                </Tooltip>
              </IconButton>
            )
          } else if (
            params.data.hic_frst_dose_status === 0 ||
            params.data.hic_second_dose_status === 0 ||
            params.data.hic_third_dose_status === 0
          ) {
            return <Typography variant="body1">Above Dose Not Verified </Typography>
          } else {
            return (
              <IconButton
                sx={{ paddingY: 0.5 }}
                fontSize="small"
                color="primary"
                onClick={() => handleIconClick(params)}
              >
                <Tooltip title="Click Here to approve">
                  <AddTaskIcon />
                </Tooltip>
              </IconButton>
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

                  <Typography sx={{ display: 'flex' }}>Booster Dose Vaccinated</Typography>
                </Box>
                <Box sx={{ display: 'flex', pr: 1 }}>
                  <IconButton
                    variant="outlined"
                    size="xs"
                    color="danger"
                    onClick={toRedirectToHome}
                    sx={{ color: '#ef5350' }}
                  >
                    <CloseIcon />
                  </IconButton>
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
            }}
            rowHeight={30}
            headerHeight={30}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default memo(Booster)
