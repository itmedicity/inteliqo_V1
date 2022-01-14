import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useHistory } from 'react-router'
import EducationSelection from 'src/views/CommonCode/EducationSelection'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import BoardMastTable from './BoardMastTable'

const BoardMaster = () => {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    const history = useHistory();
    const { selectEducation, updateEducation } = useContext(PayrolMasterContext);

    //Initializing
    const [type, setType] = useState({
        board_name: '',
        education_slno: '',
        board_status: false,
        create_user: ''
    })

    //Destructuring
    const { board_name, board_status } = type;
    const updateBoard = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setType({ ...type, [e.target.name]: value })
    }

    //Insert
    const postBoardData = {
        board_name,
        education_slno: selectEducation,
        board_status: board_status === true ? 1 : 0,
        create_user: employeeNumber()
    }

    //Form resting
    const resetForm = {
        board_name: '',
        education_slno: '',
        board_status: false
    }
    const reset = () => {
        updateEducation(0)
    }

    //Form Submitting
    const submitBoard = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/boardEdu', postBoardData)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setCount(count + 1);
            setType(resetForm);
            reset();
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
            <SessionCheck />
            <ToastContainer />
            <PageLayout heading="Board">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <form className={classes.root} onSubmit={submitBoard}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextField
                                            label="Board_name"
                                            fullWidth
                                            size="small"
                                            autoComplete="off"
                                            variant="outlined"
                                            required
                                            name="board_name"
                                            value={board_name}
                                            onChange={(e) => updateBoard(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <EducationSelection />
                                    </div>
                                    <div className="col-md-12">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="board_status"
                                                    color="primary"
                                                    value={board_status}
                                                    checked={board_status}
                                                    className="ml-2"
                                                    onChange={(e) => updateBoard(e)}
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
                            <BoardMastTable update={count} />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default BoardMaster
