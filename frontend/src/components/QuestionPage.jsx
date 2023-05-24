import React from 'react';
import checkURL from '../helpers/EditQuiz.jsx';
import { styled, Button } from '@mui/material';

const ActiveQuizBody = styled('div')({
  paddingTop: '60px',
  maxWidth: '900px',
  width: '100%',
  height: 'auto',
  maxHeight: '450px',
  marginLeft: 'auto',
  marginRight: 'auto',
})

const ActiveQuizQuestion = styled('div')({
  fontSize: '50px',
  textAlign: 'center',
  backgroundColor: 'white',
  width: '100%',
  paddingBottom: '30px',
  boxShadow: '0px 8px 20px 0px rgba(0, 0, 0, 0.15)',
})

const Timer = styled('div')({
  display: 'inline-block',
  justifyContent: 'center',
  alignItems: 'center',
  verticalAlign: 'middle'
});

const QuizQuestionImage = styled('img')({
  maxWidth: '800px',
  width: '100%',
  height: 'auto',
  maxHeight: '450px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
});

const QuizQuestionVideo = styled('iframe')({
  maxWidth: '800px',
  width: '100%',
  height: '450px',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'block',
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

function QuestionPage (props) {
  return (
    <>
      <ActiveQuizBody>
        <ActiveQuizQuestion>
        {props.question}
        </ActiveQuizQuestion>
        <Timer>
          <p>Time Left</p>
          <p>{props.minutes.toString().length === 1 && 0}{props.minutes}: {props.seconds.toString().length === 1 && 0}{props.seconds}</p>
        </Timer>
        {checkURL(props.thumbnail)
          ? (<QuizQuestionVideo src={props.thumbnail.replace('https://youtu.be/', 'https://www.youtube.com/embed/').replace('https://www.youtube.com/watch?v=', 'https://www.youtube.com/embed/') + '?autoplay=1&mute=1'}></QuizQuestionVideo>)
          : (<QuizQuestionImage src={props.thumbnail}></QuizQuestionImage>)
        }
        {props.admin
          ? (<QuizAnswerContainer>
            {props.answers.map(answer => <QuizAnswer key={answer.id} id={answer.id}>{answer.value}</QuizAnswer>)}
        </QuizAnswerContainer>)
          : (<QuizAnswerContainer>
            {props.answers.length >= 1 && <QuizAnswer key={props.answers[0].id} id={props.answers[0].id} style={{ backgroundColor: props.selected[0] ? '#5BE63C' : '#f7595a' }} onClick={ props.onClick }>{props.answers[0].value}</QuizAnswer>}
            {props.answers.length >= 2 && <QuizAnswer key={props.answers[1].id} id={props.answers[1].id} style={{ backgroundColor: props.selected[1] ? '#5BE63C' : '#f7595a' }} onClick={ props.onClick }>{props.answers[1].value}</QuizAnswer>}
            {props.answers.length >= 3 && <QuizAnswer key={props.answers[2].id} id={props.answers[2].id} style={{ backgroundColor: props.selected[2] ? '#5BE63C' : '#f7595a' }} onClick={ props.onClick }>{props.answers[2].value}</QuizAnswer>}
            {props.answers.length >= 4 && <QuizAnswer key={props.answers[3].id} id={props.answers[3].id} style={{ backgroundColor: props.selected[3] ? '#5BE63C' : '#f7595a' }} onClick={ props.onClick }>{props.answers[3].value}</QuizAnswer>}
            {props.answers.length >= 5 && <QuizAnswer key={props.answers[4].id} id={props.answers[4].id} style={{ backgroundColor: props.selected[4] ? '#5BE63C' : '#f7595a' }} onClick={ props.onClick }>{props.answers[4].value}</QuizAnswer>}
            {props.answers.length >= 6 && <QuizAnswer key={props.answers[5].id} id={props.answers[5].id} style={{ backgroundColor: props.selected[5] ? '#5BE63C' : '#f7595a' }} onClick={ props.onClick }>{props.answers[5].value}</QuizAnswer>}
        </QuizAnswerContainer>)
        }
      </ActiveQuizBody>
    </>
  )
}

export default QuestionPage;
