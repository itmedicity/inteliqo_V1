import { Box, IconButton } from '@mui/joy'
import React, { useEffect, useMemo, useState ,memo,lazy} from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Paper, Tooltip, } from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'
import { useCallback } from 'react'
const ModalAnnual = lazy(() => import('./ModalAnnual'))
const Penbooster = ({ item, setCount, count, setShowGeneral }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState({})

  const [flag, setflag] = useState(0)
  const empData=useMemo(()=>item,[item])
  const [data, setData] = useState([])
  useEffect(() => {
        if (Object.keys(empData).length > 0) {
    const currentDate = new Date()
    const boosterdose =
      
    empData?.filter((val) => {
        const annualDoseDate = new Date(val.annual_dose)
        return val.annual_dose !== null && annualDoseDate <= currentDate
      })

    setData(boosterdose)
    setCount(0)
        }else{
            setData([])
        }
  }, [empData, count, setCount])

  const handleIconClick =useCallback( (params) => {
    setIsModalOpen(true)
    setSelectedRowData(params.data)
    setflag(1)
  }, [setIsModalOpen,setSelectedRowData,setflag])
  
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
       <DasboardCustomLayout  title={"Annual Health Check"} displayClose={true} setClose={setShowGeneral} >

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
     </DasboardCustomLayout>
  )
}

export default memo(Penbooster)
