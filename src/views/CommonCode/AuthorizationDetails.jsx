import React, { Fragment, useEffect } from 'react'
import { useContext } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from '../Axios/Axios'
import SessionCheck from '../Axios/SessionCheck'

const AuthorizationDetails = () => {
    const { employeedetails, updateAuthorization } = useContext(PayrolMasterContext)
    const { em_dept_section, em_id } = employeedetails
    useEffect(() => {
        if (em_dept_section !== 0) {
            const getAuthorization = async () => {
                const result = await axioslogin.get(`/section/authorization/${em_dept_section}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { authorization_incharge, authorization_hod } = data[0]
                    const results = await axioslogin.get(`/common/userdetl/${em_id}`)
                    const { success, data1 } = results.data
                    if (success === 1) {
                        const { hod, incharge } = data1[0]
                        const resultss = await axioslogin.get(`/common/ceolevel/${em_id}`)
                        const { success, data2 } = resultss.data
                        if (success === 1) {
                            const { co_assign } = data2[0]
                            const setData = {
                                incharge_level: authorization_incharge,
                                hod_level: authorization_hod,
                                ceo_level: co_assign,
                                is_incharge: incharge,
                                is_hod: hod,
                                is_ceo: 1
                            }
                            updateAuthorization(setData)
                        }
                        else if (success === 0) {
                            const setData = {
                                incharge_level: authorization_incharge,
                                hod_level: authorization_hod,
                                ceo_level: 0,
                                is_incharge: incharge,
                                is_hod: hod,
                                is_ceo: 1
                            }
                            updateAuthorization(setData)
                        }
                    }
                }
            }
            getAuthorization()
        }
    }, [em_dept_section, em_id])
    return (
        <Fragment>
            <SessionCheck>
            </SessionCheck>
        </Fragment>
    )
}
export default AuthorizationDetails
