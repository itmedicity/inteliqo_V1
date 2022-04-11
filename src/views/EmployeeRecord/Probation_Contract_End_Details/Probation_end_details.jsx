import { IconButton } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import TextInput from 'src/views/Component/TextInput'
import Probation_End_Table from './Probation_End_Table'
import Probation_End_TableByDate from './Probation_End_TableByDate'
import { FcPlus } from 'react-icons/fc'
import { axioslogin } from 'src/views/Axios/Axios'

const Probation_end_details = () => {
    const [tableData, setTableData] = useState([]);
    const [state, setState] = useState(0)
    const [formData, setFormData] = useState({
        date_of_join_start: '',
        date_of_join_end: ''
    })
    const { date_of_join_start, date_of_join_end } = formData
    const updateDateOfJoin = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        startdate: date_of_join_start,
        enddate: date_of_join_end
    }
    const getprobationlistbydate = async () => {
        const result = await axioslogin.post('/empcat/probationdetl', postData)
        const { success, data } = result.data
        if (success === 1) {
            setTableData(data)
            setState(1)
        }
        else if (success === 0) {
            setTableData([])
        }
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Probation End List"
            // redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="col-md-2">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Date of Join"
                                name="date_of_join_start"
                                value={date_of_join_start}
                                changeTextValue={(e) => updateDateOfJoin(e)}
                            />
                        </div>
                        <div className="col-md-2">
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Date of Join"
                                name="date_of_join_end"
                                value={date_of_join_end}
                                changeTextValue={(e) => updateDateOfJoin(e)}
                            />
                        </div>
                        <div className="col-md-1">
                            <div>
                                <IconButton
                                    aria-label="add"
                                    style={{ padding: '0rem' }}
                                    onClick={getprobationlistbydate}
                                >
                                    <FcPlus className="text-info" size={30} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    {
                        state === 1 ? <Probation_End_TableByDate tableData={tableData} /> :
                            <Probation_End_Table />
                    }

                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default Probation_end_details