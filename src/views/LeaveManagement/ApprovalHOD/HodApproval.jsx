import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { getleaverequest, } from 'src/views/CommonCode/Commonfunc'
import { useDispatch, useSelector } from 'react-redux'
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import HodWiseDeptSection from 'src/views/MuiComponents/JoyComponent/HodWiseDeptSection'
import { getHodBasedDeptSectionName, getSectionHaldayRequest, getSectionLeaveRequest, getSectionMisspunchRequest } from 'src/redux/actions/LeaveReqst.action'
import { getDepartmentSectionBasedHod } from '../LeavereRequsition/Func/LeaveFunction'
import HodleaveTable from './HodleaveTable'

const HodApproval = () => {

    const dispatch = useDispatch()

    const [leaverequesttype, setleaverequesttype] = useState([]);//leave type list
    const [deptSect, setDeptSect] = useState(0)//select box selected department section
    const [levtpevalue, setleavetypevalue] = useState(1)//selected checkbox
    const [count, setcount] = useState(0)//to render dispatch useeffect

    //login incharge id
    const em_id = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0)

    useEffect(() => {
        dispatch(getHodBasedDeptSectionName(em_id));
        getleaverequest().then((val) => {
            setleaverequesttype(val)
        })
    }, [dispatch, em_id])

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
            setcount(0)
        }
        fetchData(em_id)
    }, [em_id, dispatch, count])
    return (
        <CustomLayout title="Leave Approval HOD" displayClose={true} >
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
                <HodleaveTable levtpevalue={levtpevalue} deptSect={deptSect} setcount={setcount} />
            </Box>
        </CustomLayout>
        // <Fragment>
        //     {
        //         reqtype === 1 ? <LeavRqModel open={openleave} setOpen={setOpenleave} handleClose={handleClose} slno={slno} authority={2} em_id={em_id} count={count} setcount={setcount} />
        //             : reqtype === 2 ? <HaldayRqModel open={openhalf} setOpen={setOpenhalf} handleClose={handleClose} slno={slno} authority={2} em_id={em_id} count={count} setcount={setcount} />
        //                 : reqtype === 3 ? <NopunchRqModel open={opennopunch} setOpen={setOpennopunch} handleClose={handleClose} slno={slno} authority={2} em_id={em_id} count={count} setcount={setcount} />
        //                     : reqtype === 4 ? <CompOffRqModel open={opencompen} setOpen={setOpencompen} handleClose={handleClose} slno={slno} authority={2} em_id={em_id} count={count} setcount={setcount} />
        //                         : null
        //     }
        //     <PageLayoutCloseOnly
        //         heading="Leave Approval HOD"
        //         redirect={RedirectToProfilePage}
        //     >
        //         <Paper variant="outlined" square sx={{ display: 'flex', flex: 1, mb: 0.4, p: 0.8, alignItems: 'center' }} >
        //             <Box sx={{ display: 'flex', flex: 1, pt: 0.4, pr: 0.8 }} >
        //                 <ApprovalDeptSectSelection em_id={em_id} value={deptSect} setValue={setDeptSect} updateDeptSect={updateDeptSect} />
        //             </Box>
        //             <Box sx={{ display: 'flex', flex: 2 }}>
        //                 <CssVarsProvider>
        //                     {
        //                         leaverequesttype && leaverequesttype?.map((val, idx) => {
        //                             return <Box sx={{
        //                                 display: 'flex', p: 1,
        //                                 width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
        //                             }}
        //                                 key={val.lrequest_slno}
        //                             >
        //                                 <MappingCheckbox
        //                                     label={val.lrequest_short}
        //                                     name={val.lrequest_short}
        //                                     value={val.lrequest_slno}
        //                                     onChange={setleavetypevalue}
        //                                     checkedValue={levtpevalue}
        //                                 />
        //                             </Box>
        //                         })
        //                     }
        //                 </CssVarsProvider>
        //             </Box>
        //         </Paper>
        //         <Paper square elevation={0} sx={{ pt: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
        //             <CommonAgGrid
        //                 columnDefs={columnDef}
        //                 tableData={tableData}
        //                 sx={{
        //                     height: 600,
        //                     width: "100%"
        //                 }}
        //                 rowHeight={30}
        //                 headerHeight={30}
        //                 rowStyle={rowStyle}
        //                 getRowStyle={getRowStyle}
        //             />
        //         </Paper>
        //     </PageLayoutCloseOnly>
        // </Fragment >
    )
}

export default memo(HodApproval) 