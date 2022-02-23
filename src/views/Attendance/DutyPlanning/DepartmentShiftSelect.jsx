import React, { Fragment, useContext, useEffect, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';

const DepartmentShiftSelect = ({ index, data, setDutyPlan, planArray, changeColor, 
    //selectedDept, selectDeptSection 
}) => {
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
    const { selectDeptSection, selectedDept,
    } = useContext(PayrolMasterContext);
    //postData
    const postData = {
        dept_id: selectedDept,
        sect_id: selectDeptSection
    }
    useEffect(() => {
        const getdepartmentShift = async () => {
            if (selectedDept !== 0 && selectDeptSection !== 0) {
                const result = await axioslogin.post('/departmentshift/shift', postData)
                const { success, data, message } = await result.data;
                if (success === 1) {
                    const { shft_code } = data[0]
                    const obj = JSON.parse(shft_code)
                    setDepartmentShiftSelect(obj);
                }
                if (success === 0) {
                    setDepartmentShiftSelect(0)
                }
            }
        }
        getdepartmentShift()
    }, [])
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

export default DepartmentShiftSelect
