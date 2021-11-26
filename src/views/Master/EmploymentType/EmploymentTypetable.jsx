import MaterialTable from 'material-table'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HomeIcon from '@material-ui/icons/Home';
import { memo } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router-dom';

const EmploymentTypetable = () => {
    const history = useHistory();
    const [empTypeData, setempTypeData] = useState([]);
    const title = [
        {
            title: '#', field: 'category_slno', width: '5%'
        },
        {
            title: 'Name', field: 'ecat_name'
        },
        {
            title: 'Employee-Type', field: 'emptype_name'
        },
        {
            title: 'Designation-Type', field: 'empstat_name'
        },
        {
            title: 'Status', field: 'status'
        },
    ]
    useEffect(() => {
        const getEmpTypeData = async () => {
            const result = await axioslogin.get('/empcat');
            const { success, data, message } = result.data;
            if (success === 1) {
                setempTypeData(data);
            } else {
                infoNofity(message);
            }
        }
        getEmpTypeData();
    }, []);

    const tablelist = useMemo(() => empTypeData, [empTypeData])
    const tohomeMaster = () => {
        history.push('/Home/EmploymentType')
    }

    const getTablerowData = (data) => {
        const { category_slno } = data;
        history.push(`/Home/EmploymentTypeEdit/${category_slno}`);
    }

    return (
        <Fragment>
            <MaterialTable
                title="Employment Type List"
                data={tablelist}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getTablerowData(data)
                    },
                    {
                        icon: () => <HomeIcon color="secondary" />,
                        tooltip: "Go Back To Home ",
                        onClick: (e, data) => tohomeMaster(),
                        isFreeAction: true
                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1
                }}

            />
        </Fragment>
    )
}

export default memo(EmploymentTypetable)
