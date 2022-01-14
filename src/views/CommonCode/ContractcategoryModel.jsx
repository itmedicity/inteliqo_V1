import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { DialogContent } from '@material-ui/core';
import EmployeCategoryContract from './EmployeCategoryContract';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';
import { succesNofity, warningNofity } from './Commonfunc';


const ContractcategoryModel = ({ em_category, id, setcategorysave, setmodelcate }) => {
    const [modelcat, setmodelcat] = useState(true)
    // useContext
    const { categorycontract, updatecategorycontract } = useContext(PayrolMasterContext)
    useEffect(() => {

        updatecategorycontract(em_category)
    }, [em_category, updatecategorycontract])

    const changecategory = async () => {
        const updatecategory = {
            em_category: categorycontract,
            em_no: id

        }

        const result = await axioslogin.patch('/empmast/updatecategory', updatecategory)

        const { success, message } = result.data;

        if (success === 2) {
            succesNofity(message)
            setmodelcat(false)
            setcategorysave(1)
            setmodelcate(0)
        }
        else {
            warningNofity("Contact Edp")
            setmodelcate(0)
        }

    }

    const handleonchange = () => {
        setmodelcat(false)
        setmodelcate(0)
    }

    return (

        <Fragment>


            <Dialog open={modelcat}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do You Want To Change The Employee Category
                    </DialogContentText>
                    <EmployeCategoryContract style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} em_category={em_category} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleonchange}>Cancel</Button>
                    <Button onClick={changecategory}>save </Button>
                </DialogActions>
            </Dialog>

        </Fragment>

    )
}

export default memo(ContractcategoryModel)
