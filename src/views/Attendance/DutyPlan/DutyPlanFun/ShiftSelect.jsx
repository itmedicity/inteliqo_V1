import { Box } from '@mui/system';
import React, { useState } from 'react'
import { memo } from 'react';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const ShiftSelect = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <select style={{ width: '100%' }} >
            <option disabled >Select</option>
            <option>Mon 9 am- 5 pm</option>
            <option>Mon 9 am-  dgdfgfd</option>
            <option>Mon 9 am- 5 pm dgdfg sfsdfsdfsdf</option>
        </select>
    )
}

export default memo(ShiftSelect)