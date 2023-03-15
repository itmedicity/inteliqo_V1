import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { Fragment } from 'react'

const TableView = ({ plan }) => {
    return (
        <Fragment>
            {
                plan && plan.map((val, index) => {
                    return < Box sx={{ display: "flex", flexDirection: "row", px: 1, width: '100%' }} key={index} >
                        <Box borderLeft={1} borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                            <CssVarsProvider>
                                <Typography >
                                    {val.em_name}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '5%' }} >
                            <CssVarsProvider>
                                <Typography >
                                    {val.em_no}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '5%' }} >
                            <CssVarsProvider>
                                <Typography >
                                    {val.total_working_days}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                            <CssVarsProvider>
                                <Typography >
                                    {val.calculated_worked}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', flexDirection: 'column', width: '10%' }} >
                            {
                                val.fixedSalary.map((val, id) => {
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
                                val.earnings.map((val, id) => {
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
                                val.deduction.map((val, id) => {
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
                                    {val.gross_salary}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                            <CssVarsProvider>
                                <Typography >
                                    {val.esiValue}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                            <CssVarsProvider>
                                <Typography >
                                    {val.pfValue}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box borderRight={1} borderBottom={1} sx={{ display: "flex", justifyContent: "center", height: 'auto', width: '10%' }} >
                            <CssVarsProvider>
                                <Typography >
                                    {val.netSalary}
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                })
            }
        </Fragment>
    )
}

export default TableView