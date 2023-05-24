import React from 'react';
import { Box, Modal, Typography, styled, Button } from '@mui/material';
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
  width: '100%',
})

const Error = styled(Box)({
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
const ExitButton = styled(SubmitButton)({
  width: '148.02px',
  backgroundColor: '#f7595a',
  color: 'white',
  '&:hover': {
    backgroundColor: '#f7595a',
    opacity: '0.9'
  },
})

const ErrorTitle = styled(Typography)({
  fontWeight: 600
})

const ErrorInfo = styled(Typography)({
  marginTop: 20
})

const QuizBtnContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '360px',
})

function EndQuizModal (props) {
  const navigate = useNavigate();
  return (
    <>
      <Modal
      {...props}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      >
      <Error>
        <Exit>
          <ExitIcon onClick={props.onClose}><CloseIcon /></ExitIcon>
        </Exit>
        <ErrorTitle id="modal-modal-title" variant="h6" component="h2">
        This Quiz has Ended
        </ErrorTitle>
        <ErrorInfo id="modal-modal-description" >
        Would you like to view the results?
        </ErrorInfo>
        <Exit>
          <QuizBtnContainer>
            <div>
              <SubmitButton
                id="viewResultsBtn"
                onClick={ () => {
                  navigate('/quiz/play/' + props.data.active, { state: { quizId: props.quizid, isAdmin: true, isEnd: true } })
                } }
              >
                View Results
              </SubmitButton>
            </div>
            <div>
              <ExitButton
                id="closeBtn"
                onClick={props.onClose}
              >
              Close</ExitButton>
            </div>
          </QuizBtnContainer>
        </Exit>
      </Error>
      </Modal>
    </>
  );
}

export default EndQuizModal;
