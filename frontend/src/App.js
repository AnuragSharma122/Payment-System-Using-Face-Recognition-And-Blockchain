import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from './components/register';
import { NewRegister } from './components/NewRegister';
import {NotFound} from './components/NotFound';
import { Payment } from "./components/Payment";
// import {Home} from './pages/Home';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<NewRegister />} />
          <Route path="/register" element={<NewRegister />} />
          <Route exact path="/payment" element={<Payment/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
