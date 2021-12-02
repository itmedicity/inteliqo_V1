import { Button, Checkbox, FormControlLabel, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { axioslogin } from 'src/views/Axios/Axios';
import SessionCheck from 'src/views/Axios/SessionCheck';
// import { token } from 'src/views/Constant/Constant';
import { succesNofity, errorNofity, infoNofity } from 'src/views/CommonCode/Commonfunc';
import { employeeNumber } from 'src/views/Constant/Constant';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
}));

const DeptEdit = () => {

    const history = useHistory();
    const { id } = useParams();
    const classes = useStyles();
    // const accessToken = token();
    const [deptDetl, setEditdeptname] = useState({
        dept_name: '',
        dept_alias: '',
        dept_status: false
    });

    const redirectTohome = () => {
        history.push('/Home/DepartmentMaster')
    }

    useEffect(() => {

        axioslogin.get(`/department/${id}`)
            .then((response) => {
                if (response.data.success === 1) {
                    var deptData = response.data.data[0];
                    var { dept_name, dept_alias, dept_status } = deptData;
                    dept_status = dept_status === 1 ? true : false;
                    const newDPData = {
                        dept_name: dept_name,
                        dept_alias: dept_alias,
                        dept_status: dept_status
                    }
                    setEditdeptname(newDPData)
                }
            })
            .catch((error) => {
                return error;
            })

    }, [id]);

    var { dept_name, dept_alias, dept_status } = deptDetl;

    const departmentInputChage = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setEditdeptname({ ...deptDetl, [e.target.name]: value })
    }

    const DepartmentEditUpdation = (e) => {
        e.preventDefault();
        var { dept_status, dept_name, dept_alias } = deptDetl;
        dept_status = dept_status === true ? 1 : 0;

        const newDeptDetail = {
            dept_status,
            dept_name,
            dept_alias,
            edit_user: employeeNumber(),
            dept_id: id
        }
        dept_status = dept_status === true ? 1 : 0;
        axioslogin.patch('/department', newDeptDetail)
            .then((response) => {
                const { success, message } = response.data;
                if (success === 0) {
                    errorNofity(message)
                } else if (success === 1) {
                    infoNofity(message)
                } else if (success === 3) {
                    infoNofity(message)
                } else if (success === 2) {
                    succesNofity(message, redirectTohome())
                }
            })
            .catch((response) => {
                const { message } = response.data;
                errorNofity(message);
            })
    }

    return (
        <div className="col-md-6" >
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white" >
                    <h5 >Department Edit </h5>
                </div>
                <div className="card-body">
                    <div className="row">

                        <div className="col-md-12">
                            <form className={classes.root} onSubmit={DepartmentEditUpdation} >
                                <div className="row" >
                                    <div className="col-md-12">
                                        <TextField
                                            label="Department Name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="dept_name"
                                            value={dept_name}
                                            onChange={e => departmentInputChage(e)}
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <TextField
                                            label="Short Name"
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            autoComplete="off"
                                            name="dept_alias"
                                            value={dept_alias}
                                            onChange={e => departmentInputChage(e)}
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
                                                    onChange={e => departmentInputChage(e)}
                                                />
                                            }
                                            label="Department Status"
                                        />

                                    </div>
                                    <div className="form-group col-md-12 row" >
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-2 ">
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
                                        <div className="col-md-6 col-sm-12 col-xs-12 mb-2 ">
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
                        {/* <div className="col-md-8">
                            <div >
                                <DepartmentTable coloumns={columns} data={tableData} />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeptEdit
