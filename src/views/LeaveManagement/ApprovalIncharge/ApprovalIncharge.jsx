import React, { Fragment, useEffect, useState } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { useHistory } from 'react-router'
import { getleaverequest, infoNofity } from 'src/views/CommonCode/Commonfunc';
import { useDispatch, useSelector } from 'react-redux'
import { memo } from 'react'
import { Box, IconButton, Paper, Tooltip } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import ApprovalDeptSectSelection from 'src/views/MuiComponents/ApprovalDeptSectSelection'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LeavRqModel from '../LeaveCommonComponent/LeavRqModel'
import HaldayRqModel from '../LeaveCommonComponent/HaldayRqModel'
import NopunchRqModel from '../LeaveCommonComponent/NopunchRqModel'
import CompOffRqModel from '../LeaveCommonComponent/CompOffRqModel'
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import { getCompOffRqstAll, getHalfdayRqstAll, getLeaveRequestAll, getNopunchRqstAll } from 'src/redux/actions/LeaveApprovalAction';
import _ from 'underscore';
import { compensatoryMapping, Halfdaymapping, MappingData, nopunchmapping } from '../LeaveCommonComponent/LeaveApprovalFunc';
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout';
import { getHodBasedDeptSectionName, getSectionHaldayRequest, getSectionLeaveRequest, getSectionMisspunchRequest } from 'src/redux/actions/LeaveReqst.action';
import HodWiseEmpList from 'src/views/MuiComponents/JoyComponent/HodWiseEmpList';
import HodWiseDeptSection from 'src/views/MuiComponents/JoyComponent/HodWiseDeptSection';
import LeaveTable from './LeaveTable';
import { getDepartmentSectionBasedHod } from '../LeavereRequsition/Func/LeaveFunction';

