import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';

const SpecializationTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    //table
    const title = [
        {
            title: "SlNo", field: "spec_slno"
        },
        {
            title: "Specialization", field: "spec_desc"
        },
        {
            title: "Course ", field: 'cour_desc'
        },
        {
            title: "Status", field: "spec_status"
        },
    ]

    //Get data
    useEffect(() => {
        const getSpec = async () => {
            const result = await axioslogin.get('/specilization')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getSpec();
    }, [update]);

    //for edit
    const getDataTable = (data) => {
        const { spec_slno } = data
        history.push(`/Home/SpecializationTableEdit/${spec_slno}`)
    }
    return (
        <Fragment>
            <MaterialTable
                title="Specialization"
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

export default memo(SpecializationTable)
