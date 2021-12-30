import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const DeductedWages = ({ emno, sumofdeductsalary, deductstatus }) => {
    //use State For Deduction
    const [Deduction, setDeduction] = useState([])
    useEffect(() => {
        const getFixeddeduction = async () => {
            const result = await axioslogin.get(`/common/getfixeddeduction/${emno}`)
            const { success, data } = result.data
            if (success === 1) {
                setDeduction(data)
                const sumofdeduction = data.map((val) => val.em_amount).reduce((sum, val) => sum + val, 0)
                sumofdeductsalary(sumofdeduction)
            }
            else if (success === 0) {
                deductstatus(1)
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixeddeduction()
    }, [emno, sumofdeductsalary, deductstatus])
    //Deduction 
    const deductsalary = useMemo(() => Deduction, [Deduction]);
    return (
        <Fragment>
            <ul className="list-group list-group-flush">

                {
                    deductsalary.map((val) => {
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

export default memo(DeductedWages) 
