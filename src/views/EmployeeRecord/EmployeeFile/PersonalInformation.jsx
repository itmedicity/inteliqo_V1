import { FormControl, IconButton, MenuItem, Select } from '@material-ui/core'
import { CheckBox, Label } from '@material-ui/icons'
import React, { Fragment } from 'react'
import BloodGroupSelect from 'src/views/CommonCode/BloodGroupSelect'
import PageLayout from 'src/views/CommonCode/PageLayout'
import RegionSelect from 'src/views/CommonCode/RegionSelect'
import ReligionSelect from 'src/views/CommonCode/ReligionSelect'
import TextInput from 'src/views/Component/TextInput'
import Spinner from '../../../assets/brand/Eclipse.gif'
import './EmpStyle.css'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { useHistory } from 'react-router'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import { MdOutlineAddCircleOutline } from 'react-icons/md'

const PersonalInformation = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${4516}/${4516}`)
    }
    return (
        <Fragment>
            <PageLayout heading="Personal Information">
                <div className="card">
                    <div className="card-body">
                        <div className="row g-1">
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-header">
                                        Present Address
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-1">
                                            <div className="col-md-12">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Address 1"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Address 2"
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <RegionSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                            </div>
                                            <div className="col-md-4">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Pincode"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-header">
                                        Permanent Address
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-1">
                                            <div className="col-md-12">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Address 1"
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Address 2"
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <RegionSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                                            </div>
                                            <div className="col-md-4">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Pincode"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-2 d-flex justify-content-evenly">
                                <img src={Spinner} className="img-thumbnail border-2 empImage" />
                            </div>
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body pb-1 pt-2">
                                        <div className="row g-1">
                                            <div className="col-md-2">
                                                <FormControl
                                                    fullWidth
                                                    margin="dense"
                                                    className="mt-1"
                                                >
                                                    <Select
                                                        name="Selectgender"
                                                        // value={Selectgender}
                                                        // onChange={(e) => updateFormData(e)}
                                                        fullWidth
                                                        variant="outlined"
                                                        className="ml-1"
                                                        defaultValue={0}
                                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}

                                                    >
                                                        <MenuItem value='0' disabled>Gender</MenuItem>
                                                        <MenuItem value='1'>Male</MenuItem>
                                                        <MenuItem value='2'>Female</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Mobile No"
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Land Phone No"
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Passsport Number"
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Driving License"
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Adhar No"
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-1 pb-0">
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Email Address"
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <ReligionSelect
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <FormControl
                                                    fullWidth
                                                    margin="dense"
                                                    className="mt-1"
                                                >
                                                    <Select
                                                        name="Marital Status"
                                                        // value={Selectgender}
                                                        // onChange={(e) => updateFormData(e)}
                                                        fullWidth
                                                        variant="outlined"
                                                        className="ml-1"
                                                        defaultValue={0}
                                                        style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}

                                                    >
                                                        <MenuItem value='0' disabled>Marital Status</MenuItem>
                                                        <MenuItem value='1'>Married</MenuItem>
                                                        <MenuItem value='2'>UnMarried</MenuItem>
                                                        <MenuItem value='2'>Widow</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-md-2">
                                                <BloodGroupSelect
                                                    style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Date Of Birth"
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <TextInput
                                                    type="text"
                                                    classname="form-control form-control-sm"
                                                    Placeholder="Age as of Now"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-1">
                                    <div className="col-md-6">
                                        <div className="card mt-1">
                                            <div className="card-header pt-1 pb-1">
                                                Family Details
                                            </div>
                                            <div className="card-body pb-1 pt-2">
                                                <div className="row g-1">
                                                    <div className="col-md-3">
                                                        <FormControl
                                                            fullWidth
                                                            margin="dense"
                                                            className="mt-1"
                                                        >
                                                            <Select
                                                                name="relationShip"
                                                                // value={Selectgender}
                                                                // onChange={(e) => updateFormData(e)}
                                                                fullWidth
                                                                variant="outlined"
                                                                className="ml-1"
                                                                defaultValue={0}
                                                                style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }}

                                                            >
                                                                <MenuItem value='0' disabled>Relation</MenuItem>
                                                                <MenuItem value='1'>Father</MenuItem>
                                                                <MenuItem value='2'>Mother</MenuItem>
                                                                <MenuItem value='2'>Brother</MenuItem>
                                                                <MenuItem value='2'>Sister</MenuItem>
                                                                <MenuItem value='2'>Spouse</MenuItem>
                                                                <MenuItem value='2'>Children</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder="Name Of the Family Members"
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <TextInput
                                                            type="text"
                                                            classname="form-control form-control-sm"
                                                            Placeholder="Hospital MRD No"
                                                        />
                                                    </div>
                                                    <div className="col-md-1 text-center" >
                                                        <IconButton aria-label="add" style={{ padding: "0rem" }} >
                                                            <MdOutlineAddCircleOutline className="text-info" size={30} />
                                                        </IconButton>
                                                    </div>
                                                </div>
                                                <div className="row g-1 familydetl table-wrapper-scroll-y my-custom-scrollbar mt-2">
                                                    <table className="table table-bordered table-striped mb-0 ">
                                                        {/* <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">First</th>
                                                                <th scope="col">Last</th>
                                                                <th scope="col">Handle</th>
                                                            </tr>
                                                        </thead> */}
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">1</th>
                                                                <td>Father</td>
                                                                <td>Name Of the Father</td>
                                                                <td>H-12456</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">2</th>
                                                                <td>Father</td>
                                                                <td>Name Of the Father</td>
                                                                <td>H-12456</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">3</th>
                                                                <td>Father</td>
                                                                <td>Name Of the Father</td>
                                                                <td>H-12456</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">4</th>
                                                                <td>Father</td>
                                                                <td>Name Of the Father</td>
                                                                <td>H-12456</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">5</th>
                                                                <td>Father</td>
                                                                <td>Name Of the Father</td>
                                                                <td>H-12456</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card mt-1">
                                            <div className="card-header pt-1 pb-1">
                                                Language Known
                                            </div>
                                            <div className="card-body pb-1 pt-2">
                                                <div className="row g-1">
                                                    <table className="table table-striped table-bordered mb-1 ">
                                                        <thead>
                                                            <tr className="text-center" >
                                                                <th scope="col" className="p-0 m-0" >Language</th>
                                                                <th scope="col" className="p-0 m-0">Write</th>
                                                                <th scope="col" className="p-0 m-0">Speak</th>
                                                                <th scope="col" className="p-0 m-0">Read</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="text-center" >
                                                                <th scope="row" className="p-0 m-0">Malayalam</th>
                                                                <td className="p-0 m-0" >
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr className="text-center" >
                                                                <th scope="row" className="p-0 m-0">Hindi</th>
                                                                <td className="p-0 m-0" >
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                            </tr >
                                                            <tr className="text-center">
                                                                <th scope="row" className="p-0 m-0">English</th>
                                                                <td className="p-0 m-0" >
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr className="text-center">
                                                                <th scope="row" className="p-0 m-0">Tamil</th>
                                                                <td className="p-0 m-0" >
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr className="text-center">
                                                                <th scope="row" className="p-0 m-0">Arabic</th>
                                                                <td className="p-0 m-0" >
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                                <td className="p-0 m-0">
                                                                    <CheckBox
                                                                        color="secondary"
                                                                        name="empstatus"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-muted">
                        <FooterClosebtn
                            redirect={RedirectToProfilePage}
                        />
                    </div>
                </div>
            </PageLayout>
        </Fragment >
    )
}

export default PersonalInformation
