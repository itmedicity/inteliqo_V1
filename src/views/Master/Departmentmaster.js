import React, { useEffect, useState, useMemo, memo } from 'react'
import { Button, Checkbox, FormControlLabel, makeStyles, TextField } from '@material-ui/core'
import SessionCheck from '../Axios/SessionCheck'
import DepartmentTable from './DepartmentTable'
import { infoNofity, succesNofity, errorNofity } from '../CommonCode/Commonfunc';
import { axioslogin } from '../Axios/Axios';
// import { token } from '../Constant/Constant';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

const Departmentmaster = () => {

    const classes = useStyles();
    const history = useHistory();
    const [dept_name, setDeptname] = useState("");
    const [dept_alias, setDeptalias] = useState("");
    const [dept_status, setDeptstatus] = useState(false);
    const status = dept_status === true ? 1 : 0;
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);

    const resetForm = () => {
        setDeptname('');
        setDeptalias('');
        setDeptstatus(false);
    }

    // const accessToken = token();

    const submitDeptForm = async (e) => {
        e.preventDefault();
        let formData = {
            dept_name: dept_name,
            dept_alias: dept_alias,
            dept_status: status
        }
        const result = await axioslogin.post('/department', formData).then((response) => {
            return response;
        }).catch((error) => {
            return error;
        })

        const resResult = result.data;

        if (resResult.success === 2) {
            infoNofity(resResult.message);
        } else if (resResult.success === 1) {
            succesNofity(resResult.message);
            resetForm();
            setCount(count + 1)
        } else if (resResult.success === 0) {
            errorNofity(resResult.message);

        }
    }

    const columns = useMemo(() => [
        {
            title: 'ID', field: 'dept_id', align: 'left'
        },
        {
            title: 'Department', field: 'dept_name'
        },
        {
            title: 'Alias', field: 'dept_alias'
        },
        {
            title: 'Status', field: 'status'
        },
    ], []);

    const tableData = useMemo(() => data, [data]);

    useEffect(() => {

        axioslogin.get('/department')
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                return error;
            });

    }, [count]);

    const redirectTohome = () => {
        history.push('/Home/Settings')
    }

    return (
        <div>

            <SessionCheck />
            <ToastContainer />
            <div className="card"   >
                <div className="card-header bg-dark pb-0 border border-dark text-white" >
                    <h5 >Department</h5>
                </div>
                <div className="card-body">
                    <div className="row">

                        <div className="col-md-4">
                            <form onSubmit={submitDeptForm} className={classes.root} >
                                <div className="row" >
                                    <div className="col-md-12">
                                        <TextField
                                            label="Department Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            value={dept_name}
                                            onChange={(e) => setDeptname(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextField
                                            label="Short Name"
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            autoComplete="off"
                                            value={dept_alias}
                                            onChange={(e) => setDeptalias(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    name="dept_status"
                                                    color="primary"
                                                    value={dept_status}
                                                    checked={dept_status}
                                                    className="ml-2"
                                                    onChange={(e) => { setDeptstatus(e.target.checked) }}
                                                />
                                            }
                                            label="Department Status"
                                        />
                                    </div>
                                    <div className="form-group col-md-12 row " >
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-2">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                fullWidth
                                                type="Submit"
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
                                                onClick={redirectTohome}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <div >
                                <DepartmentTable coloumns={columns} data={tableData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Departmentmaster)
