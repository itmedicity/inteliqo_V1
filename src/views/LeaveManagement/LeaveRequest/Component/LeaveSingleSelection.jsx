
import React, { Fragment, useState } from 'react';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import LeaveTypeCommon from './LeaveTypeCommon';

const LeaveSingleSelection = ({ leavdaystype, formData, setCasualLevee, em_id }) => {
    const { startDate } = formData
    const [sgleLeaveType, setSgleLeaveType] = useState(0)
    const handleSingleLeave = async ({ target: { value }, nativeEvent }) => {
        setSgleLeaveType(value)
        const data1 = {
            em_id: em_id,
            value: value
        }
        const result = await axioslogin.post('/yearleaveprocess/allowablcommon/allowableconleave/data/', data1)
        const { success, data } = result.data
        if (success === 1) {
            if (data[0].cmn_lv_balance > 0) {
                setCasualLevee((casualLeve) => [...casualLeve, {
                    caulmnth: data[0].hrm_lv_cmn,
                    levtypename: value === 2 ? 'Maternity Leave' : value === 5 ?
                        "LOP" : value === 6 ? "ESI" : value === 7 ? "SICK LEAVE" : value === 9 ? "DAY OFF" : value === 10 ? "WORK  OFF" : 'CONFERRANCE LEAVE',
                    lveDate: format(new Date(startDate), "yyyy-MM-dd"),
                    lveType: value,
                    leave: nativeEvent.target.innerText,
                    noofdays: leavdaystype
                }])
            } else {
                warningNofity("There Is No Leave Left For This Employee")
            }
        }
        else if (success === 2) {
            warningNofity("There Is No Holiday Left For This Employee")
        }
        else {
            errorNofity("Error Occured!!!!Please Contact EDP")
        }
    }
    return (
        <Fragment>
            <div className="col-md-3">
                <LeaveTypeCommon
                    style={SELECT_CMP_STYLE}
                    name="type" select="Leave Request Type"
                    onChange={handleSingleLeave}
                    em_id={em_id}
                    leavetype={sgleLeaveType}
                />
            </div>

        </Fragment>
    )
}

export default LeaveSingleSelection
