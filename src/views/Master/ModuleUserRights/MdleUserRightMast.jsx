import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import GroupSelection from 'src/views/CommonCode/GroupSelection'
// import ModuleSelection from 'src/views/CommonCode/ModuleSelection'
import DeptSectionOnlySelect from 'src/views/MuiComponents/JoyComponent/DeptSectionOnlySelect'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoySectionEmployee from 'src/views/MuiComponents/JoyComponent/JoySectionEmployee'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import { useCallback } from 'react'

const MdleUserRightMast = () => {

    const [moduleUserStaus, setmdlstatus] = useState(false)
    const mdlstatus = moduleUserStaus === true ? 1 : 0;
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(0)
    const [tableData, setTableData] = useState([])
    const [slno, setSlno] = useState(0)

    const [modulegrp, setmodulegrp] = useState(0)
    const [groupName, setGroupName] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [empno, setEmpno] = useState(0)

    const formData = useMemo(() => {
        return {
            emp_slno: empno,
            mdgrp_slno: modulegrp,
            mdlstatus: mdlstatus,
            user_grp_slno: groupName
        }
    }, [groupName, modulegrp, empno, mdlstatus])


    const postEditedData = useMemo(() => {
        return {
            emp_slno: empno,
            mdgrp_slno: modulegrp,
            mdlstatus: mdlstatus,
            mdrte_slno: slno,
            user_grp_slno: groupName
        }
    }, [groupName, modulegrp, empno, slno, mdlstatus])

    const submitUserModuleGroup = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            console.log(postEditedData)
            const result = await axioslogin.patch('/moduleRights', postEditedData)
            const { success, message } = result.data;
            if (success === 2) {
                succesNofity(message);
                setDeptSect(0)
                setmodulegrp(0)
                setGroupName(0)
                setEmpno(0)
                setmdlstatus(false)
                setCount(count + 1)
                setFlag(0)
                setSlno(0)
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/moduleRights', formData);
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message);
                setDeptSect(0)
                setmodulegrp(0)
                setGroupName(0)
                setEmpno(0)
                setmdlstatus(false)
                setCount(count + 1)
            } else if (success === 0) {
                errorNofity(message);
            } else if (success === 2) {
                infoNofity(message.sqlMessage);
            } else if (success === 7) {
                infoNofity(message);
            }
        }
    }, [count, flag, formData, postEditedData])

    useEffect(() => {
        const getUserModuleTablelist = async () => {
            const result = await axioslogin.get('/moduleRights')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getUserModuleTablelist()
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'mdrte_slno' },
        { headerName: 'EMP No', field: 'em_no', filter: true, width: 150 },
        { headerName: 'Name', field: 'em_name', filter: true, width: 150 },
        { headerName: 'Module Group', field: 'module_group_name', filter: true, width: 150 },
        { headerName: 'User Group', field: 'user_group_name', filter: true, width: 150 },
        { headerName: 'Status ', field: 'showstatus', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { emp_slno, mdgrp_slno, status, user_grp_slno, em_dept_section, mdrte_slno } = params.data
        //const mdlStatsus = status === 1 ? true : false;
        setmdlstatus(status === 1 ? true : false)
        setEmpno(emp_slno)
        setDeptSect(em_dept_section)
        setmodulegrp(mdgrp_slno)
        setGroupName(user_grp_slno)
        setSlno(mdrte_slno)
    }, [])

    return (
        <MasterLayout title="User Group Rights" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <DeptSectionOnlySelect sectValue={deptSect} getDeptSection={setDeptSect} />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <JoySectionEmployee value={empno} setValue={setEmpno} deptSect={deptSect} />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <GroupSelection value={groupName} setValue={setGroupName} />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <GroupSelection value={modulegrp} setValue={setmodulegrp} />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label=' User Right Status'
                                checked={moduleUserStaus}
                                name="moduleUserStaus"
                                onchange={(e) => setmdlstatus(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitUserModuleGroup}
                                >
                                    <SaveIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Grid>
                    <Grid item xs={9} lg={9} xl={9} md={9}>
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tableData}
                            sx={{
                                height: 500,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Grid>
                </Grid>
            </Box>
        </MasterLayout>
    )
}

export default memo(MdleUserRightMast) 
