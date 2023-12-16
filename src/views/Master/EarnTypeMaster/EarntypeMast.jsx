import { Box, Button, CssVarsProvider } from '@mui/joy'
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
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Grid } from '@mui/material'
import { useMemo } from 'react'

const EarntypeMast = () => {

    // usesate for count in crement 

    const [count, setcount] = useState((0))
    const [tableData, setTableData] = useState([])

    // use Sate defintion
    const [dataeartype, stdataearntype] = useState({

        earn_type: "",
        deduction_status: false,
        earntype_status: false
    })

    // Destructuring data
    const { earn_type, deduction_status, earntype_status } = dataeartype

    // onchange feild
    const updateEarnType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        stdataearntype({ ...dataeartype, [e.target.name]: value })
    }, [dataeartype])


    const erntypepostdata = useMemo(() => {
        return {
            earn_type: earn_type,
            deduction_status: deduction_status === true ? 1 : 0,
            earntype_status: earntype_status === true ? 1 : 0,
            create_user: employeeNumber()
        }
    }, [earn_type, deduction_status, earntype_status])

    // reset data
    const reset = useMemo(() => {
        return {
            earn_type: "",
            deduction_status: false,
            earntype_status: false,
        }
    }, [])

    // submit data
    const submitempdata = useCallback(async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/Earntype', erntypepostdata)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            stdataearntype(reset);
            setcount(count + 1)

        } else if (success === 0 || success === 2 || success === 7) {
            infoNofity(message);
        }
    }, [erntypepostdata, reset, count])

    useEffect(() => {
        const gettablelist = async () => {
            const result = await axioslogin.get('/Earntype');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setcount(0)
            } else {
                setTableData([])
            }
        }
        gettablelist();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'erning_type_id' },
        { headerName: 'Earn Type', field: 'earning_type_name', filter: true, width: 150 },
        { headerName: 'Deduction', field: 'deduction', filter: true, width: 150 },
        { headerName: 'Status ', field: 'status', width: 100 },
    ])

    return (
        <MasterLayout title="Earn Type" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Earn Name'}
                                type="text"
                                size="sm"
                                name="earn_type"
                                value={earn_type}
                                onchange={(e) => updateEarnType(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5, display: 'flex', flexDirection: 'row' }} >
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Deduction'
                                    checked={deduction_status}
                                    name="deduction_status"
                                    onchange={(e) => updateEarnType(e)}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <JoyCheckbox
                                    label='Status'
                                    checked={earntype_status}
                                    name="earntype_status"
                                    onchange={(e) => updateEarnType(e)}
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
                                    onClick={submitempdata}
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

export default memo(EarntypeMast) 
