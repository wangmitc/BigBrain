import { React, useState, useCallback, useRef } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import sound from '../assets/sound.mp3';
import { styled, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Typewriter from 'typewriter-effect';

const TextContainer = styled('div')({
  textAlign: 'center',
  fontSize: '65px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
  zIndex: 1,
});

const Heading = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '600',
  zIndex: 1,
  maxWidth: '800px',
  margin: 'auto',
  height: '98vh',
});

const Wrapper = styled('div')({
  color: '#f7595a',
  zIndex: 1,
})

const StyledIconButton = styled(IconButton)({
  zIndex: 1,
  color: 'white',
  border: '1px solid #f7595a',
  backgroundColor: '#f7595a',
  position: 'absolute',
  bottom: 20,
  right: 20,
  '&:hover': {
    opacity: 0.9,
    backgroundColor: '#f7595a',
  }
})

function Lobby () {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef();

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  function play () {
    audioRef.current.play();
    setIsPlaying(true);
  }

  function pause () {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  return (
    <>
    <audio src={sound} autoPlay loop ref={audioRef} />
    <StyledIconButton
      id="soundBtn"
      aria-label='play sound'
      onClick={() => {
        isPlaying ? pause() : play()
      } }>
        {isPlaying ? (<VolumeUpIcon />) : (<VolumeOffIcon />) }
    </StyledIconButton>
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        position: 'fixed',
        width: '100%',
        zIndex: -1,
        background: {
          color: '#f8f9fd'
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#f7595a',
          },
          links: {
            color: '#f7595a',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            directions: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: false,
            speed: 4,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 65,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }}
    />
    <Wrapper>
      <TextContainer>
        <Heading>
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString('Please wait for the game to start! 🧠')
                .start();
            }}
            />
        </Heading>
      </TextContainer>
    </Wrapper>
    </>
  )
}

export default Lobby;
