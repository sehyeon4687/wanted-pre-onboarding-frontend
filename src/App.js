import { Routes, Route } from 'react-router-dom';
import Signup from './Page/Signup';
import Signin from './Page/Signin';
import Main from './Page/Main';
import Todo from './Page/Todo';


function App() {

  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/todo' element={<Todo />} />
    </Routes>
  );
}

export default App;