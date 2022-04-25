import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState, memo } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import { useHistory } from 'react-router'

const OTUser = () => {
    const [data, setData] = useState();
    const history = useHistory()
    const em_id = useSelector((state) => {
        return state.getProfileData.ProfileData[0].em_id
    })

    const title = [
        {
            title: "SlNo", field: "ot_slno", cellStyle: { minWidth: 100, maxWidth: 250 }
        },
        {
            title: "OT date", field: "ot_days", cellStyle: { minWidth: 10, maxWidth: 300 }
        },
        {
            title: "Requested date", field: "ot_date", cellStyle: { minWidth: 10, maxWidth: 300 }
        },
        {
            title: "Shift Code", field: "shft_code", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
        {
            title: "Over time", field: "over_time", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
        {
            title: "OT Reason", field: "ot_reson", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
        {
            title: "OT Remarks", field: "ot_remarks", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
        {
            title: "OT Status", field: "who", cellStyle: { minWidth: 10, maxWidth: 200 }
        },
    ]

    //Get Data
    useEffect(() => {
        const getOt = async () => {
            const result = await axioslogin.get(`overtimerequest/${em_id}`)
            const { success, data } = result.data;
            if (success === 1) {
                setData(data);
            } else {
                warningNofity(" No OT request is pending")
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
                heading="Over Time Request Table"
                redirect={Redirect}
            >
                <MaterialTable
                    title="Over Time Request Table"
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

export default memo(OTUser)