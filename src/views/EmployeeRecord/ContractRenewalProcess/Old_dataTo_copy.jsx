import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Paper } from '@mui/material'
import React, { Fragment, useState } from 'react'
import CommonCheckBox from 'src/views/Component/CommonCheckBox'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity } from 'src/views/CommonCode/Commonfunc';

const Old_dataTo_copy = ({ id, no }) => {
    const [oldData, setOldData] = useState({
        personal: true,
        qualification: true,
        experience: true,
        salaryinformation: false,
        training: false,
        documentchecklist: false
    })
    const { personal, qualification, experience, salaryinformation, training, documentchecklist } = oldData
    const [oldflag, setOldflag] = useState(0)
    const getOldDataToCopy = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setOldData({ ...oldData, [e.target.name]: value })
    }
    //dispatching old data to copy
    const dispatch = useDispatch()
    const GetOldattoCopy = async () => {
        //setting checkbox values to reducer
        dispatch({ type: Actiontypes.FETCH_OLD_DATA_TO_COPY, payload: oldData })
        const { personal, salaryinformation } = oldData

        //getting personal data
        if (personal === true) {
            const result = await axioslogin.get(`/empmast/databyempno/getemid/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                dispatch({ type: Actiontypes.FETCH_OLD_PERSONAL_DATA, payload: data[0] })
                setOldflag(1)
            }
            else {
                dispatch({
                    type: Actiontypes.FETCH_OLD_PERSONAL_DATA, payload: []
                })
                setOldflag(0)
            }
        }
        else {
            dispatch({
                type: Actiontypes.FETCH_OLD_PERSONAL_DATA, payload: []
            })
        }
        //getting salary infromation details
        if (salaryinformation === true) {
            const result = await axioslogin.get(`/empearndeduction/deductionbyempno/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                dispatch({
                    type: Actiontypes.FETCH_OLD_SALARYINFORM, payload: data[0]
                })
            }
            else {
                dispatch({
                    type: Actiontypes.FETCH_OLD_SALARYINFORM, payload: []
                })
            }
        }
        else {
            dispatch({
                type: Actiontypes.FETCH_OLD_SALARYINFORM, payload: []
            })
        }
        succesNofity("Old Data Copied Successfully!!")

    }
    return (
        <Fragment>
            <Paper square elevation={0} sx={{ display: "flex", p: 1, }}  >
                <Box sx={{ flex: 1 }}>
                    <CssVarsProvider>
                        <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
                            Previous Data To Copy
                        </Typography>
                    </CssVarsProvider>
                </Box>
                {
                    oldflag === 1 ? <Box sx={{ flex: 0, pt: 0.5 }}>
                        <CssVarsProvider>
                            <Typography>
                                Done!
                            </Typography>
                        </CssVarsProvider>
                    </Box> : null
                }
                {oldflag === 1 ? <Box sx={{ flex: 0 }} >
                    <Chip
                        icon={
                            <IconButton className="p-1" >
                                <LibraryAddCheckOutlinedIcon size={22} />
                            </IconButton>
                        }
                        label="Copy Old Data"
                        clickable={false}
                    />
                </Box> : <Box sx={{ flex: 0 }} >
                    <Chip
                        icon={
                            <IconButton className="p-1" >
                                <LibraryAddCheckOutlinedIcon className="text-info" size={22} />
                            </IconButton>
                        }
                        label="Copy Old Data"
                        onClick={GetOldattoCopy}
                        clickable={true}
                    />
                </Box>}
            </Paper>
            <Paper square elevation={2} sx={{ p: 0.5, }}   >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography level="body1">Personal Information</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: 'left' }} >
                            <CommonCheckBox
                                name="personal"
                                // value={personal}
                                checked={personal}
                                onChange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography level="body1">Qualification</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'left' }} >
                            <CommonCheckBox
                                name="qualification"
                                // value={qualification}
                                checked={qualification}
                                onChange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography level="body1">Experience</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'left' }} >
                            <CommonCheckBox
                                name="experience"
                                // value={experience}
                                checked={experience}
                                onChange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography level="body1">Salary Information</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'left' }} >
                            <CommonCheckBox
                                name="salaryinformation"
                                // value={salaryinformation}
                                checked={salaryinformation}
                                onChange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography level="body1">Training Information</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'left' }} >
                            <CommonCheckBox
                                name="training"
                                // value={training}
                                checked={training}
                                onChange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography level="body1">Document Checklist</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'left' }} >
                            <CommonCheckBox
                                name="documentchecklist"
                                // value={documentchecklist}
                                checked={documentchecklist}
                                onChange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Fragment >
    )
}

export default Old_dataTo_copy