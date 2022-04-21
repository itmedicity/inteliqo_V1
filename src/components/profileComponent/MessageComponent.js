import { Avatar, Divider, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import MessageIcon from '@mui/icons-material/Message';
import { useSelector } from 'react-redux';
import moment from 'moment'
import MessageComponents from './MessageComponents';

const MessageContent = ({ msgs, handleClose }) => {
    const [open, setOpen] = useState(false);
    const [msglist, setmsglist] = useState('')
    const openMessage = async () => {
        setOpen(true)
        setmsglist(msgs.message)
    }
    const handleClosee = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <MessageComponents open={open} handleClosee={handleClosee} msglist={msglist} />
            <MenuItem onClick={openMessage}  >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#66bb6a" }} >
                        <MessageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={moment(msgs.created_date).format('DD-MM-YYYY')}
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
                            ---{msgs.message}
                        </Fragment>
                    }
                    secondaryTypographyProps={{ noWrap: true }}
                />
            </MenuItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}



const MessageComponent = ({ anchorEl, open, handleClose, setmsgcount }) => {
    const [Msg, setMsg] = useState([])
    const msglist = useSelector((state) => {
        return state.getMsgList.MessageList

    })
    useEffect(() => {
        if (Object.keys(msglist).length > 0) {
            setMsg(msglist)
        }
        if (msglist.length !== 0) {
            setmsgcount(msglist.length)
        }
    }, [msglist, setmsgcount])

    return (
        <Fragment>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ width: '100%', maxWidth: 500, }}
            >
                {
                    Msg && Msg.map((val) => {
                        return <MessageContent key={val.message_slno} msgs={val} handleClose={handleClose} />
                    })
                }
            </Menu>
        </Fragment>
    )
}

export default memo(MessageComponent) 