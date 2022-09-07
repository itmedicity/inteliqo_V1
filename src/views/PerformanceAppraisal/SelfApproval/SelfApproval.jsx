import { Box, Paper } from '@mui/material'
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


    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Performance Appraisal Approval HOD"
                redirect={RedirectToProfilePage}
            >
                <Paper square elevation={2} sx={{ p: 0.5, }}>
                    <Box>
                        <TextInput
                            type="text"
                            classname="form-control form-control-sm"
                            Placeholder="Department"
                            disabled="disabled"
                        //value={dept_name}
                        />
                    </Box>
                </Paper>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default SelfApproval