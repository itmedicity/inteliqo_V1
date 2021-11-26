import { Checkbox, TextField } from '@material-ui/core'
import React, { Fragment } from 'react'
// import { useHistory } from 'react-router'
import PageLayout from 'src/views/CommonCode/PageLayout'

const PersonalInformation = () => {
    // const history = useHistory()
    // const RedirectToProfilePage = () => {
    //     history.push(`/Home/Profile/${4516}`)
    // }
    return (
        <Fragment>
            <PageLayout heading="Personal Information">
                {/* <Button variant="outlined" onClick={RedirectToProfilePage}  >
                    close
                </Button> */}
                <div className="col-md-12">

                    <form>
                        <div className="row">
                            <div className="col-md-8">
                                <TextField
                                    label="Present Address"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    name="Present_Address"
                                />
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    label="Present Pin"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    name="Present_pin"
                                />
                            </div>
                            <div className="col-md-1">
                                <Checkbox
                                    name="copyadd"
                                    color="secondary"
                                    // value={bank_status}
                                    // checked={bank_status}
                                    className="ml-2"
                                // onChange={(e) => updateFormData(e)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9">
                                <TextField
                                    label="Permenant Address"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    name="Permenant_Address"
                                />
                            </div>
                            <div className="col-md-3">
                                <TextField
                                    label="Permenant Pin"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    name="Permenant_pin"
                                />
                            </div>
                        </div>
                        <div className="row">

                        </div>
                    </form>
                </div>
            </PageLayout>
        </Fragment>
    )
}

export default PersonalInformation
