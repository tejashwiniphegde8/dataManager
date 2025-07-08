import Sidebar from "./sideBar"
import {Typography } from '@mui/material';
import AppBar from '../common/appbar'

const LandingPage: React.FC = () => {
    return (
        <>
            <Typography variant="h4" sx={{
                textAlign: 'center',
                mt: 4,
                color: 'black',
                fontWeight: 'bold',
                position: 'fixed',
                top: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1001
            }}>
                Welcome Tejashwini!
            </Typography>
            <AppBar/>
            <Sidebar />
        </>
    )
}

export default LandingPage