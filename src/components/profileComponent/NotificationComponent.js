import { Avatar, Divider, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSelector } from 'react-redux';
import moment from 'moment';
import AlertComponent from './AlertComponent';

const NotificationContent = ({ handleClose, alerts }) => {
    const [open, setOpen] = useState(false);
    const [alertmsg, setAlertmsg] = useState('')
    const openMessage = async () => {
        setOpen(true)
        setAlertmsg(alerts.alert)
    }
    const handleClosee = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <AlertComponent open={open} handleClosee={handleClosee} alertmsg={alertmsg} />
            <MenuItem onClick={openMessage}  >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#ff9800" }} >
                        <NotificationsNoneIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={moment(alerts.create_date).format('DD-MM-YYYY')}
                    primaryTypographyProps={{ variant: "caption" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Hr Department
                            </Typography>
                            --{alerts.alert}
                        </Fragment>
                    }
                    secondaryTypographyProps={{ noWrap: true }}
                />
            </MenuItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}


const NotificationComponent = ({ anchorEl, open, handleClose, setalertcount }) => {
    const [alert, setAlert] = useState([])
    const [empDetl, setEmpdetl] = useState([])
    const alertlist = useSelector((state) => {
        return state.getAlertList.alertList

    })
    const empdetails = useSelector((state) => {
        return state.getProfileData.ProfileData
    })
    useEffect(() => {
        if (Object.keys(alertlist).length > 0) {
            setAlert(alertlist)
        }
        if (Object.keys(empdetails).length > 0) {
            setEmpdetl(empdetails)
        }

    }, [alertlist, empdetails,])

    const alerts = empDetl.map((value) => {
        return alert.filter((val) => {
            return (val.alert_branch === 1 && val.alert_department === 0 && val.aler_deptsec === 0 && val.designation === 0 && val.emp_category === 0) && (val.alert_expr_date >= moment(new Date()).format('YYYY-MM-DD 00:00:00')) ||

                ((val.alert_branch !== 0 && val.alert_department !== 0 && val.aler_deptsec === 0 && val.designation === 0 && val.emp_category === 0)
                    && (val.alert_department === value.em_department) && (val.alert_expr_date >= moment(new Date()).format('YYYY-MM-DD 00:00:00'))) ||

                ((val.alert_branch !== 0 && val.alert_department === 0 && val.aler_deptsec === 0 &&
                    val.designation !== 0 && val.emp_category === 0) && (val.designation === value.em_designation) && (val.alert_expr_date >= moment(new Date()).format('YYYY-MM-DD 00:00:00'))) ||

                ((val.alert_branch !== 0 && val.alert_department === 0 && val.aler_deptsec === 0 &&
                    val.designation === 0 && val.emp_category !== 0) && (val.emp_category === value.em_category) && (val.alert_expr_date >= moment(new Date()).format('YYYY-MM-DD 00:00:00'))) ||

                ((val.alert_branch !== 0 && val.alert_department !== 0 && val.aler_deptsec !== 0
                    && val.designation === 0 && val.emp_category === 0) && ((val.alert_department === value.em_department)
                        && (val.aler_deptsec === value.em_dept_section)) && (val.alert_expr_date >= moment(new Date()).format('YYYY-MM-DD 00:00:00'))) ||

                ((val.alert_branch !== 0 && val.alert_department !== 0 && val.aler_deptsec !== 0 &&
                    val.designation !== 0 && val.emp_category === 0) && ((val.alert_department === value.em_department)
                        && (val.aler_deptsec === value.em_dept_section) && (val.designation === value.em_designation)) && (val.alert_expr_date >= moment(new Date()).format('YYYY-MM-DD 00:00:00'))) ||

                ((val.alert_branch !== 0 && val.alert_department !== 0 && val.aler_deptsec !== 0 &&
                    val.designation !== 0 && val.emp_category !== 0) && ((val.alert_department === value.em_department)
                        && (val.aler_deptsec === value.em_dept_section) && (val.designation === value.em_designation) && (val.emp_category === value.em_category) && (val.alert_expr_date >= moment(new Date()).format('YYYY-MM-DD 00:00:00'))) ||

                    ((val.alert_branch !== 0 && val.alert_department !== 0 && val.aler_deptsec !== 0 &&
                        val.designation === 0 && val.emp_category !== 0) && ((val.alert_department === value.em_department)
                            && (val.aler_deptsec === value.em_dept_section) && (val.emp_category === value.em_category)) && (val.alert_expr_date >= moment(new Date()).format('YYYY-MM-DD 00:00:00')))
                )
        })
    })
    useEffect(() => {
        if (alerts[0] !== undefined) {
            setalertcount(alerts[0].length)
        }
    }, [alerts, setalertcount])
    return (
        <Fragment>
            <Menu
                id="notification-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ width: '100%', maxWidth: 500, }}
            >
                {
                    alerts[0] && alerts[0].map((val) => {
                        return <NotificationContent key={val.alert_slno} alerts={val} handleClose={handleClose} />
                    })
                }
            </Menu>
        </Fragment>
    )
}

export default memo(NotificationComponent) 