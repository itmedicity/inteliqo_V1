import { Box, CssVarsProvider, IconButton } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'

import { Paper, Typography } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { memo } from 'react'

const Pendingfirst = ({ item, setCount, count, setShowGeneral }) => {
  const toRedirectToHome = () => {
    setShowGeneral(0)
  }
  const [data, setData] = useState([])
  useEffect(() => {
    const boosterdose =
      item && item.filter((val) => val.first_dose_status === 0 && val.first_dose_given_status === 1)
    setData(boosterdose)
    setCount(0)
  }, [item, count, setCount])
  const [columnDef] = useState([
    { headerName: 'Emp ID', field: 'em_no', filter: true },
    { headerName: 'Employee Name', field: 'em_name', filter: true },
    { headerName: 'Department', field: 'dept_name', filter: true },
    { headerName: 'Department Section', field: 'sect_name', filter: true },
  ])
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

                  <Typography sx={{ display: 'flex' }}>Pending First Dose</Typography>
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

export default memo(Pendingfirst)
