import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper } from '@mui/material'
import React, { useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux';
import { planInitialState } from 'src/views/Attendance/DutyPlan/DutyPlanFun/DutyPlanFun';
import { useDispatch } from 'react-redux';
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux';
import DeptSectByEMployeeSelect from 'src/views/MuiComponents/DeptSectByEMployeeSelect';

const EarningsDeduction = () => {

    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [emNumList, setEmNumList] = useState(0)


    return (
        <CustomLayout title="Employee Earn/Deduction" displayClose={true} >
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                    <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                        <DeptSelectByRedux setValue={setDept} value={dept} />
                    </Box>
                    <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }} >
                        <DeptSecSelectByRedux dept={dept} setValue={setDeptSection} value={deptSection} />
                    </Box>
                    <Box sx={{ display: 'flex', mt: 0.5, px: 0.3, }}>
                        <DeptSectByEMployeeSelect deptSect={deptSection} setValue={setEmNumList} value={emNumList} />
                    </Box>
                </Box>
            </Box>
        </CustomLayout>
    )
}

export default EarningsDeduction