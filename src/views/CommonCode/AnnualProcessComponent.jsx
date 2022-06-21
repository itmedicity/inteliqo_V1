import { Button, Stack, Alert } from '@mui/material'
import { eachMonthOfInterval, intervalToDuration, lastDayOfYear, subMonths, startOfYear, compareAsc, subYears, getYear } from 'date-fns'
import moment from 'moment'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from '../Axios/Axios'
import { employeeNumber } from '../Constant/Constant'
import { infoNofity, succesNofity, warningNofity } from './Commonfunc'

const AnnualProcessComponent = ({
    name,
    dataleave, // Leave available based on Leave
    em_no,
    em_id,
    value,
    lv_process_slnocurrent,
    count,
    countdata,
    setcastable,
    setnodatacl,
    setnodatael,
    setnodatahl,
    setnodatafixed,
    categorychge,
    nameel
}) => {

    // destructuring  dataleave
    const {
        ecat_cont,
        ecat_esi_allow,
        ecat_prob,
        em_contract_end_date,
        em_prob_end_date,
        em_doj
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

    const state = useSelector((state) => state.getEmployeeProcessRecord.ProcessRecord)

    const {
        category_slno,
        contract_end_date,
        date_of_join,
        em_category,
        em_conf_end_date,
        em_cont_close_date,
        em_cont_end,
        em_cont_renew,
        em_cont_start,
        is_under_contract,
        is_under_probation,
        next_updatedate,
        probation_end_date,
        em_gender
    } = state;


    const updatecasualleave = () => {

        /*
            Regular + Confirmation (At the joing Time) -->  
                START_DATE --> { Joing Date}  || END_DATE --> last day of the year

            Regular + Confirmation (After training / Probation) -->
                START_DATE --> { Confirmation Date/Traing/Probation End Date}  || END_DATE --> { last day of the year }

            Regular + Probation/Trainig -->
                START_DATE --> { Joining Date}  || END_DATE --> { last day of the year / Probation-training end Date if  < last day of the year }

            Contract + Training/Probation -->
                START_DATE --> { Joining Date/Contract start Date}  || END_DATE --> { last day of the year / Probation-training end Date if  < last day of the year }

            Contract + Confirmation -->
                START_DATE --> { Confirmation Date/Traing/Probation End Date}  || END_DATE --> { last day of the year / Contract end Date if  < last day of the year }
        */

        // Getting the Contract Employee Start and End Time
        const startEndDate_cont = () => {

            const startOfYears = moment(startOfYear(new Date())).format('YYYY-MM-DD'); // Current year First Day eg '01-01-YYYY'
            const endOfYears = moment(lastDayOfYear(new Date())).format('YYYY-MM-DD'); // Current year Last Day eg '31-12-YYYY'
            const dateOfjoin = moment(date_of_join).format('YYYY-MM-DD'); // Date Of joining
            const contactStart = moment(em_cont_start).isValid() === true ? moment(em_cont_start).format('YYYY-MM-DD') : moment('2000-01-01').format('YYYY-MM-DD'); // Contract Start date
            const contractEnd = moment(em_cont_end).isValid() === true ? moment(em_cont_end).format('YYYY-MM-DD') : moment('2000-01-01').format('YYYY-MM-DD'); // Contract End date
            const confirmationDate = moment(em_conf_end_date).isValid() === true ? moment(em_conf_end_date).format('YYYY-MM-DD') : moment('2000-01-01').format('YYYY-MM-DD'); // Training || Probation confirmation if it is Contract || Regular Employee
            const probationEndDate = moment(probation_end_date).isValid() === true ? moment(probation_end_date).format('YYYY-MM-DD') : moment('2000-01-01').format('YYYY-MM-DD'); // Training || Probation confirmation if it is Contract || Regular Employee


            if (is_under_contract === 1 && is_under_probation === 0) {

                // if the Employee is under Contact and Not under Probation Or trainging
                // Function For Getiing Leave process Start Date for the Contract employee not under Probation / training

                const startDate = (startOfYears, contactStart, contractEnd, confirmationDate) => {
                    /*
                        //compareAsc() --> Function
                        1 -->  if the first date is newer date
                       -1 -->  if the first date is older date
                        0 -->  if both date are equal.
                    */
                    if (compareAsc(new Date(startOfYears), new Date(contactStart)) === 1 && compareAsc(new Date(contractEnd), new Date(startOfYears)) === 1 && compareAsc(new Date(contractEnd), new Date()) === -1) {
                        // newyear Date  between the Contract Sart and End Date and the current date  less than contract end date --> then return the New Yesr Date
                        return startOfYears;
                    } else {
                        return contactStart;
                    }
                }
                const processStartDate = startDate(startOfYears, contactStart, contractEnd, confirmationDate);

                // Function for getting the Process End Date for the contract employee not under 
                const endDate = (yearEnd, contactStart, contractEnd) => {
                    if (compareAsc(new Date(yearEnd), new Date(contractEnd)) === 1 && compareAsc(new Date(contractEnd), new Date(yearEnd)) === -1 && compareAsc(new Date(contractEnd), new Date()) === 1) {
                        /*                                                                                    
                            1--> YearEnd Date is after the Contract end date then ==> Contract End Date
                            2--> Contract Date is older than Year End Date then   ==> Contract End Date
                            3--> Contract End Date is greater than current Date   ==> Contract End Date
                        */
                        return contractEnd;
                    } else if (compareAsc(new Date(yearEnd), new Date(contractEnd)) === 1 && compareAsc(new Date(contractEnd), new Date(yearEnd)) === -1 && compareAsc(new Date(contractEnd), new Date()) === -1) {
                        return contractEnd;
                    } else {
                        return yearEnd;
                    }
                }

                const processEndDate = endDate(endOfYears, contactStart, contractEnd, confirmationDate);
                // Final Return Result for the Contrat Employee With Out Probation
                return { startDate: processStartDate, endDate: processEndDate }

            } else if (is_under_contract === 1 && is_under_probation === 1) {

                // if the Employee is under Contact and under Probation Or trainging
                const newYearDate = startOfYear(new Date());
                const endYearDate = lastDayOfYear(new Date());

                if (compareAsc(new Date(probationEndDate), new Date()) === -1) {

                    return { message: 0 }

                    // const a = subYears(new Date(), -1) // For calcualting the Next Year
                    // console.log(a)
                } else {
                    //For Probation Start Date
                    const proStartDate = (StartOfYear, probationStart, probationEndDate) => {
                        if (compareAsc(new Date(StartOfYear), new Date(probationStart)) === -1 && compareAsc(new Date(probationStart), new Date()) === -1) {
                            return probationStart;
                        } else {
                            return StartOfYear;
                        }
                    }

                    const ProbationStartDate = proStartDate(newYearDate, contactStart, probationEndDate)

                    // For Probation End Date
                    const proEndDate = (endYearDate, probationStart, probationEndDate) => {

                        if (compareAsc(new Date(endYearDate), new Date(probationEndDate)) === 1 && compareAsc(new Date(probationEndDate), new Date()) === 1) {
                            return new Date(probationEndDate);
                        } else {
                            return new Date(endYearDate);
                        }
                    }

                    const endProDate = proEndDate(endYearDate, contactStart, probationEndDate)

                    return { startDate: ProbationStartDate, endDate: moment(endProDate).format('YYYY-MM-DD') }

                }
            }
        }

        // For getting the Regular Employee Start and End Time
        const startEndDate_regular = () => {

            //Base Employee Admission Record Data
            const startOfYears = moment(startOfYear(new Date())).format('YYYY-MM-DD'); // Current year First Day eg '01-01-YYYY'
            const endOfYears = moment(lastDayOfYear(new Date())).format('YYYY-MM-DD'); // Current year Last Day eg '31-12-YYYY'
            const dateOfjoin = moment(date_of_join).format('YYYY-MM-DD'); // Date Of joining
            const contactStart = moment(em_cont_start).isValid() === true ? moment(em_cont_start).format('YYYY-MM-DD') : moment('2000-01-01').format('YYYY-MM-DD'); // Contract Start date
            const contractEnd = moment(em_cont_end).isValid() === true ? moment(em_cont_end).format('YYYY-MM-DD') : moment('2000-01-01').format('YYYY-MM-DD'); // Contract End date
            const confirmationDate = moment(em_conf_end_date).isValid() === true ? moment(em_conf_end_date).format('YYYY-MM-DD') : moment('2000-01-01').format('YYYY-MM-DD'); // Training || Probation confirmation if it is Contract || Regular Employee
            const probationEndDate = moment(probation_end_date).isValid() === true ? moment(probation_end_date).format('YYYY-MM-DD') : moment('2000-01-01').format('YYYY-MM-DD'); // Training || Probation confirmation if it is Contract || Regular Employee

            if (is_under_contract === 0 && is_under_probation === 0) {
                // Is Employee under Regular Category and not under Training / Probation
                const regularStart = (dateOfjoin, startOfYears, endOfYears) => {
                    // For getting the start date for the regular emoployee not under the probation or training
                    if (compareAsc(new Date(startOfYears), new Date(dateOfjoin)) === -1 && (new Date() >= new Date(dateOfjoin)) && compareAsc(getYear(new Date()), getYear(new Date(dateOfjoin))) === 0) {
                        return dateOfjoin;
                    } else {
                        return startOfYears;
                    }
                }
                const regularProcessStartDate = regularStart(dateOfjoin, startOfYears, endOfYears)

                return { startDate: regularProcessStartDate, endDate: endOfYears }
            } else if (is_under_contract === 0 && is_under_probation === 1) {
                // Is under Probation / Training On regular Category

                //Checking the probation End Date is Exceeded
                if (new Date() > new Date(probationEndDate)) {
                    return { message: 0 }
                } else {
                    // For Start Date  
                    const regularStartProb = (dateOfjoin, startOfYears, endOfYears, probationEndDate) => {
                        if (compareAsc(new Date(startOfYears), new Date(dateOfjoin)) === -1 && (new Date() >= new Date(dateOfjoin) && new Date() <= new Date(probationEndDate))) {

                            return dateOfjoin
                        } else {
                            return startOfYears
                        }
                    }

                    // For the End Date
                    const regularEndProb = (dateOfjoin, startOfYears, endOfYears, probationEndDate) => {
                        if (compareAsc(new Date(probationEndDate), new Date(endOfYears)) === 1 || compareAsc(new Date(probationEndDate), new Date(endOfYears)) === 0) {
                            return endOfYears
                        } else {
                            return probationEndDate;
                        }
                    }

                    const startDateProRegular = regularStartProb(dateOfjoin, startOfYears, endOfYears, probationEndDate)
                    const EndDateProRegular = regularEndProb(dateOfjoin, startOfYears, endOfYears, probationEndDate)

                    return { startDate: moment(startDateProRegular).format('YYYY-MM-DD'), endDate: moment(EndDateProRegular).format('YYYY-MM-DD') }
                }
            }
        }

        const contractStartEndDate = startEndDate_cont()
        const regularStartEndDate = startEndDate_regular()

        const calculatedDate = {
            regular: regularStartEndDate === undefined ? 1 : regularStartEndDate,
            contract: contractStartEndDate === undefined ? 1 : contractStartEndDate,
        }
        //Final Result for StartDate and EndDate
        const dateStart = (calculatedDate.regular !== 1 && !calculatedDate.regular.message) ? calculatedDate.regular.startDate : (calculatedDate.contract !== 1 && !calculatedDate.contract.message) ? calculatedDate.contract.startDate : moment(new Date()).format('YYYY-MM-DD')
        const dateEnd = (calculatedDate.regular !== 1 && !calculatedDate.regular.message) ? calculatedDate.regular.endDate : (calculatedDate.contract !== 1 && !calculatedDate.contract.message) ? calculatedDate.contract.endDate : moment(new Date()).format('YYYY-MM-DD')

        // function for casual leave
        const setcasleave = async () => {
            //console.log(subMonths(new Date(), 1))
            //console.log(ecat_cont === 1 ? new Date(em_contract_end_date) : ecat_prob === 1 ? new Date(em_prob_end_date) : moment(lastDayOfYear(new Date())).format('YYYY-MM-DD'))
            // var dateresult = eachMonthOfInterval({ start: subMonths(new Date(), 1), end: ecat_cont === 1 ? new Date(em_contract_end_date) : ecat_prob === 1 ? new Date(em_prob_end_date) : moment(lastDayOfYear(new Date())).format('YYYY-MM-DD') })
            var dateresult = eachMonthOfInterval({ start: new Date(), end: new Date(dateEnd) })

            // console.log(dateStart, dateEnd);
            /*--- Casual Leave Start and End date 
                Start Date --> Current date as start date Later need to check the current month total working 
                Greater than 15 or not / If greater than 15 only need to add the Current month Casual Leave 
            */

            var datacaual = dateresult && dateresult.map((val, index) => {
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

            // insert casual leave into the table 

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

                    // Filter the Maternity For the Male Employee
                    const filterCommonArray = messagecommonleave.filter((val) => val.lvetype_slno !== 2)
                    const newCommonArray = em_gender === 1 ? filterCommonArray : messagecommonleave;
                    var commondata = newCommonArray.map((val) => {
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
            var datadate = intervalToDuration({
                start: new Date(em_doj),
                end: new Date()
            })
            if (datadate.years >= 1) {
                var number = Math.floor(nameel.duty_day / 20)
                var dateresult = eachMonthOfInterval({ start: subMonths(new Date(), 1), end: lastDayOfYear(new Date()) })
                var dataearnlv = dateresult.map((val, index) => {
                    const dataearnleave = {
                        em_no: em_no,
                        ernlv_mnth: moment(val).format('YYYY-MM-DD'),
                        ernlv_year: moment(val).format('YYYY-MM-DD'),
                        ernlv_allowed: 1,
                        ernlv_credit: number > 0 ? 1 : 0,
                        ernlv_taken: 0,
                        lv_process_slno: lv_process_slnocurrent,
                        update_user: employeeNumber(),
                        em_id: em_id,
                    }
                    number = number - 1
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
            else {
                warningNofity('one Year Not Completed')
            }
        }
        if (value === 1) {
            setcasleave()
        }
        else if (value === 2) {
            setholiday(lv_process_slnocurrent);
        }
        else if (value === 3) {
            getCommonleave(lv_process_slnocurrent);
        }
        else if (value === 4) {
            setearnleave(lv_process_slnocurrent)
        }
    }

    return (
        <Stack sx={{ width: '100%', marginY: 0.2 }} spacing={2} direction="row" justifyContent="space-around" alignItems="center" >
            <Alert severity="info" style={{ paddingTop: 0, paddingBottom: 0, width: "100%" }} >{name}</Alert>
            <Button color="secondary" onClick={updatecasualleave} variant="outlined" >Process</Button>
        </Stack>
    )
}

export default memo(AnnualProcessComponent)
