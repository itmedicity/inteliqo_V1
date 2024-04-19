import { Card, CardContent, CssVarsProvider, IconButton, Chip, } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Box } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity } from 'src/views/CommonCode/Commonfunc';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import AttributionIcon from '@mui/icons-material/Attribution';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';

const OldDatatoCopy = ({ id }) => {
    const dispatch = useDispatch()
    const [oldflag, setOldflag] = useState(0)
    const [oldData, setOldData] = useState({
        empRecord: true,
        salaryinformation: false
    })
    const { empRecord, salaryinformation } = oldData

    const getOldDataToCopy = useCallback(async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setOldData({ ...oldData, [e.target.name]: value })
    }, [oldData])


    const GetOldattoCopy = useCallback(async () => {
        setOldflag(1)
        dispatch({ type: Actiontypes.FETCH_OLD_DATA_TO_COPY, payload: oldData })
        const { empRecord, salaryinformation } = oldData
        //getting personal data
        if (empRecord === true) {
            const result = await axioslogin.get(`/empmast/databyempno/getemid/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                dispatch({ type: Actiontypes.FETCH_OLD_PERSONAL_DATA, payload: data[0] })

            } else {
                dispatch({ type: Actiontypes.FETCH_OLD_PERSONAL_DATA, payload: [] })
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
            <Card
                variant="outlined"
                color="neutral"
                orientation="vertical"
                size="sm"
                sx={{ m: 0.5 }}
            >
                <Box sx={{ display: "flex", width: "100%" }} >
                    <Chip
                        color="danger"
                        size="md"
                        variant="outlined"
                        startDecorator={<AttributionIcon fontSize='small' color='success' />}
                    >
                        <Typography color="neutral" level="title-md" >Employee Record Information</Typography>
                    </Chip>
                </Box>
                {/* 
                <Box sx={{ display: "flex", width: "100%" }} >
                    <IconButton
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{ position: 'initial', top: '0.875rem', right: '0.5rem' }}
                    >
                        <AttributionIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", width: "100%", mt: 0.5 }} >
                        <Typography level="title-lg">Employee Record Information</Typography>
                    </Box>
                </Box> */}
                <CardContent orientation="horizontal" >
                    <Box sx={{ display: "flex", flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }} >
                        <Box sx={{ display: "flex", px: 0.5, justifyContent: 'left' }} >
                            <JoyCheckbox
                                name="empRecord"
                                label={"Employee Record Data"}
                                checked={empRecord}
                                onchange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                        <Box sx={{ display: "flex", px: 0.5, justifyContent: 'left' }} >
                            <JoyCheckbox
                                name="salaryinformation"
                                label={"Salary Information"}
                                checked={salaryinformation}
                                onchange={(e) => getOldDataToCopy(e)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, }}>
                        {
                            oldflag === 1 ?
                                <Chip
                                    color="danger"
                                    // onClick={ProcessAttendance}
                                    size="md"
                                    variant="outlined"
                                    startDecorator={<LibraryAddCheckOutlinedIcon fontSize='inherit' />}
                                >Old Data Copied
                                </Chip>
                                : <Chip
                                    color="success"
                                    onClick={GetOldattoCopy}
                                    size="md"
                                    variant="solid"
                                    sx={{ px: 2 }}
                                    startDecorator={<ContentCopyOutlinedIcon fontSize='inherit' />}
                                >Copy Old Data
                                </Chip>
                        }
                    </Box>
                </CardContent>
            </Card>
        </Fragment >
    )
}

export default memo(OldDatatoCopy) 