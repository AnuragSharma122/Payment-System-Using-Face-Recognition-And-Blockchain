import './App.css';
import { Register } from './register';
import { NewRegister } from './NewRegister';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* < Register/> */}
        <NewRegister />
      </header>
    </div>
  );
}

export default App;
