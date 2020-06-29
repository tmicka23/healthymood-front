import React, { useContext, useState } from 'react';
import './Styles/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import RecipesPage from './Pages/RecipesPage';
import Article from './Pages/Article';
import Search from './Components/Search';
import Recipe from './Components/Recipe';
import AuthContext from './Context/authContext';
import jwtDecode from 'jwt-decode';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import SecretPage from './Pages/Secret';

function PrivateRoute ({ children, ...rest }) {
  const { token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={
        ({ location }) =>
          token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          ) // eslint-disable-line
      } // eslint-disable-line
    />
  );
}

function App () {
  const [token, setToken] = useState(window.localStorage.getItem('authToken'));
  const setTokenInLocalStorage = (token) => {
    window.localStorage.setItem('authToken', token);
    setToken(token);
  };

  let userNameFromToken = null;
  if (token) {
    console.log(token);
    userNameFromToken = jwtDecode(token).email || null;
  }

  return (
    <>
      <AuthContext.Provider value={{ token, setToken: setTokenInLocalStorage }}>
        {userNameFromToken && (
          <div>
            <p>Welcome back {userNameFromToken} !</p>
            <button onClick={() => setTokenInLocalStorage('')}>Log out</button>
          </div>
        )}
        <Router>
          <div className='App'>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/recettes' component={RecipesPage} />
              <Route exact path='/conseils-astuces' component={Article} />
              <Route exact path='/rechercher' component={Search} />
              <Route exact path='/recettes/:slug' component={Recipe} />
              <Route
                exact
                path='/recettes/categorie/:id'
                component={RecipesPage}
              />
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/register' component={RegisterPage} />
              <PrivateRoute exact path='/secret'>
                <SecretPage />
              </PrivateRoute>
            </Switch>
            <Footer />
          </div>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
