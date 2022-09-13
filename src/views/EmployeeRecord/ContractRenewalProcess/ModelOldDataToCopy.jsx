import { Button, Dialog, DialogActions, DialogContent, Slide } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import ModelProcessCompleted from './ModelProcessCompleted'
import ModelProcessComponent from './ModelProcessComponent'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const ModelOldDataToCopy = ({ open, handleClose }) => {
    const modeldata = useSelector((state) => {
        return state.getContractClosedata.olDataTocopy.dataTocopy
    })
    const [salaryprocess, setsalaryprocess] = useState(0)
    const { salaryinformation } = modeldata
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona">
                <DialogContent sx={{
                    minWidth: 600,
                    maxWidth: 600
                }}>
                    {

                        <ModelProcessCompleted
                            name={'Personal Information'}
                        />
                    }
                    {

                        <ModelProcessCompleted
                            name={'Qualification'}

                        />
                    }
                    {
                        <ModelProcessCompleted
                            name={'Experience'}

                        />
                    }
                    {
                        salaryinformation === true && salaryprocess === 0 ?
                            <ModelProcessComponent
                                name={'Salary Information'}
                                value={4}
                                setsalaryprocess={setsalaryprocess}
                            /> :
                            salaryinformation === false ? null :
                                <ModelProcessCompleted
                                    name={'Salary Information'}

                                />
                    }
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose} >close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ModelOldDataToCopy