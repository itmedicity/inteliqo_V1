import { Button, CssVarsProvider } from '@mui/joy'
import { Box, IconButton, Paper, TextareaAutosize, Tooltip } from '@mui/material'
import moment from 'moment'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { getGeneralRqst } from 'src/redux/actions/CommonReqst.Action'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import GeneralrequestSelect from 'src/views/MuiComponents/GeneralrequestSelect'
import _ from 'underscore'
import DeleteIcon from '@mui/icons-material/Delete';

const Generalrequest = () => {
    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])

    const { em_no, em_id, em_department, em_dept_section, hod: empHodStat, incharge: empInchrgStat } = selectedEmployeeDetl?.[0];

    const [requsttype, setRequestType] = useState(0)
    const [comments, setComments] = useState('')
    const [tableData, setTableData] = useState([])
    const [count, setCount] = useState(0)

    const postData = useMemo(() => {
        return {
            em_id: em_id,
            em_no: em_no,
            dept_id: em_department,
            dept_sect_id: em_dept_section,
            request_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            general_request_type: requsttype,
            request_comments: comments
        }
    }, [em_id, em_no, em_department, em_dept_section, requsttype, comments])

    const submitRequest = async () => {
        if (requsttype === 0) {
            warningNofity("Please Select Any Request")
        } else {
            const result = await axioslogin.post('/CommonReqst/craete/general', postData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message)
                setComments('')
                setRequestType(0)
            } else {
                errorNofity(message)
                setComments('')
                setRequestType(0)
            }
        }
    }

    // useEffect(() => {
    //     dispatch(getGeneralRqst())
    // }, [dispatch, count])

    // const generalData = useSelector((state) => state?.setCommonreqstAll?.generalData?.generalDataList, _.isEqual)
    // const genrealReqst = useMemo(() => generalData, [generalData])

    // useEffect(() => {
    //     if (Object.keys(genrealReqst).length > 0) {
    //         const filterArray = genrealReqst && genrealReqst.filter((val) => {
    //             return (val.em_id === empId)
    //         })
    //         const arr = filterArray.map((val) => {
    //             return {
    //                 slno: val.general_slno,
    //                 serialno: val.serialno,
    //                 reqDate: moment(val.request_date).format('DD-MM-YYYY'),
    //                 dutyDate: moment(val.miss_punch_day).format('DD-MM-YYYY'),
    //                 requestname: val.request_name,
    //                 hrstatus: val.hr_status,
    //                 status: (val.hr_status === 1) ? 'HR Approved' : 'HR Approval Pending'
    //             }
    //         })
    //         setTableData(arr);
    //     } else {
    //         setTableData([])
    //     }
    // }, [genrealReqst])


    // const [column] = useState([
    //     { headerName: 'Slno ', field: 'serialno', filter: true },
    //     { headerName: 'Request Date', field: 'reqDate', filter: true },
    //     { headerName: 'Request Type  ', field: 'requestname', },
    //     { headerName: 'Status', field: 'status', filter: true },
    //     {
    //         headerName: 'Action',
    //         cellRenderer: params =>
    //             <Fragment>
    //                 <Tooltip title="Delete" followCursor placement='top' arrow >
    //                     <IconButton sx={{ paddingY: 0.5 }}
    //                         onClick={() => deleteRequest(params)}
    //                     >
    //                         <DeleteIcon color='primary' />
    //                     </IconButton>
    //                 </Tooltip>
    //             </Fragment>
    //     },
    // ])

    // const deleteRequest = useCallback(async (params) => {
    //     const data = params.api.getSelectedRows()
    //     const { hrstatus, slno } = data[0]
    //     if (hrstatus === 1) {
    //         warningNofity("HR Approval is Already done! You can't delete request")
    //     } else {
    //         const Ids = {
    //             slno: slno
    //         }
    //         const result = await axioslogin.patch('/CommonReqst/cancel/general', Ids)
    //         const { message, success } = result.data
    //         if (success === 1) {
    //             succesNofity(message)
    //             setCount(count + 1)
    //         } else {
    //             warningNofity(message)
    //         }
    //     }
    // }, [])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%', pt: 0.5 }}>
                <Box sx={{ flex: 1, pr: 0.3, pt: 1 }} >
                    <GeneralrequestSelect value={requsttype} setValue={setRequestType} />
                </Box>
                <Box sx={{ flex: 3, pr: 0.3 }}>
                    <TextareaAutosize
                        style={{ width: "100%", display: "flex" }}
                        minRows={2}
                        placeholder="Comments Here"
                        value={comments}
                        name="comments"
                        onChange={(e) => setComments(e.target.value)}
                    />
                </Box>
                <Box sx={{ pr: 0.3, mt: 0.9 }}>
                    <CssVarsProvider>
                        <Button
                            variant="outlined"
                            component="label"
                            size="md"
                            color="primary"
                            onClick={submitRequest}
                        >
                            Save
                        </Button>
                    </CssVarsProvider>
                </Box>
            </Box>
        </Fragment >
    )
}

export default memo(Generalrequest)