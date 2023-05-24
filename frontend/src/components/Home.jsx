import React from 'react';
import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import background from '../assets/background.png';
import Typewriter from 'typewriter-effect';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const Home = styled('div')({
  backgroundImage: `url(${background})`,
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100vw',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  fontFamily: '"Poppins", "Arial", "Helvetica Neue", sans-serif',
  color: 'white'
});

const TextContainer = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  fontSize: '65px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
});

const Heading = styled('div')({
  alignItems: 'center',
  fontWeight: '600'
});

const CustomButton = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const PinkBgBtn = styled(Button)({
  marginTop: '35px',
  background: 'linear-gradient(to bottom right, #f7595a, #f35586)',
  border: 'none',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '20px',
  paddingRight: '20px',
  borderRadius: '50px',
  color: 'white',
  width: '100%',
})

const WhiteBgBtn = styled(PinkBgBtn)({
  background: 'none',
  color: '#ffffff',
  border: '1px solid #fff',
  borderRadius: '50px',
});

const HomeStyledWhiteBgBtn = styled(WhiteBgBtn)({
  width: '210px'
});

const Link = styled('a')({
  textDecoration: 'none',
})

function HomePg () {
  const navigate = useNavigate();
  return (
    <>
      <Home>
        <TextContainer>
          <Heading>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString('Welcome to BigBrain')
                  .start();
              }}
              />
          </Heading>
          <Link href='/login'>
          <CustomButton>
            <HomeStyledWhiteBgBtn
              name="getStarted"
              id="getStarted"
              onClick={() => (
                navigate('/login')
              )}
              endIcon={<ArrowForwardIcon />}>
              Get started now
            </HomeStyledWhiteBgBtn>
          </CustomButton>
          </Link>
        </TextContainer>
      </Home>
    </>
  )
}
export default HomePg;
