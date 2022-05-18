import { compareAsc } from 'date-fns'
import React, { Fragment, useContext, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import EmployeeCategory from 'src/views/CommonCode/EmployeeCategory'
import EmployeeInstitutiontype from 'src/views/CommonCode/EmployeeInstitutiontype'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { employeeNumber, getProcessserialnum, SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import ModelLeaveProcess from './EmpFileComponent/ModelLeaveProcess'
import EmpCompanyTable from './EmployeeFileTable/EmpCompanyTable'
import TextInput from 'src/views/Component/TextInput'
import { format } from 'date-fns'

const EmployeeCompany = () => {
    const history = useHistory()
    const { id, no } = useParams();
    const { selectBranchMast, updateBranchSelected,
        selectedDept, updateSelected,
        selectDeptSection, updateDepartmentSection,
        selectInstiType, updateInstituteSeleted,
        getemployeecategory, udateemployeecategory
    } = useContext(PayrolMasterContext)

    // to check the annpual leave procee wheter ist from category change
    const [categorychge, setcategorychange] = useState(1)
    const [count, setcount] = useState(0)
    const [company, setcompany] = useState(0)
    // to open model ModelLeaveProcess consition
    const [modelvalue, setmodelvalue] = useState(0)
    // to open model leave  list
    const [modellist, setmodellist] = useState(false)
    // to model message
    const [modelmessage, setmodelmessage] = useState('');
    // use State foe serial number
    const [processslno, setprocessslno] = useState(0)
    // set open model 
    const [open, setOpen] = useState(false);
    // current process details

    // check wheathe old or new
    const [olddata, setolddat] = useState(0)
    //  data based on employeee category
    const [leavestate, setleavestate] = useState({
        ecat_cl: 0,
        ecat_confere: 0,
        ecat_cont: 0,
        ecat_doff_allow: 0,
        ecat_el: 0,
        ecat_esi_allow: 0,
        ecat_fh: 0,
        ecat_lop: 0,
        ecat_mate: 0,
        ecat_nh: 0,
        ecat_prob: 0,
        ecat_woff_allow: 0,
        ecat_sl: 0,
        em_category: getemployeecategory
    })

    // current process details
    const [leaveprocessid, leaveprocessidupdate] = useState({
        hrm_calcu: 0,
        hrm_clv: 0,
        hrm_cmn: 0,
        hrm_ern_lv: 0,
        hrm_hld: 0,
        lv_process_slno: 0,
        category_slno: 0
    });
    //Employee Category set
    const [cat, setCat] = useState({
        catemp: ''
    })
    //Employee Type and Designation Type Set
    const [empstatus, setempStatus] = useState(0)
    const [probsataus, setProbstatus] = useState(0)

    //UseState for Date Feild disabled 
    const [dis, setDis] = useState(true)

    const [probenddate, setProbenddate] = useState(format(new Date(), "yyyy-MM-dd"));
    //Get data
    useEffect(() => {
        const getCompany = async () => {
            const result = await axioslogin.get(`/common/getcompanydetails/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_branch, em_department, em_prob_end_date, em_dept_section, em_institution_type, em_category } = data[0]
                const frm = {
                    catemp: em_category
                }
                setCat(frm)
                setProbenddate(em_prob_end_date)
                updateBranchSelected(em_branch)
                updateSelected(em_department)
                updateDepartmentSection(em_dept_section)
                updateInstituteSeleted(em_institution_type)
                udateemployeecategory(em_category)
                setcompany(em_category)
            }
        }
        getCompany()
    }, [id, updateBranchSelected, updateSelected, selectedDept, updateDepartmentSection, updateInstituteSeleted, udateemployeecategory])

    const [enddate, setenddate] = useState(format(new Date(), "yyyy-MM-dd"));

    const getenddate = (e) => {
        var enddate = e.target.value
        var end = format(new Date(enddate), "yyyy-MM-dd")
        setenddate(end)
        return (end)
    }

    useEffect(() => {
        if ((getemployeecategory !== cat.catemp) && (getemployeecategory !== 0)) {
            const getEmpType = async () => {
                const result = await axioslogin.get(`/empmast/getEmpTypeDesg/${getemployeecategory}`)
                const { success, data } = result.data
                if (success === 1) {
                    const { emp_type, des_type } = data[0]
                    if ((des_type === 1) || (des_type === 2)) {
                        setDis(false)
                        setProbstatus(1)
                    } else if (des_type === 3) {
                        setDis(true)
                        setProbstatus(0)
                    }
                    else {
                        setDis(true)
                        setProbstatus(0)
                    }
                    if (emp_type === 2) {
                        setempStatus(1)
                    }
                    else if (emp_type === 1) {
                        setempStatus(0)
                    }
                }
            }
            getEmpType()
        }
    }, [getemployeecategory])

    //post Data
    const updateData = {
        em_branch: selectBranchMast,
        em_department: selectedDept,
        em_dept_section: selectDeptSection,
        em_institution_type: selectInstiType,
        com_category: company,
        com_category_new: getemployeecategory,
        em_category: getemployeecategory,
        em_conf_end_date: enddate,
        contract_status: empstatus === 1 ? 1 : 0,
        probation_status: probsataus === 1 ? 1 : 0,
        create_user: employeeNumber(),
        edit_user: employeeNumber(),
        em_id: no,
        em_no: id,
    }
    const reset = () => {
        updateBranchSelected(0)
        updateSelected(0)
        updateDepartmentSection(0)
        updateInstituteSeleted(0)
        udateemployeecategory(0)
    }

    //update Data
    const submitCompany = async (e) => {
        e.preventDefault();
        // get current data allowed  leave based on category
        const getcategorydata = async () => {
            const result = await axioslogin.get(`/common/getannprocess/${no}`)
            const { data } = result.data
            setleavestate(data[0])
        }
        getcategorydata();
        const getdata = async () => {
            getProcessserialnum().then((val) => {
                setprocessslno(val)
            })

            // check the table where data present if present get the details process table
            const result = await axioslogin.post('/yearleaveprocess/', postFormdata)
            const { success, message } = result.data;
            const { category_slno, hrm_calcu, hrm_clv, hrm_cmn, hrm_ern_lv, hrm_hld,
                lv_process_slno, next_updatedate } = message[0]
            const dataprvleave = {
                hrm_calcu: hrm_calcu,
                hrm_clv: hrm_clv,
                hrm_cmn: hrm_cmn,
                hrm_ern_lv: hrm_ern_lv,
                hrm_hld: hrm_hld,
                category_slno: category_slno,
                lv_process_slno: lv_process_slno
            }

            // if no data available
            if (success === 0) {
                // if no data is present means new employee  set model
                setmodelvalue(1)
                setmodelmessage('Leave process is not done for the employee')
                setolddat(1)
                setOpen(true)
            }
            else if (success === 1) {
                leaveprocessidupdate(dataprvleave)
                // if employee process date has over 
                if (compareAsc(new Date(), new Date(next_updatedate)) === 1) {
                    setOpen(true)
                    setmodelvalue(1)
                    setmodelmessage('Date Exceeded do you Want To Process')
                }
                else if (category_slno !== getemployeecategory) {

                    setmodelvalue(1)
                    setmodelmessage('Category Change Do You Want to  To Process')
                    setOpen(true)
                }
                // if process contain data and pending leave process is present
                else if (hrm_calcu === 0 || hrm_clv === 0 || hrm_cmn === 0 || hrm_ern_lv === 0 || hrm_hld === 0) {
                    setmodellist(true)
                }
            }
        }
        const result = await axioslogin.post('/empmast/company', updateData)
        const { message, success } = result.data;
        if (success === 1) {
            getcategorydata()
            succesNofity(message);
            setcount(count + 1)
            getdata()
            reset()
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Redirect
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }
    const postFormdata =
    {
        em_no: no,
        em_id: id
    }
    const handleClose = () => {
        setmodellist(false)
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Company Information"
                redirect={RedirectToProfilePage}
                submit={submitCompany}
            >
                {modelvalue === 1 ? <ModelLeaveProcess
                    open={open}
                    dataleave={leavestate} // {leaves available based on category}
                    handleClose={handleClose}
                    setOpen={setOpen}  //for open model
                    id={id}//employee id
                    no={no}//employee number
                    valuemessage={modelmessage}//model message
                    leaveprocessid={leaveprocessid} //current proceess details
                    processslno={processslno}//processess serialno
                    olddata={olddata}// check wheather new data
                    setmodelvalue={setmodelvalue}
                    categorychge={categorychge}
                /> : null}
                <div className="row g-2">
                    <div className="col-md-4">
                        <div className="row g-2">
                            <div className="col-md-12">
                                <BrnachMastSelection
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                            <div className="col-md-12">
                                <DepartmentSelect
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                            <div className="col-md-12">
                                <DepartmentSectionSelect
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                            <div className="col-md-12">
                                <EmployeeInstitutiontype
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                            <div className="col-md-12">
                                <EmployeeCategory
                                    style={SELECT_CMP_STYLE}
                                />
                            </div>
                            <div className="col-md-12">
                                <TextInput
                                    type="date"
                                    classname="form-control form-control-sm"
                                    Placeholder="End Date"
                                    disabled={dis}
                                    value={enddate}
                                    min={probenddate}
                                    name="enddate"
                                    changeTextValue={(e) => {
                                        getenddate(e)
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="col-md-8">
                        <EmpCompanyTable update={count} />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default EmployeeCompany
