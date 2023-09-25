import { Box } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Paper } from '@mui/material'
import { memo } from 'react'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'

const Boosterdose = ({ item, setCount, count, setShowGeneral }) => {
 
  const [data, setData] = useState([])

  useEffect(() => {
       if (Object.keys(item).length > 0) {
    const boosterdose =
    
      item?.filter((val) => val.booster_dose_status === 0 && val.booster_dose_given_status === 1)
    setData(boosterdose)
    setCount(0)
       }else{
           setData([])
       }
  }, [item, count, setCount])

  const [columnDef] = useState([
    { headerName: 'Emp ID', field: 'em_no', filter: true },
    { headerName: 'Employee Name', field: 'em_name', filter: true },
    { headerName: 'Department', field: 'dept_name', filter: true },
    { headerName: 'Department Section', field: 'sect_name', filter: true },
  ])

  return (
          <DasboardCustomLayout  title={"Pending Booster Dose"} displayClose={true} setClose={setShowGeneral} >
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

export default memo(Boosterdose)