const ApprovalIncharge = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [leaverequesttype, setleaverequesttype] = useState([]);//leave type list
    const [deptSect, setDeptSect] = useState(0)//select box selected department section
    const [DeptSect, updateDeptSect] = useState([])//logined incharge dept section list
    const [levtpevalue, setleavetypevalue] = useState(1)//selected checkbox
    const [tableData, setTableData] = useState([])//for displaying table data
    const [slno, setSlno] = useState(0)//setting selected row slno
    const [reqtype, setreqtype] = useState(0)//for setting leave type linke halfday,leave req etc
    const [count, setcount] = useState(0)//to render dispatch useeffect

    //state for pen model
    const [openleave, setOpenleave] = useState(false);
    const [opennopunch, setOpennopunch] = useState(false);
    const [opencompen, setOpencompen] = useState(false);
    const [openhalf, setOpenhalf] = useState(false);

    //login incharge id
    const em_id = useSelector((state) => {
        return state?.getProfileData?.ProfileData[0]?.em_id ?? 0;
    })

    useEffect(() => {
        dispatch(getHodBasedDeptSectionName(em_id));
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
    }, [dispatch, count])

    useEffect(() => {
        const fetchData = async (em_id) => {
            const result = await getDepartmentSectionBasedHod(em_id);
            const section = await result?.map((e) => e.dept_section)
            const postData = {
                sectIds: section
            }
            dispatch(getSectionLeaveRequest(postData))
            dispatch(getSectionHaldayRequest(postData))
            dispatch(getSectionMisspunchRequest(postData))
        }
        fetchData(em_id)
    }, [em_id])



    // const leaveRqData = useSelector((state) => state?.setAllLeaveApproval?.leaveRqData?.leaveRqList, _.isEqual)
    // const halfdayRqData = useSelector((state) => state?.setAllLeaveApproval?.halfdayRqData?.halfdayRqList, _.isEqual)
    // const nopunchRqData = useSelector((state) => state?.setAllLeaveApproval?.nopunchRqData?.nopunchRqList, _.isEqual)
    // const compOffrqData = useSelector((state) => state?.setAllLeaveApproval?.compOffrqData?.compOffRqList, _.isEqual)

    // useEffect(() => {
    //     //leavetype
    //     getleaverequest().then((val) => {
    //         setleaverequesttype(val)
    //     })
    //     const arraydepsect = DeptSect.map((val) => { return val.dept_section })
    //     if (arraydepsect.length !== 0) {
    //         if (levtpevalue === 1 && deptSect === 0) {
    //             const filtered = leaveRqData.filter(val => arraydepsect.includes(val.dept_section))
    //             const filterleavereq = filtered && filtered.filter((val) => {
    //                 return (val.inc_apprv_req === 1)
    //             })
    //             MappingData(filterleavereq).then((val) => {
    //                 if (Object.keys(val).length > 0) {
    //                     const arr = val && val.filter((k) => {
    //                         return (k.hr_apprv !== 1)
    //                     })
    //                     setTableData(arr)
    //                 } else {
    //                     infoNofity("No Leave request pending for this department!!")
    //                     setTableData([])
    //                 }
    //             })
    //         } else if (levtpevalue === 1 && deptSect !== 0) {
    //             const filterleavereq = leaveRqData && leaveRqData.filter((val) => {
    //                 return (val.dept_section === deptSect && val.inc_apprv_req === 1)
    //             })
    //             MappingData(filterleavereq).then((val) => {
    //                 if (Object.keys(val).length > 0) {
    //                     const arr = val && val.filter((k) => {
    //                         return (k.hr_apprv !== 1)
    //                     })
    //                     setTableData(arr)
    //                 } else {
    //                     infoNofity("No Leave request pending for this department!!")
    //                     setTableData([])
    //                 }
    //             })
    //         } else if (levtpevalue === 2 && deptSect === 0) {
    //             const filtered = halfdayRqData.filter(val => arraydepsect.includes(val.dept_section))
    //             const filterleavereq = filtered && filtered.filter((val) => {
    //                 return (val.hf_inc_apprv_req === 1)
    //             })
    //             Halfdaymapping(filterleavereq).then((val) => {
    //                 if (Object.keys(val).length > 0) {
    //                     const arr = val && val.filter((k) => {
    //                         return (k.hr_apprv !== 1)
    //                     })
    //                     setTableData(arr)
    //                 } else {
    //                     infoNofity("No Leave request pending for this department!!")
    //                     setTableData([])
    //                 }
    //             })
    //         } else if (levtpevalue === 2 && deptSect !== 0) {
    //             const filterdata = halfdayRqData && halfdayRqData.filter((val) => {
    //                 return (val.dept_section === deptSect && val.hf_inc_apprv_req === 1)
    //             })
    //             Halfdaymapping(filterdata).then((val) => {
    //                 if (Object.keys(val).length > 0) {
    //                     const arr = val && val.filter((k) => {
    //                         return (k.hr_apprv !== 1)
    //                     })
    //                     setTableData(arr)
    //                 } else {
    //                     infoNofity("No Leave request pending for this department!!")
    //                     setTableData([])
    //                 }
    //             })
    //         } else if (levtpevalue === 3 && deptSect === 0) {
    //             const filtered = nopunchRqData.filter(val => arraydepsect.includes(val.em_dept_section))
    //             const filterleavereq = filtered && filtered.filter((val) => {
    //                 return (val.np_inc_apprv_req === 1)
    //             })
    //             nopunchmapping(filterleavereq).then((val) => {
    //                 if (Object.keys(val).length > 0) {
    //                     const arr = val && val.filter((k) => {
    //                         return (k.hr_apprv !== 1)
    //                     })
    //                     setTableData(arr)
    //                 } else {
    //                     infoNofity("No Leave request pending for this department!!")
    //                     setTableData([])
    //                 }
    //             })
    //         } else if (levtpevalue === 3 && deptSect !== 0) {
    //             const filterdata = nopunchRqData && nopunchRqData.filter((val) => {
    //                 return (val.em_dept_section === deptSect && val.np_inc_apprv_req === 1)
    //             })
    //             nopunchmapping(filterdata).then((val) => {
    //                 if (Object.keys(val).length > 0) {
    //                     const arr = val && val.filter((k) => {
    //                         return (k.hr_apprv !== 1)
    //                     })
    //                     setTableData(arr)
    //                 } else {
    //                     infoNofity("No Leave request pending for this department!!")
    //                     setTableData([])
    //                 }
    //             })
    //         } else if (levtpevalue === 4 && deptSect === 0) {
    //             const filtered = compOffrqData.filter(val => arraydepsect.includes(val.em_dept_section))
    //             const filterleavereq = filtered && filtered.filter((val) => {
    //                 return (val.cf_inc_apprv_req === 1)
    //             })
    //             compensatoryMapping(filterleavereq).then((val) => {
    //                 if (Object.keys(val).length > 0) {
    //                     const arr = val && val.filter((k) => {
    //                         return (k.hr_apprv !== 1)
    //                     })
    //                     setTableData(arr)
    //                 } else {
    //                     infoNofity("No Leave request pending for this department!!")
    //                     setTableData([])
    //                 }
    //             })
    //         } else if (levtpevalue === 4 && deptSect !== 0) {
    //             const filterdata = compOffrqData && compOffrqData.filter((val) => {
    //                 return (val.em_dept_section === deptSect && val.cf_inc_apprv_req === 1)
    //             })
    //             compensatoryMapping(filterdata).then((val) => {
    //                 if (Object.keys(val).length > 0) {
    //                     const arr = val && val.filter((k) => {
    //                         return (k.hr_apprv !== 1)
    //                     })
    //                     setTableData(arr)
    //                 } else {
    //                     infoNofity("No Leave request pending for this department!!")
    //                     setTableData([])
    //                 }
    //             })
    //         }
    //         else {
    //             setTableData([])
    //         }
    //     }
    // }, [DeptSect, levtpevalue, deptSect, halfdayRqData, nopunchRqData, compOffrqData, count, leaveRqData]);

    // const handleClick = async (params) => {
    //     const data = params.api.getSelectedRows()
    //     const { req_type, SlNo } = data[0]
    //     setreqtype(req_type)
    //     setSlno(SlNo)
    //     if (req_type === 1) {
    //         setOpenleave(true)
    //     } else if (req_type === 2) {
    //         setOpenhalf(true)
    //     } else if (req_type === 3) {
    //         setOpennopunch(true)
    //     } else if (req_type === 4) {
    //         setOpencompen(true);
    //     }
    // }
    // const handleClose = () => {
    //     // setOpenleave(false);
    //     setOpennopunch(false);
    //     setOpencompen(false);
    //     setOpenhalf(false);
    // };
    return (
        <Fragment>
            {/* {
                reqtype === 1 ? <LeavRqModel open={openleave} setOpen={setOpenleave} slno={slno} authority={1} em_id={em_id} count={count} setcount={setcount} />
                    : reqtype === 2 ? <HaldayRqModel open={openhalf} setOpen={setOpenhalf} handleClose={handleClose} slno={slno} authority={1} em_id={em_id} count={count} setcount={setcount} />
                        : reqtype === 3 ? <NopunchRqModel open={opennopunch} setOpen={setOpennopunch} handleClose={handleClose} slno={slno} authority={1} em_id={em_id} count={count} setcount={setcount} />
                            : reqtype === 4 ? <CompOffRqModel open={opencompen} setOpen={setOpencompen} handleClose={handleClose} slno={slno} authority={1} em_id={em_id} count={count} setcount={setcount} /> : null
            } */}
            <CustomLayout title="Leave Approval Incharge" displayClose={true} >
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, p: 0.5, alignItems: 'center' }} >
                        <Box sx={{ flex: 1, px: 0.5 }}>
                            <HodWiseDeptSection detSection={deptSect} setSectionValue={setDeptSect} />
                        </Box>
                        <Box sx={{ display: 'flex', flex: 2 }}>
                            <CssVarsProvider>
                                {
                                    leaverequesttype?.map((val, idx) => {
                                        return <Box sx={{
                                            display: 'flex', p: 1,
                                            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                        }}
                                            key={val.lrequest_slno}
                                        >
                                            <MappingCheckbox
                                                label={val.lrequest_short}
                                                name={val.lrequest_short}
                                                value={val.lrequest_slno}
                                                onChange={setleavetypevalue}
                                                checkedValue={levtpevalue}
                                            />
                                        </Box>
                                    })
                                }
                            </CssVarsProvider>
                        </Box>

                    </Paper>
                    <LeaveTable levtpevalue={levtpevalue} deptSect={deptSect} />
                </Box>
            </CustomLayout>
        </Fragment >
    )
}
export default memo(ApprovalIncharge)