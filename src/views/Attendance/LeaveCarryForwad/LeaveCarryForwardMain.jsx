import { Paper } from '@mui/material'
import React, { memo, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { endOfYear, format, isValid, startOfYear, } from 'date-fns';
import { Box, Button, Input, Sheet, Table, Tooltip } from '@mui/joy'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { useCallback } from 'react';
import { axioslogin } from '../../Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import JoyLeaveType from '../../MuiComponents/JoyComponent/JoyLeaveType';
import { lazy } from 'react';

const DeptTableView = lazy(() => import('../LeaveCarryForwad/DeptTableView'))

const LeaveCarryForwardMain = () => {
    const [leaveType, setLeaveType] = useState(0)
    const [selectedYear, setSelectedYear] = useState(new Date())
    // const [count, setCount] = useState(0)
    const [mainArray, setMainArray] = useState([])

    const onProcessClick = useCallback(async () => {
        //GET ALL DEPARTMENT SECTION LIST AND SHOW
        const result = await axioslogin.get('/payrollprocess/getAcriveDepartmentSection/');
        const { success, data } = result.data;
        if (success === 1) {
            const deptSectionData = data;
            if (isValid(new Date(selectedYear))) {
                const postData = {
                    fromDate1: format(startOfYear(new Date(selectedYear)), 'yyyy-MM-dd 00:00:00'),
                    toDate1: format(endOfYear(new Date(selectedYear)), 'yyyy-MM-dd 23:59:59'),
                    currentyear: format(new Date(selectedYear), 'yyyy-MM-dd '),
                }
                if (leaveType === 1) {
                    const result = await axioslogin.post('/yearleaveprocess/getYearlyCasualLeaveCount', postData);
                    const { success, data } = result.data
                    if (success === 1) {
                        const empCasualLeave = data?.map((i) => {
                            return { ...i, checkStatus: 0 }
                        })
                        const filteredArray = deptSectionData?.map((val) => {
                            const empdata = empCasualLeave?.filter((k) => k.sect_id === val.sect_id && (k.balance !== 0) && (k.balance !== null) && (k.carryforward === 0));
                            if (empdata?.length > 0) {
                                return {
                                    ...val,
                                    "leaveType": 1,
                                    "empdata": empdata
                                };
                            }
                            return null;
                        }).filter(Boolean); // Remove any undefined values (in case empdata is empty)
                        // setMainArray(filteredArray)
                        if (filteredArray?.length === 0) {
                            warningNofity("There Is No Data To Display")
                        } else {
                            setMainArray(filteredArray)
                        }
                    } else {
                        warningNofity("There Is No Data To Display")
                    }
                } else if (leaveType === 7) {
                    const result = await axioslogin.post('/yearleaveprocess/getYearlySickLeaveCount', postData);
                    const { success, data } = result.data
                    if (success === 1) {
                        const empCasualLeave = data?.map((i) => {
                            return { ...i, checkStatus: 0 }
                        })

                        const sickLeaveArray = deptSectionData?.map((val) => {
                            return {
                                ...val,
                                "leaveType": 7,
                                "empdata": empCasualLeave?.filter((k) => (k.sect_id === val.sect_id) && (k.balance !== 0) && (k.balance !== null) && (k.carryforward === 0))
                            }
                        })


                        if (sickLeaveArray?.length === 0) {
                            warningNofity("There Is No Data To Display")
                        } else {
                            setMainArray(sickLeaveArray)
                        }
                    } else {
                        //setTableData([])
                        warningNofity("There Is No Data To Display")
                    }
                } else if (leaveType === 8) {
                    const result = await axioslogin.post('/yearleaveprocess/getYearlyEarnLeaveCount', postData);
                    const { success, data } = result.data
                    if (success === 1) {
                        const empEarnLeave = data?.map((i) => {
                            return { ...i, checkStatus: 0 }
                        })
                        const filteredArray = deptSectionData?.map((val) => {
                            const empdata = empEarnLeave?.filter((k) => k.sect_id === val.sect_id && (k.balance !== 0) && (k.balance !== null) && (k.carryforward === 0));
                            if (empdata?.length > 0) {
                                return {
                                    ...val,
                                    "leaveType": 8,
                                    "empdata": empdata
                                };
                            }
                            return null;
                        }).filter(Boolean); // Remove any undefined values (in case empdata is empty)


                        if (filteredArray?.length === 0) {
                            warningNofity("There Is No Data To Display")
                        } else {
                            setMainArray(filteredArray)
                        }
                    } else {
                        warningNofity("There Is No Data To Display")
                    }
                }
            } else {
                warningNofity("Please Select A Valid Date!")
            }
        } else {
            warningNofity("Error Getting the Department Details")
            //setOpenBkDrop(false)
        }
    }, [selectedYear, leaveType])


    const handleChange = useCallback((e, k) => {

        if (e === true) {
            const arr = mainArray?.map((val) => {
                return {
                    ...val,
                    "empdata": val?.empdata?.map((e) => k.em_no === e.em_no ? { ...e, checkStatus: 1 } : { ...e })
                }
            })
            setMainArray(arr)
        } else {
            const arr = mainArray?.map((val) => {
                return {
                    ...val,
                    "empdata": val?.empdata?.map((e) => k.em_no === e.em_no ? { ...e, checkStatus: 0 } : { ...e })
                }
            })
            setMainArray(arr)
        }

    }, [mainArray])

    return (
        <CustomLayout title="Leave Carry Forward" displayClose={true} >
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Paper variant='outlined' sx={{ display: "flex", alignItems: "center", border: 0, py: 0.5, width: '100%' }}  >
                    <Box sx={{ flex: 0, px: 0.5, }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                value={selectedYear}
                                size="small"
                                onChange={(newValue) => {
                                    setSelectedYear(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} disabled={true} />

                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, }}>
                        <JoyLeaveType value={leaveType} setValue={setLeaveType} />
                    </Box>
                    <Box sx={{ flex: 0, px: 1, }}>
                        <Tooltip title="Save" followCursor placement='top' arrow >
                            <Button
                                aria-label="Like"
                                variant="outlined"
                                color="primary"
                                onClick={onProcessClick}
                                fullWidth
                                startDecorator={<PublishedWithChangesIcon />}
                                sx={{ mx: 0.5 }}
                            >
                                Search
                            </Button>
                        </Tooltip>
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, }}>
                    </Box>
                </Paper>

                <Box>

                    <Sheet>
                        <Table
                            aria-label="collapsible table"
                        >
                            <thead>
                                <tr>
                                    <th style={{ width: 40 }} aria-label="empty" />
                                    <th style={{ width: 40 }} aria-label="empty" />
                                    <th style={{ width: 40 }} aria-label="empty" />
                                    <th style={{ width: "40%" }}>SECTION</th>
                                    <th style={{ width: "40%" }}>DEPATMENT</th>
                                    <th style={{ width: "40%" }}>PROCESS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mainArray?.map((row, index) => (
                                    <DeptTableView
                                        key={index}
                                        row={row}
                                        initialOpen={index === 0}
                                        handleChange={handleChange}
                                        selectedYear={selectedYear}
                                        onProcessClick={onProcessClick}
                                        leaveType={leaveType}
                                    />
                                ))}
                            </tbody>
                        </Table>
                    </Sheet>
                </Box>
            </Box>
        </CustomLayout>
    )
}

export default memo(LeaveCarryForwardMain) 