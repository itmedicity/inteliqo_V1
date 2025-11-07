import { CircularProgress } from '@mui/material'

import React, { memo } from 'react'
import { Avatar } from '@mui/joy'
import { getEmpProfileImage, getHospitalLogo } from 'src/redux/reduxFun/useQueryFunctions'
import { useQuery } from 'react-query'

const CustomAvatar = ({ id }) => {
  const { data: image } = useQuery({
    queryKey: ['profileImage', id],
    queryFn: () => getEmpProfileImage(id),
    enabled: !!getEmpProfileImage,
    staleTime: Infinity,
  })

  const { data: logo } = useQuery({
    queryKey: ['hospitallogo'],
    queryFn: getHospitalLogo,
  })

  return (
    <>
      {image === undefined ? (
        <Avatar
          sx={{
            width: 40, // Adjust the size of the avatar itself
            height: 40, // Adjust the size of the avatar itself
            '& img': {
              objectFit: 'contain', // Ensures image doesn't stretch or overflow
              width: '100%', // You can adjust the size of the image within the Avatar
              height: '100%', // You can adjust the size of the image within the Avatar
            },
          }}
          src={logo}
        >
          <CircularProgress />
        </Avatar>
      ) : (
        <Avatar src={image} />
      )}
    </>
  )
}

export default memo(CustomAvatar)
