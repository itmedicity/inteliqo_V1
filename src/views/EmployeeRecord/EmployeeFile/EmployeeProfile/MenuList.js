import { Box } from '@mui/material'
import React, { memo, useState } from 'react'
import { CssVarsProvider, List, Typography } from '@mui/joy';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ArticleIcon from '@mui/icons-material/Article';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import BadgeIcon from '@mui/icons-material/Badge';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useSelector, useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type';
import _ from 'underscore';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItem, { listItemClasses } from '@mui/joy/ListItem';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const MenuList = () => {
    const { FETCH_EMP_MENU_SLNO } = Actiontypes;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [open3, setOpen3] = useState(false)

    //get module rights
    const modulerights = useSelector((state) => state?.getModuleRightList?.modulerightsList.map(ele => ele.menu_slno) || [], _.isEqual)

    const clickFunction = (slno) => {
        dispatch({ type: FETCH_EMP_MENU_SLNO, payload: slno })
    }

    const ProfileMenuList = [
        { slno: 197, color: '#ff8a80', name: 'My Profile', Icon: <AppRegistrationIcon />, funName: clickFunction, },
        { slno: 198, color: '#ea80fc', name: 'Personal Information', Icon: <PermContactCalendarIcon />, funName: clickFunction, },
        { slno: 199, color: '#8c9eff', name: 'Accademic Information', Icon: <CastForEducationIcon />, funName: clickFunction, },
        { slno: 200, color: '#80d8ff', name: 'Experience', Icon: <ArticleIcon />, funName: clickFunction, },
        { slno: 211, color: '#c5e1a5', name: 'Job Description', Icon: <ArticleIcon />, funName: clickFunction, },
        { slno: 209, color: '#e1bee7', name: 'Vaccination Information', Icon: <EnhancedEncryptionIcon />, funName: clickFunction, },
    ]
    const earningsMenuList = [
        { color: '#80cbc4', name: 'Salary information', Icon: <AttachMoneyIcon />, funName: clickFunction, slno: 204 },
        { color: '#ea80fc', name: 'Earnings / Deduction', Icon: <AlignVerticalCenterIcon />, funName: clickFunction, slno: 203 },
        { color: '#a7ffeb', name: 'Statutory Information', Icon: <LibraryBooksIcon />, funName: clickFunction, slno: 201 },
        { color: '#b2ebf2', name: 'Fine / Other Deduction', Icon: <AdminPanelSettingsIcon />, funName: clickFunction, slno: 206 },
        { color: '#9fa8da', name: 'Salary Increment Setting', Icon: <LegendToggleIcon />, funName: clickFunction, slno: 207 },
    ]

    const LeaveMenuList = [
        { color: '#b39ddb', name: 'Leave Process', Icon: <BadgeIcon />, funName: clickFunction, slno: 205 },
    ]

    // const MenuItemList = [
    //     // { color: '#ffccbc', name: 'Contract Information', Icon: <ContactPhoneIcon />, funName: clickFunction, slno: 109 },
    //     // { color: '#c5e1a5', name: 'Company Information', Icon: <BusinessIcon />, funName: clickFunction, slno: 202 },
    //     // { color: '#b39ddb', name: 'Leave Setting', Icon: <BadgeIcon />, funName: clickFunction, slno: 205 },
    //     { color: '#ffab91', name: 'Document Checklist', Icon: <ListAltIcon />, funName: clickFunction, slno: 208 },
    //     { color: '#ffcc80', name: 'End Of Service', Icon: <HttpsIcon />, funName: clickFunction, slno: 212 },
    // ]

    const traingList = [
        { slno: 210, color: '#81d4fa', name: 'Training Information', Icon: <InsertChartIcon />, funName: clickFunction, },
    ]

    const profileMenu = ProfileMenuList?.filter(val => modulerights.includes(val.slno) === true ? val.slno : null);
    const earnMenu = earningsMenuList?.filter(val => modulerights.includes(val.slno) === true ? val.slno : null);
    const leaveMenu = LeaveMenuList?.filter(val => modulerights.includes(val.slno) === true ? val.slno : null);
    const trainingMenu = traingList?.filter(val => modulerights.includes(val.slno) === true ? val.slno : null);



    return (
        <Box
            sx={{
                flex: 1,
                mt: 1,
                pl: '10px',
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
                    {/* Profile list start*/}
                    <ListItem nested sx={{ my: 1 }}
                        startAction={
                            <Box
                                variant="plain"
                                size="sm"
                                color="neutral"
                                onClick={() => setOpen(!open)}
                            >
                                <KeyboardArrowDown
                                    sx={{ transform: open ? 'initial' : 'rotate(-90deg)', fontSize: 20 }}
                                />
                            </Box>
                        } >
                        <ListItem>
                            <Typography
                                level="inherit"
                                sx={{
                                    fontWeight: open ? 'bold' : undefined,
                                    color: open ? 'text.primary' : 'inherit',
                                }}
                            >
                                Profile Information
                            </Typography>
                        </ListItem>
                        {open && (
                            <List sx={{ '--List-item-paddingY': '8px' }}>
                                {
                                    profileMenu?.map((item, index) => {
                                        return <ListItem key={index}>
                                            <ListItemButton onClick={() => item?.funName(item?.slno)}>{item?.name}</ListItemButton>
                                        </ListItem>
                                    })
                                }
                            </List>
                        )}
                    </ListItem>
                    {/* Profile list end*/}

                    {/* Earnings list start*/}
                    <ListItem nested sx={{ my: 1 }}
                        startAction={
                            <Box
                                variant="plain"
                                size="sm"
                                color="neutral"
                                onClick={() => setOpen1(!open1)}
                            >
                                <KeyboardArrowDown
                                    sx={{ transform: open1 ? 'initial' : 'rotate(-90deg)', fontSize: 20 }}
                                />
                            </Box>
                        } >
                        <ListItem>
                            <Typography
                                level="inherit"
                                sx={{
                                    fontWeight: open1 ? 'bold' : undefined,
                                    color: open1 ? 'text.primary' : 'inherit',
                                }}
                            >
                                Earning & Deduction Information
                            </Typography>
                        </ListItem>
                        {open1 && (
                            <List sx={{ '--List-item-paddingY': '8px' }}>
                                {
                                    earnMenu?.map((item, index) => {
                                        return <ListItem key={index}>
                                            <ListItemButton onClick={() => item?.funName(item?.slno)}>{item?.name}</ListItemButton>
                                        </ListItem>
                                    })
                                }

                            </List>
                        )}
                    </ListItem>
                    {/* Earnings list end*/}

                    <ListItem nested sx={{ my: 1 }}
                        startAction={
                            <Box
                                variant="plain"
                                size="sm"
                                color="neutral"
                                onClick={() => setOpen2(!open2)}
                            >
                                <KeyboardArrowDown
                                    sx={{ transform: open2 ? 'initial' : 'rotate(-90deg)', fontSize: 20 }}
                                />
                            </Box>
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
                                Leave Information
                            </Typography>
                        </ListItem>
                        {open2 && (
                            <List sx={{ '--List-item-paddingY': '8px' }}>
                                {
                                    leaveMenu?.map((item, index) => {
                                        return <ListItem key={index}>
                                            <ListItemButton onClick={() => item?.funName(item?.slno)}>{item?.name}</ListItemButton>
                                        </ListItem>
                                    })
                                }

                            </List>
                        )}
                    </ListItem>

                    <ListItem nested sx={{ my: 1 }}
                        startAction={
                            <Box
                                variant="plain"
                                size="sm"
                                color="neutral"
                                onClick={() => setOpen3(!open3)}
                            >
                                <KeyboardArrowDown
                                    sx={{ transform: open3 ? 'initial' : 'rotate(-90deg)', fontSize: 20 }}
                                />
                            </Box>
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
                                Training Information
                            </Typography>
                        </ListItem>
                        {open3 && (
                            <List sx={{ '--List-item-paddingY': '8px' }}>
                                {
                                    trainingMenu?.map((item, index) => {
                                        return <ListItem key={index}>
                                            <ListItemButton onClick={() => item?.funName(item?.slno)}>{item?.name}</ListItemButton>
                                        </ListItem>
                                    })
                                }

                            </List>
                        )}
                    </ListItem>

                </List>
            </CssVarsProvider >
        </Box >
    )
}

export default memo(MenuList) 