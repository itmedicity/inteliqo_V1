import { Button, CssVarsProvider } from '@mui/joy'
import { Box, TextareaAutosize, } from '@mui/material'
import moment from 'moment'
import React, { Fragment, memo, useState } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import GeneralrequestSelect from 'src/views/MuiComponents/GeneralrequestSelect'
import _ from 'underscore'

const Generalrequest = () => {
    const getEmployeeInformation = useSelector((state) => state.getEmployeeInformationState.empData, _.isEqual);
    const selectedEmployeeDetl = useMemo(() => getEmployeeInformation, [getEmployeeInformation])

    const { em_no, em_id, em_department, em_dept_section } = selectedEmployeeDetl?.[0];

    const [requsttype, setRequestType] = useState(0)
    const [comments, setComments] = useState('')

    const postData = useMemo(() => {
        return {
            em_id: em_id,
            em_no: em_no,
            dept_id: em_department,
            dept_sect_id: em_dept_section,
            request_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            general_request_type: requsttype,
            request_comments: comments
        }
    }, [em_id, em_no, em_department, em_dept_section, requsttype, comments])

    const submitRequest = async () => {
        if (requsttype === 0) {
            warningNofity("Please Select Any Request")
        } else {
            const result = await axioslogin.post('/CommonReqst/craete/general', postData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNofity(message)
                setComments('')
                setRequestType(0)
            } else {
                errorNofity(message)
                setComments('')
                setRequestType(0)
            }
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%', pt: 0.5 }}>
                <Box sx={{ flex: 1, pr: 0.3, pt: 1 }} >
                    <GeneralrequestSelect value={requsttype} setValue={setRequestType} />
                </Box>
                <Box sx={{ flex: 3, pr: 0.3 }}>
                    <TextareaAutosize
                        style={{ width: "100%", display: "flex" }}
                        minRows={2}
                        placeholder="Comments Here"
                        value={comments}
                        name="comments"
                        onChange={(e) => setComments(e.target.value)}
                    />
                </Box>
                <Box sx={{ pr: 0.3, mt: 0.9 }}>
                    <CssVarsProvider>
                        <Button
                            variant="outlined"
                            component="label"
                            size="md"
                            color="primary"
                            onClick={submitRequest}
                        >
                            Save
                        </Button>
                    </CssVarsProvider>
                </Box>
            </Box>
        </Fragment >
    )
}

export default memo(Generalrequest)