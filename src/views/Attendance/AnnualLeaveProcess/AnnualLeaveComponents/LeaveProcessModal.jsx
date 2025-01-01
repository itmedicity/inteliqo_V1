import { Box, Button, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { getYear, } from 'date-fns'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CustomTypoTwo from 'src/views/Component/MuiCustomComponent/CustomTypoTwo'
import { casualLeaveInsertFun, getEmployeeProcessStartAndEndDate, insertCommonLeaves, insertEarnLeaves, insertHolidayFun, updateCasualLeave, updateCommonLeaves, updateEarnLeaves, updateHolidayLeaves } from 'src/views/EmployeeRecord/EmployeeFile/EmployeeProfile/EmpMenus/LeaveProcess/Functions/LeaveProcessFun'


const LeaveProcessModal = ({ open, setOpen, empdata, empCategory, newLeaveData }) => {

    const [processedLeave, setProcessedLeave] = useState([])
    const [update, setUpdate] = useState(0)

    const category = useMemo(() => empCategory, [empCategory])

    // const processedLeave = useMemo(() => empdata, [empdata])

    const empCategoryProcess = useSelector((state) => state?.getEmployeeProcessRecord?.ProcessRecord)
    const empCategoryProcessDetl = useMemo(() => empCategoryProcess, [empCategoryProcess])
    // const statutory = useSelector((state) => state?.setStatutoryInfo?.data)
    //const esiInfo = useMemo(() => statutory, [statutory])

    useEffect(() => {

        const { em_no } = category
        const getProcessDataObj = {
            em_no: em_no,
            year: getYear(new Date(),)
        }

        const getEmployeeCurrentLeaveInfo = async () => {
            const getProcessDataLastYear = await axioslogin.post('/yearleaveprocess/getLeaveProccedData', getProcessDataObj);
            const { success, msge } = getProcessDataLastYear.data;
            if (success === 1) {
                const processedLeaveData = [
                    { ...msge, name: 'Casual Leave', value: msge?.hrm_clv ?? 2, leave: 1, },
                    { ...msge, name: 'Common Leave', value: msge?.hrm_cmn ?? 2, leave: 2, },
                    { ...msge, name: 'Privilege Leave', value: msge?.hrm_ern_lv ?? 2, leave: 3, },
                    { ...msge, name: 'Holiday Leave', value: msge?.hrm_hld ?? 2, leave: 4, },
                ]
                setProcessedLeave(processedLeaveData)
                setUpdate(0)
            }

        }
        getEmployeeCurrentLeaveInfo()

    }, [category, update])






    const handleColse = useCallback(async () => {
        setOpen(false)
    }, [setOpen])

    const leaveCreditProcessFun = useCallback((val) => {

        const { leave, lv_process_slno, } = val

        const { em_id, em_no, em_esi_status } = newLeaveData
        const esiStatus = em_esi_status === null ? 0 : em_esi_status

        getEmployeeProcessStartAndEndDate(empCategoryProcessDetl).then((calulatedProcessDate) => {
            const { em_gender, date_of_join } = empCategoryProcessDetl;
            const { status } = calulatedProcessDate;

            if (status === 0) {
                warningNofity('Invalid Dates Showing ! ,Please check the Joining Dates')
            } else {

                if (leave === 1) {
                    // Casual Leave Process and Leave Crediting
                    updateCasualLeave(calulatedProcessDate, lv_process_slno, em_id, em_no).then((value) => {

                        //insert Casula Leave function
                        Object.keys(value).length > 0 && casualLeaveInsertFun(value, lv_process_slno).then((value) => {
                            let { status, message } = value;
                            if (status === 1) {
                                infoNofity(message)
                                setUpdate(Math.random())
                                // dispatch({ type: UPDATE_CASUAL_LEAVE })
                            } else {
                                warningNofity(message)
                            }
                        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 117' + err) })

                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -119' + err) })
                }
                else if (leave === 2) {
                    //Common Off days Leave Credit option
                    updateCommonLeaves(lv_process_slno, em_id, em_no, em_gender, esiStatus, category).then((values) => {
                        const { status, data } = values;
                        //insert Common Leaves
                        if (status === 1) {
                            insertCommonLeaves(data, lv_process_slno).then((messages) => {
                                let { status, message } = messages;
                                if (status === 1) {
                                    infoNofity(message)
                                    setUpdate(Math.random())
                                    //dispatch({ type: UPDATE_CASUAL_LEAVE })
                                } else {
                                    warningNofity(message)
                                }
                            }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 136' + err) })
                        }
                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 138' + err) })
                }
                else if (leave === 3) {
                    // Earn Leave Process and Leave Crediting
                    updateEarnLeaves(calulatedProcessDate, lv_process_slno, em_id, em_no).then((dateRange) => {
                        //insert privilege leaves
                        insertEarnLeaves(dateRange, lv_process_slno, date_of_join, em_no).then((msage) => {
                            let { status, message } = msage;
                            if (status === 1) {
                                infoNofity(message)
                                setUpdate(Math.random())
                                //dispatch({ type: UPDATE_CASUAL_LEAVE })
                            } else {
                                warningNofity(message)
                            }
                        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -152' + err) })

                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line - 154' + err) })

                }
                else if (leave === 4) {
                    // National And Festival Holiday
                    updateHolidayLeaves(calulatedProcessDate, lv_process_slno, em_id, em_no, date_of_join).then((value) => {
                        //insert function holiday
                        let { status, data } = value;

                        if (status === 0) {
                            warningNofity("Holiday List Not Updted For Current Year")
                        } else if (Object.keys(data).length === 0) {
                            warningNofity("Holidays Not Available For Updates")
                        } else {
                            Object.keys(value).length > 0 && insertHolidayFun(data, lv_process_slno).then((values) => {
                                let { status, message } = values;
                                if (status === 1) {
                                    infoNofity(message)
                                    setUpdate(Math.random())
                                    // dispatch({ type: UPDATE_CASUAL_LEAVE })
                                } else {
                                    warningNofity(message)
                                }
                            }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! line -174 ' + err) })
                        }
                    }).catch((err) => { warningNofity('Error ! ,Contact Edp !!!line 177' + err) })

                }
            }

        }).catch((err) => { warningNofity('Error ! ,Contact Edp !!! ' + err) })

    }, [empCategoryProcessDetl, category, newLeaveData,])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalDialog size="lg" sx={{ p: 0, width: 500 }}  >

                <ModalClose
                    //  variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                    }}
                />
                <Box sx={{
                    p: 1,
                    width: '100%', display: 'flex', borderRadius: 0, flex: 1,
                    // bgcolor: '#E0FBE2'
                }}>
                    <Box sx={{ flex: 1, width: '100%' }} >
                        <Typography sx={{ fontWeight: 600 }} >
                            Employee Leave Process
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex', px: 1,
                        flexDirection: 'column', flex: 1
                    }} >
                    {
                        processedLeave?.map((val, ind) => {
                            return <Box key={ind} sx={{ display: 'flex', p: 0.3, height: 30, flex: 1, }}>
                                <Box sx={{ display: 'flex', width: '70%', pt: 0.5 }}>
                                    <CustomTypoTwo title={val.name} updateStatus={val.value === 1 ? true : false} />
                                </Box>
                                <Box sx={{ display: 'flex', width: '30%', pt: 0.05 }}>
                                    <Button
                                        variant="outlined"
                                        size='sm'
                                        sx={{ mx: 0.5, flex: 1, mt: 0.01 }}
                                        disabled={val.value === 1 ? true : false}
                                        onClick={() => leaveCreditProcessFun(val)}
                                    >
                                        Process
                                    </Button>
                                </Box>
                            </Box>
                        })
                    }
                </Box>
                <Box sx={{ py: 0.5, display: 'flex', justifyContent: 'flex-end', px: 2, }} >


                    <Button variant="solid" color="primary" onClick={handleColse}>
                        Close
                    </Button>

                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(LeaveProcessModal) 