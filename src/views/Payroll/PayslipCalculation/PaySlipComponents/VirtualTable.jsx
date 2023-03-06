import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Grid } from '@mui/material'
import React, { Fragment } from 'react'

const VirtualTable = ({ user }) => {

    return (
        <Fragment>
            < Box sx={{ display: "flex", flexDirection: "row", px: 1, width: '100%' }} >
                <Box borderLeft={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                    <CssVarsProvider>
                        <Typography >
                            {user.em_name}
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '5%' }} >
                    <CssVarsProvider>
                        <Typography >
                            {user.em_no}
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '5%' }} >
                    <CssVarsProvider>
                        <Typography >
                            {user.total_working_days}
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                    <CssVarsProvider>
                        <Typography >
                            {user.calculated_worked}
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                    {
                        user.fixedSalary.map((val, id) => {
                            return <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} key={id}>
                                <Box sx={{ width: '60%', }} >
                                    <CssVarsProvider >
                                        <Typography >
                                            {val.earnded_name}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%', }}>
                                    <CssVarsProvider >
                                        <Typography >
                                            {val.em_amount}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>

                        })
                    }
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                    {
                        user.earnings.map((val, id) => {
                            return <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} key={id}>
                                <Box sx={{ width: '60%', }} >
                                    <CssVarsProvider >
                                        <Typography >
                                            {val.earnded_name}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%', }}>
                                    <CssVarsProvider >
                                        <Typography >
                                            {val.em_amount}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>

                        })
                    }
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                    {
                        user.deduction.map((val, id) => {
                            return <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} key={id}>
                                <Box sx={{ width: '60%', }} >
                                    <CssVarsProvider >
                                        <Typography >
                                            {val.earnded_name}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ width: '30%', }}>
                                    <CssVarsProvider >
                                        <Typography >
                                            {val.em_amount}
                                        </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>

                        })
                    }
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                    <CssVarsProvider>
                        <Typography >
                            {user.gross_salary}
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                    <CssVarsProvider>
                        <Typography >
                            {user.esiValue}
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                    <CssVarsProvider>
                        <Typography >
                            {user.pfValue}
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                    <CssVarsProvider>
                        <Typography >
                            {user.netSalary}
                        </Typography>
                    </CssVarsProvider>
                </Box>
            </Box >
        </Fragment >

    )
}

export default VirtualTable