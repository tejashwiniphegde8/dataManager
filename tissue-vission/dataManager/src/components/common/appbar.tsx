import {Box,Typography} from '@mui/material'

const AppBar: React.FC = () => {
    return (
       <>
        <Box sx={{
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'white',
          padding: 2,
          boxShadow: "0px 10px 10px 0px rgba(0, 0, 0, 0.1)"
        }}>
          <Typography variant="h6" sx={{ color: 'black', textAlign: 'left', fontWeight: 'bold' }}>
            Data Manager
          </Typography>
        </Box>
        </>
    )
}

export default AppBar