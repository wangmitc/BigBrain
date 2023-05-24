import React from 'react';
import ErrorModal from './ErrorModal';
import { styled, AppBar, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import defaultThumbnail from '../assets/default_quiz_thumbnail.png';
import Lobby from './Lobby';
import PlayerResults from './PlayerResults';
import AdminResults from './AdminResults';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AnswerPage from './AnswerPage';
import QuestionPage from './QuestionPage';

const AdminContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
  color: 'white',
});

const AdminQuizBtn = styled(Button)({
  marginTop: '10px',
  marginLeft: '25px',
  marginBottom: '10px',
  color: 'white',
  '&:hover': {
    backgroundColor: 'white',
    color: '#f7595a',
  }
});

const PlayerStyledTypographyBigBrain = styled(Typography)({
  margin: '10px 25px',
  fontWeight: 560,
  flexGrow: 1,
  display: {
    xs: 'none',
    sm: 'block'
  },
});

const EndQuizBtn = styled(Button)({
  margin: '10px 25px',
  color: '#f7595a',
  backgroundColor: 'white',
  '&:hover': {
    opacity: '0.9',
    backgroundColor: 'white',
  }
});

const ActiveQuizBody = styled('div')({
  paddingTop: '60px',
  maxWidth: '900px',
  width: '100%',
  height: 'auto',
  maxHeight: '450px',
  marginLeft: 'auto',
  marginRight: 'auto',
})

