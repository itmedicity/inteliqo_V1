import { DatePicker, LocalizationProvider } from '@mui/lab';
import React, { useState } from 'react';
import SessionCheck from 'src/views/Axios/SessionCheck';
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn';
import TextInput from 'src/views/Component/TextInput';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { useStyles } from 'src/views/CommonCode/MaterialStyle';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FullPageloader from 'src/components/FullPageloader';
import { Spinner } from 'react-bootstrap';


function ManpowerRequest() {



    return (
        <div></div>
        // <div className="app-container" >
        //     <table >
        //         <thead>
        //             <tr>
        //                 <th>Name</th>
        //                 <th>Address</th>
        //                 <th>Phone Number</th>
        //                 <th>Email</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {
        //                 contact && contact.map((val, index) => {

        //                     return <tr key={index} >
        //                         <td>{val.fullName}</td>
        //                         <td>{val.address}</td>
        //                         <td>{val.phoneNumber}</td>
        //                         <td>{val.email}</td>
        //                     </tr>
        //                 })
        //             }

        //         </tbody>
        //     </table>
        // </div>
    )
}

export default ManpowerRequest
