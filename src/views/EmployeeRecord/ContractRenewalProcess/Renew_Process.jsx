import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, Typography } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import moment from 'moment';
import { addDays } from 'date-fns';
import { Actiontypes } from 'src/redux/constants/action.type'
import { useDispatch } from 'react-redux';
import CommonCheckBox from 'src/views/Component/CommonCheckBox';
import PermannetCategorySelect from 'src/views/MuiComponents/PermannetCategorySelect';
import ContractRenewSelection from 'src/views/MuiComponents/ContractRenewSelection';


const Renew_Process = ({
    em_cont_end, grace_period, newContract,
    updateNewContract, emp_retireDate, contractrenew,
    setContractrenew, contractTpPermanent, setcontractTpPermanent,
}) => {
    const dispatch = useDispatch()

    const { newempId, newcontractstart, newcontractend, permanentEmpNo, newdateofjoin } = newContract

    //const [contractrenew, setContractrenew] = useState(false)//checkbox state for contract renewal
    //const [contractTpPermanent, setcontractTpPermanent] = useState(false)//checkbox state for contract permanent
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
    }, [em_cont_end, grace_period])


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
    }, [])

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
    }, [])


    return (
        <Fragment>
            <Box sx={{ display: "flex", width: "100%" }} >
                <Box sx={{ display: "flex", width: "50%", flexDirection: 'column' }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: 'flex', pl: 5, pt: 0.5 }}>
                            <CommonCheckBox
                                name="contractrenew"
                                // value={contractrenew}
                                checked={contractrenew}
                                onChange={(e) => getContract(e)}
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
                            {/* <EmployeeCategory style={SELECT_CMP_STYLE} disable={contractrenew === true ? false : true} /> */}
                        </Box>
                    </Box>

                </Box>

                {/* category change to contract to permanent */}
                <Box sx={{ display: "flex", width: "50%", flexDirection: 'column' }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: 'flex', pl: 5, pt: 0.5 }}>
                            <CommonCheckBox
                                name="contractTpPermanent"
                                // value={contractTpPermanent}
                                checked={contractTpPermanent}
                                onChange={(e) => getPermanent(e)}
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
                            {/* <EmployeeCategory style={SELECT_CMP_STYLE} disable={contractTpPermanent === true ? false : true} /> */}
                        </Box>
                    </Box>

                </Box>
            </Box>
        </Fragment>
    )
}

export default Renew_Process