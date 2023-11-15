import React, { Fragment, useEffect, useState, memo } from 'react'
import { TextField } from '@material-ui/core'

const LeaveCarryTextFeild = ({ setedit, edit, count, name, dis, lcmast }) => {
    const [newedit, setNewedit] = useState(count)
    useEffect(() => {
        setedit({ ...edit, [name]: count })
    }, [count, edit, name, setedit])

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
                    disabled={(lcmast.el === 1 && name === 'EL') || (lcmast.sl === 1 && name === 'SL')
                        || (lcmast.cl === 1 && name === 'CL') || (lcmast.hl === 1 && name === 'HL') ? false : true}
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

export default memo(LeaveCarryTextFeild)