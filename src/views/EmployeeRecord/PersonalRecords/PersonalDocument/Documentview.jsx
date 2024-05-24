import { Box } from '@mui/joy'
import React, { useEffect, useState, lazy, memo } from 'react'
// import Applicationform from 'src/views/recruitment/ApplicationForm/Applicationform'



const EmployeeChecklist = lazy(() => import('./EmployeeFileCheck/EmployeeChecklist'))
const Employeefulldetails = lazy(() => import('./EmployeeFileCheck/Employeefulldetails'))
const Viewpageall = lazy(() => import('../PersonalDocument/Viewpageall'))
const Applicationform = lazy(() => import('src/views/recruitment/ApplicationForm/Applicationform'))


const Documentview = ({ selectedRowData, setflag, Files, setFiles, src, setSrc, showGeneral, setShowGeneral, setEmpdata,
    checklistid, Empdata, itemname, }) => {
    const [empdata, setDetails] = useState({ emp_name: "", sect_name: "", em_no: "", desg_name: "" })
    // const { emp_name, sect_name, em_no, desg_name } = empdata

    useEffect(() => {
        if (Object.keys(selectedRowData).length !== 0) {
            const { emp_name, sect_name, em_no, desg_name, em_id } = selectedRowData
            const obj = {
                emp_name: emp_name === '' ? 'Not Updated' : emp_name.toLowerCase(),
                sect_name: sect_name === '' ? 'Not Updated' : sect_name.toLowerCase(),
                em_no: em_no,
                desg_name: desg_name === '' ? 'Not Updated' : desg_name.toLowerCase(),
                em_id: em_id
            }
            setDetails(obj)
        }
        else {
            setDetails()
        }
    }, [selectedRowData])

    return (

        <Box sx={{ height: window.innerHeight - 100, }}>
            {/* Employeefulldetails  the page which shows the entered forms in the top of personal record */}
            {showGeneral === 1 ? <Employeefulldetails empdata={empdata} setShowGeneral={setShowGeneral} /> :
                // Viewpageall  the page shows in the left side 
                showGeneral === 2 ? <Viewpageall Files={Files} checklistid={checklistid} Empdata={Empdata} setEmpdata={setEmpdata}
                    itemname={itemname} setShowGeneral={setShowGeneral} selectedRowData={selectedRowData} /> :
                    showGeneral === 3 ? <Applicationform /> :
                        // EmployeeChecklist  the page show in the front
                        <EmployeeChecklist setShowGeneral={setShowGeneral} empdata={empdata} selectedRowData={selectedRowData} setflag={setflag} Files={Files} setFiles={setFiles} src={src} setSrc={setSrc} />
            }


        </Box>

    )
}

export default memo(Documentview)