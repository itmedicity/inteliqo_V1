import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSkills } from 'src/redux/actions/Skills.Action';
import _ from 'underscore';
import { Autocomplete } from '@mui/joy';

const JoySkill = ({ skillValue, getSkill, setSkillName, count, setskillCount }) => {
    const dispatch = useDispatch();
    const empSkill = useSelector((state) => state?.getSkillData?.SkillList, _.isEqual);
    const [skill, setSkill] = useState([{ skills_slno: 0, skill_name: 'Select Skill' }]);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (skillValue !== 0) {
            const selectedSkill = skill.find((e) => e.skills_slno === skillValue);
            setValue(selectedSkill || null);
            dispatch(setSkills(skillValue));
            setskillCount(0)
        } else {
            dispatch(setSkills(0));
            setValue(null);
            setskillCount(0)

        }
    }, [skillValue, skill, dispatch, count]);

    useEffect(() => {
        if (empSkill.length > 0) {
            setSkill(empSkill);
        }
    }, [empSkill]);

    const handleChange = (event, newValue) => {
        if (newValue) {
            setSkillName(newValue.skill_name);
            dispatch(setSkills(newValue.skills_slno));
            getSkill(newValue.skills_slno);
            setInputValue(''); // Clear inputValue when an option is selected
        } else {
            // When no option is selected, keep the input value
            setSkillName(inputValue);
            dispatch(setSkills(0));
            getSkill(0);
        }
    };

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        setSkillName(newInputValue); // Set skill name to the current input
    };

    return (
        <Autocomplete
            placeholder="Select Skill"
            value={value}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            freeSolo // Allow free text input
            isOptionEqualToValue={(option, value) => option.skill_name === value.skill_name}
            getOptionLabel={(option) => option.skill_name || ''}
            options={skill}
            sx={{ width: '100%' }}
        />
    );
};

export default memo(JoySkill);
