import {
    CssVarsProvider,
    Typography,
    Button,
    List,
    ListItemDecorator,
    Sheet,
    ListItemContent,
    ListDivider
} from '@mui/joy'
import IconButton from '@mui/joy/IconButton';
import { Box, Paper } from '@mui/material'
import React, { memo } from 'react'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Switch, { switchClasses } from '@mui/joy/Switch';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRightRounded';
import Flight from '@mui/icons-material/Flight';
import Wifi from '@mui/icons-material/Wifi';
import Bluetooth from '@mui/icons-material/Bluetooth';
import Podcasts from '@mui/icons-material/Podcasts';
import ListItem, { listItemClasses } from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import Overview from './Overview';

const ScannedDoc = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);

    return (
        <Box sx={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: 'space-between' }} >
            <Paper elevation={3} sx={{ display: "flex", flexDirection: 'column', width: '20%', p: 0.5, backgroundColor: '#EEEFF0' }} >
                <Box>
                    <CssVarsProvider>
                        {/* <Typography
                        level="h3"
                        fontSize="xl2"
                        fontWeight="xl"
                        id="ios-example-demo"
                        mb={1}
                    >
                        Scanned Docments
                    </Typography> */}
                        <List >
                            <ListItem nested>
                                <ListItem
                                    sx={{
                                        bgcolor: 'background.surface',
                                        mb: 1,
                                        borderRadius: 4,
                                    }}
                                >
                                    <ListItemButton
                                        aria-describedby="employee-documents"
                                        sx={{ borderRadius: 5, justifyContent: 'center' }}
                                    >
                                        DOCUMENTATION
                                    </ListItemButton>
                                </ListItem>
                                <Typography level="body3" aria-hidden>
                                    Included with your recent Apple device purchase. Must be accepted within
                                    90 days of activation.
                                </Typography>
                            </ListItem>
                        </List>
                    </CssVarsProvider>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        pl: '24px',
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
                            <ListItem nested>
                                <ListItem component="div" startAction={<ReceiptLong />}>
                                    <Typography level="body3" sx={{ textTransform: 'uppercase' }}>
                                        Documentation
                                    </Typography>
                                </ListItem>
                                <List sx={{ '--List-gap': '0px' }}>
                                    <ListItem>
                                        <ListItemButton selected>Checklist For Documents</ListItemButton>
                                    </ListItem>
                                </List>
                            </ListItem>

                            {/*  Pre-joining Documents start */}

                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen(!open)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open ? 'bold' : undefined,
                                            color: open ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Pre-Joining
                                    </Typography>
                                    <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        6
                                    </Typography>
                                </ListItem>
                                {open && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>
                                        <ListItem>
                                            <ListItemButton>Overview</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>
                                                0. Set Up Your Development Environment
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>
                                                1. Create and Deploy Your First Gatsby Site
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>2. Use and Style React components</ListItemButton>
                                        </ListItem>
                                    </List>
                                )}
                            </ListItem>

                            {/*  Pre-joining Documents Ends */}

                            {/*  Joining Formalities Documents Start */}
                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen2((bool) => !bool)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open2 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open2 ? 'bold' : undefined,
                                            color: open2 ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Joining Formalities
                                    </Typography>
                                    <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        19
                                    </Typography>
                                </ListItem>
                                {open2 && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>
                                        <ListItem>
                                            <ListItemButton>Overview</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Local Development</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Routing</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Styling</ListItemButton>
                                        </ListItem>
                                    </List>
                                )}
                            </ListItem>
                            {/*  Joining Formalities Documents End */}

                            {/*  Annual Mandatory Documents Start */}
                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen3((bool) => !bool)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open3 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open3 ? 'bold' : undefined,
                                            color: open3 ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Annual Mandatory Events
                                    </Typography>
                                    <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        4
                                    </Typography>
                                </ListItem>
                                {open3 && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>
                                        <ListItem>
                                            <ListItemButton>Overview</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Local Development</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Routing</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Styling</ListItemButton>
                                        </ListItem>
                                    </List>
                                )}
                            </ListItem>
                            {/*  Annual Mandatory Documents End */}

                            {/*  Special Documents Start */}
                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen4((bool) => !bool)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open4 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open4 ? 'bold' : undefined,
                                            color: open4 ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Special Documents
                                    </Typography>
                                    <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        3
                                    </Typography>
                                </ListItem>
                                {open4 && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>
                                        <ListItem>
                                            <ListItemButton>Overview</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Local Development</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Routing</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Styling</ListItemButton>
                                        </ListItem>
                                    </List>
                                )}
                            </ListItem>
                            {/*  Speical Documents End */}

                            {/*  Exit Documents Start */}
                            <ListItem
                                nested
                                sx={{ my: 1 }}
                                startAction={
                                    <IconButton
                                        variant="plain"
                                        size="sm"
                                        color="neutral"
                                        onClick={() => setOpen5((bool) => !bool)}
                                    >
                                        <KeyboardArrowDown
                                            sx={{ transform: open5 ? 'initial' : 'rotate(-90deg)', fontSize: 25 }}
                                        />
                                    </IconButton>
                                }
                            >
                                <ListItem>
                                    <Typography
                                        level="inherit"
                                        sx={{
                                            fontWeight: open5 ? 'bold' : undefined,
                                            color: open5 ? 'text.primary' : 'inherit',
                                        }}
                                    >
                                        Exit Documents
                                    </Typography>
                                    <Typography component="span" level="body3" sx={{ ml: 1 }}>
                                        2
                                    </Typography>
                                </ListItem>
                                {open5 && (
                                    <List sx={{ '--List-item-paddingY': '8px' }}>
                                        <ListItem>
                                            <ListItemButton>Overview</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Local Development</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Routing</ListItemButton>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemButton>Styling</ListItemButton>
                                        </ListItem>
                                    </List>
                                )}
                            </ListItem>
                            {/*  Exit Documents End */}

                        </List>
                    </CssVarsProvider>
                </Box>
            </Paper>
            <Box sx={{ display: "flex", flex: 1, width: '80%', px: 1 }} >
                <Paper elevation={3} sx={{ flex: 1, p: 1, }} >
                    <Box>
                        <Overview />
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}


export default memo(ScannedDoc)