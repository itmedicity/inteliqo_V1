import React, { memo, useEffect, useMemo, useState } from 'react'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { Paper } from '@mui/material'
import SectionBsdEmployee from 'src/views/Component/ReduxComponent/SectionBsdEmployee';
import { useDispatch } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action'
import DeptSectionOnlySelect from 'src/views/MuiComponents/JoyComponent/DeptSectionOnlySelect'
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const DepartmentSecChange = () => {
    // const history = useHistory();
    const dispatch = useDispatch();
    // const { selectEmpName, getDeptSection } = useContext(PayrolMasterContext);

    const [dept, changeDept] = useState(0)
    const [deptsection, changeSection] = useState(0)
    const [emply, getEmployee] = useState(0);
    const [changeSect, setgetSection] = useState(0)

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    //update Data
    const patchData = useMemo(() => {
        return {
            em_dept_section: changeSect,
            em_id: emply.em_id
        }
    }, [changeSect, emply])
    //Update Function
    const submitChange = async (e) => {
        e.preventDefault();
        if (dept === 0 || deptsection === 0) {
            infoNofity("Select Department & department Section")
        } else {
            const result = await axioslogin.patch('/empmast/empmaster/deptsecChange', patchData)
            const { message, success } = result.data;
            if (success === 2) {
                succesNofity(message);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            }
        }

    }

    //Back to home
    // const redirect = () => {
    //     history.push('/Home');
    // }

    return (
        <CustomLayout title="Change Employee Department Section" displayClose={true} >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Paper variant="outlined" sx={{ width: '100%', p: 0.5, display: 'flex', flexDirection: 'row' }}  >
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentDropRedx getDept={changeDept} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DepartmentSectionRedx getSection={changeSection} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <SectionBsdEmployee getEmploy={getEmployee} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5 }}>
                        <DeptSectionOnlySelect getDeptSection={setgetSection} />
                    </Box>
                    <Box sx={{
                        display: 'flex', flex: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0, },
                        justifyContent: 'flex-start', pl: 0.5,
                    }} >
                        <CssVarsProvider>
                            <Button aria-label="Like"
                                size="md"
                                variant="outlined"
                                color="neutral" onClick={submitChange} sx={{
                                    color: '#90caf9'
                                }} >
                                <AddTaskRoundedIcon />
                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Paper>
            </Box>
        </CustomLayout>
        // <Fragment>
        //     <PageLayoutSaveClose
        //         redirect={redirect}
        //         submit={submitChange}
        //     >
        //         <div className="col-md-12">
        //             <div className="row">
        //                 <div className="col-md-3" data-tip="Department Name" data-for='toolTip1' data-place='top'>
        //                     <ReactTooltip id="toolTip1" />
        //                     <DepartmentSelect style={SELECT_CMP_STYLE} />
        //                 </div>
        //                 <div className="col-md-3" data-tip="Department Section Name" data-for='toolTip1' data-place='top'>
        //                     <ReactTooltip id="toolTip1" />
        //                     <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
        //                 </div>
        //                 <div className="col-md-3" data-tip="Employee Name" data-for='toolTip1' data-place='top'>
        //                     <ReactTooltip id="toolTip1" />
        //                     <EmployeeNameSelect style={SELECT_CMP_STYLE} />
        //                 </div>
        //                 <div className="col-md-3" data-tip="Change Department Section" data-for='toolTip1' data-place='top'>
        //                     <ReactTooltip id="toolTip1" />
        //                     <DeptSectionMastSelect style={SELECT_CMP_STYLE} />
        //                 </div>
        //             </div>
        //         </div>
        //     </PageLayoutSaveClose>
        // </Fragment>
    )
}

export default memo(DepartmentSecChange)