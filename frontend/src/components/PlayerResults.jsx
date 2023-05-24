import React from 'react';
import CountUp from 'react-countup';
import ErrorModal from './ErrorModal';

import {
  Box,
  Paper,
  styled,
  Stack
} from '@mui/material';

const Item = styled(Paper)({
  backgroundColor: 'white',
  padding: '20px',
  textAlign: 'Left',
});

const Container = styled(Box)({
  maxWidth: '750px',
  marginLeft: 'auto',
  marginRight: 'auto',
})

const PointsContainer = styled(Box)({
  marginTop: '80px',
  marginBottom: '80px',
  fontSize: '60px',
  width: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
})

const Points = styled(Item)({
  textAlign: 'Center',
  color: '#f7595a'
})

const Wrapper = styled('div')({
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const AnswerBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
})

const QuestionString = styled('div')({
  fontSize: '20px',
  marginBottom: '10px',
});

const Answer = styled('div')({
  marginBottom: '7px',
});

export default function PlayerResults () {
  const [error, setError] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [totalPoints, setTotalPoints] = React.useState(0);
  const playerId = parseInt(window.localStorage.getItem('playerId'));
  const points = JSON.parse(window.localStorage.getItem('userPoints'));
  const times = JSON.parse(window.localStorage.getItem('userTimes'));
  // calculate total points
  React.useEffect(async () => {
    const response = await fetch('http://localhost:5005/play/' + playerId + '/results', {
      method: 'GET'
    });
    const data = await response.json();
    if (data.error) {
      setError(true);
    } else {
      setResults(data)
      // loop for each question
      let total = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].correct) {
          const timePassed = Math.floor(((new Date(data[i].answeredAt).getTime() - new Date(data[i].questionStartedAt).getTime()) / 1000));
          total = total + (points[i] - (points[i] * (timePassed / times[i])));
        }
      }
      setTotalPoints(total);
    }
  }, []);

  return (
    <>
    <Wrapper>
    <PointsContainer>
        <Stack spacing={3}>
          <Points>
            <b>
            <CountUp start={0} end={Math.round(totalPoints)} delay={0} duration={8}>
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />
                </div>
              )}
            </CountUp>
            </b>
          </Points>
        </Stack>
      </PointsContainer>
    </Wrapper>
      <Container>
        <Stack spacing={3}>
          {results.map((result, index) =>
          <Item key={index}>
            <AnswerBox>
              <QuestionString>
                <b>Question {index + 1}</b>
              </QuestionString>
              {result.correct
                ? (<Answer>Correct</Answer>)
                : (<Answer sx={{ color: '#f7595a' }}>Incorrect</Answer>)
              }
            </AnswerBox>
          </Item>)}
        </Stack>
        <br></br>
        <div><b>Note:</b> Points earned per correct answer = Max-Points - (Max-Points x time-taken/given-time)</div>
      </Container>
      <ErrorModal open={error} onClose={() => setError(false)}>Invalid Token or Input</ErrorModal>
      <br/>
    </>
  )
}
