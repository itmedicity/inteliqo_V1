import { Menu, MenuItem } from '@mui/material'
import React, { Fragment } from 'react'

const MessageComponent = ({ anchorEl, open, handleClose }) => {
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
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </Fragment>
    )
}

export default MessageComponent