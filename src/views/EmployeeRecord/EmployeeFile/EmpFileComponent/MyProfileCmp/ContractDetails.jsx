import { ListItem, ListItemText, Typography } from '@mui/material';
import React, { Fragment, memo } from 'react'


const ContractDetails = ({ ContractDetail }) => {
    const { em_cont_start, em_cont_end } = ContractDetail[0]
    return (
        < Fragment >
            <ListItem alignItems="flex-start" className='py-1' >
                <ListItemText
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                {'Contract Start Date'}      : {em_cont_start}
                            </Typography>

                        </Fragment>
                    }
                />

            </ListItem >
            <ListItem alignItems="flex-start" className='py-1' >
                <ListItemText
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >

                                {'Contract End Date'}   :  {em_cont_end}
                            </Typography>

                        </Fragment>
                    }
                />
            </ListItem>
            {/* <Divider variant="inset" component="li" /> */}
        </Fragment >
    )
}

export default memo(ContractDetails)
