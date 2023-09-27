import { Box} from '@mui/joy'
import React, { useEffect, useState,useMemo,memo} from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Paper } from '@mui/material'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'


const Pendingfirst = ({ item, setCount, count, setShowGeneral }) => {
 
  const [data, setData] = useState([])
  const empData=useMemo(()=>item,[item])

  useEffect(() => {
     if (Object.keys(empData).length > 0) {
    const boosterdose =
    empData?.filter((val) => val.first_dose_status === 0 && val.first_dose_given_status === 1)
    setData(boosterdose)
    setCount(0)
     }else{
        setData([])
     }
  }, [empData, count, setCount])
  
  const [columnDef] = useState([
    { headerName: 'Emp ID', field: 'em_no', filter: true },
    { headerName: 'Employee Name', field: 'em_name', filter: true },
    { headerName: 'Department', field: 'dept_name', filter: true },
    { headerName: 'Department Section', field: 'sect_name', filter: true },
  ])
  return (
    <DasboardCustomLayout  title={"Pending First Dose"} displayClose={true} setClose={setShowGeneral} >

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
        </Paper>
      </Box>
    </DasboardCustomLayout>
  )
}

export default memo(Pendingfirst)
