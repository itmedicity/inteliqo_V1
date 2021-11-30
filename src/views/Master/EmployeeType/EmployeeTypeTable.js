import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MaterialTable from 'material-table';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router';

const EmployeeTypeTable = ({ update }) => {

    const history = useHistory()
    const [tbdata, setData] = useState([]);
    // table titile 
    const columstitle = [
        {
            title: '#', field: 'emptype_slno', width: '5%'
        },
        {
            title: 'Type', field: 'emptype_name'
        },
        {
            title: 'Contract', field: 'cont_period', align: 'center'
        },
        {
            title: 'Renewal', field: 'cont_grace', align: 'center'
        },
        {
            title: 'EL', field: 'status'
        }
    ]
    // get api call for employee type
    useEffect(() => {
        const getEmpType = async () => {
            const result = await axioslogin.get('/emptype');

            const { success, data, message } = result.data;
            if (success === 0 || success === 2) {
                infoNofity(message);
            }
            setData(data);

        }
        getEmpType();
    }, [update]);

    const tableData = useMemo(() => tbdata, [tbdata])
    //getting table data for edit
    const getTableData = (data) => {
        const { emptype_slno } = data
        history.push(`/Home/EmployeeTypeTableEdit/${emptype_slno}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Employee Type"
                data={tableData}
                columns={columstitle}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getTableData(data)
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

export default memo(EmployeeTypeTable)
