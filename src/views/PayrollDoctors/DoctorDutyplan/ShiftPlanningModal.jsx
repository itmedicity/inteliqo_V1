import React, { lazy, memo, useCallback, useState } from 'react'
import {
    Box, Modal, ModalClose,
    Typography,
} from '@mui/joy';
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import { useQuery } from 'react-query';
import { getDoctordutyList } from 'src/views/Master/MenuCreationMaster/FuncLis';
import { getCommonSettingData, getDepartmentSectionShift } from 'src/redux/reduxFun/useQueryFunctions';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

const ConsultingShift = lazy(() => import('./BulkDoctordutyModal'))

const ShiftPlanningModal = ({
    open,
    setOpen,
    departmentSectionShift,
    selectedDateKey,
    selecteedEmployee,
    currentEmpdata,
    settableArray,
    sectionEmployee,
}) => {

    const [selectValue, setSelectValue] = useState(0)
    const [selectedWeeks, setSelectedWeeks] = useState({})
    const [selectedDuty, setSelectedDuty] = useState(0)
    const [selectedDoctorduty, setselcteddocotrduty] = useState({})
    const [openSubModal, setOpenSubModal] = useState(false)

    const weeks = [
        { value: 1, label: "Sunday" },
        { value: 2, label: "Monday" },
        { value: 3, label: "Tuesday" },
        { value: 4, label: "Wednesday" },
        { value: 5, label: "Thursday" },
        { value: 6, label: "Friday" },
        { value: 7, label: "Saturday" },
    ]


    const { data: dutyList, isLoading: isdoctorDutyLoading,
        error: doctorDutyError } = useQuery({
            queryKey: ['doctorDutyList'],
            queryFn: getDoctordutyList
        })

    const { data: commonSettingData, isLoading: iscommonSettingLoading,
        error: commonSettingError } = useQuery({
            queryKey: ['commongSettingData'],
            queryFn: getCommonSettingData
        })

    const { data: sectionShiftList } = useQuery({
        queryKey: ['getDepartmentShiftList', departmentSectionShift],
        queryFn: () => getDepartmentSectionShift(departmentSectionShift),
        enabled: !!departmentSectionShift,
        staleTime: Infinity
    })

    // Function to handleModal close
    const handleModalClose = useCallback(() => {
        setOpen(false)
        setSelectValue(0)
        setSelectedDuty(0)
    }, [setOpen]);

    const handleWeeksFunc = useCallback((val) => {
        setSelectValue(val?.value)
        setSelectedWeeks(val)
    }, [])

    const handleModalfunc = useCallback((val) => {
        if (sectionShiftList?.length === 0) {
            setOpen(false)
            setSelectValue(0)
            setSelectedDuty(0)
            return infoNofity("No Shift Added Agaisnt Department")
        } else {
            setSelectedDuty(val?.dutyslno)
            setselcteddocotrduty(val)
            setOpenSubModal(true)
        }
    }, [sectionShiftList, setOpen])

    if (iscommonSettingLoading || isdoctorDutyLoading) return <p>Loading...</p>
    if (commonSettingError || doctorDutyError) return <p>Error occurred.</p>

    return (
        <>
            <ConsultingShift
                open={openSubModal}//submodal state
                setOpen={setOpenSubModal}//submodal setstate
                sectionShiftList={sectionShiftList}//department wise shift list
                selectedDateKey={selectedDateKey}
                commonSettingData={commonSettingData}// common seeting data
                selectedWeeks={selectedWeeks}
                selectedDoctorduty={selectedDoctorduty}
                setParentOpen={setOpen}
                selecteedEmployee={selecteedEmployee}
                setSelectValue={setSelectValue}
                setSelectedDuty={setSelectedDuty}
                currentEmpdata={currentEmpdata}
                settableArray={settableArray}
                sectionEmployee={sectionEmployee}
            />
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
                        boxShadow: 'lg',
                        bgcolor: 'background.body',
                        minHeight: 400
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
                    <Box sx={{ bgcolor: 'white', justifyContent: 'space-between' }}>
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
                        <Box sx={{ display: 'flex', flex: 2, p: 2 }}>
                            <Box sx={{ display: 'flex', flex: 2, flexDirection: "column" }}>

                                {
                                    weeks?.map((val, idx) => {
                                        return <Box sx={{
                                            display: 'flex', p: 1,
                                            width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                        }}
                                            key={idx}
                                        >
                                            <MappingCheckbox
                                                label={val.label}
                                                name={val.label}
                                                value={val.value}
                                                onChange={() => handleWeeksFunc(val)}
                                                checkedValue={selectValue}
                                            />
                                        </Box>
                                    })
                                }
                            </Box>
                            <Box border={1} sx={{ display: 'flex', flex: 2, flexDirection: "column" }}>
                                {
                                    selectValue !== 0 && selectValue !== null ? <>
                                        {
                                            dutyList?.map((val, idx) => {
                                                return <Box sx={{
                                                    display: 'flex', p: 1,
                                                    width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                                                }}
                                                    key={idx}
                                                >
                                                    <MappingCheckbox
                                                        label={val.duty_name}
                                                        name={val.duty_name}
                                                        value={val.dutyslno}
                                                        onChange={() => handleModalfunc(val)}
                                                        checkedValue={selectedDuty}
                                                    />
                                                </Box>
                                            })
                                        }</> : null
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default memo(ShiftPlanningModal) 