function ActiveQuiz () {
  const [questions, setQuestions] = React.useState([]);
  const [position, setPosition] = React.useState(-1);
  const [error, setError] = React.useState(false);
  const [seconds, setSeconds] = React.useState(-1);
  const [minutes, setMinutes] = React.useState(-1);
  const [question, setQuestion] = React.useState('Question');
  const [thumbnail, setThumbnail] = React.useState(defaultThumbnail);
  const [answers, setAnswers] = React.useState([]);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [isEnd, setEnd] = React.useState(false)
  const isAdmin = useLocation().state.isAdmin;
  const end = useLocation().state.isEnd;
  let quizId = '';
  let playerId = '';
  let questionId = -1;
  if (isAdmin) {
    quizId = useLocation().state.quizId;
  } else {
    playerId = window.localStorage.getItem('playerId');
  }
  const sessionId = window.location.href.split('/')[5];
  const navigate = useNavigate();

  // initalise all states
  // if admin
  if (isAdmin) {
    React.useEffect(async () => {
      if (end) {
        setEnd(true)
        setPosition(position + 1);
      } else {
        const response = await fetch('http://localhost:5005/admin/session/' + sessionId + '/status', {
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
          // if the quiz has already started
          if (data.results.position > -1 && data.results.position < data.results.questions.length) {
            // seconds left
            const timePassed = Math.floor((new Date().getTime() - new Date(data.results.isoTimeLastQuestionStarted).getTime()) / 1000);
            // if their is still time left adjust the timer
            if (timePassed < data.results.questions[data.results.position].time) {
              const timeLeft = data.results.questions[data.results.position].time - timePassed;
              const newMinute = Math.floor(timeLeft / 60);
              setMinutes(newMinute);
              const newSecond = timeLeft - (newMinute * 60);
              setSeconds(newSecond);
            }
            setQuestion(data.results.questions[data.results.position].questionString);
            setAnswers(data.results.questions[data.results.position].answers);
            if (data.results.questions[data.results.position].embed === '') {
              setThumbnail(defaultThumbnail);
            } else {
              setThumbnail(data.results.questions[data.results.position].embed);
            }
          }
          setQuestions(data.results.questions);
          setPosition(data.results.position);
        }
      }
    }, []);
  } else {
    // if Player
    React.useEffect(() => {
      const updateInterval = window.setInterval(async () => {
        // constatly check if the game has started
        let response = await fetch('http://localhost:5005/play/' + playerId + '/status', {
          method: 'GET'
        });
        let data = await response.json();
        if (data.error) {
          // stop the interval
          clearInterval(updateInterval);
          setEnd(true);
          setMinutes(-1);
          setSeconds(-1);
          setPosition(position + 1);
          // get Results
        } else if (data.started) {
          response = await fetch('http://localhost:5005/play/' + playerId + '/question', {
            method: 'GET'
          });
          data = await response.json();
          if (data.error) {
            setError(true);
          } else {
            if (questionId < data.question.id) {
              const timePassed = Math.floor((new Date().getTime() - new Date(data.question.isoTimeLastQuestionStarted).getTime()) / 1000);
              // if their is still time left adjust the timer
              if (timePassed <= data.question.time) {
                let newTimes = JSON.parse(window.localStorage.getItem('userTimes'));
                if (newTimes === null) {
                  newTimes = [];
                }
                newTimes.push(data.question.time);
                window.localStorage.setItem('userTimes', JSON.stringify(newTimes));
                const timeLeft = data.question.time - timePassed;
                const newMinute = Math.floor(timeLeft / 60);
                setMinutes(newMinute);
                const newSecond = timeLeft - (newMinute * 60);
                setSeconds(newSecond);
              }
              questionId = data.question.id
              setPosition(position + 1);
              setQuestion(data.question.questionString);
              if (data.question.embed === '') {
                setThumbnail(defaultThumbnail);
              } else {
                setThumbnail(data.question.embed);
              }
              setSelected(new Array(data.question.answers.length).fill(false));
              setAnswers(data.question.answers);
              let newPoints = JSON.parse(window.localStorage.getItem('userPoints'));
              if (newPoints === null) {
                newPoints = [];
              }
              newPoints.push(data.question.point);
              window.localStorage.setItem('userPoints', JSON.stringify(newPoints));
            }
          }
        }
      }, 1000);
      return () => clearInterval(updateInterval);
    }, [])
    // constatly check if the current question is still the current question
  }

  // admin only
  async function endQuiz () {
    const response = await fetch('http://localhost:5005/admin/quiz/' + quizId + '/end', {
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

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      if (!(minutes <= 0 && seconds <= 0)) {
        setSeconds(s => s - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [position]);

  React.useEffect(() => {
    // if there are minutes left, reset seconds
    if (minutes !== 0 && seconds === 0) {
      setSeconds(59);
      setMinutes(m => m - 1)
    }
  }, [seconds]);

  // admin only
  async function nextQuestion () {
    if (position + 1 < questions.length) {
      let newTimes = JSON.parse(window.localStorage.getItem('adminTimes'));
      if (newTimes === null) {
        newTimes = [];
      }
      newTimes.push(questions[position + 1].time);
      window.localStorage.setItem('adminTimes', JSON.stringify(newTimes));
      let newPoints = JSON.parse(window.localStorage.getItem('adminPoints'));
      if (newPoints === null) {
        newPoints = [];
      }
      newPoints.push(questions[position + 1].point);
      window.localStorage.setItem('adminPoints', JSON.stringify(newPoints));
      setPosition(position + 1);
      const newMinute = Math.floor(questions[position + 1].time / 60);
      setMinutes(newMinute);
      const newSecond = questions[position + 1].time - (newMinute * 60);
      setSeconds(newSecond);
      setQuestion(questions[position + 1].questionString);
      if (questions[position + 1].embed === '') {
        setThumbnail(defaultThumbnail);
      } else {
        setThumbnail(questions[position + 1].embed);
      }
      setAnswers(questions[position + 1].answers);
      const response = await fetch('http://localhost:5005/admin/quiz/' + quizId + '/advance', {
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
    } else {
      setEnd(true);
      setPosition(position + 1);
    }
  }

  // player Only
  async function submitSelected (answerId) {
    const newSelect = [];
    // loop through all answer Ids (index number)
    for (let i = 0; i < selected.length; i++) {
      // check if id's have been selected (accounting for the new update in state)
      if ((selected[i] && i !== answerId) || (!selected[i] && i === answerId)) {
        newSelect.push(i)
      }
    }
    if (newSelect.length > 0) {
      const response = await fetch('http://localhost:5005/play/' + playerId + '/answer', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          answerIds: newSelect,
        })
      });
      const data = await response.json();
      if (data.error) {
        setError(true);
      }
    }
  }

  function selectButton (answerId) {
    const newList = [...selected];
    newList[answerId] = !selected[answerId];
    setSelected(newList);
    submitSelected(answerId);
  }

  // if time runs out
  if (minutes === 0 && seconds === 0) {
    // set page to -1 when the time runs out
    setMinutes(-1);
    setSeconds(-1);
    if (!isAdmin) {
      getAnswerForPlayer();
    }
  }

  async function getAnswerForPlayer () {
    const response = await fetch('http://localhost:5005/play/' + playerId + '/answer', {
      method: 'GET'
    });
    const data = await response.json();
    if (data.error) {
      // keep fetching until get valid return
      getAnswerForPlayer()
    } else {
      setCorrectAnswers(data.answerIds)
    }
  }

  React.useEffect(async () => {
    // if no more questions
    if (isEnd && !end) {
      setMinutes(-1);
      setSeconds(-1);
      await endQuiz();
    }
  }, [position]);

  async function goToEnd () {
    // advance the quiz to the end
    for (let i = position; i < questions.length; i++) {
      const response = await fetch('http://localhost:5005/admin/quiz/' + quizId + '/advance', {
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
    setSeconds(-1)
    setMinutes(-1)
    setPosition(questions.length);
    setEnd(true);
  }
  return (
    <>
      <div>
        <StyledAppBar>
          <AdminContainer>
            <div>
              {!isAdmin && <PlayerStyledTypographyBigBrain variant="h6" component="div" onClick={() => navigate('/')}>
                BigBrain
              </PlayerStyledTypographyBigBrain>}
              {isAdmin && <AdminQuizBtn startIcon={<ArrowBackIcon />} id="backBtn" onClick={() => {
                navigate('/dashboard');
                if (isEnd || end) {
                  window.localStorage.removeItem('adminTimes');
                  window.localStorage.removeItem('adminPoints');
                }
              }}>
                Back
              </AdminQuizBtn>}
            </div>
            <div>
              {isAdmin && !isEnd &&
                <AdminQuizBtn id="nextBtn" startIcon={<NavigateNextIcon />} onClick={() => nextQuestion()}>Next</AdminQuizBtn>}
              {isAdmin && !isEnd &&
                <EndQuizBtn startIcon={<LastPageIcon />} onClick={ () => goToEnd()}>End</EndQuizBtn>}
            </div>
          </AdminContainer>
        </StyledAppBar>
      </div>
      {seconds <= -1 && position === -1 &&
        <Lobby></Lobby>
      }
      { seconds > -1 &&
        <QuestionPage admin={isAdmin} question={question} answers={answers} selected={selected} thumbnail={thumbnail} minutes={minutes} seconds={seconds} onClick={ e => selectButton(parseInt(e.target.id)) }></QuestionPage>
      }
      { seconds <= -1 && !isEnd &&
        <AnswerPage admin={isAdmin} answers={answers} correctanswers={correctAnswers}></AnswerPage>
      }
      { seconds <= -1 && isEnd &&
        <ActiveQuizBody>
          {isAdmin
            ? (<AdminResults></AdminResults>)
            : (<PlayerResults></PlayerResults>)
          }
        </ActiveQuizBody>
      }
      <ErrorModal open={error} onClose={() => setError(false)}>Invalid Token or Input</ErrorModal>
    </>
  );
}

export default ActiveQuiz;
