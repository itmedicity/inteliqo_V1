import { Chip } from '@mui/material'
import React, { Fragment } from 'react'
import Clock from 'react-digital-clock'
import './CmpStyle.scss'

const DigitalCLock = () => {
    return (
        <Fragment>
            {/* <div className='time' >
                <Clock />
            </div> */}
            <Chip
                className='time'
                sx={{
                    backgroundColor: '#90CAF9'
                }}
                label={
                    <>
                        <Clock />
                    </>
                }
            />
            {/* <p className="date">asdas</p> */}
            {/* <p className="time" style={{ color: "black" }} > */}

            {/* </p> */}


        </Fragment>
    )
}

export default DigitalCLock