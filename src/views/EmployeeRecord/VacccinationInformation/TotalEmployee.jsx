import { Box, } from '@mui/joy'
import { Paper, } from '@mui/material'
import React, { useEffect, useMemo, useState ,memo} from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout'

const TotalEmployee = ({ item, setShowGeneral }) => {
  const empData=useMemo(()=>item,[item])

  const [data, setData] = useState([])
  useEffect(() => {
    if (Object.keys(empData).length > 0) {
    const notVaccinated =
      
    empData?.filter(
        (val) =>
          val.first_dose_status === 1 &&
          val.second_dose_status === 1 &&
          val.third_dose_status === 1 &&
          val.booster_dose_status === 1,
      )
    const dataWithStatus = notVaccinated?.map((record, index) => ({
      ...record,
      sl_no: index + 1,
    }))
    setData(dataWithStatus)
    }else{
        setData([])
    }
  }, [empData])

  const [columnDef] = useState([
    { headerName: 'Sl No', field: 'sl_no' },
    { headerName: 'Emp ID', field: 'em_no', filter: true },
    { headerName: 'Employee Name', field: 'em_name' },
    { headerName: 'Department', field: 'dept_name' },
    { headerName: 'Department Section', field: 'sect_name' },
  ])

  return (
      <DasboardCustomLayout  title={"Total Vaccinated Emplolyee"} displayClose={true} setClose={setShowGeneral} >

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

export default memo(TotalEmployee)
