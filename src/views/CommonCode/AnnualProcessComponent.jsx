import { Button, DialogContentText } from '@mui/material'
import { eachMonthOfInterval, lastDayOfYear, subMonths } from 'date-fns'
import moment from 'moment'
import React, { memo } from 'react'
import { axioslogin } from '../Axios/Axios'
import { employeeNumber } from '../Constant/Constant'
import { infoNofity, succesNofity, warningNofity } from './Commonfunc'

const AnnualProcessComponent = ({ name, dataleave, em_no, em_id, value, lv_process_slnocurrent, count, countdata,
    setcastable,
    setnodatacl,
    setnodatael,
    setnodatahl,
    setnodatafixed, categorychge }) => {

    // destructuring  dataleave
    const { ecat_esi_allow,
        // ecat_lop, ecat_mate, ecat_sl,
    } = dataleave

    // useState for common leave data
    // const [commonleave, setcommonleave] = useState({
    //     com_slno: 0,
    //     lvetype_slno_cl: 0,
    //     lvetype_slno_conference: 0,
    //     lvetype_slno_lop: 0,
    //     lvetype_slno_maternity: 0,
    //     lvetype_slno_previlage: 0,
    //     lvetype_slno_sick: 0,
    //     max_allowed_count_cl: 0,
    //     max_allowed_count_conference: 0,
    //     max_allowed_count_lop: 0,
    //     max_allowed_count_maternity: 0,
    //     max_allowed_count_previlage: 0,
    //     max_allowed_count_sick: 0,
    //     month_year_cl: 0,
    //     month_year_conference: 0,
    //     month_year_lop: 0,
    //     month_year_maternity: 0,
    //     month_year_previlage: 0,
    //     month_year_sick: 0,
    // })
    // const {
    //     // max_allowed_count_conference,
    //     // max_allowed_count_lop,
    //     // max_allowed_count_maternity,
    //     // max_allowed_count_sick,
    // } = commonleave


    const updatecasualleave = () => {
        // function for casual leave
        const setcasleave = async () => {
            var dateresult = eachMonthOfInterval({ start: subMonths(new Date(), 1), end: lastDayOfYear(new Date()) })
            var datacaual = dateresult.map((val, index) => {
                const datacasualleave = {
                    em_no: em_no,
                    em_id: em_id,
                    cl_lv_mnth: moment(val).format('YYYY-MM-DD'),
                    cl_lv_year: moment(val).format('YYYY-MM-DD'),
                    cl_lv_allowed: 1,
                    cl_lv_credit: 0,
                    cl_lv_taken: 0,
                    lv_process_slno: lv_process_slnocurrent,
                    update_user: employeeNumber()
                }
                return datacasualleave
            })
            const lv_process = {
                lv_proce: lv_process_slnocurrent

            }
            // insert casual leave
            const result = await axioslogin.post('/yearleaveprocess/insert', datacaual)
            const { success, message } = result.data
            if (success === 1) {
                // if updated casula leave table update process table
                const resultupdatcasualleave = await axioslogin.patch('/yearleaveprocess/updatecasualleave', lv_process)

                if (resultupdatcasualleave.data.success === 2) {
                    succesNofity(resultupdatcasualleave.data.message)

                }
                count(countdata + 1)
                if (categorychge !== 1) {

                    setcastable(1)
                    setnodatacl(0)

                }


            }
            else {

                infoNofity(message)
            }
        }

        // function for holiday
        const setholiday = async (lv_process_slnocurrent) => {
            const result = await axioslogin.get('/yearleaveprocess/year/holiday')
            const { success, data } = result.data
            if (success === 1) {
                var holidaydata = data.map((val) => {
                    const datasaveholiday = {
                        em_no: em_no,
                        hd_slno: val.hld_slno,
                        hl_lv_year: val.hld_date,
                        hl_date: val.hld_date,
                        hl_lv_credit: 1,
                        hl_lv_taken: 0,
                        hl_lv_allowed: 1,
                        lv_process_slno: lv_process_slnocurrent,
                        update_user: employeeNumber(),
                        em_id: em_id
                    }
                    return datasaveholiday
                })
                const lv_processdta = {
                    lv_proce: lv_process_slnocurrent
                }
                // insert holiday table
                const resultinsrtholiday = await axioslogin.post('/yearleaveprocess/insertholiday', holidaydata)
                // if data inserted update process table
                if (resultinsrtholiday.data.success === 1) {
                    const resultupdateholiday = await axioslogin.patch('/yearleaveprocess/updateholiday', lv_processdta)
                    if (resultinsrtholiday.data.success === 1) {

                        succesNofity(resultupdateholiday.data.message)
                        if (categorychge !== 1) {

                            setnodatahl(0)

                        }


                        count(countdata + 1)
                    }
                }


            }
            else if (success === 2) {

                warningNofity('No Holidays left')
            }

        }
        // commonleave save
        const getCommonleave = async (lv_process_slnocurrent) => {
            const result = await axioslogin.get('/yearlyleaves')
            const { successleave } = result.data

            if (successleave === 1) {
                // setcommonleave(messageleave[0])
                const result = await axioslogin.get('/yearlyleaves/get/getcommonleave')

                const { successcommonleave, messagecommonleave } = result.data

                if (successcommonleave === 1) {

                    var commondata = messagecommonleave.map((val) => {

                        const commonleave = {
                            em_no: em_no,
                            llvetype_slno: val.lvetype_slno,
                            cmn_lv_allowedflag: ecat_esi_allow === 1 ? 1 : 0,
                            cmn_lv_allowed: val.leave_credit_policy_count,
                            cmn_lv_taken: 0,
                            cmn_lv_balance: 0,
                            Iv_process_slno: lv_process_slnocurrent,
                            update_user: employeeNumber(),
                            em_id: em_id
                        }
                        return commonleave
                    })
                    const lv_processdta = {
                        lv_proce: lv_process_slnocurrent
                    }

                    // insert common leave
                    const resultcommonleave = await axioslogin.post('/yearleaveprocess/insertCommonleave', commondata)
                    const { success, message } = resultcommonleave.data
                    if (success === 1) {
                        // if updated casula leave table update process table
                        const resultupdatcommonleave = await axioslogin.patch('/yearleaveprocess/updatecommon', lv_processdta)

                        if (resultupdatcommonleave.data.success === 2) {
                            succesNofity(resultupdatcommonleave.data.message)
                            if (categorychge !== 1) {
                                setnodatafixed(0)
                            }
                            count(countdata + 1)
                        }
                    }
                    else {
                        infoNofity(message)
                    }
                }
            }
        }

        // earnleave save
        const setearnleave = async (lv_process_slnocurrent) => {
            var dateresult = eachMonthOfInterval({ start: subMonths(new Date(), 1), end: lastDayOfYear(new Date()) })
            var dataearnlv = dateresult.map((val, index) => {
                const dataearnleave = {
                    em_no: em_no,
                    ernlv_mnth: moment(val).format('YYYY-MM-DD'),
                    ernlv_year: moment(val).format('YYYY-MM-DD'),
                    ernlv_allowed: 1,
                    ernlv_credit: 0,
                    ernlv_taken: 0,
                    lv_process_slno: lv_process_slnocurrent,
                    update_user: employeeNumber(),
                    em_id: em_id,
                }
                return dataearnleave
            })
            const lv_process = {
                lv_proce: lv_process_slnocurrent

            }

            // insert casual leave
            const result = await axioslogin.post('/yearleaveprocess/insertearnleave', dataearnlv)
            const { success, message } = result.data
            if (success === 1) {
                // if updated casula leave table update process table
                const resultupdatcasualleave = await axioslogin.patch('/yearleaveprocess/updateearnleave', lv_process)

                if (resultupdatcasualleave.data.success === 2) {
                    succesNofity(resultupdatcasualleave.data.message)
                    if (categorychge !== 1) {

                        setnodatael(0)

                    }

                    count(countdata + 1)
                }
            }
            else {

                infoNofity(message)
            }
        }
        if (value === 'C') {
            setcasleave()
        }
        else if (value === 'H') {
            setholiday(lv_process_slnocurrent);
        }
        else if (value === 'O') {
            getCommonleave(lv_process_slnocurrent);
        }
        else if (value === 'E') {

            setearnleave(lv_process_slnocurrent)
        }

    }

    return (
        <DialogContentText id="alert-dialog-slide-descriptiona">
            {name}
            <Button color="secondary" onClick={updatecasualleave} >Process</Button>
        </DialogContentText>
    )
}

export default memo(AnnualProcessComponent)
