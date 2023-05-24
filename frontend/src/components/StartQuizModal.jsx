import React, { useState } from 'react';
import { Box, Modal, Typography, styled, Button, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

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
  width: '170px',
  '&:hover': {
    opacity: '0.9'
  },
})

const CopyButton = styled(SubmitButton)({

  '&:hover': {
    opacity: '0.9'
  },
})

const QuizBox = styled(Box)({
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
})

const Exit = styled('div')({
  textAlign: 'right',
})
const ExitIcon = styled('button')({
  color: 'black',
  backgroundColor: 'transparent',
  border: 'none',
})

const QuizTitle = styled(Typography)({
  fontWeight: 600
})

const QuizInfo = styled(Typography)({
  marginTop: 20,
  fontWeight: '700',
  fontSize: 50,
  textAlign: 'center'
})

const QuizBtnContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '360px',
})

function StartQuizModal (props) {
  const [copy, setCopy] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Modal
      {...props}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <QuizBox>
          <Exit>
            <ExitIcon onClick={props.onClose}><CloseIcon /></ExitIcon>
          </Exit>
          <QuizTitle id="modal-modal-title" variant="h6" component="h2">
          Join Here
          </QuizTitle>
          <QuizInfo id="modal-modal-description" >
          {props.data.active}
          </QuizInfo>
          <QuizBtnContainer>
            <div><CopyButton id="copyLinkBtn" onClick={() => { setCopy(true); navigator.clipboard.writeText('http://localhost:3000/quiz/join/' + props.data.active); }}>Copy Link</CopyButton></div>
            <div><SubmitButton id="openQuizBtn" onClick={() => { navigate('/quiz/play/' + props.data.active, { state: { quizId: props.quizid, isAdmin: true, isEnd: false } }) }}>Open Quiz</SubmitButton></div>
          </QuizBtnContainer>
      </QuizBox>
      </Modal>
      <Snackbar
        id="snackbar"
        message="Copied to clibboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={2000}
        onClose={() => setCopy(false)}
        open={copy}
      />
    </>
  );
}

export default StartQuizModal;
