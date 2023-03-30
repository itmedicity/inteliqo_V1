import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import _ from 'underscore';

const PerformanceViewTable = ({ setperfdata }) => {

    const [performa, setPerforma] = useState([])//to reduce rendering or array data

    const newstate = useSelector((state) => state.getAppraisalData.performanceAssessment.performanceAssessmentList, _.isEqual)

    const perfromance = useMemo(() => newstate, [newstate])

    useEffect(() => {
        if (Object.keys(perfromance).length > 0) {
            setPerforma(perfromance)
        } else if (Object.keys(perfromance).length === 0) {
            setperfdata(1)
        }
    }, [perfromance, setperfdata])

    return (
        <Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}>
                <Box border={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "5%", height: 'auto' }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Slno
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "25%", height: 'auto' }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Key Result Areas
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "40%", height: 'auto' }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Key Performance Indicators
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "10%", height: 'auto' }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            KPI Score
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "20%", height: 'auto' }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Justification of Score
                        </Typography>
                    </CssVarsProvider>
                </Box>
            </Box>
            {
                performa && performa.map((val, index) => {
                    return <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}
                        key={index}>
                        <Box borderRight={1} borderBottom={1} borderLeft={1} sx={{ p: 1, display: "flex", width: "5%", height: 'auto' }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.slno}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "25%", height: 'auto' }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.kra_desc}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "40%", height: 'auto', }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.kpi}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "10%", height: 'auto', }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.kpi_score}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "20%", height: 'auto', }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.justitfication_score}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                })
            }
        </Fragment>
    )
}

export default memo(PerformanceViewTable)