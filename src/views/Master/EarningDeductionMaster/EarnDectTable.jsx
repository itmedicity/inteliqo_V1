import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import { useHistory } from 'react-router';

const EarnDectTable = (upadte) => {
    const [tbleData, settableData] = useState([])
    const history = useHistory()
    const title = [
        {
            title: '#', field: 'earnded_id'
        },
        {
            title: 'Earn/Deduction', field: 'earnded_name'
        },
        {
            title: 'Esi', field: 'include_esi'
        },
        {
            title: 'Include Lwf', field: 'include_lwf'
        },
        {
            title: 'Include Pf', field: 'include_pf'
        },
        {
            title: 'Include Pro tax', field: 'include_protax'
        },
        {
            title: 'Earn Type', field: 'earning_type_name'
        },
        {
            title: 'Status', field: 'earnded_status'
        },
    ]

    // useeffect for get data to table
    useEffect(() => {

        const getdata = async () => {
            const result = await axioslogin.get('/earn');
            const { success, data, message } = result.data;
            if (success === 1) {
                settableData(data);
            } else {
                infoNofity(message);
            }

        }

        getdata();
    }, [upadte])

    // edit click function

    const editmoearndeduct = (data) => {

        const { earnded_id } = data
        history.push(`/Home/EarnDectEdit/${earnded_id}`)

    }


    return (
        <Fragment>
            <MaterialTable
                title="Earn/Deduction"
                data={tbleData}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => editmoearndeduct(data)
                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: 0
                }}
            />


        </Fragment>
    )
}

export default EarnDectTable
