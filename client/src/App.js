import './App.css';
import TodoContextProvider from "./state/Contexts/TodoContext";
import Home from './components/Home/Home';


function App() {
  return (
    <div className="App">
      <TodoContextProvider>
        <Home></Home>
      </TodoContextProvider>
    </div>
  );
}

export default App;
