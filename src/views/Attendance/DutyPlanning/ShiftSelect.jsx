import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ShiftSelect = ({ SetShiftId }) => {
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
    const handleChange = (e) => {
        const shiftId = e.target.value;
        SetShiftId(shiftId)
    }
    return (
        <Fragment>
            <select className="custom-select"
                onChange={(e) => { handleChange(e) }}
            // value={shft}
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

export default ShiftSelect