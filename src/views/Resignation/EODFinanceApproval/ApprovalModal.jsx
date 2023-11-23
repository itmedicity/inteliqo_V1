import { Box, Button, Checkbox, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import React, { Fragment, memo, useEffect, useState } from 'react'
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import moment from 'moment';
import { Paper, TextField } from '@mui/material';
import { differenceInDays, getDaysInMonth, startOfMonth } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { useCallback } from 'react';
import { ToWords } from 'to-words';
import { useMemo } from 'react';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import _ from 'underscore';

const ApprovalModal = ({ open, setOpen, data, setCount }) => {

    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: { // can be used to override defaults for the selected locale
                name: 'Rupee',
                plural: 'Rupees',
                symbol: '₹',
                fractionalUnit: {
                    name: 'Paisa',
                    plural: 'Paise',
                    symbol: '',
                },
            }
        }
    });


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
        gross_salary: 0
    })
    const { em_name, em_no, em_id, request_date, sect_name, relieving_date, resignation_type, gross_salary } = details;
    const [payable, setPayable] = useState(false)
    const [recievable, setRecievable] = useState(false)
    // const [lop, setLop] = useState(0)
    const [calcLop, setCalcLop] = useState(0)
    const [holiday, setHoliday] = useState(0)
    // const [totldays, setTotaldays] = useState(0)
    const [salary, setSalary] = useState(0)
    const [salaryInwords, setSalaryInwords] = useState('')
    const [calcSalary, setCalcSalary] = useState(0)
    const [balance, setBalance] = useState(false)
    const [amount, setAmount] = useState(0)

    const loginEmployee = useSelector((state) => state?.getProfileData?.ProfileData[0]?.em_id ?? 0, _.isEqual)

    useEffect(() => {
        //to get punchdata
        const getPunchData = async (postdata) => {
            const result = await axioslogin.post("/payrollprocess/punchbiId", postdata);
            const { success, data } = result.data
            if (success === 1) {
                //const lossofpay = (data.filter(val => val.leave_status === 0 && val.duty_status === 0)).length
                const calculatedlop = (data.filter(val => val.duty_desc === 'A' && val.leave_status === 0)).length
                const holiday = (data.filter(val => val.holiday_status === 1)).length
                setHoliday(holiday)
                //setLop(lossofpay)
                setCalcLop(calculatedlop)
            } else {
                //setLop(0)
                setCalcLop(0)
                setHoliday(0)
            }
        }

        if (Object.keys(data).length !== 0) {
            const { dept_id, dept_name, em_name, em_no, request_date, resig_slno, sect_id,
                sect_name, resign_reason, relieving_date, status, inch_coment, em_id, resignation_type,
                gross_salary } = data[0]
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
                gross_salary: gross_salary
            }
            setDetails(details)
            const postdata = {
                emp_id: em_id,
                from: moment(startOfMonth(new Date(relieving_date))).format('YYYY-MM-DD'),
                to: relieving_date
            }
            getPunchData(postdata)
        } else {
            setDetails({})
        }
    }, [data])

    const toWordsConvert = useMemo(() => toWords, [toWords])

    const handlechange = useCallback((e) => {
        if (e.target.checked === true) {
            setRecievable(true)
            setPayable(false)
            const wokeddays = differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date)))
            const days = getDaysInMonth(new Date(relieving_date));
            // setTotaldays(days)
            const workeddayno = wokeddays - calcLop + holiday

            const workedSalary = (gross_salary / days) * workeddayno
            const roundValue = Math.round(workedSalary / 10) * 10
            setSalary(roundValue)
            const calSalary = gross_salary - roundValue
            setCalcSalary(calSalary)
            const words = toWordsConvert?.convert(calSalary)
            setSalaryInwords(words)

        } else {
            setRecievable(false)
            setPayable(false)
        }
    }, [gross_salary, relieving_date, calcLop, holiday, toWordsConvert])

    const handlechange1 = useCallback((e) => {
        if (e.target.checked === true) {
            setRecievable(false)
            setPayable(true)

            const wokeddays = differenceInDays(new Date(relieving_date), startOfMonth(new Date(relieving_date)))
            const days = getDaysInMonth(new Date(relieving_date));
            // setTotaldays(days)
            const workeddayno = wokeddays - calcLop + holiday

            const workedSalary = (gross_salary / days) * workeddayno
            const roundValue = Math.round(workedSalary / 10) * 10
            setSalary(roundValue)
            setCalcSalary(roundValue)
            const words = toWordsConvert?.convert(roundValue)
            setSalaryInwords(words)
        } else {
            setRecievable(false)
            setPayable(false)
        }
    }, [gross_salary, relieving_date, toWordsConvert, calcLop, holiday])

    const handleRejectRequest = useCallback(() => {
        setOpen(false)
        setRecievable(false)
        setPayable(false)
        setSalaryInwords('')
        setSalary(0)
        setCalcSalary(0)
    }, [setOpen])

    const postData = useMemo(() => {
        return {
            em_id: em_id,
            em_no: em_no,
            payable_amount: salary,
            recievable: calcSalary,
            balance_status: balance === true ? 1 : 0,
            balance_amount: balance === true ? amount : 0,
            create_user: loginEmployee
        }
    }, [salary, em_no, em_id, calcSalary, balance, amount, loginEmployee])

    const submitFormdata = useCallback(async () => {
        const result = await axioslogin.post('/Resignation/insertResginDetails', postData)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message)
            setCount(Math.random())
            setOpen(false)
            setRecievable(false)
            setPayable(false)
            setSalaryInwords('')
            setSalary(0)
            setCalcSalary(0)
            setAmount(0)
        } else {
            warningNofity(message)
            setOpen(false)
            setRecievable(false)
            setPayable(false)
            setSalaryInwords('')
            setSalary(0)
            setCalcSalary(0)
            setAmount(0)
        }
    }, [postData, setCount, setOpen])

    return (
        <>
            <ToastContainer />
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}

            >
                <ModalDialog size="lg"  >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{ display: 'flex', flex: 1, alignContent: 'center', alignItems: 'center', }} >
                        <Typography
                            fontSize="xl2"
                            lineHeight={1}
                            startDecorator={
                                <EmojiEmotionsOutlinedIcon sx={{ color: 'green' }} />
                            }
                            sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                        >
                            {em_name}
                        </Typography>
                        <Typography
                            lineHeight={1}
                            component="h3"
                            id="modal-title"
                            level="h5"
                            textColor="inherit"
                            fontWeight="md"
                            // mb={1}
                            endDecorator={<Typography
                                level="h6"
                                justifyContent="center"
                                alignItems="center"
                                alignContent='center'
                                lineHeight={1}
                            >
                                {em_no}
                            </Typography>}
                            sx={{ color: 'neutral.400', display: 'flex', }}
                        >
                            {`employee #`}
                        </Typography>
                        <Typography level="body1" sx={{ px: 1, textTransform: "lowercase" }} >{sect_name}</Typography>
                    </Box>
                    <Box sx={{ flex: 1, py: 1 }}>
                        <Typography
                            level="body2"
                            startDecorator={<InfoOutlined />}
                            sx={{ alignItems: 'center', wordBreak: 'break-all', }}
                        >
                            Resignation Information.
                        </Typography>
                    </Box>
                    <Paper variant="outlined" square sx={{ p: 0.5, mb: 0.8 }} >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Request Date:
                            </Typography>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                {moment(request_date).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                            <Typography fontSize="sm" fontWeight="lg"  >
                                Relieving Date:
                            </Typography>
                            <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                {moment(relieving_date).format('DD-MM-YYYY')}
                            </Typography>
                        </Box>

                        {
                            resignation_type === '2' ? <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flex: 1, backgroundColor: 'lightpink' }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Employee Under 24 hour Resignation
                                </Typography>
                            </Box> : <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flex: 1, backgroundColor: '#ededb9' }}>
                                <Typography fontSize="sm" fontWeight="lg"  >
                                    Employee Under 30 days Resignation
                                </Typography>
                            </Box>
                        }



                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }} >
                            {
                                resignation_type === '2' ? <Box sx={{ pl: 1.5, mt: 0.5, flex: 1 }}>
                                    <Checkbox
                                        label="Cash Recievable"
                                        checked={recievable}
                                        name="recievable"
                                        onChange={(e) => handlechange(e)}
                                    />
                                </Box> : <Box sx={{ pl: 1.5, mt: 0.5, flex: 1 }}>
                                    <Checkbox
                                        label="Cash Payable"
                                        checked={payable}
                                        name="payable"
                                        onChange={(e) => handlechange1(e)}
                                    />
                                </Box>
                            }
                        </Box>
                        {
                            recievable === true ? <Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Worked Amount:
                                    </Typography>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        {salary}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Net Amount:
                                    </Typography>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        {calcSalary}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        In Words:
                                    </Typography>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        {salaryInwords}
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 1.5, mt: 0.5, flex: 1, display: 'flex', flexDirection: 'row', gap: 3 }}>
                                    <Box>
                                        <Checkbox
                                            label="Check If Any Balance Amount"
                                            checked={balance}
                                            name="balance"
                                            onChange={(e) => setBalance(e.target.checked)}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            onChange={(e) => setAmount(e.target.value)}
                                            //label="Last Amount"
                                            disabled={balance === true ? false : true}
                                            id="amount"
                                            size="small"
                                            name='amount'
                                            value={amount}
                                        />
                                    </Box>
                                </Box>

                            </Fragment> : null
                        }
                        {
                            payable === true ? <Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Worked Amount:
                                    </Typography>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        {salary}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        Net Amount:
                                    </Typography>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        {calcSalary}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', flex: 1 }}>
                                    <Typography fontSize="sm" fontWeight="lg"  >
                                        In Words:
                                    </Typography>
                                    <Typography fontSize="sm" fontWeight="lg" sx={{ flex: 1, pl: 2 }} >
                                        {salaryInwords}
                                    </Typography>
                                </Box>
                                <Box sx={{ pl: 1.5, mt: 0.5, flex: 1, display: 'flex', flexDirection: 'row', gap: 3 }}>
                                    <Box>
                                        <Checkbox
                                            label="Check If Any Balance Amount"
                                            checked={balance}
                                            name="balance"
                                            onChange={(e) => setBalance(e.target.checked)}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            onChange={(e) => setAmount(e.target.value)}
                                            //label="Last Amount"
                                            disabled={balance === true ? false : true}
                                            id="amount"
                                            size="small"
                                            name='amount'
                                            value={amount}
                                        />
                                    </Box>
                                </Box>
                            </Fragment> : null
                        }


                    </Paper>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant="solid" color="success"
                            onClick={submitFormdata}
                        >
                            Save
                        </Button>
                        <Button variant="solid" color="danger"
                            onClick={handleRejectRequest}
                        >
                            Cancel
                        </Button>
                    </Box>
                </ModalDialog >
            </Modal >
        </>
    )
}

export default memo(ApprovalModal) 