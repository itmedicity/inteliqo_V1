import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'

const ModuleSelection = () => {
    const [moduleGroupName, setModuleGroupName] = useState([])
    const { selectModuleGroup, updateSelectedModuleGroup } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getModuleNamelist = async () => {
            const result = await axioslogin.get('/modulegroup/select')
            const { success, data } = result.data;
            setModuleGroupName(data)
        }
        getModuleNamelist()
        return (
            updateSelectedModuleGroup(0)
        )
    }, [updateSelectedModuleGroup])

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
                    name="selectedDept"
                    value={selectModuleGroup}
                    onChange={(e) => updateSelectedModuleGroup(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-2"
                    defaultValue={0}
                >
                    <MenuItem value='0' disabled>
                        Select Module Group
                    </MenuItem>
                    {
                        moduleGroupName && moduleGroupName.map((val, index) => {
                            return <MenuItem key={index} value={val.mdgrp_slno}>{val.module_group_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(ModuleSelection)
