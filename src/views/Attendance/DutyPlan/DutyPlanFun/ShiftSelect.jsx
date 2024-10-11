import React, { useState } from 'react'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { Actiontypes } from 'src/redux/constants/action.type';

const ShiftSelect = ({ data, authStatus }) => {
    const dispatch = useDispatch();
    const [bgColor, setBgColor] = useState(0)
    const { FETCH_UPDATED_SHIFT_ID } = Actiontypes;

    //Common settings
    const commonState = useSelector((state) => state.getCommonSettings, _.isEqual);

    //useMemo
    const commonSettings = useMemo(() => commonState, [commonState]);
    const shiftData = useMemo(() => data, [data]);

    const { notapplicable_shift, default_shift, week_off_day, doff } = commonSettings;

    const [shift, setShift] = useState(default_shift);
    // console.log(shiftData)
    const { plan_slno,
        emp_id,
        shift_id,
        //duty_day,
        attendance_update_flag,
        doff_updation_flag,
        //holiday 
    } = shiftData;

    useEffect(() => {
        setShift(shift_id)
    }, [shift_id])

    const shiftChangeFun = (e) => {
        let changedShiftId = e.target.value;
        let offDay = e.target.value === week_off_day.toString() ? 1 : 0;
        setShift(changedShiftId);
        setBgColor(1)
        const newShiftObj = { plan_slno: plan_slno, shift_id: changedShiftId, em_id: emp_id, offday: offDay };
        dispatch({ type: FETCH_UPDATED_SHIFT_ID, payload: newShiftObj })
    }
    // setShift(shift_id)

    const departmentShiftt = useSelector((state) => state.getDepartmentShiftData.deptShiftData, _.isEqual);
    const deptShift = useMemo(() => departmentShiftt, [departmentShiftt]);

    useEffect(() => {
        return () => {
            dispatch({ type: FETCH_UPDATED_SHIFT_ID, payload: {} })
        }
    })


    return (
        <select
            style={{ width: '100%', backgroundColor: bgColor === 1 ? '#f3e5f5' : authStatus === 1 ? '#FF8B8B' : '' }}
            value={shift}
            onChange={(e) => shiftChangeFun(e)}
            disabled={attendance_update_flag === 1 || shift === notapplicable_shift || doff_updation_flag === 1 ? true : false}
        >
            <option disabled defaultValue={0} >Select...</option>
            {
                deptShift && deptShift.map((val, index) =>
                    <option
                        disabled={val.shiftcode === notapplicable_shift || val.shiftcode === default_shift || val.shiftcode === doff ? true : false}
                        key={index}
                        value={val.shiftcode}
                    >{val.shiftDescription}</option>
                )
            }
        </select>
    )
}

export default memo(ShiftSelect)