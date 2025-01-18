import React, { Fragment, memo, useCallback, useState } from 'react'
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Checkbox, Chip } from '@mui/joy';
import { axioslogin } from '../../Axios/Axios';
import { addMonths, eachMonthOfInterval, format, startOfYear, subYears } from 'date-fns';
import { employeeNumber } from 'src/views/Constant/Constant';
import { errorNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';

const DeptTableView = ({ row, initialOpen, handleChange, selectedYear, leaveType, onProcessClick }) => {

    // const deptSectionArray = useMemo(() => mainArray, [mainArray])

    const [open, setOpen] = useState(false)

    const insertLeave = useCallback(async (e, row) => {
        const { leaveType, empdata } = row;
        //casual leave
        if (leaveType === 1) {
            // Filter employees who have a checkStatus of 1 (indicating they are selected or active)
            const checkedEmployees = empdata?.filter((v) => v.checkStatus === 1)
            // Process the casual leave for each selected employee
            const casualLeave = checkedEmployees?.map((val) => {
                // Get the start of the year for the current date
                const startMonth = startOfYear(new Date())
                // Calculate the end month based on the employee's balance (assumes balance is the number of months)
                const endMonth = addMonths(new Date(startMonth), val?.balance - 1)
                // Generate a list of all months between startMonth and endMonth
                const result = eachMonthOfInterval({
                    start: new Date(startMonth),
                    end: new Date(endMonth)
                })

                // For each month in the interval, create a record of the casual leave
                let processedEarnLeaveList = result && result.map((value, index) => {
                    // Format the date of the month as 'yyyy-MM-dd'
                    const leaveDay = format(new Date(value), 'yyyy-MM-dd')
                    const leaveYear = format(new Date(subYears(new Date(value), 1)), 'yyyy-MM-dd')
                    return {
                        em_no: val.em_no,
                        em_id: val.em_id,
                        cl_lv_mnth: leaveDay,
                        cl_lv_year: leaveYear,
                        cl_lv_allowed: 1,
                        cl_lv_credit: 1,
                        cl_lv_taken: 0,
                        lv_process_slno: val.lv_process_slno,
                        update_user: employeeNumber(),
                        special_remark: 'CF'
                    }
                })
                // Return the modified employee object with the casual leave records added
                return {
                    ...val,
                    "earnLeaveArray": processedEarnLeaveList,
                    "carry_year": format(new Date(selectedYear), 'yyyy'),
                }
            })

            const result = await axioslogin.post('/yearleaveprocess/insertPreviouscasualleave', casualLeave);
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                onProcessClick(leaveType, selectedYear)
            } else {
                errorNofity(message)
            }
            //sick leave
        } else if (leaveType === 7) {
            const checkedEmployees = empdata?.filter((v) => v.checkStatus === 1)
            const sickLeave = checkedEmployees?.map((val) => {
                return {
                    ...val,
                    cmn_lv_year: format(new Date(), 'yyyy'),
                    "carry_year": format(new Date(selectedYear), 'yyyy'),
                }
            })
            const result = await axioslogin.post('/yearleaveprocess/updatePreviousLeave', sickLeave);
            const { success, messagee } = result.data
            if (success === 1) {
                succesNofity(messagee)
                onProcessClick(leaveType, selectedYear)
            } else {
                errorNofity(messagee)
            }
            //earn leave
        } else if (leaveType === 8) {
            // Filter employees who have a checkStatus of 1 (indicating they are active or eligible for leave)
            const checkedEmployees = empdata?.filter((v) => v.checkStatus === 1)

            // Process the filtered employees to generate their earned leave data
            const earnLeave = checkedEmployees?.map((val) => {

                // Set the starting month for earned leave calculation
                const startMonth = startOfYear(new Date(selectedYear));
                // Calculate the end date for the leave period based on the employee's balance (i.e., number of months)
                const endMonth = addMonths(new Date(startMonth), val?.balance - 1)

                // Get all months between the start and end date for earned leave calculation
                const result = eachMonthOfInterval({
                    start: new Date(startMonth), // Starting month
                    end: new Date(endMonth) // Ending month based on balance
                });

                // Process each month and create an earned leave record for each
                let processedEarnLeaveList = result && result.map((value, index) => {
                    // Format the current month as a leave day (date)
                    const leaveDay = format(new Date(value), 'yyyy-MM-dd')
                    const leaveYear = format(new Date(subYears(new Date(value), 1)), 'yyyy-MM-dd')

                    // Return an object with the processed leave details
                    return {
                        em_no: val.em_no,
                        ernlv_mnth: leaveDay,
                        ernlv_year: leaveYear,
                        ernlv_allowed: 1,
                        ernlv_credit: 1,
                        ernlv_taken: 0,
                        lv_process_slno: val.lv_process_slno,
                        update_user: employeeNumber(),
                        em_id: val.em_id,
                        credit_status: 1,
                        credit_year: format(new Date(), 'yyyy'),
                        special_remark: 'CF'
                    }
                })
                return {
                    ...val,
                    "earnLeaveArray": processedEarnLeaveList,
                    "carry_year": format(new Date(selectedYear), 'yyyy'),
                }
            })

            const result = await axioslogin.post('/yearleaveprocess/insertPreviousearnLeave', earnLeave);
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                onProcessClick(leaveType, selectedYear)
            } else {
                errorNofity(message)
            }
        }
    }, [selectedYear, onProcessClick, leaveType])

    return (
        <Fragment>
            <tr>
                <th style={{ width: 40 }} aria-label="empty" />
                <th style={{ width: 40 }} aria-label="empty" />

                <td>
                    <IconButton
                        aria-label="expand row"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </td>
                <td scope="row">{row.sect_name}</td>
                <td scope="row">{row.dept_name}</td>
                <td scope="row"> <Box sx={{ display: 'flex' }} >
                    <Chip
                        color="success"
                        onClick={(e) => insertLeave(e, row)}
                        size="sm"
                        variant="outlined"
                    >Insert Leave</Chip>
                </Box>
                </td>
            </tr>
            <tr>
                <td style={{ height: 0, padding: 0 }} colSpan={6}>
                    {open && (
                        <Sheet
                            variant="soft"
                            sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
                        >
                            <Table
                                borderAxis="bothBetween"
                                size="sm"
                                aria-label="purchases"
                            >
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th style={{ textAlign: 'center' }}>Emp ID#</th>
                                        <th style={{ textAlign: 'center' }}>Name</th>
                                        <th style={{ textAlign: 'center' }}>Credited</th>
                                        <th style={{ textAlign: 'center' }}>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        row?.empdata?.map((k, index) => (

                                            <tr key={index}>
                                                <td style={{ textAlign: 'center' }} >
                                                    <Checkbox
                                                        sx={{ verticalAlign: 'top' }}
                                                        checked={k.checkStatus === 0 ? false : true}
                                                        onChange={(e) => handleChange(e.target.checked, k)}
                                                    /></td>
                                                <td style={{ textAlign: 'center' }}>{k.em_no}</td>
                                                <td style={{ textAlign: 'center' }}>{k.em_name}</td>
                                                <td style={{ textAlign: 'center' }}>{k.credited}</td>
                                                <td style={{ textAlign: 'center' }}>{k.balance}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Sheet>
                    )}
                </td>
            </tr>
        </Fragment>
    )
}

export default memo(DeptTableView) 