import { IconButton } from '@mui/material'
import React, { Fragment } from 'react'
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

const moment = extendMoment(Moment);

const DutyPlanning = () => {

  // const startDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  // var endDate = moment().add(20, 'days').format("dddd, MMMM Do YYYY, h:mm:ss a");

  const startDate = new Date('2021-12-01');
  const endDate = new Date('2021-12-31');

  const rage = eachDayOfInterval(
    // { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) }
    { start: startDate, end: endDate }
  )

  const newDateFormat = rage.map((val) => moment(val).format('D-MMM'))

  // console.log(rage)
  // console.log(startDate)
  console.log(newDateFormat)

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
                <table className="table" >
                  <thead>
                    <tr className='trHeadColor' >
                      <th>Name</th>
                      {
                        newDateFormat.map((val) => {
                          return <th key={val} >{val}</th>
                        })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      empData.map((name) => {
                        // console.log(name)
                        return <tr key={name.name} >
                          <th>{name.name}</th>
                          {/* {
                            testArray.map((val) => {
                              return <td key={val}>val</td>
                            })
                          } */}
                        </tr>
                      })
                    }
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
