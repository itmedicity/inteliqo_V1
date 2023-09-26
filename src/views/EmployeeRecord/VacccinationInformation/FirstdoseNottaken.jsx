import { Box, } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { lazy } from 'react'
import AddTaskIcon from '@mui/icons-material/AddTask'
import { Tooltip, Paper, } from '@mui/material'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import { memo } from 'react'
import { IconButton as OpenIcon } from '@mui/material'
import { useCallback } from 'react'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'

const Modal = lazy(() => import('./Modal'))

const Firstdose = ({ item, setCount, count, setShowGeneral }) => {
  
  const [data, setData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState({})
  const [flag,setflag] = useState(0)

 const handleIconClick = useCallback((params) => {
    setIsModalOpen(true);
    setSelectedRowData(params.data);
    setflag(1);
  }, []); 

  useEffect(() => {
     if (Object.keys(item).length > 0) {
    const firstdose =
       item?.filter((val) => val.booster_dose_status === 0 && val.first_dose_status === 0)
    const dataWithStatus = firstdose.map((record, index) => ({
      ...record,
      sl_no: index + 1,
    }))
    setData(dataWithStatus)
    setCount(0)
     }else{
       setData([])
     }
  }, [item, count, setCount])

  const [columnDef] = useState([
    { headerName: 'Sl No', field: 'sl_no' },
    { headerName: 'Emp ID', field: 'em_no', filter: true },
    { headerName: 'Employee Name', field: 'em_name', filter: true },
    { headerName: 'Department', field: 'dept_name', filter: true },
    { headerName: 'Department Section', field: 'sect_name', filter: true },
    {
      headerName: 'Action',
      cellRenderer: (params) => {
        if (
          params.data.first_dose_given_status === 1 ||
          params.data.booster_dose_given_status === 1
        ) {
          return (
            <Tooltip title="vaccinated ">
              <BeenhereIcon color="disabled" />
            </Tooltip>
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
  ])

  return (
    <DasboardCustomLayout  title={"Not Vaccinated Employee"} displayClose={true} setClose={setShowGeneral} >
    
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Paper sx={{ flex: 1 }}>
       
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
        <Modal
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
    </DasboardCustomLayout>
  )
}

export default memo(Firstdose)
