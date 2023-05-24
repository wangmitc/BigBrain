import * as React from 'react';
import {
  Card,
  CardContent,
  Button,
  styled,
  TextField,
  Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

const StyledCheckbox = styled(Checkbox)({
  '&:hover': {
    color: '#f7595a',
  },
  '&.Mui-checked': {
    color: '#f7595a',
  }
});

const FormInput = styled(TextField)({
  '& label.Mui-focused': {
    color: '#f7595a',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#f7595a',
  },
});

export default function AnswerCard (props) {
  const [answer, setAnswer] = React.useState(props.answerData.value);
  const [correctAnswer, setCorrectAnswer] = React.useState(props.answerData.correct);

  function updateAnswerValue (answerValue) {
    const newAnswerList = [...props.answers];
    newAnswerList[props.answerData.id].value = answerValue;
    props.onEdit(newAnswerList);
  }

  function updateCorrect (isAnswer) {
    const newAnswerList = [...props.answers];
    newAnswerList[props.answerData.id].correct = isAnswer;
    props.onEdit(newAnswerList);
  }

  return (
    <StyledCard
    variant="outlined">
      <form>
        <CardContent>
          <Display>
            <StyledCheckbox
            name={props.answerData.id}
            checked={correctAnswer}
            onChange={() => {
              setCorrectAnswer(!correctAnswer);
              updateCorrect(!correctAnswer);
            }}
            >
            </StyledCheckbox>
              <FormInput
                required
                label="Answer"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                  updateAnswerValue(e.target.value)
                }}
                variant="standard"
              />
            <BtnGroup>
              {props.answers.length > 2 && (
                <QuestionActionBtn
                id={props.answerData.id}
                startIcon={<DeleteIcon />}
                onClick={ () => {
                  const newAnswers = [...props.answers];
                  newAnswers.splice(props.answerData.id, 1);
                  for (let i = 0; i < newAnswers.length; i++) {
                    newAnswers[i].id = i;
                  }
                  props.onDelete(newAnswers);
                }
                }
                >
                  Delete
                </QuestionActionBtn>
              )}
            </BtnGroup>
          </Display>
        </CardContent>
      </form>
    </StyledCard>
  );
}
