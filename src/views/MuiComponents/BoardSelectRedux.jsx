import { FormControl, MenuItem, Select } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const BoardSelectRedux = ({ value, setValue, education, boarddisable }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const getBoard = async () => {
            const result = await axioslogin.get(`/common/getBoard/${education}`);
            const { data, success } = await result.data;
            if (success === 1) {
                setData(data)
            } else {
                setData([])
            }
        }
        getBoard()
    }, [education]);
    return (
        <FormControl fullWidth
            size='small'   >
            <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                size="small"
                fullWidth
                variant='outlined'
                disabled={boarddisable}
            >
                <MenuItem value={0} >
                    Select Board
                </MenuItem>
                {
                    data && data.map((val, index) => {
                        return <MenuItem key={index} value={val.board_slno}>{val.board_name}  </MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}

export default memo(BoardSelectRedux)