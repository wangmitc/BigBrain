import React from 'react';
import {
  styled,
  Button,
  TextField
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DrawerAppBar from './Nav';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorModal from './ErrorModal';
import AnswerCard from './Answer';
import checkURL from '../helpers/EditQuiz';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import defaultThumbnail from '../assets/default_quiz_thumbnail.png';

const RegistrationContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '65px',
  paddingBottom: '65px'
});

const RegistraionFlexbox = styled('div')({
  justifyContent: 'center',
  paddingTop: '30px',
  paddingBottom: '30px',
  paddingRight: '65px',
  paddingLeft: '35px',
  width: '600px',
  boxShadow: '0px 8px 20px 0px rgba(0, 0, 0, 0.15)',
  textAlign: 'left',
  backgroundColor: '#ffffff'
});

const RegistrationWrapper = styled('div')({
  padding: '35px'
});

const FormInputRow = styled('div')({
  paddingTop: '22px',
  fontSize: '12px'
});

const Registration = styled('div')({
  background: '#f8f9fd',
  height: '100%',
  fontFamily: '"Poppins", "Arial", "Helvetica Neue", sans-serif',
  border: 'none'
});

const BackBtn = styled(Button)({
  marginLeft: '25px',
  color: '#f7595a',
  '&:hover': {
    backgroundColor: '#f7595a',
    color: 'white',
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

const PreviewImg = styled('img')({
  width: '300px',
  height: '175px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const SubmitBtn = styled(Button)({
  marginTop: '22px',
  background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
  border: 'none',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '20px',
  paddingRight: '20px',
  borderRadius: '50px',
  color: 'white',
  width: '100%',
  maxWidth: '1000px',
});

const FormBtn = styled(SubmitBtn)({
  background: 'white',
  border: '1px solid #f7595a',
  color: '#f7595a',
  width: '100%',
  marginTop: '0px',
  '&:hover': {
    background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
    color: 'white'
  },
});

const QuestionActionBtn = styled(Button)({
  color: '#f7595a',
  '&:hover': {
    background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
    color: '#ffffff'
  }
});

const BtnGroup = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
});

const Group = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
});

const Link = styled('div')({
  width: '74%'
});

