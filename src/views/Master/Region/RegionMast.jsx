import { Box, Button, CssVarsProvider } from '@mui/joy';
import { Grid, IconButton } from '@mui/material';
import React, { memo, useEffect } from 'react'
import { useMemo } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import SessionCheck from 'src/views/Axios/SessionCheck';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import DistrictSelection from 'src/views/CommonCode/DistrictSelection';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { employeeIdNumber } from 'src/views/Constant/Constant';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import MasterLayout from '../MasterComponents/MasterLayout';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const RegionMast = () => {
    const [count, setCount] = useState(0);
    const [district, setDistrict] = useState(0)
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)

    //Initializing
    const [disData, getDisdata] = useState({
        reg_name: '',
        reg_pincode: '',
        reg_dist_slno: '',
        reg_status: false
    });

    //Destructuring
    const { reg_name, reg_pincode, reg_status } = disData;

    const updateFormData = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getDisdata({ ...disData, [e.target.name]: value })
    }, [disData])

    //Insert
    const postFormData = useMemo(() => {
        return {
            reg_name,
            reg_pincode,
            reg_status: reg_status === true ? 1 : 0,
            create_user: employeeIdNumber(),
            reg_dist_slno: district
        }
    }, [reg_name, reg_pincode, reg_status, district])

    //Form resting
    const resetForm = useMemo(() => {
        return {
            reg_name: '',
            reg_pincode: '',
            reg_dist_slno: '',
            reg_status: false
        }
    }, [])


    const postRegionData = useMemo(() => {
        return {
            reg_name,
            reg_dist_slno: district,
            reg_pincode,
            reg_status: reg_status === true ? 1 : 0,
            edit_user: employeeIdNumber(),
            reg_slno: slno
        }
    }, [reg_name, reg_pincode, reg_status, district, slno])

    //Form Submitting
    const SubmitRegionForm = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/region', postRegionData)
            const { message, success } = result.data;
            if (success === 2) {
                getDisdata(resetForm);
                succesNofity(message);
                setDistrict(0)
                setCount(count + 1);
            } else if (success === 0) {
                infoNofity(message.sqlMessage)
            } else {
                infoNofity(message)
            }
        } else {
            const result = await axioslogin.post('/region', postFormData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setCount(count + 1);
                getDisdata(resetForm);
                setDistrict(0)
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }, [postFormData, count, postRegionData, flag, resetForm])

    useEffect(() => {
        const getRegionList = async () => {
            const result = await axioslogin.get('/region');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                setTableData([])
            }
        }
        getRegionList();
    }, [count]);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'reg_slno' },
        { headerName: 'Region Name', field: 'reg_name', filter: true, width: 150 },
        { headerName: 'District', field: 'dist_name', filter: true, width: 150 },
        { headerName: 'PinCode', field: 'reg_pincode', filter: true, width: 150 },
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
        const { reg_slno, reg_name, reg_dist_slno, reg_pincode, reg_status } = params.data
        const frmdata = {
            reg_name: reg_name,
            reg_pincode: reg_pincode,
            reg_status: reg_status === 1 ? true : false
        }
        getDisdata(frmdata)
        setDistrict(reg_dist_slno)
        setSlno(reg_slno)
    }, [])

    return (
        <MasterLayout title="Region Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Region Name*'}
                                type="text"
                                size="sm"
                                name="reg_name"
                                value={reg_name}
                                onchange={(e) => updateFormData(e)}
                            />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <DistrictSelection value={district} setValue={setDistrict} />
                        </Box>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Pin Code*'}
                                type="text"
                                size="sm"
                                name="reg_pincode"
                                value={reg_pincode}
                                onchange={(e) => updateFormData(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={reg_status}
                                name="reg_status"
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
                                    onClick={SubmitRegionForm}
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
        // <Fragment>
        //     <ToastContainer />
        //     <SessionCheck />
        //     <div className="card">
        //         <div className="card-header bg-dark pb-0 border border-dark text-white">
        //             <h5>Region Master</h5>
        //         </div>
        //         <div className="card-body">
        //             <div className="row">
        //                 <div className="col-md-4">
        //                     <form className={classes.root} onSubmit={SubmitRegionForm} >
        //                         <div className="row">
        //                             <div className="col-md-12">
        //                                 <TextField
        //                                     label="Region Name"
        //                                     fullWidth
        //                                     size="small"
        //                                     autoComplete="off"
        //                                     variant="outlined"
        //                                     required
        //                                     name="reg_name"
        //                                     value={reg_name}
        //                                     onChange={(e) => updateFormData(e)}
        //                                 />
        //                             </div>
        //                             <div className="col-md-12">
        //                                 <DistrictSelection value={district} setValue={setDistrict} />
        //                             </div>
        //                             <div className="col-md-12">
        //                                 <TextField
        //                                     label="Pincode"
        //                                     fullWidth
        //                                     size="small"
        //                                     autoComplete="off"
        //                                     variant="outlined"
        //                                     required
        //                                     name="reg_pincode"
        //                                     value={reg_pincode}
        //                                     onChange={(e) => updateFormData(e)}
        //                                 />
        //                             </div>
        //                             <div className="col-md-12 row">
        //                                 <div className="col-md-12 pb-0 mb-0">
        //                                     <FormControlLabel
        //                                         className="pb-0 mb-0"
        //                                         control={
        //                                             <Checkbox
        //                                                 name="reg_status"
        //                                                 color="primary"
        //                                                 value={reg_status}
        //                                                 checked={reg_status}
        //                                                 className="ml-2 "
        //                                                 onChange={(e) => updateFormData(e)}
        //                                             />
        //                                         }
        //                                         label="Status"
        //                                     />
        //                                 </div>
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
        //                     <RegionMastTable update={count} />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </Fragment>
    )
}

export default memo(RegionMast) 
