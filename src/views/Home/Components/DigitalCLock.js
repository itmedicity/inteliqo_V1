import React, { Fragment } from 'react'
import Clock from 'react-live-clock';

const DigitalCLock = () => {
    return (
        <Fragment>
            <Clock
                format={'hh:mm:ss A'}
                style={{ fontSize: '1.5em' }}
                ticking={true}
            />
        </Fragment>
    )
}

export default DigitalCLock