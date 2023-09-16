import { Box, Button, CssVarsProvider } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import EarnDeductionSelection from 'src/views/MuiComponents/EarnDeductionSelection'
import EarnTypeSelect from 'src/views/MuiComponents/EarnTypeSelect'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { ToastContainer } from 'react-toastify'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import AllowanceBulkUpdation from './AllowanceBulkUpdation'

const BulkWageUpdation = () => {
    const [dept, setDepartment] = useState(0)
    const [deptSect, setDepartSection] = useState(0)
    const [earntype, setEarntype] = useState(0)
    const [wage, setWage] = useState(0)
    const [EmpAllowance, setEmployeeAllowance] = useState([])

    const getData = useCallback(async () => {
        if (dept !== 0 && deptSect !== 0 && earntype !== 0 && wage !== 0) {
            console.log("gh");
            const postData = {
                em_department: dept,
                em_dept_section: deptSect,
                em_earning_type: earntype,
                em_salary_desc: wage
            }
            const result = await axioslogin.post('/common/getEmpAllowance', postData)
            const { success, data, message } = result.data
            if (success === 1) {
                console.log(data);
                setEmployeeAllowance(data)
            }
            else {
                warningNofity(message)
            }
        } else {
            warningNofity("Choose All Option")
        }

    }, [dept, deptSect, earntype, wage])

    return (
        <>
            <ToastContainer />
            <CustomLayout title="Wages Bulk Updation" displayClose={true} >
                <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DeptSelectByRedux setValue={setDepartment} value={dept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <DeptSecSelectByRedux dept={dept} setValue={setDepartSection} value={deptSect} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <EarnTypeSelect setValue={setEarntype} value={earntype} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3, }} >
                            <EarnDeductionSelection setValue={setWage} value={wage} />
                        </Box>
                        <Box sx={{ display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, }, justifyContent: 'flex-start' }} >
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
                    <Box sx={{ p: 2 }}>
                        {
                            EmpAllowance?.map((val, index) => {
                                return <AllowanceBulkUpdation value={val} key={index} />
                            })
                        }
                    </Box>
                </Box>
            </CustomLayout>
        </>
    )
}

export default memo(BulkWageUpdation) 