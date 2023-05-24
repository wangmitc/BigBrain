import React from 'react';
import { styled, Stack, Button, Paper, Box } from '@mui/material';

const ActiveQuizBody = styled('div')({
  paddingTop: '60px',
  maxWidth: '900px',
  width: '100%',
  height: 'auto',
  maxHeight: '450px',
  marginLeft: 'auto',
  marginRight: 'auto',
})

const QuizAnswerContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '840px',
  maxHeight: '400px',
});

const Item = styled(Paper)({
  backgroundColor: 'white',
  padding: '20px',
  textAlign: 'Left',
});

const Header = styled(Item)({
  textAlign: 'Center',
  color: '#f7595a',
  backgroundColor: 'white',
})

const HeaderContainer = styled(Box)({
  marginTop: '80px',
  marginBottom: '80px',
  fontSize: '50px',
  maxwidth: '900px',
  marginLeft: 'auto',
  marginRight: 'auto',
  boxShadow: '0px 16px 40px 0px rgba(0, 0, 0, 0.15)',
  outlineWidth: '0.5px',
  outlineColor: '#f7595a',
})

const QuizAnswer = styled(Button)({
  maxWidth: '400px',
  width: '100%',
  height: 'auto',
  maxHeight: '400px',
  fontSize: '20px',
  color: 'white',
  margin: '10px',
  backgroundColor: '#f7595a',
  padding: '40px',
  boxShadow: '0px 8px 20px 0px rgba(0, 0, 0, 0.15)',
  '&:hover': {
    backgroundColor: '#f7595a',
    color: '#ffffff',
    opacity: 0.9
  },
});

const QuizCorrectAnswer = styled(QuizAnswer)({
  backgroundColor: '#5BE63C',
  '&:hover': {
    backgroundColor: '#5BE63C',
  },
})

function AnswerPage (props) {
  return (
    <>
      <ActiveQuizBody>
        <HeaderContainer>
          <Stack spacing={3}>
            <Header>
              Correct Answer
            </Header>
          </Stack>
        </HeaderContainer>
        {props.admin
          ? (<QuizAnswerContainer>
            { props.answers.filter(answer => answer.correct === true).map(answer =>
              <QuizCorrectAnswer key={answer.id}>{answer.value}</QuizCorrectAnswer>
            )}
        </QuizAnswerContainer>)
          : (<QuizAnswerContainer>
          { props.answers.filter(answer => props.correctanswers.includes(answer.id)).map(answer =>
              <QuizCorrectAnswer key={answer.id}>{answer.value}</QuizCorrectAnswer>
          )}
        </QuizAnswerContainer>)
        }
      </ActiveQuizBody>
    </>
  )
}

export default AnswerPage;
