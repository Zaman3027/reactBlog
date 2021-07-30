import { Route, Switch } from 'react-router-dom';
import './App.css';
import AddPost from './Components/Page/AddPost/Addpost.js';
import Home from './Components/Page/Home/Home.js';
import Login from './Components/Page/Login/login.js';
import Register from './Components/Page/Register/Register.js';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={props => <AddPost {...props} />} />
        <Route path='/register' exact component={props => <Register {...props} />} />
        <Route path='/home' exact component={props => <Home {...props} />} />
      </Switch>
    </div>
  );
}

export default App;
