import React from 'react'
import Employeedetails from '../CommonCode/Employeedetails'
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';
import { FormControlLabel, Stack } from '@mui/material';
import DigitalCLock from './Components/DigitalCLock';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Home = () => {

    const login = useSelector((state) => {
        // console.log(state)
    })

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <AppBar position="static" color="inherit" >
            <Container maxWidth="false">
                <Toolbar disableGutters>

                    <Stack spacing={2} direction="row">



                        <FormControlLabel
                            sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: 150 }}
                            control={
                                <IconButton  >
                                    <Badge badgeContent={1} variant='standard' color='error'
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                color: "white",
                                                backgroundColor: "#EF5350",
                                                boxShadow: "0 0 8px 2px lightblue",
                                            }
                                        }}
                                    >
                                        <MailIcon color="primary" />
                                    </Badge>
                                </IconButton>
                            }
                            label="Overtime "
                            labelPlacement='end'
                            disableTypography={true}
                        />
                        <FormControlLabel
                            sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: 150 }}
                            control={
                                <IconButton  >
                                    <Badge badgeContent={10} variant='standard' color='error'
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                color: "white",
                                                backgroundColor: "#EF5350",
                                                boxShadow: "0 0 8px 2px lightblue",
                                            }
                                        }}
                                    >
                                        <MailIcon color="primary" />
                                    </Badge>
                                </IconButton>
                            }
                            label="Resignation"
                            labelPlacement='end'
                            disableTypography={true}
                        />

                        <FormControlLabel
                            sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: 150 }}
                            control={
                                <IconButton  >
                                    <Badge badgeContent={10} variant='standard' color='error'
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                color: "white",
                                                backgroundColor: "#EF5350",
                                                boxShadow: "0 0 8px 2px lightblue",
                                            }
                                        }}
                                    >
                                        <MailIcon color="primary" />
                                    </Badge>
                                </IconButton>
                            }
                            label="Alert"
                            labelPlacement='end'
                            disableTypography={true}
                        />

                        <FormControlLabel
                            sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: 150 }}
                            control={
                                <IconButton  >
                                    <Badge badgeContent={10} variant='standard' color='error'
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                color: "white",
                                                backgroundColor: "#EF5350",
                                                boxShadow: "0 0 8px 2px lightblue",
                                            }
                                        }}
                                    >
                                        <MailIcon color="primary" />
                                    </Badge>
                                </IconButton>
                            }
                            label="Notification"
                            labelPlacement='end'
                            disableTypography={true}
                        />

                        <FormControlLabel
                            sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: 150 }}
                            control={
                                <IconButton  >
                                    <Badge badgeContent={10} variant='standard' color='error'
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                color: "white",
                                                backgroundColor: "#EF5350",
                                                boxShadow: "0 0 8px 2px lightblue",
                                            }
                                        }}
                                    >
                                        <MailIcon color="primary" />
                                    </Badge>
                                </IconButton>
                            }
                            label="Messages"
                            labelPlacement='end'
                            disableTypography={true}
                        />

                    </Stack>
                    {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        LOGO
                    </Typography> */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu> */}
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {/* <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip> */}

                        <DigitalCLock />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Home
