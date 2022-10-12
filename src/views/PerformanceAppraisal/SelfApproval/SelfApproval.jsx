import { Box, Grid, Paper } from '@mui/material'
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import TextInput from 'src/views/Component/TextInput'

const SelfApproval = () => {

    const login = useSelector((state) => {
        return state.getProfileData.ProfileData[0]
    })
    console.log(login);
    const { em_no, em_name, sect_name, desg_name } = login


    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Self Performance Appraisal Approval"
                redirect={RedirectToProfilePage}
            >
                <Paper square elevation={2} >
                    <Box sx={{
                        //backgroundColor: "red",

                    }}>
                        <Grid container item xl={12} lg={12} spacing={1} direction="row"
                            justifyContent="center"
                            alignItems="center" sx={{
                                p: 1
                            }}>
                            <Grid item xl={3} lg={3}>
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Employee ID"
                                    disabled="disabled"
                                    value={em_no}
                                />
                            </Grid>
                            <Grid item xl={3} lg={3}>
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Emplyee Name"
                                    disabled="disabled"
                                    value={em_name}
                                />
                            </Grid>
                            <Grid item xl={3} lg={3}>
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Designation"
                                    disabled="disabled"
                                    value={desg_name}
                                />
                            </Grid>
                            <Grid item xl={3} lg={3}>
                                <TextInput
                                    type="text"
                                    classname="form-control form-control-sm"
                                    Placeholder="Department Section"
                                    disabled="disabled"
                                    value={sect_name}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default SelfApproval