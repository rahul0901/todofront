import { Routes, Route } from 'react-router-dom';
import Todo from './Components/Todo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
