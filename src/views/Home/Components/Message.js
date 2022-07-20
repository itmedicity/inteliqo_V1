import { Badge, FormControlLabel, IconButton } from '@mui/material'
import React, { Fragment, useState } from 'react'
import MailIcon from '@mui/icons-material/Mail';
import MessageComponent from 'src/components/profileComponent/MessageComponent';

const Message = () => {
    const [anchorElMessage, setAnchorElMessage] = React.useState(null);
    const [msgcount, setmsgcount] = useState(0)
    const openMessage = Boolean(anchorElMessage);

    const handleMessageClick = (event) => {
        setAnchorElMessage(event.currentTarget);
    };
    const handleMessageClose = () => {
        setAnchorElMessage(null);
    };

    return (
        <Fragment>
            <FormControlLabel
                sx={{ color: '#1976D2', fontSize: 15, fontWeight: "bold", width: '100%' }}
                control={
                    <IconButton
                        id="basic-button"
                        aria-controls={openMessage ? 'message-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMessage ? 'true' : undefined}
                        onClick={handleMessageClick}
                    >
                        <Badge badgeContent={msgcount} variant='standard' color='error'
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
                // label="Messages"
                labelPlacement='end'
                disableTypography={true}
            />
            <MessageComponent anchorEl={anchorElMessage} open={openMessage} handleClose={handleMessageClose} setmsgcount={setmsgcount} />
        </Fragment>
    )
}

export default Message