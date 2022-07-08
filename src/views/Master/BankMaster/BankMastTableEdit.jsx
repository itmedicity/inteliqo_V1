import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { employeeNumber } from 'src/views/Constant/Constant'
import BankMastTable from './BankMastTable'
import BankSelection from './BankSelection'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'

const BankMastTableEdit = () => {
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const [bankmast, setbankmast] = useState(0)
    const handlechange = (e) => {
        setbankmast(e)
    }
    //Initialization
    const [bankData, setFormdata] = useState({
        bank_name: '',
        bank_ifsc: '',
        bank_address: '',
        bank_status: false
    });

    //Destructuring
    const { bank_name, bank_ifsc, bank_address, bank_status } = bankData;
    const getBankFormData = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormdata({ ...bankData, [e.target.name]: value });
    }
    //get data
    useEffect(() => {
        const getBank = async () => {
            const result = await axioslogin.get(`/bank/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { bank_name, bank_ifsc, bank_address, bank_status, bank_mastname } = data[0]
                console.log(bank_mastname)
                const frmdata = {
                    bank_name: bank_name,
                    bank_ifsc: bank_ifsc,
                    bank_address: bank_address,
                    bank_status: bank_status === 1 ? true : false
                }
                setFormdata(frmdata)
                setbankmast(bank_mastname)
            }
        }
        getBank()
    }, [id])


    const postBank = {
        bank_name,
        bank_mastname: bankmast,
        bank_ifsc,
        bank_address,
        bank_status: bank_status === true ? 1 : 0,
        edit_user: employeeNumber(),
        bank_slno: id
    }
    const resetForm = {
        bank_name: '',
        bank_ifsc: '',
        bank_address: '',
        bank_status: false,

    }

    //update
    const submitFormUpdate = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/bank', postBank)
        const { message, success } = result.data;
        if (success === 2) {
            setFormdata(resetForm);
            history.push('/Home/Bank');
            succesNofity(message);
            setbankmast(0)
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Back to Home
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Bank Master</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitFormUpdate}  >
                                <div className="row g-2">
                                    <div className="col-md-12 ">
                                        <BankSelection style={SELECT_CMP_STYLE} onChange={handlechange} value={bankmast} />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            style={{ paddingLeft: 0, marginLeft: 1 }}
                                            label="Bank Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="bank_name"
                                            value={bank_name}
                                            onChange={(e) => getBankFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            style={{ paddingLeft: 0, marginLeft: 1 }}
                                            label="Bank IFSC Code"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="bank_ifsc"
                                            value={bank_ifsc}
                                            onChange={(e) => getBankFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            style={{ paddingLeft: 0, marginLeft: 1 }}
                                            label="Address"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="bank_address"
                                            value={bank_address}
                                            onChange={(e) => getBankFormData(e)}
                                        />
                                    </div>
                                    <div className="col-md-12 pb-0 mb-0">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="bank_status"
                                                    color="primary"
                                                    value={bank_status}
                                                    checked={bank_status}
                                                    className="ml-2"
                                                    onChange={(e) => getBankFormData(e)}
                                                />
                                            }
                                            label="Status"
                                        />
                                    </div>
                                    <div className="row col-md-12">
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-1">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                type="Submit"
                                                className="ml-2"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                className="ml-2"
                                                onClick={toSettings}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <BankMastTable />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default BankMastTableEdit
