import { Typography } from '@material-ui/core'
import { textAlign } from '@mui/system'
import React, { Fragment } from 'react'
import '../avathar.css'
const Avatharattndance = ({ color, data }) => {

    return (

        <Fragment>
            <div className={`avathar `} style={{ backgroundColor: color }}>
                <div className='text-center pt-2'>
                    <Typography variant="body2">{data}</Typography>
                </div>


            </div>
        </Fragment >
    )
}

export default Avatharattndance