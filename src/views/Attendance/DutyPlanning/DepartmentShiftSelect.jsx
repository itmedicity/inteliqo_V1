
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const DepartmentShiftSelect = ({ index, data, setDutyPlan, planArray, changeColor }) => {
    const { plan_slno, shift_id } = data;
    const [shft, setShift] = useState(shift_id)
    const handleChange = (e) => {
        // const planDate = moment(duty_day).format('YYYY-MM-DD');
        const shiftId = e.target.value;
        const planSlno = plan_slno;
        const newShift = { shiftSlno: planSlno, shiftId: shiftId }
        setShift(shiftId)
        const sortPlan = planArray.filter((val) => {
            return val.shiftSlno !== planSlno
        })
        setDutyPlan([...sortPlan, newShift])
        changeColor(1)
    }
    const [DepartmentShift, setDepartmentShiftSelect] = useState([]);
    //getting the department shift from store   
    const departmentShiftt = useSelector((state) => {
        return state.getDepartmentShiftData.deptShiftData;
    })
    useEffect(() => {
        if (Object.keys(departmentShiftt).length > 0) {
            setDepartmentShiftSelect(departmentShiftt)
        }

    }, [departmentShiftt])
    return (
        <Fragment>
            <select className="custom-select"
                onChange={(e) => { handleChange(e) }}
                value={shft}
            >
                <option defaultValue="0">Choose...</option>
                {
                    DepartmentShift && DepartmentShift.map((val, index) => {
                        return <option key={index} value={val.shiftcode}>{val.shiftDescription}</option>
                    })
                }
            </select>
        </Fragment>
    )
}


export default memo(DepartmentShiftSelect)

