import React, { Fragment, useState, memo, useMemo, useEffect, useCallback } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { Box, IconButton } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, CssVarsProvider } from '@mui/joy';
import Input from '@mui/joy/Input';
import { format, addMonths, startOfMonth, lastDayOfMonth, subMonths } from 'date-fns';
import moment from 'moment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DeleteIcon from '@mui/icons-material/Delete';
import _ from 'underscore'
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom'

const PunchMarkDoneList = () => {

    //FORM DATA 
    const history = useHistory()
    const [value, setValue] = useState(moment(new Date()));
    const [deptList, setDeptList] = useState([])
    const [viewTable, setViewTable] = useState(0)
    const [count, setCount] = useState(0)
    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_no } = employeeProfileDetl

    const [columnDef] = useState([
        { headerName: "SlNo", field: "slno", minWidth: 100 },
        { headerName: "Department", field: "dept_name", autoHeight: true, wrapText: true, filter: "true", minWidth: 150 },
        { headerName: "Department Section", field: "sect_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 120 },
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params => {
                return <IconButton sx={{ color: "#0D47A1", paddingY: 0.5 }}
                    onClick={() => DeleteMarking(params)}>
                    < DeleteIcon />
                </IconButton>
            }
        },
    ])
    //Delete Icon Click function
    const DeleteMarking = useCallback((val) => {
        const { deptsec_slno, marking_month } = val.data
        const saveDta = {
            marking_month: marking_month,
            deptsec_slno: deptsec_slno,
            edit_user: em_no
        }
        //Get Emp List
        const getEmployee = async (deptsec_slno) => {
            const result = await axioslogin.get(`/common/getEmpName/${deptsec_slno}`)
            return result.data;
        }
        //DutyPlan Unlock
        const DutyPlanUnlock = async (dutyLock) => {
            const result1 = await axioslogin.patch("/payrollprocess/dutyPlanUnLock", dutyLock)
            return result1.data
        }
        //Punch save Table Status Inactive
        const punchMarkSaveCancel = async (saveDta) => {
            const result = await axioslogin.post('/payrollprocess/CancelPunchInOutHr', saveDta)
            const { success } = result.data
            if (success === 1) {
                setCount(count + 1)
                succesNofity("Punch In/Out Marking Cancel Done")
            }
            else {
                warningNofity("Error Occured Contact EDP")
            }
        }
        getEmployee(deptsec_slno).then((resultdata) => {
            const { success, data } = resultdata;
            if (success === 1) {
                const dutyLock = data && data.map((val, index) => {
                    const obje = {
                        em_no: val.em_no,
                        from: format(startOfMonth(new Date(value)), 'yyyy-MM-dd'),
                        to: format(lastDayOfMonth(new Date(value)), 'yyyy-MM-dd')
                    }
                    return obje
                })
                DutyPlanUnlock(dutyLock).then((result) => {
                    const { success } = result
                    if (success === 1) {
                        punchMarkSaveCancel(saveDta)
                    }
                })
            }
            else {
                warningNofity("No Employes Under this section")
            }
        })
    }, [count, setCount])

    //Search Button Function
    const handleOnClickFuntion = useCallback((e) => {
        const postdata = {
            marking_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
        }
        const getTableData = async (postdata) => {
            const dataExist = await axioslogin.post("/payrollprocess/getPunchInOutHr", postdata);
            const { succes, dataa } = dataExist.data
            if (succes === 1) {
                setDeptList(dataa);
            } else {
                warningNofity("No Department available Punch mark done by HR");
            }
        }
        getTableData(postdata)
        setViewTable(1)
    }, [value, setDeptList, count])

    useEffect(() => {
        const postdata = {
            marking_month: format(startOfMonth(new Date(value)), 'yyyy-MM-dd')
        }
        const getTableData = async (postdata) => {
            const dataExist = await axioslogin.post("/payrollprocess/getPunchInOutHr", postdata);
            const { succes, dataa } = dataExist.data
            if (succes === 1) {
                setDeptList(dataa);
            } else {
                setDeptList([]);
                warningNofity("No Department available Punch mark done by HR");
            }
        }
        if (count > 0) {
            getTableData(postdata)
        }


    }, [count, setDeptList])

    const handleClose = () => {


        history.push('/Home/PunchMarkingHR');

    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Punch In/Out Marked List"
                redirect={() => { }}
            >
                <Box sx={{
                    display: 'flex', py: 0.5, width: '100%',
                    height: '100%',
                    flexDirection: "column"
                }}>
                    <Box sx={{
                        display: 'flex', py: 0.5, width: '50%',
                        flexDirection: "row",
                        height: '100%',

                    }}>
                        <Box sx={{ px: 0.5, width: '40%', }} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['year', 'month']}
                                    minDate={subMonths(new Date(), 1)}
                                    maxDate={addMonths(new Date(), 1)}
                                    value={value}
                                    size="small"
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <CssVarsProvider>
                                                <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                            </CssVarsProvider>
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box sx={{ px: 0.5, width: '25%', }} >
                            <CssVarsProvider>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={handleOnClickFuntion}
                                    fullWidth
                                    startDecorator={<SearchOutlinedIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    Search
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ px: 0.5, width: '25%', }} >
                            <CssVarsProvider>
                                <Button
                                    aria-label="Like"
                                    variant="outlined"
                                    color="neutral"
                                    onClick={handleClose}
                                    fullWidth
                                    startDecorator={<CloseIcon />}
                                    sx={{ mx: 0.5 }}
                                >
                                    Close
                                </Button>
                            </CssVarsProvider>
                        </Box>
                    </Box>

                    {viewTable === 1 ? <Box  >
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={deptList}
                            sx={{
                                height: 600,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30}
                        />
                    </Box> : null}
                </Box>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default memo(PunchMarkDoneList)