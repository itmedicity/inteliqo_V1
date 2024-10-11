import { Box, Button, Chip, Divider, Input, Modal, ModalClose, ModalDialog, Textarea, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import MappingCheckbox from 'src/views/MuiComponents/MappingCheckbox';
import { format } from 'date-fns';
import { getEmployeeInformationLimited } from 'src/redux/reduxFun/reduxHelperFun';
import { useSelector } from 'react-redux';

const RemarkModal = ({ open, setOpen, data, setCount, dueDepartment }) => {

    const [reason, setReason] = useState('')
    const [details, setDetails] = useState(
        {
            emno: '',
            name: '',
            section: '',
            emid: 0,
            dept_id: 0,
            sect_id: 0
        }
    )
    const { emno, name, section, emid } = details;
    const [selectValue, setSelectValue] = useState(0)
    const [absentDate, setAbsentDate] = useState(new Date())
    const [resignDate, setResigndate] = useState(new Date())


    const confirmationArray = [
        { serialno: 1, name: 'Unauthorized Absent' },
        { serialno: 2, name: 'Inactive ' },
    ]

    const empInformation = useSelector((state) => getEmployeeInformationLimited(state))
    const empInformationFromRedux = useMemo(() => empInformation, [empInformation])
    const { em_id: loginEmid } = empInformationFromRedux;

    useEffect(() => {
        if (Object.keys(data).length !== 0) {
            const { sect_name, em_name, em_no, em_id, dept_id, sect_id } = data[0]
            const details = {
                emno: em_no,
                name: em_name,
                section: sect_name,
                emid: em_id,
                dept_id: dept_id,
                sect_id: sect_id
            }
            setDetails(details)
        }
        else {
            setDetails({})
        }
    }, [data])

    const saveData = useCallback(async () => {
        const postData = {
            em_id: emid,
            em_no: emno,
            resign_status: selectValue === 2 ? 1 : 0,
            em_status: 0,
            unauthorized_absent_status: selectValue === 1 ? 1 : 0,
            unauthorised_absent_date: selectValue === 1 ? format(new Date(absentDate), 'yyyy-MM-dd') : null,
        }

        const inactivedata = {
            em_id: emid,
            em_no: emno,
            remark: reason,
            resign_status: selectValue === 2 ? 1 : 0,
            resign_date: selectValue === 2 ? format(new Date(resignDate), 'yyyy-MM-dd') : null,
            unauthorized_absent_status: selectValue === 1 ? 1 : 0,
            unauthorised_absent_date: selectValue === 1 ? format(new Date(absentDate), 'yyyy-MM-dd') : null,
            create_user: loginEmid
        }
        if (reason === '') {
            setOpen(false)
            infoNofity("Please Add Remark!")
        } else {

            const duedeptdetl = dueDepartment.map((val) => {
                return { deptcode: val.deptcode, deptname: val.deptdesc, emp_id: emid }
            })
            //inactive employee
            const result = await axioslogin.patch('/Resignation/Inactiveemp', postData)
            const { success } = result.data
            if (success === 2) {
                setCount(Math.random())
                const result = await axioslogin.post('/dueclearence', duedeptdetl)
                const { success } = result.data
                if (success === 1) {
                    const result = await axioslogin.post('/empmast/insert/inactive', inactivedata)
                    const { success } = result.data
                    if (success === 1) {
                        setOpen(false)
                        succesNofity("Employee Inactivated")
                        setCount(Math.random())
                    } else {
                        warningNofity("Error while Inactive")
                    }
                } else {
                    setOpen(false)
                    warningNofity("Error while Inactive")
                }
            }
        }
    }, [emid, reason, emno, setCount, setOpen, dueDepartment, selectValue,
        absentDate, loginEmid, resignDate])

    const CloseModel = useCallback(() => {
        setOpen(false)
    }, [setOpen])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                // width: '100%'
            }}
        >
            <ModalDialog size="lg" sx={{ width: 500 }} >
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
                <Box sx={{ display: 'flex', flex: 1, alignContent: 'center', alignItems: 'left', flexDirection: 'column' }} >
                    <Typography
                        fontSize="xl2"
                        lineHeight={0.8}
                        startDecorator={
                            <AssignmentIndOutlinedIcon sx={{}} />
                        }
                        sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, textTransform: 'capitalize' }}
                    >
                        {name?.toLocaleLowerCase()}
                    </Typography>
                    <Typography
                        lineHeight={1}
                        component="h3"
                        id="modal-title"
                        level="h5"
                        textColor="inherit"
                        fontWeight="md"
                        startDecorator={`Employee #`}
                        sx={{ color: 'neutral.400', display: 'flex', }}
                    >
                        <Typography
                            level="h6"
                            justifyContent="center"
                            alignItems="center"
                            alignContent='center'
                            lineHeight={1.5}
                        >
                            {emno}
                        </Typography>
                    </Typography>
                    <Typography
                        level="h5"
                        textColor="inherit"
                        fontWeight="md"
                        sx={{ px: 0, textTransform: "capitalize", color: 'neutral.400', }}
                    // startDecorator={`Section`}
                    >
                        {section?.toLowerCase()}
                    </Typography>
                </Box>
                <Divider>
                    <Chip variant="outlined" color="info" size="sm">
                        HR Use Only
                    </Chip>
                </Divider>

                <Box sx={{ display: 'flex', flex: 2 }}>
                    {
                        confirmationArray?.map((val, idx) => {
                            return <Box sx={{
                                display: 'flex', p: 1,
                                width: { xl: "100%", lg: "100%", md: "100%", sm: "100%" }
                            }}
                                key={idx}
                            >
                                <MappingCheckbox
                                    label={val.name}
                                    name={val.name}
                                    value={val.serialno}
                                    onChange={setSelectValue}
                                    checkedValue={selectValue}
                                />
                            </Box>
                        })
                    }
                </Box>
                {
                    selectValue === 1 ? <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', }} >

                        <Box sx={{ display: 'flex', px: 0.5, alignItems: 'center' }} >
                            <Typography color="danger" level="title-sm" variant="plain" flexGrow={1} paddingX={2} >Unauthorized Absent Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    views={['day']}
                                    inputFormat="dd-MM-yyyy"
                                    value={absentDate}
                                    size="small"
                                    onChange={setAbsentDate}
                                    renderInput={({ inputRef, inputProps, InputProps }) => (
                                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                            {InputProps?.endAdornment}
                                        </Box>
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>
                    </Box> : null
                }
                {
                    selectValue === 2 ? <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['day']}
                                // minDate={subMonths(new Date(), 1)}
                                maxDate={new Date()}
                                value={resignDate}
                                inputFormat="dd-MM-yyyy"
                                size="small"
                                onChange={(newValue) => {
                                    setResigndate(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box> : null
                }
                <Box sx={{ pt: 0.5 }} >
                    <Textarea
                        name="Outlined"
                        required
                        sx={{ minHeight: 150, width: '100%' }}
                        placeholder="Reason for Inactive / Resignation"
                        variant="outlined"
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant="solid" color="success" onClick={saveData}>
                            Save
                        </Button>
                        <Button variant="solid" color="danger" onClick={CloseModel}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    )
}

export default memo(RemarkModal) 