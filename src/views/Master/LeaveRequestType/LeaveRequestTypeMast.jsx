import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { useMemo } from 'react'

const LeaveRequestTypeMast = () => {
    const [count, setCount] = useState(0);
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [slno, setSlno] = useState(0)

    //Intializing
    const [type, setType] = useState({
        lrequest_type: '',
        lrequest_short: '',
        lrequest_status: false
    });

    //Destructuring
    const { lrequest_type, lrequest_short, lrequest_status } = type;

    const updateType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }, [type])

    const postLeaveRequestData = useMemo(() => {
        return {
            lrequest_type,
            lrequest_short,
            lrequest_status: lrequest_status === true ? 1 : 0,
            create_user: employeeNumber()
        }
    }, [lrequest_type, lrequest_short, lrequest_status])

    const resetForm = useMemo(() => {
        return {
            lrequest_type: '',
            lrequest_short: '',
            lrequest_status: false
        }
    }, [])

    const updateLeaveRequestData = useMemo(() => {
        return {
            lrequest_type,
            lrequest_short,
            lrequest_status: lrequest_status === true ? 1 : 0,
            lrequest_slno: slno,
            edit_user: employeeNumber()
        }
    }, [lrequest_type, lrequest_short, lrequest_status, slno])

    //Insert
    const submitType = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/leaveRequestType', updateLeaveRequestData)
            const { message, success } = result.data;
            if (success === 2) {
                setType(resetForm);
                succesNofity(message);
                setCount(count + 1);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/leaveRequestType', postLeaveRequestData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setType(resetForm);
            } else if (success === 0) {
                infoNofity(message);
            } else {
                infoNofity(message)
            }
        }
    }, [flag, postLeaveRequestData, updateLeaveRequestData, count, resetForm])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'lrequest_slno' },
        { headerName: 'Leave Request Type', field: 'lrequest_type', filter: true, width: 150 },
        { headerName: 'Request Short Name', field: 'lrequest_short', filter: true, width: 150 },
        { headerName: 'Status ', field: 'status', width: 100 },
        {
            headerName: 'Edit', cellRenderer: params =>
                <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
                    <EditIcon color='primary' />
                </IconButton>
        },
    ])

    //GetData
    useEffect(() => {
        const getTypeList = async () => {
            const result = await axioslogin.get('/leaveRequestType')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        getTypeList();
    }, [count]);

    const getEdit = useCallback((params) => {
        setFlag(1)
        const { lrequest_slno, lrequest_type, lrequest_short, lrequest_status, } = params.data
        const frmdata = {
            lrequest_type: lrequest_type,
            lrequest_short: lrequest_short,
            lrequest_status: lrequest_status === '1' ? true : false
        }
        setType(frmdata)
        setSlno(lrequest_slno)
    }, [])

    return (

        <MasterLayout title="Leave Request Type" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Leave Request Type'}
                                type="text"
                                size="sm"
                                name="lrequest_type"
                                value={lrequest_type}
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Short Name'}
                                type="text"
                                size="sm"
                                name="lrequest_short"
                                value={lrequest_short}
                                onchange={(e) => updateType(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={lrequest_status}
                                name="lrequest_status"
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

export default memo(LeaveRequestTypeMast) 
