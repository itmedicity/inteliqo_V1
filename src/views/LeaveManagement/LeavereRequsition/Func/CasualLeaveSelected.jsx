import React, { memo } from 'react'
import { useCallback } from 'react';
import Form from 'react-bootstrap/Form'
import { format } from 'date-fns/esm';

const CasualLeaveSelected = ({ handleChange, index, date, casualLeve, setCasualLeave }) => {

    //handle change casal leave 

    const changeCasualLeave = useCallback(async (event) => {

        const selectedValue = event.target.value;
        const casualLeave = {
            selectedLveSlno: selectedValue,
            lveTypeName: 'CASUAL LEAVE',
            lveDate: format(new Date(date), "yyyy-MM-dd"),
            leave: event.target.selectedOptions[0].label,
            leaveType: 0,
            index: index
        }

        const casualArray = casualLeve.map((val) => {
            if (parseInt(val.hrm_cl_slno) === parseInt(selectedValue)) {
                const obj = {
                    cl_bal_leave: val.cl_bal_leave,
                    cl_lv_mnth: val.cl_lv_mnth,
                    em_id: val.em_id,
                    em_no: val.em_no,
                    hl_lv_tkn_status: val.hl_lv_tkn_status,
                    hrm_cl_slno: val.hrm_cl_slno,
                    checkValue: 1
                }
                return obj
            } else {
                const obj = {
                    ...val
                }
                return obj
            }

        })
        setCasualLeave(casualArray)
        handleChange(null, casualLeave)
    }, [index, handleChange, date, casualLeve, setCasualLeave])

    return (
        <Form.Select
            onChange={(e) => changeCasualLeave(e)}
            defaultValue={0}
        >
            <option value={0} disabled  >Choose Casual Leave</option>
            {
                casualLeve?.map((val, index) => {
                    return <option
                        key={index}
                        value={val.hrm_cl_slno}
                        disabled={val.hl_lv_tkn_status === 1 || val.checkValue === 1 ? true : false}
                    >
                        {`${val.cl_lv_mnth} - ${val.cl_bal_leave}`}
                    </option>
                })
            }
        </Form.Select>
    )
}

export default memo(CasualLeaveSelected)