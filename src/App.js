import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './images/hockey.png'

// Included components
import Register                 from "./components/register.component";
import Login                    from "./components/login.component";
import EmailDevs                from "./components/email-devs.component";

import Notification from "./hooks/notification.hook";
// import Register                 from "./hooks/register.hook";
// import Login                    from "./hooks/login.hook";
// import EmailDevs                from "./hooks/issue.hook";

function App()
{
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">                    
          <a className="navbar-brand" href="/">
              <img src={logo} height="40" width="40" alt="GoalieWatch" className="d-inline-block align-top"/>
          </a>
          
          <a className="navbar-brand" href="/">GoalieWatch</a>

          <div>
              <ul className="nav navbar-nav navbar right">
                  <a className="nav-link" href="/emaildevs"><i className="fa fa-envelope mr-1"></i></a>
              </ul>
          </div>
      </nav>  
      <Route path="/" exact    component={Notification} />
      <Route path="/register"  component={Register} />
      <Route path="/login"     component={Login} />
      <Route path="/emaildevs" component={EmailDevs} />
    </Router>
  );
}

export default App;