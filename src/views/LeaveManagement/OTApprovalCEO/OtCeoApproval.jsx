import { Paper, IconButton, Tooltip } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCeoApprvl } from 'src/redux/actions/OTAction'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import _ from 'underscore'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import OtCnclModel from '../OTComponent/OtCnclModel'
import { ToastContainer } from 'react-toastify'
import OtCeoApprvmodel from '../OTComponent/OtCeoApprvmodel'

const OtCeoApproval = () => {

    const dispatch = useDispatch()
    const [deptSect, setDeptSect] = useState(0)//select box selected department section
    const [tableData, setTableData] = useState([])
    const [rowData, setRowData] = useState([])

    const [apprvOpen, setApprvOpen] = useState(false)
    const [cancelOpen, setCancelOpen] = useState(false)
    const [apprvFlag, setApprvFlag] = useState(0)
    const [canclFlag, setCanclFlag] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        dispatch(getAllCeoApprvl())
    }, [dispatch, count])

    //login ceo id
    const em_id = useSelector((state) => {
        return state?.getProfileData?.ProfileData[0]?.em_id ?? 0;
    })

    const alldata = useSelector((state) => state?.getOTApprovalData?.approvalCeo?.approvalCeoList, _.isEqual)
    const employeeDetl = useMemo(() => alldata, [alldata]);
    useEffect(() => {
        if (deptSect !== 0) {
            const filterdata = employeeDetl && employeeDetl.filter((val) => {
                return (val.ot_deptsec_id === deptSect)
            })
            if (Object.keys(filterdata).length > 0) {
                setTableData(filterdata)
            } else {
                infoNofity("No OT request pending for this department!!")
                setTableData([])
            }
        } else {
            setTableData(employeeDetl)
        }
    }, [employeeDetl, deptSect, count])

    const [columnDef] = useState([
        { headerName: 'Slno', field: 'slno', filter: true, minWidth: 100 },
        { headerName: 'ID#', field: 'em_no', filter: true, minWidth: 100 },
        { headerName: 'Name ', field: 'em_name', filter: true, minWidth: 200 },
        { headerName: 'Department Section', field: 'sect_name', filter: true, minWidth: 200 },
        { headerName: 'OT Date', field: 'ot_days', minWidth: 200 },
        { headerName: 'OT Request Date', field: 'ot_date', minWidth: 200 },
        { headerName: 'Status ', field: 'ceo_status', minWidth: 200 },
        {
            headerName: 'Action',
            cellRenderer: params => {
                if (params.data.ot_ceo_status === 1) {
                    return <Fragment>
                        <IconButton
                            sx={{ paddingY: 0.5 }} >
                            <Tooltip title="Click Here to Approve">
                                <CheckCircleOutlineIcon />
                            </Tooltip>
                        </IconButton>
                        <IconButton
                            sx={{ paddingY: 0.5 }} >
                            <Tooltip title="Click Here to Cancel">
                                <CancelIcon />
                            </Tooltip>
                        </IconButton>
                    </Fragment>
                } else {
                    return <Fragment>
                        <IconButton onClick={() => Approves(params)}
                            sx={{ paddingY: 0.5 }} >
                            <Tooltip title="Click Here to Approve">
                                <CheckCircleOutlineIcon color='primary' />
                            </Tooltip>
                        </IconButton>
                        <IconButton onClick={() => Cancel(params)}
                            sx={{ paddingY: 0.5 }} >
                            <Tooltip title="Click Here to Cancel">
                                <CancelIcon color='primary' />
                            </Tooltip>
                        </IconButton>
                    </Fragment>
                }
            }
        },
    ])

    const Approves = async (params) => {
        const data = params.api.getSelectedRows()
        setRowData(data)
        setApprvOpen(true)
        setApprvFlag(1)
    }
    const Cancel = async (params) => {
        const data = params.api.getSelectedRows()
        setRowData(data)
        setCancelOpen(true)
        setCanclFlag(1)
    }
    const handleClose = async () => {
        setApprvOpen(false)
        setApprvFlag(0)
        setRowData(0)
    }
    const handleCancelClose = async () => {
        setCancelOpen(false)
        setCanclFlag(0)
        setRowData(0)
    }
    return (
        <CustomLayout title="OT CEO Approval" displayClose={true} >
            <ToastContainer />
            {
                apprvFlag === 1 ? <OtCeoApprvmodel open={apprvOpen} handleClose={handleClose}
                    rowData={rowData} inchid={em_id} setCount={setCount} count={count} /> : null
            }
            {
                canclFlag === 1 ? <OtCnclModel open={cancelOpen} handleClose={handleCancelClose}
                    rowData={rowData} setCount={setCount} count={count} logEmpid={em_id}
                    apprvlname={"OT Ceo Approval Cancel"} /> : null
            }
            <Paper sx={{ width: '100%' }}>
                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column", }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 600,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    // rowStyle={rowStyle}
                    // getRowStyle={getRowStyle}
                    />
                </Paper>
            </Paper>
        </CustomLayout>
    )
}

export default memo(OtCeoApproval) 