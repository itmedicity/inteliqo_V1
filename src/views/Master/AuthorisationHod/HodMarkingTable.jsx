import MaterialTable from 'material-table'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { MdDelete } from "react-icons/md"

const HodMarkingTable = ({ update }) => {
    const [data, setData] = useState();
    const [count, setcount] = useState(0);

    const title = [
        {
            title: 'Slno', field: 'auth_slno'
        },
        {
            title: 'Department Section', field: 'dept_name'
        },
        {
            title: 'Authorization post', field: 'auth_post'
        },
        {
            title: 'Hod / Incharge Department', field: 'dept_name_post'
        },
        {
            title: 'Hod / Incharge Name', field: 'name_emp'
        },
    ]

    //Get Data
    useEffect(() => {
        const getauthorization = async () => {
            const result = await axioslogin.get('/authorization')
            const { success, data } = result.data;
            if (success === 1) {
                setData(data);
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getauthorization();
    }, [update, count]);

    const deleteAuthorization = async (getdata) => {
        const { auth_slno } = getdata
        const result = await axioslogin.delete(`/authorization/${auth_slno}`)
        const { message, success } = result.data;
        if (success === 1) {
            setcount(count - 1)
            succesNofity(message);
        } else {
            warningNofity(" Error occured contact EDP")
        }
    }

    return (
        <Fragment>
            <MaterialTable
                title="Department Wise HOD and Incharge"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <MdDelete size={26} color="secondary" />,
                        tooltip: "Click here to Delete",
                        onClick: (e, data) => deleteAuthorization(data)
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

export default memo(HodMarkingTable)
