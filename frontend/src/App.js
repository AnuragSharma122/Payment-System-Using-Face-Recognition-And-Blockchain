import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import { NotFound } from "./components/NotFound";
import { RegisterPage } from "./pages/RegisterPage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss";
import "./assets/demo/demo.css";
// import {Home} from './pages/Home';
function App() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }else{
        sethaveMetamask(true);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0].toString());
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  return (
    <div className="App">
      {isConnected ? (
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={<RegisterPage walletAddress={accountAddress} />}
            />
            <Route
              exact
              path="/payment"
              element={
                <PaymentsPage
                  walletAddress={accountAddress}
                  accountBalance={accountBalance}
                />
              }
            />
            <Route
              exact
              path="/profile"
              element={
                <ProfilePage
                  walletAddress={accountAddress}
                  accountBalance={accountBalance}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      ) : (
        <div>
          <h1>Connect to Metamask Wallet</h1>
          <p>Please connect to your Metamask wallet to use this application.</p>
          <button onClick={connectWallet}>Connect to Metamask</button>
        </div>
      )}
    </div>
  );
}

export default App;
