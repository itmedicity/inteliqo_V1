import { Button, Option, Select, Table, Textarea, Typography } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import moment from 'moment';
import { Box, Paper, } from '@mui/material';
import { endOfMonth, format, startOfMonth, } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { useCallback } from 'react';
import { errorNofity, succesNofity, } from 'src/views/CommonCode/Commonfunc';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const ApprovalModal = ({ empData, setCount, setOpen }) => {

    const [details, setDetails] = useState({
        dept_id: 0,
        dept_name: '',
        em_name: '',
        em_no: 0,
        request_date: '',
        resig_slno: 0,
        sect_id: 0,
        sect_name: '',
        status: '',
        resign_reason: '',
        relieving_date: '',
        inch_coment: '',
        em_id: 0,
        resignation_type: 0,
        gross_salary: 0,
        em_doj: ''
    })
    const { em_name, em_no, dept_name, desg_name, em_id } = details;
    const [displayArray, setDisplayArray] = useState([])
    const [salarytype, setsalaryType] = useState(0)
    const [remark, setRemark] = useState('')
    const [settlementArray, setSettlementArray] = useState({})

    const salaryType = [
        { slno: 1, name: "Account" },
        { slno: 2, name: "Cash" },
        { slno: 3, name: "Cheque" }
    ]

    useEffect(() => {
        if (Object.keys(empData).length !== 0) {
            const { dept_id, dept_name, em_name, em_no, request_date, resig_slno, sect_id, desg_name,
                sect_name, resign_reason, relieving_date, status, inch_coment, em_id, resignation_type,
                gross_salary, em_doj } = empData;
            const details = {
                dept_id: dept_id,
                dept_name: dept_name,
                em_name: em_name,
                em_no: em_no,
                request_date: request_date,
                resig_slno: resig_slno,
                sect_id: sect_id,
                sect_name: sect_name,
                status: status,
                resign_reason: resign_reason,
                relieving_date: relieving_date,
                inch_coment: inch_coment,
                em_id: em_id,
                resignation_type: resignation_type,
                gross_salary: gross_salary,
                desg_name: desg_name,
                em_doj: em_doj
            }
            setDetails(details)
        } else {
            setDetails({})
        }
        const postdata = {
            em_no: em_no,
            from: moment(startOfMonth(new Date(empData?.relieving_date))).format('YYYY-MM-DD'),
            to: moment(endOfMonth(new Date(empData?.relieving_date))).format('YYYY-MM-DD')
        }
        const getEmpPunchMastData = async () => {
            const result = await axioslogin.post("/payrollprocess/getPunchmastData", postdata);
            const { success, data: punchMasteData } = result.data
            if (success === 1) {
                setDisplayArray(punchMasteData)
            } else {
                setDisplayArray([])
            }
        }
        getEmpPunchMastData()

        const getData = {
            em_no: em_no
        }

        const getSettlementData = async () => {
            const result = await axioslogin.post('/Resignation/getSettlement', getData)
            const { success, data } = result.data
            if (success === 2) {
                setSettlementArray(data[0])
            } else {
                setSettlementArray()
            }
        }

        getSettlementData()

    }, [empData, em_no])

    const dateOfJoinDate = format(new Date(empData?.em_doj), "dd-MM-yyyy")
    const resignationDate = format(new Date(empData?.request_date), "dd-MM-yyyy")
    const notePeriodEndDate = format(new Date(empData?.relieving_date), "dd-MM-yyyy")

    const submitPayment = useCallback(async () => {
        const updateData = {
            salarytype: salarytype,
            remark: remark,
            final_slno: settlementArray?.final_slno,
            em_id: em_id
        }
        const result = await axioslogin.post('/Resignation/update/payment', updateData)
        const { success, message } = result.data
        if (success === 2) {
            succesNofity("Data updated successfully")
            setOpen(0)
            setCount(Math.random())
        } else {
            errorNofity(message)
        }
    }, [salarytype, remark, settlementArray, setOpen, em_id, setCount])

    return (
        <>
            <Box sx={{ width: "100%", p: 1, overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                <Paper variant='outlined' sx={{ p: 1, display: "flex", flexDirection: "column", }} >
                    {/* Employee Information */}
                    <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid", borderColor: "grey.300", p: 1, borderRadius: 2, }} >
                        <Typography level='body-lg' fontWeight={500} fontSize='1.5rem' color='neutral' fontFamily="monospace" lineHeight={1.5} >{em_name}</Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", }} >
                            <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '40%' }} >
                                <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Employee ID :'} >{em_no}</Typography>
                                <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Department :'}>{dept_name}</Typography>
                                <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Designation :'}>{desg_name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '30%' }} >
                                <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Date Of Joining :'}>{dateOfJoinDate}</Typography>
                                <Typography level='body-md' color='neutral' fontFamily="monospace" lineHeight={1.2} startDecorator={'Resignation Date :'}>{resignationDate}</Typography>
                                <Typography level='body-md' color='danger' fontFamily="monospace" lineHeight={1.2} startDecorator={'Notice Period End Date :'} >{notePeriodEndDate}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 0.5 }} >
                        {
                            displayArray && displayArray.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', flex: 1, borderRadius: 0.5, border: 1, borderColor: 'grey.300', flexDirection: 'column', overflow: 'hidden' }} >
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1 }} variant='outlined' level='title-sm' textAlign='center' color='neutral' fontFamily="monospace">{format(new Date(item?.duty_day), 'd')}</Typography>
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1 }} variant='outlined' level='title-sm' textAlign='center' color='neutral' fontFamily="monospace">{format(new Date(item?.duty_day), 'eee')}</Typography>
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1, fontWeight: 500 }} textColor='#2a4858' variant='outlined' level='body-xs' textAlign='center' color='neutral' >{item?.duty_desc}</Typography>
                                    <Typography sx={{ backgroundColor: '#EEF9FF', lineHeight: 1.1, fontWeight: 500 }} textColor='#2a4858' variant='outlined' level='body-xs' textAlign='center' color='neutral' >{item?.lvereq_desc}</Typography>
                                </Box>
                            ))
                        }
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, border: "1px solid", borderColor: "grey.300", borderRadius: 2, mt: 0.5, flexDirection: 'column', py: 0.5 }}>
                        <Table
                            aria-label="basic table"
                            borderAxis="both"
                            color="neutral"
                            size="sm"
                            variant="outlined"
                            sx={{ width: '100%', borderRadius: 5, overflow: 'hidden' }}
                        >
                            <tbody>
                                <tr>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%' }} >Total Days</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%', textAlign: 'center', backgroundColor: '#D5FBDD' }} >{settlementArray?.total_days}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%', }} >LOP Amount</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '15%', textAlign: 'center', backgroundColor: '#FFE1E1' }} >{settlementArray?.lop_amount}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, width: '40%', backgroundColor: '#E4E5E6' }} ></td>
                                </tr>
                                <tr>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Leave count</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{settlementArray?.leave_count}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >NPS Amount</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{settlementArray?.nps_amount}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center' }} >Gross Salary</td>
                                </tr>
                                <tr >
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Holiday count</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >{settlementArray?.holiday_count}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >LWF Amount</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{settlementArray?.lwf_amount}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 900, lineHeight: 1, textAlign: 'center', backgroundColor: '#E4E5E6', color: '#060A0F' }} >{settlementArray?.gross_salary}</td>
                                </tr>
                                <tr>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >No of HD LOP</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{settlementArray?.halfday_count}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Deduction Amount</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{settlementArray?.deduction_amount}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center' }} >Net Salary</td>
                                </tr>
                                <tr  >
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >No of LC count</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{0}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Holiday Amount</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >{settlementArray?.holiday_amount}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 900, lineHeight: 1, textAlign: 'center', backgroundColor: '#E4E5E6', color: '#060A0F' }} >{settlementArray?.net_salary}</td>
                                </tr>
                                <tr>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Total LOP</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{settlementArray?.lop_count}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Extra Earnings</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >{settlementArray?.extra_earnings}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center' }} >Total Payable Amount</td>
                                </tr>
                                <tr >
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Total Pay Days</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{settlementArray?.total_paydays}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Extra Deduction</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#FFE1E1' }} >{settlementArray?.extra_deduction}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 900, lineHeight: 1, textAlign: 'center', backgroundColor: '#E4E5E6', color: '#060A0F' }} >{settlementArray?.total_payableamount}</td>
                                </tr>
                                <tr>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} >Holiday worked</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, textAlign: 'center', backgroundColor: '#D5FBDD' }} >{settlementArray?.holiday_worked}</td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, backgroundColor: '#E4E5E6' }} ></td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1, backgroundColor: '#E4E5E6' }} ></td>
                                    <td style={{ height: 15, p: 0, fontSize: 11.5, fontWeight: 700, lineHeight: 1 }} ></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, px: 0.5, border: "1px solid", borderColor: "grey.300", borderRadius: 2, mt: 0.5, flexDirection: 'column' }} >
                        <Typography
                            color="neutral"
                            level="body-xs"
                            noWrap
                            sx={{ flex: 1, textAlign: 'left', color: '#8EADCD', mt: 0.5, ml: 0.5, textDecoration: 'underline' }}
                        >
                            Payment Method
                        </Typography>
                        <Box sx={{ display: "flex", flex: 1, p: 1, flexDirection: "row", justifyContent: "left", alignItems: 'center' }}>
                            <Typography
                                level='title-sm'
                                color='neutral'
                                fontFamily="inherit"
                                endDecorator={<CurrencyRupeeIcon fontSize='small' />}
                                // variant='outlined'
                                sx={{ borderRadius: 5, pr: 2, py: 0.5 }}
                            >Payable Amount </Typography>
                            <Typography level='title-md' color='neutral' fontFamily="monospace" sx={{ px: 1, pr: 2 }} startDecorator={':'}  > {settlementArray?.total_payableamount}</Typography>

                        </Box>
                        <Box sx={{ display: "flex", flex: 1, p: 1, flexDirection: "row" }}>
                            <Box sx={{ flex: 1, px: 0.5 }}>
                                <Select
                                    value={salarytype}
                                    onChange={(event, newValue) => {
                                        setsalaryType(newValue);
                                    }}
                                    size='sm'
                                    variant='outlined'
                                >
                                    <Option value={0} disabled>Select Salary Type</Option>
                                    {
                                        salaryType?.map((val, ind) => {
                                            return <Option key={ind} value={val.slno}>{val.name}</Option>
                                        })
                                    }
                                </Select>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', mr: 0.5 }} >
                                <Textarea
                                    color="danger"
                                    minRows={1}
                                    placeholder="Remark..."
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    size="sm"
                                    sx={{ display: 'flex', flex: 1, px: 2 }}
                                />
                            </Box>
                            <Button
                                color="primary"
                                onClick={submitPayment}
                                size="sm"
                                variant="outlined"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default memo(ApprovalModal) 