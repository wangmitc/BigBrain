import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  // Link,
  // useParams,
  // useNavigate,
  // Outlet,
} from 'react-router-dom';
import Register from './components/Register'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import EditQuiz from './components/EditQuiz';
import EditQuestion from './components/EditQuestion';
import JoinQuiz from './components/JoinQuiz';
import QuizPlay from './components/QuizPlay';
import ActiveQuiz from './components/ActiveQuiz';
import Lobby from './components/Lobby';
// import PlayerResults from './components/PlayerResults';
import AdminResults from './components/AdminResults';

function App () {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/register' element={ <Register/>} />
        <Route path='/dashboard' element={ <Dashboard/>} />
        <Route path='/quiz/edit/:quizId' element={ <EditQuiz/>} />
        <Route path='/quiz/edit/:quizId/:questionId' element={ <EditQuestion/>} />
        <Route path='/quiz/play/:sessionid' element={ <ActiveQuiz/>} />
        <Route path='/quiz/join' element={ <JoinQuiz/>} />
        <Route path='/quiz/join/:sessionId' element={ <QuizPlay/>} />
        <Route path='/lobby' element={ <Lobby/>} />
        <Route path='/results' element={ <AdminResults/>} />

        {/* <Route path='/game/results/:sessionid' element={ <GameResults/>} /> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
