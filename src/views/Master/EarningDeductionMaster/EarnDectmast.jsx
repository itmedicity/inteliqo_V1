import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import { Grid, IconButton } from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import EarnTypeSelect from '../MasterComponents/EarnTypeSelect';

const EarnDectmast = () => {

    // set count for table element refresh

    const [count, setcount] = useState(0)
    const [earn, setEarn] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)

    // use state
    const [earndecData, setearnDeduct] = useState({
        ern_deducttype: "",
        incl_esi: false,
        inc_lwf: false,
        inclu_pf: false,
        inclu_protx: false,
        earndec_status: false
    });
    // destructuring data
    const { ern_deducttype, incl_esi, inc_lwf, inclu_pf, inclu_protx, earndec_status } = earndecData

    // on change function 
    const updateFormData = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setearnDeduct({ ...earndecData, [e.target.name]: value })
    }, [earndecData])

    //default state
    const deful = useMemo(() => {
        return {
            ern_deducttype: " ",
            incl_esi: false,
            inc_lwf: false,
            inclu_pf: false,
            inclu_protx: false,
            earndec_status: false
        }
    }, [])

    // on submit
    const eandeduct = useMemo(() => {
        return {
            earnded_name: ern_deducttype,
            include_esi: incl_esi === true ? 1 : 0,
            include_lwf: inc_lwf === true ? 1 : 0,
            include_pf: inclu_pf === true ? 1 : 0,
            include_protax: inclu_protx === true ? 1 : 0,
            erning_type_id: earn,
            earnded_status: earndec_status === true ? 1 : 0,
            create_user: employeeNumber()
        }
    }, [ern_deducttype, earn, incl_esi, inc_lwf, inclu_pf, inclu_protx, earndec_status])

    const updateData = useMemo(() => {
        return {
            earnded_name: ern_deducttype,
            include_esi: incl_esi === true ? 1 : 0,
            include_lwf: inc_lwf === true ? 1 : 0,
            include_pf: inclu_pf === true ? 1 : 0,
            include_protax: inclu_protx === true ? 1 : 0,
            erning_type_id: earn,
            earnded_status: earndec_status === true ? 1 : 0,
            edit_user: employeeNumber(),
            earnded_id: slno
        }
    }, [ern_deducttype, earn, incl_esi, inc_lwf, inclu_pf, inclu_protx, slno, earndec_status])

    const submitearndeduct = useCallback(async (e) => {
        e.preventDefault()
        if (flag === 1) {
            const result = await axioslogin.patch('/earn', updateData)
            const { success, message } = result.data;
            if (success === 0 && success === 1) {
                infoNofity(message);
            } else if (success === 2) {
                succesNofity(message);
                setearnDeduct(deful)
                setEarn(0)
                setFlag(0)
                setcount(count + 1);
            } else {
                errorNofity(message);
            }
        } else {
            const result = await axioslogin.post('/earn', eandeduct)
            const { success, message } = result.data;
            if (success === 0 && success === 2) {
                infoNofity(message);
            } else if (success === 1) {
                succesNofity(message);
                setearnDeduct(deful)
                setEarn(0)
                setcount(count + 1);
            } else {
                errorNofity(message);
            }
        }
    }, [flag, count, updateData, deful, eandeduct])

    // useeffect for get data to table
    useEffect(() => {
        const getdata = async () => {
            const result = await axioslogin.get('/earn');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setcount(0)
            } else {
                setTableData([])
            }
        }
        getdata();
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'earnded_id' },
        { headerName: 'Earn/Deduction', field: 'earnded_name', filter: true, width: 250 },
        { headerName: 'Esi', field: 'esi', filter: true, width: 100 },
        { headerName: 'Include Lwf', field: 'lwf', filter: true, width: 100 },
        { headerName: 'Include Pf', field: 'pf', filter: true, width: 100 },
        { headerName: 'Include Pro tax', field: 'protax', filter: true, width: 100 },
        { headerName: 'Earn Type', field: 'earning_type_name', filter: true, width: 150 },
        { headerName: 'Status ', field: 'status', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { earnded_id, earnded_name, include_esi, include_lwf, include_pf, include_protax,
            erning_type_id, earnded_status } = params.data
        const frmdata = {
            ern_deducttype: earnded_name,
            incl_esi: include_esi === 1 ? true : false,
            inc_lwf: include_lwf === 1 ? true : false,
            inclu_pf: include_pf === 1 ? true : false,
            inclu_protx: include_protax === 1 ? true : false,
            earndec_status: earnded_status === 1 ? true : false
        }
        setearnDeduct(frmdata)
        setSlno(earnded_id)
        setEarn(erning_type_id)
    }, [])

    return (
        <MasterLayout title="Earnings/Deduction Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Earn Deduction'}
                                type="text"
                                size="sm"
                                name="ern_deducttype"
                                value={ern_deducttype}
                                onchange={(e) => updateFormData(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <EarnTypeSelect value={earn} setValue={setEarn} />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5, display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Include Esi'
                                    checked={incl_esi}
                                    name="incl_esi"
                                    onchange={(e) => updateFormData(e)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Include Lwf'
                                    checked={inc_lwf}
                                    name="inc_lwf"
                                    onchange={(e) => updateFormData(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5, display: 'flex', flexDirection: 'row' }}>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Include Pf'
                                    checked={inclu_pf}
                                    name="inclu_pf"
                                    onchange={(e) => updateFormData(e)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Include Pro tax'
                                    checked={inclu_protx}
                                    name="inclu_protx"
                                    onchange={(e) => updateFormData(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={earndec_status}
                                name="earndec_status"
                                onchange={(e) => updateFormData(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitearndeduct}
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

export default memo(EarnDectmast) 
