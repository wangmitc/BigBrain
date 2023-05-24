import React from 'react';
import {
  styled,
  TextField
} from '@mui/material';
import Button from '@mui/material/Button';
import background from '../assets/background.png';
import Typewriter from 'typewriter-effect';
import ErrorModal from './ErrorModal';
import { useNavigate } from 'react-router-dom';

const Home = styled('div')({
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100vw',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  fontFamily: '"Poppins", "Arial", "Helvetica Neue", sans-serif',
  color: 'white'
});

const TextContainer = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  fontSize: '65px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
});

const Heading = styled('div')({
  alignItems: 'center',
  fontWeight: '600'
});

const Container = styled('div')({
  borderRadius: '10px',
  background: 'white',
  color: 'black',
  width: '350px',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: '22px',
  marginTop: '10px',
});

const FormInputRow = styled('div')({
  paddingTop: '22px',
  fontSize: '12px',
  maxWidth: '1000px',
  marginRight: '10px',
  marginLeft: '10px'
});

const FormInput = styled(TextField)({
  width: '200px',
  '& .MuiInputLabel-root': {
    paddingLeft: '55px',
    textAlign: 'center'
  },
  '& label.Mui-focused': {
    color: '#f7595a',
    textAlign: 'center',
  },
  '& .MuiInputLabel-shrink': {
    paddingLeft: '90px',
    textAlign: 'center'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#f7595a',
  },
});

const SubmitBtn = styled(Button)({
  background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
  border: 'none',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '20px',
  paddingRight: '20px',
  borderRadius: '50px',
  color: 'white',
  width: '100%',
  maxWidth: '200px',
});

function QuizPlay () {
  const [name, setName] = React.useState('');
  const [invalidSession, setInvalidSession] = React.useState(false);
  const [invalidNameWhitesapce, setInvalidNameWhitesapce] = React.useState(false);
  const [invalidName, setInvalidName] = React.useState(false);
  const sessionid = window.location.href.split('/')[5];
  const navigate = useNavigate();

  async function handleSubmit () {
    window.localStorage.removeItem('userTimes');
    window.localStorage.removeItem('userPoints');
    if (name.trim().length === 0) {
      setInvalidNameWhitesapce(true);
      return;
    } else if (name.length === 0) {
      setInvalidName(true);
      return;
    }
    const response = await fetch('http://localhost:5005/play/join/' + sessionid, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name,
      })
    });
    const data = await response.json();
    if (data.error) {
      setInvalidSession(true);
    } else {
      localStorage.setItem('playerId', data.playerId);
      navigate('/quiz/play/' + sessionid, { state: { isAdmin: false } });
    }
  }

  return (
    <>
      <Home>
        <TextContainer>
          <Heading>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('BigBrain')
                  .start();
              }}
              />
          </Heading>
          <Container>
            <FormInputRow>
              <FormInput
                required
                label="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="standard"
                sx={{ input: { textAlign: 'center' } }}
              />
            </FormInputRow>
          <SubmitBtn
            variant="contained"
            onClick={() => handleSubmit()}
          >
            Enter
          </SubmitBtn>
          </Container>
        </TextContainer>
      </Home>
      <ErrorModal open={invalidSession} onClose={() => {
        setInvalidSession(false);
        navigate('/quiz/join');
      }}>
        Invalid session.
      </ErrorModal>
      <ErrorModal open={invalidNameWhitesapce} onClose={() => setInvalidNameWhitesapce(false) }>Names must contain characters and not be only whitespace.</ErrorModal>
      <ErrorModal open={invalidName} onClose={() => setInvalidName(false) }>Names must contain at least one character.</ErrorModal>
    </>
  )
}
export default QuizPlay;
