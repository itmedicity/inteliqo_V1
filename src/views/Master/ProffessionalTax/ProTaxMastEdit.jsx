import React, { Fragment, useState, useEffect } from 'react'
import TextInput from 'src/views/Component/TextInput'
import { Typography } from '@material-ui/core'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import ReactTooltip from 'react-tooltip';
import { useHistory, useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import ProTaxTable from './ProTaxTable'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'

const ProTaxMastEdit = () => {
    const history = useHistory();
    const { id } = useParams()
    //Initializing
    const [tax, setTax] = useState({
        prof_tax_desc: '',
        salary_from: '',
        salary_to: '',
        tax_amt: '',
        prof_status: false
    });

    //destructuring
    const { prof_tax_desc, salary_from, salary_to, tax_amt, prof_status } = tax;
    const updateTax = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setTax({ ...tax, [e.target.name]: value })
    }

    //Getdata
    useEffect(() => {
        const getTax = async () => {
            const result = await axioslogin.get(`/proftax/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { prof_tax_desc, salary_from, salary_to, tax_amt, prof_status } = data[0]
                const frmdata = {
                    prof_tax_desc: prof_tax_desc,
                    salary_from: salary_from,
                    salary_to: salary_to,
                    tax_amt: tax_amt,
                    prof_status: prof_status === 1 ? true : false
                }
                setTax(frmdata)
            }
        }
        getTax()
    }, [id])

    // Post Data
    const patchdata = {
        prof_tax_desc: prof_tax_desc,
        salary_from: salary_from,
        salary_to: salary_to,
        tax_amt: tax_amt,
        prof_status: prof_status === true ? 1 : 0,
        proftax_id: id
    }
    const resetForm = {
        prof_tax_desc: '',
        salary_from: '',
        salary_to: '',
        tax_amt: '',
        prof_status: false
    }

    //Form Submitting
    const submitProTax = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/proftax', patchdata)
        const { message, success } = result.data;
        if (success === 2) {
            setTax(resetForm);
            history.push('/Home/ProTax');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Back to home page
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <PageLayoutSaveClose
                heading="Professional Tax"
                redirect={toSettings}
                submit={submitProTax}
            >
                <div className="col-md-12">
                    <div className="row g-2">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="col-md-12 pt-2">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="ProTax Description"
                                            value={prof_tax_desc}
                                            name="prof_tax_desc"
                                            changeTextValue={(e) => updateTax(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 pt-2">
                                        <div className="row">
                                            {/* <div className="col-md-3 pt-1">
                                            <Typography>Salary Range</Typography>
                                        </div> */}
                                            < div className="col-md-5" data-tip=" Salary From" data-for='toolTip1' data-place='top'>
                                                <ReactTooltip id="toolTip1" />
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="From"
                                                    value={salary_from}
                                                    name="salary_from"
                                                    changeTextValue={(e) => updateTax(e)}
                                                />
                                            </div>
                                            <div className="col-md-2 pt-1">
                                                <Typography>--</Typography>
                                            </div>
                                            <div className="col-md-5" data-tip="Salary To" data-for='toolTip1' data-place='top'>
                                                <ReactTooltip id="toolTip1" />
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="To"
                                                    value={salary_to}
                                                    name="salary_to"
                                                    changeTextValue={(e) => updateTax(e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 pt-2">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Tax"
                                            value={tax_amt}
                                            name="tax_amt"
                                            changeTextValue={(e) => updateTax(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 g-2">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="prof_status"
                                                    color="primary"
                                                    value={prof_status}
                                                    checked={prof_status}
                                                    className="ml-2"
                                                    onChange={(e) => updateTax(e)}
                                                />
                                            }
                                            label="Status"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <ProTaxTable />
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutSaveClose>
        </Fragment >
    )
}

export default ProTaxMastEdit