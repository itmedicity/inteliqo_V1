import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { memo } from 'react';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';
import { infoNofity } from './Commonfunc';

const Salutation = (props) => {
    const [saltation, setSalutation] = useState([]);
    const { selectSalutation, updateSalutSelected } = useContext(PayrolMasterContext);
    useEffect(() => {
        const getSaluation = async () => {
            const result = await axioslogin.get('/common/getSalutation');
            const { success, data, message } = await result.data;
            if (success === 1) {
                setSalutation(data);
            } else {
                infoNofity(message);
            }
        }
        getSaluation();
        return (
            updateSalutSelected(0)
        )
    }, [updateSalutSelected]);
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
                    name="selectedSalutation"
                    value={selectSalutation}
                    onChange={(e) => updateSalutSelected(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    defaultValue={0}
                    style={props.style}
                // style={{ height: '2rem' }}
                // style={{ margin: 0.1, }}
                >
                    <MenuItem value='0' disabled>
                        Salutation
                    </MenuItem>
                    {
                        saltation && saltation.map((val, index) => {
                            return <MenuItem key={index} value={val.sa_code}>{val.sal_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(Salutation)
