import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const BankBranchselection = ({ setValue, value }) => {
    const [banckbranch, setbankBranch] = useState([])
    useEffect(() => {
        const getBankMaster = async () => {
            const result = await axioslogin.get('/bank')
            const { success, data } = result.data
            if (success === 1) {
                setbankBranch(data);
            } else {
                setbankBranch([])
            }
        }
        getBankMaster()
    }, [])
    return (
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            sx={{ width: '100%' }}
        >
            <Option disabled value={0}>Select Bank Branch</Option>
            {
                banckbranch?.map((val, index) => {
                    return <Option key={index} value={val.bank_slno}>{val.bank_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(BankBranchselection) 