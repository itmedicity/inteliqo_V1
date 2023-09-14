import { Box } from '@mui/material'
import React, { lazy } from 'react'
import { useState } from 'react'
import Vaccinationdetails from './Vaccinationdetails'
import { ToastContainer } from 'react-toastify'
import { memo } from 'react'

const FirstdoseNottaken = lazy(() => import('./FirstdoseNottaken'))
const TotalEmployee = lazy(() => import('./TotalEmployee'))
const SeconddoseNottaken = lazy(() => import('./SeconddoseNottaken'))
const ThirddoseNottaken = lazy(() => import('./ThirddoseNottaken'))
const BoosterdoseNottaken = lazy(() => import('./BoosterdoseNottaken'))
const Firstdose = lazy(() => import('./Firstdose'))
const Seconddose = lazy(() => import('./Seconddose'))
const ThirdDose = lazy(() => import('./ThirdDose'))
const Pendingfirst = lazy(() => import('./Pendingfirst'))
const Penbooster = lazy(() => import('./Penbooster'))
const Annualpending = lazy(() => import('./Annualpending'))

const Vaccination = () => {
  const [showGeneral, setShowGeneral] = useState(0)
  const [item, setitem] = useState({})
  const [count, setCount] = useState(0)
  const [state, setstate] = useState(0)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <ToastContainer />
      <Box>
        {showGeneral === 1 ? (
          <TotalEmployee
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 2 ? (
          <FirstdoseNottaken
            item={item}
            setCount={setCount}
            count={count}
            setstate={setstate}
            state={state}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 3 ? (
          <SeconddoseNottaken
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 4 ? (
          <ThirddoseNottaken
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 5 ? (
          <BoosterdoseNottaken
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 6 ? (
          <Firstdose
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 7 ? (
          <Seconddose
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 8 ? (
          <ThirdDose
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 9 ? (
          <Pendingfirst
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 10 ? (
          <Penbooster
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : showGeneral === 11 ? (
          <Annualpending
            item={item}
            setCount={setCount}
            count={count}
            setShowGeneral={setShowGeneral}
          />
        ) : (
          <Box sx={{ width: '100%' }}>
            <Vaccinationdetails
              setShowGeneral={setShowGeneral}
              setitem={setitem}
              count={count}
              setCount={setCount}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(Vaccination)
