import { Route, Switch } from 'react-router-dom';
import './App.css';
import AddPost from './Components/Page/AddPost/Addpost.js';
import Home from './Components/Page/Home/Home.js';
import Login from './Components/Page/Login/login.js';
import Register from './Components/Page/Register/Register.js';
import { Div, ThemeProvider } from "atomize";
import ReadPost from './Components/Page/ReadPost/ReadPost';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

console.log(process.env.REACT_APP_DEV_MODE);

function App() {
  const theme = {
    textSize: {
      size: {
        label: "18px"
      },
      height: {
        customSize: "34px"
      }
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Div>
        <Switch>
          <Route path='/' exact component={props => <Login {...props} />} />
          <Route path='/register' exact component={props => <Register {...props} />} />
          <PrivateRoute path='/addPost' exact component={props => <AddPost {...props} />} />
          <PrivateRoute path='/home' exact component={props => <Home {...props} />} />
          <PrivateRoute path='/readPost/:id' exact component={props => <ReadPost {...props} />} />
        </Switch>
      </Div>
    </ThemeProvider>
  );
}

export default App;
