import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import MasterLayout from '../MasterComponents/MasterLayout'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { useMemo } from 'react'

const GradeMaster = () => {
    // use State  
    const [gradedata, getformdata] = useState({
        gradename: '',
        grade_status: false
    });

    // set count for table element refresh
    const [count, setcount] = useState(0)
    const [slno, setSlno] = useState(0)
    const [tableData, setTableData] = useState([])
    const [flag, setFlag] = useState(0)

    // upfate function for  element on change 
    const updategradedata = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        getformdata({ ...gradedata, [e.target.name]: value })
    }, [gradedata])

    // destructuring data
    const { gradename, grade_status } = gradedata

    // data to be posted
    const postData = useMemo(() => {
        return {
            grade_desc: gradename,
            grade_status: grade_status === true ? 1 : 0,
            create_user: employeeIdNumber()
        }
    }, [gradename, grade_status])

    // default state
    const reset = useMemo(() => {
        return {
            gradename: '',
            grade_status: false
        }
    }, [])


    const updateData = useMemo(() => {
        return {
            grade_desc: gradename,
            grade_status: grade_status === true ? 1 : 0,
            edit_user: employeeIdNumber(),
            grade_slno: slno,
        }
    }, [gradename, slno, grade_status])

    // submitt form data 
    const postFormData = useCallback(async (e) => {
        e.preventDefault();
        if (flag === 1) {
            const result = await axioslogin.patch('/grade', updateData)
            const { message, success } = result.data;
            if (success === 2) {
                succesNofity(message);
                getformdata(reset);
                setcount(count + 1)
            } else if (success === 0 || success === 1) {
                infoNofity(message);
            }
        } else {
            const result = await axioslogin.post('/grade', postData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message);
                getformdata(reset);
                setcount(count + 1)
            } else if (success === 0 || success === 2 || success === 7) {
                infoNofity(message);
            }
        }
    }, [count, postData, flag, reset, updateData])

    useEffect(() => {
        const getabledata = async () => {
            const result = await axioslogin.get('/grade')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setcount(0)
            } else {
                setTableData([])
            }
        }
        getabledata();
    }, [count])

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'grade_slno' },
        { headerName: 'Grade Name', field: 'grade_desc', filter: true, width: 150 },
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
        const { grade_slno, grade_desc, grade_status, } = params.data
        const frmdata = {
            gradename: grade_desc,
            grade_status: grade_status === 1 ? true : false
        }
        getformdata(frmdata)
        setSlno(grade_slno)
    }, [])

    return (
        <MasterLayout title="Grade Master" displayClose={true} >
            <ToastContainer />
            <SessionCheck />
            <Box sx={{ width: "100%" }} >
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={2}>
                        <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
                            <InputComponent
                                placeholder={'Grade'}
                                type="text"
                                size="sm"
                                name="gradename"
                                value={gradename}
                                onchange={(e) => updategradedata(e)}
                            />
                        </Box>
                        <Box sx={{ pl: 1, mt: 0.5 }} >
                            <JoyCheckbox
                                label='Status'
                                checked={grade_status}
                                name="grade_status"
                                onchange={(e) => updategradedata(e)}
                            />
                        </Box>
                        <Box sx={{ px: 0.5, mt: 0.9 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="md"
                                    color="primary"
                                    onClick={postFormData}
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

export default memo(GradeMaster) 
