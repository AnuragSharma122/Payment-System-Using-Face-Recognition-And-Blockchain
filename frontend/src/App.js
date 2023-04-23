// import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { RegisterPage } from "./pages/RegisterPage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { HomePage } from "./pages/HomePage";
import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss";
import "./assets/demo/demo.css";
// import {Home} from './pages/Home';
function App() {
  return (
    <div className="App">
      {/* <ExamplesNavbar /> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route exact path="/payment" element={<PaymentsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
