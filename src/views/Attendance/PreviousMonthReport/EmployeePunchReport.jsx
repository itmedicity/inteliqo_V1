import React, { memo, useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import MasterView from './MasterView';
import InchargeHodView from './InchargeHodView';
import EmployeeView from './EmployeeView';

const EmployeePunchReport = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCommonSetting())
    }, [dispatch])

    const [rights, setRights] = useState(0)

    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
    const { em_id, hod, incharge } = empData;
    const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const commonSetting = useMemo(() => state, [state])
    const { group_slno } = commonSetting;

    useEffect(() => {
        const getEmployeeRight = async () => {
            const result = await axioslogin.post("/attendCal/rights/", postData);
            const { success, data } = result.data;
            if (success === 1) {
                const { user_grp_slno } = data[0];
                if (group_slno !== undefined) {
                    if (group_slno.includes(user_grp_slno) === true) {
                        setRights(1)
                    } else {
                        setRights(0)
                    }
                }

            } else {
                setRights(0)
            }
        }

        const postData = {
            emid: em_id
        }
        getEmployeeRight(postData)

    }, [em_id, group_slno])

    return (
        <>
            {
                rights === 1 ? <MasterView /> :
                    hod === 1 || incharge === 1 ? <InchargeHodView /> : <EmployeeView />
            }
        </>
    )
}

export default memo(EmployeePunchReport)