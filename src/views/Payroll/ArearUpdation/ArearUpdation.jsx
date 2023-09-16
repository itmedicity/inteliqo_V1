import React, { memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import EarnDeductionSelection from 'src/views/MuiComponents/EarnDeductionSelection'
import EarnTypeSelect from 'src/views/MuiComponents/EarnTypeSelect'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { TextField, Tooltip } from '@mui/material'

const ArearUpdation = () => {

    const [dept, setDepartment] = useState(0)
    const [deptSect, setDepartSection] = useState(0)
    const [earntype, setEarntype] = useState(0)
    const [wage, setWage] = useState(0)
    const [EmpAllowance, setEmployeeAllowance] = useState([])
    const [Empno, setEmpNo] = useState(0)

    const getEmpNO = async (e) => {
        setEmpNo(e.target.value)
    }

    const getData = useCallback(async () => {

    }, [])

    return (
        <CustomLayout title="Arear Updation" displayClose={true} >
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <DeptSelectByRedux setValue={setDepartment} value={dept} />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                        <DeptSecSelectByRedux dept={dept} setValue={setDepartSection} value={deptSect} />
                    </Box>
                    <Tooltip title="Employee Number" followCursor placement='top' arrow>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
                            <TextField fullWidth
                                id="fullWidth" size="small"
                                onChange={getEmpNO}
                            />
                        </Box>
                    </Tooltip>
                    <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 1, }, justifyContent: 'flex-start' }} >
                        <CssVarsProvider>
                            <Box sx={{ p: 0.2 }} >
                                <Button aria-label="Like" variant="outlined" color="neutral" onClick={getData} sx={{
                                    color: '#90caf9'
                                }} >
                                    <PublishedWithChangesIcon />
                                </Button>
                            </Box>
                        </CssVarsProvider>
                    </Box>
                </Box>
            </Box>
        </CustomLayout>
    )
}

export default memo(ArearUpdation)