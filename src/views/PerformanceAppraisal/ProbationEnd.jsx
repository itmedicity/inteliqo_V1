
import { Box, Paper, Tooltip } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PageLayoutCloseOnly from '../CommonCode/PageLayoutCloseOnly'
import { axioslogin } from '../Axios/Axios';
import { Checkbox } from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask';
import CusIconButton from 'src/views/Component/CusIconButton'
import moment from 'moment';
import { errorNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc';
import { CssVarsProvider, Typography } from '@mui/joy';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CommonCheckBox from '../Component/CommonCheckBox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import CommonAgGrid from '../Component/CommonAgGrid';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CompanyChange from './CompanyChange';
import { useDispatch, useSelector } from 'react-redux';
import { setDept } from 'src/redux/actions/Dept.Action';

const ProbationEnd = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    /** initializing state */
    const [tableData, setTableData] = useState([]);
    const [pb, setpb] = useState(false)
    const [ap, setap] = useState(false)
    const [value, setValue] = useState([]);
    const [id, setid] = useState([])
    const [appraisal, setappraisal] = useState(false)
    const [empno, setempno] = useState(0)
    const [flag, setFlag] = useState(0)
    const [empid, setEmpid] = useState(0)
    const [display, setdisplay] = useState(0)
    const [name, setname] = useState('')

    /** back to home page */
    const RedirectToHome = () => {
        history.push(`/Home`)
    }

    useEffect(() => {
        dispatch(setDept())
    }, [dispatch])

    /** list of probation end employees */
    useEffect(() => {
        const aprobationEndList = async () => {
            const result = await axioslogin.get('/Performance/list')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setValue(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        aprobationEndList()
    }, [])

    /** to get appraisal pending checkbox value */
    const getValue2 = useCallback((e) => {
        if (e.target.checked === true) {
            setappraisal(true)
        }
        else {
            setappraisal(false)
        }
    })
    /** to get employee category details from redux */
    const empCate = useSelector((state) => {
        return state.getEmployeeCategory.empCategory || 0
    })

    useEffect(() => {
        if (empCate.some(key => key.des_type === 1)) {
            setdisplay(2)
        }
    }, [empCate])

    const [columnDef] = useState([
        {
            headerName: '',
            filterParams: {
                buttons: ['reset', 'apply'],
                // debounceMs: 200,
            },
            width: 10,
        },
        { headerName: 'ID', field: 'em_id', wrapText: true, minWidth: 5, filter: true },
        { headerName: 'Emp No ', field: 'em_no', filter: true },
        { headerName: 'Name ', field: 'em_name', filter: true },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'Category ', field: 'ecat_name', wrapText: true, minWidth: 250, },
        { headerName: 'Probation End ', field: 'em_prob_end_date' },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Fragment>
                    <Tooltip title="Direct Contract Confirmation" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }} onClick={() => addtoProcess(params)}>
                            <TaskAltRoundedIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Appraisal Process" followCursor placement='top' arrow >
                        <IconButton sx={{ pb: 1 }} onClick={() => addtoProcess(params)}>
                            <AssignmentTurnedInIcon color='primary' />
                        </IconButton>
                    </Tooltip>
                </Fragment>
        },
    ])

    /** mapping sect_id of employees into an array */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.sect_id
        })
        setid(arr)
    }, [value])

    const [click, setClick] = useState(0)
    const [submit, setSubmit] = useState([])

    //direct contract confirmation process
    const addtoProcess = useCallback((params) => {
        setFlag(1)
        const data = params.api.getSelectedRows()
        const { em_no, em_id, em_name } = data[0]
        setEmpid(em_id)
        setempno(em_no)
        setname(em_name)
    }, [])

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                {
                    flag === 1 ? <CompanyChange empid={empid} setFlag={setFlag} empno={empno} display={display} name={name} /> : <Paper square elevation={2} sx={{ p: 0.5, }}>
                        <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center", }}  >
                            <Box sx={{ flex: 1, }} >
                                <CssVarsProvider>
                                    <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Employee Probation End List
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box >
                                <CssVarsProvider>
                                    <IconButton variant="outlined" size='sm' color="danger" onClick={RedirectToHome}>
                                        <CloseIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                        <Paper square elevation={0} sx={{
                            p: 0.5,
                            mt: 0.5,
                            display: 'flex',
                            alignItems: "center",
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        }} >
                            <Box sx={{ display: "flex", flex: 1, flexDirection: "row" }}>
                                <Box sx={{ display: "flex", p: 2 }}>
                                    <CommonCheckBox
                                        name="appraisal"
                                        value={appraisal}
                                        checked={appraisal}
                                        onChange={(e) => getValue2(e)}
                                    />
                                </Box>
                                <Box sx={{ display: "flex", p: 1, pt: 1.5 }}>
                                    <CssVarsProvider>
                                        <Typography>
                                            Appraisal Pending
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", }}>
                                <Box sx={{ display: "flex", p: 1, }}>
                                    <CssVarsProvider>
                                        <IconButton variant="outlined" size='sm' color="primary" onClick={RedirectToHome}>
                                            <AddTaskIcon />
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", p: 1.5 }}>
                                    <CssVarsProvider>
                                        <Typography>
                                            Submit All
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Paper>
                        <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
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
                }
            </Box>
        </Fragment >
    )
}

export default ProbationEnd