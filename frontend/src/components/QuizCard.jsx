import React from 'react';
import defaultThumbnail from '../assets/default_quiz_thumbnail.png'
import ErrorModal from './ErrorModal';
import { styled, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import StartQuizModal from './StartQuizModal';
import EndQuizModal from './EndQuizModal';

const QuizFlexBox = styled('div')({
  position: 'relative',
  justifyContent: 'center',
  width: '400px',
  height: '380px',
  boxShadow: '0px 8px 20px 0px rgba(0, 0, 0, 0.15)',
  fontFamily: '"Poppins", "Arial", "Helvetica Neue", sans-serif',
  margin: '10px',
  transition: 'all .1s ease-in-out',
  '&:hover': {
    transform: 'scale(1.025)',
    boxShadow: '0px 16px 40px 0px rgba(0, 0, 0, 0.15)',
    zIndex: 1,
  }
})

const QuizThumbnail = styled('img')({
  width: '400px',
  height: '275px',
})

const QuizCardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '400px',
})

const QuizTitleContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: '400px',
  paddingLeft: '20px'
})

const QuizInfo = styled('div')({
  width: '139px',
  paddingLeft: '20px',
  color: '#aeb5b8'
})

const QuizBtnContainer = styled('div')({
  paddingTop: '10px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  width: '261px',
  paddingLeft: '40px',
  paddingRight: '20px',
})

const QuizBtn = styled(Button)({
  color: '#f7595a',
  '&:hover': {
    background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
    color: '#ffffff'
  }
})

const ActiveQuizBtn = styled(Button)({
  color: '#ffffff',
  background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
  '&:hover': {
    color: '#ffffff',
    opacity: '0.9'
  }
})

const QuizTitle = styled('div')({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  fontSize: '20px',
  textOverflow: 'ellipsis',
})

function QuizCard (props) {
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [numQuestions, setNumQuestions] = React.useState(0);
  const [confirm, setConfirm] = React.useState(false);
  const [isStart, setStart] = React.useState(props.quiz.active !== null);
  const [viewQuiz, setViewQuiz] = React.useState(false);
  const [isEnd, setEnd] = React.useState(false);

  const quiz = props.quiz;
  const [quizData, setQuizData] = React.useState([]);

  let thumbnail;
  const title = quiz.name;
  if (quiz.thumbnail === null) {
    thumbnail = defaultThumbnail;
  } else {
    thumbnail = quiz.thumbnail;
  }

  React.useEffect(() => {
    getQuiz();
  }, [])

  React.useEffect(async () => {
    getQuiz();
  }, []);

  React.useEffect(async () => {
    const response = await fetch('http://localhost:5005/admin/quiz/' + quiz.id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    if (data.error) {
      setError(true);
    } else {
      let quizTime = 0;
      let quizNumQuestions = 0;
      for (let i = 0; i < data.questions.length; i++) {
        quizTime += parseInt(data.questions[i].time);
        quizNumQuestions += 1;
      }
      setTime(quizTime);
      setNumQuestions(quizNumQuestions);
    }
  }, [isStart])

  async function startQuiz () {
    // start the quiz
    const response = await fetch('http://localhost:5005/admin/quiz/' + quiz.id + '/start', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    if (data.error) {
      setError(true);
    }
  }

  async function endQuiz () {
    // end the quiz
    const response = await fetch('http://localhost:5005/admin/quiz/' + quiz.id + '/end', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    if (data.error) {
      setError(true);
    }
  }

  async function getQuiz () {
    // start the quiz
    const response = await fetch('http://localhost:5005/admin/quiz/' + quiz.id, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    if (data.error) {
      setError(true);
    } else {
      setQuizData(data);
    }
  }

  return (
    <>
      <QuizFlexBox>
        <QuizThumbnail src={thumbnail}/>
        <QuizCardContainer>
          <QuizTitleContainer>
            <QuizTitle>{title}</QuizTitle>
          </QuizTitleContainer>
          <QuizInfo>
            <div>{numQuestions} Questions</div>
            <div>{time} secs</div>
          </QuizInfo>
          <QuizBtnContainer>
            {!isStart && <div><QuizBtn onClick={async () => { setStart(true); await startQuiz(); await getQuiz(); setViewQuiz(true); }}>play</QuizBtn></div>}
            {isStart && <div><ActiveQuizBtn onClick={async () => { setStart(false); await endQuiz(); setEnd(true); }}>stop</ActiveQuizBtn></div>}
            {isStart && <ActiveQuizBtn onClick={async () => { await getQuiz(); setViewQuiz(true); }}>view quiz</ActiveQuizBtn>}
            {!isStart && <div><QuizBtn onClick={() => navigate('/quiz/edit/' + props.quiz.id)}>edit</QuizBtn></div>}
            {!isStart && <div><QuizBtn onClick={() => setConfirm(true)}>delete</QuizBtn></div>}
          </QuizBtnContainer>
        </QuizCardContainer>
      </QuizFlexBox>
      <ErrorModal open={error} onClose={() => setError(false)}>Invalid Token or Input</ErrorModal>
      <ConfirmModal open={confirm} onClose={() => setConfirm(false)} onConfirm={() => props.onDelete(quiz.id)}>Are you sure you want to delete {quiz.name}?</ConfirmModal>
      <StartQuizModal open={viewQuiz} onClose={() => setViewQuiz(false)} data={quizData} quizid={quiz.id}></StartQuizModal>
      <EndQuizModal open={isEnd} onClose={() => {
        window.localStorage.removeItem('adminTimes');
        window.localStorage.removeItem('adminPoints');
        setEnd(false);
      }}
        data={quizData} quizid={quiz.id}></EndQuizModal>
    </>
  )
}

export default QuizCard;
