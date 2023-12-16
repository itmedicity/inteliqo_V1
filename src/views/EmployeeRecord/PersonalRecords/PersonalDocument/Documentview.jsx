import { Box } from '@mui/joy'
import React, { useEffect, useState, lazy, memo } from 'react'



const EmployeeChecklist = lazy(() => import('./EmployeeFileCheck/EmployeeChecklist'))

const Documentview = ({ selectedRowData, setflag, Files, setFiles, src, setSrc }) => {
    const [empdata, setDetails] = useState({ emp_name: "", sect_name: "", em_no: "", desg_name: "" })
    // const { emp_name, sect_name, em_no, desg_name } = empdata

    useEffect(() => {
        if (Object.keys(selectedRowData).length !== 0) {
            const { emp_name, sect_name, em_no, desg_name } = selectedRowData
            const obj = {
                emp_name: emp_name === '' ? 'Not Updated' : emp_name.toLowerCase(),
                sect_name: sect_name === '' ? 'Not Updated' : sect_name.toLowerCase(),
                em_no: em_no,
                desg_name: desg_name === '' ? 'Not Updated' : desg_name.toLowerCase(),
            }
            setDetails(obj)
        }
        else {
            setDetails()
        }
    }, [selectedRowData])

    return (

        <Box sx={{}}>

            <EmployeeChecklist empdata={empdata} selectedRowData={selectedRowData} setflag={setflag} Files={Files} setFiles={setFiles} src={src} setSrc={setSrc} />

        </Box>

    )
}

export default memo(Documentview)