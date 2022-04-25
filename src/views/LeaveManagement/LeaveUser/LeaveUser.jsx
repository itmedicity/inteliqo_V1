import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState, memo } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import { useHistory } from 'react-router'

const LeaveUser = () => {
    const [data, setData] = useState();
    const history = useHistory()
    const em_id = useSelector((state) => {
        return state.getProfileData.ProfileData[0].em_id
    })

    const title = [
        {
            title: "SlNo", field: "leave_slno", cellStyle: { minWidth: 100, maxWidth: 250 }
        },
        {
            title: "Leave date", field: "leave_date", cellStyle: { minWidth: 10, maxWidth: 300 }
        },
        {
            title: "Requested date", field: "request_date", cellStyle: { minWidth: 10, maxWidth: 300 }
        },
        {
            title: "Leave Reason", field: "leave_reason", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
        {
            title: "Status", field: "who", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
    ]

    //Get Data
    useEffect(() => {
        const getOt = async () => {
            const result = await axioslogin.get(`/Count/${em_id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setData(data);
            } else {
                warningNofity(" No Leave request is pending")
            }
        }
        getOt();

    }, [em_id]);
    const Redirect = () => {
        history.push(`/Home`)
    }
    return (
        < Fragment >
            <PageLayoutCloseOnly
                heading="Leave Request Table"
                redirect={Redirect}
            >
                <MaterialTable
                    title="Leave Request Table"
                    data={data}
                    columns={title}
                    icons={tableIcons}

                    options={{
                        paginationType: "stepped",
                        showFirstLastPageButtons: false,
                        padding: "dense",
                        actionsColumnIndex: -1
                    }}
                />
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default memo(LeaveUser)