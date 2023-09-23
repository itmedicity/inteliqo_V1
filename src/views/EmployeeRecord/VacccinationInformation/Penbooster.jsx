import { Box, IconButton, CssVarsProvider } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Paper, Tooltip, Typography } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import CloseIcon from '@mui/icons-material/Close'
import { memo } from 'react'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { lazy } from 'react'
const ModalAnnual = lazy(() => import('./ModalAnnual'))
const Penbooster = ({ item, setCount, count, setShowGeneral }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState({})

  const [flag, setflag] = useState(0)
  const toRedirectToHome = () => {
    setShowGeneral(0)
  }
  const [data, setData] = useState([])
  useEffect(() => {
        if (Object.keys(item).length > 0) {
    const currentDate = new Date()
    const boosterdose =
      
      item?.filter((val) => {
        const annualDoseDate = new Date(val.annual_dose)
        return val.annual_dose !== null && annualDoseDate <= currentDate
      })

    setData(boosterdose)
    setCount(0)
        }else{
            setData([])
        }
  }, [item, count, setCount])

  const handleIconClick = (params) => {
    setIsModalOpen(true)
    setSelectedRowData(params.data)
    setflag(1)
  }
  const [columnDef] = useState([
    { headerName: 'Emp ID', field: 'em_no', filter: true },
    { headerName: 'Employee Name', field: 'em_name', filter: true },
    { headerName: 'Department', field: 'dept_name', filter: true },
    { headerName: 'Department Section', field: 'sect_name', filter: true },
    {
      headerName: 'Action',
      cellRenderer: (params) => {
        return (
          <IconButton
            sx={{ p: 0.1 }}
            fontSize="small"
            color="primary"
            onClick={() => handleIconClick(params)}
          >
            <Tooltip title="Click Here to select a date">
              <AddTaskIcon />
            </Tooltip>
          </IconButton>
        )
        // }
      },
    },
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

                  <Typography sx={{ display: 'flex' }}>Annual Health Check</Typography>
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
          <ModalAnnual
            setCount={setCount}
            count={count}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedRowData={selectedRowData}
            flag={flag}
            setShowGeneral={setShowGeneral}
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default memo(Penbooster)
