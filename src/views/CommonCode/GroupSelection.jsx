import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'

const GroupSelection = () => {
    const [groupName, setGroupName] = useState([])
    const { selectGroupName, updateGroupNameList } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getGroupNameList = async () => {
            const result = await axioslogin.get('/usergroup/select')
            const { data, success } = result.data
            if (success === 1) {
                setGroupName(data)
            }
        }
        getGroupNameList()
        return (
            updateGroupNameList(0)
        )
    }, [updateGroupNameList])

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectGroupName"
                    value={selectGroupName}
                    onChange={(e) => updateGroupNameList(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-2"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Select Group Name
                    </MenuItem>
                    {
                        groupName && groupName.map((val, index) => {
                            return <MenuItem key={index} value={val.user_grp_slno}>{val.user_group_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default GroupSelection
