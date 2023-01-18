import React, { Fragment, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper, Tooltip } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import IconButton from '@mui/joy/IconButton';
import PerformanceAppraisal from '../PerformanceAppraisal';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { onClickSubmit, SubmitComptency } from '../AppraisalFunctions';

const ApprovalHOD = () => {

    const history = useHistory()
    const [flag, setFlag] = useState(0)
    const [empno, setEmpno] = useState(0)
    const [empid, setempid] = useState(0)
    const [show, setShow] = useState(0)

    //data from redux appraisal employee with hod
    const newState = useSelector((state) => {
        return state.getAppraisalData.appraisalHod.appraisalHodList
    })

    const Redirect = async () => {
        history.push(`/Home`)
        setFlag(0)
    }

    const [columnDef] = useState([
        { headerName: 'ID', field: 'em_id', filter: true },
        { headerName: 'Emp No ', field: 'em_no', filter: true },
        { headerName: 'Name ', field: 'em_name', filter: true },
        { headerName: 'Dept Name ', field: 'dept_name', filter: true },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Tooltip title="View Appraisal" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 1 }} onClick={() => toAppraisal(params)}>
                        <VisibilityIcon color='primary' />
                    </IconButton>
                </Tooltip>
        },
    ])

    const toAppraisal = async (params) => {
        setShow(2)
        const data = params.api.getSelectedRows()
        const { em_department, em_dept_section, em_designation, em_no, em_id } = data[0]
        const checkid = {
            designation: em_designation,
            dept_id: em_department,
            sect_id: em_dept_section
        }
        //function for checking and inserting performance to each employee
        onClickSubmit(checkid, em_id).then((values) => {
            const { Status } = values
            if (Status === 1) {
                //function for checking and inserting competency to each employee
                SubmitComptency(checkid, em_id).then((values) => {
                    const { Status } = values
                    if (Status === 1) {
                        setFlag(1)
                    } else {
                        setFlag(1)
                    }
                })
            } else {
                SubmitComptency(checkid, em_id).then((values) => {
                    const { Status } = values
                    if (Status === 1) {
                        setFlag(1)
                    } else {
                        setFlag(1)
                    }
                })
            }
        })
        setempid(em_id)
        setEmpno(em_no)
    }

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                {
                    flag === 1 ? <PerformanceAppraisal
                        empno={empno}
                        empid={empid}
                        setFlag={setFlag}
                        show={show}
                        setShow={setShow}
                    /> : <Paper square elevation={2} sx={{ p: 0.5, }}>
                        <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                            <Box sx={{ flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Performance Appraisal Hod Approval List
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <IconButton variant="outlined" size='sm' onClick={Redirect} sx={{ color: 'red' }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                        <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                            <CommonAgGrid
                                columnDefs={columnDef}
                                tableData={newState}
                                sx={{
                                    height: 600,
                                    width: "100%"
                                }}
                                rowHeight={30}
                                headerHeight={30}
                            ></CommonAgGrid>
                        </Paper>
                    </Paper>
                }
            </Box>
        </Fragment>
    )
}

export default memo(ApprovalHOD)

