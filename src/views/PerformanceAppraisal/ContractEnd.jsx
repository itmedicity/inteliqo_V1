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