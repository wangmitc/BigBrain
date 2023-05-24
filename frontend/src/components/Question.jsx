import * as React from 'react';
import {
  Card,
  CardContent,
  Button,
  styled
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './ErrorModal';

const Display = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  paddingTop: '5px',
});

const BtnGroup = styled('div')({
  float: 'right',
});

const StyledCard = styled(Card)({
  marginTop: '11px',
  marginBottom: '11px'
});

const QuestionActionBtn = styled(Button)({
  color: '#f7595a',
  '&:hover': {
    background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
    color: '#ffffff'
  }
})

export default function BasicCard (props) {
  const navigate = useNavigate();
  const [invalidInput, setInvalidInput] = React.useState(false);
  const [invalidToken, setInvalidToken] = React.useState(false);

  async function deleteQuestion () {
    const newQuestions = [...props.questions];
    newQuestions.splice(props.question.id, 1);
    for (let i = 0; i < newQuestions.length; i++) {
      newQuestions[i].id = i;
    }

    props.onDelete(newQuestions);

    const response = await fetch('http://localhost:5005/admin/quiz/' + props.quizId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        questions: newQuestions
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
    }
  }
  return (
    <>
      <StyledCard
      variant="outlined">
        <CardContent>
          <Display>
            {props.question.id + 1}. {props.question.questionString}
            <BtnGroup>
              <QuestionActionBtn
              startIcon={<EditIcon />}
              id={props.question.id}
              onClick={ () => {
                navigate('/quiz/edit/' + window.location.href.split('/')[5] + '/' + props.question.id, { state: { ...props.questions } })
              }}>
                  Edit
              </QuestionActionBtn>
                <QuestionActionBtn
                startIcon={<DeleteIcon />}
                onClick={ () => {
                  deleteQuestion();
                }}>
                    Delete
                </QuestionActionBtn>
            </BtnGroup>
          </Display>
        </CardContent>
      </StyledCard>
      <ErrorModal open={invalidInput} onClose={() => setInvalidInput(false)}>Invalid input</ErrorModal>
      <ErrorModal open={invalidToken} onClose={() => setInvalidToken(false)}>Invalid input</ErrorModal>
    </>
  );
}
