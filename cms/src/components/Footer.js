// // Copyright © 2022 Dr Bhimrao Ambedkar University, Agra                                      Design & Developed by: Dr. Bhimrao Ambedkar University, Agra

// import '../css/Header.css'

// const Footer = () =>{
//     const currentYear = new Date().getFullYear();
//     return(
//         <div className="footer">
//            <p>Copyright <sup>©</sup> {currentYear} SMSDC, Hathras <span style={{ margin: '0 80px' }}></span> Design & Developed by: SMSDC, Hathras</p>
//         </div>
//     );
// }

// export default Footer;

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="/">
                SMSDC
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CssBaseline />
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        mt: 'auto',
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography variant="body1">
                            Design & Developed by: SMSDC, Hathras.
                        </Typography>
                        <Copyright />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}