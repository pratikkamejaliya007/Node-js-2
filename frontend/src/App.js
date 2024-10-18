import logo from './logo.svg';
import './App.css';
import Login from './component/login';
import Hello from './component/hello';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/hi' element={<Hello/>}/>
        </Routes>
      </Router>
      {/* <Login/> */}
    </div>
  );
}

export default App;
