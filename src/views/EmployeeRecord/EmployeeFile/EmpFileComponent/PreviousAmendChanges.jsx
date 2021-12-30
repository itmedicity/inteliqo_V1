import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const PreviousAmendChanges = ({ emp_id, amendStatus }) => {
    //use State For last Wage
    const [lastWage, setlastWage] = useState([])
    useEffect(() => {
        //get last changed salary detl
        const getLastWages = async () => {
            const result = await axioslogin.get(`/common/getlastwage/${emp_id}`)
            const { success, data } = result.data
            if (success === 1) {
                setlastWage(data)
            }
            else if (success === 0) {
                amendStatus(1)
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getLastWages()
    }, [emp_id, amendStatus])
    const lastwagedetl = useMemo(() => lastWage, [lastWage]);
    return (
        <Fragment>
            <ul className="list-group list-group-flush ">
                {
                    lastwagedetl.map((val) => {
                        return <li className="list-group-item py-0" key={val.wagelog_slno}>
                            <div className="d-md-flex d-sm-flex justify-content-between " >
                                <div className="col-md-6 text-start" >{val.earnded_name}</div>
                                <div className="col-md-4 text-start">{val.changed_date}</div>
                                <div className="col-md-2 text-end">{val.new_change}</div>
                            </div>
                        </li>;
                    })
                }
            </ul>
        </Fragment>
    )
}

export default memo(PreviousAmendChanges) 
