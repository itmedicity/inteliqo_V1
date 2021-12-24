import { CircularProgress, IconButton, LinearProgress, Typography } from '@mui/material'
import React, { Fragment, Suspense } from 'react'
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import PageLayoutCloseOnly from '../../CommonCode/PageLayoutCloseOnly'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import '../Att_Style.css'
import Moment from 'moment'
import { DATA, empData } from './DummyData'
import { extendMoment } from 'moment-range';
import { eachDayOfInterval } from 'date-fns'
import DropDownList from './DropDownList'
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

const moment = extendMoment(Moment);

const DutyPlanning = () => {

  // const startDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  // var endDate = moment().add(20, 'days').format("dddd, MMMM Do YYYY, h:mm:ss a");

  const startDate = new Date('2021-12-01');
  const endDate = new Date('2021-12-30');

  const rage = eachDayOfInterval(
    // { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
    { start: startDate, end: endDate }
  )

  const newDateFormat = rage.map((val) => { return { date: moment(val).format('MMM-D-dd'), sunday: moment(val).format('d') } })

  // console.log(rage)
  // console.log(startDate)
  // console.log(newDateFormat)

  return (
    <Fragment>
      <PageLayoutCloseOnly heading="Duty Planning" >
        <div className="col-md-12 mb-2">
          <div className="row g-2">
            <div className="col-md-2">
              <TextInput
                type="date"
                classname="form-control form-control-sm custom-datefeild-height"
                Placeholder="Date"
                name="start_date"
              // value={start_date}
              />
            </div>
            <div className="col-md-2">
              <TextInput
                type="date"
                classname="form-control form-control-sm custom-datefeild-height"
                Placeholder="Date"
                name="start_date"
              // value={start_date}
              />
            </div>
            <div className="col-md-3">
              <TestSelectComponent select="Department" style={SELECT_CMP_STYLE} />
            </div>
            <div className="col-md-3">
              <TestSelectComponent select="Department Section" style={SELECT_CMP_STYLE} />
            </div>
            <div className="col-md-1 text-center">
              <IconButton
                aria-label="add"
                style={{ padding: '0rem' }}
              >
                <MdOutlineAddCircleOutline className="text-info" size={30} />
              </IconButton>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className='table-responsive table-responsive-md' >
                <table className="table table-sm table-bordered planTable " >
                  <thead>
                    <tr>
                      <th width="100" className='pt-2'  >
                        <Typography variant="subtitle2" >
                          Name
                        </Typography>
                      </th>
                      <th width="100" >
                        <Typography variant="subtitle2" >
                          Emp ID
                        </Typography>
                      </th>
                      {
                        newDateFormat.map((val) => {
                          return <th className='text-center'
                            key={val.date}
                            style={val.sunday === '0' ? { color: "#cb5966", backgroundColor: "#a6b2b5" } : null}
                          >
                            <Typography variant="subtitle2">
                              {val.date}
                            </Typography>
                          </th>
                        })
                      }
                      <th>
                        {/* <CircularProgress color="secondary" size={18} /> */}
                        <ViewComfyIcon size={18} style={{ color: "blue" }} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <Suspense fallback={<LinearProgress />} >
                      {
                        empData.map((name) => {
                          // console.log(name)
                          const data = {
                            emp_id: name.emp_id,
                            start: startDate,
                            end: endDate,
                          }
                          return <tr key={name.name} >
                            <td width="100" className='pt-2' >
                              <Typography variant="subtitle2">
                                {name.name}
                              </Typography>
                            </td>
                            <td width="100">{name.emp_id}</td>
                            <Suspense fallback={<LinearProgress />} >
                              <DropDownList data={data} />
                            </Suspense>
                          </tr>
                        })
                      }
                    </Suspense>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </PageLayoutCloseOnly>
    </Fragment>
  )
}

export default DutyPlanning
