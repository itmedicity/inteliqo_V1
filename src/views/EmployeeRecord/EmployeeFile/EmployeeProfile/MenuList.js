import { Box } from '@mui/material'
import React from 'react'
import { Chip, CssVarsProvider } from '@mui/joy';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRightRounded';
import HttpsIcon from '@mui/icons-material/Https';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ArticleIcon from '@mui/icons-material/Article';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import BusinessIcon from '@mui/icons-material/Business';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import BadgeIcon from '@mui/icons-material/Badge';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useSelector, useDispatch } from 'react-redux';
import { Actiontypes } from 'src/redux/constants/action.type';
import _ from 'underscore';

const MenuList = () => {
    const { FETCH_EMP_MENU_SLNO } = Actiontypes;
    const dispatch = useDispatch();

    //get module rights
    const modulerights = useSelector((state) => state?.getModuleRightList?.modulerightsList.map(ele => ele.menu_slno) || [], _.isEqual)

    const clickFunction = (slno) => {
        dispatch({ type: FETCH_EMP_MENU_SLNO, payload: slno })
    }


    const MenuItemList = [
        { color: '#ff8a80', name: 'My Profile', Icon: <AppRegistrationIcon />, funName: clickFunction, slno: 104 },
        { color: '#ea80fc', name: 'Personal Information', Icon: <PermContactCalendarIcon />, funName: clickFunction, slno: 105 },
        { color: '#8c9eff', name: 'Qualification', Icon: <CastForEducationIcon />, funName: clickFunction, slno: 106 },
        { color: '#80d8ff', name: 'Experience', Icon: <ArticleIcon />, funName: clickFunction, slno: 107 },
        { color: '#a7ffeb', name: 'Statutory Information', Icon: <LibraryBooksIcon />, funName: clickFunction, slno: 108 },
        // { color: '#ffccbc', name: 'Contract Information', Icon: <ContactPhoneIcon />, funName: clickFunction, slno: 109 },
        { color: '#c5e1a5', name: 'Company Information', Icon: <BusinessIcon />, funName: clickFunction, slno: 110 },
        { color: '#ea80fc', name: 'Earnings / Deduction', Icon: <AlignVerticalCenterIcon />, funName: clickFunction, slno: 111 },
        { color: '#80cbc4', name: 'Salary information', Icon: <AttachMoneyIcon />, funName: clickFunction, slno: 112 },
        { color: '#b39ddb', name: 'Leave Setting', Icon: <BadgeIcon />, funName: clickFunction, slno: 113 },
        { color: '#b2ebf2', name: 'Fine / Other Deduction', Icon: <AdminPanelSettingsIcon />, funName: clickFunction, slno: 114 },
        { color: '#9fa8da', name: 'Salary Increment Setting', Icon: <LegendToggleIcon />, funName: clickFunction, slno: 115 },
        { color: '#ffab91', name: 'Document Checklist', Icon: <ListAltIcon />, funName: clickFunction, slno: 116 },
        { color: '#e1bee7', name: 'Vaccination Information', Icon: <EnhancedEncryptionIcon />, funName: clickFunction, slno: 117 },
        { color: '#81d4fa', name: 'Training Information', Icon: <InsertChartIcon />, funName: clickFunction, slno: 118 },
        { color: '#c5e1a5', name: 'Job Description', Icon: <ArticleIcon />, funName: clickFunction, slno: 119 },
        { color: '#ffcc80', name: 'End Of Service', Icon: <HttpsIcon />, funName: clickFunction, slno: 120 },
    ]

    const newMenu = MenuItemList.filter(val => modulerights.includes(val.slno) === true ? val.slno : null);

    return (
        <Box sx={{
            display: 'flex',
            pt: 1,
            flexDirection: 'column',
            width: '100%',
            height: { xxl: 520, xl: 375, lg: 230, md: 200, sm: 100, xs: 100 }
        }} >
            <CssVarsProvider>
                <Box sx={{ overflowY: "auto", paddingY: 0, '::-webkit-scrollbar': { display: "none" } }} >
                    {
                        newMenu.map((val, index) => {
                            const { slno, name, funName, Icon } = val;
                            // console.log(slno)
                            return <Box key={index} sx={{ py: 0.2 }} >
                                <Chip
                                    variant="outlined"
                                    // color="danger"
                                    onClick={() => funName(slno)}
                                    startDecorator={Icon}
                                    endDecorator={<KeyboardArrowRight />}
                                    sx={{ display: 'flex', flex: 1, color: 'green' }}
                                    size="md"
                                >{name}</Chip>
                            </Box>
                        })
                    }
                </Box>
            </CssVarsProvider>
            {/* </Paper> */}
        </Box>
    )
}

export default MenuList