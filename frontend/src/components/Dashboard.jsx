import React from 'react';
import DrawerAppBar from './Nav';
import ErrorModal from './ErrorModal';
import QuizCard from './QuizCard';
import { styled } from '@mui/material';
import { useMediaQuery } from 'react-responsive'

const LrgQuizContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'left',
  alignItems: 'center',
  maxWidth: '1260px',
  paddingTop: '112px',
  paddingBottom: '112px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const MedQuizContainer = styled(LrgQuizContainer)({
  maxWidth: '840px',
});

const SmlQuizContainer = styled(LrgQuizContainer)({
  maxWidth: '420px',
});

const Quizzes = styled('div')({
  backgroundColor: '#f8f9fd',
  height: '100%',
});

function Dashboard () {
  const [quizzes, setQuizzes] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [qstAdded, setqstAdded] = React.useState(false)
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const isThreeCol = useMediaQuery({ query: '(min-width: 1260px)' });
  const isTwoColMax = useMediaQuery({ query: '(max-width: 1260px)' });
  const isTwoColMin = useMediaQuery({ query: '(min-width: 840px)' });
  const isOneCol = useMediaQuery({ query: '(max-width: 840px)' });

  async function deleteQuiz (id) {
    const response = await fetch('http://localhost:5005/admin/quiz/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    if (data.error) {
      setError(true);
    } else {
      setConfirmDelete(true);
      setConfirmDelete(false);
    }
  }

  React.useEffect(async () => {
    const response = await fetch('http://localhost:5005/admin/quiz', {
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
      setQuizzes(data.quizzes.sort(
        (q1, q2) => (q1.createdAt < q2.createdAt) ? 1 : (q1.createdAt > q2.createdAt) ? -1 : 0));
    }
  }, [qstAdded, confirmDelete]);

  return (
    <>
      <DrawerAppBar isCreate={qstAdded} onCreate={(created) => { setqstAdded(created); }}/>
      <Quizzes>
        {isThreeCol && <LrgQuizContainer>
          {quizzes !== []
            ? (
                quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onDelete={(id) => deleteQuiz(id)}></QuizCard>
                ))
              )
            : (
            <div>Hello</div>
              )}
        </LrgQuizContainer>
        }
        {isTwoColMax && isTwoColMin && <MedQuizContainer>
          {quizzes !== []
            ? (
                quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onDelete={(id) => deleteQuiz(id)}></QuizCard>
                ))
              )
            : (
            <div>Hello</div>
              )}
        </MedQuizContainer>
        }
        {isOneCol && <SmlQuizContainer>
          {quizzes !== []
            ? (
                quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} onDelete={(id) => deleteQuiz(id)}></QuizCard>
                ))
              )
            : (
            <div>Hello</div>
              )}
        </SmlQuizContainer>
        }
      </Quizzes>
      <ErrorModal open={error} onClose={() => setError(false)}>Invalid token or input</ErrorModal>
    </>
  );
}

export default Dashboard;
