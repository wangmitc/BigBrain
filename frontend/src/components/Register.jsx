import React from 'react';
import {
  styled,
  Button,
  TextField
} from '@mui/material';
import background from '../assets/background.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  PasswordValidation,
  validateEmail
} from '../helpers/Register';
import ErrorModal from './ErrorModal';
import manageTokenSet from '../helpers/Global.jsx'
import { useNavigate } from 'react-router-dom';

const Registration = styled('div')({
  backgroundImage: `url(${background})`,
  height: '100vh',
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  fontFamily: '"Poppins", "Arial", "Helvetica Neue", sans-serif',
  border: 'none'
});

const RegistrationContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '65px',
  paddingBottom: '65px'
});

const RegistraionFlexbox = styled('div')({
  justifyContent: 'center',
  paddingTop: '30px',
  paddingBottom: '30px',
  paddingRight: '65px',
  paddingLeft: '35px',
  width: '600px',
  height: '600px',
  boxShadow: '0px 8px 20px 0px rgba(0, 0, 0, 0.15)',
  textAlign: 'left',
  backgroundColor: '#ffffff'
});

const RegistrationWrapper = styled('div')({
  padding: '35px'
});

const FormInputRow = styled('div')({
  paddingTop: '22px',
  fontSize: '12px'
});

const SubmitBtn = styled(Button)({
  marginTop: '60px',
  background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
  border: 'none',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '20px',
  paddingRight: '20px',
  borderRadius: '50px',
  color: 'white',
  width: '100%'
});

const BackBtn = styled(Button)({
  marginLeft: '25px',
  color: '#f7595a',
  '&:hover': {
    backgroundColor: '#f7595a',
    color: 'white',
  }
});

const FormInput = styled(TextField)({
  '& label.Mui-focused': {
    color: '#f7595a',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#f7595a',
  },
});

function Register () {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [passwordMatchError, setPasswordMatchError] = React.useState(false);
  const [passwordValidateError, setPasswordValidateError] = React.useState(false);
  const [emailValidateError, setEmailValidateError] = React.useState(false);
  const [error, setError] = React.useState(false);

  async function register () {
    if (name === '') {
      setNameError(true);
    } else if (!validateEmail(email)) {
      setEmailValidateError(true);
    } else if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else if (!PasswordValidation(password)) {
      setPasswordValidateError(true);
    } else {
      const response = await fetch('http://localhost:5005/admin/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
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
  }

  return (
    <>
      <Registration>
        <RegistrationContainer>
          <RegistraionFlexbox>
          <BackBtn
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              navigate('/login');
            }}>
              Back
          </BackBtn>
            <RegistrationWrapper>
              <h2>Sign Up</h2>
              <form>
                <div>
                  <FormInputRow>
                      <FormInput
                        required
                        label="Name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="standard"
                        fullWidth
                      />
                  </FormInputRow>
                </div>
                <div>
                  <FormInputRow>
                    <FormInput
                        required
                        label="Email"
                        type='email'
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="standard"
                        fullWidth
                    />
                  </FormInputRow>
                </div>
                <div>
                  <FormInputRow>
                    <FormInput
                          required
                          label="Password"
                          type='password'
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          variant="standard"
                          fullWidth
                      />
                  </FormInputRow>
                </div>
                <div>
                  <FormInputRow>
                    <FormInput
                          required
                          label="Confirm password"
                          id="confirmPassword"
                          type='password'
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          variant="standard"
                          fullWidth
                      />
                  </FormInputRow>
                </div>
                <div>
                <SubmitBtn
                  variant="contained"
                  id="signup"
                  onClick={register}>
                    Sign up
                </SubmitBtn>
                </div>
              </form>
            </RegistrationWrapper>
          </RegistraionFlexbox>
        </RegistrationContainer>
      </Registration>
      <ErrorModal open={ passwordValidateError } onClose={ () => setPasswordValidateError(false) }>
        Your password must contain at least:
        <ul>
          <li> 8 characters </li>
          <li> 1 uppercase letter </li>
          <li> 1 lowercase letter </li>
          <li> 1 digit </li>
          <li> 1 special character </li>
        </ul>
      </ErrorModal>
      <ErrorModal open={ nameError } onClose={ () => setNameError(false) }>Name field is required</ErrorModal>
      <ErrorModal open={ emailValidateError } onClose={ () => setEmailValidateError(false) }>Email not valid</ErrorModal>
      <ErrorModal open={ passwordMatchError } onClose={ () => setPasswordMatchError(false) }>Passwords must match</ErrorModal>
      <ErrorModal open={error} onClose={() => setError(false)}>Email already in use</ErrorModal>
    </>
  )
}

export default Register;
