import React, { memo } from 'react'
import { Form } from 'react-bootstrap'
import { useCallback } from 'react';
import { format } from 'date-fns';

const EarnLeaveSelected = ({ handleChange, index, date, earnLeave, setEarnLeave }) => {

    // const [earnLeave, setEarnLeave] = useState([]);
    // //const [status, setStatus] = useState(false);

    // const earnLeaves = useSelector((state) => state.getCreditedEarnLeave, _.isEqual);
    // const earnLve = useMemo(() => earnLeaves, [earnLeaves]);

    // useEffect(() => {
    //     const { earnLeave } = earnLve;
    //     // apiStats && setStatus(true)
    //     setEarnLeave(earnLeave);
    // }, [earnLve])

    // useEffect(() => {
    //     return () => {
    //         setStatus(false)
    //     }
    // })

    // handle change earn leaves
    const changeEarnLeave = useCallback(async (event) => {

        const selectedValue = event.target.value;
        const earnLeaves = {
            selectedLveSlno: selectedValue,
            lveTypeName: 'EARN LEAVE',
            lveDate: format(new Date(date), "yyyy-MM-dd"),
            leave: event.target.selectedOptions[0].label,
            leaveType: 0,
            index: index
        }
        handleChange(null, earnLeaves)

        const earnArray = earnLeave.map((val) => {
            if (parseInt(val.hrm_ernlv_slno) === parseInt(selectedValue)) {
                const obj = {
                    ernlv_taken: val.ernlv_taken,
                    ernlv_mnth: val.ernlv_mnth,
                    em_id: val.em_id,
                    em_no: val.em_no,
                    hl_lv_tkn_status: val.hl_lv_tkn_status,
                    hrm_ernlv_slno: val.hrm_ernlv_slno,
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
        setEarnLeave(earnArray)

    }, [index, handleChange, earnLeave, setEarnLeave, date])

    return (
        <Form.Select
            onChange={(e) => changeEarnLeave(e)}
            defaultValue={0}
        >
            <option value={0} disabled  > Choose Earned Leaves</option>
            {
                earnLeave?.map((val, index) => {
                    return <option
                        key={index}
                        value={val.hrm_ernlv_slno}
                        disabled={val.hl_lv_tkn_status === 1 || val.checkValue === 1 ? true : false}
                    >
                        {val.ernlv_mnth}
                    </option>
                })
            }
        </Form.Select>
    )
}

export default memo(EarnLeaveSelected)