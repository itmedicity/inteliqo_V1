import { Option, Select } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const JoyBoardSelection = ({ value, setValue, education, boarddisable, setSectName }) => {

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
    const handleOnChange = (event, newValue) => {
        if (newValue === null) {
            setSectName('');
        } else {
            setValue(newValue);
            setSectName(event.target.innerText);
        }
    };
    return (
        <Select
            value={value}
            // onChange={(event, newValue) => {
            //     setSectName(event.target.innerText === null ? event.target.innerText : event.target.innerText)
            //     Onclick(newValue);
            // }}
            onChange={handleOnChange}

            size='md'
            variant='outlined'
            disabled={boarddisable}

        >
            <Option disabled value={0}>  Select Board </Option>
            {
                data?.map((val, index) => {
                    return <Option key={index} value={val.board_slno}>{val.board_name}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoyBoardSelection)