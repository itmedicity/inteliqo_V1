import { Box, Card, CardContent, CssVarsProvider, Input, Typography } from '@mui/joy';
import { addDays, endOfMonth } from 'date-fns';
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import ContractRenewSelection from 'src/views/MuiComponents/ContractRenewSelection';
import PermannetCategorySelect from 'src/views/MuiComponents/PermannetCategorySelect';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import JoyDesgSelect from 'src/views/MuiComponents/JoyComponent/JoyDesgSelect';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

const RenewProcess = ({
    contractStartDate, setContractStartDate, permanetDOJ,
    setContractEndDate, setPermanentDoj, newContract,
    updateNewContract, emp_retireDate, contractrenew,
    setContractrenew, contractTpPermanent, setcontractTpPermanent,
    setRetirementdate
}) => {
    const dispatch = useDispatch()
    const { newempId, permanentEmpNo } = newContract
    const [permanentcate, setpermanentcate] = useState(0)//setting permanent category
    const [renewCate, setRenewCate] = useState(0)
    const [contractDesg, SetContractDesg] = useState(0)
    const [permanentDesg, setPermanentDesg] = useState(0)

    const retirementDate = useMemo(() => emp_retireDate, [emp_retireDate])

    //checkbox for contract renewal process
    const getContract = useCallback((e) => {
        if (e.target.checked === true) {
            setContractrenew(true)
            setcontractTpPermanent(false)
        }
        else {
            setContractrenew(false)
            setcontractTpPermanent(true)
        }
    }, [setContractrenew, setcontractTpPermanent])

    //checkbox for contract to permannet 
    const getPermanent = useCallback((e) => {
        if (e.target.checked === true) {
            setcontractTpPermanent(true)
            setContractrenew(false)
        }
        else {
            setcontractTpPermanent(false)
            setContractrenew(true)
        }
    }, [setContractrenew, setcontractTpPermanent])

    const UpdateNewContractInformation = useCallback(async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        updateNewContract({ ...newContract, [e.target.name]: value })
    }, [newContract, updateNewContract])

    //USE EFFECT FOR SETTING NEW CATEGORY
    useEffect(() => {
        if (permanentcate > 0) {
            dispatch({
                type: Actiontypes.FETCH_NEW_CAT, payload: permanentcate
            })
            dispatch({
                type: Actiontypes.FETCH_NEW_DESIGNATION, payload: permanentDesg
            })
        }
        else if (renewCate > 0) {
            setContractEndDate(addDays(new Date(contractStartDate), 365))
            dispatch({
                type: Actiontypes.FETCH_NEW_CAT, payload: renewCate
            })
            dispatch({
                type: Actiontypes.FETCH_NEW_DESIGNATION, payload: contractDesg
            })
        }
    }, [permanentcate, renewCate, dispatch, permanentDesg, contractDesg, contractStartDate,
        setContractEndDate])

    const CustomTypo = ({ labels }) => {
        return (
            <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end", alignItems: 'center' }}  >
                <Typography level="body-sm" pr={2} >{labels}</Typography>
            </Box>
        )
    }


    return (
        <Fragment>
            <Card
                variant="outlined"
                color="neutral"
                orientation="vertical"
                size="sm"
                sx={{ m: 0.5 }}
            >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Typography startDecorator={<AccountBalanceWalletOutlinedIcon />} level="title-md">Employee Renewal / Confirmation Process</Typography>
                </Box>
                <CardContent orientation="horizontal">
                    <Box sx={{ display: "flex", width: "100%", mt: 0.5 }} >
                        <Box sx={{ display: "flex", width: "50%", flexDirection: 'column', gap: 0.5 }} >
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: 'flex', pl: 5, pt: 0.5 }}>
                                    <JoyCheckbox
                                        name="contractrenew"
                                        label={"Contract Renewal"}
                                        checked={contractrenew}
                                        onchange={(e) => getContract(e)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%", pt: 1 }} >
                                <CustomTypo labels="New Employee ID" />
                                <Box sx={{ flex: 2, }} >
                                    <InputComponent
                                        placeholder={'New Employee ID'}
                                        type="text"
                                        size="sm"
                                        disabled={contractrenew === true ? false : true}
                                        name="newempId"
                                        value={newempId}
                                        onchange={(e) => UpdateNewContractInformation(e)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >

                                <CustomTypo labels="Contract Start Date" />
                                <Box sx={{ flex: 2, }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['day']}
                                            value={contractStartDate}
                                            size="small"
                                            disabled={contractrenew === true ? false : true}
                                            onChange={(newValue) => {
                                                setContractStartDate(newValue);
                                            }}
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <CssVarsProvider>
                                                        <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                    </CssVarsProvider>
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <CustomTypo labels="Contract End Date" />
                                <Box sx={{ flex: 2, }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['day']}
                                            value={endOfMonth(new Date(addDays(new Date(contractStartDate), 365)))}
                                            size="small"
                                            disabled={contractrenew === true ? false : true}
                                            onChange={(newValue) => {
                                                setContractEndDate(newValue);
                                            }}
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <CssVarsProvider>
                                                        <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                    </CssVarsProvider>
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%", }} >
                                <CustomTypo labels="New Category" />
                                <Box sx={{ flex: 2, }} >
                                    <ContractRenewSelection
                                        disable={contractrenew === true ? false : true}
                                        value={renewCate}
                                        setValue={setRenewCate} />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%", }} >
                                <CustomTypo labels="New Designation" />
                                <Box sx={{ flex: 2 }} >
                                    <JoyDesgSelect desgValue={contractDesg} getDesg={SetContractDesg} disable={contractrenew === true ? false : true} />
                                </Box>
                            </Box>
                        </Box>


                        {/* Contract to permanent Information */}

                        <Box sx={{ display: "flex", width: "50%", flexDirection: 'column', gap: 0.5 }} >
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: 'flex', pl: 5, pt: 0.5 }}>
                                    <JoyCheckbox
                                        label={"Contract to Permanent"}
                                        name="contractTpPermanent"
                                        checked={contractTpPermanent}
                                        onchange={(e) => getPermanent(e)}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", width: "100%", pt: 1 }} >
                                <CustomTypo labels="New Employee ID" />
                                <Box sx={{ flex: 2, }} >
                                    <InputComponent
                                        placeholder={'New Employee ID'}
                                        type="text"
                                        size="sm"
                                        disabled={contractTpPermanent === true ? false : true}
                                        name="permanentEmpNo"
                                        value={permanentEmpNo}
                                        onchange={(e) => UpdateNewContractInformation(e)}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <CustomTypo labels="Date of Join" />
                                <Box sx={{ flex: 2, }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['day']}
                                            value={permanetDOJ}
                                            size="small"
                                            onChange={(newValue) => {
                                                setPermanentDoj(newValue);
                                            }}
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <CssVarsProvider>
                                                        <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                    </CssVarsProvider>
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <CustomTypo labels="Retirement Date" />
                                <Box sx={{ flex: 2, }} >
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['day']}
                                            disabled={true}
                                            value={retirementDate}
                                            onChange={(newValue) => {
                                                setRetirementdate(newValue)
                                            }}
                                            size="small"
                                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                                <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                    <CssVarsProvider>
                                                        <Input ref={inputRef} {...inputProps} style={{ width: '100%' }} disabled={true} />
                                                    </CssVarsProvider>
                                                    {InputProps?.endAdornment}
                                                </Box>
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%", }} >
                                <CustomTypo labels="New Category" />
                                <Box sx={{ flex: 2 }} >
                                    <PermannetCategorySelect
                                        disable={contractTpPermanent === true ? false : true}
                                        value={permanentcate}
                                        setValue={setpermanentcate}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%", }} >
                                <CustomTypo labels="New Designation" />
                                <Box sx={{ flex: 2 }} >
                                    <JoyDesgSelect desgValue={permanentDesg} getDesg={setPermanentDesg}
                                        disable={contractTpPermanent === true ? false : true}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Fragment>
    )
}

export default memo(RenewProcess) 