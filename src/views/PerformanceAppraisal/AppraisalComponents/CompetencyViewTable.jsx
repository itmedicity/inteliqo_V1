import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import _ from 'underscore'

const CompetencyViewTable = ({ setCompdata }) => {
    const [competency, setCompetency] = useState([])//setting state for removing rerendering redux data

    const newstate = useSelector((state) => state.getAppraisalData.compAssessment.compAssessmentList, _.isEqual)

    const comp = useMemo(() => newstate, [newstate])
    //code for removing rerender
    useEffect(() => {
        if (Object.keys(comp).length > 0) {
            setCompetency(comp)
        } else if (Object.keys(comp).length === 0) {
            setCompdata(1)
        }
    }, [comp])

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
                <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "30%", height: 'auto' }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Expected Competency
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "30%", height: 'auto' }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Actual Competency
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderTop={1} borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", justifyContent: "center", width: "10%", height: 'auto' }} >
                    <CssVarsProvider>
                        <Typography textColor="text.secondary">
                            Score
                        </Typography>
                    </CssVarsProvider>
                </Box>
            </Box>
            {
                competency && competency.map((val, index) => {
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
                        <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "30%", height: 'auto', }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.competency_desc}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "30%", height: 'auto', }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.actual_comp}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ p: 1, display: "flex", width: "10%", height: 'auto', }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary">
                                    {val.competency_score}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                })
            }
        </Fragment>
    )
}

export default memo(CompetencyViewTable) 