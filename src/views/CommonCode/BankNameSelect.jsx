import React, { Fragment, useEffect, useState, useContext } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import { axioslogin } from '../Axios/Axios'
import { warningNofity } from './Commonfunc'
import { PayrolMasterContext } from 'src/Context/MasterContext'

const BankNameSelect = () => {

    const [bankname, setBankName] = useState([])
    const { selectBank, updateBankName } = useContext(PayrolMasterContext)

    useEffect(() => {

        const getBankNames = async () => {
            const result = await axioslogin.get('/common/getBankName')
            const { success, data } = result.data
            if (success === 1) {
                setBankName(data)
            } else {
                warningNofity("Something went wrong, !! Contact EDP")
            }
        }
        getBankNames()
    }, [])

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-2"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectBank"
                    value={selectBank}
                    onChange={(e) => updateBankName(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Select Bank Names
                    </MenuItem>
                    {
                        bankname && bankname.map((val, index) => {
                            return <MenuItem key={index} value={val.bank_slno}>{val.bank_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default BankNameSelect