function EditQuestion () {
  const questions = useLocation().state;
  const quizId = window.location.href.split('/')[5];
  const id = window.location.href.split('/')[6];
  const question = questions[id];
  const navigate = useNavigate();
  const [questionString, setQuestionString] = React.useState('');
  const [points, setPoints] = React.useState(0);
  const [timeLength, setTimeLength] = React.useState(dayjs('1970-01-1T00:00'));
  const [embed, setEmbed] = React.useState('');
  const [image, setImage] = React.useState(false);
  const [video, setVideo] = React.useState(false);
  const [answers, setAnswers] = React.useState([]);
  const [deleteAnswer, setDeleteAnswer] = React.useState(false);
  const [answerError, setAnswerError] = React.useState(false);
  const [qstTimeError, setQstTimeError] = React.useState(false);
  const [qstStrError, setQstStrError] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(async () => {
    setQuestionString(question.questionString);
    setPoints(question.point);
    setEmbed(question.embed);
    setEmbed(question.embed);

    let time = timeLength.$d;
    time.setSeconds(question.time);
    time = dayjs(time);
    setTimeLength(time);

    if (question.embed !== '') {
      if (checkURL(question.embed)) {
        setVideo(true);
      } else {
        setImage(true);
      }
      setEmbed(question.embed);
    }

    if (question.answers.length === 0) {
      setAnswers([
        {
          id: 0,
          value: 'Answer 1',
          correct: true,
        },
        {
          id: 1,
          value: 'Answer 2',
          correct: false,
        },
      ]);
    } else if (question.answers.length === 1) {
      addAnswer();
    } else {
      setAnswers(question.answers);
    }
  }, [deleteAnswer]);

  function addAnswer () {
    const length = answers.length;
    const newAnswers = [...answers];
    const newAnswer = {
      id: length,
      value: 'Answer ' + (length + 1),
      correct: false
    }
    newAnswers.push(newAnswer);
    setAnswers(newAnswers);
  }
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setEmbed(base64);
    setImage(true);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  async function saveChanges () {
    let numCorrect = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].correct) {
        numCorrect++;
      }
    }
    if (numCorrect === 0) {
      setAnswerError(true);
      return;
    }

    let response = await fetch('http://localhost:5005/admin/quiz/' + quizId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    let data = await response.json();
    if (questionString === '') {
      setQstStrError(true);
      return;
    }
    data.questions[id].questionString = questionString;
    data.questions[id].point = parseInt(points);
    if (numCorrect === 1) {
      data.questions[id].type = 'single';
    } else {
      data.questions[id].type = 'multi';
    }
    data.questions[id].answers = answers;
    const d = timeLength.$d;
    if (d.getSeconds() === 0 && d.getMinutes() === 0) {
      setQstTimeError(true);
      return;
    }
    const mins = d.getMinutes() * 60;
    const secs = d.getSeconds();
    const total = mins + secs;
    data.questions[id].time = total
    if (embed !== '') {
      data.questions[id].embed = embed;
    } else {
      data.questions[id].embed = defaultThumbnail;
    }

    response = await fetch('http://localhost:5005/admin/quiz/' + quizId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        questions: data.questions,
        name: data.name,
        thumbnial: data.thumbnail,
      })
    });

    data = await response.json();
    if (data.error) {
      // return error modal
      setError(true);
    } else {
      navigate('/quiz/edit/' + quizId);
    }
  }

  return (
    <>
    <DrawerAppBar/>
    <Registration>
        <RegistrationContainer>
          <RegistraionFlexbox>
          <BackBtn
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              navigate('/quiz/edit/' + quizId);
            }}>
              Back
          </BackBtn>
            <RegistrationWrapper>
              <h2 id="header">Edit Question {question.id + 1}</h2>
                <FormInputRow>
                  <FormInput
                    required
                    id="questionString"
                    label="Question String"
                    value={questionString}
                    onChange={(e) => setQuestionString(e.target.value)}
                    variant="standard"
                    fullWidth
                  />
                </FormInputRow>
                <FormInputRow>
                  <FormInput
                    id="points"
                    required
                    label="Points"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    variant="standard"
                    type='number'
                    fullWidth
                  />
                </FormInputRow>
                <FormInputRow>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimeField', 'TimeField', 'TimeField']}>
                      <TimeField
                        id="time"
                        label="Time length"
                        value={dayjs(timeLength)}
                        onChange={(newValue) => {
                          setTimeLength(newValue)
                        }}
                        format="mm:ss"
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </FormInputRow>
                {(!video && !image) && (
                  <FormInputRow>
                    <BtnGroup>
                      <QuestionActionBtn
                      id="youtubeUploadBtn"
                      startIcon={<YouTubeIcon />}
                      onClick={() => setVideo(true)}
                      >
                        Embed video
                      </QuestionActionBtn>
                      <QuestionActionBtn
                        id="imageUploadBtn"
                        value={embed}
                        onChange={(e) => setEmbed(e.target.value)}
                        startIcon={<PhotoCamera />}
                        component='label'
                        >
                          Upload thumbnail
                          <input
                          hidden
                          accept='image/*'
                          type='file'
                          onChange={ (e) => {
                            uploadImage(e);
                          }}/>
                      </QuestionActionBtn>
                    </BtnGroup>
                  </FormInputRow>
                )}
                {video && (
                  <FormInputRow>
                    <Group>
                      <Link>
                        <FormInput
                        id="youtubeUploadField"
                          required
                          label="Embed Link"
                          value={embed}
                          onChange={(e) => setEmbed(e.target.value)}
                          variant="standard"
                          fullWidth
                          />
                      </Link>
                      <div>
                        <QuestionActionBtn
                        id='deleteLink'
                        startIcon={<DeleteIcon />}
                        label="Delete link"
                        onClick={() => {
                          setVideo(false);
                          setEmbed('');
                        }}
                        >
                          Delete
                        </QuestionActionBtn>
                      </div>
                    </Group>
                  </FormInputRow>
                )}
                {image && (
                  <>
                    <br/>
                    <PreviewImg src={embed}/>
                    <br/>
                    <FormBtn
                      aria-label="delete"
                      id="deleteImgBtn"
                      startIcon = {<DeleteIcon />}
                      onClick={() => {
                        setImage(false);
                        setEmbed('');
                      }}>
                        Delete image
                    </FormBtn>
                    <br/>
                  </>
                )}
                {answers.map((answer) => (
                  <AnswerCard key={answer.id}
                  answerData={answer}
                  answers={answers}

                  onEdit={(newAnswers) =>
                    setAnswers(newAnswers)
                  }

                  onDelete={(newAnswers) => {
                    setAnswers(newAnswers);
                    setDeleteAnswer(true);
                    setDeleteAnswer(false);
                  }}>
                    </AnswerCard>
                ))}
                {answers.length < 6 && (
                <FormInputRow>
                    <FormBtn
                    id="addAnswerBtn"
                      onClick={() => addAnswer()}>
                      Add answer
                    </FormBtn>
                  </FormInputRow>
                )}
                <SubmitBtn
                  variant="contained"
                  id="saveChangesBtn"
                  onClick={() => saveChanges()}>
                    Save changes
                </SubmitBtn>
              </RegistrationWrapper>
            </RegistraionFlexbox>
          </RegistrationContainer>
        </Registration>
      <ErrorModal open={ error } onClose={() => setError(false)}>Invalid Token or Input</ErrorModal>
      <ErrorModal open={ answerError } onClose={ () => setAnswerError(false) }>You must mark at least one answer as correct</ErrorModal>
      <ErrorModal open={ qstStrError } onClose={ () => setQstStrError(false) }>Questions must be atleast 1 character long</ErrorModal>
      <ErrorModal open={ qstTimeError } onClose={ () => setQstTimeError(false) }>Time length for the question must be at least 1 second long</ErrorModal>
    </>
  );
}

export default EditQuestion;
