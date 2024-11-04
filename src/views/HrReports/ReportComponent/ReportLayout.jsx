import { Box, CssVarsProvider, IconButton, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type'
import { screenInnerHeight } from 'src/views/Constant/Constant';

const ReportLayout = ({ children, title, displayClose, data }) => {

    const history = useHistory();
    const dispatch = useDispatch()

    const toRedirectToHome = () => {
        history.push(`/Home/Reports`)
    }

    const download = useCallback(() => {
        if (data.length === 0) {
            warningNofity("Please Click The Search Button After Selecting the Options")
        }
        else {
            dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 1 })
        }
    }, [data, dispatch])

    return (
        <Box sx={{ flex: 1 }} >
            <Paper sx={{ flex: 1, height: screenInnerHeight - 90 }} >
                <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                        <Paper square sx={{
                            display: "flex", flex: 1, height: 30,
                            alignItems: 'center'
                        }} >
                            <Box sx={{ display: "flex", flex: 1 }}>
                                <DragIndicatorOutlinedIcon />
                                <CssVarsProvider>
                                    <Typography sx={{ display: 'flex', fontWeight: 500 }} >
                                        {title}
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Tooltip title="Download" followCursor placement='top' arrow >
                                <Box sx={{ display: "flex", pr: 1 }}>
                                    <CssVarsProvider>
                                        <IconButton
                                            variant="outlined"
                                            size='xs'
                                            color='primary'
                                            onClick={download}
                                            sx={{ color: '#347aeb' }}
                                        >
                                            <ArrowDownwardIcon />
                                        </IconButton>
                                    </CssVarsProvider>
                                </Box>
                            </Tooltip>
                            <Box sx={{ display: "flex", pr: 1 }}>
                                <CssVarsProvider>
                                    {
                                        displayClose &&
                                        <IconButton
                                            variant="outlined"
                                            size='xs'
                                            color="danger"
                                            onClick={toRedirectToHome}
                                            sx={{ color: '#ef5350' }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    }
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Paper>
                <Box sx={{ display: 'flex', flex: 1, py: 0.5 }} >
                    {children}
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(ReportLayout) 