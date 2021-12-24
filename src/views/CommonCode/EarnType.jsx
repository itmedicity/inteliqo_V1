import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { useContext, useEffect, useState, Fragment } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';

const EarnType = (props) => {
    // intializing use state
    const [earntypeData, setEarnType] = useState([]);
    // // useContext
    const { earntypeDatacontext, setEarnTypecontext } = useContext(PayrolMasterContext)
    // useeffect 
    useEffect(() => {
        const getemptypedata = async () => {
            const result = await axioslogin.get('/Earntype')
            const { success, data } = result.data;
            if (success === 1) {
                setEarnType(data)
            }
        }
        getemptypedata()
        return (
            setEarnTypecontext(0)
        )


    }, [setEarnTypecontext]);


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
                    name="selectedEarntype"
                    value={earntypeDatacontext}
                    onChange={(e) => setEarnTypecontext(e.target.value)}
                    fullWidth
                    variant="outlined"
                    className="ml-0"
                    defaultValue={0}
                    style={props.style}
                >
                    <MenuItem value='0' disabled>
                        Earn Type
                    </MenuItem>
                    {
                        earntypeData && earntypeData.map((val, index) => {
                            return <MenuItem key={index} value={val.erning_type_id}>{val.earning_type_name}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
        </Fragment>
    )
}

export default EarnType
