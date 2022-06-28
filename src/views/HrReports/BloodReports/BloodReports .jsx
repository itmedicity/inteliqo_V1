import { IconButton, Button, Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import PageLayoutReports from 'src/views/CommonCode/PageLayoutReports'
import BloodgrpTable from './BloodgrpTable'
import { axioslogin } from 'src/views/Axios/Axios'
import BloodCheckboxTable from './BloodCheckboxTable'
import SearchIcon from '@mui/icons-material/Search';
import Blood from './Blood'


const BloodReports = () => {

    const [bloodgrp, setbloodgrp] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [data, setData] = useState(0);

    const getCheckedValue = (row) => {
        setbloodgrp(row)
    }
    console.log(bloodgrp)
    const getEmployeeBlood = async () => {
        const result = await axioslogin.post('/reports/bloodgroup/byid', bloodgrp)
        console.log(result);
        const { success, data } = result.data
        if (success === 1) {
            setTableData(data)
            setData(1)
        }
    }

    return (
        < PageLayoutReports
            heading="Employee Bloodgroup Report"
        >
            <Box
                sx={{
                    padding: 0,
                    display: 'flex',
                    flexDirection: "row",
                    height: 600,
                    boxShadow: 0
                }}
            >
                <Paper sx={{ width: '20%', boxShadow: 0, }}>
                    <Blood onSelectionChange={getCheckedValue}
                        getEmployeeBlood={getEmployeeBlood} />
                </Paper>
                <Paper sx={{ width: '80%', boxShadow: 0, ml: 1 }}>

                    {
                        data === 1 ? <BloodgrpTable
                            tableData={tableData}
                        /> : null
                    }
                </Paper>
            </Box>
        </PageLayoutReports >
    )
}

// const [bloodgrp, Setbloodgrp] = useState([]);

// //console.log(bloodgrp)
// const getDetails = async (e) => {
//     if (e.target.checked === true) {
//         Setbloodgrp([...bloodgrp, e.target.value])
//     }
//     else {
//         const arr = bloodgrp.filter((val) => {
//             return val !== e.target.value
//         })
//         //console.log(arr)
//         Setbloodgrp(arr)
//     }
// }
// // const getDetails = async (e) => {
// //     Setbloodgrp([...bloodgrp, e.target.value])
// // }
// console.log(bloodgrp);

// const postdata = {
//     bloodgrp: bloodgrp
// }

// const [data, setData] = useState(0);
// const [tableData, setTableData] = useState([]);

// const getEmployeeBloodgrp = async () => {
//     const result = await axioslogin.post('/reports/bloodgroup/byid', postdata)
//     const { success, data } = result.data
//     if (success === 1) {
//         setTableData(data)
//         setData(1)
//     }
// }

// return (
//     <PageLayoutReports
//         heading="Employee BloodGroup Report">
//         {/* <div className="card"> */}
//         <div className="col-md-12 p-0">
//             <div className="row">
//                 <div className="col-md-2 p-0">
//                     <div className="card">
//                         <div className="card-header ">
//                             <div className="row">
//                                 <div className="d-flex justify-content-between">
//                                     <div className="col-md-1">
//                                         <IconButton
//                                             aria-label="add"
//                                             onClick={getEmployeeBloodgrp}
//                                             sx={{ color: "#37575f", padding: '0rem' }}
//                                             size='small'
//                                         >
//                                             <SearchIcon className="text-info" size='inherit' />
//                                         </IconButton>
//                                         {/* <Button color="primary" onClick={getEmployeeBloodgrp} >Submit</Button> */}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         {/* <BloodCheckboxTable onChange={getDetails} /> */}
//                         <Blood />
//                     </div>
//                 </div>
//                 <div className="col-md-10 p-0">
//                     {
//                         data === 1 ? <BloodgrpTable
//                             tableData={tableData}
//                         /> : null
//                     }
//                 </div>
//             </div>
//         </div>
//         {/* </div> */}
//     </PageLayoutReports >
// )

export default BloodReports