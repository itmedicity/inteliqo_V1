import { IconButton, Paper } from '@mui/material'
import React, { useState, memo, useCallback, useEffect } from 'react'
import { employeeNumber } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import DeptSectionOnlySelect from 'src/views/MuiComponents/JoyComponent/DeptSectionOnlySelect'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoySectionEmployee from 'src/views/MuiComponents/JoyComponent/JoySectionEmployee'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useMemo } from 'react'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import DeleteIcon from '@mui/icons-material/Delete';

const HodMarking = () => {
    const [deptSection, getDeptSection] = useState(0)
    const [selectEmp, setSelectEmp] = useState(0)
    const [selectDepSect, setSelectDeptSect] = useState(0)
    const [hodcheck, sethod] = useState(false)
    const [inchargecheck, setincharge] = useState(false)
    const [authorization, setAuthorization] = useState(0)
    const [count, setcount] = useState(0)
    const [data, setData] = useState([]);

    const reset = useCallback(() => {
        getDeptSection(0)
        setSelectEmp(0)
        setSelectDeptSect(0)
        sethod(false)
        setincharge(false)
        setAuthorization(0)
    }, [])

    const updateAuthorization = useCallback((e) => {
        if (e.target.checked === true) {
            sethod(true)
            setincharge(false)
            setAuthorization(1)
        } else {
            setAuthorization(0)
            sethod(false)
            setincharge(false)
        }
    }, [])

    const updateAuthorizationin = useCallback((e) => {
        if (e.target.checked === true) {
            setincharge(true)
            sethod(false)
            setAuthorization(2)
        } else {
            setAuthorization(0)
            setincharge(false)
            sethod(false)
        }
    }, [])

    const postData = useMemo(() => {
        return {
            dept_section: deptSection,
            auth_post: authorization,
            dept_section_post: selectDepSect,
            emp_id: selectEmp,
            create_user: employeeNumber()
        }
    }, [deptSection, authorization, selectDepSect, selectEmp])

    const submitAuthorization = useCallback(async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/authorization', postData)
        const { message, success } = result.data;
        if (success === 1) {
            setcount(count + 1)
            succesNofity(message);
            reset()
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }, [postData, reset, count])

    //Get Data
    useEffect(() => {
        const getauthorization = async () => {
            const result = await axioslogin.get('/authorization')
            const { success, data } = result.data;
            if (success === 1) {
                setData(data);
                setcount(0)
            } else {
                setData([]);
            }
        }
        getauthorization();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'auth_slno' },
        { headerName: 'Department Section ', field: 'dept_name', filter: true, width: 250 },
        { headerName: 'Authorization post ', field: 'auth_post', filter: true, width: 150 },
        { headerName: 'Hod / Incharge Department ', field: 'dept_name_post', filter: true, width: 150 },
        { headerName: 'Hod / Incharge Name ', field: 'name_emp', filter: true, width: 150 },
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => deleteAuthorization(params)} >
                    <DeleteIcon color='primary' />
                </IconButton>

        },
    ])

    const deleteAuthorization = useCallback(async (params) => {
        const { auth_slno, auth_id, post } = params.data
        const postData = {
            hod: post === 1 ? 0 : post === 2 ? 0 : 1,
            incharge: post === 2 ? 0 : post === 1 ? 0 : 1,
            auth_slno: auth_slno,
            auth_id: auth_id,
            em_id: auth_id

        }
        const result = await axioslogin.post('/authorization/inactive', postData)
        const { message, success } = result.data;
        if (success === 1) {
            setcount(count + 1)
            succesNofity(message);
        } else {
            warningNofity(message)
        }
    }, [count])

    return (
        <MasterLayout title={"Department HOD and Incharge Assign"} displayClose={true}>
            <Box sx={{ width: "100%" }} >
                <Paper variant='outlined' square sx={{ width: '100%', display: 'flex', py: 2, px: 0.5 }} >
                    <Box sx={{ flex: 1, px: 0.2 }}>
                        <DeptSectionOnlySelect getDeptSection={getDeptSection} />
                    </Box>
                    <Box sx={{ mt: 1, ml: 2 }}>
                        <JoyCheckbox
                            label='HOD'
                            checked={hodcheck}
                            name="hodcheck"
                            onchange={(e) => updateAuthorization(e)}
                        />
                    </Box>
                    <Box sx={{ mt: 1, ml: 2 }}>
                        <JoyCheckbox
                            label='Incharge'
                            checked={inchargecheck}
                            name="inchargecheck"
                            onchange={(e) => updateAuthorizationin(e)}
                        />
                    </Box>
                    <Box sx={{ flex: 1, ml: 1, px: 0.2 }}>
                        <DeptSectionOnlySelect getDeptSection={setSelectDeptSect} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.2 }}>
                        <JoySectionEmployee setValue={setSelectEmp} deptSect={deptSection} />
                    </Box>
                    <Box sx={{}}>
                        <CssVarsProvider>
                            <Button aria-label="Like" variant="outlined" color="primary" onClick={submitAuthorization} sx={{
                                color: '#90caf9'
                            }} >
                                <AddCircleOutlineIcon />
                            </Button>
                        </CssVarsProvider>
                    </Box>
                </Paper>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={data}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </Box>
        </MasterLayout>
    )
}

export default memo(HodMarking) 
