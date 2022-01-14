import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import SessionCheck from 'src/views/Axios/SessionCheck'
import EducationSelection from 'src/views/CommonCode/EducationSelection'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayout from 'src/views/CommonCode/PageLayout'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import BoardMastTable from './BoardMastTable'

const BoardMastTableEdit = () => {
    const history = useHistory()
    const classes = useStyles()
    const { id } = useParams()
    const { selectEducation, updateEducation } = useContext(PayrolMasterContext);

    //Initializing
    const [board, setBoard] = useState({
        board_name: '',
        education_slno: '',
        board_status: false,

    })

    //Destucturing
    const { board_name, board_status } = board;
    const updateBoard = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setBoard({ ...board, [e.target.name]: value })
    }

    //Get data by ID
    useEffect(() => {
        const getBoard = async () => {
            const result = await axioslogin.get(`/boardEdu/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { board_name, education_slno, board_status } = data[0]
                const frmdata = {
                    board_name: board_name,
                    education_slno: updateEducation(education_slno),
                    board_status: board_status === 1 ? true : false
                }
                setBoard(frmdata)
            }
        }
        getBoard()
    }, [id, updateEducation])

    const postBoardData = {
        board_name,
        education_slno: selectEducation,
        board_status: board_status === true ? 1 : 0,
        edit_user: employeeNumber(),
        board_slno: id
    }
    const resetForm = {
        board_name: '',
        education_slno: '',
        board_status: false,
    }
    const reset = () => {
        updateEducation(0)
    }

    //update
    const submitBoard = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/boardEdu', postBoardData)
        const { message, success } = result.data;
        if (success === 2) {
            setBoard(resetForm);
            reset();
            history.push('/Home/BoardEdu');
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    //Back to homes
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
                                            label="Board Name"
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
                            <BoardMastTable />
                        </div>
                    </div>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default BoardMastTableEdit
