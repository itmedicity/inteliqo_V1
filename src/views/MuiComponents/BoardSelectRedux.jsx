import { Option, Select } from '@mui/joy';
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
        <Select
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            size='md'
            variant='outlined'
            disabled={boarddisable}
        >
            <Option disabled value={0}> Select Board</Option>
            {
                data?.map((val, index) => {
                    return <Option key={index} value={val.board_slno}>{val.board_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(BoardSelectRedux)