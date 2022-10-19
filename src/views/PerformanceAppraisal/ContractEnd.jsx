import { Box, Paper } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from '../Axios/Axios';
import moment from 'moment';
import { succesNofity, warningNofity } from '../CommonCode/Commonfunc';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { CssVarsProvider, Typography } from '@mui/joy';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CommonAgGrid from '../Component/CommonAgGrid';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CommonCheckBox from '../Component/CommonCheckBox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';

const ContractEnd = () => {

    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const [value, setValue] = useState([]);
    const [id, setid] = useState([])
    const [appraisal, setappraisal] = useState(false)

    const RedirectToHome = () => {
        history.push(`/Home`)
    }
    /** column data for contract renewal employees */
    const [columnDef] = useState([
        { headerName: 'ID', field: 'em_id' },
        { headerName: 'Emp No ', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        {
            headerName: 'Action',
            cellRenderer: params => <TaskAltRoundedIcon color='info' />
        },
    ])

    /** appraisal pending checkbox*/
    const getValue2 = useCallback((e) => {
        if (e.target.checked === true) {
            setappraisal(true)
        }
        else {
            setappraisal(false)
        }
    })

    /** list contract renew employee list */
    useEffect(() => {
        const contractEndList = async () => {
            const result = await axioslogin.get('/Performance/contractrenew')
            const { success, data } = result.data
            console.log(data);
            if (success === 1) {
                setTableData(data)
                setValue(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        contractEndList()
    }, [])



    /** mapping em_id of employees into an array */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.em_id
        })
        setid(arr)
    }, [value])

    const [click, setClick] = useState(0)
    const [submit, setSubmit] = useState([])

    useEffect(() => {
        if (click !== 0) {
            value.forEach(element => {
                const { em_id, em_no, sect_id, incharge, hod } = element
                const getallemployeeRights = async (sect_id, em_id, em_no) => {

                    /** fetching level3 hierarchy dept section for checking 
                                * selected employee dept section is present or not */

                    const result = await axioslogin.get(`/Performance/idonly`)
                    const { data } = result.data;
                    var arr = data.map(data => (data.level2_sect_id));


                    /** fetching level2 hierarchy dept section for checking 
                                 * selected employee dept section is present or not */
                    const level2ID = await axioslogin.get(`/HierarchyLevel/data`)
                    const { datas } = level2ID.data;
                    var l2ID = datas.map(datas => (datas.sect_id))
                    if (arr.indexOf(sect_id) !== -1) {
                        const result = await axioslogin.get(`/Performance/level2hier/${sect_id}`)
                        const { data } = result.data;
                        const { authorization_hod, authorization_incharge, highlevel_slno } = data[0]
                        const today = new Date();
                        const tdyformat = moment(today).format('YYYY-MM-DD')
                        if (highlevel_slno === 1) {
                            const savedata1 = {
                                appraisal_start_date: tdyformat,
                                em_id: em_id,
                                em_no: em_no,
                                appraisal_type: "C",
                                incharge_required: authorization_incharge,
                                hod_required: authorization_hod,
                                ed_required: 1,
                                md_required: 0,
                                trustiee_required: 0,
                                ceo_required: 0
                            }
                            const result = await axioslogin.post('/Performance/create', savedata1)
                        }
                        else if (highlevel_slno === 2) {
                            const savedata2 = {
                                appraisal_start_date: tdyformat,
                                em_id: em_id,
                                em_no: em_no,
                                appraisal_type: "C",
                                incharge_required: authorization_incharge,
                                hod_required: authorization_hod,
                                ed_required: 0,
                                md_required: 1,
                                trustiee_required: 0,
                                ceo_required: 0
                            }
                            const result = await axioslogin.post('/Performance/create', savedata2)
                        }
                        else {
                            const savedata3 = {
                                appraisal_start_date: tdyformat,
                                em_id: em_id,
                                em_no: em_no,
                                appraisal_type: "C",
                                incharge_required: authorization_incharge,
                                hod_required: authorization_hod,
                                ed_required: 0,
                                md_required: 0,
                                trustiee_required: 1,
                                ceo_required: 0
                            }
                            const result = await axioslogin.post('/Performance/create', savedata3)
                        }
                    }
                    else {
                        if (l2ID.indexOf(sect_id) !== -1) {
                            const result = await axioslogin.get(`/Performance/level1/${sect_id}`)
                            const { data } = result.data;
                            const { authorization_hod, authorization_incharge, highlevel_slno, } = data[0]
                            const today = new Date();
                            const tdyformat = moment(today).format('YYYY-MM-DD')
                            if (highlevel_slno === 1) {
                                const savedata4 = {
                                    appraisal_start_date: tdyformat,
                                    em_id: em_id,
                                    em_no: em_no,
                                    appraisal_type: "C",
                                    incharge_required: authorization_incharge,
                                    hod_required: authorization_hod,
                                    ed_required: 1,
                                    md_required: 0,
                                    trustiee_required: 0,
                                    ceo_required: 0
                                }
                                const result = await axioslogin.post('/Performance/create', savedata4)
                            }
                            else if (highlevel_slno === 2) {
                                const savedata5 = {
                                    appraisal_start_date: tdyformat,
                                    em_id: em_id,
                                    em_no: em_no,
                                    appraisal_type: "C",
                                    incharge_required: authorization_incharge,
                                    hod_required: authorization_hod,
                                    ed_required: 0,
                                    md_required: 1,
                                    trustiee_required: 0,
                                    ceo_required: 0
                                }
                                const result = await axioslogin.post('/Performance/create', savedata5)
                            }
                            else {
                                const savedata6 = {
                                    appraisal_start_date: tdyformat,
                                    em_id: em_id,
                                    em_no: em_no,
                                    appraisal_type: "C",
                                    incharge_required: authorization_incharge,
                                    hod_required: authorization_hod,
                                    ed_required: 0,
                                    md_required: 0,
                                    trustiee_required: 1,
                                    ceo_required: 0
                                }
                                const result = await axioslogin.post('/Performance/create', savedata6)
                            }
                        }
                        else {
                            var msg = "No Rights to the Departments!!"
                            return msg
                        }
                    }
                }
                const submitHODAppraisal = async () => {
                    /** fetching employee department section hirarchy details */
                    const result = await axioslogin.get(`/Performance/level1/${sect_id}`)
                    const { data } = result.data;
                    const { highlevel_slno } = data[0]
                    const today = new Date();
                    const tdyformat = moment(today).format('YYYY-MM-DD')
                    if (highlevel_slno === 1) {
                        const savedata7 = {
                            appraisal_start_date: tdyformat,
                            em_id: em_id,
                            em_no: em_no,
                            appraisal_type: "C",
                            incharge_required: 0,
                            hod_required: 0,
                            ed_required: 1,
                            md_required: 0,
                            trustiee_required: 0,
                            ceo_required: 0
                        }
                        const result = await axioslogin.post('/Performance/create', savedata7)
                    }
                    else if (highlevel_slno === 2) {
                        const savedata8 = {
                            appraisal_start_date: tdyformat,
                            em_id: em_id,
                            em_no: em_no,
                            appraisal_type: "C",
                            incharge_required: 0,
                            hod_required: 0,
                            ed_required: 0,
                            md_required: 1,
                            trustiee_required: 0,
                            ceo_required: 0
                        }
                        const result = await axioslogin.post('/Performance/create', savedata8)
                    }
                    else {
                        const savedata9 = {
                            appraisal_start_date: tdyformat,
                            em_id: em_id,
                            em_no: em_no,
                            appraisal_type: "C",
                            incharge_required: 0,
                            hod_required: 0,
                            ed_required: 0,
                            md_required: 0,
                            trustiee_required: 1,
                            ceo_required: 0
                        }
                        const result = await axioslogin.post('/Performance/create', savedata9)
                    }
                }
                if (sect_id !== 0 && incharge !== 1 & hod !== 1) {
                    getallemployeeRights(sect_id, em_id, em_no)
                }
                else if (sect_id !== 0 && incharge === 1 & hod === 1) {
                    submitHODAppraisal()
                }
                else {
                    warningNofity("No Rights to the Departments!!")
                }
            })
            succesNofity("Appraisal Submitted!!")
        }
    }, [click])

    const addtoProcess = useCallback((e) => {
        e.preventDefault();
        setClick(1)
    }, [])


    // const addtoProcess = useCallback((e) => {
    //     e.preventDefault();
    //     const getallemployeeRights = async (id) => {
    //         /** getting appraisal user rights of listed employees, by sumbitting employee em_id */
    //         const result = await axioslogin.post('/performanceappriasalrights/allappraisalemp/list', id)
    //         const { success, data } = result.data
    //         /** the array of objects destructured using a loop */
    //         data.forEach(element => {
    //             const { em_id, rights_needed, em_no } = element
    //             const obj = JSON.parse(rights_needed);
    //             const { incharge, hod, gm, om, hr, ms, cno, acno, ed, md } = obj
    //             const today = new Date();
    //             const tdyformat = moment(today).format('YYYY-MM-DD')
    //             const savedata = {
    //                 appraisal_start_date: tdyformat,
    //                 em_id: em_id,
    //                 em_no: em_no,
    //                 appraisal_type: "C",
    //                 incharge_required: incharge,
    //                 hod_required: hod,
    //                 gm_required: gm,
    //                 om_required: om,
    //                 hr_required: hr,
    //                 ms_required: ms,
    //                 cno_required: cno,
    //                 acno_required: acno,
    //                 ed_required: ed,
    //                 md_required: md
    //             }
    //             const getallemployeeRights = async (savedata) => {
    //                 /** submitting probation end employee rights to the database table */
    //                 const result = await axioslogin.post('/performanceappriasalrights/createappraisal', savedata)
    //             }
    //             if (savedata.length !== 0) {
    //                 getallemployeeRights(savedata)
    //             }
    //         });
    //     }
    //     if (id !== 0) {
    //         getallemployeeRights(id)
    //         succesNofity("Appraisal Submitted")
    //     }
    //     else {
    //         errorNofity("The employee has no rights")
    //     }

    // }, [id])

    return (

        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Employee Contract Renew List
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box>
                            <CssVarsProvider>
                                <IconButton variant="outlined" size='sm' color="danger" onClick={RedirectToHome}>
                                    <CloseIcon />
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                    }} >
                        <Box sx={{
                            display: "flex",
                            flex: 1,
                            flexDirection: "row"
                        }}>
                            <Box sx={{
                                display: "flex", p: 2
                            }}>
                                <CommonCheckBox
                                    name="appraisal"
                                    value={appraisal}
                                    checked={appraisal}
                                    onChange={(e) => getValue2(e)}
                                />
                            </Box>
                            <Box sx={{
                                display: "flex", p: 1, pt: 1.5
                            }}>
                                <CssVarsProvider>
                                    <Typography>
                                        Appraisal Pending
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: "flex",
                        }}>
                            <Box sx={{
                                display: "flex", p: 1,
                            }}>
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='sm' color="primary" onClick={RedirectToHome}>
                                        <AddTaskIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{
                                display: "flex", p: 1.5
                            }}>
                                <CssVarsProvider>
                                    <Typography>
                                        Submit All
                                    </Typography>
                                </CssVarsProvider>
                            </Box>

                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{
                        pt: 1,
                        mt: 0.5,
                        display: 'flex',
                        flexDirection: "column"
                    }} >
                        {
                            appraisal === true ? null : <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={tableData}
                                sx={{
                                    height: 600,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            />
                        }
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default ContractEnd