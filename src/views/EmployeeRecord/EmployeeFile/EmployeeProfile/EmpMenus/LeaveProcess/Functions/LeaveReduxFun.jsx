import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { yearlYHolidayList } from './LeaveProcessFun'

import { getHolidayList, getCommonLeave } from 'src/redux/actions/LeaveProcess.action'

const LeaveReduxFun = () => {
  const { id, no } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHolidayList())
    dispatch(getCommonLeave())
  }, [id, no])
  return <div></div>
}

export default memo(LeaveReduxFun)
