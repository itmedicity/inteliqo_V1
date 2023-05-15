import { Typography } from '@mui/joy'
import { Box, Grid, TableCell } from '@mui/material'
import React, { useEffect, useMemo, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCommonSetting } from 'src/redux/actions/Common.Action'
import { axioslogin } from 'src/views/Axios/Axios'
import _ from 'underscore'

const ViewTable = ({ todate, fromdate, empid, salary, setEmpdata, empData }) => {

    const reduxDispatch = useDispatch()
    useEffect(() => {
        // common settings
        reduxDispatch(setCommonSetting());
    }, [reduxDispatch])

    const [paydays, setPaydays] = useState(0)

    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual);

    const commonSettings = useMemo(() => commonState, [commonState]);

    const [data, setData] = useState([])



    useEffect(() => {
        const postdata = {
            emp_id: empid,
            start: fromdate,
            end: todate
        }

        const getData = async (postdata) => {
            const result = await axioslogin.post("/payrollprocess/data/all", postdata)
            const { data, success } = result.data
            if (success === 1) {
                const total = data.length

                const actual = (data.filter(val => val.duty_desc === 'P' || val.duty_desc === 'HP' || val.duty_desc === 'HFD' || val.duty_desc === 'EG' || val.duty_desc === 'LC')).length

                const calculated = (data.filter(val => val.duty_desc === 'P' || val.duty_desc === 'HP')).length

                const offdays = (data.filter(val => val.duty_desc === 'OFF')).length

                const leaves = (data.filter(val => val.leave_status === 1)).length

                const holidayworked = (data.filter(val => val.duty_desc === 'HP')).length

                const lossofpay = (data.filter(val => val.leave_status === 0 && val.duty_status === 0)).length

                const holiday = (data.filter(val => val.holiday_status === 1)).length

                const calculatedlop = (data.filter(val => val.duty_desc === 'A' && val.leave_status === 0)).length

                const lwp = (data.filter(val => val.duty_desc === 'A' && val.leave_status === 1)).length

                const obj = {
                    em_id: empid,
                    total: total,
                    actual: actual,
                    lossofpay: lossofpay,
                    lwp: lwp,
                    leaves: leaves,
                    holidayworked: holidayworked,
                    holiday: holiday,
                    offdays: offdays,
                    calculated: calculated,
                    calculatedlop: calculatedlop
                }
                // const newdata = [...empData, obj]
                // setEmpdata(obj)
                setEmpdata([...empData, obj]);

                //setEmpdata(...empData, obj)
                setData(data);
            } else {
                setData([])
            }
        }
        getData(postdata)
    }, [empid])


    const total = data.length

    const actual = (data.filter(val => val.duty_desc === 'P' || val.duty_desc === 'HP' || val.duty_desc === 'HFD' || val.duty_desc === 'EG' || val.duty_desc === 'LC')).length

    const calculated = (data.filter(val => val.duty_desc === 'P' || val.duty_desc === 'HP')).length

    const offdays = (data.filter(val => val.duty_desc === 'OFF')).length

    const leaves = (data.filter(val => val.leave_status === 1)).length

    const holidayworked = (data.filter(val => val.duty_desc === 'HP')).length

    const lossofpay = (data.filter(val => val.leave_status === 0 && val.duty_status === 0)).length

    const holiday = (data.filter(val => val.holiday_status === 1)).length

    const calculatedlop = (data.filter(val => val.duty_desc === 'A' && val.leave_status === 0)).length

    const lwp = (data.filter(val => val.duty_desc === 'A' && val.leave_status === 1)).length


    // useEffect(() => {

    //     if (salary < commonSettings.salary_above) {
    //         let total_pay_day = calculated + offdays + holiday + holidayworked + leaves - (lwp - lossofpay)
    //         console.log(total_pay_day);
    //         setPaydays(total_pay_day)
    //     } else {
    //         console.log("HFj");
    //         let total_pay_day = calculated + offdays + holiday + leaves - (lwp - lossofpay)
    //         console.log(total_pay_day);
    //         setPaydays(total_pay_day)
    //     }

    //     //     const obj = {
    //     //         total: total,
    //     //         actual: actual,
    //     //         lossofpay: lossofpay,
    //     //         lwp: lwp,
    //     //         leaves: leaves,
    //     //         holidayworked: holidayworked,
    //     //         holiday: holiday,
    //     //         offdays: offdays,
    //     //         calculated: calculated
    //     //     }
    //     //     // setEmpdata([...empData, obj])



    // }, [salary, calculated, offdays, holiday, holidayworked, leaves, lwp, lossofpay, actual, total, empData,
    //     commonSettings.salary_above])






    return (
        <>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {total}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {actual}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {calculated}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {offdays}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {leaves}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {lwp}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {lossofpay}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} item sx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {calculatedlop}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {holiday}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {holidayworked}
                    </Typography>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ py: 0, px: 0.5, width: 100, border: 0.1, borderColor: '#E1E6E1' }}>
                <Box component={Grid} itemsx={{ minHeight: 25, maxHeight: 25, p: 0.2, fontWeight: 'normal', textOverflow: 'ellipsis', width: 100, }}>
                    <Typography variant="body2" gutterBottom noWrap={true}>
                        {paydays}
                    </Typography>
                </Box>
            </TableCell>
        </>
    )
}

export default memo(ViewTable) 