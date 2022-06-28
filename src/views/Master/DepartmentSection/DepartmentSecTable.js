import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { useHistory } from 'react-router-dom'
// import { token } from 'src/views/Constant/Constant'

const DepartmentSecTable = ({ message }) => {
    const history = useHistory();
    // const accessToken = token();
    // Table Head
    const ColumData = [
        {
            title: 'ID', field: 'sect_id', align: 'left', width: '5%'
        },
        {
            title: 'Section Name', field: 'sect_name', align: 'left'
        },
        {
            title: 'Department', field: 'dept_name', align: 'left'
        },
        {
            title: 'Sub Section', field: 'sub_sect_name', align: 'left', width: '10 % '
        },
        {
            title: 'Incharge Authorization', field: 'authorization_incharge', align: 'left'
        },
        {
            title: 'HOD Authorization', field: 'authorization_hod', align: 'left'
        },
        {
            title: 'Status', field: 'status'
        },
    ]
    //get department section data
    const [secData, setSecData] = useState([]);
    useEffect(() => {
        const getdeptsecData = async () => {
            const result = await axioslogin.get('/section');
            const data = result.data;
            if (data.success === 2 || data.success === 0) {
                infoNofity('Somthing wrong to fetch data')
            }
            setSecData(data.data);
        }
        getdeptsecData();
    }, [message]);
    // memmorise sec data for avoid rerender
    const tableData = useMemo(() => secData, [secData]);
    // redirect to edit page 
    const redirToSectionEdit = (data) => {
        const { sect_id } = data;
        history.push(`/Home/SectionEdit/${sect_id}`);
    }
    return (
        <Fragment>
            <MaterialTable
                title="Department Section"
                icons={tableIcons}
                data={tableData}
                columns={ColumData}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => redirToSectionEdit(data)
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

export default memo(DepartmentSecTable)
