import './App.css';
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';

import Login from './pages/login';
import Register from './pages/register';
import ContactPage from './pages/Contact';
import Add_contact from './pages/Add_contact';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<ContactPage/>} />
          <Route path='/add' element={<Add_contact/>} />
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
