import { Box, CssVarsProvider, List, Typography, } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { lazy, memo, useEffect, useState } from 'react'
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItem, { listItemClasses } from '@mui/joy/ListItem';


const DocumentView = lazy(() => import('./Documentview'))
const PreJoining = lazy(() => import('./PreJoining'))
const JoiningFormalities = lazy(() => import('./JoiningFormalities'))
const AnnualMandatory = lazy(() => import('./AnnualMandatory'))
const OtherDocuments = lazy(() => import('./OtherDocuments'))
const ExitDocument = lazy(() => import('./ExitDocument'))
const ChecklistDocument = lazy(() => import('./ChecklistDocument'))


const Document = ({ selectedRowData }) => {
    const [empdata, setDetails] = useState({ emp_name: "", sect_name: "", em_no: "", desg_name: "" })
    const { emp_name, sect_name, em_no, desg_name } = empdata

    useEffect(() => {
        if (Object.keys(selectedRowData).length !== 0) {
            const { emp_name, sect_name, em_no, desg_name } = selectedRowData
            const obj = {
                emp_name: emp_name === '' ? 'Not Updated' : emp_name.toLowerCase(),
                sect_name: sect_name === '' ? 'Not Updated' : sect_name.toLowerCase(),
                em_no: em_no,
                desg_name: desg_name === '' ? 'Not Updated' : desg_name.toLowerCase(),
            }
            setDetails(obj)
        }
        else {
            setDetails()
        }
    }, [selectedRowData])
    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', height: window.innerHeight - 85, width: "100%" }} >
            <Paper variant='outlined' square sx={{ display: "flex", flexDirection: 'column', width: '15%', p: 0.5, backgroundColor: '#EEEFF0' }} >
                <Box sx={{ width: "100%", backgroundColor: "background.surface", p: 0.5, borderRadius: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", }}>
                        <Typography sx={{ color: "#6B728E", fontSize: 12, fontWeight: "bold" }}>PERSONAL RECORD</Typography>
                    </Box>

                </Box>
                <Box sx={{
                    mt: 1, pl: '24px',
                }}>

                    <Typography sx={{ fontSize: 14, textTransform: "capitalize" }}>{emp_name}</Typography>
                    <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>{sect_name}</Typography>
                    <Typography sx={{ fontSize: 13, }}> ID:{em_no}</Typography>
                    <Typography sx={{ fontSize: 13, }}>{desg_name}</Typography>

                </Box>


                <Box
                    sx={{
                        flex: 1,
                        mt: 1,
                        pl: '24px',
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: "none" }
                    }}
                >
                    <CssVarsProvider>
                        <List
                            size="sm"
                            sx={(theme) => ({
                                // Gatsby colors
                                '--joy-palette-primary-plainColor': '#8a4baf',
                                '--joy-palette-neutral-plainHoverBg': 'transparent',
                                '--joy-palette-neutral-plainActiveBg': 'transparent',
                                '--joy-palette-primary-plainHoverBg': 'transparent',
                                '--joy-palette-primary-plainActiveBg': 'transparent',
                                [theme.getColorSchemeSelector('dark')]: {
                                    '--joy-palette-text-secondary': '#635e69',
                                    '--joy-palette-primary-plainColor': '#d48cff',
                                },

                                '--List-insetStart': '32px',
                                '--List-item-paddingY': '0px',
                                '--List-item-paddingRight': '16px',
                                '--List-item-paddingLeft': '21px',
                                '--List-item-startActionWidth': '0px',
                                '--List-item-startActionTranslateX': '-50%',

                                [`& .${listItemButtonClasses.root}`]: {
                                    borderLeft: '1px solid',
                                    borderColor: 'divider',
                                },
                                [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                                    borderColor: 'currentColor',
                                },
                                [`& .${listItemClasses.nested} > .${listItemButtonClasses.root}`]: {
                                    border: 'none',
                                },
                                '& [class*="startAction"]': {
                                    color: 'var(--joy-palette-text-tertiary)',
                                },
                            })}
                        >
                            {/*  ChecklistDocument start */}
                            < ChecklistDocument />
                            {/*  ChecklistDocument  Ends */}

                            {/*  Pre-joining Documents start */}
                            <PreJoining />

                            {/*  Pre-joining Documents Ends */}

                            {/*  Joining Formalities Documents Start */}
                            <JoiningFormalities />
                            {/*  Joining Formalities Documents End */}

                            {/*  Annual Mandatory Documents Start */}
                            <AnnualMandatory />
                            {/*  Annual Mandatory Documents End */}

                            {/*  Special Documents Start */}
                            <OtherDocuments />
                            {/*  Speical Documents End */}


                            {/*  Exit Documents Start */}
                            <ExitDocument />
                        </List>
                    </CssVarsProvider>
                </Box>

            </Paper>
            <Box sx={{ display: "flex", flex: 1, width: '85%', }} >
                <Paper square variant='outlined' sx={{ flex: 1, p: 0.5 }} >

                    <DocumentView selectedRowData={selectedRowData} />

                </Paper>
            </Box>

        </Box>
    )
}

export default memo(Document)