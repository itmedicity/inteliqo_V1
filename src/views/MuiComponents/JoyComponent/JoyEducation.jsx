import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useMemo, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setEducation } from 'src/redux/actions/Education.Action';
import _ from 'underscore';

const JoyEducation = ({ value, setValue, setSectName }) => {
    const dispatch = useDispatch()
    // const [flag, setFlag] = useState(0)

    useEffect(() => dispatch(setEducation()), [dispatch])

    const empEducation = useSelector((state) => state.getEmployeeEducation.EducationList, _.isEqual)
    const educationList = useMemo(() => empEducation, [empEducation]);
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
        >
            <Option disabled value={0}>  Select Qualification </Option>
            {
                educationList?.map((val, index) => {
                    return <Option key={index} value={val.edu_slno}>{val.edu_desc}</Option>
                })
            }
        </Select>
    )

}

export default memo(JoyEducation)