import { Box, Button, CssVarsProvider, } from '@mui/joy';
import { IconButton, Grid } from '@mui/material';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { employeeNumber } from 'src/views/Constant/Constant';
import MasterLayout from '../MasterComponents/MasterLayout';
import EditIcon from '@mui/icons-material/Edit';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import SaveIcon from '@mui/icons-material/Save';

const EmployeeTypeMast = () => {
    const [count, setCount] = useState(0);
    const [tableData, setTableData] = useState([])
    const [empType, setEmptype] = useState('')
    const [status, setStatus] = useState(false)
    const [contract, setContract] = useState(false)
    const [probation, setProbation] = useState(false)
    const [training, setTraining] = useState(false)
    const [permanent, setPermanent] = useState(false)
    const [slno, setSlno] = useState(0)
    const [updateFlag, setUpdateFlag] = useState(0)

    const postData = useMemo(() => {
        return {
            emptype_name: empType,
            el_aplicable: status === true ? 1 : 0,
            is_type: permanent === true ? 1 : contract === true ? 2 : probation === true ? 3 : training === true ? 4 : 0,
            create_user: employeeNumber()
        }
    }, [empType, status, contract, permanent, probation, training])

    const updateData = useMemo(() => {
        return {
            emptype_name: empType,
            el_aplicable: status === true ? 1 : 0,
            is_type: permanent === true ? 1 : contract === true ? 2 : probation === true ? 3 : training === true ? 4 : 0,
            edit_user: employeeNumber(),
            emptype_slno: slno
        }
    }, [empType, status, contract, permanent, probation, training, slno])

    const clearForm = useCallback(() => {
        setEmptype('')
        setStatus(false)
        setProbation(false)
        setTraining(false)
        setPermanent(false)
        setContract(false)
    }, [])

    // Submit 
    const onSubmitEmployeetype = useCallback(async (e) => {
        e.preventDefault();
        if (updateFlag === 1) {
            const result = await axioslogin.patch('/emptype', updateData)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setCount(count + 1)
                setUpdateFlag(0)
                clearForm()
            }
            else if (success === 7) {
                infoNofity(message)
                clearForm()
            }
            else {
                infoNofity(message)
                clearForm()
            }
        } else {
            const result = await axioslogin.post('/emptype', postData);
            const { success, message } = result.data;
            if (success === 2 || success === 0 || success === 7) {
                infoNofity(message);
                clearForm()
            } else {
                succesNofity(message);
                clearForm()
                setCount(count + 1);
            }
        }
    }, [postData, updateFlag, clearForm, count, updateData])

    // get api call for employee type
    useEffect(() => {
        const getEmpType = async () => {
            const result = await axioslogin.get('/emptype');
            const { success, data, message } = result.data;
            if (success === 0 || success === 2) {
                infoNofity(message);
                setTableData([]);
            } else {
                setTableData(data);
                setCount(0)
            }
        }
        getEmpType();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'emptype_slno' },
        { headerName: 'Type', field: 'emptype_name', filter: true, width: 150 },
        { headerName: 'Status ', field: 'Astatus', filter: true, width: 250 },
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </IconButton>

        },
    ])

    const getDataTable = useCallback((params) => {
        setUpdateFlag(1)
        const { emptype_name, status, is_type, emptype_slno } = params.data
        setEmptype(emptype_name)
        setStatus(status === 1 ? true : false)
        setProbation(is_type === 3 ? true : false)
        setTraining(is_type === 4 ? true : false)
        setPermanent(is_type === 1 ? true : false)
        setContract(is_type === 2 ? true : false)
        setSlno(emptype_slno)
    }, [])

    return (

        <MasterLayout title={"Employee Type"} displayClose={true}>
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", p: 1 }}>
                            <JoyInput
                                placeholder='Employee Type*'
                                type="text"
                                size="sm"
                                name="empType"
                                value={empType}
                                onchange={setEmptype}
                            />
                        </Box>
                        <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Permanent'
                                    checked={permanent}
                                    onchange={(e) => setPermanent(e.target.checked)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Contract'
                                    checked={contract}
                                    onchange={(e) => setContract(e.target.checked)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Probation'
                                    checked={probation}
                                    onchange={(e) => setProbation(e.target.checked)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Training'
                                    checked={training}
                                    onchange={(e) => setTraining(e.target.checked)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%", p: 1, display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Status'
                                    checked={status}
                                    onchange={(e) => setStatus(e.target.checked)}
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
                                    onClick={onSubmitEmployeetype}
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
                </Grid >
            </Box >
        </MasterLayout >
    )
}

export default memo(EmployeeTypeMast) 
