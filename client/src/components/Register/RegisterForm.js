// react
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

// api
import {registerUser} from '../../services/api'
import { useAuthContext } from "../../hooks/useAuthContext"

// material ui
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'


// default values of form
const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const RegisterForm = () => {

    const defaultTheme = createTheme();

    // navigating
    const navigate = useNavigate()

    // adding data to form
    const [user, setUser] = useState(defaultValues)

    const { dispatch } = useAuthContext()

    // setting error messages
    const [errorMessage, setErrorMessage] = useState('')

    // handling form changes
    const onValueChange = (e) => {
        //console.log(e.target.name, e.target.value);
        setUser({ ...user, [e.target.name] : e.target.value })
        //console.log(user)
    }

    // handling changes to form
    const handleSubmit = async (e) => {
        // preventing form default changes
        e.preventDefault()

        try {
            const response = await registerUser(user)
            console.log(response)
            setUser(defaultValues)
            navigate('/login')
        }
        catch (e) {
            console.log(e.message)

            // custom validation messages

            if(e.message === 'All fields must be filled') {
                setErrorMessage('All fields must be filled')
            }

            if(e.message === 'User already exists') {
                setErrorMessage('User already exists')
            }

            if(e.message === 'Invalid email') {
                setErrorMessage('Invalid Email')
            }

            if(e.message === 'Password to small') {
                setErrorMessage('Password to small')
            }
        }
    }

    // closing alert
    const handleAlertClose = () => {
        setErrorMessage('')
    }

    return (
        <>

            {/* alert message */}
            {errorMessage && (
                <Alert severity="error" onClose={handleAlertClose} >
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            )}

            {/* registration form */}
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="off"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={user.firstName}
                                        onChange={onValueChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="off"
                                        value={user.lastName}
                                        onChange={onValueChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={onValueChange}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={onValueChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: 'purple'
                                }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link to={'/login'} variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default RegisterForm