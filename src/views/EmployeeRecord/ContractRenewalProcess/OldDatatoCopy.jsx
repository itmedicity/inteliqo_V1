import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box, Chip, IconButton, Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity } from 'src/views/CommonCode/Commonfunc';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const OldDatatoCopy = ({ id }) => {
    const dispatch = useDispatch()
    const [oldflag, setOldflag] = useState(0)
    const [oldData, setOldData] = useState({
        empRecord: true,
        salaryinformation: false
    })
    const { empRecord, salaryinformation } = oldData

    const getOldDataToCopy = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setOldData({ ...oldData, [e.target.name]: value })
    }
    const GetOldattoCopy = useCallback(async () => {
        dispatch({ type: Actiontypes.FETCH_OLD_DATA_TO_COPY, payload: oldData })
        const { empRecord, salaryinformation } = oldData
        //getting personal data
        if (empRecord === true) {
            const result = await axioslogin.get(`/empmast/databyempno/getemid/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                dispatch({ type: Actiontypes.FETCH_OLD_PERSONAL_DATA, payload: data[0] })
                setOldflag(1)
            } else {
                dispatch({
                    type: Actiontypes.FETCH_OLD_PERSONAL_DATA, payload: []
                })
                setOldflag(0)
            }
        } else {
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
            } else {
                dispatch({
                    type: Actiontypes.FETCH_OLD_SALARYINFORM, payload: []
                })
            }
        } else {
            dispatch({
                type: Actiontypes.FETCH_OLD_SALARYINFORM, payload: []
            })
        }
        succesNofity("Old Data Copied Successfully!!")
    }, [dispatch, oldData, id])
    return (
        <Fragment>
            <Paper square variant='outlined' sx={{ display: "flex" }}  >
                <Box sx={{ flex: 1 }}>
                    <CssVarsProvider>
                        <Typography textColor="neutral.400" startDecorator={<DragIndicatorOutlinedIcon />} level="h6" >
                            Employee Record Information
                        </Typography>
                    </CssVarsProvider>
                </Box>
                {
                    oldflag === 1 ? <Box sx={{ flex: 0, pt: 0.5, pr: 1.5 }}>
                        <CssVarsProvider>
                            <Typography sx={{ color: 'green' }}>
                                Done!
                            </Typography>
                        </CssVarsProvider>
                    </Box> : null
                }
                {oldflag === 1 ? <Box sx={{ flex: 0 }} >
                    <Chip
                        icon={
                            <IconButton className="p-1" >
                                <LibraryAddCheckOutlinedIcon />
                            </IconButton>
                        }
                        label="Copy Old Data"
                        clickable={false}
                    />
                </Box> : <Box sx={{ flex: 0 }} >
                    <Chip
                        icon={
                            <IconButton className="p-1" >
                                <LibraryAddCheckOutlinedIcon className="text-info" />
                            </IconButton>
                        }
                        label="Copy Old Data"
                        onClick={GetOldattoCopy}
                        clickable={true}
                    />
                </Box>}
            </Paper>
            <Paper square elevation={0} sx={{ p: 0.5, }}   >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography level="body1">Employee Record Data</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'left' }} >
                            <JoyCheckbox
                                name="empRecord"
                                checked={empRecord}
                                onchange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", width: "100%" }} >
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'center' }} >
                            <CssVarsProvider>
                                <Typography level="body1">Salary Information</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ display: "flex", flex: 1, px: 0.5, pt: 1, justifyContent: 'left' }} >
                            <JoyCheckbox
                                name="salaryinformation"
                                checked={salaryinformation}
                                onchange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Fragment >
    )
}

export default memo(OldDatatoCopy) 