import React, { Fragment, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Paper, Tooltip } from '@mui/material'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/joy/IconButton';

const AppraisalApproveIncharge = () => {

    const [flag, setFlag] = useState(0)

    const state = useSelector((state) => {
        return state.getAppraisalData.appraisalIncharge.appraisalInchargeList
    })

    const [columnDef] = useState([
        { headerName: 'ID', field: 'em_id' },
        { headerName: 'Emp No ', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Tooltip title="Appraisal Process" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 1 }} onClick={() => toAppraisal(params)}>
                        <VisibilityIcon color='primary' />
                    </IconButton>
                </Tooltip>
        },
    ])

    const toAppraisal = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setFlag(1)
    })

    return (
        <Fragment>
            <Box sx={{ width: "100%" }} >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Paper square elevation={3} sx={{ display: "flex", p: 1, alignItems: "center" }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                    Performance Appraisal Incharge Approval List
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Paper>
                    <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} > <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={state}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    ></CommonAgGrid>
                    </Paper>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default AppraisalApproveIncharge