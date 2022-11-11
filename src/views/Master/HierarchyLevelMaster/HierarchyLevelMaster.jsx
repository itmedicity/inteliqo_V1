
import { Box, Card, CardHeader, Grid, Paper, Typography } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSectionReduxSelect from 'src/views/CommonCode/DepartmentSectionReduxSelect'
import HighLevelSelect from 'src/views/CommonCode/HighLevelSelect'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
import IconButton from '@mui/joy/IconButton';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { useDispatch, useSelector } from 'react-redux';
import { setdeptSection } from 'src/redux/actions/DeptSection.action';
import DeptSectionSingleSelect from 'src/views/CommonCode/DeptSectionSingleSelect'
import ExceptMultiSelection from './ExceptMultiSelection'
import Level3Table from './Level3Table'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'

const HierarchyLevelMaster = () => {
    const history = useHistory()
    const [level1, setlevel1] = useState(0)
    const [dept, setdept] = useState([])
    const [indata, setindata] = useState([])
    const [exsect, setexsect] = useState([])
    const [insect, setinsect] = useState(0)
    const [exceptDept, setexceptDept] = useState([])
    const [count, setcount] = useState(0)
    const [count2, setcount2] = useState(0)
    const [value, setValue] = useState([])

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setdeptSection());

    }, [dispatch])

    /** get department section list from redux */
    const empDeptSection = useSelector((state) => {
        return state.getDeprtSection.empDeptSectionList || 0
    })

    // const [count, setCount] = useState(0)
    const [formData, setFormData] = useState({
        level1: '',
        dept: '',
        insect: '',
        exsect: '',
        levelstatus: false
    })
    const { levelstatus } = formData

    //getting formData
    const updateHighLevel = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    const saveData = dept.map((val) => {
        return {
            highlevel_slno: level1,
            sect_id: val,
        }
    })

    const defaultState = {
        level1: '',
        dept: '',
        insect: '',
        exsect: '',
        sect_id: '',
        highlevel_slno: '',
        levelstatus: false
    }

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'hierarchylevel_slno' },
        { headerName: 'High level Name ', field: 'highlevel_name' },
        { headerName: 'Department Section', field: 'sect_name' },
        // {
        //     headerName: 'Action', cellRenderer: params =>
        //         <EditIcon onClick={() =>
        //             getDataTable(params)
        //         }
        //         />
        // },
    ])

    const [columnDef2] = useState([
        { headerName: 'Sl No', field: 'hierarchylevel_slno' },
        { headerName: 'Level 2 Departments', field: 'sect_id' },
        { headerName: 'Level3 Dept', field: 'level2_sect_id' },
        // {
        //     headerName: 'Action', cellRenderer: params =>
        //         <EditIcon onClick={() =>
        //             getDataTable(params)
        //         }
        //         />
        // },
    ])

    useEffect(() => {
        const getLevel2Data = async () => {
            const result = await axioslogin.get('/HierarchyLevel/data1')
            const { success, data } = result.data
            if (success === 1) {
                setValue(data)
            }
            else {
                setValue([])
            }
        }
        getLevel2Data()
    }, [count])

    console.log(level1);

    //saving form Data
    const addFirstLevel = useCallback((e) => {
        e.preventDefault();

        const SubmitFunc = async () => {
            const result = await axioslogin.post('/HierarchyLevel/insert', saveData)
            const { success, message } = result.data
            if (success === 1) {
                setcount(count + 1)
                succesNofity(message)
                setFormData(defaultState)
                setdept([])
                const result = await axioslogin.get(`/HierarchyLevel/indata`)
                const { success, data } = result.data
                // if (success === 1) {
                //     setindata(data)
                //     const result = await axioslogin.get(`/HierarchyLevel/except`)
                //     const { success, data } = result.data
                //     // console.log(data);
                //     if (success === 1) {
                //         setexceptDept(data)
                //     }
                //     else if (success === 0) {
                //         setexceptDept([])
                //     }
                // }
            }
            else {
                errorNofity("Error Occure!!!!Please Contact EDP")
            }
        }
        if (level1 === 0) {
            warningNofity("Please Select Any High Level!")
        }
        else {
            SubmitFunc()
        }
    }, [level1, count, saveData])

    const postFormData = exsect.map((val) => {
        return {
            highlevel_slno: level1,
            sect_id: insect,
            level2_sect_id: val
        }
    })

    const addSecondLevel = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/HierarchyLevel/level2', postFormData);
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setcount2(count2 + 1);
            //getDisdata(resetForm);
            setFormData(defaultState)
            //reset();
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    const RedirectToMasterPage = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <PageLayoutSaveClose
                heading="Hierarchy Level Master"
                //submit={SubmitFormData}
                redirect={RedirectToMasterPage}
            >
                <Box sx={{ p: 1, width: "100%", display: "flex" }} >
                    <Grid container item xl={12} lg={12} spacing={1} direction="row"
                        alignItems="center"  >
                        <Grid container spacing={1}>
                            <Grid item xl={3} lg={2}>
                                <Card>
                                    <CardHeader title={"Hierarchy Level 2"}
                                        titleTypographyProps={{ variant: "subtitle1" }}
                                        sx={{ paddingY: 0.5, backgroundColor: "lightgray", }} />

                                    <Box sx={{ pt: 2 }}>
                                        <HighLevelSelect
                                            label={"Select High Level Dept"}
                                            value={level1}
                                            setValue={setlevel1}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                        />
                                    </Box>
                                    <Box sx={{ pt: 2 }}>
                                        <DepartmentSectionReduxSelect
                                            //label={"Select Here"}
                                            value={dept}
                                            setValue={setdept}
                                            data={empDeptSection}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 0, pt: 2, pl: 1, pb: 1 }} >
                                        <IconButton variant="outlined" size='sm' onClick={addFirstLevel}>
                                            <AddToPhotosIcon />
                                        </IconButton>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={9} lg={9} xl={9} md={9}>
                                <CommonAgGrid
                                    columnDefs={columnDef}
                                    tableData={value}
                                    sx={{
                                        height: 300,
                                        width: "100%"
                                    }} rowHeight={30} headerHeight={30} />
                                {/* <Level2Table count={count} /> */}
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} sx={{ pt: 1 }}>
                            <Grid item xl={3} lg={2}>
                                <Card>
                                    <CardHeader title={"Hierarchy Level 3"}
                                        titleTypographyProps={{ variant: "subtitle1" }}
                                        sx={{ paddingY: 0.5, backgroundColor: "lightgray", }} />
                                    <Box sx={{ pt: 2 }}>
                                        <DeptSectionSingleSelect
                                            //label={"Select Here"}
                                            value={insect}
                                            setValue={setinsect}
                                            data={indata}
                                            label={"Select Level2 Departments"}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                        />
                                    </Box>

                                    <Box sx={{ pt: 2 }}>
                                        <ExceptMultiSelection
                                            //label={"Select Here"}
                                            value={exsect}
                                            setValue={setexsect}
                                            data={exceptDept}
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                        />
                                    </Box>

                                    <Box sx={{ flex: 0, pt: 2, pl: 1, pb: 1 }} >
                                        <IconButton variant="outlined" size='sm' onClick={addSecondLevel}>
                                            <AddToPhotosIcon />
                                        </IconButton>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={9} lg={9} xl={9} md={9}>
                                <CommonAgGrid
                                    columnDefs={columnDef2}
                                    //tableData={data}
                                    sx={{
                                        height: 300,
                                        width: "100%"
                                    }} rowHeight={30} headerHeight={30} />
                                {/* <Level3Table count={count2} /> */}
                            </Grid>
                        </Grid>
                        {/* <Grid item xl={4} lg={4} sx={{ p: 1 }} >
                            
                        </Grid>

                        <Grid item xl={4} lg={4} sx={{ p: 1 }} >
                            
                        </Grid>*/}
                    </Grid>
                </Box>
            </PageLayoutSaveClose >
        </Fragment >
    )
}

export default HierarchyLevelMaster






