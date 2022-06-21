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
        //console.log(state);
        return state.getEmployeeBloodgrp.empBlood
    })

    return (
        <Fragment>

            {
                empBloodgrp && empBloodgrp.map((val, index) => {
                    return <CustomCheckBox
                        key={index}
                        name={"sdsd"}
                        color="secondary"
                        value={false}
                        label="AAAA"
                        // onChange={}
                        style={{}}
                    />
                })
            }

            {/* <FormControl
                fullWidth
                margin="dense"
                className="mt-1 mb-2"
            >
                {
                    empBloodgrp && empBloodgrp.map((val) => {
                        return <div className="pt-0" key={val.group_slno}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name={val.group_name}
                                        color="secondary"
                                        value={val.group_slno}
                                        onChange={(e) => onChange(e)}
                                    />

                                }
                                label={val.group_name}>

                            </FormControlLabel>
                        </div>
                    })
                }
            </FormControl> */}
        </Fragment >
    )
}

export default BloodgrpSelect
