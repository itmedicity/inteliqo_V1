import React, { Fragment, memo, useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const RegistrationMastTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    //Table
    const title = [
        {
            title: "Reg Slno", field: "reg_id", cellStyle: {
                minWidth: 1,
                maxWidth: 2
            }
        },
        {
            title: "Registration Name", field: "registration_name", cellStyle: {
                minWidth: 100,
                maxWidth: 450
            }
        },
        {
            title: "Status", field: "registration_status"
        },
    ]
    //GetData
    useEffect(() => {
        const getRegistration = async () => {
            const result = await axioslogin.get('/regtype')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getRegistration();
    }, [update]);

    //For Editing
    const getDataTable = (data) => {
        const { reg_id } = data
        history.push(`/Home/RegistrationTableEdit/${reg_id}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Registration Type"
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

export default memo(RegistrationMastTable)
