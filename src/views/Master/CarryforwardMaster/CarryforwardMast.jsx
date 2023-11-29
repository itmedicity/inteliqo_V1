import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import MasterLayout from '../MasterComponents/MasterLayout'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeptSectionOnlySelect from 'src/views/MuiComponents/JoyComponent/DeptSectionOnlySelect'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoyEmployeeTypeSelect from 'src/views/MuiComponents/JoyComponent/JoyEmployeeTypeSelect'

const CarryforwardMast = () => {
    const [count, setCount] = useState(0);
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [deptSect, setDeptSect] = useState(0)
    const [emptype, setEmptype] = useState(0)
    const [carry, setCarry] = useState({
        dept_sec: '',
        emp_type: '',
        carry_hl: false,
        carry_cl: false,
        carry_el: false,
        carry_sl: false
    })
    const { carry_hl, carry_cl, carry_el, carry_sl } = carry

    const updateCarryForward = useCallback(async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCarry({ ...carry, [e.target.name]: value })
    }, [carry])

    const postdata = useMemo(() => {
        return {
            dept_sec: deptSect,
            emp_type: emptype,
            carry_hl: carry_hl === true ? 1 : 0,
            carry_cl: carry_cl === true ? 1 : 0,
            carry_el: carry_el === true ? 1 : 0,
            carry_sl: carry_sl === true ? 1 : 0,
            create_user: employeeNumber()
        }
    }, [deptSect, emptype, carry_hl, carry_cl, carry_el, carry_sl])

    const resetfrm = useMemo(() => {
        return {
            dept_sec: '',
            emp_type: '',
            carry_hl: false,
            carry_cl: false,
            carry_el: false,
            carry_sl: false
        }
    }, [])

    const patchdata = useMemo(() => {
        return {
            dept_sec: deptSect,
            emp_type: emptype,
            carry_hl: carry_hl === true ? 1 : 0,
            carry_cl: carry_cl === true ? 1 : 0,
            carry_el: carry_el === true ? 1 : 0,
            carry_sl: carry_sl === true ? 1 : 0,
            edit_user: employeeNumber(),
            carry_slno: slno
        }
    }, [slno, deptSect, emptype, carry_hl, carry_cl, carry_el, carry_sl])

    const submitCarryForward = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/carryforward', patchdata)
            const { message, success } = result.data;
            if (success === 2) {
                setCarry(resetfrm);
                setCount(count + 1);
                setDeptSect(0)
                setEmptype(0)
                setSlno(0)
                setFlag(0)
                succesNofity(message);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/carryforward', postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setCarry(resetfrm);
                setDeptSect(0)
                setEmptype(0)
            } else if (success === 0 || success === 3) {
                infoNofity(message);
            }
        }
    }, [flag, resetfrm, count, patchdata, postdata])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'carry_slno', width: 100 },
        { headerName: 'Grade Name', field: 'sect_name', filter: true, width: 150 },
        { headerName: 'Emp Type', field: 'emptype_name', filter: true, width: 150 },
        { headerName: 'NH', field: 'hl', filter: true, width: 100 },
        { headerName: 'CL', field: 'cl', filter: true, width: 100 },
        { headerName: 'EL', field: 'el', filter: true, width: 100 },
        { headerName: 'SL', field: 'sl', filter: true, width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    //GetData
    useEffect(() => {
        const getCarryForward = async () => {
            const result = await axioslogin.get('/carryforward')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getCarryForward();
    }, [count]);

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { carry_slno, dept_sec, emp_type, carry_hl, carry_cl, carry_el, carry_sl } = params.data
        const frmdata = {
            carry_hl: carry_hl === 1 ? true : false,
            carry_cl: carry_cl === 1 ? true : false,
            carry_el: carry_el === 1 ? true : false,
            carry_sl: carry_sl === 1 ? true : false
        }
        setSlno(carry_slno)
        setCarry(frmdata)
        setDeptSect(dept_sec)
        setEmptype(emp_type)
    }, [])

    return (
        <MasterLayout title="Carry Forward Leave Settings" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <DeptSectionOnlySelect sectValue={deptSect} getDeptSection={setDeptSect} />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <JoyEmployeeTypeSelect value={emptype} setValue={setEmptype} />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5, display: 'flex', flexDirection: 'row' }} >
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='National Holiday'
                                    checked={carry_hl}
                                    name="carry_hl"
                                    onchange={(e) => updateCarryForward(e)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Casual Leave'
                                    checked={carry_cl}
                                    name="carry_cl"
                                    onchange={(e) => updateCarryForward(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5, display: 'flex', flexDirection: 'row' }} >
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Earn Leave'
                                    checked={carry_el}
                                    name="carry_el"
                                    onchange={(e) => updateCarryForward(e)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Sick Leave'
                                    checked={carry_sl}
                                    name="carry_sl"
                                    onchange={(e) => updateCarryForward(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitCarryForward}
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
                                height: 400,
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

export default memo(CarryforwardMast) 