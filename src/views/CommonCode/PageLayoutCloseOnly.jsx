import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from '../Axios/SessionCheck'
import FooterCloseOnly from './FooterCloseOnly'
import CustomHeaderCmpOnly from '../Component/MuiCustomComponent/CustomHeaderCmpOnly'
import { memo } from 'react'
import { Card, CardActions, CardContent } from '@mui/material'

const PageLayoutCloseOnly = (props) => {
    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <Card>
                <CustomHeaderCmpOnly title={props.heading} displayClose={true} />
                <CardContent sx={{ p: 0.8 }} >
                    {props.children}
                </CardContent>
                <CardActions
                    disableSpacing={true}
                    sx={{ backgroundColor: '#F7F7F8' }}
                >
                    <FooterCloseOnly
                        redirect={props.redirect}
                    />
                </CardActions>
            </Card>
        </Fragment>
    )
}

export default memo(PageLayoutCloseOnly) 
