import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { Fragment, memo } from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const SalaryDetlEmp = ({ data }) => {
    const { earnded_name, em_amount } = data
    return (
        <Fragment>
            <ListItem alignItems="flex-start" className='py-1' >
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#7986cb', fontSize: 20 }} >
                        <MonetizationOnIcon sx={{ color: 'white', fontSize: 20 }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="caption"
                                color="text.primary"
                            >
                                {earnded_name}
                            </Typography>
                        </Fragment>
                    }
                />
                {/* <ListSubheader>2019</ListSubheader> */}
                <ListItemText sx={{ textAlignLast: "right" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="subtitle1"
                                color="text.primary"
                            >{em_amount}
                            </Typography>
                        </Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </Fragment>
    )
}

export default memo(SalaryDetlEmp)