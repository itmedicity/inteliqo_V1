import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const EarnedWages = ({ emno, sumoferanedwages, earningstatus }) => {
    //use State For Earnings
    const [Earnings, setEarnings] = useState([])
    useEffect(() => {
        const getFixedEarnings = async () => {
            const result = await axioslogin.get(`/common/getfixedearnings/${emno}`)
            const { success, data } = result.data
            if (success === 1) {
                setEarnings(data)
                const earningsum = data.map((val) => val.em_amount).reduce((sum, val) => sum + val, 0)
                sumoferanedwages(earningsum)
            }
            else if (success === 0) {
                earningstatus(1)
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixedEarnings()
    }, [emno, sumoferanedwages])
    //earning 
    const earnsalary = useMemo(() => Earnings, [Earnings]);
    return (
        <Fragment>
            <ul className="list-group list-group-flush">
                {
                    earnsalary.map((val) => {
                        return <li className="list-group-item py-0" key={val.ernded_slno}>
                            <div className="d-flex justify-content-between"  >
                                <div>{val.earnded_name}</div>
                                <div>{val.em_amount}</div>
                            </div>
                        </li>;
                    })
                }
            </ul>
        </Fragment>
    )
}

export default memo(EarnedWages) 
