import React, { useEffect, useState } from 'react'
import { Box, CssVarsProvider, IconButton } from '@mui/joy'

import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Paper, Typography, Tooltip } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { axioslogin } from 'src/views/Axios/Axios'
import AddTaskIcon from '@mui/icons-material/AddTask'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import { memo } from 'react'

const Thirddose = ({
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
  const handleIconClick = async (params) => {
    setIsModalOpen(true)
    setSelectedRowData(params.data)
    const response = await axioslogin.get(`/Vaccination/getdataVaccination/${params.data.em_no}`)
    const { data } = response.data
    sethicdata(data)
  }
  const toRedirectToHome = () => {
    setShowGeneral(0)
  }
  const [data, setData] = useState([])

  useEffect(() => {
    if (flag === 1) {
      const thirddose =
        item &&
        item.filter(
          (val) =>
            val.third_dose_status === 1 &&
            val.second_dose_status === 1 &&
            val.third_dose_status === 1 &&
            val.hic_third_dose_status === 0,
        )
      setData(thirddose)
      setCount(0)
    } else {
      const thirddose =
        item &&
        item.filter(
          (val) =>
            val.third_dose_status === 1 &&
            val.second_dose_status === 1 &&
            val.third_dose_status === 1,
        )
      setData(thirddose)
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
          if (
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
          } else if (params.data.hic_frst_dose_status === 0) {
            return <Typography variant="body1">First dose not verified</Typography>
          } else if (
            params.data.hic_frst_dose_status === 1 &&
            params.data.hic_second_dose_status === 0
          ) {
            return <Typography variant="body1">Second dose not verified</Typography>
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

                  <Typography sx={{ display: 'flex' }}>Third Dose Vaccinated</Typography>
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
            }}
            rowHeight={30}
            headerHeight={30}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default memo(Thirddose)
