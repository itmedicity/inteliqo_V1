import MaterialTable from 'material-table';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { axioslogin } from 'src/views/Axios/Axios';
import { useHistory } from 'react-router';
import { errorNofity } from 'src/views/CommonCode/Commonfunc';

const ProTaxTable = ({ update }) => {
    const [data, setTableData] = useState();
    const history = useHistory();

    //Table
    const title = [
        {
            title: "SlNo", field: "proftax_id", cellStyle: { minWidth: 1, maxWidth: 2 }
        },
        {
            title: "Description", field: "prof_tax_desc", cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: "Salary From", field: "salary_from", cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: "Salary To ", field: "salary_to", cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: "Tax Amount ", field: "tax_amt", cellStyle: { minWidth: 200, maxWidth: 300 }
        },
        {
            title: "Status", field: "status"
        },
    ]

    //Getdata
    useEffect(() => {
        const getTaxList = async () => {
            const result = await axioslogin.get('/proftax')
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data);
            } else {
                errorNofity(" Error occured contact EDP")
            }
        }
        getTaxList();
    }, [update]);

    //For Editing
    const getDataTable = (data) => {
        const { proftax_id } = data
        history.push(`/Home/ProTaxEdit/${proftax_id}`)
    }

    return (
        <Fragment>
            <MaterialTable
                title="Proffessional Tax "
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

export default memo(ProTaxTable)