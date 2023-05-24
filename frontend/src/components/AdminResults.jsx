import React from 'react';
import ErrorModal from './ErrorModal';

import {
  Box,
  Paper,
  styled,
  Stack
} from '@mui/material';

import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

ChartJS.register(
  BarElement,
  Legend,
  CategoryScale,
  LinearScale,
)

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

const HeaderContainer = styled(Box)({
  marginTop: '80px',
  marginBottom: '80px',
  fontSize: '50px',
  width: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
  boxShadow: '0px 16px 40px 0px rgba(0, 0, 0, 0.15)',
})

const Header = styled(Item)({
  textAlign: 'Center',
  color: 'white',
  backgroundColor: '#f7595a',
})

const StyledItem = styled(Item)({
  boxShadow: '0px 16px 40px 0px rgba(0, 0, 0, 0.15)',
})

const Wrapper = styled('div')({
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const LeaderboardBox = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
})

const PlayerName = styled('div')({
  fontSize: '20px',
  marginBottom: '10px',
});

const Answer = styled('div')({
  marginBottom: '7px',
});

const ChartElement = styled('div')({
  width: '100%'
})

export default function AdminResults () {
  const [error, setError] = React.useState(false);
  const [top5, setTop5] = React.useState([]);
  const [percentCorrect, setPercentCorrect] = React.useState([]);
  const [avgTime, setAvgTime] = React.useState([])
  const [qstIds, setQstIds] = React.useState([]);
  const points = JSON.parse(window.localStorage.getItem('adminPoints'));
  const times = JSON.parse(window.localStorage.getItem('adminTimes'));
  const sessionId = window.location.href.split('/')[5];
  React.useEffect(async () => {
    const response = await fetch('http://localhost:5005/admin/session/' + sessionId + '/results', {
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
      // for each user
      const usersPerformance = [];
      const correctness = [];
      const timeTaken = []
      const questions = []
      for (let i = 0; i < data.results.length; i++) {
        // for each answer
        let total = 0;
        for (let j = 0; j < data.results[i].answers.length; j++) {
          // creates list of questions, if not populated yet
          if (questions.length < data.results[i].answers.length) {
            questions.push('Q' + (j + 1))
          }
          // if answer is corrrect
          if (data.results[i].answers[j].correct) {
            // either add to array or increment index
            if (correctness.length < j + 1) {
              correctness.push(1);
            } else {
              correctness[j] = correctness[j] + 1;
            }
            // determine how much time it took (%)
            const time = Math.floor((new Date(data.results[i].answers[j].answeredAt).getTime() - new Date(data.results[i].answers[j].questionStartedAt).getTime()) / 1000)
            if (timeTaken.length < j + 1) {
              timeTaken.push((time / times[j]) * 100)
            } else if (timeTaken.length === j + 1) {
              timeTaken[j] = timeTaken[j] + ((time / times[j]) * 100)
            }
            // determine score
            total = total + (points[j] - (points[j] * (time / times[j])));
          } else {
            if (correctness.length < j + 1) {
              correctness.push(0);
            }
            // determine how much time it took (%)
            if (data.results[i].answers[j].answeredAt !== null) {
              const time = Math.floor((new Date(data.results[i].answers[j].answeredAt).getTime() - new Date(data.results[i].answers[j].questionStartedAt).getTime()) / 1000)
              if (timeTaken.length < j + 1) {
                timeTaken.push((time / times[j]) * 100);
              } else if (timeTaken.length === j + 1) {
                timeTaken[j] = timeTaken[j] + ((time / times[j]) * 100);
              }
            } else {
              if (timeTaken.length < j + 1) {
                timeTaken.push(100);
              } else if (timeTaken.length === j + 1) {
                timeTaken[j] = timeTaken[j] + 100;
              }
            }
          }
        }
        usersPerformance.push({ user: data.results[i], pointTotal: total });
      }

      // turn these into states, as the variables do not persist when doing a return
      setAvgTime(timeTaken.map(t => t / data.results.length));
      setPercentCorrect(correctness.map(c => (c / data.results.length) * 100));
      usersPerformance.sort(function (u1, u2) { return u2.pointTotal - u1.pointTotal });
      setTop5(usersPerformance.slice(0, 5));
      setQstIds(questions);
    }
  }, []);

  const dataLine = {
    labels: qstIds,
    datasets: [{
      data: percentCorrect,
      backgroundColor: 'transparent',
      borderColor: '#f7595a',
      pointBorderColor: 'black',
      pointBorderWidth: 3,
      tension: 0.3
    }]
  };

  const optionsLine = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (value) => value + '%'
        },
      }
    }
  };

  const dataBar = {
    labels: qstIds,
    datasets: [{
      data: avgTime,
      backgroundColor: '#f7595a',
      borderColor: 'transparent',
    }]
  };

  const optionsBar = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          callback: (value) => value + '%'
        },
      }
    }
  };
  return (
    <>
      <Wrapper>
      <HeaderContainer>
        <Stack spacing={3}>
          <Header>
            Leaderboard
          </Header>
        </Stack>
        </HeaderContainer>
      </Wrapper>
      <Container>
        <Stack spacing={3}>
          {top5.map((result, index) =>
          <StyledItem key={index}>
            <LeaderboardBox>
              <PlayerName>
                <b>{result.user.name}</b>
              </PlayerName>
              <Answer>
                {Math.round(result.pointTotal)}
              </Answer>
            </LeaderboardBox>
          </StyledItem>)}
        </Stack>
        <br></br>
        <div><b>Note:</b> Points earned per correct answer = Max-Points - (Max-Points x time-taken/given-time)</div>
      </Container>
      <Wrapper>
        <HeaderContainer>
          <Stack spacing={3}>
            <Header>
              % Correct
            </Header>
          </Stack>
        </HeaderContainer>
      </Wrapper>
      <Container>
        <Stack spacing={3}>
          <StyledItem>
            <LeaderboardBox>
              <ChartElement>
                <Line data={dataLine} options={optionsLine}></Line>
              </ChartElement>
            </LeaderboardBox>
          </StyledItem>
        </Stack>
      </Container>
      <Wrapper>
        <HeaderContainer>
            <Stack spacing={3}>
              <Header>
                Avg time
              </Header>
            </Stack>
        </HeaderContainer>
      </Wrapper>
      <Container>
        <Stack spacing={3}>
          <StyledItem>
            <LeaderboardBox>
              <ChartElement>
                <Bar data={dataBar} options={optionsBar}></Bar>
              </ChartElement>
            </LeaderboardBox>
          </StyledItem>
        </Stack>
      </Container>
      <ErrorModal open={error} onClose={() => setError(false)}>Invalid Token or Input</ErrorModal>
      <br/>
    </>
  )
}
