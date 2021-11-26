import MaterialTable from 'material-table';
import React, { memo } from 'react';
import { tableIcons } from '../Constant/MaterialIcon';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom';

const DepartmentTable = (props) => {

    const history = useHistory();
    const { coloumns, data } = props;
    const redirectDeptEdit = (data) => {
        let { dept_id } = data;
        history.push(`/Home/EditDepartment/${dept_id}`);
    }
    return (
        <div>
            <MaterialTable
                title="Department List"
                data={data}
                columns={coloumns}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => redirectDeptEdit(data)
                    }
                ]}
                options={{
                    paginationType: "stepped",
                    showFirstLastPageButtons: false,
                    padding: "dense",
                    actionsColumnIndex: -1
                }}

            />
        </div>
    )
}

export default memo(DepartmentTable)
