import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const QualificationTable = ({ update }) => {
    const [data, setTableData] = useState([]);
    const history = useHistory();
    const title = [
        {
            title: 'Sl No', field: 'qual_slno'
        },
        {
            title: 'Qualification', field: 'qual_name'
        },
        {
            title: 'Status', field: 'status'
        }
    ]

    useEffect(() => {
        const getQualificationDetl = async () => {
            const result = await axioslogin.get('/qal');
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getQualificationDetl();
    }, [update]);

    //for edit
    const getDataTable = (data) => {
        const { qual_slno } = data
        history.push(`/Home/QualificationMastTableEdit/${qual_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Qualification List"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getDataTable(data)
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

export default memo(QualificationTable)
