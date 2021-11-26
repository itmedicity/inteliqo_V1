import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'

const ModuleNameSelection = () => {
    const [moduleName, setModuleName] = useState([])
    const { selectModuleNameList, updateSelectedModuleList } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getModuleNameList = async () => {
            const result = await axioslogin.get('/common/getModuleName');
            const { data, success } = result.data;
            if (success === 1) {
                setModuleName(data)
            }
        }
        getModuleNameList()
        return (
            updateSelectedModuleList(0)
        )
    }, [updateSelectedModuleList])

    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
                className="mt-1"
            >
                <Select
                    name="selectModuleNameList"
                    value={selectModuleNameList}
                    onChange={(e) => updateSelectedModuleList(e.target.value)}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                >
                    <MenuItem value="0" disabled >
                        Select Module Name
                    </MenuItem>
                    {
                        moduleName && moduleName.map((val, index) => {
                            return <MenuItem key={index} value={val.module_slno}>{val.module_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default ModuleNameSelection
