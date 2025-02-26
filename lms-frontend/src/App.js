
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './routes/Home'
import OwnerRegister from './routes/OwnerRegister'
import AdminDashboard from './routes/AdminDashboard'
import ReaderRegister from './routes/ReaderRegister'
import ReaderDashboard from './routes/ReaderDashboard'
import AvailableLibraries from './routes/AvailableLibraries';
import OwnerDashboard from './routes/OwnerDashboard';
import AccountCheck from './routes/AccountCheck';
import AdminLogin from './routes/AdminLogin';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route exact path='/admin/login' element={<AdminLogin/>}></Route>
        <Route exact path='/owner/dashboard' element={<OwnerDashboard/>}></Route>
        <Route exact path='/libraries' element={<AvailableLibraries/>}></Route>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/owner/register' element={<OwnerRegister/>}></Route>
        <Route exact path='/admin/dashboard' element={<AdminDashboard/>}></Route>
        <Route exact path='/reader/register' element={<ReaderRegister/>}></Route>
        <Route exact path='/reader/dashboard' element={<ReaderDashboard/>}></Route>
        <Route exact path='/account-check' element={<AccountCheck/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
