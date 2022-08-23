import { CssVarsProvider } from '@mui/joy'
import { Box, Paper, Typography } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import TextInput from 'src/views/Component/TextInput'
import EmployeeCategory from 'src/views/CommonCode/EmployeeCategory';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import moment from 'moment';
import { addDays } from 'date-fns';
import { PayrolMasterContext } from 'src/Context/MasterContext';


const Renew_Process = ({ em_cont_end, grace_period, newContract, updateNewContract, newcategory, setNewCategory }) => {
    // useContext
    const { getemployeecategory, udateemployeecategory } = useContext(PayrolMasterContext)
    setNewCategory(getemployeecategory)
    const { newempId, newcontractstart, newcontractend } = newContract
    //setting contract start and end date
    useEffect(() => {
        if (em_cont_end !== 0 && grace_period !== 0) {
            const frmData = {
                newempId: '',
                newcontractstart: moment(addDays(new Date(em_cont_end), grace_period)).format('YYYY-MM-DD'),
                newcontractend: moment(addDays(addDays(new Date(em_cont_end), grace_period), 365)).format('YYYY-MM-DD')
            }
            updateNewContract(frmData)
        }
    }, [em_cont_end, grace_period])

    const UpdateNewContractInformation = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        updateNewContract({ ...newContract, [e.target.name]: value })
    }
    return (
        <Fragment>
            <Box sx={{ display: "flex", width: "100%" }} >
                <Paper square sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "center" }} variant="outlined" >
                    <CssVarsProvider>
                        <Typography level="body1" >New Employee ID</Typography>
                    </CssVarsProvider>
                </Paper>
                <Box sx={{ flex: 2, }} >
                    <TextInput
                        style={{ width: "100%", paddingLeft: 13 }}
                        Placeholder="New Employee ID"
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
                <Box sx={{ flex: 2 }} >
                    <EmployeeCategory style={SELECT_CMP_STYLE} />
                </Box>
            </Box>
        </Fragment>
    )
}

export default Renew_Process