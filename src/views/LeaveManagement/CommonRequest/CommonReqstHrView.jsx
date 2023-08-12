import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGeneralRqst } from 'src/redux/actions/CommonReqst.Action'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import _ from 'underscore'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HRReqstModal from './CommonReqstComponent/HRReqstModal'

const CommonReqstHrView = () => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [requestData, setRequestData] = useState([])

    useEffect(() => {
        dispatch(getGeneralRqst())
    }, [dispatch])

    const generalData = useSelector((state) => state?.setCommonreqstAll?.generalData?.generalDataList, _.isEqual)
    const genrealReqst = useMemo(() => generalData, [generalData])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'serialno', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'em_no', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'em_name', filter: true, minWidth: 200 },
        { headerName: 'Department', field: 'dept_name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, minWidth: 200 },
        { headerName: 'Request type', field: 'request_name', filter: true, minWidth: 200 },
        {
            headerName: 'Action',
            cellRenderer: params =>
                <Tooltip title="HR Comments" followCursor placement='top' arrow >
                    <IconButton onClick={() => handleClick(params)}>
                        <CheckCircleOutlineIcon color='primary' />
                    </IconButton>
                </Tooltip>
        },
    ])

    const handleClick = async (params) => {
        const data = params.api.getSelectedRows()
        setRequestData(data)
        setOpen(true)
    }

    return (
        <CustomLayout title="Common Request HR View" displayClose={true} >
            <HRReqstModal open={open} setOpen={setOpen} data={requestData} />
            <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={genrealReqst}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Paper>
            </Box>
        </CustomLayout>
    )
}

export default memo(CommonReqstHrView) 