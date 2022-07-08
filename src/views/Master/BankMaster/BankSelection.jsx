import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const BankSelection = ({ name, style, onChange, value }) => {
    const [Bank, setBank] = useState([])
    useEffect(() => {
        const getBankMaster = async () => {
            const result = await axioslogin.get('/bank/getbank/bankmaster')
            const { success, data } = result.data
            if (success === 1) {
                setBank(data)
            }
            else {
                setBank([])
            }
        }
        getBankMaster()
    }, [])
    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-0"
            >
                <Select
                    name={name}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={style}
                    value={value}
                >
                    <MenuItem value={0} >
                        Bank
                    </MenuItem>
                    {
                        Bank && Bank.map((val, index) => {
                            return <MenuItem key={index} value={val.bankmast_slno}>{val.bankmast_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default BankSelection