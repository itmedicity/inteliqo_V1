import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'

const BranchMast = () => {
    const [count, setCount] = useState(0);
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)
    const [branchData, setBranchData] = useState({
        branch_name: '',
        branch_address: '',
        branch_email: '',
        branch_esi: '',
        branch_pf: '',
        branch_status: false
    });
    const { branch_name, branch_address, branch_email, branch_esi, branch_pf, branch_status } = branchData;
    const resetForm = useMemo(() => {
        return {
            branch_name: '',
            branch_address: '',
            branch_email: '',
            branch_esi: '',
            branch_pf: '',
            branch_status: false
        }
    }, [])

    const updateBranchForm = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setBranchData({ ...branchData, [e.target.name]: value })
    }, [branchData])

    const postData = useMemo(() => {
        return {
            ...branchData,
            branch_status: branch_status === true ? 1 : 0,
            create_user: employeeNumber()
        }
    }, [branchData, branch_status])

    const updateData = useMemo(() => {
        return {
            ...branchData,
            branch_status: branch_status === true ? 1 : 0,
            edit_user: employeeNumber(),
            branch_slno: slno
        }
    }, [branchData, branch_status, slno])


    const submitBranchForm = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/branch', updateData);
            const { message, success } = result.data;
            if (success === 2) {
                setBranchData(resetForm);
                setCount(count + 1);
                succesNofity(message);
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/branch', postData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                setBranchData(resetForm);
            } else if (success === 0 || success === 2) {
                infoNofity(message);
            }
            else if (success === 7) {
                errorNofity(message)
            }
            else {
                errorNofity("Error! Please contact EDP")
            }
        }
    }, [postData, resetForm, flag, count, updateData])

    useEffect(() => {
        const gettablelist = async () => {
            const result = await axioslogin.get('/branch');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
                setCount(0)
            } else {
                setTableData([])
            }
        }
        gettablelist();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'branch_slno' },
        { headerName: 'Branch Name', field: 'branch_name', filter: true, width: 150 },
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
        const { branch_slno, branch_name, branch_address, branch_email, branch_esi, branch_pf, branch_status } = params.data
        const frmdata = {
            branch_name: branch_name,
            branch_address: branch_address === null ? '' : branch_address,
            branch_email: branch_email === null ? '' : branch_email,
            branch_esi: branch_esi === null ? '' : branch_esi,
            branch_pf: branch_pf === null ? '' : branch_pf,
            branch_status: branch_status === 1 ? true : false
        }
        setBranchData(frmdata)
        setSlno(branch_slno)
    }, [])

    return (
        <MasterLayout title="Branch  Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Branch Name*'}
                                type="text"
                                size="sm"
                                name="branch_name"
                                value={branch_name}
                                onchange={(e) => updateBranchForm(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Branch Address*'}
                                type="text"
                                size="sm"
                                name="branch_address"
                                value={branch_address}
                                onchange={(e) => updateBranchForm(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Email Address*'}
                                type="text"
                                size="sm"
                                name="branch_email"
                                value={branch_email}
                                onchange={(e) => updateBranchForm(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'ESI Number*'}
                                type="text"
                                size="sm"
                                name="branch_esi"
                                value={branch_esi}
                                onchange={(e) => updateBranchForm(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'PF Number*'}
                                type="text"
                                size="sm"
                                name="branch_pf"
                                value={branch_pf}
                                onchange={(e) => updateBranchForm(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={branch_status}
                                name="branch_status"
                                onchange={(e) => updateBranchForm(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={submitBranchForm}
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
        // <Fragment>
        //     <SessionCheck />
        //     <ToastContainer />
        //     <div className="card">
        //         <div className="card-header bg-dark pb-0 border border-dark text-white">
        //             <h5>Branch Master</h5>
        //         </div>
        //         <div className="card-body">
        //             <div className="row">
        //                 <div className="col-md-4">
        //                     <form className={classes.root} onSubmit={submitBranchForm} >
        //                         <div className="row">
        //                             <div className="col-md-12">
        //                                 <TextField
        //                                     label="Branch Name"
        //                                     fullWidth
        //                                     size="small"
        //                                     autoComplete="off"
        //                                     variant="outlined"
        //                                     required
        //                                     name="branch_name"
        //                                     value={branch_name}
        //                                     onChange={(e) => updateBranchForm(e)}
        //                                 />
        //                             </div>
        //                             <div className="col-md-12">
        //                                 <TextField
        //                                     label="Branch Address"
        //                                     fullWidth
        //                                     size="small"
        //                                     autoComplete="off"
        //                                     variant="outlined"
        //                                     required
        //                                     name="branch_address"
        //                                     value={branch_address}
        //                                     onChange={(e) => updateBranchForm(e)}
        //                                 />
        //                             </div>
        //                             <div className="col-md-12">
        //                                 <TextField
        //                                     label="Email Address"
        //                                     fullWidth
        //                                     size="small"
        //                                     autoComplete="off"
        //                                     variant="outlined"
        //                                     name="branch_email"
        //                                     value={branch_email}
        //                                     onChange={(e) => updateBranchForm(e)}
        //                                 />
        //                             </div>
        //                             <div className="col-md-12">
        //                                 <TextField
        //                                     label="ESI Number"
        //                                     fullWidth
        //                                     size="small"
        //                                     autoComplete="off"
        //                                     variant="outlined"
        //                                     required
        //                                     name="branch_esi"
        //                                     value={branch_esi}
        //                                     onChange={(e) => updateBranchForm(e)}
        //                                 />
        //                             </div>
        //                             <div className="col-md-12">
        //                                 <TextField
        //                                     label="PF Number"
        //                                     fullWidth
        //                                     size="small"
        //                                     autoComplete="off"
        //                                     variant="outlined"
        //                                     required
        //                                     name="branch_pf"
        //                                     value={branch_pf}
        //                                     onChange={(e) => updateBranchForm(e)}
        //                                 />
        //                             </div>
        //                             <div className="col-md-12 pb-0 mb-0">
        //                                 <FormControlLabel
        //                                     className="pb-0 mb-0"
        //                                     control={
        //                                         <Checkbox
        //                                             name="branch_status"
        //                                             color="primary"
        //                                             value={branch_status}
        //                                             checked={branch_status}
        //                                             className="ml-2"
        //                                             onChange={(e) => updateBranchForm(e)}
        //                                         />
        //                                     }
        //                                     label="Status"
        //                                 />
        //                             </div>
        //                             <div className="row col-md-12">
        //                                 <div className="col-md-6 col-sm-12 col-xs-12 mb-1">
        //                                     <Button
        //                                         variant="contained"
        //                                         color="primary"
        //                                         size="small"
        //                                         fullWidth
        //                                         type="Submit"
        //                                         className="ml-2"
        //                                     >
        //                                         Save
        //                                     </Button>
        //                                 </div>
        //                                 <div className="col-md-6 col-sm-12 col-xs-12">
        //                                     <Button
        //                                         variant="contained"
        //                                         color="primary"
        //                                         size="small"
        //                                         fullWidth
        //                                         className="ml-2"
        //                                         onClick={toSettings}
        //                                     >
        //                                         Close
        //                                     </Button>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </form>
        //                 </div>
        //                 <div className="col-md-8">
        //                     <BranchMastTable update={count} />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Fragment>
    )
}

export default memo(BranchMast) 
