import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import MasterLayout from '../MasterComponents/MasterLayout';
import { ToastContainer } from 'react-toastify';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import { Box, Button, CssVarsProvider } from '@mui/joy';
import { Grid, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import EditIcon from '@mui/icons-material/Edit';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const ProTaxMast = () => {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(0)
    const [tableData, setTableData] = useState([])
    const [slno, setSlno] = useState(0)

    //Initializing
    const [tax, setTax] = useState({
        prof_tax_desc: '',
        salary_from: '',
        salary_to: '',
        tax_amt: '',
        prof_status: false
    });

    //destructuring
    const { prof_tax_desc, salary_from, salary_to, tax_amt, prof_status } = tax;
    const updateTax = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setTax({ ...tax, [e.target.name]: value })
    }, [tax])

    // Post Data
    const postdata = useMemo(() => {
        return {
            prof_tax_desc: prof_tax_desc,
            salary_from: salary_from,
            salary_to: salary_to,
            tax_amt: tax_amt,
            prof_status: prof_status === true ? 1 : 0,
        }
    }, [prof_tax_desc, salary_from, salary_to, tax_amt, prof_status])

    const resetForm = useMemo(() => {
        return {
            prof_tax_desc: '',
            salary_from: '',
            salary_to: '',
            tax_amt: '',
            prof_status: false
        }
    }, [])

    const patchdata = useMemo(() => {
        return {
            prof_tax_desc: prof_tax_desc,
            salary_from: salary_from,
            salary_to: salary_to,
            tax_amt: tax_amt,
            prof_status: prof_status === true ? 1 : 0,
            proftax_id: slno
        }
    }, [slno, prof_tax_desc, salary_from, salary_to, tax_amt, prof_status])

    //Form Submitting
    const submitProTax = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/proftax', patchdata)
            const { message, success } = result.data;
            if (success === 2) {
                setTax(resetForm);
                setFlag(1)
                setCount(count + 1);
                succesNofity(message);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/proftax', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setTax(resetForm);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }, [postdata, count, resetForm, patchdata, flag])

    //Getdata
    useEffect(() => {
        const getTaxList = async () => {
            const result = await axioslogin.get('/proftax')
            const { success, data } = result.data;
            if (success === 1) {
                setCount(0)
                setTableData(data);
            } else {
                setTableData([])
            }
        }
        getTaxList();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'proftax_id' },
        { headerName: 'Qulaification', field: 'prof_tax_desc', filter: true, width: 150 },
        { headerName: 'Salary From', field: 'salary_from', filter: true, width: 150 },
        { headerName: 'Salary To', field: 'salary_to', filter: true, width: 150 },
        { headerName: 'Tax Amount', field: 'tax_amt', filter: true, width: 150 },
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
        const { proftax_id, prof_tax_desc, salary_from, salary_to, tax_amt, prof_status } = params.data
        setSlno(proftax_id)
        const frmdata = {
            prof_tax_desc: prof_tax_desc,
            salary_from: salary_from,
            salary_to: salary_to,
            tax_amt: tax_amt,
            prof_status: prof_status === 1 ? true : false
        }
        setTax(frmdata)
    }, [])

    return (
        <MasterLayout title="Professional Tax" displayClose={true} >
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'ProTax Description'}
                                type="text"
                                size="sm"
                                name="prof_tax_desc"
                                value={prof_tax_desc}
                                onchange={(e) => updateTax(e)}
                            />
                        </Box>
                        <Box sx={{
                            width: "100%", px: 1, mt: 0.5, display: 'flex', flexDirection: 'row',
                            alignItems: 'flex-start',
                        }}>
                            <Box sx={{ width: '50%' }}>
                                <InputComponent
                                    placeholder={'From'}
                                    type="text"
                                    size="sm"
                                    name="salary_from"
                                    value={salary_from}
                                    onchange={(e) => updateTax(e)}
                                />
                            </Box>
                            <Box sx={{ width: '50%', }}>
                                <InputComponent
                                    placeholder={'To'}
                                    type="text"
                                    size="sm"
                                    name="salary_to"
                                    value={salary_to}
                                    onchange={(e) => updateTax(e)}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Tax'}
                                type="text"
                                size="sm"
                                name="tax_amt"
                                value={tax_amt}
                                onchange={(e) => updateTax(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label=' Status'
                                checked={prof_status}
                                name="prof_status"
                                onchange={(e) => updateTax(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitProTax}
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

export default memo(ProTaxMast) 