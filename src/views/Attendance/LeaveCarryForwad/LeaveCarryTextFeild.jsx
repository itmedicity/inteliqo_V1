import React, { Fragment, useEffect, useState } from 'react'
import { TextField } from '@material-ui/core'

const LeaveCarryTextFeild = ({ setedit, edit, count, name }) => {
    const [newedit, setNewedit] = useState(count)
    useEffect(() => {
        setedit({ ...edit, [name]: count })
    }, [])

    const settingvalues = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setedit({ ...edit, [e.target.name]: value })
    }

    return (
        <Fragment>
            <div className="col-md-12">
                <TextField
                    label=""
                    width="20px"
                    height="1em"

                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    required
                    name={name}
                    value={newedit}
                    onChange={(e) => {
                        setNewedit(e.target.value)
                        settingvalues(e)
                    }}


                />
            </div>

        </Fragment>
    )
}

export default LeaveCarryTextFeild