import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { employeeNumber } from 'src/views/Constant/Constant'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DepartmentSelect from 'src/views/Master/MasterComponents/DepartmentSelect'
import { setDepartment } from 'src/redux/actions/Department.action'
import { useDispatch } from 'react-redux'

const DepartmentSectionMast = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    //    Department Selection Context Calling 
    const [dept, SetDept] = useState(0)
    //  State Update
    const [deptSectionName, updateSectionName] = useState('');
    const [incharge_status, updateincharge] = useState(false);
    const [hod_status, updatehod] = useState(false);
    const [septSectionStatus, updateSectionStat] = useState(false);
    const inchargestatus = incharge_status === true ? 1 : 0;
    const hodstatus = hod_status === true ? 1 : 0;
    const sectionStatus = septSectionStatus === true ? 1 : 0;
    const [count, setCount] = useState(0);
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)


    const [deptsubtype, setdeptsubtype] = useState({
        general: true,
        ot: false,
        icu: false,
        er: false,
    })
    const { general, ot, icu, er } = deptsubtype

    const updateSectionStatus = useCallback(async (e) => {
        const ob1 = {
            general: false,
            ot: false,
            icu: false,
            er: false,
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setdeptsubtype({ ...ob1, [e.target.name]: value })
    }, [])

    //department sub sectionvalue
    //general-1,ot-2,icu-3,er-4
    const deptSectValus = useMemo(() => {
        return {
            sect_name: deptSectionName,
            dept_id: dept,
            authorization_incharge: inchargestatus,
            authorization_hod: hodstatus,
            sect_status: sectionStatus,
            create_user: employeeNumber(),
            dept_sub_sect: general === true ? 1 : ot === true ? 2 : icu === true ? 3 : er === true ? 4 : 0
        }
    }, [deptSectionName, dept, inchargestatus, hodstatus, sectionStatus, general, icu, ot, er])


    const updateData = useMemo(() => {
        return {
            sect_name: deptSectionName,
            authorization_incharge: inchargestatus,
            authorization_hod: hodstatus,
            sect_status: sectionStatus,
            dept_id: dept,
            edit_user: employeeNumber(),
            sect_id: slno,
            dept_sub_sect: general === true ? 1 : ot === true ? 2 : icu === true ? 3 : er === true ? 4 : 0
        }
    }, [deptSectionName, dept, inchargestatus, hodstatus, sectionStatus, general, icu, ot, er, slno])

    // reset from fn
    const resetSectionDept = useCallback(() => {
        updateSectionName('')
        updateincharge(false)
        updatehod(false)
        updateSectionStat(false)
        SetDept(0)
    }, [])

    // Submit form data
    const submitDeptSectionMast = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/section', updateData)
            const { success, message } = result.data;
            if (success === 2) {
                succesNofity(message)
                setCount(count + 1)
                resetSectionDept();
                setFlag(0)
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/section', deptSectValus)
            const { success, message } = result.data;
            if (success === 1) {
                succesNofity(message)
                resetSectionDept();
                setCount(count + 1)
            } else {
                infoNofity(message)
            }
        }
    }, [flag, count, resetSectionDept, deptSectValus, updateData])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'sect_id', width: 100 },
        { headerName: 'Section Name', field: 'sect_name', filter: true, width: 250 },
        { headerName: 'Department Name', field: 'dept_name', filter: true, width: 200 },
        { headerName: 'Sub Section', field: 'sub_sect_name', filter: true, width: 150 },
        { headerName: 'Incharge Authorization', field: 'incharge', filter: true, width: 150 },
        { headerName: 'HOD Authorization', field: 'hod', filter: true, width: 150 },
        { headerName: 'Status ', field: 'status', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    useEffect(() => {
        const getdeptsecData = async () => {
            const result = await axioslogin.get('/section');
            const data = result.data;
            if (data.success === 1) {
                setTableData(data.data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getdeptsecData();
    }, [count]);

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { sect_id, sect_name, dept_sub_sect, authorization_incharge,
            authorization_hod, sect_status, dept_id } = params.data
        const checkboxdata = {
            general: dept_sub_sect === 1 ? true : false,
            ot: dept_sub_sect === 2 ? true : false,
            icu: dept_sub_sect === 3 ? true : false,
            er: dept_sub_sect === 4 ? true : false
        }
        updateincharge(authorization_incharge === 1 ? true : false)
        updatehod(authorization_hod === 1 ? true : false)
        updateSectionStat(sect_status === 1 ? true : false)
        setdeptsubtype(checkboxdata)
        updateSectionName(sect_name)
        SetDept(dept_id)
        setSlno(sect_id)
    }, [])

    return (
        <MasterLayout title="Department Section" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Department Seciotn Name*'}
                                type="text"
                                size="sm"
                                name="deptSectionName"
                                value={deptSectionName}
                                onchange={(e) => updateSectionName(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <DepartmentSelect deptValue={dept} getDept={SetDept} />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Authorization for Leave and OT (Incharge)'
                                checked={incharge_status}
                                name="incharge_status"
                                onchange={(e) => updateincharge(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Authorization for Leave and OT (HOD)'
                                checked={hod_status}
                                name="hod_status"
                                onchange={(e) => updatehod(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5, display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='ICU'
                                    checked={icu}
                                    name="icu"
                                    onchange={(e) => updateSectionStatus(e)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='ER'
                                    checked={er}
                                    name="er"
                                    onchange={(e) => updateSectionStatus(e)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='OT'
                                    checked={ot}
                                    name="ot"
                                    onchange={(e) => updateSectionStatus(e)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='General'
                                    checked={general}
                                    name="general"
                                    onchange={(e) => updateSectionStatus(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Department Section Status'
                                checked={septSectionStatus}
                                name="septSectionStatus"
                                onchange={(e) => updateSectionStat(e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitDeptSectionMast}
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

export default memo(DepartmentSectionMast) 
