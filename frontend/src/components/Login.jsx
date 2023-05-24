import React from 'react';
import {
  styled,
  Button,
  TextField
} from '@mui/material';
import ErrorModal from './ErrorModal';
import background from '../assets/background.png';
import Typewriter from 'typewriter-effect';
import manageTokenSet from '../helpers/Global.jsx'
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LoginBackground = styled('div')({
  backgroundColor: '#f8f9fd',
  height: '100vh',
  fontFamily: '"Poppins", "Arial", "Helvetica Neue", sans-serif'
});

const LoginBody = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap-reverse',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '112px',
  paddingBottom: '112px',
  backgroundColor: '#f8f9fd'
});

const FormInputRow = styled('div')({
  paddingTop: '22px',
  fontSize: '12px'
})

const LoginFlexBox = styled('div')({
  justifyContent: 'center',
  padding: '48px',
  width: '460px',
  height: '468px',
  boxShadow: '0px 8px 20px 0px rgba(0, 0, 0, 0.15)'
});

const LoginBox = styled(LoginFlexBox)({
  backgroundColor: '#ffffff',
  color: '#000000'
});

const RegistrationBox = styled(LoginFlexBox)({
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  color: '#ffffff',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center'
})

const FormInput = styled(TextField)({
  '& label.Mui-focused': {
    color: '#f7595a',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#f7595a',
  }
});

const SubmitButton = styled(Button)({
  marginTop: '35px',
  background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
  border: 'none',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '20px',
  paddingRight: '20px',
  borderRadius: '50px',
  color: 'white',
  width: '100%'
})

const SignInButton = styled(SubmitButton)({
  marginTop: '50px'
})

const SignUpButton = styled(SubmitButton)({
  background: 'none',
  color: '#ffffff',
  border: '1px solid #fff',
  borderRadius: '50px',
  width: '135px'
})

const SignInTitle = styled('h3')({
  paddingTop: '30px'
})

function Login () {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);

  async function login () {
    const response = await fetch('http://localhost:5005/admin/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    const data = await response.json();
    if (data.error) {
      setError(true);
    } else {
      manageTokenSet(data.token);
      navigate('/dashboard');
    }
  }

  return (
    <>
      <LoginBackground>
        <LoginBody>
          <LoginBox>
            <SignInTitle>Sign in</SignInTitle>
            <form>
              <FormInputRow>
                <FormInput
                  required
                  label="Email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="standard"
                  fullWidth
                  type="email"
                /><br />
              </FormInputRow>
              <FormInputRow>
                <FormInput
                  required
                  label="Password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="standard"
                  fullWidth
                  type="password"
                /><br />
              </FormInputRow>
              <SignInButton
              name="signin"
              id="signin"
              onClick={login}
              >
                Sign in
              </SignInButton>
            </form>
          </LoginBox>
          <RegistrationBox>
            <div>
              <h2>
                <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Welcome to BigBrain')
                    .start();
                }}
                />
              </h2>
              <p>Don&apos;t have an acount?</p>
              <SignUpButton
              id="signup"
              onClick={() => {
                navigate('/register');
              }}
              endIcon={<ArrowForwardIcon />}>
                Sign up
              </SignUpButton>
            </div>
          </RegistrationBox>
        </LoginBody>
      </LoginBackground>
      <ErrorModal open={error} onClose={() => setError(false)}>Your email and/or password is incorrect</ErrorModal>
    </>
  )
}

export default Login;
