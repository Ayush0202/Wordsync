import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

// material ui
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// api
import { loginUser }  from '../../services/api'
import { useAuthContext } from "../../hooks/useAuthContext"


// default values of form
const defaultValues = {
    email: '',
    password: ''
}

const LoginForm = () => {

    const [user, setUser] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const { dispatch } = useAuthContext()

    // navigate
    const navigate = useNavigate()

    const onValueChange = (e) => {
        //console.log(e.target.name, e.target.value);
        setUser({ ...user, [e.target.name] : e.target.value })
        //console.log(user)
    }

    // form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await loginUser(user)
            console.log(response)

            // save data to local storage
            localStorage.setItem('user', JSON.stringify(response))

            // update the auth context
            dispatch({type: 'LOGIN', payload: response})

            setUser(defaultValues)
            navigate('/docs/dashboard')

        }
        catch (e) {
            console.log(e.message)

            // custom validation messages
            if(e.message === 'All fields must be filled') {
                setErrorMessage('All fields must be filled')
            }

            if(e.message === 'Invalid email or password') {
                setErrorMessage('Invalid email or password')
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
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '@media (max-width: 570px)': {
                        margin: '75px 20px', // Add margin for screen sizes less than 570px
                    },
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        autoFocus
                        value={user.email}
                        onChange={onValueChange}
                    />
                    <TextField
                        margin="normal"
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
                        Sign In
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to={'/register'} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default LoginForm