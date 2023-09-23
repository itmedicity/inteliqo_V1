import { Box, CssVarsProvider, IconButton } from '@mui/joy'
import { Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { memo } from 'react'

const TotalEmployee = ({ item, setShowGeneral }) => {
  const toRedirectToHome = () => {
    setShowGeneral(0)
  }
  const [data, setData] = useState([])
  useEffect(() => {
    if (Object.keys(item).length > 0) {
    const notVaccinated =
      
      item?.filter(
        (val) =>
          val.first_dose_status === 1 &&
          val.second_dose_status === 1 &&
          val.third_dose_status === 1 &&
          val.booster_dose_status === 1,
      )
    const dataWithStatus = notVaccinated.map((record, index) => ({
      ...record,
      sl_no: index + 1,
    }))
    setData(dataWithStatus)
    }else{
        setData([])
    }
  }, [item])

  const [columnDef] = useState([
    { headerName: 'Sl No', field: 'sl_no' },
    { headerName: 'Emp ID', field: 'em_no', filter: true },
    { headerName: 'Employee Name', field: 'em_name' },
    { headerName: 'Department', field: 'dept_name' },
    { headerName: 'Department Section', field: 'sect_name' },
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

                  <Typography sx={{ display: 'flex' }}>Total Vaccinated Emplolyee</Typography>
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

export default memo(TotalEmployee)
