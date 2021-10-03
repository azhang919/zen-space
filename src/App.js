import './App.css';
import { useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import EcoIcon from '@material-ui/icons/Eco';
import { makeStyles } from '@material-ui/core/styles';
import Menu from './views/Menu.js';
import HomeTab from './views/home/Home.js';
import WorkTab from './views/work/Work.js';
import PlayTab from './views/play/Play.js';
import { firebaseApp } from './firebase.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#FFFFFF",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    border: 'none',
    backgroundColor: 'none',
    '&:active': {
      color: theme.palette.primary.dark,
    }
  }
}));


function App() {

  const [tabIndex, setTabIndex] = useState(0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  const classes = useStyles();

  const handleSignup = () => {
    clearErrors();
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          return;
        case "auth/weak-password":
          setPasswordError(err.message);
          return;
        default:
          return;
      }
    })

    alert("Successful signup! Login to continue");
  }

  const handleLogin = () => {
    clearErrors();
    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
        default:
          break;
      }
    })
    if (firebaseApp.auth().currentUser != null) {
      clearInputs();
      setShowLogin(false);
    }
  }

  const handleLogout = () => {
    firebaseApp.auth().signOut();
    setShowLogin(false);
  }

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  }

  const toggleState = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
  }

  // const authListener = () => {
  //   firebaseApp.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       clearInputs();
  //       setUser(user);
  //     } else {
  //       setUser('');
  //     }
  //   })
  // }

  return (
    <div className="app">
      {(!showLogin) ? (
        <>

          <Menu tabIndex={tabIndex} setTabIndex={setTabIndex} handleLogout={handleLogout} />
          {(tabIndex === 0) && <HomeTab />}
          {(tabIndex === 1) && <WorkTab uid={firebaseApp.auth().currentUser.uid} />}
          {(tabIndex === 2) && <PlayTab />}

        </>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <EcoIcon></EcoIcon>
            </Avatar>
            <Typography component="h1" variant="h5">ZenSpace</Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={handleEmailChange}
              />

              <p className="error-msg">{emailError}</p>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                className={classes.textfield}
              />
              <p className="error-msg">{passwordError}</p>
              <div className="btn-container">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(isLogin) ? handleLogin : handleSignup}
                >
                  {(isLogin) ? "Sign In" : "Sign Up"}
                </Button>
              </div>
            </form>
            <button className={classes.link} onClick={toggleState}>
              <p>{(isLogin) ? "Don't have an account? Sign up" :
                "Have an account? Sign in"}</p>
            </button>
          </div>
          <Box mt={8}>
            <Typography variant="body2" color="textSecondary" align="center">
              Copyright © Alison Zhang 2021.
            </Typography>
          </Box>
        </Container>
      )}
    </div>
  );

}

export default App;
