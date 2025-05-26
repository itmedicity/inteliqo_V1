import { Box } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { allLeavesConvertAnArray } from 'src/redux/reduxFun/reduxHelperFun'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import CustoTypography from 'src/views/Component/MuiCustomComponent/CustoTypography'

const EmployeeDetails = ({ empdata }) => {

    const dataTabStyle = {
        display: 'flex', flex: 1, justifyContent: 'flex-start'
    }


    const allLeavesArray = useSelector((state) => allLeavesConvertAnArray(state))
    const filterdArray = useMemo(() => allLeavesArray, [allLeavesArray]);
    const { data: leaveData } = filterdArray;


    return (
        <>
            <Paper variant='outlined'>
                <Box sx={{ display: 'flex', p: 1, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }} >
                        <CustmTypog title={'Employee Information'} />
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2, bgcolor: '#D5FBDD' }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Employee #" style={{

                            }} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.emno} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="Name" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography style={{ textTransform: "capitalize" }} title={empdata?.emname?.toLowerCase()} /></Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Department" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography style={{ textTransform: "capitalize" }} title={empdata?.department?.toLowerCase()} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="Section" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography style={{ textTransform: "capitalize" }} title={empdata?.deptSection?.toLowerCase()} /></Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2, bgcolor: '#D5FBDD' }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Designation" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography style={{ textTransform: "capitalize" }} title={empdata?.designation?.toLowerCase()} /></Box>
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Date Of Join" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.em_doj} /></Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }} >
                        <CustmTypog title={'Salary Information'} />
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2, bgcolor: '#D5FBDD' }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Gross Salary" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.grosssalary} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="ESI" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={0} /></Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="PF" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={0} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="LWF" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.lwfamount} /></Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2, bgcolor: '#D5FBDD' }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="NPS" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.npsamount} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="" fontSize={400} /></Box>
                            <Box sx={dataTabStyle} ></Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', p: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }} >
                        <CustmTypog title={'Leave Information'} />
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2, bgcolor: '#D5FBDD' }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Sick Leave" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={leaveData?.filter((val) => val.type === 'SL')?.length} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="Earn Leave" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={leaveData?.filter((val) => val.type === 'EL')?.length} /></Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Casual Leave" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={leaveData?.filter((val) => val.type === 'CL')?.length} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="LWP" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={leaveData?.filter((val) => val.type === 'LWP')[0]?.count} /></Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ></Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }} >
                        <CustmTypog title={'Attendnace Information'} />
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2, bgcolor: '#D5FBDD' }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Total Work Day" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.toalDays} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="Total Present Day" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.totalP} /></Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Holiday" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.totalH} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="LOP" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.lwfamount} /></Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, py: 0.2 }} >
                            <Box sx={{ flex: 1 }} ><CustoTypography title="Total Leave" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ><CustoTypography title={empdata?.npsamount} /></Box>
                            <Box sx={{ flex: 1, }} ><CustoTypography title="" fontSize={250} /></Box>
                            <Box sx={dataTabStyle} ></Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}

export default memo(EmployeeDetails) 