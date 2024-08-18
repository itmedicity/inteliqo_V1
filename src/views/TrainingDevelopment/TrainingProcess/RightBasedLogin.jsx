import React, { memo, useMemo, useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios';
import { setCommonSetting } from 'src/redux/actions/Common.Action';
import TrainingProcess from './TrainingProcess';
import TNDProcessMainpage from './TNDTrainingProcess/TNDProcessMainpage';


const RightBasedLogin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCommonSetting())
    }, [dispatch])

    const [rights, setRights] = useState(0)

    const empData = useSelector((state) => state?.getProfileData?.ProfileData[0], _.isEqual)
    const { em_id, hod, incharge } = empData;
    const state = useSelector((state) => state?.getCommonSettings, _.isEqual)
    const commonSetting = useMemo(() => state, [state])
    const { training_mastergroup } = commonSetting;

    useEffect(() => {
        const getEmployeeRight = async () => {
            const result = await axioslogin.post("/attendCal/rights/", postData);
            const { success, data } = result.data;
            if (success === 1) {
                const { user_grp_slno } = data[0];
                if (training_mastergroup !== undefined) {
                    if (training_mastergroup?.includes(user_grp_slno) === true) {
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

    }, [em_id, training_mastergroup])
    return (
        <Fragment>
            {
                rights === 1 ? <TNDProcessMainpage /> :
                    hod === 1 || incharge === 1 ? <TrainingProcess /> : null

            }
        </Fragment>
    )
}

export default memo(RightBasedLogin) 
