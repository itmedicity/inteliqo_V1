import { FormControl, Checkbox, FormControlLabel } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { setBloodgrp } from 'src/redux/actions/Bloodgrp.Action';
import CustomCheckBox from 'src/views/Component/CustomCheckBox';

const BloodgrpSelect = ({ onChange }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setBloodgrp());
    }, [])
    //for glood group list
    const empBloodgrp = useSelector((state) => {
        return state.getEmployeeBloodgrp.empBlood
    })
    return (
        <Fragment>
            {
                empBloodgrp && empBloodgrp.map((val) => {
                    return <CustomCheckBox
                        key={val.group_slno}
                        name={val.group_name}
                        color="secondary"
                        value={val.group_slno}
                        label={val.group_name}
                        onChange={onChange}
                    // style={{ marginTop: '0rem', marginBottom: '0rem' }}
                    />
                })
            }
        </Fragment >
    )
}

export default BloodgrpSelect
