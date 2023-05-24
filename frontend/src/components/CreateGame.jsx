import React from 'react';
import {
  Box,
  Modal,
  Typography,
  styled, Button,
  TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ErrorModal from './ErrorModal';

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
  width: '100%',
});

const StyledBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: 'none',
  boxShadow: 24,
  p: 4,
  padding: '20px',
  fontFamily: '"Poppins", "Arial", "Helvetica Neue", sans-serif',
});

const Exit = styled('div')({
  textAlign: 'right'
});

const ExitIcon = styled('button')({
  color: 'black',
  backgroundColor: 'transparent',
  border: 'none',
  '&:hover': {
    cursor: 'pointer'
  }
});

const ExitButton = styled(SubmitButton)({
  backgroundColor: '#f7595a',
  color: 'white',
  '&:hover': {
    backgroundColor: '#f7595a',
    opacity: '0.9'
  },
});

const ErrorTitle = styled(Typography)({
  fontWeight: 600
});

const ErrorInfo = styled(Typography)({
  marginTop: 20
});

const FormInput = styled(TextField)({
  '& label.Mui-focused': {
    color: '#f7595a',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#f7595a',
  },
});

function CreateNewGameModal (props) {
  const [nameError, setNameError] = React.useState(false);
  const [name, setName] = React.useState('');
  const [invalidInput, setInvalidInput] = React.useState(false);
  const [invalidToken, setInvalidToken] = React.useState(false);

  async function createGame () {
    if (name === '') {
      props.onClose();
      setNameError(true);
    } else {
      const response = await fetch('http://localhost:5005/admin/quiz/new', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
        body: JSON.stringify({
          name
        })
      });
      const data = await response.json();
      if (data.error) {
        if (data.error === 'Invalid token') {
          props.onClose();
          setInvalidToken(true);
        } else {
          props.onClose();
          setInvalidInput(true);
        }
      } else {
        props.onClose();
        setName('');
      }
    }
  }
  return (
    <>
      <Modal
      {...props}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      id='create-quiz-modal'
      >
      <StyledBox>
        <Exit>
          <ExitIcon onClick={props.onClose}><CloseIcon /></ExitIcon>
        </Exit>
        <ErrorTitle id="create-quiz-modal-title" variant="h6" component="h2">
          Create new game
        </ErrorTitle>
        <ErrorInfo id="create-quiz-modal-description" >
          <form>
            <div>
              <FormInput
                required
                label="Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="standard"
                fullWidth
              />
            </div>
          </form>
        </ErrorInfo>
        <Exit>
          <ExitButton
          id="createGameBtn"
          onClick={() => createGame()}>
            Create game</ExitButton>
        </Exit>
      </StyledBox>
      </Modal>
      <ErrorModal open={ nameError } onClose={ () => setNameError(false) }>Name field is required</ErrorModal>
      <ErrorModal open={invalidInput} onClose={() => setInvalidInput(false)}>Invalid input</ErrorModal>
      <ErrorModal open={invalidToken} onClose={() => setInvalidToken(false)}>Invalid input</ErrorModal>
    </>
  );
}

export default CreateNewGameModal;
