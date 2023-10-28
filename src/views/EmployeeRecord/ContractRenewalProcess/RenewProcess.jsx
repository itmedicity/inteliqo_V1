import { Box, CssVarsProvider, Typography } from '@mui/joy';
import { Paper } from '@mui/material';
import { addDays } from 'date-fns';
import moment from 'moment';
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import TextInput from 'src/views/Component/TextInput';
import ContractRenewSelection from 'src/views/MuiComponents/ContractRenewSelection';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import PermannetCategorySelect from 'src/views/MuiComponents/PermannetCategorySelect';

const RenewProcess = ({
    em_cont_end, grace_period, newContract,
    updateNewContract, emp_retireDate, contractrenew,
    setContractrenew, contractTpPermanent, setcontractTpPermanent,
}) => {
    const dispatch = useDispatch()
    const { newempId, newcontractstart, newcontractend, permanentEmpNo, newdateofjoin } = newContract
    const [permanentcate, setpermanentcate] = useState(0)//setting permanent category
    const [renewCate, setRenewCate] = useState(0)

    const retirementDate = useMemo(() => emp_retireDate, [emp_retireDate])

    //setting contract start and end date
    useEffect(() => {
        if (em_cont_end !== 0 && grace_period !== 0) {
            const frmData = {
                newempId: '',
                newcontractstart: moment(addDays(new Date(em_cont_end), grace_period)).format('YYYY-MM-DD'),
                newcontractend: moment(addDays(addDays(new Date(em_cont_end), grace_period), 365)).format('YYYY-MM-DD'),
                permanentEmpNo: '',
                newdateofjoin: moment(addDays(new Date(em_cont_end), grace_period)).format('YYYY-MM-DD')
            }
            updateNewContract(frmData)
        }
    }, [em_cont_end, updateNewContract, grace_period])


    const UpdateNewContractInformation = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        updateNewContract({ ...newContract, [e.target.name]: value })
    }

    //USE EFFECT FOR SETTING NEW CATEGORY
    useEffect(() => {
        if (permanentcate > 0) {
            dispatch({
                type: Actiontypes.FETCH_NEW_CAT, payload: permanentcate
            })
        }
        else if (renewCate > 0) {
            dispatch({
                type: Actiontypes.FETCH_NEW_CAT, payload: renewCate
            })
        }
    }, [permanentcate, renewCate, dispatch])

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

    return (
        <Fragment>
            <Paper variant='outlined' square elevation={0} sx={{ display: "flex" }}  >
                <CssVarsProvider>
                    <Typography textColor="neutral.400" startDecorator={<DragIndicatorOutlinedIcon />} level="h6" >
                        Employee Renewal / Confirmation Process
                    </Typography>
                </CssVarsProvider>
            </Paper>
            <Box sx={{ display: "flex", width: "100%", mt: 0.5 }} >
                <Box sx={{ display: "flex", width: "50%", flexDirection: 'column' }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: 'flex', pl: 5, pt: 0.5 }}>
                            <JoyCheckbox
                                name="contractrenew"
                                checked={contractrenew}
                                onchange={(e) => getContract(e)}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, pl: 2 }}>
                            <CssVarsProvider>
                                <Typography level="body1" >Contract Renewal</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", width: "100%", pt: 1 }} >
                        <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                            <CssVarsProvider>
                                <Typography level="body1" >New Employee ID</Typography>
                            </CssVarsProvider>
                        </Paper>
                        <Box sx={{ flex: 2, }} >
                            <TextInput
                                style={{ width: "100%", paddingLeft: 13 }}
                                Placeholder="New Employee ID"
                                disabled={contractrenew === true ? false : true}
                                name="newempId"
                                value={newempId}
                                changeTextValue={(e) => UpdateNewContractInformation(e)}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                            <CssVarsProvider>
                                <Typography level="body1" >Contract Start Date</Typography>
                            </CssVarsProvider>
                        </Paper>
                        <Box sx={{ flex: 2, }} >
                            <TextInput
                                type="date"
                                style={{ width: "100%", paddingLeft: 13 }}
                                Placeholder="Description"
                                disabled={contractrenew === true ? false : true}
                                min={moment(addDays(new Date(em_cont_end), grace_period)).format('YYYY-MM-DD')}
                                name="newcontractstart"
                                value={newcontractstart}
                                changeTextValue={(e) => UpdateNewContractInformation(e)}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                            <CssVarsProvider>
                                <Typography level="body1" >Contract End Date</Typography>
                            </CssVarsProvider>
                        </Paper>
                        <Box sx={{ flex: 2, }} >
                            <TextInput
                                type="date"
                                style={{ width: "100%", paddingLeft: 13 }}
                                Placeholder="Description"
                                disabled={contractrenew === true ? false : true}
                                name="newcontractend"
                                max={moment(addDays(new Date(newcontractstart), 365)).format('YYYY-MM-DD')}
                                value={newcontractend}
                                changeTextValue={(e) => UpdateNewContractInformation(e)}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", width: "100%", }} >
                        <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                            <CssVarsProvider>
                                <Typography level="body1">New Category</Typography>
                            </CssVarsProvider>
                        </Paper>
                        <Box sx={{ flex: 2, pt: 0.5 }} >
                            <ContractRenewSelection
                                style={SELECT_CMP_STYLE}
                                disable={contractrenew === true ? false : true}
                                value={renewCate}
                                setValue={setRenewCate} />
                        </Box>
                    </Box>

                </Box>

                {/* category change to contract to permanent */}
                <Box sx={{ display: "flex", width: "50%", flexDirection: 'column' }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: 'flex', pl: 5, pt: 0.5 }}>
                            <JoyCheckbox
                                name="contractTpPermanent"
                                checked={contractTpPermanent}
                                onchange={(e) => getPermanent(e)}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, pl: 2 }}>
                            <CssVarsProvider>
                                <Typography level="body1" >Contract to Permanent</Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", width: "100%", pt: 1 }} >
                        <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                            <CssVarsProvider>
                                <Typography level="body1" >New Employee ID</Typography>
                            </CssVarsProvider>
                        </Paper>
                        <Box sx={{ flex: 2, }} >
                            <TextInput
                                style={{ width: "100%", paddingLeft: 13 }}
                                Placeholder="New Employee ID"
                                disabled={contractTpPermanent === true ? false : true}
                                name="permanentEmpNo"
                                value={permanentEmpNo}
                                changeTextValue={(e) => UpdateNewContractInformation(e)}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                            <CssVarsProvider>
                                <Typography level="body1" >Date of Join</Typography>
                            </CssVarsProvider>
                        </Paper>
                        <Box sx={{ flex: 2, }} >
                            <TextInput
                                type="date"
                                style={{ width: "100%", paddingLeft: 13 }}
                                Placeholder="Description"
                                disabled={contractTpPermanent === true ? false : true}
                                min={moment(addDays(new Date(em_cont_end), grace_period)).format('YYYY-MM-DD')}
                                name="newdateofjoin"
                                value={newdateofjoin}
                                changeTextValue={(e) => UpdateNewContractInformation(e)}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                            <CssVarsProvider>
                                <Typography level="body1" >Retirement Date</Typography>
                            </CssVarsProvider>
                        </Paper>
                        <Box sx={{ flex: 2, }} >
                            <TextInput
                                type="date"
                                style={{ width: "100%", paddingLeft: 13 }}
                                Placeholder="Description"
                                disabled={contractTpPermanent === true ? false : true}
                                name="retirementDate"
                                //max={moment(addDays(new Date(newcontractstart), 365)).format('YYYY-MM-DD')}
                                value={retirementDate}
                            // changeTextValue={(e) => UpdateNewContractInformation(e)}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", width: "100%", }} >
                        <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center", height: 30 }} variant="outlined" >
                            <CssVarsProvider>
                                <Typography level="body1">New Category</Typography>
                            </CssVarsProvider>
                        </Paper>
                        <Box sx={{ flex: 2, pt: 0.5 }} >
                            <PermannetCategorySelect
                                style={SELECT_CMP_STYLE}
                                disable={contractTpPermanent === true ? false : true}
                                value={permanentcate}
                                setValue={setpermanentcate}
                            />
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Fragment>
    )
}

export default memo(RenewProcess) 