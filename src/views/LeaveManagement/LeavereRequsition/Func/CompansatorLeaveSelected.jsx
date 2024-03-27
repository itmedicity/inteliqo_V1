import { format } from 'date-fns';
import React, { memo } from 'react'
import { useCallback } from 'react';
import { Form } from 'react-bootstrap'

const CompansatorLeaveSelected = ({ handleChange, index, date, coff, setCoff }) => {

    // const [coff, setCoff] = useState([]);
    // // const [status, setStatus] = useState(false);

    // const copansatoryOff = useSelector((state) => state?.getEmpCoffData, _.isEqual);

    // const compOff = useMemo(() => copansatoryOff, [copansatoryOff]);


    // useEffect(() => {
    //     const {
    //         coffData } = compOff;
    //     //apiStats && setStatus(true)
    //     setCoff(coffData);
    // }, [compOff])

    // useEffect(() => {
    //     return () => {
    //         setStatus(false)
    //     }
    // })

    //handle change compansatory off
    const changeConpansatoryLeave = useCallback(async (event) => {
        const selectedValue = event.target.value;
        const copansatoryLeave = {
            selectedLveSlno: selectedValue,
            lveTypeName: 'COMPENSATORY OFF',
            lveDate: format(new Date(date), "yyyy-MM-dd"),
            leave: event.target.selectedOptions[0].label,
            leaveType: 0,
            index: index
        }
        handleChange(null, copansatoryLeave)

        const coffArray = coff.map((val) => {
            if (parseInt(val.hrm_calc_holiday) === parseInt(selectedValue)) {
                const obj = {
                    taken: val.taken,
                    calculated_date: val.calculated_date,
                    em_id: val.em_id,
                    em_no: val.em_no,
                    hl_lv_tkn_status: val.hl_lv_tkn_status,
                    hrm_calc_holiday: val.hrm_calc_holiday,
                    specail_remark: val.specail_remark,
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
        setCoff(coffArray)
    }, [handleChange, index, date, coff, setCoff])

    return (
        <Form.Select
            onChange={(e) => changeConpansatoryLeave(e)}
            defaultValue={0}
        >
            <option value={0} disabled  >Choose C-OFF</option>
            {
                coff?.map((val, index) => {
                    return <option
                        key={index}
                        value={val.hrm_calc_holiday}
                        disabled={val.hl_lv_tkn_status === 1 || val.checkValue === 1 ? true : false}
                    >
                        {`C off -${val.calculated_date} ${val.specail_remark} `}
                    </option>
                })
            }
        </Form.Select>
    )
}

export default memo(CompansatorLeaveSelected)