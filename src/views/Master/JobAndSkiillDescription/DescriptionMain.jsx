import { Box, } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import MasterLayout from '../MasterComponents/MasterLayout'
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch } from 'react-redux'
import JoyDeptWithName from 'src/views/MuiComponents/JoyComponent/JoyDeptWithName'
import JoyDesgWithName from 'src/views/MuiComponents/JoyComponent/JoyDesgWithName'

const DutyRespos = React.lazy(() => import('./DutiesAndRes'));
const Skill = React.lazy(() => import('./Skill'));

const DescriptionMain = () => {

    const [dept, setDept] = useState(0)
    const [deptName, setDeptName] = useState('')

    const [desg, setDesg] = useState(0)
    const [desgName, setDesgName] = useState('')


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])


    return (
        <MasterLayout title="Job And Skill Descriptions" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                <Paper square variant='outlined' sx={{
                    p: 0.5,
                    mt: 0.5,
                    display: 'flex',
                    alignItems: "center",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                }} >
                    <Box sx={{ flex: 1, px: 0.5 }} >
                        <JoyDeptWithName deptValue={dept} getDept={setDept} setDeptName={setDeptName} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}  >
                        <JoyDesgWithName desgValue={desg} getDesg={setDesg} setDesgName={setDesgName} />
                    </Box>
                </Paper>

                {/* Dutieds And Responsibilities */}
                <DutyRespos
                    selectDesignation={desg}
                    selectedDept={dept}

                />
                {/* slills */}
                <Skill
                    selectDesignation={desg}
                    selectedDept={dept}

                />
            </Box>
        </MasterLayout>
    )
}

export default memo(DescriptionMain)