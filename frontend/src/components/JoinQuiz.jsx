import React from 'react';
import {
  styled,
  TextField
} from '@mui/material';
import Button from '@mui/material/Button';
import background from '../assets/background.png';
import Typewriter from 'typewriter-effect';
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
    paddingLeft: '40px',
    textAlign: 'center',
  },
  '& label.Mui-focused': {
    color: '#f7595a',
    textAlign: 'center',
  },
  '& .MuiInputLabel-shrink': {
    paddingLeft: '85px',
    textAlign: 'center'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#f7595a',
  },
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
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

function JoinQuiz () {
  const [gamePin, setGamePin] = React.useState('');
  const navigate = useNavigate();

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
                label="Enter quiz pin"
                value={gamePin}
                onChange={(e) => setGamePin(e.target.value)}
                variant="standard"
                type="number"
                sx={{ input: { textAlign: 'center' } }}
              />
            </FormInputRow>
          <SubmitBtn
            variant="contained"
            onClick={() => navigate('/quiz/join/' + gamePin)}
          >
            Enter
          </SubmitBtn>
          </Container>
        </TextContainer>
      </Home>
    </>
  )
}
export default JoinQuiz;
