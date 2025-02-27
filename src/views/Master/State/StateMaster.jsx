import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import NationSlnoSelection from 'src/views/CommonCode/NationSlnoSelection'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Button, Box, CssVarsProvider } from '@mui/joy'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, IconButton } from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'

const StateMaster = () => {
    const [count, setCount] = useState(0);
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [nation, setNation] = useState(0)

    //Initializing
    const [type, setType] = useState({
        state_name: '',
        state_nat_slno: '',
        state_status: false

    });

    //destructuring
    const { state_name, state_status } = type;

    const updateType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }, [type])

    //insert
    const postStateData = useMemo(() => {
        return {
            state_name,
            state_nat_slno: nation,
            state_status: state_status === true ? 1 : 0,
            create_user: employeeIdNumber()
        }
    }, [state_name, nation, state_status])

    //Form Reseting
    const resetForm = useMemo(() => {
        return {
            state_name: '',
            state_nat_slno: '',
            state_status: false
        }
    }, [])

    const updatedata = useMemo(() => {
        return {
            state_name,
            state_nat_slno: nation,
            state_status: state_status === true ? 1 : 0,
            edit_user: employeeIdNumber(),
            state_slno: slno
        }
    }, [state_name, nation, state_status, slno])

    //Form Submitting
    const submitType = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/state', updatedata)
            const { message, success } = result.data;
            if (success === 2) {
                setType(resetForm);
                setCount(count + 1);
                succesNofity(message);
                setFlag(0)
                setNation(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage)
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/state', postStateData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setType(resetForm);
                setNation(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }, [postStateData, count, updatedata, resetForm, flag])

    //Getdata
    useEffect(() => {
        const getStateList = async () => {
            const result = await axioslogin.get('/state')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([]);
            }
        }
        getStateList();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'state_slno' },
        { headerName: 'State Name', field: 'state_name', filter: true, width: 150 },
        { headerName: 'Nation', field: 'nat_name', filter: true, width: 150 },
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
        const { state_slno, state_name, state_nat_slno, state_status } = params.data
        const frmdata = {
            state_name: state_name,
            state_status: state_status === 1 ? true : false
        }
        setType(frmdata)
        setSlno(state_slno)
        setNation(state_nat_slno)
    }, [])

    return (
        <MasterLayout title="State Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'State Name'}
                                type="text"
                                size="sm"
                                name="state_name"
                                value={state_name}
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <NationSlnoSelection value={nation} setValue={setNation} />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={state_status}
                                name="state_status"
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitType}
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

export default memo(StateMaster) 
