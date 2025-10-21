import React, { memo } from 'react'
import { Box, Typography, Card, CardContent } from '@mui/joy'

const TileComponent = ({ label, value, icon, slno, handleOnClick }) => {
  return (
    <Card
      variant="solid"
      color="primary"
      sx={{
        width: 300,
        minHeight: 100,
        //height:250,
        borderRadius: 15,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to right, #5995c6ff, #b6caeaff)',
        color: '#fff',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 12px 25px rgba(0, 0, 0, 0.25)',
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ fontSize: 40, mb: 1 }}>{icon}</Box>

        <Typography level="body-lg" sx={{ fontWeight: 'bold', fontSize: 16, mb: 2 }}>
          {label}
        </Typography>

        <Box
          sx={{
            backgroundColor: '#ffffff',
            color: '#000000ff',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          }}
          onClick={()=>handleOnClick(slno)}
        >
          {value}
        </Box>
      </CardContent>
    </Card>
  )
}

export default memo(TileComponent)
