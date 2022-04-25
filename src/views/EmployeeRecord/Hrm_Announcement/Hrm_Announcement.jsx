import { TextareaAutosize } from '@material-ui/core'
import React, { Fragment, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import moment from 'moment'
import { addDays } from 'date-fns/esm'

const Hrm_Announcement = () => {
    const { updateBranchSelected,
    } = useContext(PayrolMasterContext);
    const em_id = useSelector((state) => {
        return state.getProfileData.ProfileData[0].em_id
    })
    const [formData, setFormData] = useState({
        announcement: '',
        announcemntexprdays: ''

    })
    const { announcement, announcemntexprdays } = formData
    const defaultState = {
        announcement: '',
        announcemntexprdays: ''
    }
    const updateannouncement = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const postData = {
        Announcement: announcement,
        expr_days: moment(addDays(new Date(), announcemntexprdays)).format('YYYY-MM-DD'),
        created_user: em_id,
    }
    //save
    const submitFormData = async () => {
        if (announcemntexprdays !== '') {
            const result = await axioslogin.post('/hrmAnnouncement', postData)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                setFormData(defaultState)
                updateBranchSelected(0)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                errorNofity("Error Occured!!!Please Contact EDP")
            }
        }
        else {
            warningNofity("Announcement Expiry Days Is Null")
        }
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Announcement"
                redirect={RedirectToProfilePage}
                submit={submitFormData}
            >
                <form>
                    <div className="col-md-12">
                        <div className="row g-1">
                            <div className="col-md-4">
                                <div className="row g-1">
                                    <div className="col-md-12">
                                        <BrnachMastSelection style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-12">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Announcement Expiry Days"
                                            name="announcemntexprdays"
                                            value={announcemntexprdays}
                                            changeTextValue={(e) => updateannouncement(e)}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-3">
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Announcement"
                                    style={{ width: 600, height: 73 }}
                                    name="announcement"
                                    value={announcement}
                                    onChange={(e) => updateannouncement(e)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </PageLayoutSave>
        </Fragment>
    )
}

export default Hrm_Announcement