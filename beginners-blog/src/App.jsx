import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Blog from './pages/Blog';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="wrapper">
      <div className='container'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/blog/:id' component={Blog} />
          <Redirect to='/' />
        </Switch>
      </div>
    </div>
  );
};

export default App;
