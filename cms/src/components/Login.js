import React, { useState } from 'react';
import '../css/MainCss.css'
//import 'w3-css/w3.css';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import api_URL from '../Helper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
// import Cookies from '../Cookies';
import Cookies from 'js-cookie';
import Header from './Header';
import useMessageDialog from '../CustomHooks/useMessageDialog';



const Login = ({ onLogin }) => {

    const navigate = useNavigate();

    const [modalShow, setModalShow] = React.useState(false);
    const [errorMessage, setError] = useState(null);
    const { showMessageDialog, DialogComponent } = useMessageDialog();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            userid: data.get('userid'),
            password: data.get('password'),
        }

        try {
            var saved = await fetch(`${api_URL}/api/login/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (saved.status === 200) {
                const response = await saved.json();
                // Cookies.setItem('user', JSON.stringify(response.user), 2);
                // Cookies.setItem('token', response.auth, 2);
                Cookies.set('user', JSON.stringify(response.user), { expires: 5 / 24 });
                Cookies.set('token', response.auth, { expires: 5 / 24 });
                onLogin();
                //sessionStorage.setItem('token',response.auth);
                //sessionStorage.setItem('user', JSON.stringify(response.user)); // Use setItem to store data
                //localStorage.setItem('user', JSON.stringify(response.user)); // Use setItem to store data
                //localStorage.setItem('token', response.auth); // Use setItem to store data
                navigate('/dashboard');
            }
            else {
                const error = await saved.json();
                await showMessageDialog("Login Error",error.error);
                console.log("Request was not successful. Status Code : " + saved.status)
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            {DialogComponent}
            
            <div className='login-container'>
                <div>
                    <NavBar />
                    <Header />
                </div>
                <Grid container component="main">
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="userid"
                                    label="Email Address"
                                    name="userid"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                {/* <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid> */}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default Login;