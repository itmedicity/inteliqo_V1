import React, { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import StateSelect from 'src/views/CommonCode/StateSelect'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useMemo } from 'react'

const DistrictMaster = () => {
    const [count, setCount] = useState(0);
    const [state, setState] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)

    //Initializing
    const [type, setType] = useState({
        dist_name: '',
        dist_state_slno: '',
        dist_status: false
    })

    //Destucturing
    const { dist_name, dist_status } = type;
    const updateType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }, [type])

    //Insert
    const postDistData = useMemo(() => {
        return {
            dist_name,
            dist_state_slno: state,
            dist_status: dist_status === true ? 1 : 0,
            create_user: employeeIdNumber()
        }
    }, [dist_name, state, dist_status])

    const updateData = useMemo(() => {
        return {
            dist_name,
            dist_state_slno: state,
            dist_status: dist_status === true ? 1 : 0,
            dist_slno: slno,
            edit_user: employeeIdNumber()
        }
    }, [dist_name, state, slno, dist_status])

    //Form resting
    const resetForm = useMemo(() => {
        return {
            dist_name: '',
            dist_state_slno: '',
            dist_status: false
        }
    }, [])

    //Form Submitting
    const submitType = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/district', updateData)
            const { message, success } = result.data;
            if (success === 2) {
                setType(resetForm);
                succesNofity(message);
                setCount(count + 1);
                setState(0)
                setFlag(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/district', postDistData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setType(resetForm);
                setState(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }, [flag, count, postDistData, updateData, resetForm])

    //Getdata
    useEffect(() => {
        const getTypeList = async () => {
            const result = await axioslogin.get('/district')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                setTableData([])
            }
        }
        getTypeList();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'dist_slno' },
        { headerName: 'District Name', field: 'dist_name', filter: true, width: 150 },
        { headerName: 'State Name', field: 'state_name', filter: true, width: 150 },
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
        const { dist_slno, dist_name, dist_status, dist_state_slno, } = params.data
        const frmdata = {
            dist_name: dist_name,
            dist_status: dist_status === 1 ? true : false
        }
        setType(frmdata)
        setSlno(dist_slno)
        setState(dist_state_slno)
    }, [])

    return (
        <MasterLayout title="District Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'District Name'}
                                type="text"
                                size="sm"
                                name="dist_name"
                                value={dist_name}
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <StateSelect value={state} setValue={setState} />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={dist_status}
                                name="dist_status"
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

export default memo(DistrictMaster) 
