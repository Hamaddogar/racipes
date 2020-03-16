import React, { useState, useRef, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import recipeSteps from './components/RecipeSteps/recipeSteps';
// import Footer from './components/Footer/Footer';
// import Header from './components/Header/Head';
import Admin from './components/Admin/adminMain';
import adminRecipeSteps from './components/adminRecipeSteps/adminRecipeSteps';
import signIn from'./components/signIn/signIn';
import signUp from'./components/signUp/signUp';
import Protected from './components/Protected/Protected';
import logOut from './components/logOut/logOut';

function App() {

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  return (
    <div className="App">
      


      <Router>
        
        <Route path="/login" exact component={signIn}/>
        <Route path="/signup" exact component={signUp}/>
        <Route path="/" exact component={Home} />
        <Route path="/recipe-steps/:id" exact component={recipeSteps} />
        <Route path="/logout" exact component={logOut} />
        {/* <Route path="/admin-main" exact component={Admin} /> 
        <Route path="/admin-recipe-steps/:id" exact component={adminRecipeSteps} />  */}


        <Route path="/admin-main" exact>
          <Protected component={Admin} />
        </Route>
        <Route path="/admin-recipe-steps/:id" exact>
          <Protected component={adminRecipeSteps} />
        </Route>
        
      </Router>
    </div>
    
  );
}

export default App;
