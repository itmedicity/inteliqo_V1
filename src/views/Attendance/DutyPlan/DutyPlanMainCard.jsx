import React from 'react'
import { memo } from 'react'
import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DutyPlanTopCard from './DutyPlanTopCard'
// import { dutyPlanInitialState, dutyPlanReducer } from './DutyPlanFun/DutyPlanFun'
// import { useReducer } from 'react'
import ShiftSelect from './DutyPlanFun/ShiftSelect'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import _ from 'underscore'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Actiontypes } from 'src/redux/constants/action.type'
import BuilShiftUpdationModal from './DutyPlanFun/BuilShiftUpdationModal'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const DutyPlanMainCard = () => {
    const [plan, setPlan] = useState([])
    const [open, setOpen] = useState(false);
    const [dateFormat, setDateFormat] = useState([])
    const [emNo, setEmno] = useState(0);

    const [updatedPlanfrmModel, setUpdatedPlanfrmModel] = useState({});

    const { GET_SHIFT_PLAN_DETL, GET_SHIFT_DATE_FORMAT, FETCH_UPDATED_PLAN } = Actiontypes;

    const dispatchRedux = useDispatch();

    // const [planState] = useReducer(dutyPlanReducer, dutyPlanInitialState);
    // const { fromDate, toDate, deptName, deptSecName } = planState

    const planData = useSelector((state) => state.getShiftPlanDetl.shiftData, _.isEqual);
    const shiftDate = useSelector((state) => state.getShiftDateFormat.dateFormat, _.isEqual);
    const newPlanDetl = useSelector((state) => state.updatedShiftDetlOnModel.shiftPlan, _.isEqual);

    const shiftPlanData = useMemo(() => planData, [planData]);
    const shiftBaseDateFormat = useMemo(() => shiftDate, [shiftDate]);
    const updatedPlanDetl = useMemo(() => newPlanDetl, [newPlanDetl]); // from modal updation

    useEffect(() => {
        Object.keys(shiftPlanData).length > 0 ? setPlan(shiftPlanData) : setPlan([]);
        Object.keys(shiftBaseDateFormat).length > 0 ? setDateFormat(shiftBaseDateFormat) : setDateFormat([]);
        dispatchRedux({ type: FETCH_UPDATED_PLAN, payload: shiftPlanData });
    }, [shiftPlanData, FETCH_UPDATED_PLAN, dispatchRedux, shiftBaseDateFormat])

    useEffect(() => {
        return () => {
            dispatchRedux({ type: GET_SHIFT_PLAN_DETL, payload: [], status: true })
            dispatchRedux({ type: GET_SHIFT_DATE_FORMAT, payload: [], status: true })
            dispatchRedux({ type: FETCH_UPDATED_PLAN, payload: [] });
        }
    }, [dispatchRedux, GET_SHIFT_PLAN_DETL, GET_SHIFT_DATE_FORMAT, FETCH_UPDATED_PLAN])

    //update the "plan" state after updating the model updation.

    useEffect(() => {

        const updateNewShiftPlan = async (updatedPlanfrmModel) => {

            let { em_no, plan, notApplicableShift } = updatedPlanfrmModel;

            const getNewShiftPlan = (value) => {
                // updated plan state
                const newPlan = plan.find((val) => val.plan_slno === value.plan_slno)
                return value.shift_id === notApplicableShift ? value : newPlan;
            }

            const newPlanObj = [...updatedPlanDetl]

            const newPlanState = await newPlanObj.map((val) => {
                if (val.em_no === em_no) {
                    return {
                        em_no: val.em_no,
                        emp_id: val.emp_id,
                        emp_name: val.emp_name,
                        plan: [val.plan[0].map(getNewShiftPlan)]
                    }
                } else {
                    return val;
                }
            })
            dispatchRedux({ type: FETCH_UPDATED_PLAN, payload: newPlanState });
            setPlan(newPlanState)
        }

        updateNewShiftPlan(updatedPlanfrmModel)

    }, [updatedPlanfrmModel, FETCH_UPDATED_PLAN, updatedPlanDetl, dispatchRedux])

    //open modal for bulk shift updation

    const builkShiftUpdation = async (em_no) => {
        const pendingTckt = shiftPlanData.filter((val) => {
            return val.em_no === em_no
        })
        const { plan } = pendingTckt[0]
        const xx = plan[0]?.map((val) => {
            const { attendance_update_flag } = val
            if (attendance_update_flag === 1) {
                const obj = { flag: 1 }
                return obj
            }
            else {
                const obj = { flag: 0 }
                return obj
            }
        })
        const { flag } = xx[0]
        if (flag === 1) {
            warningNofity("Punch In/Out Marking Done By HR, Do not change Duty plan")
        }
        else {
            setEmno(em_no)
            setOpen(true)
        }
    }

    return (
        <CustomLayout title="Duty Planning" displayClose={true} >
            <BuilShiftUpdationModal open={open} handleChange={setOpen} emNo={emNo} updation={setUpdatedPlanfrmModel} />
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: 1, px: 0.5, flexDirection: 'column' }}>
                <DutyPlanTopCard />
                <Paper square variant="outlined" sx={{ display: 'flex', p: 0.5, flex: 1 }}>
                    {/* employee Name Section */}
                    <Box sx={{ minWidth: 400 }}>
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ p: 0, backgroundColor: '#f1faee', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Name
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#f1faee', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                ID #
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ p: 0, backgroundColor: '#f1faee', border: 0.1, borderColor: '#E1E6E1' }}>
                                            <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2 }}>
                                                Days
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ p: 0, backgroundColor: '#f1faee', border: 0.1, borderColor: '#E1E6E1' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {plan.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{
                                                    py: 0, px: 0.5, backgroundColor: row.unauthorized_absent_status === 1 ? '#FF8B8B' : '#f1faee', width: 100,
                                                    border: 0.1, borderColor: '#E1E6E1'
                                                }}
                                            >
                                                <Box
                                                    component={Grid}
                                                    item
                                                    sx={{
                                                        minHeight: 25,
                                                        maxHeight: 25,
                                                        p: 0.2,
                                                        fontWeight: 'normal',
                                                        textOverflow: 'ellipsis',
                                                        width: '100%',
                                                        // bgcolor: 'lightcoral'
                                                    }}
                                                >
                                                    <Typography variant="body2" gutterBottom noWrap={true}>
                                                        {row.emp_name}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                sx={{
                                                    py: 0, px: 0.5, backgroundColor: row.unauthorized_absent_status === 1 ? '#FF8B8B' : '#f1faee', width: 50,
                                                    border: 0.1, borderColor: '#E1E6E1', textAlign: 'center'
                                                }}
                                            >
                                                <Box
                                                    component={Button}
                                                    variant="outlined"
                                                    sx={{
                                                        minHeight: 25,
                                                        maxHeight: 25,
                                                        p: 0.2,
                                                        fontWeight: 'normal',
                                                    }}
                                                    onClick={() => builkShiftUpdation(row.em_no)}
                                                >
                                                    {row.em_no}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/* shift selecction section */}

                    {/* <Box sx={{ minWidth: 600, maxWidth: 1423 }} > */}
                    <Box
                        component={Grid}
                        container
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        sx={{
                            display: 'flex',
                            overflow: 'auto',
                            '::-webkit-scrollbar': {
                                height: 8,
                            },
                            '::-webkit-scrollbar-track': {
                                boxShadow: 'inset 0 0 5px rgb(255, 251, 251)',
                                borderRadius: '0px',
                            },

                            '::-webkit-scrollbar-thumb': {
                                // background: '#077DFA',
                                borderRadius: '0px',
                            },

                            '::-webkit-scrollbar-thumb:hover': {
                                //   background: 'rgb(255, 251, 251)',
                            },
                        }}
                    >
                        <TableContainer
                            component={Grid}
                            item
                            xs={'auto'}
                            sm={'auto'}
                            md={'auto'}
                            lg={'auto'}
                            xl={'auto'}
                            sx={{
                                display: 'flex',
                            }}
                        >
                            {/* <Table size="small" sx={{ minWidth: 600, maxWidth: 800 }} > */}
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {dateFormat && dateFormat.map((val, index) => (
                                            <TableCell key={index} sx={{
                                                p: 0,
                                                border: 0.1, borderColor: '#E1E6E1',
                                                backgroundColor: val.holiday === 1 ? '#e3f2fd' : '#f1faee',
                                            }}
                                            >
                                                <Box
                                                    component={Grid}
                                                    item
                                                    sx={{ minHeight: 25, maxHeight: 25, textAlign: 'center' }}
                                                >
                                                    {val.date}
                                                </Box>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        {dateFormat && dateFormat.map((val, index) => (
                                            <TableCell key={index} sx={{
                                                p: 0,
                                                backgroundColor: val.sunday === '0' ? '#ffebee' : '#f1faee',
                                                border: 0.1,
                                                borderColor: '#E1E6E1',
                                            }}
                                            >
                                                <Box
                                                    component={Grid}
                                                    item
                                                    sx={{
                                                        minHeight: 25, maxHeight: 25, textAlign: 'center',
                                                        textTransform: 'capitalize',
                                                        color: val.holiday === 1 || val.sunday === '0' ? '#880e4f' : '#212121'
                                                    }}
                                                >
                                                    {val.holiday === 1 ? val.holidayDays.toLowerCase() : val.days}
                                                </Box>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {plan && plan.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            selected={true}
                                            hover={true}

                                        >
                                            {row.plan[0].map((val, index) => (
                                                <TableCell key={index} sx={{ p: 0 }}>
                                                    <Box
                                                        component={Grid}
                                                        item
                                                        sx={{
                                                            display: 'flex', minHeight: 25, maxHeight: 25,
                                                        }}
                                                    >
                                                        <ShiftSelect data={val} authStatus={row.unauthorized_absent_status} />
                                                    </Box>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </Box >
        </CustomLayout >
    )
}

export default memo(DutyPlanMainCard)
