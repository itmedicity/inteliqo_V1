import React, { Fragment, memo, useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { tableIcons } from 'src/views/Constant/MaterialIcon';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity, warningNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router';
import EmailIcon from '@mui/icons-material/Email';
import { format, addMonths } from 'date-fns'
const RegistrationRenew = () => {
    const [data, setTableData] = useState();
    const history = useHistory();

    // table
    const title = [
        {
            title: "SlNo", field: "emqual_slno", cellStyle: { minWidth: 10, maxWidth: 50 }
        },
        {
            title: "Em_No", field: "em_no", cellStyle: { minWidth: 100, maxWidth: 150 }
        },
        {
            title: "Couse", field: 'cour_desc', cellStyle: { minWidth: 100, maxWidth: 300 }
        },
        {
            title: "Specialization", field: "spec_desc", cellStyle: { minWidth: 250, maxWidth: 400 }
        },
        {
            title: "Registration Type", field: "registration_name", cellStyle: { minWidth: 250, maxWidth: 400 }
        },
        {
            title: "Registration No", field: "em_reg_no", cellStyle: { minWidth: 200, maxWidth: 350 }
        },
        {
            title: "Reg Expiry", field: 'em_exp_date', cellStyle: { minWidth: 150, maxWidth: 250 }
        },
        {
            title: "Chellan No", field: "em_chellan", cellStyle: { minWidth: 150, maxWidth: 250 }
        },
        {
            title: "Chellan Expiry", field: 'em_chellan_exp_date', cellStyle: { minWidth: 150, maxWidth: 250 }
        },
    ]
    useEffect(() => {
        const getList = async () => {
            const result = await axioslogin.get('/Count/registration/pending/list')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data);
            }
            else if (success === 0) {
                infoNofity("No Allowance is added to this employee")
            } else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getList();
    }, []);

    //For Edit
    const getDataTable = (data) => {
        const { emqual_slno, em_no, em_id } = data
        // history.push(`/Home/QualificationTableEdit/${emqual_slno}/${em_no}/${em_id}`)
    }


    const sendMessage = (data) => {
        const { em_no, em_id } = data
        const getEmpDetails = async () => {
            const result = await axioslogin.get(`/common/getcompanydetails/${em_no}`)
            const { success, data } = result.data
            if (success === 1) {
                const { em_department, em_dept_section } = data[0]
                const result = format(addMonths(new Date(), 1), "yyyy-MM-dd")
                const postdata = {
                    message_dept: em_department,
                    message_deptsec: em_dept_section,
                    emp_id: em_id,
                    created_date: format(new Date(), "yyyy-MM-dd"),
                    expr_date: result,
                    message: "Registration Expirye soon",
                    created_user: em_no
                }

                const result1 = await axioslogin.post('/qualify/messageinsert', postdata)
                const { message, success } = result1.data;
                if (success === 1) {
                    succesNofity(message);
                } else if (success === 0) {
                    infoNofity(message.sqlMessage);
                } else {
                    infoNofity(message)
                }
            }
            else {
                warningNofity(" Error occured contact EDP")
            }
        }
        getEmpDetails();
    }

    return (
        <Fragment>
            <MaterialTable
                title="Registration Renewal List"
                data={data}
                columns={title}
                icons={tableIcons}
                actions={[
                    {
                        icon: () => <EditOutlinedIcon />,
                        tooltip: "Click here to Edit",
                        onClick: (e, data) => getDataTable(data)
                    },
                    {
                        icon: () => <EmailIcon />,
                        tooltip: "Click here to Send Message",
                        onClick: (e, data) => sendMessage(data)
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

export default memo(RegistrationRenew)