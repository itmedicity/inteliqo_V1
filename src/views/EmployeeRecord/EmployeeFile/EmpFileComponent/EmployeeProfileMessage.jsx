import { Card, CardActionArea, CardContent } from '@mui/material'
import React, { Fragment } from 'react'

const EmployeeProfileMessage = () => {
    return (
        <Fragment>
            <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                <CardActionArea>
                    <CardContent className="d-flex flex-column justify-content-center  align-items-center" >
                    </CardContent>
                </CardActionArea>
            </Card>
        </Fragment>
    )
}

export default EmployeeProfileMessage
