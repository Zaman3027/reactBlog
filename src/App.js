import { Route, Switch } from 'react-router-dom';
import './App.css';
import AddPost from './Components/Page/AddPost/Addpost.js';
import Home from './Components/Page/Home/Home.js';
import Login from './Components/Page/Login/login.js';
import Register from './Components/Page/Register/Register.js';
import { Div, ThemeProvider } from "atomize";
import ReadPost from './Components/Page/ReadPost/ReadPost';

function App() {
  const theme = {
    textSize: {
      size: {
        label: "18px"
      },
      height: {
        customSize: "34px"
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Div>
        <Switch>
          <Route path='/' exact component={props => <Login {...props} />} />
          <Route path='/addPost' exact component={props => <AddPost {...props} />} />
          <Route path='/register' exact component={props => <Register {...props} />} />
          <Route path='/home' exact component={props => <Home {...props} />} />
          <Route path='/readPost/:id' exact component={props => <ReadPost {...props} />} />
        </Switch>
      </Div>
    </ThemeProvider>
  );
}

export default App;
