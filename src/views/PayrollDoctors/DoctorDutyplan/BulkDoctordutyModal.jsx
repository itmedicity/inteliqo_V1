import { Box, Button, Modal, ModalClose, Option, Select, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { employeeIdNumber } from 'src/views/Constant/Constant';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const BulkDoctordutyModal = ({
    open,
    setOpen,
    sectionShiftList,
    selectedDateKey,
    commonSettingData,
    selectedWeeks,
    selectedDoctorduty,
    setParentOpen,
    selecteedEmployee,
    setSelectValue,
    setSelectedDuty,
    currentEmpdata,
    settableArray,
    sectionEmployee
}) => {

    const { notapplicable_shift, default_shift, week_off_day, doff } = commonSettingData;

    const [Shift, setShift] = useState(0)
    const [shiftName, setShiftName] = useState('')

    const handleModalClose = useCallback(() => {
        setOpen(false)
        setSelectValue(0)
        setSelectedDuty(0)
    }, [setOpen, setSelectValue, setSelectedDuty]);

    const multiShiftSubmit = async () => {
        if(Shift===0) return warningNofity('Must Select A Shift')
        const { arr } = selecteedEmployee;

        const obj = {
            shift_id: Shift,
            shiftName: shiftName,
            offday_flag: Shift === week_off_day ? 1 : 0
        }
        const filtered = selectedDateKey
            .filter(item => {
                const dayName = new Date(item.date).toLocaleDateString('en-US', { weekday: 'long' });
                return dayName === selectedWeeks.label;
            })
            .map(item => ({
                ...item,
                ...obj,
                ...selectedDoctorduty
            }));

        const updateData = filtered
            ?.filter(i => arr?.some(j => i?.date === j?.duty_day))
            ?.map(i => {
                const match = arr?.find(j => i?.date === j?.duty_day);

                return {
                    ...i,
                    dutyplan_slno: match?.dutyplan_slno,
                    dutySlno: i?.dutyslno,
                    plan_update_user: employeeIdNumber()
                };
            });
            
        const result = await axioslogin.patch('/DoctorsProcess/update/calendarduty', updateData);
        const { success } = result.data;
        if (success === 1) {

            const result = await axioslogin.post("/DoctorsProcess/getData", currentEmpdata)
            const { success, data } = result.data;
            if (success === 1) {
                const mainArray = sectionEmployee?.map((k) => {
                    return {
                        em_no: k?.em_no,
                        em_name: k?.emp_name,
                        arr: data?.filter((val) => val?.emp_id === k?.em_id ? val : null)

                    }
                })
                settableArray(mainArray);
                succesNofity("Dutyplan Inserted Successfully")
                setSelectValue(0)
                setSelectedDuty(0)
                setOpen(false)
                setShift(0)
                setParentOpen(false)
            } else {
                errorNofity("Error While getting dcotor ")
                setSelectValue(0)
                setSelectedDuty(0)
                setOpen(false)
                setParentOpen(false)
                setShift(0)
            }
        } else {
            errorNofity("Error While Inserting Dutyplan")
            setSelectValue(0)
            setSelectedDuty(0)
            setOpen(false)
            setParentOpen(false)
            setShift(0)
        }
    }
    return (
        <Modal
            open={open}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                variant="outlined"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    borderRadius: 'md',
                    p: 0.5,
                    boxShadow: 'lg',
                    bgcolor: 'background.body',
                    minHeight: 200
                }}
            >
                <ModalClose
                    onClick={handleModalClose}
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body',
                    }}
                />
                <Box
                    sx={{ border: '0.5px solid #e9ecef' }}
                >
                    <Box sx={{
                        p: 1,
                        width: '100%', display: 'flex', borderRadius: 0, flex: 1,
                        bgcolor: '#E0FBE2'
                    }}>
                        <Box sx={{ flex: 1, width: '100%' }} >
                            <Typography sx={{ fontWeight: 600 }} >
                                Consulting Duty selection
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, p: 1 }} >
                        <Select
                            value={Shift}
                            onChange={(event, newValue) => {
                                setShiftName(event.target.innerText)
                                setShift(newValue);
                            }}
                            size='md'
                            variant='outlined'
                            sx={{ width: '100%' }}
                        >
                            <Option disabled value={0}> Select Duty Shift</Option>
                            {
                                sectionShiftList?.map((val, index) => {
                                    return <Option
                                        value={val?.shiftcode}
                                        key={index}
                                        disabled={val?.shiftcode === notapplicable_shift || val?.shiftcode === default_shift || val?.shiftcode === doff ? true : false}
                                    >
                                        {val?.shiftDescription}
                                    </Option>
                                })
                            }
                        </Select>
                    </Box>
                    <Box sx={{ p: 1 }} >
                        <Box sx={{ display: 'flex', px: 2, py: 3, flexDirection: 'row-reverse', gap: 1 }}>
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={() => setOpen(false)}
                                size="sm"
                                sx={{ py: 0, color: '#d50000' }}
                            >
                                <CancelOutlinedIcon sx={{ fontSize: 25 }} />
                            </Button>

                            <Button
                                variant="outlined"
                                color="danger"
                                onClick={multiShiftSubmit}
                                size="sm"
                                sx={{ py: 0, color: '#81c784' }}
                            >
                                <LibraryAddCheckIcon sx={{ fontSize: 25 }} />
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default memo(BulkDoctordutyModal) 