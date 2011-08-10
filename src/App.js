import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home'
import Wallet from './pages/Wallet/Wallet'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import {Buffer} from 'buffer'

function App() {
 
  return (
    <div className="App">
     <Router >
      <Routes>
  <Route element={<Home/>} path="/" ></Route>
  </Routes>
  <Routes>
  <Route element={<Wallet/>} path="/wallet" ></Route>
  </Routes>
     </Router>
     {/* <Home/> */}
    </div>
  );
}

export default App;
