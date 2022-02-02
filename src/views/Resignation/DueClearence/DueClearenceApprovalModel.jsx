import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Slide, TextareaAutosize } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const DueClearenceApprovalModel = ({ open, handleClose, slno }) => {
    useEffect(() => {
        const getDueDetails = async () => {
            const result = await axioslogin.get(`/dueclearence/${slno}`)
        }
        getDueDetails()
    }, [])
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                <DialogTitle>
                    {"Due Clearence"}
                </DialogTitle>
                <DialogContent sx={{
                    minWidth: 800,
                    maxWidth: 800,
                    width: 800,
                }}>
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-1">
                                <div className="d-flex justify-content-center">
                                    <div className="col-md-4">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="approve"
                                                    color="primary"
                                                    //value={approve}
                                                    // checked={approve}
                                                    // disabled={reject === true ? true : false}
                                                    className="ml-2 "
                                                // onChange={(e) =>
                                                //     updateInchargeApproval(e)
                                                // }
                                                />
                                            }
                                            label="Approve"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="approve"
                                                    color="primary"
                                                    //value={approve}
                                                    // checked={approve}
                                                    // disabled={reject === true ? true : false}
                                                    className="ml-2 "
                                                // onChange={(e) =>
                                                //     updateInchargeApproval(e)
                                                // }
                                                />
                                            }
                                            label="Reject"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <FormControlLabel
                                            className="pb-0 mb-0"
                                            control={
                                                <Checkbox
                                                    name="approve"
                                                    color="primary"
                                                    //value={approve}
                                                    // checked={approve}
                                                    // disabled={reject === true ? true : false}
                                                    className="ml-2 "
                                                // onChange={(e) =>
                                                //     updateInchargeApproval(e)
                                                // }
                                                />
                                            }
                                            label="Hold"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row g-1">
                                <div className="col-md-12" >
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        minRows={3}
                                        placeholder="Comment"
                                        style={{ width: 500 }}
                                        name="resign_cancel"
                                    //value={resign_cancel}
                                    // onChange={(e) => updateResignCancel(e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary"  >Submit</Button>
                    <Button onClick={handleClose} color="primary" >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
};

export default DueClearenceApprovalModel;
