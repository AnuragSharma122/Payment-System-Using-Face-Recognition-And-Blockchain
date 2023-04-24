import { useState, useEffect } from "react";
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
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);

  useEffect(() => {
    async function checkMetamaskConnection() {
      if (typeof window.ethereum !== "undefined") {
        // Metamask is installed
        if (window.ethereum.isConnected()) {
          // Metamask is connected
          setIsMetamaskConnected(true);
        } else {
          // Metamask is not connected
          setIsMetamaskConnected(false);
        }
      } else {
        // Metamask not installed
        setIsMetamaskConnected(false);
      }
    }

    checkMetamaskConnection();
  }, []);

  const connectToMetamask = async () => {
    try {
      // Request access to the user's Metamask wallet
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setIsMetamaskConnected(true);
    } catch (error) {
      console.log(error);
      setIsMetamaskConnected(false);
    }
  };

  return (
    <div className="App">
      {isMetamaskConnected ? (
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route exact path="/payment" element={<PaymentsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      ) : (
        <div>
          <h1>Connect to Metamask Wallet</h1>
          <p>Please connect to your Metamask wallet to use this application.</p>
          <button onClick={connectToMetamask}>Connect to Metamask</button>
        </div>
      )}
    </div>
  );
}

export default App;
