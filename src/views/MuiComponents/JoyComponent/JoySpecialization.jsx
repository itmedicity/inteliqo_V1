import { Option, Select } from '@mui/joy';
import React, { memo, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSpecialization } from 'src/redux/actions/Specilization.Action';
import _ from 'underscore';

const JoySpecialization = ({ value, setValue, course, specdisable, setSectName }) => {

    const dispatch = useDispatch()
    // const [flag, setFlag] = useState(0)

    useEffect(() => dispatch(setSpecialization()), [dispatch])

    const empSpecilization = useSelector((state) => state.getEmployeeSpeclization.SpecilizationList, _.isEqual)
    const specList = useMemo(() => empSpecilization, [empSpecilization]);

    const filterarr = specList?.filter(val => val.cour_slno === course)

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
            disabled={specdisable}

        >
            <Option disabled value={0}>  Select Specialization </Option>
            {
                filterarr?.map((val, index) => {
                    return <Option key={index} value={val.spec_slno}>{val.spec_desc}</Option>
                })
            }
        </Select>
    )
}

export default memo(JoySpecialization)