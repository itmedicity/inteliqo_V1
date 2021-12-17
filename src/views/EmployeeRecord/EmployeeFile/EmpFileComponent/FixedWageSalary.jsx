import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { Suspense } from 'react'
import FullPageloader from 'src/components/FullPageloader'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const FixedWageSalary = ({ emno, sumoffixedwage, fixedwagestate }) => {
    const [fixedWages, setFixedwages] = useState([])
    useEffect(() => {
        const getFixedWages = async () => {
            const result = await axioslogin.get(`/common/getfixedwagesSalary/${emno}`)
            const { success, data } = result.data
            if (success === 1) {
                setFixedwages(data)
                const fixedwagessum = data.map((val) => val.em_amount).reduce((sum, val) => sum + val, 0)
                sumoffixedwage(fixedwagessum)
            }
            else if (success === 0) {
                fixedwagestate(1)
                infoNofity('No Fixed wages is set to this employee')
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixedWages()
    }, [emno, sumoffixedwage, fixedwagestate])

    //use Memofixed Wages
    const fixedwage = useMemo(() => fixedWages, [fixedWages]);

    return (
        <Fragment>
            <ul className="list-group list-group-flush">
                <Suspense fallback={<FullPageloader />} >
                    {
                        fixedwage && fixedwage.map((val) => {
                            return <li className="list-group-item py-0" key={val.ernded_slno}>
                                <div className="d-flex justify-content-between"  >
                                    <div>{val.earnded_name}</div>
                                    <div>{val.em_amount}</div>
                                </div>
                            </li>;

                        })
                    }
                </Suspense>
            </ul>
        </Fragment>
    )
}

export default memo(FixedWageSalary) 
