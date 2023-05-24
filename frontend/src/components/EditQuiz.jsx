import React from 'react';
import {
  styled,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawerAppBar from './Nav';
import { useNavigate } from 'react-router-dom';
import ErrorModal from './ErrorModal';
import defaultThumbnail from '../assets/default_quiz_thumbnail.png';
import BasicCard from './Question';

const EditGame = styled('div')({
  background: '#f8f9fd',
  fontFamily: '"Poppins", "Arial", "Helvetica Neue", sans-serif',
  border: 'none'
});

const EditGameContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '65px',
  paddingBottom: '65px',
  maxWidth: '1000px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const EditGameFlexbox = styled('div')({
  justifyContent: 'center',
  paddingTop: '30px',
  paddingBottom: '30px',
  boxShadow: '0px 8px 20px 0px rgba(0, 0, 0, 0.15)',
  textAlign: 'left',
  backgroundColor: '#ffffff',
});

const EditGameWrapper = styled('div')({
  padding: '35px'
});

const FormInputRow = styled('div')({
  paddingTop: '22px',
  fontSize: '12px',
  maxWidth: '1000px',
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

const PreviewImg = styled('img')({
  width: '400px',
  height: '275px',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const Dislay = styled('div')({
  display: 'inline-flex',
  width: '100%'
});

const DeleteBtn = styled(IconButton)({
  color: '#f7595a',
});

function EditQuiz (props) {
  const [thumbnail, setThumbnail] = React.useState('');
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState('');
  const [questions, setQuestions] = React.useState([]);
  const [deleteQuestion, setDeleteQuestion] = React.useState(false);
  const [invalidInput, setInvalidInput] = React.useState(false);
  const [invalidToken, setInvalidToken] = React.useState(false);
  const navigate = useNavigate();
  const quizId = window.location.href.split('/')[5];

  React.useEffect(async () => {
    const response = await fetch('http://localhost:5005/admin/quiz/' + quizId, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
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
    } else {
      setName(data.name);
      if (data.thumbnail === null) {
        setImage(defaultThumbnail);
        setThumbnail(defaultThumbnail);
      } else {
        setImage(data.thumbnail);
        setThumbnail(data.thumbnail);
      }
      setQuestions(data.questions);

      if (window.localStorage.getItem('image') !== null) {
        setImage(window.localStorage.getItem('image'));
      }
      if (window.localStorage.getItem('name') !== null) {
        setName(window.localStorage.getItem('name'));
      }
    }
  }, [deleteQuestion]);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setImage(base64);
    window.localStorage.setItem('image', base64);
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

  async function addQuestion () {
    const length = questions.length;
    const newQuestion = {
      id: length,
      questionString: 'Insert question',
      answers: [{
        id: 0,
        value: 'Answer 1',
        correct: true,
      },
      {
        id: 1,
        value: 'Answer 2',
        correct: false,
      }],
      time: 10,
      embed: '',
      point: 0,
      type: 'single'
    };
    const newQuestionList = [...questions];
    newQuestionList.push(newQuestion);
    setQuestions(newQuestionList);

    const response = await fetch('http://localhost:5005/admin/quiz/' + quizId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        questions: newQuestionList
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

  function deleteImage () {
    if (image === thumbnail) {
      setImage(defaultThumbnail);
    } else if (image === null) {
      setImage(defaultThumbnail);
    } else {
      setImage(thumbnail);
    }
  }

  async function saveChanges () {
    let newThumbnail = thumbnail;
    if (image === defaultThumbnail) {
      newThumbnail = defaultThumbnail;
    } else {
      newThumbnail = image;
    }
    const response = await fetch('http://localhost:5005/admin/quiz/' + quizId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
      body: JSON.stringify({
        questions,
        name,
        thumbnail: newThumbnail
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
    } else {
      navigate('/dashboard');

      if (window.localStorage.getItem('image') !== null) {
        window.localStorage.removeItem('image');
      }
      if (window.localStorage.getItem('name') !== null) {
        window.localStorage.removeItem('name');
      }
    }
  }

  return (
    <>
      <DrawerAppBar/>
      <EditGame>
        <EditGameContainer>
          <EditGameFlexbox>
          <BackBtn
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              navigate('/dashboard');
              if (window.localStorage.getItem('name') !== null) {
                window.localStorage.removeItem('name');
              }
              if (window.localStorage.getItem('image') !== null) {
                window.localStorage.removeItem('image');
              }
            }}>
              Back
          </BackBtn>
            <EditGameWrapper>
              <h2>Edit Quiz</h2>
              <form>
                <div>
                  <PreviewImg src={image}/>
                </div>
                <div>
                  <FormInputRow>
                    <Dislay>
                      <FormBtn
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      startIcon={<PhotoCamera />}
                      component='label'
                      id="imageUploadBtn"
                      >
                        Upload thumbnail
                        <input
                        hidden
                        accept='image/*'
                        type='file'
                        onChange={ (e) => {
                          uploadImage(e);
                        }}/>
                      </FormBtn>
                      { (image !== defaultThumbnail) && (
                        <DeleteBtn
                        id="deleteImgBtn"
                        aria-label="delete"
                        onClick={() => {
                          deleteImage();
                          if (window.localStorage.getItem('image') !== null) {
                            window.localStorage.removeItem('image');
                          }
                        }}>
                          <DeleteIcon />
                        </DeleteBtn>
                      )}
                    </Dislay>
                  </FormInputRow>
                  <FormInputRow>
                      <FormInput
                        required
                        label="Name"
                        value={name}
                        id="name"
                        onChange={(e) => {
                          setName(e.target.value)
                          window.localStorage.setItem('name', e.target.value);
                        }}
                        variant="standard"
                        fullWidth
                      />
                  </FormInputRow>
                </div>
                <br/>
                {questions !== [] &&
                  questions.map((question) => (
                    <BasicCard key={question.id} question={question} questions={questions} quizId={quizId} onDelete={(newQuestions) => {
                      setQuestions(newQuestions);
                      setDeleteQuestion(true);
                      setDeleteQuestion(false);
                    }}></BasicCard>
                  ))
                }
                <div>
                  <FormInputRow>
                    <FormBtn
                    id="addQuestionBtn"
                    onClick={() => addQuestion()}>
                      Add question
                    </FormBtn>
                  </FormInputRow>
                </div>
                <div>
                </div>
                <div>
                <SubmitBtn
                  variant="contained"
                  id="saveChangesBtn"
                  onClick={() => saveChanges()}>
                    Save changes
                </SubmitBtn>
                </div>
              </form>
            </EditGameWrapper>
          </EditGameFlexbox>
        </EditGameContainer>
      </EditGame>
      <ErrorModal open={invalidInput} onClose={() => setInvalidInput(false)}>Invalid input</ErrorModal>
      <ErrorModal open={invalidToken} onClose={() => setInvalidToken(false)}>Invalid input</ErrorModal>
    </>
  );
}
export default EditQuiz;
